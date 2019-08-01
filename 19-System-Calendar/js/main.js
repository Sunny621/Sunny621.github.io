function selectElem(selector) {
    return document.querySelector(selector);
}

//Add O
function addZero(num) {
    return num > 10 ? "" + num : "0" + num;
}

//Init Clock
(function() {
    //Init Scale
    var clock = selectElem("#lattice-list");
    var inner = "";
    var deg = 360 / 12;
    for (var i = 0; i < 12; i++) {
        inner = inner + '<li class="lattice" style="transform: rotate(' + i * deg + 'deg)"></li>';
    }
    clock.innerHTML = inner;

    //Init Pointers
    initPointer();
    setInterval(initPointer, 1000);

    function initPointer() {
        var hour = selectElem(".hour");
        var minute = selectElem(".min");
        var second = selectElem(".sec");
        var nowDate = new Date();
        var nowSecs = nowDate.getSeconds();
        var nowMins = nowDate.getMinutes() + nowSecs / 60;
        var nowHour = nowDate.getHours() + nowMins / 60;
        var secDeg = nowSecs * 360 / 60;
        var minDeg = nowMins * 360 / 60;
        var hourDeg = nowHour * 360 / 12;
        css(second, "rotate", secDeg);
        css(minute, "rotate", minDeg);
        css(hour, "rotate", hourDeg);
    }
})();

//Init Date
(function() {
    var nowDate = new Date();
    var year = nowDate.getFullYear();
    var month = addZero(nowDate.getMonth() + 1);
    var date = addZero(nowDate.getDate());
    var day = nowDate.getDay();
    var dayArr = ["日", "一", "二", "三", "四", "五", "六"];

    var now = selectElem("#now");
    now.innerHTML = "<p>" + year + "年" + month + "月" + date + "日</p><p>星期" + dayArr[day] + "</p>";
})();

