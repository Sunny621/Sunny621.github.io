function ajax(options) {
    let opts = Object.assign({
        url: "",
        method: "get",
        data: "",
        headers: {
            "content-type": "application/x-www-form-urlencoded",
        },
        success(res) {}
    }, options)

    let xhr = new XMLHttpRequest();

    if (opts.method === "get") {
        opts.url = opts.url + "?" + o2u(opts.data);
    }

    xhr.open(opts.method, opts.url, true);
    // 设置头部
    for (let key in opts.headers) {
        xhr.setRequestHeader(key, opts.headers[key]);
    }
    let sendData;
    switch (opts.headers['content-type']) {
        case 'application/x-www-form-urlencoded':
            sendData = o2u(opts.data);
            break;
        case 'application/json':
            sendData = JSON.stringify(opts.data);
            break;
    }

    xhr.onload = function() {
        opts.success(JSON.parse(xhr.responseText));
    }

    if (opts.method == "get") {
        xhr.send();
    } else {
        xhr.send(sendData);
    }

    function o2u(obj) {
        let keys = Object.keys(obj);
        let values = Object.values(obj);
        return keys.map((v, k) => {
            return `${v}=${values[k]}`;
        }).join("&");
    }
}