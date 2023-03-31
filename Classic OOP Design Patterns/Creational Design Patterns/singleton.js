/*
	Why is Singleton a creational patterns? 
	I suppose it's because the main technical requirement is to NOT allow more than one instance. 
	And then secondarily, that single instance needs to be globally available in the system.  

	How is a Singleton object different than a globally available object in JS?  
	For instance:  const myObj = { reference1: "reference1Value", myFunc: (num1) => num1 * num1 }
	Well, first, in Node, modules do not have global scope, but you can define things on the global object. 
	Second, a const cannot be redefined in theory, but in JS, you can actually change those values on a complex obj.
	You do button down the name space, sure.  I suppose you could use TS to keep the object aligned with an interface.
	I don't believe that with a Singleton you can never redefine that Singleton.  It's not static by definition. 
	I think the deeper idea here is that an object DOES SOMETHING in a system, and that something is encapsulated.
	So, the broader system does not know how that's done, but it can know and trust what's done. 
	The coupling feels incorrect with a global object.  
	It's sort of too loose, too exposed, and not clearly defined enough.  
	How encapsulated and clearly defined could you make it?  Would that be enough? 
*/

// A shot at a classic OOP Singleton
// Will only create one instance.
class MyClass {
	constructor() {
		this.total = 0
		throw new Error('I am a singleton, bro.')
	}

	static value = 0

	static valueAdder(x) {
		this.value += x
		return this.value
	}
}
// You can only use it as static.  So there can only be one.
// And it is the same one.  It preserves state in this case.
console.log(MyClass.valueAdder(2))
console.log(MyClass.valueAdder(3))
const inst = new MyClass()

// You might as well just use a closure here instead of uses a class, but this basically is one under the hood.
