(function() {
    var ul = document.querySelector("#pics");
    var imgsAll = ul.querySelectorAll("li");
    var navs = document.querySelectorAll("#navs a");

    var prevBtn = document.querySelector(".prev");
    var nextBtn = document.querySelector(".next");

    var nowIndex = 0;
    var nextIndex = 0;
    var imgW = css(imgsAll[0], "width");

    var imgs = [
        "img/img (1).jpg",
        "img/img (2).jpg",
        "img/img (3).jpg",
        "img/img (4).jpg",
        "img/img (5).jpg"
    ];

    var isMove = false;

    css(ul, "translateX", 0);

    navs.forEach(function(item, index) {
        item.onclick = function() {
            nextIndex = index;
            if (nextIndex > nowIndex) {
                tab(imgs[nowIndex], imgs[nextIndex], 0, -imgW);
            } else if (nextIndex < nowIndex) {
                tab(imgs[nextIndex], imgs[nowIndex], -imgW, 0);
            }
        }
    });

    nextBtn.onclick = function() {
        nextIndex = nowIndex + 1;
        nextIndex = nextIndex > navs.length - 1 ? 0 : nextIndex;

        tab(imgs[nowIndex], imgs[nextIndex], 0, -imgW);
    };

    prevBtn.onclick = function() {
        nextIndex = nowIndex - 1;
        nextIndex = nextIndex < 0 ? navs.length - 1 : nextIndex;

        tab(imgs[nextIndex], imgs[nowIndex], -imgW, 0);
    };

    function tab(img1, img2, start, target) {
        if (isMove) return;
        isMove = true;
        imgsAll[0].innerHTML = '<img src="' + img1 + '" />';
        imgsAll[1].innerHTML = '<img src="' + img2 + '" />';

        css(ul, "translateX", start);
        mTween({
            el: ul,
            attr: {
                translateX: target
            },
            cb: function() {
                isMove = false;
            }
        });

        nowIndex = nextIndex;
        navs.forEach(function(item, index) {
            item.classList.remove("active");
        });
        navs[nowIndex].classList.add("active");
    }
})();