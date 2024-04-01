// here should be functions that really are only functions
// they take arguments do something and return something
// they should not depend on runtime data from the runtime scope
// for example
// do 
// let f_n_sum = function(n_1, n_2){
//     return n_1 + n_2
// }
// // don't 
// let n_base = 10
// let f_n_sum_dont = function(n_1){
//     return n_base + n_1
// }
// export {
//     f_n_sum
// }
// Export both pins to make them available in the user space:

// sh

// echo 0 > /sys/class/gpio/export
// echo 3 > /sys/class/gpio/export

// Set the direction of both pins to output:

// sh

// echo out > /sys/class/gpio/gpio0/direction
// echo out > /sys/class/gpio/gpio3/direction

// Write a high value (1) to both pins to set them high:

// sh

// echo 1 > /sys/class/gpio/gpio0/value
// echo 1 > /sys/class/gpio/gpio3/value

import { s_path_abs_folder_gpio, s_pin_state_high } from "./runtimedata.module.js";


const f_pin_export__from_n_gpio_number = async function(
    n_gpio_number
){
    // a pin has to be 'exported' to be able to write its 'direction' and 'state'
    // a exported pin stays exported unless it is 'un-exported' or the system is rebooted
    return Deno.writeTextFile(
        `${s_path_abs_folder_gpio}/export`, 
        n_gpio_number
    )
}
const f_pin_unexport__from_n_gpio_number = async function(
    n_gpio_number
){
    // a pin has to be 'exported' to be able to write its 'direction' and 'state'
    // a exported pin stays exported unless it is 'un-exported' or the system is rebooted
    return Deno.writeTextFile(
        `${s_path_abs_folder_gpio}/unexport`, 
        n_gpio_number
    )
}
const f_pin_set_direction__from_n_gpio_number = async function(
    n_gpio_number, 
    s_pin_direction
){
    return Deno.writeTextFile(
        `${s_path_abs_folder_gpio}/gpio${n_gpio_number}/direction`, 
        s_pin_direction
    )
}
const f_pin_set_state__from_n_gpio_number = async function(
    n_gpio_number, 
    s_state
){
    return Deno.writeTextFile(
        `${s_path_abs_folder_gpio}/gpio${n_gpio_number}/value`, 
        (s_state == s_pin_state_high) ? 1 : 0   
    )
}
const f_n__pin_get_state__from_n_gpio_number = async function(
    n_gpio_number, 
){
    const s = Deno.readTextFile(
        `${s_path_abs_folder_gpio}/gpio${n_gpio_number}/value`,    
    )
    return parseInt(s)
}
async function readGpioValue(pinNumber) {
    const filePath = `/sys/class/gpio/gpio${pinNumber}/value`;
    try {
      const text = await Deno.readTextFile(filePath);
      console.log(`GPIO pin ${pinNumber} value:`, text.trim());
      return text.trim(); // Returns '0' or '1'
    } catch (error) {
      console.error(`Error reading GPIO pin ${pinNumber}:`, error);
      throw error; // Re-throw or handle as needed
    }
  }
  

const f_v_pin_getorset_state__from_o_pin = async function(
    o_pin, 
    v_s_state, 
){
    if(!o_pin.v_s_direction){
        //pin has not been 'exported'
        await f_pin_export__from_n_gpio_number(o_pin.n_gpio_number);
        if(!v_s_state){
            await f_pin_set_direction__from_n_gpio_number(o_pin.n_gpio_number, 'in')
        }
        if(v_s_state){
            await f_pin_set_direction__from_n_gpio_number(o_pin.n_gpio_number, 'out')
        }
    }
    if(v_s_state){
        o_pin.v_n_mics_wpn__last_write = window.performance.now()
        let n_state = (v_s_state == s_pin_state_high) ? 1 : 0 
        if(n_state != o_pin.n_state){
            o_pin.v_n_mics_wpn__last_write_where_state_chaned = window.performance.now()
        }
        o_pin.n_state = n_state
        f_pin_set_state__from_n_gpio_number(
            o_pin.n_gpio_number, 
            v_s_state
        )
    }
    let n_state = f_n__pin_get_state__from_n_gpio_number(o_pin.n_gpio_number)
    o_pin.v_n_mics_wpn__last_read = window.performance.now()    
    if(n_state != o_pin.n_state){
        o_pin.v_n_mics_wpn__last_read_where_state_chaned = window.performance.now()
    }
    return n_state
}

let f_s_pins_state_layout = function(
    o_raspi
){
    let n_width_col = 21

    let o_s_direction_or_state_s_char = {
        direction_in : '>',
        direction_out : '<',
        direction_null : '-',
        state_0 :'□',
        state_1 :'■',
        state_null :' ',
    }

    let o_date = new Date()
    let s = `${o_date.toString()}.${o_date.getMilliseconds()}`

    return [
        `raspi ${o_raspi.s_name}: ${s}`,
        `|${'-'.repeat(n_width_col)}|${'-'.repeat(n_width_col)}|`,
        new Array(o_raspi.a_o_pin.length/2).fill(0).map((n, n_idx)=>{
            let a_o_pin = [
                o_raspi.a_o_pin[n_idx*2],
                o_raspi.a_o_pin[n_idx*2+1]
            ]
            return `|${a_o_pin.map(o=>{
                let s_dir = (o.v_s_direction) ? o.v_s_direction : 'null'
                let s_state = (o.v_s_direction) ? o.v_s_direction : 'null'
                let s = [
                    o_s_direction_or_state_s_char[`direction_${s_dir}`],
                    o_s_direction_or_state_s_char[`state_${s_state}`],
                    o.s_name_function_designation, 
                ].join(' ')
                return s.padEnd(n_width_col, ' ')
            }).join('|')}|`
        }).join('\n')
    ].join('\r\n')
    // | P1-01:type   | P1-02:type   |
    // raspi v2: Mon Apr 01 2024 19:11:04 GMT+0200 (Central European Summer Time).897
    // |---------------------|---------------------|
    // |-   3v3 power        |-   5v power         |
    // |-   GPIO 2 (SDA)     |-   5v power         |
    // |-   GPIO 3 (SCL)     |-   Ground           |
    // |-   GPIO 4 (GPCLK0)  |-   GPIO 14 (TXD)    |
    // |-   Ground           |-   GPIO 15 (RXD)    |
    // |-   GPIO 17          |-   GPIO 18 (PCM_CLK)|
    // |-   3v3 power        |-   Ground           |
    // |-   GPIO 27          |-   GPIO 23          |
    // |-   GPIO 22          |-   Ground           |
    // |-   GPIO 10 (MOSI)   |-   Ground           |
    // |-   GPIO 9 (MISO)    |-   GPIO 25          |
    // |-   GPIO 11 (SCLK)   |-   GPIO 8 (CEO)     |
    // |-   Ground           |-   GPIO 7 (CE1)     |
}
export {
    f_pin_export__from_n_gpio_number,
    f_pin_unexport__from_n_gpio_number,
    f_pin_set_direction__from_n_gpio_number,
    f_pin_set_state__from_n_gpio_number,
    f_n__pin_get_state__from_n_gpio_number, 
    f_v_pin_getorset_state__from_o_pin, 
    f_s_pins_state_layout
}