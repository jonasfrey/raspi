
// this file should be runnable with 
// node filename.js
// deno run -A filename.js
// bun run filename.js

import {
  // runtimedata
  // v1 and v2 have different layouts
  o_raspi__v1,
  o_raspi__v2,
  a_n_u8_pin_direction_in,
  a_n_u8_pin_direction_out,
  a_n_u8_pin_state_high,
  a_n_u8_pin_state_low,

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
  n_uid

} 
from './mod.js'
console.log(o_raspi__v1)
// node and bun cannot fetch scripts from url , how bad please... from "https://deno.land/x/raspi@0.0.1/mod.js"

if(n_uid != 0){
  throw Error(`run as root user !`)
}

let f_sleep_ms = async function(n_ms){
  return new Promise((f_res)=>{setTimeout(()=>{return f_res(true)}, n_ms)})
}

let o_pin__out3 = await f_o_pin__from_o_raspi(
  o_raspi__v2,
  3, 
  a_n_u8_pin_direction_out 
);

let o_pin__out2 = await f_o_pin__from_o_raspi(
  o_raspi__v2,
  2, 
  a_n_u8_pin_direction_out 
);

let n = 0;
let n_wpn = window.performance.now();
while(n < 1000){
  n+=1;
  let n_mod_2 = n%2
  await f_pin_set_state__from_o_pin(
    o_pin__out2,
    (n_mod_2 == 0) ? a_n_u8_pin_state_high : a_n_u8_pin_state_low,
  ), 
  await f_pin_set_state__from_o_pin(
    o_pin__out3,
    (n_mod_2 == 0) ? a_n_u8_pin_state_low : a_n_u8_pin_state_high,
  )
  console.log(o_pin__out3)
  console.log(
    f_s_pins_state_layout(
      o_raspi__v2
    )
  )
  // await f_sleep_ms(20)
}
let n_wpn2 = window.performance.now();
let n_wpn_delta = n_wpn2-n_wpn
console.log({
  s_msg: "done", 
  n_wpn_delta
})


// // programm exists

// let s = f_s_pins_state_layout(
//     o_raspi__v2
// )
// console.log(s)



// let n_gpio_number = 2;
// // await f_pin_export__from_n_gpio_number(2);
// await f_pin_set_direction__from_n_gpio_number(
//   2, 
//   s_pin_direction_out
// );

// // await f_pin_export__from_n_gpio_number(3);
// await f_pin_set_direction__from_n_gpio_number(
//   3, 
//   s_pin_direction_out
// );


// console.log('test microseconds')
// n = 0; 
// let n_mics = performance.now()*1000
// while(n<1000){
//   n+=1
//   let n_mics2 = performance.now()*1000
//   console.log(
//     `delta microseconds loop iteration`,
//     n_mics2-n_mics
//   )
//   n_mics = n_mics2
// }
// // test pulse width modulation 
// n = 0;
// let n_mic_sec_interval = 10000;
// let n_duty_nor = 0.95;
// let n_mic_sec_interval_duty = n_mic_sec_interval*n_duty_nor
// let n_mic_sec_wpn = performance.now()*1000;
// let b_state_low = 1
// let b_state_low_last = 0
// while(n < 10000000000){
//   n_duty_nor = Math.sin(n*0.0000005)*.5+.5;
//   n_mic_sec_interval_duty = n_mic_sec_interval*n_duty_nor
//   // console.log(n_duty_nor)
//   const n_mic_sec_wpn2 = performance.now()*1000;
//   const n_mic_sec_delta = n_mic_sec_wpn2 - n_mic_sec_wpn
//   // console.log({n_mic_sec_delta})
//   b_state_low = n_mic_sec_delta < (n_mic_sec_interval_duty);

//   if(b_state_low != b_state_low_last){
//     await f_pin_set_state__from_n_gpio_number(2,(b_state_low)?'low': "high" ); 
//     b_state_low_last = b_state_low
//   }
//   if(n_mic_sec_delta >(n_mic_sec_interval)){
//     n_mic_sec_wpn = n_mic_sec_wpn2
//   }
//   n+=1;

// }
