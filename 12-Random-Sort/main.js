var data = [{
    title: "1-温馨办公",
    img: "images/1.png"
}, {
    title: "2-游戏桌面",
    img: "images/2.png"
}, {
    title: "3-汽车摇滚",
    img: "images/3.png"
}, {
    title: "4-狭路相逢",
    img: "images/4.png"
}, {
    title: "5-棒球小子",
    img: "images/5.png"
}, {
    title: "6-球鞋动力",
    img: "images/6.png"
}, {
    title: "7-游戏官网",
    img: "images/7.png"
}, {
    title: "8-指尖社区",
    img: "images/8.png"
}];

(function() {
    var list = document.querySelector("#list");
    var navs = document.querySelectorAll(".nav a");
    var isReverse = false; // false 代表从小到大，true 从大到小

    render();

    function render() {
        var inner = data.map(function(item, index) {
            return '<li><img src="' + item["img"] + '" alt=""><p>' + item["title"] + '</p></li>';
        });

        list.innerHTML = inner.join("");
    }

    navs[0].onclick = function() {
        data.sort(function(n1, n2) {
            n1 = parseInt(n1.title);
            n2 = parseInt(n2.title);
            return isReverse ? n2 - n1 : n1 - n2;
        });
        render();
        isReverse = !isReverse;
        this.innerHTML = isReverse ? "从大到小" : "从小到大";
    };

    navs[1].onclick = function() {
        data.sort(function(n1, n2) {
            n1 = parseInt(n1.title);
            n2 = parseInt(n2.title);
            return Math.random() - .5;
        });
        render();
    }
})();