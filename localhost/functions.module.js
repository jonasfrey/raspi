
import { 
    s_path_abs_folder_gpio,
    a_n_u8_pin_direction_in,
    f_b_path_exists, 
    f_read_text_file, 
    f_write_text_file,
    f_o_file_descriptor,
    o_fs,
    f_write_file,
    a_n_u8_pin_direction_out,
    a_n_u8_pin_state_high,
    o_text_decoder
} from "./runtimedata.module.js";

let f_b_arrays_equal = function(
    a_n_u8_1,
    a_n_u8_2
){
    if(a_n_u8_1.length != a_n_u8_2.length){
        return false
    }
    for(let n = 0; n < a_n_u8_1.length; n+=1){
        if(
            a_n_u8_1[n] != a_n_u8_2[n]
        ){
            return false
        }
    }
    return true
}

const f_b_pin_exported__from_o_pin = async function(
    o_pin
){
    try {
        let b_file_exists = f_b_path_exists(`${s_path_abs_folder_gpio}/gpio${o_pin.v_n_gpio_number}`)
        return b_file_exists
    } catch (error) {
        //check for permission error
        console.log(error)
        return false
    }
}
const f_pin_ensure_export__from_o_pin = async function(
    o_pin
){

    let b_pin_exported = await f_b_pin_exported__from_o_pin(o_pin);
    if(!b_pin_exported){
        // a pin has to be 'exported' to be able to write its 'direction' and 'state'
        // a exported pin stays exported unless it is 'un-exported' or the system is rebooted
        return f_write_text_file(
            `${s_path_abs_folder_gpio}/export`, 
            o_pin.v_n_gpio_number.toString()
        )
    }
}
const f_pin_ensure_unexport__from_o_pin = async function(
    o_pin
){
    let b_pin_exported = await f_b_pin_exported__from_o_pin(o_pin);
    if(b_pin_exported){
        // a pin has to be 'exported' to be able to write its 'direction' and 'state'
        // a exported pin stays exported unless it is 'un-exported' or the system is rebooted
        return f_write_text_file(
            `${s_path_abs_folder_gpio}/unexport`, 
            o_pin.v_n_gpio_number.toString()
        )
    }

}
const f_pin_set_direction__from_o_pin = async function(
    o_pin, 
    a_n_u8_pin_direction
){
    o_pin.s_direction = o_text_decoder.decode(a_n_u8_pin_direction);

    if(o_pin.o_file_descriptor__value){
        await o_pin.o_file_descriptor__value.close()
        o_pin.o_file_descriptor__value = null
    }
    if(f_b_arrays_equal(a_n_u8_pin_direction, a_n_u8_pin_direction_in)){
        o_pin.o_file_descriptor__value = await f_o_file_descriptor(
            `${s_path_abs_folder_gpio}/gpio${o_pin.v_n_gpio_number}/value`,
            { read: true} 
        )
    }
    if(f_b_arrays_equal(a_n_u8_pin_direction, a_n_u8_pin_direction_out)){
        o_pin.o_file_descriptor__value = await f_o_file_descriptor(
            `${s_path_abs_folder_gpio}/gpio${o_pin.v_n_gpio_number}/value`,
            { write: true} 
        )
    }
    return f_write_file(
        `${s_path_abs_folder_gpio}/gpio${o_pin.v_n_gpio_number}/direction`,
        a_n_u8_pin_direction
    )
}

const f_pin_set_state__from_o_pin = async function(
    o_pin, 
    a_n_u8_pin_state
){
    o_pin.v_n_mics_wpn__last_write = performance.now()
    o_pin.v_a_n_u8_state = a_n_u8_pin_state 
    o_pin.n_state = (a_n_u8[0] == 49) ? 1 : 0;
    // o_pin.n_state = (f_b_arrays_equal(a_n_u8, a_n_u8_pin_state_high) ? 1 : 0) 
    return o_pin.o_file_descriptor__value.write(
        a_n_u8_pin_state
    );
}
const f_pin_set_state__from_o_pin_only_if_state_changed = async function(
    o_pin, 
    a_n_u8_pin_state
){
    if(a_n_u8_pin_state[0] != o_pin.v_a_n_u8_state[0]){
        return f_pin_set_state__from_o_pin(
            o_pin,
            a_n_u8_pin_state
        )
    }
}

const f_a_n_u8__pin_get_state__from_o_pin = async function(
    o_pin
){
    o_pin.v_n_mics_wpn__last_read = performance.now()
    let a_n_u8 = new Uint8Array(4)
    await o_pin.o_file_descriptor__value.read(
        a_n_u8
    );
    return a_n_u8
}

const f_n__pin_get_state__from_o_pin = async function(
    o_pin
){
    let a_n_u8 = await f_a_n_u8__pin_get_state__from_o_pin(o_pin);
    o_pin.n_state = (a_n_u8[0] == 49) ? 1 : 0;
    // o_pin.n_state = (f_b_arrays_equal(a_n_u8, a_n_u8_pin_state_high) ? 1 : 0) 
    return o_pin.n_state
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
    a_n_u8_pin_direction = a_n_u8_pin_direction_in
){
    let o_pin = o_raspi.a_o_pin.find(o=>o.v_n_gpio_number == n_gpio_number);

    if(!o_pin){
        throw Error(`cannot find pin with gpio pin number ${n_gpio_number} on board ${o_raspi.s_name}, make sure to use the correct GPIO pin number: the board layout is the following ${f_s_pins_state_layout(o_raspi)}`);
    }
    
    await f_pin_ensure_export__from_o_pin(o_pin);
    await f_pin_set_direction__from_o_pin(o_pin, a_n_u8_pin_direction);

    return o_pin;
}
let f_uninit_from_o_pin = async function(o_pin){
    await f_pin_ensure_unexport__from_o_pin(o_pin)
    o_pin.s_pin_direction = null;
    await o_pin.o_file_descriptor__value.close()
    o_pin.o_file_descriptor__value = null

}

export {
    
    f_b_arrays_equal,
    f_pin_ensure_export__from_o_pin,
    f_pin_ensure_unexport__from_o_pin,
    f_pin_set_direction__from_o_pin,
    f_pin_set_state__from_o_pin,
    f_pin_set_state__from_o_pin_only_if_state_changed,
    f_a_n_u8__pin_get_state__from_o_pin,
    f_n__pin_get_state__from_o_pin,
    f_s_pins_state_layout,
    f_o_pin__from_o_raspi,
    f_uninit_from_o_pin
}