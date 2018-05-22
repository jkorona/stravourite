import React, { Component } from 'react';

import QueryString from '../utils/QueryString';
import StravaApi from '../StravaApi';

export default function withAuthentication(WrappedComponent) {
    return class extends Component {

        state = {
            athlete: null,
            authenticated: false
        }

        getCode() {
            const params = QueryString.parse(new URL(window.location));
            return params.code;
        }

        authorize() {
            const { location } = window;
            const params = {
                client_id: process.env.REACT_APP_CLIENT_ID,
                redirect_uri: location.toString(),
                response_type: 'code',
                approval_prompt: 'auto'
            };
            location.assign(`https://www.strava.com/oauth/authorize?${QueryString.serialize(params)}`);
        }

        async authenticate(code) {
            const athlete = await StravaApi.authenticate(code);
            this.setState({ athlete, authenticated: true });
            window.history.replaceState({}, document.title, '/');
        }

        async componentWillMount() {
            const code = this.getCode();
            if (code) {
                this.authenticate(code);
            } else {
                this.authorize();
            }
        }

        render() {
            const { authenticated, athlete } = this.state;

            if (authenticated) {
                return <WrappedComponent athlete={athlete} {...this.params} />
            }

            return null;
        }

    };
}