//3 persons
var a = {
    name: 'Vasya',
    surname: 'Pupkin'
}
var b = {
    name: 'Lesya',
    surname: 'Ivanova'
}
var c = {
        name: 'Petya',
        surname: 'Bobrov'
    }
    //different fields
a["age"] = 10;
b["age"] = 30;
b["sex"] = 'female';
c["fathername"] = 'Ivanovich';
c["sex"] = 'male';

//fields check
let f = (field, myobject = {}) => {
        if (field in myobject)
            alert(`значение существующего поля в ассоц. массиве = ${myobject[field]}`)
    }
    // f("fathername", a)
    // f("sex", a)
    // f("age", a)
    // f("fathername", b)
    // f("sex", b)
    // f("age", b)
    // f("fathername", c)
    // f("sex", c)
    // f("age", c)

//array of persons
var persons = [a, b, c]
    //loop of persons
for (let i = 0; i < persons.length; i++) {
    console.log(persons[i])
}
//loop of name and surname
for (let i = 0; i < persons.length; i++) {
    console.log(persons[i].surname, persons[i].name)
}
//или
for (let key in persons) {
    console.log(persons[key]["surname"], persons[key]["name"])
}
//loop of loop of values
persons.forEach(function(element) {
    for (let key in element) {}
    console.log(Object.values(element));
});
//или
for (let person in persons) {
    for (let key in persons[person]) {
        console.log(`${[key]} = ${persons[person][key]}`)
    }
}

//fullName
let fullName = "";
for (let person in persons) {
    if ("fathername" in persons[person]) {
        fullName = `${persons[person]["surname"]} ${persons[person]["name"]} ${persons[person]["fathername"]}`
        persons[person]["fullname"] = fullName;
    } else
        fullName = `${persons[person]["surname"]} ${persons[person]["name"]}`
    persons[person]["fullname"] = fullName;
}
console.log(persons)



//serialize
var jsonStringify = JSON.stringify(persons)
console.log(jsonStringify);
//deserialize
var jsonParse = JSON.parse(JSON.stringify(persons[0]));
persons.push(jsonParse);
console.log(persons);

//html
var str = "<table border='1'>"
for (let i = 0; i < persons.length; i++) {
    str += `<tr><td>${persons[i].name}</td>
        <td>${persons[i].surname}</td>
        </tr>`
}
str += "</table>"

console.log(str)
document.write(str)
    //html optional fields

var str = "<table border='1'>"
for (let person in persons) {
    str += `<tr>`
    for (let key in persons[person]) {
        str += `<td>${persons[person][key]} </td>`
    }
}
str += `</tr>`
str += "</table>"
console.log(str)
document.write(str)

//html tr color
var str = "<table border='1'>"
for (let i = 0; i < persons.length; i++) {
    (i % 2) ? str += `<tr>`: str += `<tr bgcolor="green">`
    for (let person in persons[i]) {

        str += `<td>${persons[i][person]} </td>`
    }
    str += `</tr>`
}
str += `</tr>`

//html th optional
var str = "<table border='1'>"
for (let i in persons) {
    str += `<tr>`
    str += ` <td> person № ${i}`
    str += ` <td>`
    str += `<tr>`
    let keyLength = Object.keys(persons[i]).length;
    let keyObj = Object.keys(persons[i]);
    let valueObj = Object.values(persons[i])
    for (keyLength in valueObj) {
        str += `<th>${(keyObj[keyLength])} `
        str += `<td>${(valueObj[keyLength])} `
        str += `<tr>`
        str += `</th>`
        str += `</td>`
    }
    str += ` </td>`
    str += `</tr>`
    str += `</tr>`
    str += `</tr>`
}
str += "</table>"
document.write(str)


//html constructor Задание на синий пояс
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


var str = '';
str += `<${body.tagName}>`

for (let i of body.subTags) {
    str += `<${i.tagName}>`

    for (let ichild of i.subTags) {
        str += `<${ichild.tagName}>`


        for (let keys in ichild.subTags) {

            str += `${ichild.subTags[keys]} `

        }
        for (let keys in ichild.text) {

            str += `${ichild.text[keys]}`
        }

        for (let keys in ichild.attrs) {

            str += `<${ichild.attrs[keys]}>`
        }

        str += `</${ichild.subTags}>`
        str += `</${ichild.tagName}>`
    }
}


str += `</${body.tagName}>`
document.write(str);

//destruct array
let arr = [1, 2, 3, 4, 5, "a", "b", "c"]
let [odd1, even1, odd2, even2, odd3, ...array] = arr
console.log('odd1=', odd1, 'even1=', even1, 'odd2=', odd2, 'even2=', even2, 'odd3=', odd3, 'array=', ...array)
    //destruct string
let arr2 = [1, "abc"]
let [number] = arr2
console.log('number =', number)
let [s1, s2, s3] = arr2[1];
console.log('s1 =', s1, 's2 = ', s2, 's3=', s3)
    //destruct 2
let obj = {
    name: 'Ivan',
    surname: 'Petrov',
    children: [{ name: 'Maria' }, { name: 'Nikolay' }]
}
let { children: [{ name: name1 }, { name: name2 }] } = obj
console.log('name1=', name1, 'name2=', name2)
    //destruct 3
let arr3 = [1, 2, 3, 4, 5, 6, 7, 10]
let { a = arr3[0], b = arr3[1] } = arr3
let { length = arr3.length } = arr3
console.log(a, b, length);

//Задание на черный пояс
let predictArray = {
    1: -1,
    2: -1,
    3: -1,
    4: -1,
}
for (let keys in Object.keys(predictArray)) {
    console.log('predictValue', predictValue)
    var history = { 1: 1, 2: 2, 3: 1, 4: 1 }
    var predictValue = predictArray[history] // в predictValue то, что ввел последний раз пользователь после нажатий 1212
    var newValue = prompt("введите 1 или 2", "");
    predictArray[history] = newValue
    console.log(predictValue)
}
//сохраняем новый ввод
//сдвигаем историю