// here 'runtimedata' is stored
// this is data that only exists at the runtime
// usually its arrays of objects representing stuff
// objects can be named and then exported
import {
    O_pin,
    O_raspi,
} from "./classes.module.js"

const s_path_abs_folder_gpio = '/sys/class/gpio';
let o_text_encoder = new TextEncoder();
let o_text_decoder = new TextDecoder();
const s_pin_direction_in   = ('in');
const s_pin_direction_out  = ('out');
const s_pin_state_low  = ('0');
const s_pin_state_high = ('1');
const a_n_u8_pin_direction_in   = o_text_encoder.encode(s_pin_direction_in);
const a_n_u8_pin_direction_out  = o_text_encoder.encode(s_pin_direction_out);
const a_n_u8_pin_state_low  = o_text_encoder.encode(s_pin_state_low);
const a_n_u8_pin_state_high = o_text_encoder.encode(s_pin_state_high);

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

let o_fs = null;
let f_b_path_exists = null;
let f_write_text_file = null;
let f_read_text_file = null;
let f_o_file_descriptor = null;
let f_write_file = null;

let b_deno = typeof Deno !== 'undefined'
let b_node = typeof process !== 'undefined' && process.versions && process.versions.node
let b_bun = typeof Bun !== 'undefined'
if(b_bun){
    console.log('F$#@ bun, its documentation is horrible...')
}


let n_uid = null;
if(b_deno){
    n_uid = Deno.uid();
    f_b_path_exists = async function(
        s_path_file
    ){
        try {
            let o = await Deno.stat(s_path_file)
            return true       
        } catch (error) {
            return false
        }
    }
    f_write_text_file = Deno.writeTextFile
    f_read_text_file = Deno.readTextFile
    f_write_file = Deno.writeFile
    f_o_file_descriptor = Deno.open
}
if(b_node){
    const os = await import('os');
    try {
        const userInfo = os.userInfo();
        n_uid = userInfo.uid;
    } catch (error) {
        console.error('Could not get UID:', error);
    }
    o_fs = await import('fs');
    f_b_path_exists = async function(
        s_path_file
    ){
        return o_fs.existsSync(s_path_file)
    }
    f_o_file_descriptor = async function(
        s_path, 
        o_options
    ){
        // Convert Deno-style options to Node.js-style flags
        let s_flags = 'r'; // Default to read mode
        if (o_options.write && o_options.append) {
            s_flags = 'a'; // Append mode
        } else if (o_options.write && o_options.truncate) {
            s_flags = 'w'; // Write mode, truncate
        } else if (o_options.write) {
            s_flags = o_options.createNew ? 'wx' : 'w'; // Exclusive write mode
        } else if (o_options.append) {
            s_flags = 'a'; // Append mode
        } // Add more conditions as needed based on Deno's options

        // Open the file with the determined flags and return a Promise for consistency with Deno
        const o_fd = await o_fs.openSync(s_path, s_flags, o_options.mode);
        // Wrap the file descriptor in an object to mimic Deno's file handle
        const o_fd_denolike = {
            read: async function(v_buffer) {
                return o_fs.readSync(o_fd, v_buffer, 0, v_buffer.length)//, position, callback)
                // return await o_fd.read(v_buffer, 0, v_buffer.length);
            },
            write: async function(v_buffer) {
                return o_fs.writeSync(o_fd, v_buffer, 0, v_buffer.length)//, position, callback)
            },
            close: async function() {
                return o_fs.closeSync(o_fd);
            }
        };
        return o_fd_denolike
    }

    f_write_text_file = o_fs.writeFileSync//(path,content);
    f_read_text_file = o_fs.readFileSync;//('/Users/joe/test.txt', 'utf8');
    f_write_file = o_fs.writeFileSync
}
// if(b_bun){
// fuck bun, its documentation is horrible 
//     try {
//         n_uid = parseInt(Bun.spawnSync("id", ["-u"]).stdout);
//     } catch (error) {
//         console.error('Could not get UID:', error);
//     }
//     f_b_path_exists = async function(
//         s_path_file
//     ){
//         const file = Bun.file(s_path_file+'/value');
//         return await file.exists(); // boolean;
//     }
// }


export {
    o_raspi__v1,
    o_raspi__v2, 
    s_path_abs_folder_gpio,
    s_pin_direction_in,
    s_pin_direction_out,
    s_pin_state_low,
    s_pin_state_high,
    a_n_u8_pin_direction_in,
    a_n_u8_pin_direction_out,
    a_n_u8_pin_state_low,
    a_n_u8_pin_state_high,
    b_deno,
    b_node,
    f_b_path_exists,
    f_write_file,
    f_write_text_file,
    f_read_text_file, 
    n_uid, 
    f_o_file_descriptor,
    o_fs,
    o_text_encoder,
    o_text_decoder
}