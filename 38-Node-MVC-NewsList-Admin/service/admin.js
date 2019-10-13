//admin data related
let newsData = require("../data/data.json");
const fs = require("fs");
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
    },
    addNewsData(request) {
        let { title, content, type, country } = request.body;
        let dataObj = new Date();
        let obj = {
            id: newsData[newsData.length - 1].id + 1,
            title,
            content,
            country,
            type,
            addTime: dataObj.getFullYear()
        };

        //save uploaded files
        if (typeof request.files.img !== 'undefined') {
            fs.writeFileSync("static/img/" + request.files.img.name, fs.readFileSync(request.files.img.path));
            obj.imgUrl = "/img/" + request.files.img.name;
        }
        newsData.push(obj);
        return new Promise(resolve => {
            fs.writeFile("data/data.json", JSON.stringify(newsData), err => {
                if (!err) {
                    console.log("Add Successfully");
                    resolve({
                        info: "Add Successfully",
                        code: 0
                    })
                } else {
                    resolve({
                        info: "Add Failed",
                        code: 1
                    })
                }
            })
        })
    },
    deleteList(id) {
        newsData.forEach((el, index) => {
            if (el.id == id) {
                newsData.splice(index, 1);
            }
        });
        return new Promise(resolve => {
            fs.writeFile("data/data.json", JSON.stringify(newsData), err => {
                if (!err) {
                    console.log("delete Successfully");
                    resolve({
                        info: "Delete Successfully",
                        code: 0
                    })
                } else {
                    resolve({
                        info: "Delete Failed",
                        code: 1
                    })
                }
            })
        })
    }


}