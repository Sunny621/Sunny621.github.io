(function() {
    var ul = document.querySelector("#pics");
    var img = ul.querySelector("li");
    var navs = document.querySelectorAll("#navs a");

    var prevBtn = document.querySelector(".prev");
    var nextBtn = document.querySelector(".next");

    var now = 0;
    var imgW = css(img, "width");

    css(ul, "translateX", 0);

    nextBtn.onclick = function() {
        if (now >= navs.length) {
            now = 0;
            css(ul, "translateX", 0);
        }
        now++;
        tab();
    };

    prevBtn.onclick = function() {
        if (now == 0) {
            now = navs.length;
            css(ul, "translateX", -now * imgW);
        }
        now--;
        tab();
    }

    navs.forEach(function(item, index) {
        item.onclick = function() {
            now = index;
            tab();
        };
    });

    function tab() {
        navs.forEach(function(item, index) {
            item.classList.remove("active");
        });
        navs[now % navs.length].classList.add("active");

        mTween({
            el: ul,
            attr: {
                translateX: -now * imgW
            }
        });
    }

})()