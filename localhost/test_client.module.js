import {
    f_display_test_selection_or_run_selected_test_and_print_summary,
    f_o_test, 
    f_assert_equals
} from "https://deno.land/x/deno_test_server_and_client_side@1.3/mod.js"


//readme.md:start
//md: #template structure
//md: ## ./
//md: all but ./localhost inside this directory is considered server side
//md: ./localhost this is client side code
//readme.md:end

//./readme.md:start
//md: ![./logo.png](./logo.png)
//./readme.md:end

//./readme.md:start
//md: # Raspi
//./readme.md:end

// import { stuff} from './client.module.js'

let a_o_test = [
    f_o_test(
        'asdf', 
        async ()=>{
            f_assert_equals(1,1) 
        }
    ),
    f_o_test(
        'manually', 
        async ()=>{
            //./readme.md:start
            //md: ## write to a pin 'manually' 
            //md: ### import the stuff 
            let s_url_module = `https://deno.land/x/raspi/[0.0.0]/mod.js`;
            //./readme.md:end
            s_url_module = './mod.js'
            //./readme.md:start
            let o_mod = import(`${s_url_module}/mod.js`);
            //md: the pin GPIO number is not the index of the pin if you look at the pins as a 
            //md: (2x10) matrix
            let n_gpio_number = 0;
            //md: make sure to apply theese operations to the pin first
            //md: note , all of the functions are async and have to be awaited to 
            //md: finish completly
            //md: ### 'export' 
            await o_mod.f_pin_export__from_n_gpio_number(n_gpio_number);
            //md: ### 'direction' 
            await o_mod.f_pin_set_direction__from_n_gpio_number(
                n_gpio_number, 
                o_mod.s_pin_direction_out
            );
            //md: ### 'state' 
            //md: we can now write the state high or low to the pin
            await o_mod.f_pin_set_state__from_n_gpio_number(
                n_gpio_number,
                o_mod.s_pin_state_high // 'high' or 'low'
            )
            //md: ### reading a pin
            await o_mod.f_pin_export__from_n_gpio_number(n_gpio_number);
            await o_mod.f_pin_set_direction__from_n_gpio_number(n_gpio_number, o_mod.s_pin_direction_in);
            let n = await o_mod.f_n__pin_get_state__from_n_gpio_number(n_gpio_number)
            console.log(n)//0 or 1
            //./readme.md:end
        }
    ),
    f_o_test(
        'automatically', 
        async ()=>{
            //./readme.md:start
            //md: ## write to a pin 'automatically' 
            //md: ### import the stuff 
            let s_url_module = `https://deno.land/x/raspi/[0.0.0]/mod.js`;
            //./readme.md:end
            s_url_module = './mod.js'
            //./readme.md:start
            let o_mod = import(`${s_url_module}/mod.js`);
            //md:  get the raspberry pi (version 1 or version 2)
            let o_raspi__v2 = o_mod.o_raspi__v2;
            //md: get the desired pin
            let o_pin__gpio_3 = o_raspi__v2.a_o_pin.find(o=>o.n_gpio_number == 3);
            let o_pin__gpio_5 = o_raspi__v2.a_o_pin.find(o=>o.n_gpio_number == 5);
            await o_mod.f_v_pin_getorset_state__from_o_pin(
                o_pin__gpio_3,
                o_mod.s_pin_state_high // 'high' or 'low'
            );
            let n_state__pin_5 = await o_mod.f_v_pin_getorset_state__from_o_pin(
                o_pin__gpio_5,
            );
            //md: some available data
            //md: microseconds since script start , v->value (can be null), n-> number
            // wpn -> window.performance.now(), microseconds since start of script at when the state
            // of the pin was written last (does not depend on if the pin state has changed since last write)
            console.log(o_pin__gpio_3.v_n_mics_wpn__last_write) // eg. 4194.229476
            // microseconds since start of script at when the state
            // of the pin was written last where the state changed
            console.log(o_pin__gpio_3.v_n_mics_wpn__last_write_where_state_chaned) // eg. 5002.229476
            //./readme.md:end
        }
    ),
]


f_display_test_selection_or_run_selected_test_and_print_summary(
    a_o_test
)