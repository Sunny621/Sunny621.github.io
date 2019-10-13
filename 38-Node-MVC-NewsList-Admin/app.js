//main entry
const Koa = require("koa");
const views = require("koa-views");
const static = require("koa-static");
const router = require("./router");
const koaBody = require("koa-body");

let app = new Koa();

app.use(koaBody({
    multipart: true //allow upload
}));

app.use(views(__dirname + "/views"), {
    map: {
        html: "pug"
    }
});

app.use(static(__dirname + "/static"));

router(app); //app.use(router.routes());

app.listen(8080);