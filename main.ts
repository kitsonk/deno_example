import { cyan, bold } from "./deps.ts";

console.log(cyan(bold("Architecture:")), Deno.platform.arch);
console.log(cyan(bold("Platform:")), Deno.platform.os);
console.log();
console.log(cyan(bold("args:")), window.Deno.args);
