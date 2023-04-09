/* 
  Use case would be a tree structure with leaf nodes and then also 
	non-leaf nodes that lead to either leaf nodes or ones of their same type. 
	You can think of the non-leaf nodes as aggregates:  They're made up
	of other things / contain other things. 

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

	He shows the prototype pattern in the context of the composite pattern.
	And says that composite pattern is the basis for several other patterns.

*/

interface Groupable {
	render: () => void
}

class Shape implements Groupable {
	name: string
	constructor(name) {
		this.name = name
	}
	render() {
		console.log(`>> Rendering shape. ${this.name} `)
	}
}

class Group implements Groupable {
	data: Groupable[]
	name: string
	constructor(name: string) {
		this.name = name
		this.data = []
	}
	add(item: Groupable) {
		this.data.push(item)
	}
	render() {
		console.log(`\n Within group ${this.name}`)

		this.data.map((i) => i.render())
	}
}

const shape1 = new Shape('shape1')
const shape2 = new Shape('shape2')
const group1 = new Group('group1')
const shape3 = new Shape('shape3')
const shape4 = new Shape('shape4')
const group2 = new Group('group2')
group1.add(shape1)
group1.add(shape2)
group2.add(shape3)
group2.add(shape4)
const group = new Group('highest level group')
group.add(group1)
group.add(group2)
group.render()
