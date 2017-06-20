import React from 'react';

import { AmpedLoader } from 'amped/Common';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


export const AmpedCard = ( { title, children, loading } ) => (
	<Card>
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
	title : React.PropTypes.string,
	loading : React.PropTypes.bool
}

AmpedCard.defaultProps = {
	loading : false
}

export default AmpedCard;