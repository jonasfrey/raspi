// here 'runtimedata' is stored
// this is data that only exists at the runtime
// usually its arrays of objects representing stuff
// objects can be named and then exported
import {
    O_raspi_pin
} from "./classes.module.js"


// | P1-01:type   | P1-02:type   |
// |--------------|--------------|
// | 01:3V3 Power | 02:5V Power  |
// | 03:GPIO 2    | 04:5V Power  |
// | 05:GPIO 3    | 06:Ground    |
// | 07:GPIO 4    | 08:GPIO 14   |
// | 09:Ground    | 10:GPIO 15   |
// | 11:GPIO 17   | 12:GPIO 18   |
// | 13:3V3 Power | 14:Ground    |
// | 15:GPIO 27   | 16:GPIO 23   |
// | 17:GPIO 22   | 18:Ground    |
// | 19:GPIO 10   | 20:Ground    |
// | 21:GPIO 9    | 22:GPIO 25   |
// | 23:GPIO 11   | 24:GPIO 8    |
// | 25:Ground    | 26:GPIO 7    |

let o_raspi_pin__hans = new O_raspi_pin(
    'hans', 
    80,
);
var PINS = {
    v1: {
        // 1: 3.3v
        // 2: 5v
        '3':  0,
        // 4: 5v
        '5':  1,
        // 6: ground
        '7':  4,
        '8':  14,
        // 9: ground
        '10': 15,
        '11': 17,
        '12': 18,
        '13': 21,
        // 14: ground
        '15': 22,
        '16': 23,
        // 17: 3.3v
        '18': 24,
        '19': 10,
        // 20: ground
        '21': 9,
        '22': 25,
        '23': 11,
        '24': 8,
        // 25: ground
        '26': 7
    },
    v2: {
        // 1: 3.3v
        // 2: 5v
        '3':  2,
        // 4: 5v
        '5':  3,
        // 6: ground
        '7':  4,
        '8':  14,
        // 9: ground
        '10': 15,
        '11': 17,
        '12': 18,
        '13': 27,
        // 14: ground
        '15': 22,
        '16': 23,
        // 17: 3.3v
        '18': 24,
        '19': 10,
        // 20: ground
        '21': 9,
        '22': 25,
        '23': 11,
        '24': 8,
        // 25: ground
        '26': 7,

        // Model B+ pins
        // 27: ID_SD
        // 28: ID_SC
        '29': 5,
        // 30: ground
        '31': 6,
        '32': 12,
        '33': 13,
        // 34: ground
        '35': 19,
        '36': 16,
        '37': 26,
        '38': 20,
        // 39: ground
        '40': 21
    }
};

// also arrays of objects can be exported
let a_o_raspi_pin = [
    o_raspi_pin__hans, 
    new O_raspi_pin()// if you dont need the named object
    // 'unnamed' objects can always be accessed with a_o.find(o=>...)
]
export {
    o_raspi_pin__hans,
    a_o_raspi_pin
}