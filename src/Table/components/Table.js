import React from 'react';
import { AmpedTableActionBar, AmpedTableControls } from 'amped/Table';
import { AmpedLoader } from 'amped/Common';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export const AmpedTable = ( { headers, data, modifiedData, cellMap, tableProps, loading, perpage, page, sortOrder, sortColumn, onFilterChange, onPageChange, onSort } ) => {
	return (
		<span style={{position : 'relative'}}>
			{ headers && data && !loading ? (
					<span>
					{/*<AmpedTableActionBar />*/}
					<AmpedTableControls
						total={modifiedData.length}
						page={page}
						perpage={perpage}
						onFilterChange={onFilterChange}
					    onPageChange={onPageChange}
					/>
					<Table {...tableProps} >
						<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
							<TableRow>
								{Object.keys(headers).map( (name, i) => {
									let headerClass = '';

									if ( sortColumn === headers[name] ){
										headerClass = sortOrder === -1 ? 'amped-table--header--sort-DESC' : 'amped-table--header--sort-ASC';
									}

									return (
										<TableHeaderColumn key={i}>
											<span className={`amped-table--header ${headerClass}`} onClick={onSort.bind(this, headers[name] )}>{name}</span>
										</TableHeaderColumn>
									)
								})}
								<TableHeaderColumn />
							</TableRow>
						</TableHeader>
						<TableBody displayRowCheckbox={false}>
							{data.map((row, i) => (
								<TableRow key={i}>
									{Object.keys(headers).map((key, i) => (
										<TableRowColumn key={i}>{cellMap(headers[key], row)}</TableRowColumn>
									))}
									<TableRowColumn style={{textAlign:'right'}}>{cellMap('menu', row)}</TableRowColumn>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</span>
				) : null }
			<AmpedLoader loading={loading} />
		</span>
	)
}


/**
 * @TODO Implement search filter
 * @TODO Implement download content functionality
 *
 *
 * Displays a table with sortable columns, search filter and download content
 *
 * headers { object } - An object of what the headers should be. The key is what appears as the header and the value
 *                      should be which db column's value should appear. The column value will be pulled from the
 *                      `data` prop in a loop. In Amped, this value is fetched from the `/api/[model]/tableHeaders`
 *                      endpoint.
 *                      Example:
 *                          {
 *								"Display Name": "display_name",
 *								"Provider": "provider",
 *								"Email": "email",
 *								"Profile Image": "upload",
 *								"Last seen": "updated_at",
 *								"Joined": "created_at"
 *							}
 * data { array } - An array of objects with all the rows that should be displayed in the table. The objects should
 *                  have at least all the values that were passed in the headers value.
 * cellMap { function } - A function that is called on each cell. The column name and the data for the current row is
 *                          passed as parameters. This function should decide how to render each cell.
 * onSort { function } - A function that is called when one of the table headers is clicked.
 *
 */

AmpedTable.propTypes = {
	headers : React.PropTypes.object,
	data    : React.PropTypes.array,
	cellMap : React.PropTypes.func,
	onSort  : React.PropTypes.func,
	loading : React.PropTypes.bool
};

AmpedTable.defaultProps = {
	onSort : () => {},
	cellMap : () => {},
	loading : true
}

export default AmpedTable;