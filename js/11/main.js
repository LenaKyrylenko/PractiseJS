
function dateToDateTimeLocal(date) {
    let dateTime = date.getTime()
    let dateTimeOffset = 60000 * date.getTimezoneOffset()
    let nowDate = dateTime - dateTimeOffset
    let newD = new Date(nowDate)
    let dateString = (newD.toISOString().slice(0, -1))

    return dateString
}
console.log(dateToDateTimeLocal(new Date()))
//форма
function Form(el, data, okCallback, cancelCallback) {
    let formBody = document.createElement('div')
    let okButton = document.createElement('button')
    okButton.innerHTML = 'OK'
    let cancelButton = document.createElement('button')
    cancelButton.innerHTML = 'Cancel'
    let inputCreators = {
        String(key, value, oninput) {

            let input = document.createElement('input')
            input.placeholder = key
            input.value = value
            input.oninput = () => {
                oninput(input.value)
                if (input.value.length == 0)
                    okButton.disabled = true
                else okButton.disabled = false
            }
            if (value[0] == '*') {
                input.type = "password"
                input.placeholder = "password"
            } else
                input.type = 'text'

            return input
        },
        Boolean(key, value, oninput) {
            let input = document.createElement('input')
            input.type = 'checkbox'
            input.placeholder = key
            input.checked = value
            input.onchange = () => {
                    oninput(input.checked)
                }
                //label for с input type='checkbox' внутри
            return input
        },
        Date(key, value, oninput) {
            let input = document.createElement('input')
            input.type = 'datetime-local'
            input.placeholder = key
            input.value = dateToDateTimeLocal(value)
            input.oninput = () => {
                oninput(new Date(input.value))
                if (input.value.length == 0)
                    okButton.disabled = true
                else okButton.disabled = false
            }
            return input
        }

    }


    el.appendChild(formBody)

    let table = document.createElement("table");
    formBody.prepend(table);
    this.validators = {}
        //create form
    function createForm(data) {
        for (let key in data) {
            let tr = document.createElement("tr");
            table.appendChild(tr);
            let th = document.createElement("th");
            let keyStar = document.createElement("label");
            tr.appendChild(keyStar);
            tr.appendChild(th);

            let label = document.createElement("label");

            if (key[0] === "*") {
                let keyStart = key[0];
                keyStar.style.color = "red";
                keyStar.innerText = `${keyStart}`;
                th.style.color = "black";
                let newKey = key.slice(1)
                th.innerHTML = `${newKey}`;
            } else {

                th.innerHTML = key;
            }
            let td = document.createElement("td");
            tr.appendChild(td);
            tr.appendChild(label)
            let result;
            let resultInput;
            let valueConstructor = data[key].constructor.name

            if ([valueConstructor] in inputCreators) {
                result = inputCreators[valueConstructor]
                    (key, data[key], (value) => {
                        data[key] = value
                    })

            }
            result.onchange = () => {
                if (this.validators.hasOwnProperty(key)) {
                    resultInput = this.validators[key](
                        result.value, key, data, result);

                    if (resultInput == "true") {
                        result.style.border = '';
                        label.innerHTML = ""
                        result.style.border = '1px solid black';
                        result.style.backgroundColor = "white"
                        okButton.disabled = false

                    } else {
                        result.style.border = '1px solid red';
                        label.innerHTML = ""
                        label.append(resultInput)
                        label.style.color = '#FA8072'
                        result.style.backgroundColor = "#FA8072"
                        okButton.disabled = true
                    }
                    if (result.value.length == 0) {
                        result.style.border = '1px solid red';
                        result.style.backgroundColor = '#FA8072';
                        okButton.disabled = true
                        label.innerHTML = `ERROR: you entered empty field '${key}'`
                        label.style.color = '#FA8072'
                    } else {
                        label.innerHTML = ''
                        result.style.border = '1px solid black';
                        result.style.backgroundColor = "white";
                        okButton.disabled = false
                    }
                }
            }
            if (result) td.appendChild(result)

        }
    }
    createForm.call(this, data)

    const my_obj = {...data }
    this.myData = Object.freeze(my_obj)
    if (typeof okCallback === 'function') {
        formBody.appendChild(okButton);
        okButton.onclick = (e) => {
            console.log(this)
            this.okCallback(e)
        }
    }

    if (typeof cancelCallback === 'function') {
        formBody.appendChild(cancelButton);
        cancelButton.onclick = (e) => {
            table.innerText = ""
            createForm.call(this, this.myData)
        }
    }
    this.okCallback = okCallback
    this.cancelCallback = cancelCallback

}


let form = new Form(formContainer, {
    "*name": 'Anakin',
    surname: 'Skywalker',
    married: true,
    password: '*****',
    birthday: new Date((new Date).getTime() - 86400000 * 30 * 365)
}, () => console.log('ok'), () => console.log('cancel'))
form.okCallback = () => console.log('ok2')

form.validators.surname = (value, key, data, input) =>
    value.length > 2 && value[0].toUpperCase() == value[0] && !value.includes(" ") ?
    true :
    "Wrong name";