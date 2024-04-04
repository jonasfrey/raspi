import {
    f_write_text_file,
    f_write_file,
    f_o_file_descriptor, 
    b_deno, 
    b_node
} from "./localhost/runtimedata.module.js"
let n_wpn = null;
let n_wpn_delta = null;


console.log(`this script was run with ${(b_deno) ? '"deno js"':''} ${(b_node) ? '"node js"':''}`)
let s_text = '1'
// this is the slowest way 
n_wpn = performance.now()
await f_write_text_file('./test_io', s_text);
n_wpn_delta = performance.now()-n_wpn
console.log({s: 'writeTextFile',n_wpn_delta})
// { s: "writeTextFile", n_wpn_delta: 0.5136779999999987 } on my machine

// a bit faster 
let a_n_u8_content = new TextEncoder().encode(s_text);
n_wpn = performance.now()
await f_write_file('./test_io', a_n_u8_content);
n_wpn_delta = performance.now()-n_wpn
console.log({s: 'writeFile',n_wpn_delta})
//{ s: "writeTextFile", n_wpn_delta: 0.23671600000000126 }


// the fastest
// beforehand 
let o_file_descriptor = await f_o_file_descriptor('./test_io', { write: true });
n_wpn = performance.now()
await o_file_descriptor.write(a_n_u8_content);
n_wpn_delta = performance.now()-n_wpn
console.log({s: 'o_file_descriptor.write',n_wpn_delta})

let o_file_descriptor_read = await f_o_file_descriptor('./test_io', { read: true });
n_wpn = performance.now()
let a_n_u8_read = new Uint8Array(8)
await o_file_descriptor_read.read(a_n_u8_read);

n_wpn_delta = performance.now()-n_wpn
console.log({s: 'o_file_descriptor.write',n_wpn_delta, a_n_u8_read})


// test results 
// node js
// this script was run with  "node js"
// { s: 'writeTextFile', n_wpn_delta: 0.3502999544143677 }
// { s: 'writeFile', n_wpn_delta: 0.07189500331878662 }
// { s: 'o_file_descriptor.write', n_wpn_delta: 0.039875030517578125 }

// deno js
// this script was run with "deno js"
// { s: "writeTextFile", n_wpn_delta: 0.5923770000000008 }
// { s: "writeFile", n_wpn_delta: 0.1569250000000011 }
// { s: "o_file_descriptor.write", n_wpn_delta: 0.0833970000000015 }