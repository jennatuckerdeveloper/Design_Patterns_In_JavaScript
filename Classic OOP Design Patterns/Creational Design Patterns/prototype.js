/*
  Since JavaScript is a prototypical language that copies objects all the time, 
  this should be straightforward, right? 
  If you need one method that you can run that's the equivalent of "duplicate" complex object, 
  I think this is equivalent to deep copying.
  But that's essentially going to be recursive in JS if you want it to have an unlimited copy depth.  
  There is built in stuff that goes pretty deep, but not to any depth. 
  So how deeply nested in your object instance? 
*/

const myComplexObj = {
	one: 1,
	two: 2,
	three: [3, 4, 5],
	four: [{ innerOne: 11, innerTwo: 22 }],
	five: { innerThree: 33, innerFour: { four: 4 } }
}

const myDeepCopy = Object.assign({}, myComplexObj)

// It does this deep.
myDeepCopy.one = '!!!!!!'

console.log(myDeepCopy)
console.log(myComplexObj)

// But it does not go this deep.
myDeepCopy.five.innerFour = '********'

console.log(myDeepCopy)
console.log(myComplexObj)

// The spread operator is the shorthand for this.
const nextObjCopy = { ...myComplexObj }
const anArr = [1, 2, 3]
const myArrCopy = [...anArr]

/*
  People are using aliasing to mean the same thing as shallow copying.  
  I think that in JavaScript, those two concepts are a little bit distinct.  
*/

// Aliasing

const myObj1 = {
	one: 1
}

const myObj2 = myObj1

myObj2.two = 2

// This is only aliased, so they'll both be changed.
console.log(myObj1)
console.log(myObj2)

// Shallow copying

const anObj1 = { one: 1 }
const anObj2 = { two: 2 }
const myArr1 = [anObj1, anObj2]

// The array was copied, but the object references are the same references.
const myArr2 = myArr1.map((obj) => obj)

// This will only be added to the second array.
myArr2[2] = { three: 3 }

// Yet this will change in both arrays.
myArr2[0].one = '!!!!!!!!!!!!'

console.log(myArr2)
console.log(myArr1)

// I think lodash has the most commonly used deepCopy. 

/*
  But let's say you preferred to use the classic OOP, style... 
  You can do this in JS.
  And in TS, it's pretty easy.  
  You do have to maintain the duplicate (or whatever) method on each and every type, though. 
  I'll do a TS file with a slightly different name... 
*/

/*
  Am I really understanding the gist of this one? 
  Allen Holub uses this with composite in the creation of The Game Of Life game board. 
  His universe is made up of Neighborhoods made up of Residences. 
  The Neighborhoods and Residences have a create method defined on the interface of Cell.
  And his Universe uses Cell to type the prototypes and copies object instances. 

  But how does this translate to JS, which is a prototypical language? 
*/

