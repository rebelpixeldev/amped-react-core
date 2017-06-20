import React from 'react';

import { AmpedCard } from 'amped/Common';
import { AmpedMediaLibrary } from 'amped/Files';

export const MediaLibraryPage = ( props ) => (
    <AmpedCard title="Media Library">
	    <AmpedMediaLibrary />
    </AmpedCard>
);

export default MediaLibraryPage;