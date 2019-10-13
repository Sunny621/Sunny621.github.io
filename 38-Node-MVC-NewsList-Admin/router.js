let routerNews = require("./routers/news");
let routerAdmin = require("./routers/admin");
let Router = require("koa-router");
let router = new Router;

module.exports = (app) => {
    //redirect
    router.get("/", ctx => { ctx.redirect("/news/index") });
    app.use(router.routes());

    app.use(routerNews.routes());
    app.use(routerAdmin.routes());
}