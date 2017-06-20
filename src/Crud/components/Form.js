import React from 'react';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

import { AmpedCard } from 'amped/Common';
import { Form } from 'amped/Form';

export const Table = ( {formData, loading, model, onSave} ) => {
	const dummyForm = {
		method : 'POST',
		action : '/stuff/n/things',
		fields : [
			[
				{ type : 'text', name : 'first_name', label : 'First Name', value : 'Ted' },
				{ type : 'text', name : 'last_name', label : 'Last Name' }
			],
			[
				{ type : 'select', name : 'province', label : 'Province', value : 'ON', options : [
					{ label : 'Ontario', value : 'ON' },
					{ label : 'British Columbia', value : 'BC'}
				]}
			]
		]
	};

	return (
		<AmpedCard className="amped-page-card transition-item" title="Crud Form" loading={loading}>
			<Form data={formData} name={model} onSave={onSave} />
		</AmpedCard>
	);
}

export default Table;