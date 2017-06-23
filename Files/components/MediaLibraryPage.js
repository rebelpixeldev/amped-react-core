import React from 'react';

import { AmpedCard } from 'amped-react-core/Common';
import { AmpedMediaLibrary } from 'amped-react-core/Files';

export const MediaLibraryPage = ( props ) => (
    <AmpedCard title="Media Library">
	    <AmpedMediaLibrary />
    </AmpedCard>
);

export default MediaLibraryPage;