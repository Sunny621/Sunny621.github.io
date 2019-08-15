{
    let box = document.querySelector('#box');

    let maxX = document.documentElement.clientWidth - box.offsetWidth;
    let maxY = document.documentElement.clientHeight - box.offsetHeight;

    //drag
    box.addEventListener('mousedown', function(e) {
        let start = {
            x: e.clientX,
            y: e.clientY
        };

        let origin = {
            l: box.offsetLeft,
            t: box.offsetTop
        };

        document.addEventListener('mousemove', moveFn)

        function moveFn(e) {
            let now = {
                x: e.clientX,
                y: e.clientY
            };

            let dis = {
                x: now.x - start.x,
                y: now.y - start.y
            };

            let newPos = {
                x: dis.x + origin.l,
                y: dis.y + origin.t
            };

            newPos = limitation(newPos)

            box.style.left = newPos.x + 'px';
            box.style.top = newPos.y + 'px';
        }

        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', moveFn);
        })
    })

    function limitation(newPos) {
        newPos.x = Math.max(0, newPos.x);
        newPos.y = Math.max(0, newPos.y);

        newPos.x = Math.min(newPos.x, maxX);
        newPos.y = Math.min(newPos.y, maxY);
        return newPos
    }

    //keyborad move
    let onOff = {
        toL: false,
        toT: false,
        toR: false,
        toB: false,
    };

    setInterval(function() {
        if (onOff.toL) {
            let l = parseInt(getComputedStyle(box)['left']);
            if (l < 10) {
                box.style.left = 0 + 'px';
            } else {
                box.style.left = parseInt(getComputedStyle(box)['left']) - 10 + 'px';
            }
        }

        if (onOff.toT) {
            let t = parseInt(getComputedStyle(box)['top']);
            if (t < 10) {
                box.style.top = 0 + 'px';
            } else {
                box.style.top = parseInt(getComputedStyle(box)['top']) - 10 + 'px';
            }
        }

        if (onOff.toR) {
            let r = parseInt(getComputedStyle(box)['left']);
            if (r > maxX - 10) {
                box.style.left = maxX + 'px';
            } else {
                box.style.left = parseInt(getComputedStyle(box)['left']) + 10 + 'px';
            }
        }

        if (onOff.toB) {
            let b = parseInt(getComputedStyle(box)['top']);
            if (b > maxY - 10) {
                box.style.top = maxY + 'px';
            } else {
                box.style.top = parseInt(getComputedStyle(box)['top']) + 10 + 'px';
            }
        }
    }, 30);

    document.addEventListener('keydown', function(e) {
        let code = e.keyCode;
        switch (code) {
            case 37:
                onOff.toL = true;
                break;
            case 38:
                onOff.toT = true;
                break;
            case 39:
                onOff.toR = true;
                break;
            case 40:
                onOff.toB = true;
                break;
        }
    })


    document.addEventListener('keyup', function(e) {
        let code = e.keyCode;
        switch (code) {
            case 37:
                onOff.toL = false;
                break;
            case 38:
                onOff.toT = false;
                break;
            case 39:
                onOff.toR = false;
                break;
            case 40:
                onOff.toB = false;
                break;
        }
    })
}