//Init and Switch Views
(function() {
    var board = selectElem(".board");
    var main = selectElem("#main");
    var option = selectElem("#option");
    var next = selectElem("#next");
    var prev = selectElem("#prev");
    var optionType = 0; //0 for date, 1 for month, 2 for year
    var nextOptionType = 0;

    var date = new Date();
    //current date
    var nowYear = date.getFullYear();
    var nowMonth = date.getMonth();
    var nowDate = date.getDate();

    //switched date
    var newYear = nowYear;
    var newMonth = nowMonth;
    var newDate = nowDate;

    //Switch Views among year month and date
    option.onclick = function() {
        nextOptionType = optionType + 1;
        if (nextOptionType > 2) {
            nextOptionType = 2;
        } else {
            switchViews();
        }
    }

    prev.onclick = function() {
        switchDate(-1);
    }

    next.onclick = function() {
        switchDate(1);
    }

    function switchDate(direction) {
        if (direction > 0) { //to next
            main.innerHTML = '<div class="topOut board"></div><div class="toTop board"></div>';
            var board = main.querySelectorAll(".board");
            switch (optionType) {
                case 0:
                    initDateView(board[0], newYear, newMonth);
                    newMonth++;
                    updateDate();
                    initDateView(board[1], newYear, newMonth);
                    break;
                case 1:
                    initMonthView(board[0], newYear);
                    newYear++;
                    updateDate();
                    initMonthView(board[1], newYear);
                    break;
                case 2:
                    initYearView(board[0], newYear);
                    newYear += 10;
                    updateDate();
                    initYearView(board[1], newYear);
                    break;
            }
        } else {
            main.innerHTML = '<div class="bottomOut board"></div><div class="toBottom board"></div>';
            var board = main.querySelectorAll(".board");
            switch (optionType) {
                case 0:
                    initDateView(board[0], newYear, newMonth);
                    newMonth--;
                    updateDate();
                    initDateView(board[1], newYear, newMonth);
                    break;
                case 1:
                    initMonthView(board[0], newYear);
                    newYear--;
                    updateDate();
                    initMonthView(board[1], newYear);
                    break;
                case 2:
                    initYearView(board[0], newYear);
                    newYear -= 10;
                    updateDate();
                    initYearView(board[1], newYear);
                    break;
            }
        }
        initOption();
    }

    function updateDate() {
        var date = new Date(newYear, newMonth);
        newYear = date.getFullYear();
        newMonth = date.getMonth();
    }

    function switchViews() {
        if (nextOptionType > optionType) {
            main.innerHTML = '<div class="toHide board"></div><div class="toShow board"></div>';
            var boards = document.querySelectorAll(".board");
            switch (nextOptionType) {
                case 1: //switch from dateView to monthView
                    initDateView(boards[0], newYear, newMonth);
                    initMonthView(boards[1], newYear);
                    optionType = nextOptionType;
                    break;
                case 2: //switch from monthView to yearView
                    initMonthView(boards[0], newYear);
                    initYearView(boards[1], newYear);
                    optionType = nextOptionType;
                    break;
            }
        } else {
            main.innerHTML = '<div class="toBlow board"></div><div class="toNarrow board"></div>';
            var boards = document.querySelectorAll(".board");
            switch (nextOptionType) {
                case 0: //switch from monthView to dateView
                    initMonthView(boards[0], newYear);
                    initDateView(boards[1], newYear, newMonth);
                    optionType = nextOptionType;
                    break;
                case 1: //switch from yearView to monthView
                    initYearView(boards[0], newYear);
                    initMonthView(boards[1], newYear);
                    optionType = nextOptionType;
                    break;
            }
        }
        initOption();
    }

    //Init Option
    initOption();

    initDateView(board, newYear, newMonth);

    function initOption() {
        switch (optionType) {
            case 0:
                option.innerHTML = newYear + '年' + (newMonth + 1) + '月';
                break;
            case 1:
                option.innerHTML = newYear + '年';
                break;
            case 2:
                var startYear = Math.floor(newYear / 10) * 10;
                var endYear = startYear + 9;
                option.innerHTML = startYear + ' - ' + endYear;
                break;
        }
    }

    //Init Date View
    //initDateView(board, 2019, 8);

    function initDateView(board, year, month) {
        var headerHTML = '<ul class="week"><li class="date-cell">日</li><li class="date-cell">一</li><li class="date-cell">二</li><li class="date-cell">三</li><li class="date-cell">四</li><li class="date-cell">五</li><li class="date-cell">六</li></ul>';
        var firstDay = new Date(year, month, 1).getDay();
        var lastDay = new Date(year, month + 1, 0).getDate();
        var lastMonthLastDay = new Date(year, month, 0).getDate();
        var dateHTML = headerHTML + '<ul class="date">';

        for (var i = 0; i < 42; i++) {
            if (i < firstDay) {
                dateHTML += '<li class="date-cell other-date">' + (lastMonthLastDay - firstDay + i + 1) + '</li>';
            } else if (i - firstDay < lastDay) {
                if (year == nowYear && month == nowMonth && (i - firstDay + 1) == nowDate) {
                    dateHTML += '<li class="date-cell active">' + (i - firstDay + 1) + '</li>';
                } else {
                    dateHTML += '<li class="date-cell">' + (i - firstDay + 1) + '</li>';
                }

            } else {
                dateHTML += '<li class="date-cell other-date">' + (i - firstDay - lastDay + 1) + '</li>';
            }
        }

        dateHTML += '</ul>';
        board.innerHTML = dateHTML;
    }

    //Init Month View
    //initMonthView(board, 2019);

    function initMonthView(board, year) {
        var monthHTML = '<ul class="month">';
        for (var i = 1; i <= 12; i++) {
            if (year == nowYear && i - 1 == nowMonth) {
                monthHTML += '<li class="month-cell active">' + i + '月</li>';
            } else {
                monthHTML += '<li class="month-cell">' + i + '月</li>';
            }
        }
        monthHTML += '</ul>';
        board.innerHTML = monthHTML;

        var lis = board.querySelectorAll('li');
        lis.forEach(function(elem, index) {
            elem.onclick = function() {
                newMonth = parseInt(this.innerHTML) - 1;
                nextOptionType = 0;
                switchViews();
            }
        });
    }

    //Init Year View
    //initYearView(board, 2019);

    function initYearView(board, year) {
        var yearHTML = '<ul class="year">';
        var startYear = Math.floor(year / 10) * 10;
        for (var i = 0; i < 16; i++) {
            if (i < 4) {
                yearHTML += '<li class="year-cell other-yaer">' + (startYear - 4 + i) + '</li>';
            } else if (i < 14) {
                if (year == (startYear + i - 4)) {
                    yearHTML += '<li class="year-cell active">' + (startYear + i - 4) + '</li>';
                } else {
                    yearHTML += '<li class="year-cell">' + (startYear + i - 4) + '</li>';
                }
            } else {
                yearHTML += '<li class="year-cell other-yaer">' + (startYear - 14 + i) + '</li>';
            }
        }

        yearHTML += '</ul>';
        board.innerHTML = yearHTML;

        var lis = board.querySelectorAll('li');
        lis.forEach(function(elem, index) {
            elem.onclick = function() {
                newYear = Number(this.innerHTML);
                nextOptionType = 1;
                switchViews();
            }
        });
    }

})();