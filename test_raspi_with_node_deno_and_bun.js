
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
function writePinAsync(pin, value) {
  return new Promise((resolve, reject) => {
      gpio.write(pin, value, (err) => {
          if (err) {
              reject(err);
          } else {
              return resolve(true);
          }
      });
  });
}

// let gpio = (await import('rpi-gpio')).default
// gpio.setup(3, gpio.DIR_OUT, writePin); // Example uses BCM 17
// function writePin() {
//   gpio.write(3, true, function(err) {
//       if (err) throw err;
//       console.log('Written to pin');

//       gpio.setup(5, gpio.DIR_OUT, writePin); // Example uses BCM 17
//       function writePin() {
//         gpio.write(5, true, function(err) {
//             if (err) throw err;
//             console.log('Written to pin');
//             f_gpio_init_done()
//         });
//       }
      
//   });
// }

let f_gpio_init_done = async function(){
  

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
  s_pin_direction_out 
);

let o_pin__out2 = await f_o_pin__from_o_raspi(
  o_raspi__v2,
  2, 
  s_pin_direction_out 
);

let n = 0;
let n_wpn = performance.now();
while(n < 10){
  n+=1;
  await f_pin_set_state__from_o_pin(
    o_pin__out2,
    (n%2),
  ), 
  await f_pin_set_state__from_o_pin(
    o_pin__out3,
    1-(n%2),
  )
  // console.log(o_pin__out3)
  console.log(
    f_s_pins_state_layout(
      o_raspi__v2
    )
  )
  await f_sleep_ms(200)
}
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
  a_n_u8_high
)
n_wpn2 = performance.now();
n_wpn_delta = n_wpn2-n_wpn

console.log({
  s_msg: "write my", 
  n_wpn_delta
})
process.exit(0)

n_wpn = performance.now();
await writePinAsync(5, true);

n_wpn2 = performance.now();
n_wpn_delta = n_wpn2-n_wpn

console.log({
  s_msg: "write gpio", 
  n_wpn_delta
})
// process.exit(0)

  gpio.write(5, false, function(err) {});

  n = 0;
 n_wpn = performance.now();
while(n < 10){
  n+=1;
  await gpio.write(3, (n%2==0) ? 1 : 0)
  await gpio.write(5, (n%2 == 1) ? 1 : 0)

  await f_sleep_ms(200)
}
 n_wpn2 = performance.now();
 n_wpn_delta = n_wpn2-n_wpn
console.log({
  s_msg: "done rpi-gpio", 
  n_wpn_delta
})

f_test_pwm()

}
f_gpio_init_done()

// const Gpio = (await import('onoff')).Gpio;
// const p2 = new Gpio(2, 'out')//, 'both');
// p2.writeSync(true);
// const p3 = new Gpio(3, 'out')//, 'both');
// p3.writeSync(true);

// await gpiop.setup(2, gpiop.DIR_OUT);
// await gpiop.setup(3, gpiop.DIR_OUT);

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

let f_test_pwm = async function(){

console.log('test pulse width modulation')
n = 0; 
let n_mics = performance.now()*1000
while(n<1000){
  n+=1
  let n_mics2 = performance.now()*1000
  console.log(
    `delta microseconds loop iteration`,
    n_mics2-n_mics
  )
  n_mics = n_mics2
}

let o_pin__out3 = await f_o_pin__from_o_raspi(
  o_raspi__v2,
  3, 
  s_pin_direction_out 
);
// test pulse width modulation 
n = 0;
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
    // await gpio.write(3, b_state_low)
    // console.log(`write ${b_state_low}`)
    // await writePinAsync(5, (b_state_low)?true:false)
    // await f_pin_set_state__from_n_gpio_number(2,(b_state_low)?0:1); 
    await f_pin_set_state__from_o_pin(
      o_pin__out3,
      (b_state_low)?0:1
    ), 
    b_state_low_last = b_state_low
  }
  if(n_mic_sec_delta >(n_mic_sec_interval)){
    n_mic_sec_wpn = n_mic_sec_wpn2
  }
  n+=1;

}

}