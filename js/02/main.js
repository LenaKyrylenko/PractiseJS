//1 assign: evaluation
function assign() {
    var a = 5;
    var b, c;
    console.log(a);
    b = a * 5;
    c = b;
    console.log(c);
    b = b / 2;
    console.log(b);
    console.log(c);
}

//assign();
//semicolon: error
//console.log(a) console.log(b);

//2 number: age
function numAge() {
    let age = prompt('Сколько вам лет?', '');
    let yearBirth = 2021 - age;
    alert(`Ваш год рождение это - ${yearBirth}`);
}
// numAge();
//2 number: temperature
function temp() {
    let tempCelsius = prompt('Какая сейчас температура (в Цельсиях) ?', '');
    let tempFahrenheit = tempCelsius * 32;
    alert(`В градусах Фаренгейта это - ${tempFahrenheit}`);

}
//temp();
//2 number: divide
function numDivide() {
    let a = prompt(' Введите значение a ', '');
    let b = prompt(' Введите значение b ', '');
    alert(`Результат - ${Math.floor(a / b)}`);
}
//numDivide();
//2 number: odd
function numCheck() {
    let numb = Number(prompt(' Введите число ', ''));
    if (typeof(numb) === 'number') { numb % 2 === 0 ? alert('четное число') : alert('нечетное число'); } else {
        alert('введено не корректное число!')
    }
}
//numCheck();
//3 String: greeting
//  let name=prompt(' Введите свое имя ','');
//  alert(`Привет, ${name}!`);

//3 string includes,indexOf
function checkString() {
    let str = "123456";
    let str_user = prompt(' Введите строку ');
    let result = str.includes(str_user);
    if (result == false)
        alert('такой строки не найдено')
    else
        alert(`result - ${result}!`);
    //второй метод 
    //  let result2=str.indexOf(str_user);
    //  alert(`позиция подстроки ${result2}!`);
}
//checkString();

//4 confirm
function boolConfirm() {
    let name = prompt('Введите свое имя ', '');
    let frontend = confirm(`${name}, ты хочешь стать frontend-разработчиком?`);
    if (frontend) // true, если нажата OK
    { alert('Учи js!!!'); }
}
//boolConfirm();

//5 boolean
//     let q1,q2,q3;
// q1 = confirm('ты любишь кушать?');
// if(q1){
//     q2 = confirm('очень очень любишь?');
// }
// if (q2){
//     q3 = confirm("тогда мы приглашаем тебя в кафе 'boolean', прийдешь?");
// }
// if (q3){
//      alert('мы тебя будем ждать!!!')
// }
// else{
//     alert('ну и почему ты соврал ...')
// }
// confirm('ты любишь кушать?')&&confirm('очень очень любишь?')&&confirm("тогда мы приглашаем тебя в кафе 'boolean', прийдешь?");


//5 boolean
// let sex = confirm('у вас женский пол?');
// if(sex){
//     alert('вы женщина!')
// }
// else{
//     alert("значит вы мужчина! :) ")
// }

//6
// let arraySubjects=['Math','Database','Programming'];
// let arrayConfirm=[q1,q2,q3,sex];

//7 array plus first and second elements => insert in 2 index 
function array1() {
    let sum;
    let array = [1, 2, 5, 7, 9];
    console.log('before: ', array);
    sum = array[0] + array[1];
    console.log('sum= ', sum);
    array.splice(2, 0, sum);;
    console.log('after: ', array);
}

//array1();

