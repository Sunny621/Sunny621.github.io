const adminService = require("../service/admin");
module.exports = {
    async showIndex(ctx) {
        await ctx.render("admin/admin.pug");
    },
    async addNews(ctx) {
        await ctx.render("admin/addNews.pug");
    },
    async newsList(ctx) {
        let p = ctx.query.p || 1;
        let everyPageCount = 5;
        let res = adminService.getData(p, everyPageCount);
        let pageCount = adminService.getPageCount(everyPageCount);
        await ctx.render("admin/newsList.pug", {
            res,
            pageCount
        });
    },
    async addNewsData(ctx) {
        //get data from post
        //console.log(ctx.request.body); //data
        //console.log(ctx.request.files) //upload files
        let res = await adminService.addNewsData(ctx.request);
        //console.log(res);
        await ctx.render("admin/message.pug", {
            res
        });
    },
    async deleteList(ctx) {
        let id = ctx.query.id || 1;
        let res = await adminService.deleteList(id);
        console.log(res);
        if (res.code == 0) {
            ctx.redirect("/admin/newsList");
        }
    }
}