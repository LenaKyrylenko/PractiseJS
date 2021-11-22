function htmlTree() {
    // <body>
    //     <div>
    //         <span>Enter a data please:</span><br/>
    //         <input type='text' id='name'>
    //         <input type='text' id='surname'>
    //     </div>
    //     <div>
    //         <button id='ok'>OK</button>
    //         <button id='cancel'>Cancel</button>
    //     </div>
    // </body>


    var body = {
        tagName: 'body',
        subTags: [{
                tagName: 'div',
                subTags: [{
                        tagName: 'span',
                        text: "Enter a data please:",
                    },
                    {
                        tagName: 'br',
                    },
                    {
                        tagName: 'input',
                        attrs: {
                            type: 'text',
                            id: 'name'
                        }
                    },
                    {
                        tagName: 'input',
                        attrs: {
                            type: 'text',
                            id: 'surname'
                        }
                    }
                ],
            },
            {
                tagName: 'div',
                subTags: [{
                        tagName: 'button',
                        text: "OK",
                        attrs: {

                            id: 'ok'
                        }
                    },
                    {
                        tagName: 'button',
                        text: "Cancel",
                        attrs: {
                            id: 'cancel'
                        }

                    },
                ],

            },
        ],
    }
    console.log('Значения текста во второй кнопке = ', body.subTags[1].subTags[1].text);
    console.log('Значение атрибута id во втором input= ', body.subTags[0].subTags[3].attrs.id);
}
//htmlTree();

function declarativeFields() {

    var laptop = {
        brand: prompt('Enter a brand laptop'),
        type: prompt('Enter a type laptop'),
        model: prompt('Enter a model laptop'),
        ram: Number(prompt('Enter a ram laptop')),
        size: prompt('Enter a size laptop'),
        weight: Number(prompt('Enter a weight laptop')).toFixed(2),
        resolution: {
            width: Number(prompt('Enter a width laptop')),
            height: Number(prompt('Enter a height laptop')),
        },
        owner: person
    };

    var smartphone = {
        brand: prompt('Enter a brand smartphone'),
        model: prompt('Enter a model smartphone'),
        ram: prompt('Enter a ram smartphone'),
        color: prompt('Enter a color smartphone'),
        owner: person
    };

    var person = {
        name: prompt('Enter a name'),
        surname: prompt('Enter a surname'),
        married: Boolean(confirm('Are you married?')),
    }


    person.smartphone = prompt('Enter the smartphone');
    person.laptop = prompt('Enter the laptop');
    //console.log(Object.keys(person));
    person.smartphone = smartphone;
    person.laptop = laptop;
    smartphone.owner = person;
    laptop.owner = person;
    (person.smartphone.owner.laptop.owner.smartphone == person.smartphone) ? alert('yes'): alert('no');
}
//declarativeFields();
function imperativeArray() {
    let arr = [];
    console.log('before array = ', arr);
    for (let i = 0; i < 3; i++) {
        arr.push(prompt('Enter the element for array'));
    }
    console.log('after array = ', arr);
}
//imperativeArray();
function whileConfirm() {
    do {
        var valueUser = confirm('Это работает пока ты нажимаешь отмена');
    }
    while (!valueUser) //Пока пользователь нажимает отмена
}
//whileConfirm();
function arrayFill() {
    let arr = []

    do {
        var valueArr = prompt('Enter the element for array');
        arr.push(valueArr);
    }
    while (valueArr)
    console.log(arr);
}
//arrayFill();
function arrayFillNoPush() {
    let arr = [],
        i = 0;
    let values;
    while (values = prompt('Enter the element for array')) {
        arr[i] = values;
        i++;

    }
    console.log(arr);
}
//arrayFillNoPush();
function infiniteProbability() {
    var i = 0;
    while (true) {
        if (Math.random() > 0.9) {
            break;
        }
        i++;
    }
    alert('i = ' + i);


}
//infiniteProbability();
function emptyLoop() {
    do {
        var valueUser = prompt('Это работает пока ты нажимаешь отмена');
    }
    while (valueUser == null) //Пока пользователь нажимает отмена
}
//emptyLoop();

function progressionSum(N) {
    let summa = 0;
    for (let i = 1; i < N; i += 3) {
        summa += i;

    }
    console.log('summa= ', summa);
}
//progressionSum(100);

function chessOneLine(N) {
    let str = "";
    for (let i = 0; i < N; i++) {
        i % 2 ? str += " " : str += "#";
    }
    console.log('str= ' + str);
}
//chessOneLine(10);

function numbers() {
    let str = "";
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            str += j;
        }
        str += '\n';
    }
    console.log(str);
}
//numbers();
function chess(N) {
    let str = "";
    for (let i = 0; i < N; i++) {

        for (let j = 0; j < N; j++) {
            ((i + j) % 2) ? str += ".": str += '#';

        }
        str += '\n';
    }

    console.log(str);
}
//chess(10, 10);

function cubes(N) {
    var arr = [];
    for (let i = 0; i < N; i++) {
        arr.push((Math.pow(i, 3)));
    }
    console.log(arr);
}
//cubes(10);

function multiplyTable() {
    let arr = [];
    for (let i = 0; i < 10; i++) {
        arr[i] = [];
        for (let j = 0; j < 10; j++) {
            arr[i][j] = i * j;
        }
    }
    console.log('arr[5][6]= ', arr[5][6]);
    console.log('arr[7][2]= ', arr[7][2]);
}
//multiplyTable();

function matrixHtmlTable(N) {
    let arr = [];
    let str = '<table>'
    for (let i = 1; i < N; i++) {
        arr[i] = [];
        str += "<tr>"
        for (let j = 1; j < N; j++) {
            arr[i][j] = i * j;
            str += "<td>";
            str += arr[i][j];
            str += "</td>"
        }
        str += "</tr>"
    }
    str += '</table>'
    document.write(str)

}
//matrixHtmlTable(10);
//Задание на синий пояс: Треугольник
function triangle(N) {
    for (let i = 0; i < N; i++) {
        let strPoint = "";
        let strTringle = "";
        for (let j = 0; j < N - i - 1; j++) strPoint += ".";
        for (let j = 0; j < 2 * i + 1; j++) strTringle += "#";
        console.log(strPoint + strTringle + strPoint);
    }
}
//triangle(6);