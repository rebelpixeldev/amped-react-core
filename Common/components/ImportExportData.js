import React from 'react';

import { AmpedUploadButtonComponent } from 'amped-react-core/Files';

import {Tabs, Tab} from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import FileDownloadFile from 'material-ui/svg-icons/file/file-download';
import CloudUploadFile from 'material-ui/svg-icons/file/cloud-upload';

import { grey200, grey400, grey600} from 'material-ui/styles/colors';

export const ImportExportData = ( { model, data, tabValue, importTableHeaders, importTableValues, onImportUpload, onTabChange, onGetTemplate } ) => (
    <div className="import-export__container">
	    <div className="import-export__header">
		    <div className="import-export__title">Import / Export</div>

		    <RaisedButton
			    className="import-export__download-btn"
			    label="Download"
			    labelPosition="after"
			    primary={true}
			    icon={<FileDownloadFile />}
		    />
	    </div>
	    <div className="import-export__content">
		    <Tabs
			    value={tabValue}
			    onChange={onTabChange}
			    className="import-export__tabs" >
			    <Tab label="Upload Import" value="import">
				    <div className="import-export__tab">
					    <div className="import-export__upload">
							<p className="import-export__upload__desc">
								<span className="import-export__upload__link" onClick={onGetTemplate}>Download a template</span> and fill in your values then,</p>
						    <div className="import-export__upload__or"><span>then</span></div>
							<p className="import-export__upload__desc">Drag and drop to upload</p>
						    <div className="import-export__upload__or"><span>or</span></div>

						    <AmpedUploadButtonComponent onChange={onImportUpload} multiple={false} />
						    {/*<RaisedButton*/}
							    {/*className="import-export__upload__btn"*/}
							    {/*backgroundColor={grey200}*/}
							    {/*label="Upload"*/}
							    {/*labelPosition="after"*/}
							    {/*icon={<CloudUploadFile />}*/}
						    {/*/>*/}
					    </div>
				    </div>
			    </Tab>
			    <Tab label="Manual Import" value="manual">
				    <div className="import-export__tab">
					    {importTableHeaders && importTableValues && (
					        <ImportTable headers={importTableHeaders} elements={importTableValues}  />
					    )}
				    </div>
			    </Tab>
		    </Tabs>
	    </div>
	    
    </div>
);

export const ImportTable = ( {headers, elements} ) => (

	<table>
		<thead>
			<th>
				{headers.map(( header, i ) => (
					<td key={i}>{header}</td>
				))}
			</th>
		</thead>


	</table>

)
export default ImportExportData;