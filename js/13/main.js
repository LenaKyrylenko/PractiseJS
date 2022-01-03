//fetch for first task
let table = document.createElement("table")
document.body.append(table)
    // fetch('https://swapi.dev/api/people/1/')
    //     .then(res => res.json())
    //     .then(luke => createTable(table, luke))

//fetch for second task
function fetchForTable(url) {
    fetch(url)
        .then(res => res.json())
        .then(luke => createTableImproved(newtable, luke))
}
let newtable = document.createElement("table")
document.body.append(newtable)
fetchForTable('https://swapi.dev/api/people/1/')
    //fetch basic
function createTable(table, myJson) {
    table.innerHTML = ""
    for (let [keyJson, valueJson] of Object.entries(myJson)) {
        let tr = document.createElement('tr')
            //console.log(typeof storeValue)
        if (typeof valueJson === "object") {
            let thKey = document.createElement('th')
            thKey.innerHTML = `${keyJson}`
            tr.appendChild(thKey)
            for (let [key, value] of Object.entries(valueJson)) {

                let thValue = document.createElement('td')

                thValue.innerHTML = `${value}`
                tr.appendChild(thValue)
            }

        } else {
            let thKey2 = document.createElement('th')
            let thValue2 = document.createElement('td')
            thKey2.innerHTML = `${keyJson}`;
            thValue2.innerHTML = ` ${valueJson}`
            tr.appendChild(thKey2)
            tr.appendChild(thValue2)
        }
        table.append(tr)
    }
}

//fetch improved
function createTableImproved(table, myJson) {
    const substring = 'https://swapi.dev/api/'
    for (let [keyJson, valueJson] of Object.entries(myJson)) {
        let tr = document.createElement('tr')
        if (typeof valueJson === "object") {
            let thKey = document.createElement('th')
            thKey.innerHTML = `${keyJson}`
            tr.appendChild(thKey)
            for (let [key, value] of Object.entries(valueJson)) {
                if (value.includes(substring)) {
                    let btnValue = document.createElement('button')
                    btnValue.style.color = 'red'
                    btnValue.innerHTML = `<b> ${value}`
                    btnValue.onclick = () => fetchForTable(value)
                    tr.appendChild(btnValue)
                } else {
                    let thValue = document.createElement('td')
                    thValue.innerHTML = `${value}`
                    tr.appendChild(thValue)
                }
            }

        } else if ((typeof valueJson === "string") && (valueJson.includes(substring))) {
            let thKey2 = document.createElement('th')
            thKey2.innerHTML = `${keyJson}`;
            let btnValue = document.createElement('a')
            btnValue.style.color = 'red'
            btnValue.innerHTML = `<b> ${valueJson}`
            btnValue.onclick = () => fetchForTable(valueJson)
            tr.appendChild(thKey2)
            tr.appendChild(btnValue)
        } else {
            let thKey2 = document.createElement('th')
            let thValue2 = document.createElement('td')
            thKey2.innerHTML = `${keyJson}`;
            thValue2.innerHTML = ` ${valueJson}`
            tr.appendChild(thKey2)
            tr.appendChild(thValue2)
        }

        table.append(tr)
    }
}
//1 вариант
// function myfetch(url) {
//     return new Promise(function(resolve, reject) {
//         const xhr = new XMLHttpRequest();

//         xhr.open('GET', url, true);
//         xhr.send();

//         xhr.onreadystatechange =
//             function() {
//                 try {
//                     if (xhr.readyState != 4)
//                         return;
//                     if (xhr.status != 200) {
//                         reject(new Error(`Ошибка ${xhr.status}: ${xhr.statusText}`))
//                     } else {
//                         resolve(JSON.parse(xhr.responseText));
//                     }
//                 } catch (err) { // для отлова ошибок используем конструкцию try...catch вместо onerror
//                     reject(new Error('ERROR: Request failed' + `${err}`))
//                 }

//             }
//     })
// }

// //2 вариант
function myfetch(url) {
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState != 4)
                return;
            (xhr.status == 200) ?
            resolve(JSON.parse(xhr.responseText)):
                reject(new Error(`Ошибка ${xhr.status}: ${xhr.statusText}`))

        }
        xhr.onerror = () => reject(new Error('ERROR: Request failed'))
    })
}


// myfetch('https://swapi.dev/api/people/1/')
//     .then(luke => console.log(luke))
//race

const delay = ms => {
        return new Promise(resolve => setTimeout(() => resolve(), ms))
    }
    //delay(2000).then(() => console.log('after 2 sec'))

// Promise.race([delay(10).then(() => console.log('after 10 ms')), myfetch('https://swapi.dev/api/people/1/')
//     .then(luke => console.log(luke))
// ]).then(() => console.log('first promise'))

console.log('start promises...')
Promise.race([delay(1000).then(() => console.log('after 1 sec')), myfetch('https://swapi.dev/api/people/1/')
    .then(luke => console.log(luke))
]).then(() => console.log('first promise'))

Promise.all([delay(2000).then(() => console.log('after 2 sec')), myfetch('https://swapi.dev/api/people/1/')
    .then(luke => console.log(luke))
]).then(() => console.log('all promises'))