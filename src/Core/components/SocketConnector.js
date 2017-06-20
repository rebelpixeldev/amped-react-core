import React from 'react';

import { AmpedSocket, AmpedUtil } from 'amped/Core';

export function socketConnector(WrappedComponent, model = '*'){

	return class SocketConnector extends React.Component{

		constructor(props){
			super(props);
			this.props = props;
			this.model = typeof this.props.model === 'undefined' ? model : this.props.model;

			console.log('SOCKET MODEL' , this.model);
			this.instance = null;
		}
		
		componentDidMount(){
console.log( this.model === '*');
			if ( this.model === '*'){
				AmpedSocket.getSocket().on('*', this.callInstanceMethod.bind(this, 'handleSocket'));
			} else {
				[   this.getEventName('create'),
					this.getEventName('update'),
					this.getEventName('delete')
					].forEach(( evtName ) => {
					console.log(evtName);
					AmpedSocket.getSocket().on(evtName, this.handleSocketEvent.bind(this, evtName))

				} )
			}

		}

		proc(wrappedInstance){
			this.instance = wrappedInstance;
		}

		handleSocketEvent(evt, data){
			console.log('HANDLING SOCKET EVENT', evt);
			evt = evt.toLowerCase();
			if ( this.instance !== null ){
				if ( evt.indexOf('_create') !== -1 )
					this.callInstanceMethod('handleSocketCreate', data, evt);
				else if ( evt.indexOf('_update') !== -1 )
					this.callInstanceMethod('handleSocketUpdate', data, evt);
				else if ( evt.indexOf('_delete') !== -1 )
					this.callInstanceMethod('handleSocketDelete', data, evt);
				else
					this.callInstanceMethod('handleSocket', data, evt);
			}
		}

		callInstanceMethod(methodName, data, evt){
			if ( typeof this.instance[methodName] === 'function' )
				this.instance[methodName](data, evt);
			else if ( typeof this.instance.handleSocket === 'function' )
				this.instance.handleSocket(data, evt);
		}

		getEventName(event){
			return `${this.model.toUpperCase()}_${event.toUpperCase()}`
		}

		render(){
			const props = Object.assign({}, this.props, {ref: this.proc.bind(this)})
			return (
				<WrappedComponent {...props } />
			)
		}
	}
}

export default socketConnector;