
> Open this page at [https://notlegos.github.io/bot/](https://notlegos.github.io/bot/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/notlegos/bot** and import

## Edit this project

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/notlegos/bot** and click import

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>


In Folder 02 of the MP3Bit:
<br>cannon.mp3
<br>die.mp3
<br>hurry.mp3
<br>mario.mp3
<br>over.mp3
<br>star.mp3
<br>thwomp.mp3
<br>victory.mp3
<br>win.mp3


// BOT CODE BELOW
let hits = 0
let lastHitWasRed = false
let isRed = false
basic.showIcon(IconNames.Heart)
let strip = Connected.create(Connected.DigitalRJPin.J1, 8, Connected.NeoPixelMode.RGB)
strip.showColor(Connected.colors(Connected.NeoPixelColors.Blue))
let hitsRequired = 2
Connected.MP3SetPort(Connected.DigitalRJPin.J2)
Connected.setVolume(15)
Connected.folderPlay("01", "007")
Connected.showUserText(8, "goodbye daisy")
basic.pause(2000)
basic.showIcon(IconNames.Happy)
strip.showColor(Connected.colors(Connected.NeoPixelColors.Black))
Connected.execute(Connected.playType.Stop)
basic.forever(function () {
    isRed = Connected.checkColor(Connected.ColorList.red)
    Connected.showUserText(8, convertToText(isRed))
    if (isRed) {
        if (hits == hitsRequired) {
            Connected.setVolume(20)
            Connected.folderPlay("01", "004")
            basic.showIcon(IconNames.Sad)
            strip.showColor(Connected.colors(Connected.NeoPixelColors.Red))
        }
        if (!(lastHitWasRed)) {
            Connected.setVolume(25)
            Connected.folderPlay("01", "001")
            basic.showIcon(IconNames.Angry)
        }
        hits = hits + 1
        Connected.showUserNumber(2, hits)
    } else if (lastHitWasRed) {
        basic.showIcon(IconNames.Happy)
        hits = 0
        strip.showColor(Connected.colors(Connected.NeoPixelColors.Black))
    }
    lastHitWasRed = isRed
})


// 5-Button Octopus Sensor:

if (pins.analogReadPin(AnalogPin.P1) > 0 && pins.analogReadPin(AnalogPin.P1) < 20) {
    basic.showIcon(IconNames.Heart)
    basic.pause(1000)
} else if (pins.analogReadPin(AnalogPin.P1) > 30 && pins.analogReadPin(AnalogPin.P1) < 70) {
    basic.showIcon(IconNames.SmallHeart)
    basic.pause(1000)
} else if (pins.analogReadPin(AnalogPin.P1) > 70 && pins.analogReadPin(AnalogPin.P1) < 110) {
    basic.showIcon(IconNames.Yes)
    basic.pause(1000)
} else if (pins.analogReadPin(AnalogPin.P1) > 110 && pins.analogReadPin(AnalogPin.P1) < 150) {
    basic.showIcon(IconNames.No)
    basic.pause(1000)
} else if (pins.analogReadPin(AnalogPin.P1) > 150 && pins.analogReadPin(AnalogPin.P1) < 600) {
    basic.showIcon(IconNames.Square)
    basic.pause(1000)
}

//LASER GUN
pins.onPulsed(DigitalPin.P2, PulseValue.High, function () {
    music.setVolume(80)
    for (let index = 0; index < 3; index++) {
        pins.digitalWritePin(DigitalPin.P13, 1)
        music.play(music.tonePlayable(988, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
        basic.pause(200)
        pins.digitalWritePin(DigitalPin.P13, 0)
        basic.pause(800)
    }
    for (let index = 0; index < 1; index++) {
        music.setVolume(100)
        music.play(music.tonePlayable(494, music.beat(BeatFraction.Double)), music.PlaybackMode.InBackground)
        pins.digitalWritePin(DigitalPin.P13, 1)
        basic.pause(2000)
        pins.digitalWritePin(DigitalPin.P13, 0)
    }
})
basic.showIcon(IconNames.SmallHeart)
OLED.init(128, 64)
OLED.writeStringNewLine("goodbye, daisy.")
let strip2 = Connected.create(Connected.DigitalRJPin.W15, 8, Connected.NeoPixelMode.RGB)
strip2.setBrightness(2)
strip2.showColor(Connected.colors(Connected.NeoPixelColors.Red))
Kong.setLightMode(Kong.LightMode.OFF)
Kong.lightIntensity(0)
basic.forever(function () {
    if (Connected.PIR(Connected.DigitalRJPin.W1)) {
        pins.digitalWritePin(DigitalPin.P14, 1)
        pins.digitalWritePin(DigitalPin.P12, 1)
        basic.pause(100)
        pins.digitalWritePin(DigitalPin.P14, 0)
        pins.digitalWritePin(DigitalPin.P12, 0)
    }
    basic.pause(100)
})

//DIM LASER
let time1 = 0
let analogStep = 0
let laserLevel = 0
basic.showIcon(IconNames.Heart)
let endBrightness = 0
let startBrightness = 1023
let pulseHold = 10
let fadeDuration = 5000
let stepCount = Math.floor((fadeDuration - 10) / (pulseHold + 2))
Connected.showUserNumber(1, stepCount)
if (startBrightness == endBrightness) {
    laserLevel = startBrightness
    pins.analogWritePin(AnalogPin.P16, laserLevel)
    basic.pause(fadeDuration)
} else if (startBrightness <= endBrightness) {
    analogStep = (endBrightness - startBrightness) / stepCount
    laserLevel = startBrightness
    time1 = input.runningTime()
    while (laserLevel <= endBrightness) {
        pins.analogWritePin(AnalogPin.P16, laserLevel)
        laserLevel = laserLevel + analogStep
        basic.pause(pulseHold)
    }
} else {
    analogStep = (startBrightness - endBrightness) / stepCount
    laserLevel = startBrightness
    time1 = input.runningTime()
    while (laserLevel >= endBrightness) {
        pins.analogWritePin(AnalogPin.P16, laserLevel)
        laserLevel = laserLevel - analogStep
        basic.pause(pulseHold)
    }
}
pins.analogWritePin(AnalogPin.P16, 0)
let time2 = input.runningTime()
Connected.showUserNumber(2, time2 - time1)


//LASER DEMO
notLegos.laserToggle(notLegos.DigitalRJPin.J1, true, 1023)
basic.pause(1000)
notLegos.laserPulse(notLegos.DigitalRJPin.J1, 1000, 500)
basic.pause(1000)
notLegos.laserFade(notLegos.DigitalRJPin.J1, 2000, 0, 1023)


// LASER GUN v2
pins.onPulsed(DigitalPin.P2, PulseValue.High, function () {
    music.setVolume(80)
    for (let index = 0; index < 3; index++) {
        if (isStill) {
            pins.digitalWritePin(DigitalPin.P13, 1)
            music.play(music.tonePlayable(988, music.beat(BeatFraction.Sixteenth)), music.PlaybackMode.UntilDone)
            basic.pause(200)
            pins.digitalWritePin(DigitalPin.P13, 0)
            basic.pause(800)
        }
    }
    for (let index = 0; index < 1; index++) {
        if (isStill) {
            music.setVolume(100)
            music.play(music.tonePlayable(494, music.beat(BeatFraction.Double)), music.PlaybackMode.InBackground)
            pins.digitalWritePin(DigitalPin.P13, 1)
            basic.pause(2000)
            pins.digitalWritePin(DigitalPin.P13, 0)
        } else {
            music.play(music.tonePlayable(131, music.beat(BeatFraction.Breve)), music.PlaybackMode.UntilDone)
        }
    }
})
let isStill = false
basic.showIcon(IconNames.SmallHeart)
isStill = true
let strip2 = Connected.create(Connected.DigitalRJPin.W15, 8, Connected.NeoPixelMode.RGB)
strip2.setBrightness(2)
strip2.showColor(Connected.colors(Connected.NeoPixelColors.Green))
Kong.setLightMode(Kong.LightMode.OFF)
Kong.lightIntensity(0)
loops.everyInterval(500, function () {
    pins.digitalWritePin(DigitalPin.P14, 1)
    basic.pause(100)
    pins.digitalWritePin(DigitalPin.P14, 0)
    basic.pause(100)
})
basic.forever(function () {
    if (Connected.PIR(Connected.DigitalRJPin.W1)) {
        isStill = false
        strip2.setBrightness(5)
        strip2.showColor(Connected.colors(Connected.NeoPixelColors.Red))
    } else {
        isStill = true
        strip2.setBrightness(2)
        strip2.showColor(Connected.colors(Connected.NeoPixelColors.White))
    }
    basic.pause(100)
})


//

Remote Control
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P15, joystickbit.ButtonType.down, function () {
    basic.showIcon(IconNames.Heart)
    radio.sendValue("message", input.runningTime())
    basic.pause(100)
    basic.clearScreen()
})
joystickbit.onButtonEvent(joystickbit.JoystickBitPin.P12, joystickbit.ButtonType.down, function () {
    joystickbit.Vibration_Motor(100)
})
let isUp = false
let isLeft = false
let magnitude = 0
let isLeftRight = false
let inDeadzone = false
let theY = 0
let theX = 0
radio.setGroup(80)
joystickbit.initJoystickBit()
let deadzone = 20
basic.forever(function () {
    theX = joystickbit.getRockerValue(joystickbit.rockerType.X)
    theY = joystickbit.getRockerValue(joystickbit.rockerType.Y)
    inDeadzone = Math.abs(512 - theX) < deadzone && Math.abs(512 - theY) < deadzone
    if (inDeadzone) {
        basic.pause(2)
    } else {
        isLeftRight = Math.abs(512 - theX) > Math.abs(512 - theY)
        if (isLeftRight) {
            while (!(inDeadzone)) {
                theX = joystickbit.getRockerValue(joystickbit.rockerType.X)
                inDeadzone = Math.abs(512 - theX) < deadzone
                magnitude = Math.round(Math.map(Math.abs(512 - theX), 0, 512, 0, 100))
                isLeft = theX > 512
                if (isLeft) {
                    radio.sendValue("joyLeft", magnitude)
                } else {
                    radio.sendValue("joyRight", magnitude)
                }
            }
            radio.sendString("joyDead")
        } else if (!(isLeftRight)) {
            while (!(inDeadzone)) {
                theY = joystickbit.getRockerValue(joystickbit.rockerType.Y)
                inDeadzone = Math.abs(512 - theY) < deadzone
                magnitude = Math.round(Math.map(Math.abs(512 - theY), 0, 512, 0, 100))
                isUp = theY > 512
                if (isUp) {
                    radio.sendValue("joyUp", magnitude)
                } else {
                    radio.sendValue("joyDown", magnitude)
                }
            }
            radio.sendString("joyDead")
        }
    }
    basic.pause(1000)
})



> Open this page at [https://notlegos.github.io/bot2/](https://notlegos.github.io/bot2/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/notlegos/bot2** and import

## Edit this project

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/notlegos/bot2** and click import

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>



> Open this page at [https://notlegos.github.io/bluebot/](https://notlegos.github.io/bluebot/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/notlegos/bluebot** and import

## Edit this project

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/notlegos/bluebot** and click import

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>



> Open this page at [https://notlegos.github.io/diode/](https://notlegos.github.io/diode/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/notlegos/diode** and import

## Edit this project

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/notlegos/diode** and click import

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>



> Open this page at [https://notlegos.github.io/castle/](https://notlegos.github.io/castle/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/notlegos/castle** and import

## Edit this project

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/notlegos/castle** and click import

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>



> Open this page at [https://notlegos.github.io/castlesay/](https://notlegos.github.io/castlesay/)

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/notlegos/castlesay** and import

## Edit this project

To edit this repository in MakeCode.

* open [https://makecode.microbit.org/](https://makecode.microbit.org/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/notlegos/castlesay** and click import

#### Metadata (used for search, rendering)

* for PXT/microbit
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
