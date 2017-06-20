import React from 'react';
import { connect } from 'react-redux'
import { SnackBar, Confirm } from 'amped/Alerts';
import { AmpedLoader } from 'amped/Common';
import {Topbar, Sidebar} from 'amped/Layout'
import { AmpedTransitionPage } from 'amped/Core';


export const AmpedApp = ( { children, setup, user } ) => {
	const isAuthed = typeof user.id !== 'undefined';
	const style = isAuthed ? {} : {display:'flex', justifyContent:'center', marginTop:'5vh'};

    return (
    	<div className={ `amped-app ${setup ? 'amped-app--setup' : 'amped-app--loading'}` }>
			<div className="amped-app--content">

				<div className='amped-container'>
					{ isAuthed && <Topbar /> }
				<div className="amped-content-container">
					{ isAuthed && <Sidebar /> }

					<div className='amped-content'>
						<AmpedTransitionPage style={style}>
							{children}
						</AmpedTransitionPage>

					</div>
				</div>
			</div>
			</div>
			<SnackBar />
		    <Confirm />
		    {setup}
		    <div className="amped-app--loader">
		        <AmpedLoader loading={!setup} />
		    </div>
	    </div>
    );
};

export default connect(null,null,null, { withRef:true } )(AmpedApp);