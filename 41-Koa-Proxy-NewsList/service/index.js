const Koa = require("koa");
const Router = require("koa-router");
const koaBody = require("koa-body");
const fs = require("fs");
let mydata = require("./data/data.json");
let app = new Koa();
let router = new Router();
app.use(koaBody({
    multipart: true
}))
router.post("/post", async ctx => {
    console.log(ctx.request.body);
    if (!fs.existsSync("upload")) {
        fs.mkdirSync("upload");
    }
    fs.writeFileSync("upload/" + ctx.request.files.img.name, fs.readFileSync(ctx.request.files.img.path));
    ctx.request.body.url = "upload/" + ctx.request.files.img.name;
    let res = await new Promise((resolve) => {
        mydata.push(ctx.request.body);
        fs.writeFile("data/data.json", JSON.stringify(mydata), err => {
            if (err) {
                resolve({
                    info: "失败",
                    code: 0
                })
            } else {
                resolve({
                    info: "成功",
                    code: 1
                })
            }
        });
    })
    ctx.body = res;
});

app.use(router.routes());
app.listen(7001);