const Router = require("koa-router");
const newsController = require("../controller/news");
let routerNews = new Router({
    prefix: "/news"
});

routerNews.get("/index", newsController.showIndex);
routerNews.get("/detail", newsController.showDetail);

module.exports = routerNews;