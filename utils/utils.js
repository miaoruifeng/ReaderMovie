function convertToStarsArray(stars) {
    var num = stars / 10;
    var array = [];
    if (Math.floor(num) === num) {
        for (var i = 1; i <= 5; i++) {
            if (i <= num) {
                array.push(1);
            } else {
                array.push(0);
            }
        }
    } else {
        for (var i = 1; i <= 5; i++) {
            if (i <= num) {
                array.push(1);
            } else if (i == Math.ceil(num)) {
                array.push(2);
            } else {
                array.push(0);
            }
        }
    }
    return array;
}

function http(url, callBack) {
    wx.request({
        url: url,
        method: 'GET',
        header: {
            "Content-Type": "json"
        },
        success: res => {
            callBack(res.data);
        },
        fail: err => {
            console.error(err);
        }
    });
}

module.exports = {
    convertToStarsArray: convertToStarsArray,
    http
}