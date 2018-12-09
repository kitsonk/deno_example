import * as deno from "deno";
import * as foo from "./foo.js";

console.log("Architecture:", deno.platform.arch);
console.log("Platform:", deno.platform.os);

console.log(foo);
