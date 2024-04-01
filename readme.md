<!-- {"s_msg":"this file was automatically generated","s_by":"f_generate_markdown.module.js","s_ts_created":"Mon Apr 01 2024 19:15:29 GMT+0200 (Central European Summer Time)","n_ts_created":1711991729074} -->
![./logo.png](./logo.png)
# Raspi
### import the stuff
```javascript
            //top level import
            // import {
            //     f_pin_export__from_n_gpio_number,
            //     //more functions and variables here 
            // } from `https://deno.land/x/raspi/[0.0.0]/mod.js`;

            // or runtime async import
            let o_mod = await import(`https://deno.land/x/raspi/[0.0.0]/mod.js`);
            // o_mod.f_pin_export__from_n_gpio_number(...)
```
## write to a pin 'manually'
the pin GPIO number is not the index of the pin if you look at the pins as a
(2x10) matrix
```javascript
            let n_gpio_number = 0;
```
make sure to apply theese operations to the pin first
note , all of the functions are async and have to be awaited to
finish completly
### 'export'
```javascript
            await o_mod.f_pin_export__from_n_gpio_number(n_gpio_number);
```
### 'direction'
```javascript
            await o_mod.f_pin_set_direction__from_n_gpio_number(
                n_gpio_number, 
                o_mod.s_pin_direction_out
            );
```
### 'state'
we can now write the state high or low to the pin
```javascript
            await o_mod.f_pin_set_state__from_n_gpio_number(
                n_gpio_number,
                o_mod.s_pin_state_high // 'high' or 'low'
            )
```
### reading a pin
```javascript
            await o_mod.f_pin_export__from_n_gpio_number(n_gpio_number);
            await o_mod.f_pin_set_direction__from_n_gpio_number(n_gpio_number, o_mod.s_pin_direction_in);
            let n = await o_mod.f_n__pin_get_state__from_n_gpio_number(n_gpio_number)
            console.log(n)//0 or 1
```
## write to a pin 'automatically'
get the raspberry pi (version 1 or version 2)
```javascript
            let o_raspi__v2 = o_mod.o_raspi__v2;
```
get the desired pin
```javascript
            let o_pin__gpio_3 = o_raspi__v2.a_o_pin.find(o=>o.n_gpio_number == 3);
            let o_pin__gpio_5 = o_raspi__v2.a_o_pin.find(o=>o.n_gpio_number == 5);
            await o_mod.f_v_pin_getorset_state__from_o_pin(
                o_pin__gpio_3,
                o_mod.s_pin_state_high // 'high' or 'low'
            );
            let n_state__pin_5 = await o_mod.f_v_pin_getorset_state__from_o_pin(
                o_pin__gpio_5,
            );
```
some available data
microseconds since script start , v->value (can be null), n-> number
```javascript
            // wpn -> window.performance.now(), microseconds since start of script at when the state
            // of the pin was written last (does not depend on if the pin state has changed since last write)
            console.log(o_pin__gpio_3.v_n_mics_wpn__last_write) // eg. 4194.229476
            // microseconds since start of script at when the state
            // of the pin was written last where the state changed
            console.log(o_pin__gpio_3.v_n_mics_wpn__last_write_where_state_chaned) // eg. 5002.229476
            
```
# layout
returns the raspberry pi pins layout and it current states
- not exported ,< in , > out, ■ 1, □ 0
```javascript
            f_assert_equals(1,1)
            let o_raspi__v2 = o_mod.o_raspi__v2;
            console.log(o_mod.f_s_pins_state_layout)
            let s = o_mod.f_s_pins_state_layout(
                o_raspi__v2
            )
            console.log(s)
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
```