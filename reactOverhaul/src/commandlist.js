export default class CommandList{
	
	constructor (){
		this.algorithms = {
			planar : {
				name : 'Planarity Test',
				desc : 'Find a planar embedding or K5 / K33 minor.',
				req : this.planarReq
			}
		};
	}

	planarReq(g){
		// check requirements here
	}

}