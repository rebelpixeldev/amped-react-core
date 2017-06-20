
export class AmpedUploadsFactory{
	static mimeTypes = {
		'Image' : [
			'image/jpeg',
			'image/jpg',
			'image/gif'
		]
	};

	static mimeDict = null;

	static mapMimeTypesToDict() {
		if ( this.mimeDict === null ){
			this.mimeDict = Object.keys(this.mimeTypes).reduce(( ret, typeLabel ) => {
			    return { ...ret, ...this.mimeTypes[typeLabel].forEach(( mime ) => ret[mime] = typeLabel) }
			}, {});
		}
	}

	static filterByType(type, mime){
		if ( type === '' )
			return true;
		else if ( typeof this.mimeTypes[type] === 'undefined')
			return false;
		else
			return this.mimeTypes[type].indexOf(mime) > -1;

	}

	static getMimeTypeByMime(mime){
		return typeof AmpedUploadsFactory.mimeDict[mime] === 'undefined' ? false : AmpedUploadsFactory.mimeDict[mime];

	}
}

AmpedUploadsFactory.mapMimeTypesToDict();

export default AmpedUploadsFactory;