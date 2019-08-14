{
    let arr = ['河北', '山西', '辽宁', '吉林', '黑龙江', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '海南', '四川', '贵州', '云南', '陕西', '甘肃', '青海', '台湾',
        '北京', '天津', '上海', '重庆'
    ];

    let list = document.querySelector('.list');
    let wrap = document.querySelector('.wrap');
    let scroll = document.querySelector('.scroll');
    let scrollWrap = document.querySelector('.scroll-wrap');
    let inner = '';

    arr.forEach(item => {
        inner += `<li>${item}</li>`;
    });

    list.innerHTML = inner;

    //calc and set scroll bar height
    let scrollBarH = css(wrap, 'height') / css(list, 'height') * css(scrollWrap, 'height');
    css(scroll, 'height', scrollBarH);

    //available scroll space
    let maxScrollH = css(scrollWrap, 'height') - css(scroll, 'height');
    let maxScreenH = css(list, 'height') - css(wrap, 'height');

    scroll.addEventListener('mousedown', function(e) {
        let startY = e.clientY;
        let startPos = css(scroll, 'top');

        function moveFn(e) {
            let disY = e.clientY - startY;
            let newY = startPos + disY;

            //limitation
            newY = Math.max(0, newY);
            newY = Math.min(maxScrollH, newY);

            setScroll(newY);
            e.preventDefault();
        }

        document.addEventListener('mousemove', moveFn);
        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', moveFn);
        }, {
            once: true
        })
    });

    scrollFn(wrap, function() {
        let newY = css(scroll, 'top') - 10;
        newY = Math.max(newY, 0)
        setScroll(newY);
    }, function() {
        let newY = css(scroll, 'top') + 10;
        newY = Math.min(newY, maxScrollH)
        setScroll(newY);
    })

    function setScroll(newY) {
        let scale = newY / maxScrollH;
        css(list, 'top', -maxScreenH * scale);
        css(scroll, 'top', newY);
    }

    function css(el, attr, val) {
        if (arguments.length == 3) {
            el.style[attr] = val + 'px';
        } else {
            return parseInt(getComputedStyle(el)[attr]);
        }
    }

    function scrollFn(el, upFn, downFn) {
        // chrome & ie  
        el.addEventListener('mousewheel', function(e) {
            if (e.wheelDelta > 0) {
                upFn && upFn()
            } else {
                downFn && downFn()
            }

            e.preventDefault();
        })

        // firefox
        el.addEventListener('DOMMouseScroll', function(e) {
            if (e.detail > 0) {
                downFn && downFn()
            } else {
                upFn && upFn()
            }
            e.preventDefault();
        })
    }
}