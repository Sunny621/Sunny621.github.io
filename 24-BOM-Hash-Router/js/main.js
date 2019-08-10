{
    let listGroup = document.querySelector(".list-group");
    let pagination = document.querySelector(".pagination");
    let navs = document.querySelectorAll(".nav li");

    renderList({
        page: 0,
        type: 'society'
    });

    window.onhashchange = function() {
        let hash = window.location.hash;
        hash = hash.substring(2).split('/');

        navs.forEach((item, index) => {
            item.classList.remove("active");
        });

        if (hash[0] == "sh") {
            navs[0].classList.add("active");

            if (hash[1] == "details") {
                renderDetail({
                    id: hash[2],
                    type: 'society'
                })
            } else {
                let nowPage = parseInt(hash[1]) || 0;
                renderList({
                    page: nowPage,
                    type: 'society'
                });
            }

        } else if (hash[0] == "xy") {
            navs[1].classList.add("active");

            if (hash[1] == "details") {
                renderDetail({
                    id: hash[2],
                    type: 'campus'
                })
            } else {
                let nowPage = parseInt(hash[1]) || 0;
                renderList({
                    page: nowPage,
                    type: 'campus'
                });
            }

        }
        console.log(hash);
    }

    function renderList(props) {
        let { page, type } = props;
        let inner = '';
        let start = page * 5;
        let end = (page + 1) * 5;
        let nowData = data[type].filter((item, index) => index >= start && index < end);

        nowData.forEach((item, index) => {
            inner += `<li class="list-group-item">
                        <a href="#/${item.type}/details/${item.id}">
                            <h4 class="list-group-item-heading">职位需求：${item.job} 工程师需求人数：${item.nub}名</h4>
                            <p class="list-group-item-text">${item.ask}</p>
                        </a>
                    </li>`;
        });

        listGroup.innerHTML = inner;

        renderPagination(props);
    }

    function renderPagination(props) {
        let { page, type } = props;
        let l = Math.ceil(data[type].length / 5);
        let inner = "";
        //console.log(l);
        for (let i = 0; i < l; i++) {
            inner += `<li class="${page==i&&'active'}"><a href="#/${data[type][0].type}/${i}">${i+1}</a></li>`;
        }

        pagination.innerHTML = inner;
    }

    function renderDetail(props) {
        let { type, id } = props;
        let nowData = data[type].filter(item => item.id == id)[0];
        //console.log(nowData);
        let inner = `<div class="panel panel-default">
                        <div class="panel-heading">招聘岗位：${nowData.job}</div>
                        <div class="panel-body">
                            <p>${nowData.ask}</p>
                            <p>招聘人数：${nowData.nub}人</p>
                            <p>发布时间：${nowData.date}</p>
                        </div>
                    </div>`;
        listGroup.innerHTML = inner;
        pagination.innerHTML = '';
    }
}