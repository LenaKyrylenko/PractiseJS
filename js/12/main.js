const КУПИТЬ = 'КУПИТЬ'

function reducer(state, { type, ШО, СКОКА, БАБЛО }) { //объект action деструктуризируется на три переменных
    if (!state) { //начальная уборка в ларьке:
        return {
            пиво: {
                quantity: 100,
                price: 20
            },
            чипсы: {
                quantity: 100,
                price: 25
            },
            сиги: {
                quantity: 100,
                price: 60
            },
            сникерс: {
                quantity: 100,
                price: 15
            },
            вода: {
                quantity: 100,
                price: 10
            },
            касса: 0,
        }
    }

    if (type === КУПИТЬ) { //если тип action - КУПИТЬ, то:
        if ((state[ШО].quantity - СКОКА) < 0) {
            alert('упс, вы ушли в минус, введите корректное количество')
            return {
                ...state, //берем все что было из ассортимента
            }
        }
        if (БАБЛО < state[ШО].price * СКОКА) {
            alert('упс, НЕ ХВАТАЕТ БАБЛА')
            return {
                ...state, //берем все что было из ассортимента
            }
        } else if ((БАБЛО > 0) && (СКОКА > 0)) {
            {
                return {
                    ...state, //берем все что было из ассортимента
                    [ШО]: {
                        ...state[ШО],
                        quantity: state[ШО].quantity - СКОКА
                    },
                    касса: state.касса + state[ШО].price * СКОКА,
                    БАБЛО: БАБЛО - state[ШО].price * СКОКА
                }
            }

        } else alert('вы внесли некорректные данные... попробуйте еще раз ...')
    }


    return state //если мы не поняли, что от нас просят в `action` - оставляем все как есть
}

function createStore(reducer) {
    let state = reducer(undefined, {}) //стартовая инициализация состояния, запуск редьюсера со state === undefined
    let cbs = [] //массив подписчиков

    const getState = () => state //функция, возвращающая переменную из замыкания
    const subscribe = cb => (cbs.push(cb), //запоминаем подписчиков в массиве
            () => cbs = cbs.filter(c => c !== cb)) //возвращаем функцию unsubscribe, которая удаляет подписчика из списка

    const dispatch = action => {
        const newState = reducer(state, action) //пробуем запустить редьюсер
        if (newState !== state) { //проверяем, смог ли редьюсер обработать action
            state = newState //если смог, то обновляем state 
            for (let cb of cbs) cb() //и запускаем подписчиков
        }
    }

    return {
        getState, //добавление функции getState в результирующий объект
        dispatch,
        subscribe //добавление subscribe в объект
    }
}

const store = createStore(reducer)
store.subscribe(() => console.log(store.getState()))

let selectProduct = document.createElement('select')
selectProduct.id = "select"
let input = document.createElement('input')
input.placeholder = "quantity"
input.type = "number"
input.min = 0
document.body.appendChild(input)
let inputMoney = document.createElement('input')
inputMoney.placeholder = "money"
inputMoney.type = "number"
inputMoney.min = 0
document.body.appendChild(inputMoney)

for (let key in (store.getState())) {
    let option = document.createElement('option')
    option.innerHTML = key
    selectProduct.appendChild(option)
}
document.body.appendChild(selectProduct)
let br = document.createElement("br")
let table = document.createElement("table")
document.body.append(table)

function createTable() {
    table.innerHTML = ""
    for (let [keyName, storeValue] of Object.entries(store.getState())) {
        let tr = document.createElement('tr')

        if (typeof storeValue === "object") {
            let thProduct = document.createElement('th')
            thProduct.innerHTML = `${keyName}`
            tr.appendChild(thProduct)

            for (let [key, value] of Object.entries(storeValue)) {
                let thKey = document.createElement('th')
                let thValue = document.createElement('td')
                thKey.innerHTML = ` ${key}`;
                thValue.innerHTML = `${value}`
                tr.appendChild(thKey)
                tr.appendChild(thValue)
            }

        } else {
            let thKey2 = document.createElement('th')
            let thValue2 = document.createElement('td')
            thKey2.innerHTML = `${keyName}`;
            thValue2.innerHTML = ` ${storeValue}`
            tr.appendChild(thKey2)
            tr.appendChild(thValue2)
        }
        table.append(tr)
    }


}
createTable()
store.subscribe(() => createTable())
let labelProduct = document.createElement('label')
document.body.appendChild(br)
document.body.appendChild(labelProduct)

let btn = document.getElementById("btn")
btn.onclick = (e) => {
    store.dispatch({ type: КУПИТЬ, ШО: selectProduct.value, СКОКА: input.value, БАБЛО: inputMoney.value })
}