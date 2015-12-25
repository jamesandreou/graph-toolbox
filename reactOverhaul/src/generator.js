export default class graphGenerator{

	constructor(args){
		this.g = args;
	}

	clear(){
		this.g.v = [];
		this.g.e = [];
	}

	k5(dim){
		this.g.addVertice(dim, 5, 30, 0);
		this.g.addVertice(dim, 50, 5, 1);
		this.g.addVertice(dim, 95, 30, 2);
		this.g.addVertice(dim, 20, 95, 3);
		this.g.addVertice(dim, 80, 95, 4);
		this.g.addEdge(0, 1, 0, null, 0, 0);
		this.g.addEdge(0, 2, 0, null, 0, 0);
		this.g.addEdge(0, 3, 0, null, 0, 0);
		this.g.addEdge(0, 4, 0, null, 0, 0);
		this.g.addEdge(1, 2, 0, null, 0, 0);
		this.g.addEdge(1, 3, 0, null, 0, 0);
		this.g.addEdge(1, 4, 0, null, 0, 0);
		this.g.addEdge(2, 3, 0, null, 0, 0);
		this.g.addEdge(2, 4, 0, null, 0, 0);
		this.g.addEdge(3, 4, 0, null, 0, 0);
	}

	bidiakisCube(dim){
		this.g.addVertice(dim, 10, 10, 1);
		this.g.addVertice(dim, 15, 20, 1);
		this.g.addVertice(dim, 20, 30, 1);
		this.g.addVertice(dim, 40, 10, 1);
		this.g.addVertice(dim, 45, 20, 1);
		this.g.addVertice(dim, 50, 30, 1);
		this.g.addVertice(dim, 10, 50, 1);
		this.g.addVertice(dim, 25, 50, 1);
		this.g.addVertice(dim, 40, 50, 1);
		this.g.addVertice(dim, 20, 70, 1);
		this.g.addVertice(dim, 35, 70, 1);
		this.g.addVertice(dim, 50, 70, 1);
		this.g.addEdge(0, 1, 0, null, 0, 0);
		this.g.addEdge(1, 2, 0, null, 0, 0);
		this.g.addEdge(3, 4, 0, null, 0, 0);
		this.g.addEdge(4, 5, 0, null, 0, 0);
		this.g.addEdge(0, 3, 0, null, 0, 0);
		this.g.addEdge(1, 4, 0, null, 0, 0);
		this.g.addEdge(2, 5, 0, null, 0, 0);
		this.g.addEdge(6, 7, 0, null, 0, 0);
		this.g.addEdge(7, 8, 0, null, 0, 0);
		this.g.addEdge(9, 10, 0, null, 0, 0);
		this.g.addEdge(10, 11, 0, null, 0, 0);
		this.g.addEdge(6, 9, 0, null, 0, 0);
		this.g.addEdge(7, 10, 0, null, 0, 0);
		this.g.addEdge(8, 11, 0, null, 0, 0);
		this.g.addEdge(0, 6, 0, null, 0, 0);
		this.g.addEdge(2, 9, 0, null, 0, 0);
		this.g.addEdge(3, 8, 0, null, 0, 0);
		this.g.addEdge(5, 11, 0, null, 0, 0);
	}

}