function Control(el, {
    value = 0,
    min = 0,
    max = 100,
    minAngle = 0,
    maxAngle = 360,
    wheelSpeed = 0.05,
    step = 1
} = {}) {

    const img = document.createElement('img')
    img.src = '1@3x.png'
    el.append(img)

    const ratio = (maxAngle - minAngle) / (max - min)
    const getAngle = () => (value - min) * ratio + minAngle

    this.setValue = newValue => {
        if (newValue > max)
            newValue = max
        if (newValue < min)
            newValue = min

        if (typeof this.onchange === 'function' && newValue !== value)
            this.onchange(newValue)

        value = newValue

        img.style.transform = `rotate(${getAngle()}deg)`
    }

    img.onmousewheel = (event) => {
        const { deltaY } = event
        //console.log(deltaY)
        this.setValue(value + deltaY * wheelSpeed)
        event.preventDefault()
    }

    img.onclick = (event) => {
        const { layerX } = event
        if (layerX < img.width / 2)
            this.setValue(value - step)
        else
            this.setValue(value + step)
        event.preventDefault()
    }

    const event2Deg = event => {
        const { layerX, layerY } = event
        const { width, height } = img
        const x = layerX - width / 2
        const y = height / 2 - layerY

        //console.log(x, y, width, height)

        return ((Math.atan2(y, x) / (2 * Math.PI)) * 360 + 360) % 360
    }

    let prevAngle = null

    img.onmousedown = (event) => {
        prevAngle = event2Deg(event)
    }

    img.onmousemove = (event) => {
        if (prevAngle === null) return

        const currentAngle = event2Deg(event)
        const deltaValue = (prevAngle - currentAngle) / ratio
            //console.log(prevAngle - currentAngle, deltaValue)
        this.setValue(value + deltaValue)
        prevAngle = currentAngle
        event.preventDefault()
    }
    img.onmouseup = (event) => {
        prevAngle = null
    }

    this.setValue(value)
    this.getValue = () => value
}

const volumeControl = new Control(container1, {
    value: 75,
    min: 0,
    max: 100,
    minAngle: -90,
    maxAngle: 90
})
volumeControl.onchange = value => console.log('ON CHANGE', value) //на каждый setValue
console.log(volumeControl.getValue())

// тэг audio для громкости

const music = document.querySelector(".music");
const Musvolume = new Control(containerMusic, { min: 0, max: 100 });
Musvolume.onchange = (value) => { music.volume = value / 100 };


const red = new Control(container1, { min: 0, max: 255 })
const green = new Control(container1, { min: 0, max: 255 })
const blue = new Control(container1, { min: 0, max: 255 })

function setRGB() {

    document.body.style.backgroundColor = `rgb(${red.getValue()},${green.getValue()},${blue.getValue()})`
}

red.onchange = setRGB
green.onchange = setRGB
blue.onchange = setRGB