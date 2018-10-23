import * as deno from "deno";
import * as foo from "./foo.js";
import * as ts from "typescript";

console.log("TypeScript Version:", ts.version);
console.log("Architecture:", deno.platform.arch);
console.log("Platform:", deno.platform.os);

console.log(foo);
