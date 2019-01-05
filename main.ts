import * as deno from "deno";
import { color } from "./deps.ts";
import * as foo from "./foo.js";

console.log(color.cyan.bold("Architecture:"), deno.platform.arch);
console.log(color.cyan.bold("Platform:"), deno.platform.os);

console.log(foo);
