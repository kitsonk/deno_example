# deno_example

An example application with [deno](https://github.com/deno_land/deno).

## package.json

The only reason this exists is to provide the three external libraries which are bundled within deno so that they can be resolved at design time in VSCode.  Run `yarn install` or `npm install` to install these development dependencies.

## lib/deno.d.ts

This was generated from a custom build of `deno` that supports the `--types` command line argument.  You can simply replace this with whatever version of `deno` you are running once issue [#632](https://github.com/denoland/deno/issues/632) is closed.

## Running

If you clone the repository, you simply need an install of `deno` in your path and run the following:

```
$ deno ./src/main.ts
```

Which should output:

```
[ "src/main.ts" ]
```

## Checking with `tsc`

You can clone this repository and run `tsc -p .` to validate the project.  It should exit silently and produce no errors.

## Using VSCode

If you clone this repository and use VSCode, you should be able to get all the intellisense available for the deno environment.
