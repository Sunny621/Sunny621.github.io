//news data related
let newsData = require("../data/data.json");

module.exports = {
    getData(p, everyPageCount) {
        let formatData = newsData.slice((p - 1) * everyPageCount, p * everyPageCount);
        return formatData;
    },
    getPageCount(everyPageCount) {
        return Math.ceil(newsData.length / everyPageCount);
    },
    getDetailData(id) {
        return newsData[id - 1];
    }
}