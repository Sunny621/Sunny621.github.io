{
    let topId = 0;
    let nowId = 2999;

    let breadNav = document.querySelector('.bread-nav');
    let folders = document.querySelector('#folders');

    console.log(getAllParent(2999));


    renderBreadNav();
    renderFolders();

    function renderFolders() {
        let inner = '';
        let childern = getChild(nowId);
        childern.forEach(item => {
            inner += `<li class="folder-item">
                        <img src="img/folder-b.png" alt="">
                        <span class="folder-name">${item.title}</span>
                        <input type="text" class="editor" value="${item.title}">
                        <label class="checked">
                            <input type="checkbox" />
                            <span class="iconfont icon-checkbox-checked"></span>
                        </label>   
                    </li>`
        })
        folders.innerHTML = inner;
    }

    function renderBreadNav() {
        let inner = '';
        let aP = getAllParent(nowId);
        aP.forEach(item => {
            inner += `<a>${item.title}</a>`
        });
        inner += `<span>${getSelf(nowId).title}</span>`
        breadNav.innerHTML = inner;
    }

    // get data
    function getSelf(id) {
        return data.filter(item => item.id == id)[0];
    }

    function getChild(pid) {
        return data.filter(item => item.pid == pid);
    }

    function getParent(id) {
        let pId = getSelf(id).pid;
        return getSelf(pId);
    }

    function getAllParent(id) {
        let parent = getParent(id);
        let allP = [];
        while (parent) {
            allP.unshift(parent);
            parent = getParent(parent.id);
        }
        return allP;
    }

}