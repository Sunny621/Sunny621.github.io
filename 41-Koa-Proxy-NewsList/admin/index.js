const Koa = require("koa");
const Router = require("koa-router");
const koaBody = require("koa-body");
const static = require("koa-static");
const koaServerHttpProxy = require("koa-server-http-proxy");
const nunjucks = require("koa-nunjucks-2");
let app = new Koa()
let router = new Router();

app.use(koaServerHttpProxy("/api", {
    target: "http://localhost:7001",
    pathRewrite: { '^/api': '' }
}))
app.use(koaBody({
    multipart: true
}))
app.use(static(__dirname + "/static"));
app.use(nunjucks({
    ext: "html",
    path: __dirname + "/views"
}))

router.get("/admin", async ctx => {
    await ctx.render("admin");
})
router.get("/addNews", async ctx => {
    await ctx.render("addNews");
})

app.use(router.routes());
app.listen(5000);