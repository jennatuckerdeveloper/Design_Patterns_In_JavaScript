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
  But I think his version always keeps the proxy around.  
  I don't see an obvious way to get out of duplicating information.  

  I do not want all the Proxy hanging around in memory if the full book has needed to be loaded. 
  Let me see if I can do this in a way that feels like it could let the proxy go when full loads. 
*/

class EbookLoader {
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
	constructor(title, author, coverIMG) {
		this.title = title
		this.author = author
		this.coverIMG = coverIMG
	}
}

class FullEbook {
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
