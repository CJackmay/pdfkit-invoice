const qrcode = require("qrcode");

(async () => {
    qrcode.toDataURL('I am a pony!',)
        .then(url => {
            console.log(url)
        })
        .catch(err => {
            console.error(err)
        })
})();