// here 'runtimedata' is stored
// this is data that only exists at the runtime
// usually its arrays of objects representing stuff
// objects can be named and then exported
import {
    O_pin,
    O_raspi,
} from "./classes.module.js"

const s_path_abs_folder_gpio = '/sys/class/gpio';
const s_pin_direction_in   = 'in';
const s_pin_direction_out  = 'out';
const n_pin_state_low  = 0;
const n_pin_state_high = 1;

var MODE_RPI = 'mode_rpi';
var MODE_BCM = 'mode_bcm';

var EDGE_NONE    = 'none';
var EDGE_RISING  = 'rising';
var EDGE_FALLING = 'falling';
var EDGE_BOTH    = 'both';





let o_raspi__v1 = new O_raspi(
    'v1', 
    [
        new O_pin("3v3 power", 1, null), 
        new O_pin("5v power", 2, null),
        new O_pin("GPIO 0 (SDA)", 3, 0),
        new O_pin("5v power", 4, null),
        new O_pin("GPIO 1 (SCL)", 5, 1),
        new O_pin("Ground", 6, null),
        new O_pin("GPIO 4 (GPCLK0)", 7, 4),
        new O_pin("GPIO 14 (TXD)", 8, 14),
        new O_pin("Ground", 9, null),
        new O_pin("GPIO 15 (RXD)", 10, 15),
        new O_pin("GPIO 17", 11, 17),
        new O_pin("GPIO 18 (PCM_CLK)", 12, 18),
        new O_pin("3v3 power", 13, null),
        new O_pin("Ground", 14, null),
        new O_pin("GPIO 21", 15, 21),
        new O_pin("GPIO 23", 16, 23),
        new O_pin("GPIO 22", 17, 22),
        new O_pin("Ground", 18, null),
        new O_pin("GPIO 10 (MOSI)", 19, 10),
        new O_pin("Ground", 20, null),
        new O_pin("GPIO 9 (MISO)", 21, 9),
        new O_pin("GPIO 25", 22, 25),
        new O_pin("GPIO 11 (SCLK)", 23, 11),
        new O_pin("GPIO 8 (CEO)", 24, 8),
        new O_pin("Ground", 25, null),
        new O_pin("GPIO 7 (CE1)", 26, 7)
    ]
)

let o_raspi__v2 = new O_raspi(
    'v2', 
    [
        new O_pin("3v3 power", 1, null), 
        new O_pin("5v power", 2, null),
        new O_pin("GPIO 2 (SDA)", 3, 2),
        new O_pin("5v power", 4, null),
        new O_pin("GPIO 3 (SCL)", 5, 3),
        new O_pin("Ground", 6, null),
        new O_pin("GPIO 4 (GPCLK0)", 7, 4),
        new O_pin("GPIO 14 (TXD)", 8, 14),
        new O_pin("Ground", 9, null),
        new O_pin("GPIO 15 (RXD)", 10, 15),
        new O_pin("GPIO 17", 11, 17),
        new O_pin("GPIO 18 (PCM_CLK)", 12, 18),
        new O_pin("3v3 power", 13, null),
        new O_pin("Ground", 14, null),
        new O_pin("GPIO 27", 15, 27),
        new O_pin("GPIO 23", 16, 23),
        new O_pin("GPIO 22", 17, 22),
        new O_pin("Ground", 18, null),
        new O_pin("GPIO 10 (MOSI)", 19, 10),
        new O_pin("Ground", 20, null),
        new O_pin("GPIO 9 (MISO)", 21, 9),
        new O_pin("GPIO 25", 22, 25),
        new O_pin("GPIO 11 (SCLK)", 23, 11),
        new O_pin("GPIO 8 (CEO)", 24, 8),
        new O_pin("Ground", 25, null),
        new O_pin("GPIO 7 (CE1)", 26, 7)
    ]
)

export {
    o_raspi__v1,
    o_raspi__v2, 
    s_path_abs_folder_gpio,
    s_pin_direction_in,
    s_pin_direction_out,
    n_pin_state_low,
    n_pin_state_high
}