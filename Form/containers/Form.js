import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { default as FormComponent } from '../components/Form';
import { Input, HiddenInput, Select, Json, Image, PasswordInput, Switch, DatePicker, Dropdown, CheckboxGroup, RadioButtonGroup, RichTextarea } from 'amped-react-core/Form';
import { CrudService } from 'amped-react-core/Crud';
import { AmpedService } from 'amped-react-core/Core';
import { SET_VALUES, REMOVE_VALUES, UPDATE_FIELD } from '../actions';

import {GridList, GridTile} from 'material-ui/GridList';

import '../styles/_form.scss';

const mapStateToProps = (state) => ({
	user : true,
	settings : state.settings,
	formValues : state.amped.form.values
});

export class Form extends React.Component{

	static propType = {
		name            : PropTypes.string.isRequired,
		onSubmit        : PropTypes.func,
		onRequestStart  : PropTypes.func,
		onSubmitSuccess : PropTypes.func,
		onSubmitError   : PropTypes.func
	};

	static defaultProps = {
		onSubmit        : () => {},
		onRequestStart  : () => {},
		onSubmitSuccess : () => {},
		onSubmitError   : () => {}
	}

	static get foo(){return 'bar'}

	constructor(props){
		super(props);
		this.props = props;

		this.foo = 'bar';

		this.submit = this.onSubmit.bind(this);

		this.state = {
			formValues : null
		}

		this.service = new CrudService(this.props.model);
		this.setFormValues();
	}

	componentWillReceiveProps(nextProps){

		console.log(this.props, nextProps);
		if (
			( typeof this.props.formValues[this.props.name] === 'undefined' &&
				typeof nextProps.data.fields !== 'undefined' && nextProps.data.fields.length > 0 ) ||
			( nextProps.name !== this.props.name ) ||
			( typeof nextProps.formValues[nextProps.name] !== 'undefined' && nextProps.formValues[nextProps.name].id !== this.props.formValues[this.props.name].id )
		) {
			this.props = nextProps;
			this.setFormValues();
		}
	}

	setFormValues(){
		if ( typeof this.props.data !== 'undefined' && this.props.name !== 'undefined' )
			this.props.dispatch({
				type : SET_VALUES,
				fields : this.props.data.fields,
				name : this.props.name
			})
		// this.setState({
		// 	formValues : this.props.data.fields.reduce((values, row) => {
		// 		row.forEach((col) => {
		// 			values[col.name] = typeof col.value === 'undefined' ? '' : col.value;
		// 		});
		// 		return values;
		// 	}, {})
		// })
	}

	getFormContent(){
		return this.buildForm();//typeof this.props.children === 'undefined' ? this.buildForm() : this.props.children;
	}

	buildForm(){
		if ( typeof this.props.data === 'undefined' && typeof this.props.formValues === 'undefined' && typeof this.props.formValues[this.props.name] === 'undefined' )
			return '';
		return (
			<div style={{paddingLeft:this.formPadding, paddingRight:this.formPadding}}>
				{this.props.data.fields.map(( row, i ) => {

					const cellHeight = this.getRowHeight(row);
					const cols = row === 'json_text' ? 2 : row.length;

					return typeof this.props.formValues[this.props.name] === 'undefined' ? null : (
						<GridList className="amped-form__row" key={i} cols={cols} cellHeight={cellHeight} style={{marginLeft:-16, marginRight:-16, height:cellHeight}}>
							{row.map((field, i ) => {
								const Comp = this.componentMap[field.type].component;
								return (
									<GridTile key={i} style={{height:cellHeight, alignItems:'center'}}>
										<Comp {...field}
										      formValues={this.props.formValues[this.props.name]}
										      onFieldChange={this.onFieldChange.bind(this)} />
									</GridTile>
								)
							})}
						</GridList>
					)
				})}
			</div>
		)

	}


	// buildForm(){
	// 	// if ( typeof this.props.data === 'undefined' || typeof this.props.formValues === 'undefined' )
	// 	// 	return '';
	// 	return (
	// 		<div style={{paddingLeft:this.formPadding, paddingRight:this.formPadding}}>
	// 			{this.props.data.fields.map(( row, i ) => {
	//
	// 				const cellHeight = this.getRowHeight(row);
	// 				const cols = row === 'json_text' ? 2 : row.length;
	//
	// 				console.log(row);
	//
	// 				return (
	// 					<GridList key={i} cols={cols} cellHeight={cellHeight} style={{marginLeft:-16, marginRight:-16}}>
	// 						{row.map((field, i ) => {
	// 							console.log(field);
	// 							const Comp = this.componentMap[field.type].component;
	// 							return typeof this.props.formValues[this.props.name] === 'undefined' ? null : (
	// 							<GridTile key={i}>
	// 								<Comp {...field}
	// 									value={this.props.formValues[this.props.name][field.name]}
	// 										formValues={this.props.formValues[this.props.name]}
	// 									  onFieldChange={this.onFieldChange.bind(this)} />
	// 							</GridTile>
	// 							)
	// 						})}
	// 					</GridList>
	// 				)
	// 			})}
	// 		</div>
	// 	)
	//
	// }

	getRowHeight(row){
		return Math.max.apply(this, row.map( field => {
			return typeof this.componentMap[field.type].height === 'function' ?
					this.componentMap[field.type].height(field) :
					this.componentMap[field.type].height;
		}));
	}

	onFieldChange(name, value){

		this.props.dispatch({
			type : UPDATE_FIELD,
			formName : this.props.name,
			fieldName : name,
			value
		})
	}

	onSubmit(){

		const pValues = this.props.formValues[this.props.name] || {};

		const vals = Object.keys(pValues).reduce((ret, key) => {
			if (typeof pValues[key] === 'object') {
				Object.keys(pValues[key]).forEach((jKey) => {
					ret[`${key}.${jKey}`] = pValues[key][jKey];
				})
			} else
				ret[key] = pValues[key];

			return ret;

		}, {});

		AmpedService[this.props.data.method.toLowerCase()](this.props.data.action, vals)
			.then((resp) => {
				this.props.onSubmit(resp);
				if ( resp.success )
					this.props.onSubmitSuccess(resp);
				else
					this.props.onSubmitError(resp);
			}).catch(( err ) => {
				this.props.onSubmit(err);
				this.props.onSubmitError(err);
			});
	}

	render(){
		const content = this.getFormContent();
		return (
			<FormComponent {...this.props} content={content} onSubmit={this.onSubmit.bind(this)}>
				{this.props.children}
			</FormComponent>
		)
	}

	get componentMap(){
		return {
			text: {
				component: Input,
				height:85
			},
			password : {
				component : PasswordInput,
				height:85
			},
			hidden : {
				component : HiddenInput,
				height:0
			},
			select : {
				component : Select,
				height:85
			},
			json_text : {
				component : Json,
				height:85 // @TODO figure out how to set this dynamically from the Json component
			},
			image : {
				component : Image,
				height: 150
			},
			switch : {
				component : Switch,
				height:85
			},
			date : {
				component : DatePicker,
				height: 85
			},
			dropdown : {
				component : Dropdown,
				height:85
			},
			checkbox : {
				component : CheckboxGroup,
				height: function(field){
					return field.options.length * 25 + 50;
				}
			},
			radio : {
				component : RadioButtonGroup,
				height: function(field){
					return field.options.length * 25 + 50;
				}
			},
			textarea : {
				component : RichTextarea,
				height:400
			}
		}
	}

	get formPadding(){
		return 15;
	}

	get cellHeight(){
		return 75;
	}
}



export default connect(mapStateToProps, null, null, {withRef:true})(Form);
