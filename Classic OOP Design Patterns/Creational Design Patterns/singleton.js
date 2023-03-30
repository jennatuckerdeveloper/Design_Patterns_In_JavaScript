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

console.log(MyClass.valueAdder(2))
console.log(MyClass.valueAdder(3))
const inst = new MyClass()

// You might as well just use a closure instead of uses a class, but this basically is one under the hood. 
