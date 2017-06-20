import React from 'react';
import moment  from 'moment';

export const DateCell = ( { date, format = "dddd, MMMM Do YYYY, h:mm:ss a"} ) => (
	<span>{moment(new Date(date)).format(format)}</span>
);


export const DateFrom = ( {date} ) =>  (
	<span>{moment(new Date(date)).fromNow()}</span>
);

