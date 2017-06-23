import React from 'react';

import Pagination from "react-js-pagination";
import TextField from 'material-ui/TextField';

export const TableControls = ( { perpage, page, total, onFilterChange, onPageChange } ) => {
	return (
		<div className="amped-table--controls">

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
				<TextField floatingLabelText="Filter" onChange={onFilterChange} />
			</div>
		</div>
	);
}

TableControls.propTypes = {
	perpage : React.PropTypes.number,
	page : React.PropTypes.number,
	total : React.PropTypes.number,
	onFilterChange : React.PropTypes.func,
	onPageChange : React.PropTypes.func
}

TableControls.defaultProps = {
	perpage : 3,
	page : 1,
	onFilterChange : () => {},
	onPageChange : () => {}
}

export default TableControls;