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
    a_n_u8_pin_state_high,
    a_n_u8_pin_state_low,
    f_b_arrays_equal,
   
  
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
            let n = 0;
            while(n < 10){
                n+=1
                await f_pin_set_state__from_o_pin(
                    o_pin__out,
                    (n % 2 == 0) ? a_n_u8_pin_state_high : a_n_u8_pin_state_low // write 'high' / n_pin_state_high / 1
                );
                await new Promise((f_res)=>{setTimeout(()=>{return f_res(true)}, 100)})
            }

            await f_pin_set_state__from_o_pin(
                o_pin__out,
                a_n_u8_pin_state_low // write 'low' / n_pin_state_low / 0
            );

            // it is highly recommend to un-init the pin before the programm ends
            // await f_uninit_from_o_pin(o_pin__in)
            // await f_uninit_from_o_pin(o_pin__out)
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
    f_o_test(
        'pwm_digial_pulse_width_modulation', 
        async ()=>{
            //./readme.md:start
            
            //md: ## pulse width modulation test
            //md: this shows that a digital pulsewidth modulation is possible 
            //md: pwm pulse width modulation is a technique where 
            //md: the state changes quickly from low to high / 0 to 1
            //md: depending on how much time the pin is high the brightness of an led changes
            //md: this example should show the pin changing from dark to bright in a 
            //md: sinusial wave
            let o_pin__out2 = await f_o_pin__from_o_raspi(
                o_raspi__v2,
                2, 
                a_n_u8_pin_direction_out 
            );
            let o_pin__out3 = await f_o_pin__from_o_raspi(
                o_raspi__v2,
                3, 
                a_n_u8_pin_direction_out 
            );
            // test pulse width modulation 
            let n = 0;
            let n_mic_sec_interval = 10000;
            let n_duty_nor = 0.95;
            let n_mic_sec_interval_duty = n_mic_sec_interval*n_duty_nor
            let n_mic_sec_wpn = performance.now()*1000;
            let b_state_low = 1
            let b_state_low_last = 0
            while(n < 10000000000){
                n_duty_nor = Math.sin(n*0.000001)*.5+.5;
                n_mic_sec_interval_duty = n_mic_sec_interval*n_duty_nor
                // console.log(n_duty_nor)
                const n_mic_sec_wpn2 = performance.now()*1000;
                const n_mic_sec_delta = n_mic_sec_wpn2 - n_mic_sec_wpn
                // console.log({n_mic_sec_delta})
                b_state_low = n_mic_sec_delta < (n_mic_sec_interval_duty);
            
                if(b_state_low != b_state_low_last){
                    await f_pin_set_state__from_o_pin(
                        o_pin__out2,
                        (b_state_low) 
                         ? a_n_u8_pin_state_high
                         : a_n_u8_pin_state_low
                    );
                    await f_pin_set_state__from_o_pin(
                        o_pin__out3,
                        (b_state_low) 
                         ? a_n_u8_pin_state_low
                         : a_n_u8_pin_state_high
                    );
                b_state_low_last = b_state_low
                }
                if(n_mic_sec_delta >(n_mic_sec_interval)){
                n_mic_sec_wpn = n_mic_sec_wpn2
                }
                n+=1;
            
            }
  
            //./readme.md:end

        }
    ),
]


f_display_test_selection_or_run_selected_test_and_print_summary(
    a_o_test
)
