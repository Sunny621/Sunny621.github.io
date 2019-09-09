const http = require("http");
const path = require("path");
const fs = require("fs");
const cheerio = require("cheerio");
const url = require("url");

const mime = require("./mime.json");
let myData = require("../crawler/data.json");

let server = http.createServer((req, res) => {
    let urlObj = url.parse(req.url, true);
    let pathName = urlObj.pathname;

    if (pathName === "/news" || pathName === "/") {
        //render news page
        let newsdata = fs.readFileSync("./views/index.html");
        let $ = cheerio.load(newsdata);
        let myhtml = "";

        //get page
        let page = 1;
        if (urlObj.query.get) {
            page = urlObj.query.get;
        }

        let everypage = 5;
        let startCount = (page - 1) * everypage;
        let endCount = page * everypage;
        let newMyData = myData.slice(startCount, endCount);

        newMyData.forEach(v => {
            myhtml += `<li class="news">
            <a href="javascript:;">
                <img src="./img/img.png" alt="">
            </a>
            <div>
                <h3>
                    <a href="/detail?id=${v.id}">${v.title}</a>
                </h3>
                <div class="info">
                    <span class="tips"><span>${v.type}</span><span>${v.country}</span><span>逮捕</span></span>
                    <!-- <span class="line"></span> -->
                    <span class="time">| &nbsp;&nbsp;${v.addtime}</span>
                </div>
            </div>
        </li>`;
        })
        $(".news-list").html(myhtml)

        //render pagination
        let pageNum = Math.ceil(myData.length / everypage);
        page = parseInt(page);
        let pageHtml = `<a href="/news?get=${page>1?page-1:1}" class="prev">⌜</a>`;
        for (let i = 1; i <= pageNum; i++) {
            pageHtml += `<a href="/news?get=${i}">${i}</a>`;
        }
        pageHtml += `<a href="/news?get=${page<pageNum?page+1:pageNum}" class="next">⌝</a>`;
        $(".pagination").html(pageHtml);

        res.end($.html());
    } else if (pathName === "/detail") {
        //render detail page
        let newsdata = fs.readFileSync("./views/detail.html");

        let newsId = parseInt(urlObj.query.id);
        let detailData = myData[newsId - 1];

        let $ = cheerio.load(newsdata);
        let detailHtml = `<h1 class="title">${detailData.title}</h1>
        <div class="article-info"> 类型：${detailData.type} 时间：${detailData.addtime}</div>
        <p class="content">${detailData.detail}</p>`;

        $(".text").html(detailHtml);
        res.end($.html());
    } else {
        if (pathName !== "/favicon.ico") {
            let extname = path.extname(req.url);
            res.writeHead(200, { "Content-type": mime[extname] })
            let rs = fs.createReadStream("./views/" + pathName);
            rs.pipe(res);
        }
    }

})

server.listen(8000);