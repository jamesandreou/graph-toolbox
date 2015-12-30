export default class graphGenerator{

	constructor(g){
		this.g = g;
	}

	execute(cmd, dim){
		this.clear();
		switch(cmd){
			case 'k5' :
				this.k5(dim);
				break;
			case 'cube':
				this.bidiakisCube(dim);
				break;
		}
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

	bigPlanarGraph(dim){
		this.g.addVertice(dim, 9, 87, 0);
		this.g.addVertice(dim, 95, 5, 0);
		this.g.addVertice(dim, 60, 84, 0);
		this.g.addVertice(dim, 90, 74, 0);
		this.g.addVertice(dim, 31, 44, 0);
		this.g.addVertice(dim, 86, 41, 0);
		this.g.addVertice(dim, 8, 42, 0);
		this.g.addVertice(dim, 72, 10, 0);
		this.g.addVertice(dim, 8, 9, 0);
		this.g.addVertice(dim, 82, 90, 0);
		this.g.addVertice(dim, 21, 93, 0);
		this.g.addVertice(dim, 47, 15, 0);
		this.g.addEdge(0, 1, null, null, 0, 0);
		this.g.addEdge(1, 2, null, null, 0, 0);
		this.g.addEdge(3, 4, null, null, 0, 0);
		this.g.addEdge(4, 5, null, null, 0, 0);
		this.g.addEdge(0, 3, null, null, 0, 0);
		this.g.addEdge(1, 4, null, null, -327, -100);
		this.g.addEdge(2, 5, null, null, 280, -75);
		this.g.addEdge(6, 7, null, null, 115, 260);
		this.g.addEdge(7, 8, null, null, -184, 181);
		this.g.addEdge(9, 10, null, null, 15, -215);
		this.g.addEdge(10, 11, null, null, -105, -179);
		this.g.addEdge(6, 9, null, null, 0, 0);
		this.g.addEdge(7, 10, null, null, 0, 0);
		this.g.addEdge(8, 11, null, null, 56, 1);
		this.g.addEdge(0, 6, null, null, -55, -75);
		this.g.addEdge(2, 9, null, null, 0, 0);
		this.g.addEdge(3, 8, null, null, 0, 0);
		this.g.addEdge(5, 11, null, null, -68, -108);
		this.g.addEdge(9, 0, null, null, 0, 0);
		this.g.addEdge(6, 3, null, null, 0, 0);
		this.g.addEdge(6, 8, null, null, 179, 41);
		this.g.addEdge(8, 5, null, null, 0, 0);
		this.g.addEdge(8, 4, null, null, 189, -20);
		this.g.addEdge(3, 1, null, null, -319, 83);
		this.g.addEdge(2, 11, null, null, 0, 0);
		this.g.addEdge(2, 10, null, null, 0, 0);
		this.g.addEdge(10, 8, null, null, 0, 0);
		this.g.addEdge(7, 9, null, null, 0, 0);
		this.g.addEdge(5, 1, null, null, 0, 0);
		this.g.addEdge(9, 1, null, null, 0, 0);
	}
}