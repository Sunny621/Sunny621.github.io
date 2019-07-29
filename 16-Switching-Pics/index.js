//Layout Correction
(function() {
    var pics = document.querySelectorAll("#pics li");
    pics.forEach(function(item) {
        var img = item.querySelector("img");
        var w = img.width;
        css(item, "width", w);
        img.style.width = "100%";
    });
})();

(function() {
    var pics = document.querySelectorAll("#pics li");
    var nextBtn = document.querySelector(".next_div");
    var next = document.querySelector(".next");
    var prevBtn = document.querySelector(".prev_div");
    var prev = document.querySelector(".prev");

    var data = [];
    pics.forEach(function(item) {
        data.push({
            width: css(item, "width"),
            left: css(item, "left"),
            zIndex: css(item, "zIndex"),
            opacity: css(item, "opacity"),
            top: css(item, "top")
        });
    });

    nextBtn.onmouseover = function() {
        var ico1 = next.querySelector(".ico1");
        var ico2 = next.querySelector(".ico");
        var text = next.querySelector(".txt");
        mTween.stop(text);
        mTween.stop(ico1);
        mTween({
            el: ico1,
            attr: {
                opacity: 1
            }
        });
        mTween({
            el: text,
            attr: {
                opacity: 1
            },
            cb: function() {
                mTween({
                    el: text,
                    attr: {
                        right: 45
                    }
                });
            }
        });
    };

    prevBtn.onmouseover = function() {
        var ico1 = prev.querySelector(".ico1");
        var ico2 = prev.querySelector(".ico");
        var text = prev.querySelector(".txt");
        mTween.stop(text);
        mTween.stop(ico1);
        mTween({
            el: ico1,
            attr: {
                opacity: 1
            }
        });
        mTween({
            el: text,
            attr: {
                opacity: 1
            },
            cb: function() {
                mTween({
                    el: text,
                    attr: {
                        left: 45
                    }
                });
            }
        });
    };

    nextBtn.onmouseout = function() {
        var ico1 = next.querySelector(".ico1");
        var ico2 = next.querySelector(".ico");
        var text = next.querySelector(".txt");
        mTween.stop(text);
        mTween.stop(ico1);
        mTween({
            el: text,
            attr: {
                right: 65
            },
            cb: function() {
                mTween({
                    el: ico1,
                    attr: {
                        opacity: 0
                    }
                });
                mTween({
                    el: text,
                    attr: {
                        opacity: 0
                    }
                });
            }
        });
    };

    prevBtn.onmouseout = function() {
        var ico1 = prev.querySelector(".ico1");
        var ico2 = prev.querySelector(".ico");
        var text = prev.querySelector(".txt");
        mTween.stop(text);
        mTween.stop(ico1);
        mTween({
            el: text,
            attr: {
                left: 65
            },
            cb: function() {
                mTween({
                    el: ico1,
                    attr: {
                        opacity: 0
                    }
                });
                mTween({
                    el: text,
                    attr: {
                        opacity: 0
                    }
                });
            }
        });
    };

    nextBtn.onclick = function() {
        data.unshift(data.pop());
        switchPics();
    };

    prevBtn.onclick = function() {
        data.push(data.shift());
        switchPics();
    };

    function switchPics() {
        pics.forEach(function(item, index) {
            mTween({
                el: item,
                attr: {
                    width: data[index].width,
                    left: data[index].left,
                    zIndex: data[index].zIndex,
                    opacity: data[index].opacity,
                    top: data[index].top
                }
            })
        });
    }
})();