//8 array plus first, second, third elements => insert in 3 index 
function array2() {
    let sum;
    let array = ['dog', 'cat', 'hourse', 'bird', 'mouse'];
    console.log('before: ', array);
    sum = array[0] + array[1] + array[2];
    console.log('sum= ', sum);
    array.splice(3, 0, sum);;
    console.log('after: ', array);
}
//array2();
//9 Object: real + change
function objectChange() {
    let room = {
        resolution: {
            height: 3,
            width: 5,
        },
        wall_color: 'pink',
        light: 'white'
    }
    let changeWidth = room.resolution.width = 100;
    console.log('changeWidth ', changeWidth);
    let changeLight = room["resolution"]["length"] = 200;
    console.log('changeLight ', changeLight);
    console.log(room);
}
//objectChange();
//10 Comparison if
function comparison1() {
    var age = +prompt("Сколько вам лет?", "");
    if (age > 0 && age < 18)
        alert("школьник");
    else {
        if (age < 30)
            alert("молодеж");
        else {
            if (age < 45)
                alert("зрелость");
            else {
                if (age < 60)
                    alert("закат");
                else {
                    if (age > 60)
                        alert("как пенсия?");
                    else {
                        alert("то ли киборг, то ли ошибка");
                    }
                }

            }

        }

    }
}
//comparison1();
function comparison2() {
    if (age > -18)
        alert("школьник");
    else {
        if (age > -30)
            alert("молодеж");
        else {
            if (age > -45)
                alert("зрелость");
            else {
                if (age > -60)
                    alert("закат");
                else {
                    if (age < -60)
                        alert("как пенсия?");
                    else {
                        alert("то ли киборг, то ли ошибка");
                    }
                }

            }

        }

    }
}
//comparison2();

//Comparison: sizes with if
function compSizeIf() {
    let size = parseInt(prompt("Введите размер от 40 до 54", ""))
    if ((size == 40))
        alert("S")
    else {
        if ((size == 42) || (size == 44))
            alert("M")
        else {
            if ((size == 46) || (size == 48))
                alert("L")
            else {
                if ((size == 50) || (size == 52))
                    alert("XL")
                else {
                    if (size == 54)
                        alert("XXL")

                    else {
                        if (size % 2 != 0)
                            alert("Вы ввели нечетное число, такого размера нету")

                        else {
                            if ((size < 40) || (size > 54))
                                alert("Вы ввели размер не из указаного диапазона.")
                        }
                    }
                }
            }
        }
    }
}
//compSizeIf();
function ComparisonSizeObject() {
    let sizeWomenClothes = {
        40: "S",
        42: "M",
        44: "M",
        46: "L",
        48: "L",
        50: "XL",
        52: "XL",
        54: "XXL"
    }
    let sizeWomenLinen = {
        42: "XXS",
        44: "XS",
        46: "S",
        48: "M",
        50: "L",
        52: "XL",
        54: "XXL",
        56: "XXXL"
    }

    let stockingsAndSocks = {
        21: 8,
        22: 8.5,
        23: 9,
        24: 9.5,
        25: 10,
        26: 10.5,
        27: 11
    }
    let choise = (prompt("Выберите категорию для перевода размеров\n1) одежда\n2) женское белье\n3) чулки и носки\n(введите 1, 2 или 3)", ""));
    if (choise == "1") {
        let size = parseInt(prompt("Введите размер от 40 до 54", ""));
        ((size < 40) || (size > 54)) ? alert("Вы ввели не корректный диапазон"): ((size % 2 != 0) ? alert("Вы ввели нечетное число, такого размера нету") : alert("Американский размер - " + sizeWomenClothes[size]));

    } else {
        if (choise == "2") {
            let size = parseInt(prompt("Введите размер от 42 до 56", ""));
            ((size < 42) || (size > 56)) ? alert("Вы ввели не корректный диапазон"): ((size % 2 != 0) ? alert("Вы ввели нечетное число, такого размера нету") : alert("Американский размер - " + sizeWomenLinen[size]));
        } else {
            if (choise == "3") {
                let size = parseInt(prompt("Введите размер от 21 до 27", ""));
                ((size < 21) || (size > 27)) ? alert("Вы ввели не корректный диапазон"): alert("Американский размер - " + stockingsAndSocks[size]);

            } else {
                alert("Вы ввели некорректный вариант");
            }
        }

    }
}

//ComparisonObject();
function tern() {
    let sex = confirm("у вас женский пол? ");
    (sex) ? alert("вы женщина!"): alert("вы мужчина :)");
}
//tern();
function flats() {
    let numberFloors = parseInt(prompt("Введите количество этажей в доме", ""));
    let numberApartFloor = parseInt(prompt("Введите количество квартир на этаже", ""));
    let numberFlat = parseInt(prompt("Введите номер квартиры", ""));
    let multiplyAparFloor = numberFloors * numberApartFloor;
    let numEntrance = Math.ceil(numberFlat / multiplyAparFloor);
    alert("Номер подьезда №" + numEntrance);
    let numFloor = Math.ceil((numberFlat % multiplyAparFloor) / numberApartFloor);
    alert("Номер этажа №" + numFloor);
}
//flats();