//passsword
function Password(parent, open = true) {
    let inputPass = document.createElement("input")
    let inputCheck = document.createElement("input")
    inputCheck.type = "checkbox"
    inputCheck.checked = open

    this.setValue = (newValue) => inputPass.value = newValue
    this.getValue = () => inputPass.value
    this.setOpen = (newOpen) => {
        inputCheck.checked = newOpen
        if (inputCheck.checked == false) {
            inputPass.type = "password"
            inputCheck.innerText = "false"
        } else {
            inputPass.type = "text"
            inputCheck.innerText = "true"
        }
        this.onOpenChange(inputCheck.checked)
    }
    this.getOpen = () => inputCheck.checked

    inputPass.oninput = () => this.onChange(inputPass.value)

    inputCheck.onchange = () => {
        if (inputCheck.checked == false) {
            inputPass.type = "password"
            inputCheck.innerText = "false"
        } else {
            inputPass.type = "text"
            inputCheck.innerText = "true"
        }
        this.onOpenChange(inputCheck.checked)
    }
    parent.append(inputPass)
    parent.append(inputCheck)

}

/*
setValue/getValue - задают/читают значения
setOpen/getOpen - задают/читают открытость текста в поле ввода
Колбэки (функции обратного вызова, данные изнутри объекта):
onChange - запускается по событию oninput в поле ввода, передает текст наружу
onOpenChange - запускается по изменению состояния открытости пароля*/
//let p = new Password(document.body, true)

// //p.onChange = data => console.log(data)
// p.onOpenChange = open => console.log(open)

// p.setValue('qwerty')
// console.log(p.getValue())

// p.setOpen(true)
// console.log(p.getOpen())

//LoginForm

function LoginForm(parent, open = true) {
    let inputLogin = document.createElement("input")
    let button = document.createElement("button")
    let form = document.createElement("form")
    inputLogin.type = "text"
    button.innerText = "log in"
    button.disabled = open
        //button.setAttribute("disabled", "")

    this.setValueLog = (newValue) => inputLogin.value = newValue

    this.setButton = (newOpen) => button.disabled = newOpen
    this.getButton = () => button.disabled

    this.getValueLog = () => inputLogin.value

    inputLogin.oninput = () => this.onChange(inputLogin.value)
    form.append(inputLogin, button);
    //parent.append(inputLogin)
    //parent.append(button)
    parent.append(form)
}

// let l = new LoginForm(document.body, true)
//     //l.setValueLog('qwerty')
// console.log(l.getValueLog())

// function btnState() {
//     if (p.getValue() != "" && l.getValueLog() != "") {
//         l.setButton(false)
//     } else {
//         l.setButton(true)
//     }
// }
// l.onChange = btnState
// p.onChange = btnState


function LoginFormConstructor(parent, open = true) {

    let inputLogin = document.createElement("input")
    inputLogin.type = "text"
    let inputPass = document.createElement("input")
    let button = document.createElement("button")
    button.innerText = "register"
    button.disabled = open
    let form = document.createElement("form")

    this.setValueLog = (newValue) => inputLogin.value = newValue
    this.getValueLog = () => inputLogin.value
    inputLogin.oninput = () => this.onChange(inputLogin.value)

    this.setButton = (newOpen) => button.disabled = newOpen
    this.getButton = () => button.disabled

    let inputCheck = document.createElement("input")
    inputCheck.type = "checkbox"
    state = (inputCheck.checked) ? (inputPass.type = "text" && inputCheck.checked) : (inputPass.type = "password")

    this.setValue = (newValue) => inputPass.value = newValue
    this.getValue = () => inputPass.value
    this.setOpen = (newOpen) => {
        inputCheck.checked = (newOpen == true) ? (inputPass.type = "text" && inputCheck.checked) : (inputPass.type = "password")
            // this.onOpenChange(inputCheck.checked)
    }
    this.getOpen = () => inputCheck.checked

    inputPass.oninput = () => this.onChange(inputPass.value)

    inputCheck.onchange = () => {
        (inputCheck.checked == true) ? (inputPass.type = "text" && inputCheck.checked) : (inputPass.type = "password")
        //this.onOpenChange(inputCheck.checked)
    }

    let btnState = () => (this.getValue() != "" && this.getValueLog() != "") ?
        (this.setButton(false)) :
        this.setButton(true)

    this.onChange = () => btnState()
    form.append(inputLogin, inputPass, inputCheck, button);
    parent.append(form)
}
//let finishForm = new LoginFormConstructor(document.body, true)

//Password Verify
function PasswordVerify(parent, open = true) {


    let input1 = document.createElement("input")
    let input2 = document.createElement("input")
    input2.type = "text"

    let button = document.createElement("button")
    button.innerText = "register"
    button.disabled = open
    let form = document.createElement("form")

    this.setValue2 = (newValue) => input2.value = newValue
    this.getValue2 = () => input2.value
    input2.oninput = () => this.onChange(input2.value)

    this.setButton = (newOpen) => button.disabled = newOpen
    this.getButton = () => button.disabled

    let inputCheck = document.createElement("input")
    inputCheck.type = "checkbox"
    state = (inputCheck.checked) ? (input1.type = "text" && inputCheck.checked) : (input1.type = "password")

    this.setValue1 = (newValue) => input1.value = newValue
    this.getValue1 = () => input1.value
    this.setOpen = (newOpen) => {
        inputCheck.checked = (newOpen == true) ? (input1.type = "text" && inputCheck.checked) : (input1.type = "password")
            // this.onOpenChange(inputCheck.checked)
    }
    this.getOpen = () => inputCheck.checked

    input1.oninput = () => this.onChange(input1.value)

    inputCheck.onchange = () => {
        if (inputCheck.checked == true) {
            //1 вариант
            //  parent.removeChild(input2)
            //2 
            input2.style.display = "none"
            input1.type = "text"
        } else {

            input1.type = "password"
                //1 вариант
                // parent.appendChild(input2)
                //2 вариант
            input2.style.display = ""
        }
    }
    let btnState = () => (this.getValue1() == this.getValue2()) ?
        (this.setButton(false)) :
        this.setButton(true)

    this.onChange = () => btnState()
    parent.append(input1)
    parent.append(input2)
    parent.append(inputCheck)
    parent.append(button)
}
//let pass = new PasswordVerify(document.body, true)