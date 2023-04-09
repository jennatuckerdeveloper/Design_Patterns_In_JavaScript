/*
  Allen Holub gives exceptional examples:  

  Network proxy - remote procedure call systems 
  A stand-in for what's on the other side of the network connection.
  So a server proxy that's there on the client-side. 
  Create the illusion that the client has as direct connection 
  to an object on the server, so you can code to it. 

  If they implement the same interfaces, the proxy and the actual 
  implementation can be treated the same way. 

  A good example without a network is an image in Java.  
  It takes time to actually download an image. 
  You get an image object right away, and that is 
  a proxy for the real image. 
  The actual bits are downloaded on a background thread.
  You can treat the image proxy as if it's the image.
  If you try to display it, you see the bits loading.

  The real image gets cached in the runtime system, 
  so on the second call, you get the real image, no proxy.

  Great example is a RESTful API.  Here you use a proxy for 
  security.  That request should not hit and just be acted on. 
  You'd pass a login token and verify it's a valid 
  token.  So you can put a security service there to verify 
  the token and pass the request on.  

  The client just thinks of itself as talking to that backend service, 
  but it's really talking to the security proxy that passes it along.

  Microservices architecture will use messaging and a messaging bus 
  rather than something like HTTP requests. 
  A socket is one end of a networking connection. 
  To connect one socket and bind to another, requires an address. 
  But we want to scale these microservices - So what's the address? 
  Have all of these microservices talk to a broker (a proxy) that
  has two sockets and sits in the middle and bind all sockets to it.
  The microservices don't care and think they're talking to the other services.
  The proxy puts all the binding in one place, so the services
  only need to know that one address, not the address of the service they 
  communicate with.  

  Lazy instantiation - Sometimes very large objects are populated in 
  very inefficient ways.  The image proxy is a lazy instantiation proxy.
  These are most often in databases.  
  Example of a massive Employee object, but you often need a tiny subset
  of information like name, role, contact.  
  So you can create a lightweight proxy.  
  Only when you ask for something not in the proxy do you load that piece.
  Pretty cool.  

  "A database is nothing but a collection of tables."

  Mosh uses a lazy initialization example for an ebook library. 
*/

// interface Ebook {
// 	displayTitle: () => string
// 	open: () => string[]
// }

// class RealEbook implements Ebook {
// 	title: string
// 	data: string[]
// 	constructor(title) {
// 		this.title = title
// 		this.data = [`${title}DATA`]
// 	}
// 	open() {
// 		return this.data
// 	}
// }

// // The proxy
// class EbookProxy implements Ebook {
// 	title: string
// 	openFirst() {
// 		if (!this.realEbook) {
// 			new RealEbook()
// 		}
// 	}
// }

// class EbookLibrary {
// 	allEbooks: Ebook[]
// 	constructor() {
// 		this.allEbooks = []
// 	}
// 	add(ebook) {
// 		this.allEbooks.push(ebook)
// 	}
// 	displayTitles() {
// 		return this.allEbooks.map((e) => e.title)
// 	}
// 	openFirst() {
// 		return this.allEbooks[0].data
// 	}
// }

// If we use just these two classes, we pass the data around too much.

// const myEbookLibrary = new EbookLibrary()
// const myBook1 = new Ebook('aaaaaa')
// const myBook2 = new Ebook('bbbbbb')
// const myBook3 = new Ebook('cccccc')
// myEbookLibrary.add(myBook1)
// myEbookLibrary.add(myBook2)
// myEbookLibrary.add(myBook3)
// console.log(myEbookLibrary.displayTitles())
// console.log(myEbookLibrary.openFirst())

/*

  I do not want all the Proxy hanging around in memory if the full book has needed to be loaded. 
  There is duplicate info in there. 
  How do I re-use the info from the cache? 

  loadEhookLibrary = fetch all the data for the ebook proxies only 

  EbookLoader parent extends interface Ebook (can be proxy or full)
  this.ebook = new EbookProxy()
  // cached proxy data gets re-used 
  // the file contents get loaded 
  // why do i need duplicate values?  
  // Why not ebook meta and ebook contents? 
  loadFullEbook = this.ebook = new FullEbook(this.ebook) // this is just wrong.  why make it copy? 
  when open() gets called 
  call the loadFullEbook on the super 

  I want the proxy to be used until the full is used.
  Then I want only the full to be used. 
  But how would I get an object to replace the reference to itself with a reference to another object? 
  I don't think that's really possible... 

  I guess the constructor of the FullEbook could just take an ebook proxy. 

  I think I can make this work... but it doesn't seem right to me tbh. 
  Why would the lightweight object not just become a property of the heavier object? 
  Why copy everything over? 
  What is this pattern actually for?? 

*/

interface EbookI {
	open: () => void
}

class EbookLoader {
	ebook: ProxyEbook | FullEbook | null
	constructor() {
		this.ebook = null
	}

	getEbook = () => {
		return this.ebook
	}

	load(title, author, coverIMG) {
		if (this.ebook === null) {
			this.ebook = new ProxyEbook(title, author, coverIMG)
		}
	}
	open() {
		const fullEbook = new FullEbook(this.ebook)
		fullEbook.open()
		this.ebook = fullEbook
	}
}

class ProxyEbook {
	title: string
	author: string
	coverIMG: string[]
	constructor(title, author, coverIMG) {
		this.title = title
		this.author = author
		this.coverIMG = coverIMG
	}
}

class FullEbook {
	title: string
	author: string
	coverIMG: string[]
	contents: string[]
	constructor(proxy) {
		this.title = proxy.title
		this.author = proxy.author
		this.coverIMG = proxy.coverIMG
	}
	open() {
		console.log('fetching the data')
		this.contents = ['fetchedContent1', 'fetchedContent2']
	}
}

const ebookLoader1 = new EbookLoader()
ebookLoader1.load('Good Title', 'The Author', ['imgbit1', 'imgbit2'])

const getEbook1 = ebookLoader1.getEbook

console.log('Proxy Ebook?', getEbook1())

ebookLoader1.open()

console.log('Real Ebook?', getEbook1())
