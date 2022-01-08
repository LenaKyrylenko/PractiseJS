//Светофор
const delay = ms => new Promise(ok => setTimeout(() => ok(ms), ms))

const divLights = document.getElementById('divTraffic')
const btn = document.getElementById('btn')

async function trafficLight() {
    while (true) {
        // //включаем зеленый
        divLights.classList.remove('red')
        divLights.classList.add('green')
        await delay(3000)

        divLights.classList.remove('green')
        divLights.classList.add('yellow')
        await delay(1000)

        divLights.classList.remove('yellow')
        divLights.classList.add('red')
        await delay(3000)

    }
}
//trafficLight()

//Stage 2
async function trafficLightUniversal(divLights, greenRedTime = 3000, yellowTime = 1000) {
    while (true) {
        // //включаем зеленый
        divLights.classList.remove('red')
        divLights.classList.add('green')
        await delay(greenRedTime)

        divLights.classList.remove('green')
        divLights.classList.add('yellow')
        await delay(yellowTime)

        divLights.classList.remove('yellow')
        divLights.classList.add('red')
        await delay(greenRedTime)


    }
}
//trafficLight(divLights)
async function domEventPromise(btn, eventName) {
    return new Promise((resolve) => {
        btn.addEventListener(eventName, (e) =>
            resolve(e)
        )
        btn.removeEventListener(eventName, (e) =>
            resolve(e))

    })

}
//domEventPromise(btn, 'click').then(e => console.log('event click happens', e))
//domEventPromise(btn, 'mouseover').then(e => console.log('event mouseover happens', e))
async function disabledBtn(btn, btnTime) {

    btn.disabled = true
    btn.classList.add('disabled')

    await delay(btnTime)
    btn.disabled = false
    btn.classList.remove('disabled')
}

async function PedestrianTrafficLight(divLights, greeTime = 5000, redTime = 45000, btnTime = 2000) {

    while (true) {
        divLights.classList.remove('red')
        divLights.classList.add('green')
        await Promise.race([delay(greeTime), domEventPromise((btn), 'click').then(e => {
            disabledBtn(e.target, btnTime)
        })])

        divLights.classList.remove('green')
        divLights.classList.add('red')
        await Promise.race([delay(redTime), domEventPromise((btn), 'click').then(e =>
            disabledBtn(e.target, btnTime)
        )])
    }
}
//PedestrianTrafficLight(divLights)
//count - количество повторов
//parallel - количество одновременных запросов/промисов в одном повторе
//getPromise - функция, которая умеет вернуть нужный Вам промис для тестирования скорости его работы
async function speedtest(getPromise, count, parallel = 1) {
    const start = new Date().getTime();
    try {
        let promiseArray = []
        for (let countPromise = 0; countPromise < count; countPromise++) {
            for (let paralelPromise = 0; paralelPromise < parallel; paralelPromise++) {
                promiseArray.push(getPromise())
            }

            console.log(promiseArray)
            await Promise.all(promiseArray)
            promiseArray.length = 0
        }

    } catch (error) {
        console.log(new Error(error))
    }
    const end = new Date().getTime();
    let durationTime = (end - start)
    let querySpeedTime = (count / durationTime)
    let queryDurationTime = (durationTime / count)
    let parallelSpeedTime = ((parallel * count) / durationTime)
    let parallelDurationTime = (durationTime / (parallel * count))
    return {
        duration: durationTime,
        querySpeed: querySpeedTime,
        queryDuration: queryDurationTime,
        parallelSpeed: parallelSpeedTime,
        parallelDuration: parallelDurationTime
    }

}
//speedtest(() => delay(1000), 10, 10).then(result => console.log(result))
// {duration: 10000, 
// querySpeed: 0.001, //1 тысячная запроса за миллисекунду
// queryDuration: 1000, //1000 миллисекунд на один реальный запрос в среднем 
// parallelSpeed: 0.01  // 100 запросов за 10000 миллисекунд
// parallelDuration: 100 // 100 запросов за 10000 миллисекунд
//speedtest(() => fetch('http://swapi.dev/api/people/1').then(res => res.json()), 10, 5)


const getGQL = url =>
    (query, variables) => fetch(url, {
        //метод
        method: 'POST',
        headers: {
            //заголовок content-type
            "Content-Type": "application/json",
            ...(localStorage.authToken ? { "Authorization": "Bearer " + localStorage.authToken } : {})
        },
        body: JSON.stringify({ query, variables })
            //body с ключами query и variables
    }).then(res => res.json())
    .then(data => {
        if (data.data) {
            return Object.values(data.data)[0]
        } else throw new Error(JSON.stringify(data.errors))
    })

//const gql = getGQL('http://shop-roles.asmer.fs.a-level.com.ua/graphql');
const backendURL = 'http://shop-roles.asmer.fs.a-level.com.ua'

const gql = getGQL(backendURL + '/graphql')
    //написать тестовых запросов:
    //логин 
async function queryLogin() {
    return await gql(` query login($login:String, $password:String){
            login(login:$login, password:$password)
        } `, { login: "LenaKyrylenko", password: "Litana13lank" }).then(res => console.log("login:", res))
}
queryLogin()
    //2 вариант
async function gqlLogin(login, password) {
    return await gql(` query login($login:String, $password:String){
              login(login:$login, password:$password)
          } `, { login: login, password: password }).then(res => console.log("login:", res))
}
gqlLogin("LenaKyrylenko", "Litana13lank")
    //регистрация
async function mutationrRegister() {
    return await gql(`mutation register($login: String, $password: String) {
    UserUpsert(user: {login: $login, password: $password, nick: $login}) {
      _id login
    }
  }`, { login: "Lena", password: "12345" }).then(res => console.log(res))
}
//mutationrRegister()

//все категории
async function queryAllCats() {
    return await gql(`query allCats {
        CategoryFind(query: "[{}]"){
        _id name goods { _id name description price images{url}}} 
      }`).then(res => console.log("All categories:", res))
}
queryAllCats()
    //категория по id
async function queryCatById(idCategory) {
    return await gql(`query catById($q: String){
    CategoryFindOne(query: $q){
        _id name goods {
            _id name price images {
                url
            }
        }
    }
}`, { q: idCategory }).then(res => console.log("Category by id:", res))
}
let categoryId = "[{\"_id\": \"5dc458985df9d670df48cc47\"}]"
queryCatById(categoryId)
    //товар по id
async function queryGoodById(idGood) {
    return await gql(`query goodById($good: String){
        GoodFindOne(query: $good){
            _id name description price 
            categories{_id name owner{_id login nick}}images{url}}
            }`, { good: idGood }).then(res => console.log("Good by id:", res))
        //.then(myToken => localStorage.authToken = myToken)
}
let goodId = "[{\"_id\": \"5e1f396856d8f720513e6cae\"}]"
queryGoodById(goodId)

//console.log("localStorage = ", localStorage)