/*  
  Look for places where objects have duplicate intrinsic state.
  Pull that state out into extrinsic state, 
  and reuse that same object instance. 
  This is a caching strategy.  
  
  Tends to go along with composite. 
  Caching or memory management strategy. 

	This uses the concept of a Factory for whatever object has now
	become essentially lightweight with extrinsic information. 
	This is called a Flyweight Pool - A collection of flyweights. 
	So in Mosh's example, the Point has an icon.  
	There is an IconFactory managing an Icon Pool.  

*/

class Point {
	constructor(x, y, icon) {
		this.x = x
		this.y = y
		this.icon = icon
	}
}

class PointIcon {
	constructor(type, icon) {
		this.type = type
		this.icon = icon
	}
}

class PointIconFactory {
	constructor() {
		this.allIcons = {}
	}
	getPointIcon(type) {
		if (!this.allIcons[type]) {
			this.allIcons[type] = new PointIcon(type, `${type.toUpperCase()}ICON`)
		}
		return this.allIcons[type]
	}
}

class PointService {
	constructor() {
		this.pointIconFactory = new PointIconFactory()
	}
	makePoint(x, y, type) {
		const icon = this.pointIconFactory.getPointIcon(type)
		return new Point(x, y, icon)
	}
}

const myPointService = new PointService()
const myPoint1 = myPointService.makePoint(0, 0, 'AAA')
const myPoint2 = myPointService.makePoint(0, 1, 'BBB')
const myPoint3 = myPointService.makePoint(0, 2, 'AAA')

console.log(myPoint1.icon == myPoint2.icon) // false
console.log(myPoint1.icon == myPoint3.icon) // true
