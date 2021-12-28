//1 вариант
function myTimer() {
    let time = performance.now();
    return function() {
        time = performance.now() - time;
        return ((time / 1000).toFixed(3))
    }
}
//2 вариант
function myTimer2() {
    const start = new Date().getTime();
    return function() {
        const end = new Date().getTime();
        return ((end - start) / 1000)
    }
}

//var timer = myTimer()
//alert('Замеряем время работы этого alert'); //некий код, время выполнения которого мы хотим измерить с высокой точностью
//alert(timer()); //alert должен вывести время в микросекундах от выполнения makeProfileTimer до момента вызова timer(), 
// // т. е. измерить время выполнения alert
//1 вариант
function makeSaver(func) {
    let result;
    return function() {
        result = func();
    }
}
// 2 вариант через стрелочную функцию 
var makeSaver2 = (makeSaver2) => () => makeSaver2()
    // var saver = func(Math.random) //создает функцию-хранилище результата переданной в качестве параметра функции (Math.random 
    //     // в примере). На этом этапе Math.random НЕ вызывается
    // var value1 = saver() //saver вызывает переданную в makeSaver функцию, запоминает результат и возвращает его
    // var value2 = saver() //saver в дальнейшем просто хранит результат функции, и более НЕ вызывает переданную 
    //     //в makeSaver функцию;
    // value1 === value2 // всегда true

// var saver2 = makeSaver(() => console.log('saved function called') || [null, undefined, false, '', 0, Math.random()][Math.ceil(Math.random() * 6)])
// var value3 = saver2()
// var value4 = saver2()

// let a = value3 === value4 // тоже должно быть true
// console.log(a);

//Final Countdown Self Invoked Function
let i = 6;
(function timer() {

    if (--i < 1) {
        console.log('поехали')
        return
    } else {
        setTimeout(() => {
            console.log(i);
            timer()
        }, 1000);
    }

})();

//my bind
function myBind(func, context, bindArguments) {
    return function(...args) {
        let newArgs = [];
        let iter = 0;
        for (let i in bindArguments) {
            //если в параметрах 
            //по умолчани есть undefined,
            // пушим полученные параметры вместо него
            if (bindArguments[i] === undefined) {
                newArgs.push(args[iter])
                iter++
            } else {
                newArgs.push(bindArguments[i])
            }
        }
        return func.apply(context, newArgs);
    }
}
// var pow5 = myBind(Math.pow, Math, [undefined, 5])
// console.log(pow5(2))
// var cube = myBind(Math.pow, Math, [undefined, 3]) // cube возводит число в куб

// pow5(2) // => 32, вызывает Math.pow(2,5), соотнесите с [undefined, 5]
// cube(3) // => 27


// var chessMin = myBind(Math.min, Math, [undefined, 4, undefined, 5, undefined, 8, undefined, 9])
// console.log(chessMin(-1, -5, 3, 15)) // вызывает Math.min(-1, 4, -5, 5, 3, 8, 15, 9), результат -5

// let res = myBind((...params) => params.join(''), null, [undefined, 'b', undefined, undefined, 'e', 'f'])('a', 'c', 'd') === 'abcdef'
// console.log(res)