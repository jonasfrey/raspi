<!-- {"s_msg":"this file was automatically generated","s_by":"f_generate_markdown.module.js","s_ts_created":"Thu Apr 04 2024 14:45:55 GMT+0200 (Central European Summer Time)","n_ts_created":1712234755927} -->
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
## read a pin
```javascript
            let o_pin__in = await f_o_pin__from_o_raspi(
                o_raspi__v2, // from import {o_raspi__v2...} from ".../mod.js"
                2, // gpio pin number
                a_n_u8_pin_direction_in // 'in' or 'out', default default is 'in'
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
            await f_uninit_from_o_pin(o_pin__in)
            await f_uninit_from_o_pin(o_pin__out)
            // programm exists

            
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
## pulse width modulation test
this shows that a digital pulsewidth modulation is possible
pwm pulse width modulation is a technique where
the state changes quickly from low to high / 0 to 1
depending on how much time the pin is high the brightness of an led changes
this example should show the pin changing from dark to bright in a
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
                const n_mic_sec_delta = performance.now()*1000 - o_pin__out2.v_n_mics_wpn__last_write
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