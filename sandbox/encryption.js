var keypair = require('keypair');
var pair = keypair();
require('../helpers/api_helper.js')();
require('../helpers/address_helper.js')();

// address = 'n2t19a46cBs2DdHs2sqfRwPGhoQjvqmefR';

var asset = {
    "issueAddress": address,
    "amount": 123,
    "divisibility": 0,
    "fee": 1234,
    "metadata": {
        "userData": {
            "ID": "ID",
            "Name": "AssetName",
            "Description": "AssetDescription",
            "Type": "AssetType"
        }
    },
    "encryptions": [
    {"key": "ID", "pubKey": pair['public'],"format":"pem","type":'pkcs1' }
    ]
};

postToApi('issue',asset,function(err, body){
  if (err) console.log('error: '+err);
});

/*
{ public: '-----BEGIN RSA PUBLIC KEY-----\nMIIBCgKCAQEAjxA3mA4QjfU7XRfY/GojEzeAdKRtiaxW8YjfiCw3ZczBdqOq9YdOsElay7Au\nx4YVbdGl2ErXQfxnJNewfB/aytPz/EPTZUkSkDyT/PqGNltHhWM+QWV8C4I9wJnEEKp3mQKc\nkX3lIOAN0GTfAPJC2+2UULbMGfYgC0eYTSPOfp/LA0boF57a6zbJxI3qcghMsdpCa15kyeJU\nV4fO+PH8xc6omfE6TQjfeV4gMeMCELrIamRbzzX5upaM5gP33X4GCzbzFdugWVozkeDDLCl3\nCVuL0/0taSdnpeHQSKEhwVJDwU105+wAhHdt7fEG5wh4xDmDWpGVx6IpM7kk/HRRDwIDAQAB\n-----END RSA PUBLIC KEY-----\n',
  private: '-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAjxA3mA4QjfU7XRfY/GojEzeAdKRtiaxW8YjfiCw3ZczBdqOq9YdOsEla\ny7Aux4YVbdGl2ErXQfxnJNewfB/aytPz/EPTZUkSkDyT/PqGNltHhWM+QWV8C4I9wJnEEKp3\nmQKckX3lIOAN0GTfAPJC2+2UULbMGfYgC0eYTSPOfp/LA0boF57a6zbJxI3qcghMsdpCa15k\nyeJUV4fO+PH8xc6omfE6TQjfeV4gMeMCELrIamRbzzX5upaM5gP33X4GCzbzFdugWVozkeDD\nLCl3CVuL0/0taSdnpeHQSKEhwVJDwU105+wAhHdt7fEG5wh4xDmDWpGVx6IpM7kk/HRRDwID\nAQABAoIBADb2SgV20dFX95iKQuimdhc56XXmfda4iSZ+KTKNmjLX+TN1KYbulsKPS/yZET/C\nOZVZR9fS2OQW7iFvY/Qr4MivqTqvbBWrfyA+xbQZI1rasp2CRTamoINjZAoMiRDGDPCR2kjj\nDxYUPfpj5nDcoecQXTytHbiToDf1J4PrT7fBYXZpgsFKiAgG7Y7QQu05bz6dcvYj4b0cRzOx\nxxI2rB7D0kd1pYWIf8NKuH4ul1SyyvqVyxV1nihkSpkrd38D97rRSlsxAULFtsJ3UoBDOMK0\nk5/Ew0WECSDFnVpcU4Q5RI1R3QCfG5due9uR4A2vqMHgZYNmnaFjDP+hwKcsExECgYEA7t8l\nbMhi52ALn0y5nAZT0VHhId4kGEBh5o+qKaJLRMIfrzYligI2tEhoAa3tZehIZFAXXJ6/Ut3P\ne6tdpE8dsY4xx79VwDqPuRcV4vjhJN+FWq0e7faJL0FtkSEtya7t4KgVSYC1LkxVQLSQ8kKH\nKZH8BEYIx9exDxWRVn9uEXMCgYEAmVJc+HwkP1PJPFhpywpGe+cx/RyP5CBES1+y6e3jB5eA\nMUxzm1r3iBrfWJA15QGGI8ntm5MfcB6zJijV3QRterXoYg4doe/9XKVk2Bxy6a6NEC9YEMaM\na6EBOr3aYkES5WFYHOY02LNibD4OHPwH4h91hrAJVTUDeyu7Ve6MavUCgYBaJOPetZB9eIVq\nTG4PL2QaLigju80rScCoXbb9lz2IaSnD2U85UbSLPHfjilt4hbwr/v2R+maBQyu1o+nmw+SU\nyPCITPBzZqYuV0PvL7TnUWLl4Uc2zj7fEnXiuv6oiddDXKsL3gKBwlS54mqAwhJ34ZuVkUhn\nAkLTSnRajCRheQKBgFEllGs3WP/jWniD2spJj/B39q8d9NIqebri1ZCWBTi5aHGvIuiwhp4U\niu0Wtk+UNOiwMP/MKDFxLiQeLMKjW0Y9DNcI3YoduJzWNL9knzUq2yIbzKJkU2GLf1kVroWe\nJ2Ab20TAWmvu1UKwvUt94LY/LDay6N2eB0+jX60lalAZAoGBAMsWTulpgSuX4AQmGnBqH0RD\nRK7+EfbJn1jjPgOiH3qw8868z5wl7rt1kcPqaiWuQJoc4g4LBeHF9cWIPwxRO0rclMkxDFTI\nDspGGseeDd86k7EuDhOlp3xI4bf0fwRpKG6ulHvmWKQGzL36aI2PL3UXlEFghLzNcOSwrmqY\n/Pji\n-----END RSA PRIVATE KEY-----\n' }
*/