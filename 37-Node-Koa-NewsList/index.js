const Koa = require("koa");
const Views = require("koa-views");
const Static = require("koa-static");
const Router = require("koa-router");

let app = new Koa();
let router = new Router();
let myData = require("./data/data.json");

app.use(Views(__dirname + "/views"), {
    //template engine
    map: {
        html: "pug"
    }
})

router.get("/news", async ctx => {
    //get page
    let page = ctx.query.p || 1;
    let everypage = 5;
    let startCount = (page - 1) * everypage;
    let endCount = page * everypage;
    let newMyData = myData.slice(startCount, endCount);
    let pageNum = Math.ceil(myData.length / everypage);

    await ctx.render("news.pug", {
        newMyData,
        pageNum
    });
})

router.get("/detail", async ctx => {
    let newsId = parseInt(ctx.query.id);
    let detailData = myData[newsId - 1];
    await ctx.render("detail.pug", {
        detailData
    })
})

app.use(Static(__dirname + "/static"))

app.use(router.routes());

app.listen(8080);