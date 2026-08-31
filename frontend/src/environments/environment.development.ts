// Local dev backend. Requests go through the ng serve proxy (see proxy.conf.json)
// so the browser never makes a cross-origin call and CORS never comes into play.
// Point proxy.conf.json's target at whichever host you're testing against.
export const environment = {
    production: false,
    apiBaseUrl: '',
};
