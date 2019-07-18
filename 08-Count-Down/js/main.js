window.onload = function() {
    var inputs = document.querySelectorAll("#fill_in input");
    var target = document.querySelector("#target strong");
    var go = document.querySelector("#go");
    var countDownTimePs = document.querySelectorAll("#date p");

    var nowDate = new Date();
    var wishDate = null;
    var timer = null;
    var onOff = true;

    init();

    go.onclick = function() {
        if (!onOff) {
            return;
        }
        onOff = false;

        var year = inputs[0].value;
        var month = inputs[1].value - 1;
        var day = inputs[2].value;

        wishDate = new Date(year, month, day);

        timer = setInterval(function() {
            updateDate();
        }, 1000);

        updateDate();
    }

    function init() {
        var year = nowDate.getFullYear();
        var month = nowDate.getMonth() + 1;
        var day = nowDate.getDate();

        inputs[0].value = year;
        inputs[1].value = month;
        inputs[2].value = day;

        target.innerHTML = renderTime(year, month, day);
    }

    function renderTime(year, month, day) {
        return year + "年" + month + "月" + day + "日";
    }

    function countDate(dis) {
        var oneDay = 1000 * 60 * 60 * 24;
        var oneHour = 1000 * 60 * 60;
        var oneMin = 1000 * 60;
        var oneSec = 1000;

        var timeArr = [];

        timeArr[0] = parseInt(dis / oneDay);
        dis = dis % oneDay;
        timeArr[1] = parseInt(dis / oneHour);
        dis = dis % oneHour;
        timeArr[2] = parseInt(dis / oneMin);
        dis = dis % oneMin;
        timeArr[3] = parseInt(dis / oneSec);

        fillZero(timeArr);

        for (var i = 0; i < timeArr.length; i++) {
            countDownTimePs[i].innerHTML = timeArr[i];
        }

    }

    function fillZero(time) {
        for (var i = 0; i < time.length; i++) {
            time[i] < 10 ? time[i] = "0" + time[i] : time[i] = "" + time[i];
        }
        return time;
    }

    function updateDate() {
        nowDate = new Date();
        var dis = wishDate - nowDate;

        if (dis <= 0) {
            alert("No need to count down!");
            clearInterval(timer);
            onOff = true;
            return;
        }

        countDate(dis);
    }

};