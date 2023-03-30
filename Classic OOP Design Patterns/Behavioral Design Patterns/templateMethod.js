class MySuperClass {
	method1() {
		console.log('method1 called')
		this.method2('passedParam')
	}
	method2() {
		throw new Error('abstract not implemented properly')
	}
}

class MySubClass extends MySuperClass {
	method2(pp) {
		console.log('method2 called with', pp)
	}
}


const myObjS = new MySuperClass()
myObjS.method1()
const myObj = new MySubClass()
myObj.method1()