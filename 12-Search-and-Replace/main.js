window.onload = function() {
    var open = document.querySelector("#open a");
    var bigBtns = document.querySelector("#open ul");

    var searchBtn = document.querySelector("#searchBtn");
    var replaceBtn = document.querySelector("#replaceBtn");
    var searchSmBtn = document.querySelector("#searchSmBtn");
    var replaceSmBtn = document.querySelector("#replaceSmBtn");

    var fun = document.querySelector("#fun");
    var searchArea = document.querySelector("#search");
    var replaceArea = document.querySelector("#replace");

    var content = document.querySelector("#content");

    var searchInput = searchArea.querySelectorAll("input");
    var replaceInput = replaceArea.querySelectorAll("input");


    searchInput[1].onclick = function() {
        var txt = content.innerHTML;
        txt = clearspan(txt);
        var searchStr = searchInput[0].value;
        search(txt, searchStr);
    }

    replaceInput[2].onclick = function() {
        var txt = content.innerHTML;
        txt = clearspan(txt);
        var searchStr = replaceInput[0].value;
        var replaceStr = replaceInput[1].value;
        replace(txt, searchStr, replaceStr);
    }

    function clearspan(txt) {
        var txtArr = [];
        txtArr = txt.split("<span>").join('').split("</span>").join('');
        return txtArr;
    }

    function search(txt, str) {
        var txtArr = [];
        txtArr = txt.split(str);
        txtArr = txtArr.join('<span>' + str + '</span>');
        content.innerHTML = txtArr;
    }

    function replace(txt, str, newStr) {
        var txtArr = [];
        txtArr = txt.split(str);
        txtArr = txtArr.join('<span>' + newStr + '</span>');
        content.innerHTML = txtArr;
    }

    open.onclick = function() {
        if (bigBtns.style.display == "none") {
            bigBtns.style.display = "block";
        } else {
            bigBtns.style.display = "none";
        }
    }

    searchBtn.onclick = searchSmBtn.onclick = function() {
        fun.style.display = "block";
        searchArea.style.display = "block";
        replaceArea.style.display = "none";
    }

    replaceBtn.onclick = replaceSmBtn.onclick = function() {
        fun.style.display = "block";
        searchArea.style.display = "none";
        replaceArea.style.display = "block";
    }
}