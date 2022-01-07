var inputNick = document.getElementById('nick')
var inputMessage = document.getElementById('message')
var sendBtn = document.getElementById('send')
const divChat = document.getElementById('chat')
async function sendMessage(sendNick, sendMessage) {

    await jsonPost("http://students.a-level.com.ua:10012", { func: 'addMessage', nick: sendNick, message: sendMessage })
}
sendBtn.onclick = async function sendAndCheck() {
    sendMessage(inputNick.value, inputMessage.value)
    getMessages()
}
let nextMessageId = 0
async function getMessages() {
    let resMessageId;
    await jsonPost("http://students.a-level.com.ua:10012", { func: 'getMessages', messageId: nextMessageId }).then(res => {
        res.data.forEach(element => {
            var div = document.createElement("div");

            div.innerHTML = ("<br> <b> nick : " + (element.nick ? element.nick : "Anon") + "<br> </b> message : " +
                (element.message ? element.message : "Empty message") + ("<br> time : " + new Date((element.timestamp)).toLocaleString()))
            divChat.prepend(div)
        })
        resMessageId = res.nextMessageId
    });
    //console.log("nextMes перед проверкой", nextMessageIdFirst)
    if (resMessageId > nextMessageId) {
        nextMessageId = resMessageId
    }
    // console.log("nextMess после проверки", nextMessageIdFirst)

}
const delay = ms => {
    return new Promise(resolve => setTimeout(() => resolve(), ms))
}
async function checkLoop() {
    await getMessages().then(() => delay(2000)).then(checkLoop)
}

checkLoop()

// function jsonPost(url, data) {
//     return new Promise((resolve, reject) => {
//         var x = new XMLHttpRequest();
//         x.onerror = () => reject(new Error('jsonPost failed'))
//             //x.setRequestHeader('Content-Type', 'application/json');
//         x.open("POST", url, true);
//         x.send(JSON.stringify(data))

//         x.onreadystatechange = () => {
//             if (x.readyState == XMLHttpRequest.DONE && x.status == 200) {
//                 resolve(JSON.parse(x.responseText))
//             } else if (x.status != 200) {
//                 reject(new Error('status is not 200'))
//             }
//         }
//     })
// }

//Прогуглить и разобраться с fetch и заменить внутренности jsonPost на код, использующий fetch вместо XMLHttpRequest

async function jsonPost(url, data) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        })
        if (response.ok) {
            const postJson = await response.json()
            return postJson
        }

    } catch (error) {
        throw new Error('Error: ', error)
    }
}