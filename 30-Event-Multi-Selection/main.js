{
    let listLis = document.querySelectorAll('.list li');
    let bigBox = document.querySelector('.bigBox');

    document.addEventListener("mousedown", function(e) {
        let box = document.createElement('div');
        box.classList.add('box');
        document.body.appendChild(box);

        let start = {
            l: e.clientX,
            t: e.clientY
        };

        function move(e) {
            let dis = {
                l: Math.abs(e.clientX - start.l),
                t: Math.abs(e.clientY - start.t)
            };

            //set position & size
            box.style.left = Math.min(start.l, e.clientX) + 'px';
            box.style.top = Math.min(start.t, e.clientY) + 'px';
            box.style.width = dis.l + 'px';
            box.style.height = dis.t + 'px';

            //check contact
            listLis.forEach(item => {
                if (isContact(item, box)) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });

            e.preventDefault();
        }

        document.addEventListener('mousemove', move);

        document.addEventListener('mouseup', function() {
            document.removeEventListener('mousemove', move);
            box.remove();

            let activeBox = document.querySelectorAll('.list .active');
            activeBox.forEach(item => {
                bigBox.appendChild(item)
            });

        }, {
            once: true
        })

    });

    function isContact(el1, el2) {
        let el1Pos = el1.getBoundingClientRect();
        let el2Pos = el2.getBoundingClientRect();

        if (
            el1Pos.right < el2Pos.left ||
            el1Pos.left > el2Pos.right ||
            el1Pos.bottom < el2Pos.top ||
            el1Pos.top > el2Pos.bottom
        ) {
            return false;
        } else {
            return true;
        }
    }

}