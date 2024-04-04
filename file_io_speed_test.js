let a_n_u8 = new TextEncoder().encode('abc')

let o = {n : a_n_u8}

console.log(o.n == a_n_u8)
console.log(o.n == new TextEncoder().encode('abc'))