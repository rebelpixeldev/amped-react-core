import React from 'react';
import { connect } from 'react-redux'
import { SnackBar, Confirm, Modal } from 'amped-react-core/Alerts';
import { AmpedLoader } from 'amped-react-core/Common';
import {Topbar, Sidebar, Content} from 'amped-react-core/Layout'
import { AmpedTransitionPage } from 'amped-react-core/Core';


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

						<Content>
							<AmpedTransitionPage style={style}>
								{children}
							</AmpedTransitionPage>

						</Content>
					</div>
				</div>
			</div>
			<SnackBar />
		    <Confirm />
		    <Modal />
		    {setup}
		    <div className="amped-app--loader">
		        <AmpedLoader loading={!setup} />
		    </div>
	    </div>
    );
};

export default connect(null,null,null, { withRef:true } )(AmpedApp);