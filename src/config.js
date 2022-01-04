const config = {
    API_SERVER: 'http://localhost:8080'
}

try {
    let pri = require('./private.js');
    let keies = Object.keys(pri.default);
    for (let i = 0; i < keies.length; i++) {
        config[keies[i]] = pri.default[keies[i]];
    }
// eslint-disable-next-line no-empty
} catch (e) {

}

export {config};
