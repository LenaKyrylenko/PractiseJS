function upperFirst(str) {
    if (!str) return str;
    return str[0].toUpperCase() + str.slice(1);
}
let menu = prompt('Выберите название задания из списка\nswitch sizes\nswitch if\nage prompt or' +
    '\nconfirm or this days\nconfirm if this days\ntriple prompt\ndefault or\ndefault if\nlogin and password\ncurrency calc' +
    '\ncurrency calc improved\ncurrency calc two rates\ncurrency calc if\nscissors\ncurrency exchange object' +
    '\ncurrency exchange real data\nscissors without if', '');


switch (menu) {
    case "switch sizes":
        {
            var size = parseInt(prompt("Введите размер от 40 до 54", ""));
            switch (size) {
                case 40:
                    alert("Американский размер - S");
                    break;
                case (42 || 44):
                    alert("Американский размер - M");
                    break;
                case (46 || 48):
                    alert("Американский размер - L");
                    break;
                case (50 || 52):
                    alert("Американский размер - XL");
                    break;
                case (54):
                    alert("Американский размер - XXL");
                    break;
                default:
                    alert("Вы ввели некорректное значение");
            }
            break;
        }

    case "switch if":
        {
            let color = (prompt("Введите цвет", ""));
            if (color == "red") {

                document.write("<div style='background-color: red;'>красный</div>");
                document.write("<div style='background-color: black; color: white;'>черный</div>");
            } else {
                if (color == "black") {
                    document.write("<div style='background-color: black; color: white;'>черный</div>");
                } else {
                    if (color == "blue") {
                        document.write("<div style='background-color: blue;'>синий</div>");
                        document.write("<div style='background-color: green; color: white;'>зеленый</div>");
                    } else {
                        if (color == "green")
                            document.write("<div style='background-color: green; color: white;'>зеленый</div>");
                        else {
                            document.write("<div style='background-color: gray;'>Я не понял</div>");
                        }
                    }

                }
            }
            break;
        }

    case "age prompt or":
        {
            let age = Number(prompt("Сколько тебе лет?"));
            let yearBirth = 2021 - age;
            //если age = 0,(false) с оператором и выходит false&&true => false
            //далее если false || true => true если введенно не число, нажата отмена или пустая строка тогда 
            //срабатывает вторая часть конструкции и выводит ошибку
            //!age (все неккоректные варианты)
            (age && alert(`Ваш год рождение это - ${yearBirth}`)) || (!age && alert("Произошла ошибочка"));
            break;
        }
    case "confirm or this days":
        {

            confirm("шопинг?") || alert("ты - бяка");
            break;
        }
    case "confirm if this days":
        {
            let question = confirm("шопинг?");
            if (!question)
                alert("ты - бяка");
            break;
        }

    case "triple prompt":
        {

            let surname = prompt("Введите фамилию", "");
            let name = prompt("Введите имя", "");
            let patronymic = prompt("Введите отчество", "");
            alert('Ваше ФИО это ' + upperFirst(surname) + " " + upperFirst(name) + " " + upperFirst(patronymic));
            break;
        }
    case "default or":
        {
            let
                surname = prompt("Введите фамилию", ""),
                name = prompt("Введите имя", ""),
                patronymic = prompt("Введите отчество", "");
            surname = ((surname) || (surname = "Иванов"));
            name = ((name) || (name = "Иван"));
            patronymic = ((patronymic) || (patronymic = "Иванович"));
            alert('Ваше ФИО это ' + upperFirst(surname) + " " + upperFirst(name) + " " + upperFirst(patronymic));
            break;
        }
    case "default if":
        {
            let
                surname = prompt("Введите фамилию", ""),
                name = prompt("Введите имя", ""),
                patronymic = prompt("Введите отчество", "");
            if (surname)
                surname = upperFirst(surname);
            else
                surname = "Иванов";
            if (name)
                name = upperFirst(name);
            else
                name = "Иван";
            if (patronymic)
                patronymic = upperFirst(patronymic);
            else
                patronymic = "Иванович";
            alert('Ваше ФИО это ' + surname + " " + name + " " + patronymic);
            break;
        }
    case "login and password":
        {
            check = {
                login: "admin",
                password: "qwerty"
            }
            log = prompt("Введите login", "");
            if (log == check["login"]) {
                pass = prompt("Введите password", "");
                if (pass == check["password"]) {
                    alert("Вы ввели правильный логин и пароль!")
                } else {
                    alert("Вы ввели неправильный пароль!")
                }
            } else {
                alert("Вы ввели неправильный логин!")
            }
            break;
        }

    case "currency calc":
        {
            let usd = 26;
            let eur = 30;
            let resCurrency = prompt("Введите валюту: 'usd' или 'eur'", "");
            switch (resCurrency) {
                case "usd":
                    {
                        number = prompt("Введите величину в uah", "");
                        if (number > 0)
                            alert("USD: " + (number * usd));
                        else
                            alert("Вы ввели некорректное число");
                        break;
                    }
                case "eur":
                    {
                        number = prompt("Введите величину в uah", "");
                        if (number > 0)
                            alert("EUR: " + (number * eur));
                        else
                            alert("Вы ввели некорректное число");

                        break;
                    }
                default:
                    alert("Вы ввели некорректное значение");
            }
            break;
        }

    case "currency calc improved":
        {

            let usd = 26;
            let eur = 30;
            let resCurrency = prompt("Введите валюту: 'usd' или 'eur'", "").toLowerCase();
            switch (resCurrency) {
                case "usd":
                    {
                        number = prompt("Введите величину в uah", "");
                        if (number > 0)
                            alert("USD: " + (number * usd));
                        else
                            alert("Вы ввели некорректное число");
                        break;
                    }
                case "eur":
                    {
                        number = prompt("Введите величину в uah", "");
                        if (number > 0)
                            alert("EUR: " + (number * eur));
                        else
                            alert("Вы ввели некорректное число");

                        break;
                    }
                default:
                    alert("Вы ввели некорректное значение");
            }
            break;
        }

    case "currency calc two rates":
        {

            const usdSale = 26.3;
            const usdBuy = 26;
            let choice = confirm('Если вы хотите на продажу нажмите ок если на покупку отмена');
            let number = prompt("Введите вашу сумму в usd", "");
            let result = ((choice) && ((number * usdSale.toFixed(2))) || ((!choice) && ((number * usdBuy.toFixed(2)))));
            let solution = alert('Результат= ' + result);
            break;
        }
    case "currency calc if":
        {

            const usdSale = 26.3;
            const usdBuy = 26;
            let solution;
            let choice = confirm('Если вы хотите на продажу нажмите ок если на покупку отмена');
            let number = prompt("Введите вашу сумму в usd", "");
            if (choice)
                solution = alert('Результат = ' + ((number * usdSale).toFixed(2)));
            else
                solution = alert('Результат= ' + ((number * usdBuy).toFixed(2)));

            break;
        }

    case "scissors":
        {

            let userName = prompt("Введите свой ник для дальнейшей игры", "");
            userName = ((userName) || (userName = "UserName"));
            let choiceUser = prompt("Введите свой выбор\nкамень\nножницы\nбумага", "");
            let objectGame = {
                0: "камень",
                1: "ножницы",
                2: "бумага"
            }
            let generateNum = Math.floor(Math.random() * 3);

            switch (choiceUser) {
                case ("камень"):
                    {
                        alert("Компьютер сгенирировал " + objectGame[generateNum]);
                        if (objectGame[generateNum] == "бумага")
                            alert("Компьютер выграл! Он оказался сильнее вас :(\nНо не отчаивайтесь, в следующий раз вы сможете! ");
                        else {
                            if (choiceUser == objectGame[generateNum])
                                alert("Ничья!");

                            else alert(`${userName} выграл! Вы оказались сильнее этого компьютера!`);
                        }
                        break;
                    }
                case ("ножницы"):
                    {
                        alert("Компьютер сгенирировал " + objectGame[generateNum]);
                        if (objectGame[generateNum] == "камень")
                            alert("Компьютер выграл! Он оказался сильнее вас :(\nНо не отчаивайтесь, в следующий раз вы сможете! ");
                        else {
                            if (choiceUser == objectGame[generateNum])
                                alert("Ничья!");

                            else alert(`${userName} выграл! Вы оказались сильнее этого компьютера!`);
                        }
                        break;
                    }
                case ("бумага"):
                    {
                        alert("Компьютер сгенирировал " + objectGame[generateNum]);
                        if (objectGame[generateNum] == "ножницы")
                            alert("Компьютер выграл! Он оказался сильнее вас :(\nНо не отчаивайтесь, в следующий раз вы сможете! ");
                        else {
                            if (choiceUser == objectGame[generateNum])
                                alert("Ничья!");
                            else alert(`${userName} выграл! Вы оказались сильнее этого компьютера!`);
                        }

                        break;
                    }
                default:
                    alert("вы ввели неккоректный выбор для игры :( ");
            }
            break;
        }

    case "currency exchange object":
        {
            let number;
            let ratios = {
                usd: 25.6,
                eur: 29,
                pln: 6.5
            }
            let currency = prompt("Введите валюту для обмена (в uah) с \nusd\neur\npln ", "");
            if (currency == "usd") {
                number = prompt("Введите вашу сумму", "");
                alert('Результат = ' + number * ratios["usd"]);
            } else {
                if (currency == "eur") {
                    number = prompt("Введите вашу сумму", "");
                    alert('Результат = ' + number * ratios["eur"]);
                } else {
                    if (currency == "pln") {
                        number = prompt("Введите вашу сумму", "");
                        alert('Результат = ' + number * ratios["pln"]);
                    } else {
                        alert('Вы ввели неккоректный выбор');
                    }
                }

            }

            break;
        }


    case "currency exchange real data":
        {
            let currency = prompt("Введите валюту для обмена (в uah) с \nusd\neur\npln ", "");

            if (currency == "usd") {
                number = prompt("Введите вашу сумму", "");
                fetch('https://open.er-api.com/v6/latest/USD').then(res => res.json())
                    .then(data => {
                        let real_usd = data.rates.UAH;
                        alert('Результат = ' + number * real_usd);
                    })

            } else {
                if (currency == "eur") {
                    number = prompt("Введите вашу сумму", "");
                    fetch('https://open.er-api.com/v6/latest/EUR').then(res => res.json())
                        .then(data => {
                            let real_eur = data.rates.UAH;
                            alert('Результат = ' + number * real_eur);
                        })

                } else {
                    if (currency == "pln") {
                        number = prompt("Введите вашу сумму", "");
                        fetch('https://open.er-api.com/v6/latest/PLN').then(res => res.json())
                            .then(data => {
                                let real_pln = data.rates.UAH;
                                alert('Результат = ' + number * real_pln);
                            })

                    } else {
                        alert('Вы ввели неккоректный выбор');
                    }
                }

            }
            break;
        }
    case "scissors without if":
        {
            let choiceUser = prompt("Введите свой выбор\nкамень\nножницы\nбумага", "");
            let objectGame = {
                0: "камень",
                1: "ножницы",
                2: "бумага"
            }
            let generateNum = Math.floor(Math.random() * 3);
            alert("Компьютер сгенирировал " + objectGame[generateNum]);
            (((choiceUser == "бумага") && (objectGame[generateNum] == "ножницы")) || ((choiceUser == "ножницы") && (objectGame[generateNum] == "камень"))) ? alert("компьютер победил") : (choiceUser == objectGame[generateNum]) ? alert("ничья") : alert("юзер победил");
            break;
        }
    default:
        alert("Вы ввели некорректное значение");

}