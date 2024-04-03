
// this file should be runnable with 
// node filename.js
// deno run -A filename.js
// bun run filename.js

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
  n_uid

} 
from './mod.js'

let n = 0



let o_pin__out2 = await f_o_pin__from_o_raspi(
  o_raspi__v2,
  2, 
  s_pin_direction_out 
);

let n_wpn = performance.now();

await f_pin_set_state__from_o_pin(
  o_pin__out2,
  (n%2),
)
let n_wpn2 = performance.now();
let n_wpn_delta = n_wpn2-n_wpn
console.log({
  s_msg: "done", 
  n_wpn_delta
})


let a_n_u8_high = new TextEncoder().encode('1')

console.log(a_n_u8_high)
n_wpn = performance.now();
await f_pin_set_state__from_o_pin(
  o_pin__out2, 
  0,//a_n_u8_high
)
n_wpn2 = performance.now();
n_wpn_delta = n_wpn2-n_wpn

console.log({
  s_msg: "write my", 
  n_wpn_delta
})
// should be short like { s_msg: 'write my', n_wpn_delta: 0.136809999999997 } 0.136 milliseconds
process.exit(0)