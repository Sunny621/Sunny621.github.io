{
    let data = [{
        id: 0,
        title: "残酷月光 - 费启鸣",
        checked: true,
        collect: true
    }, {
        id: 1,
        title: "兄弟 - 艾热",
        checked: false,
        collect: false
    }, {
        id: 2,
        title: "毕生 - 夏增祥",
        checked: false,
        collect: true
    }, {
        id: 3,
        title: "公子向北去 - 李春花",
        checked: false,
        collect: false
    }, {
        id: 4,
        title: "战场 - 沙漠五子",
        checked: true,
        collect: false
    }];

    let list = document.querySelector("#list");
    let checkAll = document.querySelector("#checkAll");
    let removeBtn = document.querySelector("#remove");
    let addBtn = document.querySelector("#add");
    let newInfo = document.querySelector("#newInfo");

    let render = () => {
        let inner = "";
        data.forEach((item) => {
            inner += `<li>
                        <input type="checkbox" ${item.checked?'checked':''} />
                        <span>${item.title}</span>
                        ${item.collect?'<a href="javascript:;" class="cancelCollect">取消收藏</a>':
                        '<a href="javascript:;" class="collect">收藏</a>'}
                        <a href="javascript:;" class="remove">删除</a>
                      </li>`;
        });
        list.innerHTML = inner;

        checkAll.checked = data.every(item => item.checked) && data.length > 0;

        addEvents();
    }



    let addEvents = () => {
        let lis = list.querySelectorAll("li");

        lis.forEach((item, index) => {
            let checkbox = item.querySelector("input");
            let collect = item.querySelector(".collect");
            let cancelCollect = item.querySelector(".cancelCollect");
            let remove = item.querySelector(".remove");

            checkbox.onclick = function() {
                data[index].checked = !data[index].checked;
                render();
            }

            collect && (collect.onclick = function() {
                data[index].collect = !data[index].collect;
                render();
            })

            cancelCollect && (cancelCollect.onclick = function() {
                data[index].collect = !data[index].collect;
                render();
            })

            remove.onclick = function() {
                data.splice(index, 1);
                render();
            }

        });
    }

    checkAll.onclick = function() {
        data.forEach(item => {
            item.checked = this.checked;
        });
        render();
    }

    removeBtn.onclick = function() {
        data = data.filter(item => !item.checked);
        render();
    }

    addBtn.onclick = function() {
        let dataId = Math.random();
        data.push({
            id: dataId,
            title: newInfo.value,
            checked: false,
            collect: false
        });
        newInfo.value = "";
        render();
    }

    render();



}