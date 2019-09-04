class Compile extends EventTarget {
    constructor(options) {
        super();
        this.options = options;
        this.compile();
    }

    compile() {
        let eles = document.querySelector(this.options.el);
        let childNodes = eles.childNodes;
        this.compileNodes(childNodes);
    }

    compileNodes(childNodes) {
        childNodes.forEach(node => {
            if (node.nodeType == 1) {
                // console.log("节点");
                let attrs = node.attributes;
                [...attrs].forEach(attr => {
                    let attrName = attr.name;
                    let attrValue = attr.value;
                    attrName = attrName.substr(2);
                    if (attrName === "html") {
                        node.innerHTML = this.options.data[attrValue];
                    } else if (attrName === "model") {
                        node.value = this.options.data[attrValue];
                        node.addEventListener("input", e => {
                            this.options.data[attrValue] = e.target.value;
                        })
                    }
                })
                if (node.childNodes.length > 0) {
                    this.compileNodes(node.childNodes);
                }
            } else if (node.nodeType == 3) {
                // console.log("文本");
                let reg = /\{\{\s*(\S+)\s*\}\}/g;
                let textContent = node.textContent;
                let test = reg.test(textContent);
                if (test) {
                    // 初次渲染；
                    let $1 = RegExp.$1;
                    node.textContent = textContent.replace(reg, this.options.data[$1]);
                    //更新渲染视图；
                    this.addEventListener($1, e => {
                        console.log("set new value", e.detail);
                        let newValue = e.detail;
                        let oldValue = this.options.data[$1];
                        let reg = new RegExp(oldValue, "g");
                        node.textContent = node.textContent.replace(reg, newValue);
                    })
                }
            }
        })
    }

}

export default Compile;