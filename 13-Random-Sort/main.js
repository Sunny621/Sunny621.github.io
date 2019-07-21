(function() {
    var btns = document.querySelectorAll(".nav a");
    var lis = document.querySelectorAll("ul li");
    var ul = document.querySelector("ul");

    var lisArr = Array.from(lis);
    var onOff = true;

    btns[0].onclick = function() {
        if (onOff) {
            this.innerHTML = "从大到小";
            sort();
            onOff = false;
        } else {
            this.innerHTML = "从小到大";
            sort();
            onOff = true;
        }
    }

    btns[1].onclick = function() {
        randomSort();
    }

    function sort() {
        lisArr.sort(function(li1, li2) {
            var p1 = li1.querySelector("p");
            var p2 = li2.querySelector("p");
            if (onOff) {
                return p1.innerHTML.charAt(0) - p2.innerHTML.charAt(0);
            } else {
                return p2.innerHTML.charAt(0) - p1.innerHTML.charAt(0);
            }
        })

        lisArr.forEach(function(element, index) {
            ul.append(element);
        });
    }

    function randomSort() {
        lisArr.sort(function() {
            return Math.random() - .5;
        });
        lisArr.forEach(function(element, index) {
            ul.append(element);
        });
    }

})();