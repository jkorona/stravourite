import { GoogleApiWrapper } from 'google-maps-react';

import MapContainer from './MapContainer';

export default GoogleApiWrapper({
    apiKey: (process.env.REACT_APP_GOOGLE_API_KEY),
    libraries: ['places', 'visualization', 'geometry']
})(MapContainer);
