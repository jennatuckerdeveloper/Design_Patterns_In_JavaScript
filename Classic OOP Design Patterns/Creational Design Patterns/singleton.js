/*
	Why is Singleton a creational pattern? 
	I suppose it's because the main technical requirement is to NOT allow more than one instance. 
	That is the main technical challenge.  This is not at all standard, you must do this by intentional design. 
	And then secondarily, that single instance needs to be globally available in the system.  

	How is a Singleton object different than a globally available object in JS?  
	For instance:  const myObj = { reference1: "reference1Value", myFunc: (num1) => num1 * num1 }
	Well, first, in Node, modules do not have global scope, but you can define things on the global object. 
	Second, a const cannot be redefined in theory, but in JS, you can actually change those values on a complex obj.
	You do button down the name space, sure.  I suppose you could use TS to keep the object aligned with an interface.
	I don't believe that with a Singleton you can never redefine that Singleton.  It's not static by definition. 
	I think the deeper idea here is that an object DOES SOMETHING in a system, and that something is encapsulated.
	So, the broader system does not know how that is done, but it can know and trust what is done. 
	The coupling feels incorrect with a global object.  
	It's sort of too loose, too exposed, and not clearly defined enough.  
	How encapsulated and clearly defined could you make it?  Would that be enough? 
	Tellingly, I have never seen this before, and all my instincts say, don't try to do this.  
*/

/*
A shot at a classic OOP Singleton
Will only create one instance.
First version errored correctly when you tried to instantiate an instance.
I think ideally, it would return a reference to the single object instance.
*/

class MySingleton {
	constructor() {
		return MySingleton
	}

	static value = 0

	static valueAdder(x) {
		this.value += x
		return this.value
	}
}
// And it is the same one.  It preserves state in this case.
console.log(MySingleton.valueAdder(2))
console.log(MySingleton.valueAdder(3))

// You loop back to the class definition.
const inst = new MySingleton()
console.log(inst.valueAdder(2))
console.log(inst.value)

/* 
	So only the naming convention would tell you this is a Singleton. 
	Otherwise, you would assume it is behaving the same as other classes and instances under the hood. 
	I don't actually think you should do this... not sure why...
 	A good remaining question would be about loading.
 	Is this only loaded when first used? How does JS load it's classes (functions)?
 */

/*
Are Singletons an anti-pattern?  
From https://stackoverflow.com/questions/137975/what-are-drawbacks-or-disadvantages-of-singleton-pattern

"They are generally used as a global instance, why is that so bad? 
Because you hide the dependencies of your application in your code, instead of exposing them through the interfaces. 
Making something global to avoid passing it around is a code smell.

They violate the single responsibility principle: by virtue of the fact that they control their own creation and lifecycle.

They inherently cause code to be tightly coupled. This makes faking them out under test rather difficult in many cases.

They carry state around for the lifetime of the application.
Another hit to testing since you can end up with a situation where tests need to be ordered which is a big no no for unit tests. 
Why? Because each unit test should be independent from the other."

*/

/* 
	Oh, wow.  This version I found is interesting.
 	It never occurred to me to use a factory method and then delete the constructor.
	This article has incorrect information in it, however.
 	And I certainly cannot say I actually like this or would consider it an expressive, simple, coherent code pattern.
	It's an IIFE, but I think it would wait to be called the first time.
*/

var SingletonFactory = (function () {
	function SingletonClass() {
		// ...
	}

	var instance

	return {
		getInstance: function () {
			if (!instance) {
				instance = new SingletonClass()
				delete instance.constructor
			}
			return instance
		}
	}
})()

/* 
	This article seems to have very accurate use cases.
	Scenarios where only one object is required globally,v such as thread pool, global cache, window object, etc.

	https://levelup.gitconnected.com/javascript-design-patterns-singleton-pattern-7ada98be9a10

	Mosh uses the example of an app's configuration settings.  
	So I suppose the underlying question turning up in JS would be:  
	When is it better to use a class than a function?
		When is it better to use a class than a plain JS object?

	Her article / video is the best one: 
	She says, it's got a lot of these issues, because it is used wrong. 
  https://www.sihui.io/singleton-pattern-why-bad/

*/
