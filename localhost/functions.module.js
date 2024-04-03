
import { 
    s_path_abs_folder_gpio,
    s_pin_direction_in,
    f_b_path_exists, 
    f_read_text_file, 
    f_write_text_file
} from "./runtimedata.module.js";


const f_b_pin_exported__from_n_gpio_number = async function(
    n_gpio_number
){
    try {
        let b_file_exists = f_b_path_exists(`${s_path_abs_folder_gpio}/gpio${n_gpio_number}`)
        return b_file_exists
    } catch (error) {
        //check for permission error
        console.log(error)
        return false
    }
}
const f_pin_export__from_n_gpio_number = async function(
    n_gpio_number
){
    // a pin has to be 'exported' to be able to write its 'direction' and 'state'
    // a exported pin stays exported unless it is 'un-exported' or the system is rebooted
    return f_write_text_file(
        `${s_path_abs_folder_gpio}/export`, 
        n_gpio_number.toString()
    )
}
const f_pin_unexport__from_n_gpio_number = async function(
    n_gpio_number
){
    // a pin has to be 'exported' to be able to write its 'direction' and 'state'
    // a exported pin stays exported unless it is 'un-exported' or the system is rebooted
    return f_write_text_file(
        `${s_path_abs_folder_gpio}/unexport`, 
        n_gpio_number.toString()
    )
}
const f_pin_set_direction__from_n_gpio_number = async function(
    n_gpio_number, 
    s_pin_direction
){
    return f_write_text_file(
        `${s_path_abs_folder_gpio}/gpio${n_gpio_number}/direction`, 
        s_pin_direction
    )
}
const f_pin_set_state__from_n_gpio_number = async function(
    n_gpio_number, 
    n_state
){

    return f_write_text_file(
        `${s_path_abs_folder_gpio}/gpio${n_gpio_number}/value`, 
        n_state.toString()
    )
}
const f_n__pin_get_state__from_n_gpio_number = async function(
    n_gpio_number, 
){
    const s = f_read_text_file(
        `${s_path_abs_folder_gpio}/gpio${n_gpio_number}/value`,    
    )
    return parseInt(s)
}


const f_pin_set_state__from_o_pin = async function(
    o_pin, 
    n_state
){
    // o_pin has to be exported at this point
    // o_pin has to have a direction at this point
    o_pin.v_n_mics_wpn__last_write = performance.now()
        
    if(n_state != o_pin.n_state){
        // only write to pin if state has changed
        o_pin.v_n_mics_wpn__last_write_where_state_chaned = performance.now()
        o_pin.n_state = n_state
        return f_pin_set_state__from_n_gpio_number(
            o_pin.v_n_gpio_number, 
            n_state
        )
    }
}
const f_n__pin_get_state__from_o_pin = async function(
    o_pin
){
    // o_pin has to be exported at this point
    // o_pin has to have a direction at this point
    let n_state = f_n__pin_get_state__from_n_gpio_number(o_pin.v_n_gpio_number)
    o_pin.v_n_mics_wpn__last_read = performance.now()    
    if(n_state != o_pin.n_state){
        o_pin.v_n_mics_wpn__last_read_where_state_chaned = performance.now()
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
        direction_null : '_',
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
                let s_dir = (o.s_direction) ? o.s_direction : 'null'
                let s_state = (o.n_state) ? o.n_state : 'null'
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

let f_o_pin__from_o_raspi = async function(
    o_raspi, 
    n_gpio_number, 
    s_pin_direction = s_pin_direction_in
){
    let o_pin = o_raspi.a_o_pin.find(o=>o.v_n_gpio_number == n_gpio_number);
    if(!o_pin){
        throw Error(`cannot find pin with gpio pin number ${n_gpio_number} on board ${o_raspi.s_name}, make sure to use the correct GPIO pin number: the board layout is the following ${f_s_pins_state_layout(o_raspi)}`);
    }

    let b_exported = await f_b_pin_exported__from_n_gpio_number(n_gpio_number);
    if(!b_exported){
        await f_pin_export__from_n_gpio_number(n_gpio_number);
    }
    await f_pin_set_direction__from_n_gpio_number(n_gpio_number, s_pin_direction);
    o_pin.s_direction = s_pin_direction
    return o_pin;
}
let f_uninit_from_o_pin = async function(o_pin){
    if(await f_b_pin_exported__from_n_gpio_number(o_pin.n_gpio_number)){
        await f_pin_unexport__from_n_gpio_number(o_pin.n_gpio_number)
    }
    o_pin.s_pin_direction = null;
}

export {
    f_b_pin_exported__from_n_gpio_number,
    f_pin_export__from_n_gpio_number,
    f_pin_unexport__from_n_gpio_number,
    f_pin_set_direction__from_n_gpio_number,
    f_pin_set_state__from_n_gpio_number,
    f_n__pin_get_state__from_n_gpio_number, 
    f_pin_set_state__from_o_pin,
    f_n__pin_get_state__from_o_pin,
    f_s_pins_state_layout, 
    f_o_pin__from_o_raspi,
    f_uninit_from_o_pin
}