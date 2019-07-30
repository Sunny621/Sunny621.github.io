//Init Layout
(function() {
    var picList = document.querySelector("#picList");
    var style = document.querySelector("#css");
    var liW = 25;
    var len = css(picList, "width") / liW;
    var inner = '';
    var picLists = null;
    var cssInner = '';
    for (var i = 0; i < len; i++) {
        inner += '<li><span></span><span></span><span></span><span></span><em></em><em></em></li>';
        cssInner += '#picList li:nth-child(' + (i + 1) + ') span {background-position: ' + (-i * liW) + 'px 0;}';
    }
    picList.innerHTML = inner;
    picLists = picList.querySelectorAll("li");
    style.innerHTML += cssInner;
    picLists.forEach(function(item) {
        css(item, "translateZ", -180);
    });
})();

// Interaction
(function() {
    var btns = document.querySelectorAll("#btns li");
    var picLists = document.querySelectorAll("#picList li");
    picLists.forEach(function(item) {
        css(item, "rotateX", 0);
    });
    btns.forEach(function(item, index) {
        item.onclick = function() {
            btns.forEach(function(item) {
                item.classList.remove("active");
            });
            item.classList.add("active");

            var timer = 0;
            var nub = 0;
            timer = setInterval(function() {
                if (nub >= picLists.length - 1) {
                    clearInterval(timer);
                }
                mTween.stop(picLists[nub]);
                css(picLists[nub++], "rotateX", -index * 90);
            }, 30);
        }
    });
})();