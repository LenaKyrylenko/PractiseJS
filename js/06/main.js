function a(text) {

    alert(text);
}
//a('Привет!');
function cube(number) {
    return num = Math.pow(number, 3)
}
//cube(3);
function avg2(number1, number2) {
    return ((number1 + number2) / 2)
}
//avg2(3,3);

function sum3(num1 = 0, num2 = 0, num3 = 0) {
    return (num1 + num2 + num3)
}
//sum3(1, 2, 3);

function intRandom(first = 0, second = 0) {
    return Math.round(Math.random() * (second - first) + first)
}
//intRandom(2, 15);

function greetAll() {
    let args = [];
    for (let i = 0; i < arguments.length; i++) {
        args[i] = arguments[i];

    }
    return alert("Hello " + args);
}
//greetAll("Superman", "SpiderMan", "Captain Obvious") // выводит alert "Hello Superman, SpiderMan, Captain Obvious"

function sum() {
    let args = 0;
    for (let i = 0; i < arguments.length; i++) {
        args += arguments[i];
    }
    return args;
}
//sum(10, 20, 40, 100)

function aSample() {
    a("Привет!") // вызывает alert("Привет!")
}

function cubeSample() {
    cube(5) // => 125
}

function avg2Sample() {
    avg2(10, 5) // возвращает 7.5
}

function sum3Sample() {
    console.log(sum3(1, 2, 3)) // возвращает 6
}

function intRandomSample() {
    intRandom(2, 15) // возвращает целое случайное число от 2 до 15 (включительно)
}

function greetAllSample() {
    greetAll("Superman", "SpiderMan", "Captain Obvious") // выводит alert "Hello Superman, SpiderMan, Captain Obvious"

}

function sumSample() {
    console.log(sum(10, 20, 40, 100)) // => 170

}
//Union
function union_switch() {
    var sample = prompt("Введите название задания")
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
            console.log(sum3Sample())
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
function union_object() {
    var sample = prompt("Введите название задания")
    var obj = {
        "a": aSample(),
        "cube": cubeSample(),
        "avg2": avg2Sample(),
        "sum3": sum3Sample(),
        "intRandom": intRandomSample(),
        "greetAll": greetAllSample(),
        "sum": sumSample()
    }
    obj[sample.toLowerCase()];

}
//union_object();