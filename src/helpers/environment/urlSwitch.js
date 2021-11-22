let APIURL = '';

switch( window.location.hostname) {
    case 'localhost' || '127.0.0.1': 
        APIURL = 'http://localhost:5000';
        break;
    // case 'tellem-messenger.herokuapp.com' :
    //     APIURL = 'https://tellem-server.herokuapp.com';
}

export default APIURL;