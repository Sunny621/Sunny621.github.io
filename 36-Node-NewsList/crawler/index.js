const http = require("http");
const fs = require("fs");
const cheerio = require("cheerio");

let webUrl = "http://news.ifeng.com/";

http.get(webUrl, req => {
    let str = "";
    req.on("data", chunk => {
        str += chunk;
    });
    req.on("end", () => {
        formatData(str);
    })
})

function formatData(data) {
    let $ = cheerio.load(data);
    let arr = [];
    $(".news-stream-newsStream-news-item-infor h2 a").each((k, v) => {
        let dataObj = new Date();
        let obj = {
            id: k + 1,
            title: $(v).text(),
            addtime: dataObj.getFullYear() + "-" + (dataObj.getMonth() + 1) + "-" + dataObj.getDate(),
            country: "中国",
            type: "新闻",
            detail: $(v).text(),
            img: "/img/img.png"
        }
        arr.push(obj);
    })
    fs.writeFileSync("data.json", JSON.stringify(arr));

}