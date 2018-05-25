import QueryString from './utils/QueryString';


const OAUTH_URL = 'https://www.strava.com/oauth/token';
const API_URL = 'https://www.strava.com/api';
const API_VERSION = '3';

function json(response) {
    return response.json();
}

function uri(resource) {
    return `${API_URL}/v${API_VERSION}/${resource}`;
}

class StravaApi {

    storeToken = (response) => {
        const { token_type, access_token } = response;
        this.authorizationHeader = `${token_type} ${access_token}`;
        return response;
    }

    authenticate(code) {
        const {
            REACT_APP_CLIENT_ID,
            REACT_APP_SECRET
        } = process.env;

        return fetch(OAUTH_URL, {
            method: 'post',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                code,
                client_id: REACT_APP_CLIENT_ID,
                client_secret: REACT_APP_SECRET
            })
        })
            .then(json)
            .then(this.storeToken)
            .then(({ athlete }) => athlete);
    }

    getStarredSegments() {
        return fetch(uri('segments/starred'), {
            headers: {
                Authorization: this.authorizationHeader
            }
        }).then(json);
    }

    searchSegments(filter) {
        const params = {
            bounds: filter.bounds,
            activity_type: 'riding',
            min_cat: 0,
            max_cat: 5
        }
        const url = uri('segments/explore?') + QueryString.serialize(params);
        return fetch(url, {
            headers: {
                Authorization: this.authorizationHeader
            }
        })
            .then(json)
            .then(({ segments }) => segments);
    }

}

export default new StravaApi();
