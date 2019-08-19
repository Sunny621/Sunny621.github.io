{
    let search = document.querySelector("#search");
    let banner = document.querySelector("#banner");
    let float = document.querySelector("#float");
    let backTop = document.querySelector("#backTop");
    let floatT = float.offsetTop;

    window.onscroll = function() {
        showBanner();
        showFloat();
        showBacktop();
    }

    backTop.onclick = function() {
        document.documentElement.scrollTop = document.body.scrollTop = 0;
    }

    function showBacktop() {
        let clientH = document.documentElement.clientHeight;
        let scrollT = document.documentElement.scrollTop || document.body.scrollTop;
        scrollT >= clientH ? backTop.style.display = "block" : backTop.style.display = "none";
    }

    function showFloat() {
        let scrollT = document.documentElement.scrollTop || document.body.scrollTop;
        let bannerH = banner.offsetHeight;

        if (floatT <= (scrollT + bannerH)) {
            float.style.position = 'fixed';
            float.style.top = bannerH + "px";
        } else {
            float.style.position = 'absolute';
            float.style.top = "50%";
        }
    }

    function showBanner() {
        let searchPos = search.getBoundingClientRect().bottom;
        searchPos < 0 ? banner.style.display = "block" : banner.style.display = "none";
    }
}