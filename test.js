var smite = require('./smite-script.js');

smite.setConfig({
    devId: '1319',
    authKey: 'B4C44966FFFA4915A2A9237AC9AC7F60'
});

smite.connectivity.ping()
    .then(function(data){
        console.log(data);
    })
    .catch(function(error){
        console.log(error);
    });