//1 вариант
function a(text) {

    return alert(text);
}
//a('Привет!');

//2 вариант
let a2 = (text) => alert(text);
//a2('Привет!');

//1 вариант
function cube(number) {
    return num = Math.pow(number, 3)
}
//console.log('3 в кубе  = ', cube(3));

//2 вариант
function cube2(number) {
    return num = number ** 3;
}
//console.log('3 в кубе  = ', cube2(3));

//3 вариант
let cube3 = (num) => num ** 3;
//console.log('3 в кубе  = ', cube3(3));

//1 вариант
function avg2(number1 = 0, number2 = 0) {
    return ((number1 + number2) / 2)
}
//2 вариант
let avg = (num1 = 0, num2 = 0) => (num1 + num2) / 2;
//console.log('среднее число между 10 и 20 =', avg(10, 20));

//3 вариант нахождение среднего для n чисел
function average(nums) {
    return (nums.reduce((a = 0, b = 0) => (a + b)) / nums.length);
}
//console.log('среднее число между 10 и 20 =', average([10, 20]));

//4 вариант
let average2 = (array) => (array.reduce((a = 0, b = 0) => a + b) / array.length);
//console.log('среднее число между 10 и 20 =',average2([10, 20]));

//1 вариант
function sum3(num1 = 0, num2 = 0, num3 = 0) {
    return (num1 + num2 + num3)
}
//sum3(1, 2, 3);

//2 вариант
let sum3_var = (num1 = 0, num2 = 0, num3 = 0) => num1 + num2 + num3;


function intRandom(first = 0, second = 0) {

    return Math.round(first + Math.random() * (second - first))
}
//console.log(intRandom(2, 15));
//console.log(intRandom(-1, -1)) // вернет -1
//console.log(intRandom(0, 1)) // вернет 0 или 1
//console.log(intRandom(10))

//1 вариант
function greetAll() {
    let args = [];
    for (let i = 0; i < arguments.length; i++) {
        args[i] = arguments[i];

    }
    return alert("Hello " + args);
}

//2 вариант
function greetAll2() {
    let array = [];
    for (let arg of arguments) {
        array[array.length] = (`${arg}`);
    }
    return ("Hello " + array);
}
//alert(greetAll2("Superman", "SpiderMan", "Captain Obvious")) // выводит alert "Hello Superman, SpiderMan, Captain Obvious"
//1 вариант
function sum() {
    let args = 0;
    for (let i = 0; i < arguments.length; i++) {
        args += arguments[i];
    }
    return args;
}
//2 вариант
function sum2() {
    let summa = 0;
    for (let value of arguments)
        summa += value;

    return summa;
}
//3 вариант
function sum_all(...numbers) {

    return numbers.reduce((a, b) => ((a || 0) + b));
};

//console.log('sum=', sum_all(10 + 20 + 40 + 100));

//
function aSample() {
    a(+prompt("Введите текст", "")) // вызывает alert("Привет!")
}

function cubeSample() {
    num = prompt("Введите число", "");
    console.log(`число ${num} в кубе это ` + cube(+parseInt(num)))
}

function avg2Sample() {
    num1 = prompt("Введите первое число", "");
    num2 = prompt("Введите второе число", "");
    console.log(`среднее чисел ${num1} и  ${num2} это ` + avg2(+parseInt(num1), +parseInt(num2)))
}

function sum3Sample() {
    num1 = prompt("Введите первое число", "");
    num2 = prompt("Введите второе число", "");
    num3 = prompt("Введите третье число", "");
    console.log(`сумма чисел ${num1} и  ${num2} и  ${num3} это ` + sum3(+parseInt(num1), +parseInt(num2), +parseInt(num3)))
}

function intRandomSample() {
    console.log('целое случайное число = ', intRandom(2, 15)) // возвращает целое случайное число от 2 до 15 (включительно)
}

function greetAllSample() {
    greetAll("Superman", "SpiderMan", "Captain Obvious") // выводит alert "Hello Superman, SpiderMan, Captain Obvious"

}

function sumSample() {
    console.log('сумма = ', sum(10, 20, 40, 100)) // => 170

}
//Union
function union_switch() {
    let sample = prompt("Введите название задания\na\ncube\navg2\nsum3\nintRandom\ngreetAll\nsum");
    switch (sample.toLowerCase()) {
        case "a":
            aSample()
            break
        case "cube":
            cubeSample()
            break
        case "avg2":
            avg2Sample()
            break
        case "sum3":
            sum3Sample()
            break
        case "intRandom":
            intRandomSample()
            break
        case "greetAll":
            greetAllSample()
            break
        case "sum":
            sumSample()
            break
        default:
            a("Enter the correct name function")
            break
    }
}
//union_switch()
//Union declarative
const sample = prompt("Введите название задания\na\ncube\navg2\nsum3\nintRandom\ngreetAll\nsum").toLowerCase();

function union_object() {
    var obj = {
        "a": aSample,
        "cube": cubeSample,
        "avg2": avg2Sample,
        "sum3": sum3Sample,
        "intRandom": intRandomSample,
        "greetAll": greetAllSample,
        "sum": sumSample
    }

    obj[sample]();
}

//union_object();