import React from 'react';

import Pagination from "react-js-pagination";
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import FileDownloadFile  from 'material-ui/svg-icons/file/file-download';
import CloseNavigation  from 'material-ui/svg-icons/navigation/close';
import ImportExportCommunication  from 'material-ui/svg-icons/communication/import-export';
import { fullWhite, fullBlack, deepPurple500, deepPurple700, grey100} from 'material-ui/styles/colors';
import PropTypes from 'prop-types';

export const TableControls = ( { perpage, page, total, downloadable, filterValue, onFilterChange, onPageChange, onDownload } ) => {
	return (
		<div className="amped-table--controls">
			{downloadable && (
				<FlatButton
					backgroundColor={deepPurple500}
					hoverColor={deepPurple700}
					style={{width:40, minWidth:40}}
					onClick={onDownload}
					icon={<ImportExportCommunication style={{width:20}} color={fullWhite} />}
				/>
			)}
				<div className="amped-pagination">
					{total > perpage && (
						<Pagination
							pageRangeDisplayed={5}
							totalItemsCount={total}
							onChange={onPageChange}
							activePage={page}
							itemsCountPerPage={perpage}
						/>
					)}
				</div>

			<div className="amped-table--controls--filter">
				<TextField className="amped-table--controls--input" floatingLabelText="Filter" onChange={onFilterChange} value={filterValue} />

				{filterValue !== '' && (
					<FlatButton
						className="amped-table--controls--clear"
						backgroundColor={fullWhite}
						hoverColor={grey100}
						onClick={onFilterChange.bind(this, '')}
						icon={<CloseNavigation style={{width:20}} color={fullBlack} />}
					/>
				)}
			</div>
		</div>
	);
}


TableControls.propTypes = {
	perpage         : PropTypes.number,
	page            : PropTypes.number,
	total           : PropTypes.number,
	onFilterChange  : PropTypes.func,
	onPageChange    : PropTypes.func
}

TableControls.defaultProps = {
	perpage         : 3,
	page            : 1,
	onFilterChange  : () => {},
	onPageChange    : () => {}
}

export default TableControls;