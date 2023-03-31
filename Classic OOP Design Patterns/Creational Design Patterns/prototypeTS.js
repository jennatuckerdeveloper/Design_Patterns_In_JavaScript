/*
  But let's say you preferred to use the classic OOP, style...
  You can do this in JS.
  And in TS, it's pretty easy.
  You do have to maintain the duplicate (or whatever) method on each and every type, though.
*/
var Thing = /** @class */ (function () {
    function Thing() {
    }
    Thing.prototype.duplicate = function () {
        return new Thing();
    };
    return Thing;
}());
var myThing = new Thing();
console.log(myThing);
var duplicateThing = myThing.duplicate();
// alias just for a little test
var renamedThing = myThing;
console.log(duplicateThing);
console.log(myThing == renamedThing);
console.log(myThing == duplicateThing);
