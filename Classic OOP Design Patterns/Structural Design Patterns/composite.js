/*
  Pattern fits a hierarchy where you want to treat things the same.
  So like, folder that has files or folders, a concept of subfolders.
  And both have a move or a delete.
  Create an interface that's another abstraction and code to that.
  
  Allen Holub uses The Game Of Life's overall grid / board here.
  So a Resident is one of those little units.
  They are made up into Neighborhoods.
  And those are put together into the Universe.

  The Neighborhoods can be made of up Neighborhoods or cells.
  So there is the leaf, that's the Resident.
  And then there's the Neighborhood, that's the composite object.


*/
var Shape = /** @class */ (function () {
    function Shape(name) {
        this.name = name;
    }
    Shape.prototype.render = function () {
        console.log(">> Rendering shape. ".concat(this.name, " "));
    };
    return Shape;
}());
var Group = /** @class */ (function () {
    function Group(name) {
        this.name = name;
        this.data = [];
    }
    Group.prototype.add = function (item) {
        this.data.push(item);
    };
    Group.prototype.render = function () {
        console.log("\n Within group ".concat(this.name));
        this.data.map(function (i) { return i.render(); });
    };
    return Group;
}());
var shape1 = new Shape('shape1');
var shape2 = new Shape('shape2');
var group1 = new Group('group1');
var shape3 = new Shape('shape3');
var shape4 = new Shape('shape4');
var group2 = new Group('group2');
group1.add(shape1);
group1.add(shape2);
group2.add(shape3);
group2.add(shape4);
var group = new Group('highest level group');
group.add(group1);
group.add(group2);
group.render();
