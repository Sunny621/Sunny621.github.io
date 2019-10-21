const Koa = require("koa");
const static = require("koa-static");
const Router = require("koa-router");
const koaBody = require("koa-body");
const nunjucks = require("koa-nunjucks-2");
const fs = require("fs");

let imgData = require("./data/data.json");
let userData = require("./data/user.json");

let app = new Koa()
let router = new Router();
app.use(koaBody({
    multipart: true
}))
app.use(nunjucks({
    ext: "html",
    path: __dirname + "/views"
}))
app.use(static(__dirname + "/static"));

router.get("/", ctx => {
    ctx.body = "hello";
})
router.get("/login", async ctx => {
    await ctx.render("login");
})
router.get("/photo", async ctx => {
    await ctx.render("photo", {
        imgData
    });
})

router.post("/checkUserName", async ctx => {
    let res = userData.find(el => el.username == ctx.request.body.userName);
    let responseData;
    if (res) {
        responseData = {
            info: "用户名正确",
            status: 0
        }
    } else {
        responseData = {
            info: "用户名错误",
            status: 1
        }
    }
    ctx.body = responseData;
})

router.post("/checkUser", async ctx => {
    let res = userData.find(el => (el.username == ctx.request.body.userName && el.pwd == parseInt(ctx.request.body.pwd)));
    let responseData;
    if (res) {
        responseData = {
            info: "用户名和密码正确",
            status: 0
        }
    } else {
        responseData = {
            info: "用户名或者密码错误",
            status: 1
        }
    }
    ctx.body = responseData;
})

router.post("/upload", async ctx => {
    // ctx.request.files.img
    fs.writeFileSync("static/img/" + ctx.request.files.img.name, fs.readFileSync(ctx.request.files.img.path))
    let obj = {
        name: ctx.request.files.img.name,
        url: "/img/" + ctx.request.files.img.name
    }
    imgData.push(obj);
    let result = await new Promise(resolve => {
        fs.writeFile("data/data.json", JSON.stringify(imgData), err => {
            if (err) {
                console.log("上传失败")
                resolve({
                    info: "上传失败",
                    status: 1
                })
            } else {
                console.log("上传成功")
                resolve({
                    info: "上传成功",
                    status: 0
                })
            }
        });
    })
    ctx.body = result;
})

app.use(router.routes());
app.listen(3030);