function _id(idName){
    return document.getElementById(idName);
}

function _css(parent, selector){
    return parent.querySelector(selector);
}

function _cssAll(parent, selector){
    return parent.querySelectorAll(selector);
}

//get computed style, compatible with IE
function getStyle(el, attr){
    return el.currentStyle ? el.currentStyle[attr] : getComputedStyle(el)[attr];
}
