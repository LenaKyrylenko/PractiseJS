//ES6
let a = (text) => alert(text || "default");
//a();
//a("hello!");
//
var cube3 = (...args) => args.map((num = 1) => num ** 3);
//console.log(cube3(4, 5, 6, 7))
//console.log(cube3())

let average2 = (...array) => (array.reduce((a, b) => (a + b / array.length), 0));
//console.log('среднее число =', average2(10, 20, 30, 50));
//console.log('среднее число =', average2());

let sum = (...arg) => arg.reduce((a, b) => a + b, 0);
//console.log('all sum = ', sum(1, 2, 3, 4, 5, 6))
//console.log('all sum = ', sum())

function greetAll() {
    let args = ["user"];
    for (let i = 0; i < arguments.length; i++) {
        args[i] = arguments[i];

    }
    return alert("Hello " + args);
}
//greetAll()
//greetAll("Superman")
//так же в дз с функциями было много вариантов написания функций
//sort
var persons = [
    { name: "Иван", age: 17 },
    { name: "Мария", age: 35 },
    { name: "Алексей", age: 73 },
    { name: "Яков", age: 12 },
]

function sort(arr, field, value = true) {
    if (value) {
        arr.sort(((a, b) => a[field] > b[field] ? 1 : -1))
    } else {
        arr.sort(((a, b) => a[field] < b[field] ? 1 : -1))
    }
}
//sort(persons,'age',false);
//console.log(persons);
sort(persons, "name", false); //сортирует по имени по убыванию
console.log(persons);

//array map
var array = ["1", {}, null, undefined, "500", 700]

var result = array.map(function(item) {
    var number = Number(item);
    return isNaN(number) ? item : number
})
console.log(result);
//array reduce
var arr = ["0", 5, 3, "string", null]
console.log(arr);
var res = arr.reduce(function(a, b) {
    return (typeof(b) === 'number') ? (a *= b) : a;
}, 1)
console.log(res);


//object filter
var phone = {
    brand: "meizu",
    model: "m2",
    ram: 2,
    color: "black",
};

function filter(object, callback) {
    for (let key in object) {
        callback(key, object[key]) || delete object[key];
    }
    return object;
}

filter(phone, (key, value) => key == "color" || value == 2)
console.log(phone)

//object map
function map(object, callback) {
    var obj = {};
    for (var key in object) Object.assign(obj, callback(key, object[key]));
    return obj
}

let new_obj = map({ name: "Иван", age: 17 }, function(key, value) {
    var result = {};
    result[key + "_"] = value + "$";
    return result;

})

console.log(new_obj) //должен вернуть {name_: "Иван$", age_: "17$"}

function sumRec(number) {
    if (number === 1)
        return number
    if (number < 0)
        return
    return number + sumRec(number - 1)
}
console.log(sumRec(6))
    //HTML Tree
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

function createElem(tagName, attrs, text, id) {
    var tagElem = document.createElement(tagName);
    if (attrs)
        for (var name in attrs) tagElem.setAttribute(name, attrs[name]);
    if (text) tagElem.textContent = text;
    if (id) tagElem.id = id;
    return tagElem
}

function createBody(body) {
    var tagName = body.tagName,
        attrs = body.attrs,
        text = body.text,
        id = body.id,
        elem = createElem(tagName, attrs, text, id);
    if (body.subTags)
        body.subTags.forEach(function(el) {
            el = createBody(el);
            elem.appendChild(el)
        });
    return elem
}

var table = createBody(body);
document.body.appendChild(table);