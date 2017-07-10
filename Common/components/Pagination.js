import React from 'react';

import Pagination from "react-js-pagination";

import '../styles/_pagination.scss';

export const AmpedPagination = ( { total, activePage, perpage, pageRangeDisplayed, onChange } ) => {
    return (
	    <div className="amp-pagination">
		    {total > perpage && (
			    <Pagination
				    pageRangeDisplayed={pageRangeDisplayed}
				    totalItemsCount={total}
				    onChange={onChange}
				    activePage={activePage}
				    itemsCountPerPage={perpage}
			    />
		    )}
	    </div>
    );
};

export default Pagination;