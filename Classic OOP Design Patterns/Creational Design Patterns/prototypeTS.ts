/*
  But let's say you preferred to use the classic OOP, style... 
  You can do this in JS.
  And in TS, it's pretty easy.  
  You do have to maintain the duplicate (or whatever) method on each and every type, though. 
*/

interface Duplicable<T> {
	duplicate: () => T
}

class Thing implements Duplicable<Thing> {
	duplicate() {
		return new Thing()
	}
}

const myThing = new Thing()
console.log(myThing)
const duplicateThing = myThing.duplicate()
// alias just for a little test
const renamedThing = myThing
console.log(duplicateThing)
console.log(myThing == renamedThing)
console.log(myThing == duplicateThing)
