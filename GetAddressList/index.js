module.exports = function (context, req) {
    const rp = require('request-promise-native').defaults({jar: true});
context.log(process.env);    
    var packageCode = context.bindingData.packageCode;

    var options = {
        method: 'POST',
        uri: 'http://kil-sales-bssaip.trio-2.nec.talkdev.co.uk/sales-api/availability-check/set-package',
        form: {
            packageCode: packageCode
        },
        json: true
    };

    rp(options)
    .then(function(response) {
        var postCode = context.bindingData.postCode;

        var options = {
            method: 'POST',
            uri: `http://kil-sales-bssaip.trio-2.nec.talkdev.co.uk/sales-api/availability-check/get-address?postCode=${postCode}`,
            json: true
        };
        return rp(options);
    })
    .then(function(response) {
        context.res = {
            headers: {
                'Content-Type': 'application/json'
            },
            status: 200, 
            body: response.data
        };
        context.done();
    })
    .catch(function(err) {
        context.log('something went wrong');
        context.log.error(err);
        context.res = {status:500, body:err}
        context.done();
    }); 
};