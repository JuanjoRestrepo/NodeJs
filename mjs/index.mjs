// .js -> por defecto usa CommonJs
// .mjs -> por defecto usa ES Modules
// .cjs -> para usar CommonJs

import { sum, sub, mult, div } from './sum.mjs';

console.log(sum(1, 2));
console.log(sub(1, 2));
console.log(mult(1, 2));
console.log(div(1, 2));
