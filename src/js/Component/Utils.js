import $ from 'jquery';

var Utils = {
    // ajax component
    Ajax: (url, method, data, success, err) => {
        $.ajax({
            url: url,
            type: method,
            data: data,
            success: success,
            error: err,

        })
    }
};

export default Utils;