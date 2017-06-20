import React from 'react';

import { AmpedUploadButton } from 'amped/Files';
import { AmpedLoader, AmpedPagination } from 'amped/Common';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';


export const MediaLibrary = (
	{   loading,
		sourceFiles, files, total, page, perpage,
		filterTypeOptions, filterTypeValue,
		filterSearchValue,
		onFileSelect,
		onPageChange, onMimeFilterChange, onSearchFilterChange }
	) => {
	return (
		<div className="amp-media-library">
			<div className="amp-media-library__header">
				<AmpedUploadButton />
			</div>
			<div className="amp-media-library__controls">
				<div className="amp-media-library__control">
					<AmpedPagination
						pageRangeDisplayed={5}
						total={total}
						onChange={onPageChange}
						activePage={page}
						perpage={perpage}
					/>
				</div>
				<div className="amp-media-library__control">
					<MediaLibraryMimeFilter options={filterTypeOptions}
					                        selected={filterTypeValue}
											onChange={onMimeFilterChange} />
				</div>
				<div className="amp-media-library__control">
					<MediaLibrarySearch value={filterSearchValue} onChange={onSearchFilterChange} />
				</div>
			</div>
			<div className="amp-media-library__files">
				{files.map(( file, i ) => {
					return (
						<MediaLibraryItem key={i} className="amp-media-library__files" {...file} onClick={onFileSelect.bind(this, file)}  />
					)
				})}
			</div>
			{ !loading && (<div>
				{files.length === 0 && sourceFiles.length > 0 && (<p>No files matched with your filter options</p>) }
				{sourceFiles.length === 0 && (<p>No haven't uploaded any images yet</p>)}
			</div> )}
			<AmpedLoader loading={ loading } />
		</div>
	);
}

MediaLibrary.defaultProps = {
	onFileSelect : () => {}
}

/**
 * Type Filter
 * @param options
 * @param selected
 * @param onChange
 * @constructor
 */
export const MediaLibraryMimeFilter = ( { options, selected, onChange } ) => (
	<SelectField onChange={onChange}
	             value={selected}
	             floatingLabelFixed={true}
	             floatingLabelText="Filter by upload type">
		<MenuItem value={''} primaryText="Any" />
		{options.map(( option ) => (
			<MenuItem value={option} primaryText={option} key={option} />
		))}
	</SelectField>
);

MediaLibraryMimeFilter.defaultProps = {
	selected : ''
}

export const MediaLibrarySearch = ( { value, onChange } ) => (
	<TextField
		value={value}
		onChange={onChange}
		hintText="Search files"
	/>
)




export const MediaLibraryItem = ( props ) => {
	return (
		<div className="amp-media-library-item" onClick={props.onClick}>
			<img src={props.thumb_url} alt=""/>
		</div>
	);
}

export default MediaLibrary;