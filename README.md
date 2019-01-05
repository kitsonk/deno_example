# deno_example

An example application with [deno](https://github.com/deno_land/deno).

## `lib/lib.deno_runtime.d.ts`

This file contains all the runtime type information, which can be used to
supply an editor, like VSCode with the type information. This was generated
from a custom build of `deno`, but you can simply replace this with whatever
version of `deno` you are running, by doing something like:

```
$ deno --types > lib/lib.deno_runtime.d.ts
```

## Running

If you clone the repository, you simply need an install of `deno` in your path
and run the following:

```
$ deno main.ts
```

Which should output something like:

```
Architecture: x64
Platform: mac
{}
{ bar: "bar" }
{ baz: "bar" }
```

There is also a basic tests which you can run via:

```
$ deno main_test.ts
```

Which should output:

```
Downloading https://deno.land/x/testing/testing
Downloading https://deno.land/x/testing/util
running 1 tests
test basic
... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

## Using VSCode

### `deno_ls_plugin`

If you clone this repository and use VSCode, you should be able to get all the
intellisense available for the Deno environment. TypeScript does not support
module IDs that end in `.ts`, but via the
[deno_ls_plugin](https://github.com/kitsonk/deno_ls_plugin) it is able to patch
TypeScript when using VSCode.

This does require you to do an `npm install` or `yarn install` after cloning
the package and using the _Workspace Version_ of TypeScript.

**NOTE** Deno does not use any package managers, the `package.json` only exists
to facilitate installing the two required packages for VSCode to be able to
give the full editing experience.

**NOTE** Because plugins are only active when using the language services, they
do not affect `tsc` which means that when you try to run `tsc` it will report
errors on module IDs which end with `.ts`.

### `paths`

In order to provide intellisense for remote modules, the `tsconfig.json`
leverages `baseUrl` and `paths` to allow TypeScript to resolve modules that
exist in the local Deno cache:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "http://*": ["../../.deno/deps/http/*"],
      "https://*": ["../../.deno/deps/https/*"]
    }
  }
}
```

The Deno cache defaults to `$HOME/.deno/` and can be overridden by setting the
`DENO_DIR` environment variable. `paths` works off of relative paths from the
`baseURl`, so the values may need to be adjusted based on your local
configuration.

Also, you will not get intellisense until the remote modules are at least
retrieved once.
