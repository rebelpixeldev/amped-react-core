import React from 'react';

import PropTypes from 'prop-types';
import { AmpedLoader } from 'amped-react-core/Common';
import {Card, CardHeader, CardText} from 'material-ui/Card';

import '../styles/_card.scss';

export const AmpedCard = ( { title, children, loading } ) => (
	<Card className="amped-card">
		{title && (<CardHeader
			titleStyle={{fontSize:'1.6rem'}}
			style={{paddingBottom:0}}
			title={title}
		/> ) }
		<CardText>
			{children}
			<AmpedLoader loading={loading} />
		</CardText>
	</Card>
);

AmpedCard.propTypes = {
	title   : PropTypes.string,
	loading : PropTypes.bool
}

AmpedCard.defaultProps = {
	loading : false
}

export default AmpedCard;