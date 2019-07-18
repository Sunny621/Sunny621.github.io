window.onload = function() {
    var box = document.querySelector("#box");
    var outNavs = box.querySelectorAll(".navs li");
    var divs = box.querySelectorAll("div");

    var outerNum = 0;
    var innerNum = 0;
    var outerLength = outNavs.length;

    var lis = [];
    var imgs = [];
    var timer = null;

    init();
    auto();

    box.onmouseover = function() {
        clearInterval(timer);
    }

    box.onmouseout = function() {
        auto();
    }

    function auto() {
        timer = setInterval(function() {
            innerNum++;
            if (innerNum >= lis[outerNum].length) {
                outerNum++;
                if (outerNum >= outerLength) {
                    outerNum = 0;
                }
                innerNum = 0;
                setOuter();
            }
            setInner();
        }, 600);
    }


    function init() {
        setEvent();
        if (outerNum >= outerLength) {
            outerNum = 0;
        }
        if (innerNum >= lis[outerNum].length) {
            innerNum = 0;
        }
        setOuter();
        setInner();
    }


    function setOuter() {
        for (var i = 0; i < outerLength; i++) {
            outNavs[i].className = "";
            divs[i].style.display = "none";
        }

        outNavs[outerNum].className = "active";
        divs[outerNum].style.display = "block";
    }

    function setInner() {
        for (var i = 0; i < lis[outerNum].length; i++) {
            lis[outerNum][i].className = '';
            imgs[outerNum][i].style.display = 'none';
        }

        lis[outerNum][innerNum].className = 'active';
        imgs[outerNum][innerNum].style.display = 'block';
    }

    // add events
    function setEvent() {
        for (var i = 0; i < outerLength; i++) {
            outNavs[i].index = i;
            outNavs[i].onmouseover = function() {
                outerNum = this.index;
                setOuter();
                innerNum = 0;
                setInner();
            }

            lis[i] = divs[i].querySelectorAll('li');
            imgs[i] = divs[i].querySelectorAll('img');

            for (var j = 0; j < lis[i].length; j++) {
                lis[i][j].index = j;
                lis[i][j].onmouseover = function() {
                    innerNum = this.index;
                    setInner();
                }
            }
        }
    }
}