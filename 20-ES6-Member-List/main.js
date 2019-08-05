{
    let data = [{
            id: 0,
            name: '小明',
            age: 24,
            gender: '男'
        },
        {
            id: 1,
            name: '小芳',
            age: 30,
            gender: '女'
        },
        {
            id: 2,
            name: '小美',
            age: 31,
            gender: '女'
        },
        {
            id: 3,
            name: '小刚',
            age: 21,
            gender: '男'
        },
        {
            id: 4,
            name: '小琪',
            age: 18,
            gender: '女'
        }
    ];

    let tBody = document.querySelector("#table tbody");
    let ageSort = document.querySelectorAll(".age_sort a");
    let genderFilter = document.querySelectorAll(".gender_show a");

    let render = (data) => {
        let inner = "";
        data.forEach(item => {
            inner += `<tr>
                        <th>${item.id}</th>
                        <th>${item.name}</th>
                        <th>${item.age}</th>
                        <th>${item.gender}</th>
                      </tr>`;
        });
        tBody.innerHTML = inner;
    }

    let ageSortArr = [
        () => { data.sort((obj1, obj2) => obj1.age - obj2.age) },
        () => { data.sort((obj1, obj2) => obj2.age - obj1.age) },
        () => { data.sort((obj1, obj2) => obj1.id - obj2.id) }
    ];

    let genderFilterArr = [
        () => data.filter(item => item.gender == "男"),
        () => data.filter(item => item.gender == "女"),
        () => data.filter(item => true)
    ];

    let ageSortType = 2;
    let genderFilterType = 2;

    let updateData = () => {
        ageSortArr[ageSortType]();
        let newData = genderFilterArr[genderFilterType]();
        render(newData);
    }

    render(data);

    ageSort.forEach((item, index) => {
        item.onclick = function() {
            ageSort.forEach((item) => {
                item.classList.remove("active");
            });
            ageSort[index].classList.add("active");
            ageSortType = index;
            updateData();
        }
    });

    genderFilter.forEach((item, index) => {
        item.onclick = function() {
            genderFilter.forEach((item) => {
                item.classList.remove("active");
            });
            genderFilter[index].classList.add("active");
            genderFilterType = index;
            updateData();
        }
    });

}