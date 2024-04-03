<!-- {"s_msg":"this file was automatically generated","s_by":"f_generate_markdown.module.js","s_ts_created":"Tue Apr 02 2024 14:54:45 GMT+0200 (Central European Summer Time)","n_ts_created":1712062485377} -->
![./logo.png](./logo.png)
# Raspi
### import the stuff
```javascript
import {
    // runtimedata
    // v1 and v2 have different layouts
    o_raspi__v1,
    o_raspi__v2,
    s_pin_direction_in,
    s_pin_direction_out,
    // functions
    // used to retrieve and initialize a pin 
    f_o_pin__from_o_raspi,
    // used to get the layout 
    f_s_pins_state_layout, 
    // used to get /set state of a pin
    f_n__pin_get_state__from_o_pin,
    f_pin_set_state__from_o_pin,
    // used to un-init pins
    f_uninit_from_o_pin,
    // 'raw' functions
    f_b_pin_exported__from_n_gpio_number,
    f_pin_export__from_n_gpio_number,
    f_pin_set_direction__from_n_gpio_number,
    f_pin_set_state__from_n_gpio_number,
    f_n__pin_get_state__from_n_gpio_number, 
    f_pin_unexport__from_n_gpio_number,

} 
from "./mod.js"
// from "https://deno.land/x/raspi@[n.n.n]/mod.js"
```
## read a pin
```javascript
            let o_pin__in = await f_o_pin__from_o_raspi(
                o_raspi__v2, // from import {o_raspi__v2...} from ".../mod.js"
                2, // gpio pin number
                s_pin_direction_in // 'in' or 'out', default default is 'in'
            );
            let n_state = await f_n__pin_get_state__from_o_pin(
                o_pin__in
            ) // returns 1 or 0

```
## write a pin
```javascript
            let o_pin__out = await f_o_pin__from_o_raspi(
                o_raspi__v2,
                3, 
                s_pin_direction_out 
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

```
## 'manually' handle pins
this might be faster due to less overhead
but you have to keep track of pin states yourself
```javascript
            let n_gpio_number = 2;
            // check if pin is exported
            let b_exported = await f_b_pin_exported__from_n_gpio_number(n_gpio_number);
            if(!b_exported){
                // if not exported you have to export the pin
                await f_pin_export__from_n_gpio_number(n_gpio_number)
            }
            // set direction 
            await f_pin_set_direction__from_n_gpio_number(n_gpio_number, s_pin_direction_out);

            // write high 
            f_pin_set_state__from_n_gpio_number(n_gpio_number, 1)
            // write low
            f_pin_set_state__from_n_gpio_number(n_gpio_number, 0)
            
            // set direction 'in' for reading the pin 
            await f_pin_set_direction__from_n_gpio_number(n_gpio_number, s_pin_direction_in);

            let n = f_n__pin_get_state__from_n_gpio_number(n_gpio_number);
            console.log(n)//0            

            // at the end it is highly recommended to unexport the pin
            await f_pin_unexport__from_n_gpio_number(n_gpio_number);

            
```
## v1/v2 layout
returns the raspberry pi pins layout and it current states
- not exported ,< in , > out, ■ 1, □ 0
```javascript
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

```