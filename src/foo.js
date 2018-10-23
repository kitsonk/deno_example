import * as bar from "./bar.js";

(async () => {
  const baz = await import("./baz.ts");
  console.log(baz);
})();

export const foo = "bar";

console.log(bar);
