function tryFinalRow (startPosition: string, minePosition: string) {
    finalRowCountdown = 5
    thisPosition = startPosition
    beginCountdown = input.runningTime()
    endCountdown = beginCountdown + finalRowCountdown * 1000
    while (input.runningTime() < endCountdown) {
        digitDisplay2.showNumber(Math.round((endCountdown - input.runningTime()) / 1000 * 2))
        basic.pause(20)
        laserR = pins.analogReadPin(AnalogPin.P0)
        laserC = pins.analogReadPin(AnalogPin.P1)
        laserL = pins.analogReadPin(AnalogPin.P2)
        if (laserC < 100) {
            if (thisPosition == "H") {
                thisPosition = "I"
                lightSpace("I", "Step")
                lightSpace("H", "Indicate")
            } else {
                thisPosition = "H"
                lightSpace("H", "Step")
                lightSpace("I", "Indicate")
            }
            basic.pause(300)
        }
    }
    winner = false
    if (thisPosition == minePosition) {
        if (thisPosition == "H") {
            lightSpace("I", "Off")
            lightSpace("H", "Mine")
        } else {
            lightSpace("H", "Off")
            lightSpace("I", "Mine")
        }
    } else {
        winner = true
        if (thisPosition == "H") {
            lightSpace("I", "Off")
            lightSpace("H", "Winner")
        } else {
            lightSpace("H", "Off")
            lightSpace("I", "Winner")
        }
    }
    return winner
}
Connected.buttonEvent(Connected.DigitalRJPin.P3, Connected.ButtonStateList.D, function () {
    startGame()
})
function startGame () {
    let minefield = 0
    Connected.oledClear()
    gameOver = false
    minefields = generateMinefields()
    fieldScores = [
    4,
    0,
    0,
    0,
    0,
    0,
    0,
    0
    ]
    for (let minefield2 = 0; minefield2 <= 7; minefield2++) {
        showScoreCircle(fieldScores, minefield2)
        Connected.showUserText(1, minefields[minefield2])
        if (!(gameOver)) {
            fieldScores[minefield2] = runField(minefields[minefield2])
        }
        if (fieldScores[minefield2] == 0) {
            gameOver = true
            Connected.oledClear()
            Connected.showUserText(1, "GAME OVER")
        }
    }
    showScoreCircle(fieldScores, minefield)
    if (!(gameOver)) {
        Connected.oledClear()
        Connected.showUserText(1, "WINNER!")
    }
}
function tryField (theMines: string) {
    passed = true
    reachedFinalRow = false
    lightSpace("A", "Step")
    lightSpace("B", "Indicate")
    lightSpace("C", "Indicate")
    lightSpace("D", "Off")
    lightSpace("E", "Off")
    lightSpace("F", "Off")
    lightSpace("G", "Off")
    lightSpace("H", "Off")
    lightSpace("I", "Off")
    pins.digitalWritePin(DigitalPin.P5, 1)
    pins.digitalWritePin(DigitalPin.P6, 1)
    pins.digitalWritePin(DigitalPin.P7, 1)
    awaitingStep = true
    basic.pause(300)
    while (awaitingStep) {
        basic.pause(20)
        laserR = pins.analogReadPin(AnalogPin.P0)
        laserC = pins.analogReadPin(AnalogPin.P1)
        laserL = pins.analogReadPin(AnalogPin.P2)
        if (laserR < 100) {
            firstStep = "C"
            Connected.showUserText(3, "1 C")
            lightSpace("A", "Off")
            lightSpace("B", "Off")
            lightSpace("C", "Step")
            lightSpace("E", "Indicate")
            awaitingStep = false
        } else if (laserL > 100) {
            firstStep = "B"
            Connected.showUserText(3, "1 B")
            lightSpace("A", "Off")
            lightSpace("C", "Off")
            lightSpace("B", "Step")
            lightSpace("D", "Indicate")
            awaitingStep = false
        }
    }
    Connected.showUserNumber(8, theMines.indexOf(firstStep))
    if (theMines.indexOf(firstStep) >= 0) {
        passed = false
        lightSpace(firstStep, "Mine")
        Connected.oledClear()
    } else {
        awaitingStep = true
        basic.pause(300)
        if (firstStep == "B") {
            while (awaitingStep) {
                basic.pause(20)
                laserR = pins.analogReadPin(AnalogPin.P0)
                laserC = pins.analogReadPin(AnalogPin.P1)
                laserL = pins.analogReadPin(AnalogPin.P2)
                if (laserR < 100) {
                    Connected.showUserText(4, "2 D")
                    secondStep = "D"
                    lightSpace("B", "Off")
                    lightSpace("D", "Step")
                    lightSpace("E", "Indicate")
                    lightSpace("F", "Indicate")
                    awaitingStep = false
                }
            }
        } else if (firstStep == "C") {
            while (awaitingStep) {
                basic.pause(30)
                laserR = pins.analogReadPin(AnalogPin.P0)
                laserC = pins.analogReadPin(AnalogPin.P1)
                laserL = pins.analogReadPin(AnalogPin.P2)
                if (laserL > 100) {
                    Connected.showUserText(4, "2 E")
                    secondStep = "E"
                    lightSpace("C", "Off")
                    lightSpace("E", "Step")
                    lightSpace("D", "Indicate")
                    lightSpace("G", "Indicate")
                    awaitingStep = false
                }
            }
        }
        if (theMines.indexOf(secondStep) >= 0) {
            passed = false
            lightSpace(secondStep, "Mine")
        } else {
            awaitingStep = true
            basic.pause(300)
            if (secondStep == "D") {
                while (awaitingStep) {
                    basic.pause(20)
                    laserR = pins.analogReadPin(AnalogPin.P0)
                    laserC = pins.analogReadPin(AnalogPin.P1)
                    laserL = pins.analogReadPin(AnalogPin.P2)
                    if (laserR < 100) {
                        Connected.showUserText(5, "3 F")
                        thirdStep = "F"
                        lightSpace("D", "Off")
                        lightSpace("E", "Off")
                        lightSpace("F", "Step")
                        lightSpace("H", "Indicate")
                        awaitingStep = false
                    } else if (laserC < 100) {
                        Connected.showUserText(5, "3 E")
                        thirdStep = "E"
                        lightSpace("D", "Off")
                        lightSpace("F", "Off")
                        lightSpace("E", "Step")
                        lightSpace("G", "Indicate")
                        awaitingStep = false
                    }
                }
            } else if (secondStep == "E") {
                while (awaitingStep) {
                    basic.pause(20)
                    laserR = pins.analogReadPin(AnalogPin.P0)
                    laserC = pins.analogReadPin(AnalogPin.P1)
                    laserL = pins.analogReadPin(AnalogPin.P2)
                    if (laserC < 100) {
                        Connected.showUserText(5, "3 D")
                        thirdStep = "D"
                        lightSpace("E", "Off")
                        lightSpace("G", "Off")
                        lightSpace("D", "Step")
                        lightSpace("F", "Indicate")
                        awaitingStep = false
                    } else if (laserL > 100) {
                        Connected.showUserText(5, "3 G")
                        thirdStep = "G"
                        lightSpace("D", "Off")
                        lightSpace("E", "Off")
                        lightSpace("G", "Step")
                        lightSpace("I", "Indicate")
                        awaitingStep = false
                    }
                }
            }
            if (theMines.indexOf(thirdStep) >= 0) {
                passed = false
                lightSpace(thirdStep, "Mine")
            } else {
                awaitingStep = true
                basic.pause(300)
                if (thirdStep == "F") {
                    while (awaitingStep) {
                        basic.pause(20)
                        laserR = pins.analogReadPin(AnalogPin.P0)
                        laserC = pins.analogReadPin(AnalogPin.P1)
                        laserL = pins.analogReadPin(AnalogPin.P2)
                        if (laserL > 100) {
                            Connected.showUserText(6, "4 H")
                            fourthStep = "H"
                            lightSpace("D", "Off")
                            lightSpace("F", "Off")
                            lightSpace("H", "Step")
                            lightSpace("I", "Indicate")
                            awaitingStep = false
                            reachedFinalRow = true
                        }
                    }
                } else if (thirdStep == "E") {
                    while (awaitingStep) {
                        basic.pause(20)
                        laserR = pins.analogReadPin(AnalogPin.P0)
                        laserC = pins.analogReadPin(AnalogPin.P1)
                        laserL = pins.analogReadPin(AnalogPin.P2)
                        if (laserL > 100) {
                            Connected.showUserText(6, "4 G")
                            fourthStep = "G"
                            lightSpace("E", "Off")
                            lightSpace("F", "Off")
                            lightSpace("G", "Step")
                            lightSpace("I", "Indicate")
                            awaitingStep = false
                        }
                    }
                } else if (thirdStep == "D") {
                    while (awaitingStep) {
                        basic.pause(20)
                        laserR = pins.analogReadPin(AnalogPin.P0)
                        laserC = pins.analogReadPin(AnalogPin.P1)
                        laserL = pins.analogReadPin(AnalogPin.P2)
                        if (laserR < 100) {
                            Connected.showUserText(6, "4 F")
                            fourthStep = "F"
                            lightSpace("D", "Off")
                            lightSpace("F", "Step")
                            lightSpace("H", "Indicate")
                            awaitingStep = false
                        }
                    }
                } else if (thirdStep == "G") {
                    while (awaitingStep) {
                        basic.pause(20)
                        laserR = pins.analogReadPin(AnalogPin.P0)
                        laserC = pins.analogReadPin(AnalogPin.P1)
                        laserL = pins.analogReadPin(AnalogPin.P2)
                        if (laserR < 100) {
                            Connected.showUserText(6, "4 I")
                            fourthStep = "I"
                            lightSpace("G", "Off")
                            lightSpace("I", "Step")
                            lightSpace("H", "Indicate")
                            awaitingStep = false
                            reachedFinalRow = true
                        }
                    }
                }
                if (!(reachedFinalRow)) {
                    if (theMines.indexOf(fourthStep) >= 0) {
                        passed = false
                        lightSpace(fourthStep, "Mine")
                    } else {
                        awaitingStep = true
                        basic.pause(300)
                        if (fourthStep == "G") {
                            while (awaitingStep) {
                                basic.pause(20)
                                laserR = pins.analogReadPin(AnalogPin.P0)
                                laserC = pins.analogReadPin(AnalogPin.P1)
                                laserL = pins.analogReadPin(AnalogPin.P2)
                                if (laserR < 100) {
                                    Connected.showUserText(7, "5 I")
                                    fifthStep = "I"
                                    lightSpace("G", "Off")
                                    lightSpace("I", "Step")
                                    lightSpace("H", "Indicate")
                                    awaitingStep = false
                                    reachedFinalRow = true
                                }
                            }
                        } else if (fourthStep == "F") {
                            while (awaitingStep) {
                                basic.pause(20)
                                laserR = pins.analogReadPin(AnalogPin.P0)
                                laserC = pins.analogReadPin(AnalogPin.P1)
                                laserL = pins.analogReadPin(AnalogPin.P2)
                                if (laserL > 100) {
                                    Connected.showUserText(7, "5 H")
                                    fifthStep = "H"
                                    lightSpace("F", "Off")
                                    lightSpace("H", "Step")
                                    lightSpace("I", "Indicate")
                                    awaitingStep = false
                                    reachedFinalRow = true
                                }
                            }
                        }
                    }
                } else {
                	
                }
            }
        }
    }
    if (reachedFinalRow) {
        if (fourthStep == "H" || fifthStep == "H") {
            passed = tryFinalRow("H", theMines.charAt(2))
        } else {
            passed = tryFinalRow("I", "abc")
        }
    }
    return passed
}
function testTargets () {
    while (true) {
        pins.digitalWritePin(DigitalPin.P5, 1)
        Connected.showUserText(1, "Right: " + convertToText(pins.analogReadPin(AnalogPin.P0)))
        Connected.showUserText(2, "Right: " + convertToText(pins.analogReadPin(AnalogPin.P0) < 100))
        pins.digitalWritePin(DigitalPin.P6, 1)
        Connected.showUserText(3, "Center: " + convertToText(pins.analogReadPin(AnalogPin.P1)))
        Connected.showUserText(4, "Center: " + convertToText(pins.analogReadPin(AnalogPin.P1) < 100))
        pins.digitalWritePin(DigitalPin.P7, 1)
        Connected.showUserText(5, "Left: " + convertToText(pins.analogReadPin(AnalogPin.P2)))
        Connected.showUserText(6, "Left: " + convertToText(pins.analogReadPin(AnalogPin.P2) > 100))
        Connected.showUserText(7, "Btn C:" + convertToText(pins.analogReadPin(AnalogPin.P3)))
        Connected.showUserText(8, "Btn D:" + convertToText(pins.analogReadPin(AnalogPin.P4)))
    }
}
function generateMinefields () {
    masterAvoidList = [
    "CEH",
    "CEI",
    "CFH",
    "CFI",
    "BDH",
    "BDI",
    "BGH",
    "BGI"
    ]
    returnList = []
    for (let index = 0; index < 8; index++) {
        thisMinefield = masterAvoidList._pickRandom()
        returnList.push(thisMinefield)
        masterAvoidList.removeAt(masterAvoidList.indexOf(thisMinefield))
    }
    for (let index = 0; index < 0; index++) {
        for (let scoreIndex = 0; scoreIndex <= 7; scoreIndex++) {
            Connected.showUserText(scoreIndex + 1, returnList[scoreIndex + 0])
        }
    }
    return returnList
}
function lightSpace (Space: string, Effect: string) {
    sendString = "" + btToken + Space
    if (Effect == "Step") {
        sendValue = 2
    } else if (Effect == "Indicate") {
        sendValue = 1
    } else if (Effect == "Off") {
        sendValue = 0
    } else if (Effect == "Door") {
        sendValue = 3
    } else if (Effect == "RedChop") {
        sendValue = 4
    } else if (Effect == "Shark") {
        sendValue = 5
    } else if (Effect == "Cannon") {
        sendValue = 6
    } else if (Effect == "GrayChop") {
        sendValue = 7
    } else if (Effect == "Dragon") {
        sendValue = 8
    } else if (Effect == "Wheel") {
        sendValue = 9
    } else if (Effect == "Sock") {
        sendValue = 10
    } else if (Effect == "Mine") {
        sendValue = 20
    } else if (Effect == "Winner") {
        sendValue = 30
    } else if (Effect == "") {
        sendValue = 0
    } else if (Effect == "") {
        sendValue = 0
    } else if (Effect == "") {
        sendValue = 0
    } else if (Effect == "") {
        sendValue = 0
    } else if (Effect == "") {
        sendValue = 0
    } else if (Effect == "") {
        sendValue = 0
    }
    radio.sendValue(sendString, sendValue)
    basic.pause(30)
}
radio.onReceivedValue(function (name, value) {
    Connected.showUserText(1, name)
    Connected.showUserNumber(2, value)
    if (name.substr(0, btToken.length) == btToken) {
        instruction = name.substr(btToken.length, name.length - btToken.length)
        if (instruction == "Intro") {
            Connected.showUserText(3, name)
            Connected.showUserNumber(4, value)
        }
    }
})
function runField (theMines: string) {
    passed4 = false
    tries = 4
    while (!(passed4) && tries > 0) {
        digitDisplay2.showNumber(tries)
        passed4 = tryField(theMines)
        if (!(passed4)) {
            tries = tries - 1
        }
        basic.pause(500)
    }
    digitDisplay2.showNumber(tries)
    return tries
}
Connected.buttonEvent(Connected.DigitalRJPin.P3, Connected.ButtonStateList.C, function () {
    radio.sendValue("" + btToken + "Intro", 100)
})
function showScoreCircle (fieldScores: number[], theMinefield: number) {
    shineHigh = 70
    shineLow = 5
    scoreColors = []
    for (let scoreIndex2 = 0; scoreIndex2 <= 7; scoreIndex2++) {
        if (fieldScores[scoreIndex2] == 0) {
            scoreColors.push(Connected.colors(Connected.NeoPixelColors.Black))
        } else if (fieldScores[scoreIndex2] == 1) {
            scoreColors.push(Connected.colors(Connected.NeoPixelColors.Red))
        } else if (fieldScores[scoreIndex2] == 2) {
            // dark orange
            scoreColors.push(Connected.rgb(255, 80, 0))
        } else if (fieldScores[scoreIndex2] == 3) {
            // dark yellow
            scoreColors.push(Connected.rgb(139, 128, 0))
        } else if (fieldScores[scoreIndex2] == 4) {
            scoreColors.push(Connected.colors(Connected.NeoPixelColors.Green))
        }
    }
    if (theMinefield == 0) {
        circleLight1.setBrightness(shineHigh)
    } else {
        circleLight1.setBrightness(shineLow)
    }
    if (theMinefield == 1) {
        circleLight2.setBrightness(shineHigh)
    } else {
        circleLight2.setBrightness(shineLow)
    }
    if (theMinefield == 2) {
        circleLight3.setBrightness(shineHigh)
    } else {
        circleLight3.setBrightness(shineLow)
    }
    if (theMinefield == 3) {
        circleLight4.setBrightness(shineHigh)
    } else {
        circleLight4.setBrightness(shineLow)
    }
    if (theMinefield == 4) {
        circleLight5.setBrightness(shineHigh)
    } else {
        circleLight5.setBrightness(shineLow)
    }
    if (theMinefield == 5) {
        circleLight6.setBrightness(shineHigh)
    } else {
        circleLight6.setBrightness(shineLow)
    }
    if (theMinefield == 6) {
        circleLight7.setBrightness(shineHigh)
    } else {
        circleLight7.setBrightness(shineLow)
    }
    if (theMinefield == 7) {
        circleLight8.setBrightness(shineHigh)
    } else {
        circleLight8.setBrightness(shineLow)
    }
    circleLight1.showColor(scoreColors[0])
    circleLight2.showColor(scoreColors[1])
    circleLight3.showColor(scoreColors[2])
    circleLight4.showColor(scoreColors[3])
    circleLight5.showColor(scoreColors[4])
    circleLight6.showColor(scoreColors[5])
    circleLight7.showColor(scoreColors[6])
    circleLight8.showColor(scoreColors[7])
}
let scoreColors: number[] = []
let shineLow = 0
let shineHigh = 0
let tries = 0
let passed4 = false
let instruction = ""
let sendValue = 0
let sendString = ""
let thisMinefield = ""
let returnList: string[] = []
let masterAvoidList: string[] = []
let fifthStep = ""
let fourthStep = ""
let thirdStep = ""
let secondStep = ""
let firstStep = ""
let awaitingStep = false
let reachedFinalRow = false
let passed = false
let fieldScores: number[] = []
let minefields: string[] = []
let gameOver = false
let winner = false
let laserL = 0
let laserC = 0
let laserR = 0
let endCountdown = 0
let beginCountdown = 0
let thisPosition = ""
let finalRowCountdown = 0
let digitDisplay2: TM1637.TM1637LEDs = null
let circleLight4: Connected.Strip = null
let circleLight3: Connected.Strip = null
let circleLight2: Connected.Strip = null
let circleLight1: Connected.Strip = null
let circleLight8: Connected.Strip = null
let circleLight7: Connected.Strip = null
let circleLight6: Connected.Strip = null
let circleLight5: Connected.Strip = null
let btToken = ""
let fieldIndex2 = 0
let btGroup = 171
btToken = "KC$"
led.enable(false)
pins.setAudioPinEnabled(false)
radio.setGroup(btGroup)
OLED.init(128, 64)
Connected.oledClear()
let scoreLightCircle = Connected.create(Connected.DigitalRJPin.P13, 8, Connected.NeoPixelMode.RGB)
circleLight5 = scoreLightCircle.range(0, 1)
circleLight6 = scoreLightCircle.range(1, 1)
circleLight7 = scoreLightCircle.range(2, 1)
circleLight8 = scoreLightCircle.range(3, 1)
circleLight1 = scoreLightCircle.range(4, 1)
circleLight2 = scoreLightCircle.range(5, 1)
circleLight3 = scoreLightCircle.range(6, 1)
circleLight4 = scoreLightCircle.range(7, 1)
circleLight1.showColor(Connected.colors(Connected.NeoPixelColors.Black))
circleLight2.showColor(Connected.colors(Connected.NeoPixelColors.Black))
circleLight3.showColor(Connected.colors(Connected.NeoPixelColors.Black))
circleLight4.showColor(Connected.colors(Connected.NeoPixelColors.Black))
circleLight5.showColor(Connected.colors(Connected.NeoPixelColors.Black))
circleLight6.showColor(Connected.colors(Connected.NeoPixelColors.Black))
circleLight7.showColor(Connected.colors(Connected.NeoPixelColors.Black))
circleLight8.showColor(Connected.colors(Connected.NeoPixelColors.Black))
digitDisplay2 = TM1637.create(
DigitalPin.P12,
DigitalPin.P11,
7,
4
)
digitDisplay2.intensity(7)
digitDisplay2.showNumber(btGroup)
radio.sendValue("" + btToken + "Intro", 0)
Connected.showUserText(2, "KYLE'S CASTLE")
Connected.showUserText(4, "press a button:")
Connected.showUserText(6, "[C] Introduction")
Connected.showUserText(8, "[D] Start")
