import {
    b_deno, 
    b_node
} from "./runtimedata.module.js"
let f_display_test_selection_or_run_selected_test_and_print_summary = null;
let f_o_test = null;
let f_assert_equals = null;
if(b_deno){
    let o_mod = await import("https://deno.land/x/deno_test_server_and_client_side@1.3/mod.js");
    f_display_test_selection_or_run_selected_test_and_print_summary = o_mod.f_display_test_selection_or_run_selected_test_and_print_summary
    f_o_test = o_mod.f_o_test
    f_assert_equals = o_mod.f_assert_equals
}
if(b_node){
    f_o_test = (s_name, f_func)=>{
        return {
            s_name: s_name, 
            f_func: f_func
        }
    }

    f_display_test_selection_or_run_selected_test_and_print_summary = async function(a_o_test){
        for(let o of a_o_test){
            console.log(`running test ${o.s_name}`)
            await o.f_func();
        }
    }
    f_assert_equals = (v_a,v_b)=>{
        if(v_a!==v_b){
            throw Error(`a:${v_a} does not equal b${v_b}`)
        }
    }
}


//./readme.md:start
//md: ![./logo.png](./logo.png)
//./readme.md:end

//./readme.md:start
//md: # Raspi
//./readme.md:end

// import { stuff} from './client.module.js'


//./readme.md:start
//md: ### import the stuff
import {
    // runtimedata
    // v1 and v2 have different layouts
    o_raspi__v1,
    o_raspi__v2,
    a_n_u8_pin_direction_in,

    a_n_u8_pin_direction_out,
    f_b_arrays_equal,
    f_b_pin_exported__from_n_gpio_number,
    f_pin_export__from_o_pin,
    f_pin_unexport__from_o_pin,
    f_pin_set_direction__from_o_pin,
    f_pin_set_state__from_o_pin,
    f_a_n_u8__pin_get_state__from_o_pin,
    f_n__pin_get_state__from_o_pin,
    f_s_pins_state_layout,
    f_o_pin__from_o_raspi,
    f_uninit_from_o_pin


} 
from "./mod.js"
// from "https://deno.land/x/raspi@[n.n.n]/mod.js"
 //./readme.md:end

let a_o_test = [
    
    f_o_test(
        'auto', 
        async ()=>{
            //./readme.md:start
            //md: ## read a pin
            let o_pin__in = await f_o_pin__from_o_raspi(
                o_raspi__v2, // from import {o_raspi__v2...} from ".../mod.js"
                2, // gpio pin number
                a_n_u8_pin_direction_in // 'in' or 'out', default default is 'in'
            );
            let n_state = await f_n__pin_get_state__from_o_pin(
                o_pin__in
            ) // returns 1 or 0

            //md: ## write a pin
            let o_pin__out = await f_o_pin__from_o_raspi(
                o_raspi__v2,
                3, 
                a_n_u8_pin_direction_out 
            );
            // this function will check if the state has changed and only write to the pin if the state has changed
            await f_pin_set_state__from_o_pin(
                o_pin__out,
                1 // write 'high' / n_pin_state_high / 1
            );
            await f_pin_set_state__from_o_pin(
                o_pin__out,
                0 // write 'low' / n_pin_state_low / 0
            );

            // it is highly recommend to un-init the pin before the programm ends
            await f_uninit_from_o_pin(o_pin__in)
            await f_uninit_from_o_pin(o_pin__out)
            // programm exists

            //./readme.md:end
        }
    ),
    f_o_test(
        'print_the_pin_layout', 
        async ()=>{
            //./readme.md:start
            
            //md: ## v1/v2 layout 
            //md: returns the raspberry pi pins layout and it current states
            //md: - not exported ,< in , > out, ■ 1, □ 0
            console.log(f_s_pins_state_layout(o_raspi__v2))
            // raspi v2: Mon Apr 01 2024 19:11:04 GMT+0200 (Central European Summer Time).897
            // |---------------------|---------------------|
            // |-   3v3 power        |-   5v power         |
            // |> ■ GPIO 2 (SDA)     |-   5v power         |
            // |< □ GPIO 3 (SCL)     |-   Ground           |
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

            console.log(f_s_pins_state_layout(o_raspi__v1))
            // raspi v1: Tue Apr 02 2024 14:02:03 GMT+0200 (Central European Summer Time).815
            // |---------------------|---------------------|
            // |-   3v3 power        |-   5v power         |
            // |-   GPIO 0 (SDA)     |-   5v power         |
            // |-   GPIO 1 (SCL)     |-   Ground           |
            // |-   GPIO 4 (GPCLK0)  |-   GPIO 14 (TXD)    |
            // |-   Ground           |-   GPIO 15 (RXD)    |
            // |-   GPIO 17          |-   GPIO 18 (PCM_CLK)|
            // |-   3v3 power        |-   Ground           |
            // |-   GPIO 21          |-   GPIO 23          |
            // |-   GPIO 22          |-   Ground           |
            // |-   GPIO 10 (MOSI)   |-   Ground           |
            // |-   GPIO 9 (MISO)    |-   GPIO 25          |
            // |-   GPIO 11 (SCLK)   |-   GPIO 8 (CEO)     |
            // |-   Ground           |-   GPIO 7 (CE1)     |

            //./readme.md:end

        }
    ),
]


f_display_test_selection_or_run_selected_test_and_print_summary(
    a_o_test
)
