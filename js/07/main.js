//Таблица умножения

var table = document.createElement('table')
for (let i = 0; i <= 10; i++) {
    //по строчкам
    var tr = document.createElement("tr");
    for (let j = 0; j <= 10; j++) {
        //по столбцам
        var td = document.createElement("td");
        let multi = i * j
        if (multi == 0) {
            multi = i || j;
            multi = multi ? multi : '0';
        }
        //по столбцам умножение
        td.innerText = multi;
        //добавление в конец к строке столбец 
        tr.appendChild(td);
    }

    //добавление к таблице столбец
    table.appendChild(tr)


}
document.body.appendChild(table);
//Подсветить ячейку Подсветить строку и столбец
table.onmouseover = function(event) {
    if (event.type == 'mouseover') {
        event.target.style.background = ("lightyellow");
    }
    document.querySelectorAll(".backcolor").forEach(
        item => item.classList.remove("backcolor")
    );
    event.target.closest("tr").classList.add("backcolor");
    event.target.closest("table").querySelectorAll("tr").forEach(
        tr => tr.cells[event.target.cellIndex].classList.add("backcolor")
    );
}


table.onmouseout = function(event) {
    //удаление предыдущего цвета ячейки
    if (event.type == 'mouseout') {
        event.target.style.background = ''
    }
    //удаление предыдущего цвета (строка-столбец по выбранной ячейке)
    document.querySelectorAll(".backcolor").forEach(
        item => item.classList.remove("backcolor")
    );
}

//Calc
//оптимизировала создания множества элементов 

//p
function createP(text) {
    let p = document.createElement("p");
    p.innerHTML = text;
    document.body.appendChild(p)

}
//button
function createButton(text) {
    let btn = document.createElement("button");
    btn.id = text;
    btn.innerHTML = "<b>" + text;
    btn.classList.add("btn");
    document.body.appendChild(btn)

}
//input
function createInput(text) {
    let input = document.createElement("input");
    input.id = text;
    //или так можно задать атрибуты 
    //input.setAttribute('type', 'number');
    //input.setAttribute('min', '0');
    input.type = "number";
    document.body.appendChild(input)
}
let p1 = createP("CALCULATOR")
document.write("<br>");
let p2 = createP("Enter the numbers")
let inputElem1 = createInput("inputId1");
let inputElem2 = createInput("inputId2");
let buttonSum = createButton("sum");
let buttonMulti = createButton("multiplication");
let buttonSub = createButton("subtraction");
let buttonDiv = createButton("division");

let pResult = document.createElement("p");
document.body.appendChild(pResult)

function res(result) {
    pResult.innerHTML = `<br/> Result = ${result.toFixed(2)}`
}

function calc() { res((+inputId1.value) + (+inputId2.value)) }
multiplication.onclick = () => res((+inputId1.value) * (+inputId2.value))
subtraction.onclick = () => res((+inputId1.value) - (+inputId2.value))
division.onclick = () => res((+inputId1.value) / (+inputId2.value))
    //сделала преобразователь валют, где подтягивается "реальные" данные валют
let p3 = createP("<br>CONVERTER");
let p4 = createP("Enter the number to convert")
let inputValut = createInput("Valut");
document.write("<br>");

let buttonUSD = createButton("USD");
let buttonEUR = createButton("EUR");
let buttonPLN = createButton("PLN");
let buttonRUB = createButton("RUB");
let buttonGBP = createButton("GBP");
let pResultConvert = document.createElement("p");
document.body.appendChild(pResultConvert)


function resValut(result) {
    pResultConvert.innerHTML = `<br/> Result = ${result.toFixed(2)}`

}
let linkjson = fetch('https://open.er-api.com/v6/latest/UAH').then(result => result.json());
USD.onclick = () =>
    linkjson.then(data => resValut(Valut.value / data.rates.USD))

EUR.onclick = () =>
    linkjson.then(data => resValut(Valut.value / data.rates.EUR))
PLN.onclick = () =>
    linkjson.then(data => resValut(Valut.value / data.rates.PLN))
RUB.onclick = () =>
    linkjson.then(data => resValut(Valut.value / data.rates.RUB))
GBP.onclick = () =>
    linkjson.then(data => resValut(Valut.value / data.rates.GBP))



let p5 = createP("CALCULATOR updated by event")
let p6 = createP("Enter the numbers")

//Calc Live
let inputElem3 = createInput("inputId3");
let inputElem4 = createInput("inputId4");

let pSum = document.createElement("p");
pSum.id = "pSum";
document.body.appendChild(pSum)
let pMultiplication = document.createElement("p");
pMultiplication.id = "pMultiplication";
document.body.appendChild(pMultiplication)

let pSubtraction = document.createElement("p");
pSubtraction.id = "pSubtraction";
document.body.appendChild(pSubtraction)
let pDivision = document.createElement("p");
pDivision.id = "pDivision";
document.body.appendChild(pDivision)

function updateValue() {
    pSum.innerHTML = `Result sum = ${((+inputId3.value) + (+inputId4.value)).toFixed(2)} `
    pMultiplication.innerHTML = `Result multiplication = ${((+inputId3.value) * (+inputId4.value)).toFixed(2)} `
    pSubtraction.innerHTML = `Result Subtraction = ${((+inputId3.value) - (+inputId4.value)).toFixed(2)} `
    pDivision.innerHTML = `Result division = ${((+inputId3.value) / (+inputId4.value)).toFixed(2)} `
}
inputId3.addEventListener('change', updateValue);
inputId4.addEventListener('change', updateValue);