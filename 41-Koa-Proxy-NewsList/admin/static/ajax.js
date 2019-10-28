function ajax(options) {
    let opts = Object.assign({
        method: "get",
        url: "",
        headers: {
        //     "content-type": "application/x-www-form-urlencoded"
        },
        data: {},
        success: function () { }
    }, options)
    let xhr = new XMLHttpRequest();
    // name=zhangsan&age=20; {name:zhangsan,age:20}
    if (opts.method.toLowerCase() === "get") {
        opts.url = opts.url + "?" + o2u(opts.data);
    }
    xhr.open(opts.method, opts.url, true);
    for (let i in opts.headers) {
        xhr.setRequestHeader(i, opts.headers[i]);
    }
    
    xhr.onload = function () {
        let responseData;
        if (xhr.getResponseHeader("content-type").includes("xml")) {
            responseData = xhr.responseXML;
        } else {
            responseData = JSON.parse(xhr.responseText);
        }
        opts.success(responseData);
    }
    if (opts.method.toLowerCase() === "get") {
        xhr.send();
    } else {
        let sendData;
        if(opts.headers['content-type']){
            switch (opts.headers['content-type']) {
                case 'application/x-www-form-urlencoded':
                    sendData = o2u(opts.data);
                    break;
                case 'application/json':
                    sendData = JSON.stringify(opts.data);
                    break;
                default:
                    sendData = opts.data;
                    break;
            }
        }
       
        xhr.send(sendData);
    }
    // console.log(o2u({ name: "zhangsan", age: 20 }));
    function o2u(obj) {
        let keys = Object.keys(obj);
        let values = Object.values(obj);
        return keys.map((v, k) => {
            // name=zhangsan
            // age=20;
            return `${v}=${values[k]}`
        }).join("&")
    }
}