{
    function Tab(btns, divs) {
        this.btns = btns;
        this.divs = divs;
        this.nowIndex = 0;

        this.bindClickEvent();
    }

    Tab.prototype.bindClickEvent = function() {
        this.btns.forEach((item, index) => {
            item.onclick = () => {
                this.nowIndex = index;
                console.log(this.nowIndex);
                this.divsFor(index);
            }
        })
    }

    Tab.prototype.divsFor = function(i) {
        this.divs.forEach((item, index) => {
            if (index == i) {
                // 选中项；
                this.btns[index].className = "active";
                this.divs[index].style.display = "block";
            } else {
                // 非选中项；
                this.btns[index].className = "";
                this.divs[index].style.display = "none";
            }
        })
    }


    // 下一页功能 
    let btns = document.querySelectorAll(".mydiv1 .btns p");
    let divs = document.querySelectorAll(".mydiv1 div");

    let tab1 = new Tab(btns, divs);

    let num = 0;
    document.querySelector(".nextPre").onclick = function() {
        num = tab1.nowIndex;
        num++;
        num = num > tab1.btns.length - 1 ? 0 : num;
        tab1.nowIndex = num;
        tab1.divsFor(num);
    }

    // 自动轮播 
    let btns2 = document.querySelectorAll(".mydiv2 .btns p");
    let divs2 = document.querySelectorAll(".mydiv2 div");

    let tab2 = new Tab(btns2, divs2);
    let num2 = 0;
    let timer = null;
    document.querySelector(".autoPlay").onclick = function() {
        num2 = tab2.nowIndex;
        clearInterval(timer);
        timer = setInterval(() => {
            num2++;
            num2 = num2 > tab2.btns.length - 1 ? 0 : num2
            tab2.nowIndex = num2;
            tab2.divsFor(num2);
        }, 1000);
    }
}