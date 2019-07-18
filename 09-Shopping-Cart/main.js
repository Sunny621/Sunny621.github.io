window.onload = function() {
    var minusBtns = document.querySelectorAll("#list .minus");
    var plusBtns = document.querySelectorAll("#list .plus");
    var nums = document.querySelectorAll("#list .n");

    var prices = document.querySelectorAll("#list .price");
    var counts = document.querySelectorAll("#list .count");

    var totalNum = document.querySelector("#totalNums");
    var totalPrice = document.querySelector("#totalPrice");
    var most = document.querySelector("#most");

    var priceArr = [];

    for (var i = 0; i < prices.length; i++) {
        priceArr[i] = parseFloat(prices[i].innerHTML);
    }

    for (var i = 0; i < plusBtns.length; i++) {
        plusBtns[i].index = i;
        plusBtns[i].onclick = function() {
            var num = nums[this.index].innerHTML;
            num++;
            nums[this.index].innerHTML = num;

            var price = priceArr[this.index];
            var count = num * price;
            counts[this.index].innerHTML = count + "元";

            countTotal();
        }
    }

    for (var i = 0; i < minusBtns.length; i++) {
        minusBtns[i].index = i;
        minusBtns[i].onclick = function() {
            var num = nums[this.index].innerHTML;
            if (num == 0) {
                return;
            }
            num--;
            nums[this.index].innerHTML = num;

            var price = priceArr[this.index];
            var count = num * price;
            counts[this.index].innerHTML = count + "元";

            countTotal();
        }
    }

    function countTotal() {
        var total = 0;
        var price = 0;
        var maxNum = 0;

        for (var i = 0; i < nums.length; i++) {
            total = total + parseInt(nums[i].innerHTML);
            price = price + parseFloat(counts[i].innerHTML);

            if (parseInt(nums[i].innerHTML) > 0 && priceArr[i] > maxNum) {
                maxNum = priceArr[i];
            }
        }

        totalNum.innerHTML = total;
        totalPrice.innerHTML = price;
        most.innerHTML = maxNum;
    }
}