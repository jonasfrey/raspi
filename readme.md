<!-- {"s_msg":"this file was automatically generated","s_by":"f_generate_markdown.module.js","s_ts_created":"Fri Apr 05 2024 01:34:20 GMT+0200 (Central European Summer Time)","n_ts_created":1712273660380} -->
![./logo.png](./logo.png)
# Raspi
### import the stuff
```javascript
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
    f_pin_set_state__from_o_pin_only_if_state_changed,
    f_a_n_u8__pin_get_state__from_o_pin,
    f_n__pin_get_state__from_o_pin,
    f_s_pins_state_layout,
    f_o_pin__from_o_raspi,
    f_uninit_from_o_pin


} 
from "./mod.js"
// from "https://deno.land/x/raspi@[n.n.n]/mod.js"
```
## get a pin reference
```javascript
            let o_pin__2 = await f_o_pin__from_o_raspi(
                o_raspi__v2, 
                2, // GPIO pin number
                a_n_u8_pin_direction_in // or a_n_u8_pin_direction_out 
            );
```
## read
```javascript
            let n_state = await f_n__pin_get_state__from_o_pin(
                o_pin__2
            )
            console.log(n_state) // 1 or 0
            console.log(o_pin__2.n_state) // 1 or 0 
            console.log(o_pin__2.v_n_mic_sec_wpn__last_read) // 1444064.188 (performance.now()*1000) //microseconds since script start 

            
```
## set direction
```javascript
            // to out
            await f_pin_set_direction__from_o_pin(
                o_pin__2, 
                a_n_u8_pin_direction_out
            );
```
## write
```javascript
            await f_pin_set_state__from_o_pin(
                o_pin__2,
                (true)
                    ? a_n_u8_pin_state_high // write 1
                    : a_n_u8_pin_state_low // write 0
            );
            console.log(o_pin__2.n_state) // 1
            console.log(o_pin__2.v_n_mic_sec_wpn__last_read) //  1444064.188 (performance.now()*1000) //microseconds since script start 
            console.log(o_pin__2.v_n_mic_sec_wpn__last_write) // 1893212.299 (performance.now()*1000) //microseconds since script start 
```
## write  (only if state has changed)
```javascript
            // will write 1
            await f_pin_set_state__from_o_pin_only_if_state_changed(
                o_pin__2, a_n_u8_pin_state_high
            );
            // will not write 1 since last state was also 1, 
            await f_pin_set_state__from_o_pin_only_if_state_changed(
                o_pin__2, a_n_u8_pin_state_high
            );
            // will not write 1 since last state was also 1, 
            await f_pin_set_state__from_o_pin_only_if_state_changed(
                o_pin__2, a_n_u8_pin_state_high
            );
            // will not write 0 
            await f_pin_set_state__from_o_pin_only_if_state_changed(
                o_pin__2, a_n_u8_pin_state_low
            );
        

```
## un-initialize
```javascript
            // it is highly recommend to un-init the pin before the programm ends
            await f_uninit_from_o_pin(o_pin__2)

            
```
## v1/v2 layout
returns the raspberry pi pins layout and it current states
- not exported ,< in , > out, ■ 1, □ 0
```javascript
            console.log(f_s_pins_state_layout(o_raspi__v1))
            // raspi v1: Fri Apr 05 2024 01:31:24 GMT+0200 (Central European Summer Time).514
            // |----------------------|----------------------|
            // |_   3v3 power         |_   5v power          |
            // |_   GPIO 0 (SDA)      |_   5v power          |
            // |_   GPIO 1 (SCL)      |_   Ground            |
            // |_   GPIO 4 (GPCLK0)   |_   GPIO 14 (TXD)     |
            // |_   Ground            |_   GPIO 15 (RXD)     |
            // |_   GPIO 17           |_   GPIO 18 (PCM_CLK) |
            // |_   GPIO 21           |_   Ground            |
            // |_   GPIO 22           |_   GPIO 23           |
            // |_   3v3 Power         |_   GPIO 24           |
            // |_   GPIO 10           |_   Ground            |
            // |_   GPIO 9 (MISO)     |_   GPIO 25           |
            // |_   GPIO 11 (SCLK)    |_   GPIO 8 (CE0)      |
            // |_   Ground            |_   GPIO 7 (CE1)      |
            // |----------------------|----------------------|

            console.log(f_s_pins_state_layout(o_raspi__v2))
            // raspi v2: Fri Apr 05 2024 01:31:58 GMT+0200 (Central European Summer Time).980
            // |----------------------|----------------------|
            // |_   3v3 power         |_   5v power          |
            // |_   GPIO 2 (SDA)      |_   5v power          |
            // |_   GPIO 3 (SCL)      |_   Ground            |
            // |_   GPIO 4 (GPCLK0)   |_   GPIO 14 (TXD)     |
            // |_   Ground            |_   GPIO 15 (RXD)     |
            // |_   GPIO 17           |_   GPIO 18 (PCM_CLK) |
            // |_   GPIO 27           |_   Ground            |
            // |_   GPIO 22           |_   GPIO 23           |
            // |_   3v3 power         |_   GPIO 24           |
            // |_   GPIO 10 (MOSI)    |_   Ground            |
            // |_   GPIO 9 (MISO)     |_   GPIO 25           |
            // |_   GPIO 11 (SCLK)    |_   GPIO 8 (CEO)      |
            // |_   Ground            |_   GPIO 7 (CE1)      |
            // |_   GPIO 0 (ID_SD)    |_   GPIO 1 (ID_SD)    |
            // |_   GPIO 5            |_   Ground            |
            // |_   GPIO 6            |_   GPIO 12 (PWM0)    |
            // |_   GPIO 13 (PWM1)    |_   Ground            |
            // |_   GPIO 19 (PCM_FS)  |_   GPIO 16           |
            // |_   GPIO 26           |_   GPIO 20 (PCM_DIN) |
            // |_   Ground            |_   GPIO 21 (PCM_DOUT)|
            // |----------------------|----------------------|

```
## example blink
```javascript
            let o_pin__2 = await f_o_pin__from_o_raspi(
                o_raspi__v2, 
                2, 
                a_n_u8_pin_direction_out
            );
            let n = 0;
            while(n < 10){
                n+=1
                await f_pin_set_state__from_o_pin(
                    o_pin__2,
                    (n % 2 == 0) ? a_n_u8_pin_state_high : a_n_u8_pin_state_low // write 'high' / n_pin_state_high / 1
                );
                // wait 500 ms
                await new Promise((f_res)=>{setTimeout(()=>{return f_res(true)}, 500)})
            }
            
```
## example PWM (pulse width modulation)
this shows that a digital pulsewidth modulation is possible
pwm pulse width modulation is a technique where
the state changes quickly from low to high / 0 to 1
depending on how much time the pin is high the brightness of an led changes
<br> this example should show the pin changing from dark to bright in a
sinusial wave
```javascript
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
            let n_mic_sec_interval_nonduty = n_mic_sec_interval*(1.-n_duty_nor)
            let n_mic_sec_delta_max = n_mic_sec_interval_duty;
            while(n < 100000000){
                n_duty_nor = Math.sin(n*0.000001)*.5+.5;
                n_mic_sec_interval_duty = n_mic_sec_interval*n_duty_nor
                n_mic_sec_interval_nonduty = n_mic_sec_interval*(1.-n_duty_nor)
                
                if(o_pin__out2.n_state == 1){
                    n_mic_sec_delta_max = n_mic_sec_interval_duty;
                }else{
                    n_mic_sec_delta_max = n_mic_sec_interval_nonduty;
                }
                // we make use of the property 'v_n_mic_sec_wpn__last_write' which holds a 
                // microseconds timestamp (wpn=>window.performance.now) time since script has started
                const n_mic_sec_delta = performance.now()*1000 - o_pin__out2.v_n_mic_sec_wpn__last_write
                //console.log(n_mic_sec_delta)
                if(n_mic_sec_delta > n_mic_sec_delta_max){
                    await f_pin_set_state__from_o_pin(
                        o_pin__out2,
                        (o_pin__out2.n_state == 0) 
                         ? a_n_u8_pin_state_high
                         : a_n_u8_pin_state_low
                    );
                    await f_pin_set_state__from_o_pin(
                        o_pin__out3,
                        (o_pin__out3.n_state == 1) 
                         ? a_n_u8_pin_state_low
                         : a_n_u8_pin_state_high
                    );
                }

                n+=1;
            
            }
            await f_uninit_from_o_pin(o_pin__out2)
            await f_uninit_from_o_pin(o_pin__out3)

```