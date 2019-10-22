const Koa = require("koa");
const static = require("koa-static");
const Router = require("koa-router");

let app = new Koa();
let router = new Router();

app.use(static(__dirname + "/static"));

router.get("/", (ctx, next) => {
    ctx.body = "hello";
})

app.use(router.routes());
app.listen(3000);