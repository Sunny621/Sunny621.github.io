const newsService = require("../service/news");

module.exports = {
    async showIndex(ctx) {
        let p = ctx.query.p || 1;
        let everyPageCount = 5;
        let newsData = newsService.getData(p, everyPageCount);
        let pageCount = newsService.getPageCount(everyPageCount);
        await ctx.render("news/index.pug", {
            newsData,
            pageCount
        });
    },
    async showDetail(ctx) {
        let id = ctx.query.id || 1;
        let detailData = newsService.getDetailData(id);
        await ctx.render("news/detail.pug", {
            detailData
        });
    }
}