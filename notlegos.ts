// NotLegos Blocks

//% block="Not LEGOs" color=#0031AF weight=1000 icon="\uf6ec"
//% groups=['Display', 'Laser', 'others']
namespace notLegos {

    /*
     * Toggle a Laser (or somesuch)
     */
    //% blockId=notlegos_laser_toggle
    //% subcategory="Laser" group="Laser" color=#EA5532
    //% weight=100
    //% block="Laser %Rjpin toggle $laserState with brightness %laserBrightness"
    //% Rjpin.fieldEditor="gridpicker" 
    //% Rjpin.fieldOptions.columns=2
    //% laserBrightness.min=0 laserBrightness.max=1023
    //% laserState.shadow="toggleOnOff"
    export function laserToggle(Rjpin: DigitalRJPin, laserState: boolean, laserBrightness: number = 1023): void {
        let pin = AnalogPin.P1
        pin = RJpin_to_digital(Rjpin)
        if (laserState) {
            pins.analogWritePin(pin, laserBrightness)
        }
        else {
            pins.analogWritePin(pin, 0)
        }
    }

    /*
     * Pulse a Laser (or somesuch)
     */
    //% blockId=notlegos_laser_pulse
    //% subcategory="Laser" group="Laser" color=#EA5532
    //% weight=99
    //% block="Laser %Rjpin pulse for %pulseDuration milliseconds with brightness %laserBrightness"
    //% Rjpin.fieldEditor="gridpicker" 
    //% Rjpin.fieldOptions.columns=2
    //% laserBrightness.min=0 begBrightness.max=1023
    //% pulseDuration.min=100 pulseDuration.max=10000
    //% inlineInputMode=inline
    export function laserPulse(Rjpin: DigitalRJPin, pulseDuration: number=500, laserBrightness: number = 1023): void {
        let pin = AnalogPin.P1
        pin = RJpin_to_digital(Rjpin)
        pins.analogWritePin(pin, laserBrightness)
        basic.pause(pulseDuration-3)
        pins.analogWritePin(pin, 0)
    }
    

    /*
     * Fade a Laser (or somesuch)
     */
    //% blockId=notlegos_laser_fade
    //% subcategory="Laser" group="Laser" color=#EA5532
    //% weight=98
    //% block="Laser %Rjpin fade over %pulseDuration milliseconds from brightness %begBrightness to brightness %endBrightness"
    //% Rjpin.fieldEditor="gridpicker" 
    //% Rjpin.fieldOptions.columns=2
    //% begBrightness.min=0 begBrightness.max=1023
    //% endBrightness.min=0 endBrightness.max=1023
    //% pulseDuration.min=100 pulseDuration.max=10000
    //% expandableArgumentMode="toggle"
    //% inlineInputMode=inline
    export function laserFade(Rjpin: DigitalRJPin, pulseDuration: number = 500, begBrightness: number = 0, endBrightness: number = 1023): void {
        let pin = AnalogPin.P1
        pin = RJpin_to_digital(Rjpin)
        let analogStep = 0
        let laserLevel = 0
        let pulseHold = 10
        let stepCount = Math.floor((pulseDuration - 10) / (pulseHold + 2))
        if (begBrightness == endBrightness) {
            laserLevel = begBrightness
            pins.analogWritePin(pin, laserLevel)
            basic.pause(pulseDuration)
        } else if (begBrightness <= endBrightness) {
            analogStep = (endBrightness - begBrightness) / stepCount
            laserLevel = begBrightness
            while (laserLevel <= endBrightness) {
                pins.analogWritePin(pin, laserLevel)
                laserLevel = laserLevel + analogStep
                basic.pause(pulseHold)
            }
        } else {
            analogStep = (begBrightness - endBrightness) / stepCount
            laserLevel = begBrightness
            while (laserLevel >= endBrightness) {
                pins.analogWritePin(pin, laserLevel)
                laserLevel = laserLevel - analogStep
                basic.pause(pulseHold)
            }
        }
    }


    function RJpin_to_digital(Rjpin: DigitalRJPin): any {
        let pin = DigitalPin.P1
        switch (Rjpin) {
            case DigitalRJPin.J1:
                pin = DigitalPin.P8
                break;
            case DigitalRJPin.J2:
                pin = DigitalPin.P12
                break;
            case DigitalRJPin.J3:
                pin = DigitalPin.P14
                break;
            case DigitalRJPin.J4:
                pin = DigitalPin.P16
                break;
            case DigitalRJPin.W15:
                pin = DigitalPin.P15
                break;
            case DigitalRJPin.W1:
                pin = DigitalPin.P1
                break;
            case DigitalRJPin.O0:
                pin = DigitalPin.P0
                break;
        }
        return pin
    }


    export enum DigitalRJPin {
        //% block="J1"
        J1,
        //% block="J2"
        J2,
        //% block="J3"
        J3,
        //% block="J4"
        J4,
        //% block="W15"
        W15,
        //% block="W1"
        W1,
        //% block="O0"
        O0,
    }


}


