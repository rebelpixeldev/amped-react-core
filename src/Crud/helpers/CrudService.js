import { AmpedService } from 'amped/Core/AmpedService';

export class CrudService{

	constructor(model, ids = null){
		this.model = model;
		// this.ids = ids !== null ? [].concat(ids) : null; //@TODO allow for multiple ids?
		this.id = ids;
	}

	create(){

	}

	read(){
		return AmpedService.get(`/api/${this.model}/${this.id}`)
	}

	readForForm(){
		return AmpedService.get(`/api/${this.model}/edit/${this.id}`)
	}

	// @TODO just a thought but this might be better done on the api side
	updateMultiple(){

	}

	update(data){
		return AmpedService.post(`/api/${this.model}/${this.id}`, data)
			.then(( resp ) => {
				console.log(resp.message);
				return resp;
			})
	}

	delete(){

	}
}

export default CrudService;