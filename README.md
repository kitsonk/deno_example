# deno_example

An example application with [deno](https://github.com/deno_land/deno).

## lib/lib.deno_runtime.d.ts

This was generated from a custom build of `deno` that supports the `--types`
command line argument. You can simply replace this with whatever version of
`deno` you are running, by doing something like:

```
$ deno --types > lib/lib.deno_runtime.d.ts
```

## Running

If you clone the repository, you simply need an install of `deno` in your path
and run the following:

```
$ deno ./src/main.ts
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
$ deno ./src/main_test.ts
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

## Checking with `tsc`

You can clone this repository and run `tsc -p .` to validate the project. It
should exit silently and produce no errors.

## Using VSCode

If you clone this repository and use VSCode, you should be able to get all the
intellisense available for the Deno environment.

### `paths`

In order to provide intellisense for remote modules, the `tsconfig.json`
leverages `baseUrl` and `paths` to allow TypeScript to resolve modules that
exit in the local Deno cache:

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
