// Copyright 2018 the Deno authors. All rights reserved. MIT license.

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

// @url js/globals.ts

declare module "deno" {
  // @url js/os.d.ts

  /** Exit the Deno process with optional exit code. */
  export function exit(exitCode?: number): never;
  /** Returns a snapshot of the environment variables at invocation. Mutating a
   * property in the object will set that variable in the environment for
   * the process. The environment object will only accept `string`s or `number`s
   * as values.
   *
   *       import { env } from "deno";
   *
   *       const myEnv = env();
   *       console.log(myEnv.SHELL);
   *       myEnv.TEST_VAR = "HELLO";
   *       const newEnv = env();
   *       console.log(myEnv.TEST_VAR == newEnv.TEST_VAR);
   */
  export function env(): {
    [index: string]: string;
  };

  // @url js/dir.d.ts

  /**
   * cwd() Return a string representing the current working directory.
   * If the current directory can be reached via multiple paths
   * (due to symbolic links), cwd() may return
   * any one of them.
   * throws NotFound exception if directory not available
   */
  export function cwd(): string;
  /**
   * chdir() Change the current working directory to path.
   * throws NotFound exception if directory not available
   */
  export function chdir(directory: string): void;

  // @url js/io.d.ts

  export interface ReadResult {
    nread: number;
    eof: boolean;
  }
  export interface Reader {
    /** Reads up to p.byteLength bytes into `p`. It resolves to the number
     * of bytes read (`0` <= `n` <= `p.byteLength`) and any error encountered.
     * Even if `read()` returns `n` < `p.byteLength`, it may use all of `p` as
     * scratch space during the call. If some data is available but not
     * `p.byteLength` bytes, `read()` conventionally returns what is available
     * instead of waiting for more.
     *
     * When `read()` encounters an error or end-of-file condition after
     * successfully reading `n` > `0` bytes, it returns the number of bytes read.
     * It may return the (non-nil) error from the same call or return the error
     * (and `n` == `0`) from a subsequent call. An instance of this general case
     * is that a `Reader` returning a non-zero number of bytes at the end of the
     * input stream may return either `err` == `EOF` or `err` == `null`. The next
     * `read()` should return `0`, `EOF`.
     *
     * Callers should always process the `n` > `0` bytes returned before
     * considering the `EOF`. Doing so correctly handles I/O errors that happen
     * after reading some bytes and also both of the allowed `EOF` behaviors.
     *
     * Implementations of `read()` are discouraged from returning a zero byte
     * count with a `null` error, except when `p.byteLength` == `0`. Callers
     * should treat a return of `0` and `null` as indicating that nothing
     * happened; in particular it does not indicate `EOF`.
     *
     * Implementations must not retain `p`.
     */
    read(p: ArrayBufferView): Promise<ReadResult>;
  }
  export interface Writer {
    /** Writes `p.byteLength` bytes from `p` to the underlying data
     * stream. It resolves to the number of bytes written from `p` (`0` <= `n` <=
     * `p.byteLength`) and any error encountered that caused the write to stop
     * early. `write()` must return a non-null error if it returns `n` <
     * `p.byteLength`. write() must not modify the slice data, even temporarily.
     *
     * Implementations must not retain `p`.
     */
    write(p: ArrayBufferView): Promise<number>;
  }
  export interface Closer {
    close(): void;
  }
  export interface Seeker {
    /** Seek sets the offset for the next `read()` or `write()` to offset,
     * interpreted according to `whence`: `SeekStart` means relative to the start
     * of the file, `SeekCurrent` means relative to the current offset, and
     * `SeekEnd` means relative to the end. Seek returns the new offset relative
     * to the start of the file and an error, if any.
     *
     * Seeking to an offset before the start of the file is an error. Seeking to
     * any positive offset is legal, but the behavior of subsequent I/O operations
     * on the underlying object is implementation-dependent.
     */
    seek(offset: number, whence: number): Promise<void>;
  }
  export interface ReaderCloser extends Reader, Closer {}
  export interface WriteCloser extends Writer, Closer {}
  export interface ReadSeeker extends Reader, Seeker {}
  export interface WriteSeeker extends Writer, Seeker {}
  export interface ReadWriteCloser extends Reader, Writer, Closer {}
  export interface ReadWriteSeeker extends Reader, Writer, Seeker {}
  /** Copies from `src` to `dst` until either `EOF` is reached on `src`
   * or an error occurs. It returns the number of bytes copied and the first
   * error encountered while copying, if any.
   *
   * Because `copy()` is defined to read from `src` until `EOF`, it does not
   * treat an `EOF` from `read()` as an error to be reported.
   */
  export function copy(dst: Writer, src: Reader): Promise<number>;

  // @url js/files.d.ts

  /** The Deno abstraction for reading and writing files. */
  export class File implements Reader, Writer, Closer {
    readonly rid: number;
    constructor(rid: number);
    write(p: ArrayBufferView): Promise<number>;
    read(p: ArrayBufferView): Promise<ReadResult>;
    close(): void;
  }
  /** An instance of `File` for stdin. */
  export const stdin: File;
  /** An instance of `File` for stdout. */
  export const stdout: File;
  /** An instance of `File` for stderr. */
  export const stderr: File;
  type OpenMode = "r" | "w" | "w+" | "x";
  /** A factory function for creating instances of `File` associated with the
   * supplied file name.
   */
  function create(filename: string): Promise<File>;
  /** Open a file and return an instance of the `File` object.
   *
   *       import * as deno from "deno";
   *       (async () => {
   *         const file = await deno.open("/foo/bar.txt");
   *       })();
   */
  export function open(filename: string, mode?: OpenMode): Promise<File>;
  /** Read from a file ID into an array buffer.
   *
   * Resolves with the `ReadResult` for the operation.
   */
  export function read(rid: number, p: ArrayBufferView): Promise<ReadResult>;
  /** Write to the file ID the contents of the array buffer.
   *
   * Resolves with the number of bytes written.
   */
  export function write(rid: number, p: ArrayBufferView): Promise<number>;
  /** Close the file ID. */
  export function close(rid: number): void;

  // @url js/mkdir.d.ts

  /** Creates a new directory with the specified path and permission
   * synchronously.
   *
   *       import { mkdirSync } from "deno";
   *       mkdirSync("new_dir");
   */
  export function mkdirSync(path: string, mode?: number): void;
  /** Creates a new directory with the specified path and permission.
   *
   *       import { mkdir } from "deno";
   *       await mkdir("new_dir");
   */
  export function mkdir(path: string, mode?: number): Promise<void>;

  // @url js/make_temp_dir.d.ts

  interface MakeTempDirOptions {
    dir?: string;
    prefix?: string;
    suffix?: string;
  }
  /** makeTempDirSync is the synchronous version of `makeTempDir`.
   *
   *       import { makeTempDirSync } from "deno";
   *       const tempDirName0 = makeTempDirSync();
   *       const tempDirName1 = makeTempDirSync({ prefix: 'my_temp' });
   */
  export function makeTempDirSync(options?: MakeTempDirOptions): string;
  /** makeTempDir creates a new temporary directory in the directory `dir`, its
   * name beginning with `prefix` and ending with `suffix`.
   * It returns the full path to the newly created directory.
   * If `dir` is unspecified, tempDir uses the default directory for temporary
   * files. Multiple programs calling tempDir simultaneously will not choose the
   * same directory. It is the caller's responsibility to remove the directory
   * when no longer needed.
   *
   *       import { makeTempDir } from "deno";
   *       const tempDirName0 = await makeTempDir();
   *       const tempDirName1 = await makeTempDir({ prefix: 'my_temp' });
   */
  export function makeTempDir(options?: MakeTempDirOptions): Promise<string>;

  // @url js/remove.d.ts

  /** Removes the named file or (empty) directory synchronously. Would throw
   * error if permission denied, not found, or directory not empty.
   *
   *       import { removeSync } from "deno";
   *       removeSync("/path/to/empty_dir/or/file");
   */
  export function removeSync(path: string): void;
  /** Removes the named file or (empty) directory. Would throw error if
   * permission denied, not found, or directory not empty.
   *
   *       import { remove } from "deno";
   *       await remove("/path/to/empty_dir/or/file");
   */
  export function remove(path: string): Promise<void>;
  /** Recursively removes the named file or directory synchronously.  Would throw
   * error if permission denied or not found.
   *
   *       import { removeAllSync } from "deno";
   *       removeAllSync("/path/to/dir/or/file");
   */
  export function removeAllSync(path: string): void;
  /** Recursively removes the named file or directory. Would throw error if
   * permission denied or not found.
   *
   *       import { removeAll } from "deno";
   *       await removeAll("/path/to/dir/or/file");
   */
  export function removeAll(path: string): Promise<void>;

  // @url js/rename.d.ts

  /** Synchronously renames (moves) `oldpath` to `newpath`. If `newpath` already
   * exists and is not a directory, `renameSync()` replaces it. OS-specific
   * restrictions may apply when `oldpath` and `newpath` are in different
   * directories.
   *
   *       import { renameSync } from "deno";
   *       renameSync("old/path", "new/path");
   */
  export function renameSync(oldpath: string, newpath: string): void;
  /** Renames (moves) `oldpath` to `newpath`. If `newpath` already exists and is
   * not a directory, `rename()` replaces it. OS-specific restrictions may apply
   * when `oldpath` and `newpath` are in different directories.
   *
   *       import { rename } from "deno";
   *       await rename("old/path", "new/path");
   */
  export function rename(oldpath: string, newpath: string): Promise<void>;

  // @url js/read_file.d.ts

  /** Read the entire contents of a file synchronously.
   *
   *       import { readFileSync } from "deno";
   *       const decoder = new TextDecoder("utf-8");
   *       const data = readFileSync("hello.txt");
   *       console.log(decoder.decode(data));
   */
  export function readFileSync(filename: string): Uint8Array;
  /** Read the entire contents of a file.
   *
   *       import { readFile } from "deno";
   *       const decoder = new TextDecoder("utf-8");
   *       const data = await readFile("hello.txt");
   *       console.log(decoder.decode(data));
   */
  export function readFile(filename: string): Promise<Uint8Array>;

  // @url js/file_info.d.ts

  /** A FileInfo describes a file and is returned by `stat`, `lstat`,
   * `statSync`, `lstatSync`.
   */
  export interface FileInfo {
    readonly _isFile: boolean;
    readonly _isSymlink: boolean;
    /** The size of the file, in bytes. */
    len: number;
    /** The last modification time of the file. This corresponds to the `mtime`
     * field from `stat` on Unix and `ftLastWriteTime` on Windows. This may not
     * be available on all platforms.
     */
    modified: number | null;
    /** The last access time of the file. This corresponds to the `atime`
     * field from `stat` on Unix and `ftLastAccessTime` on Windows. This may not
     * be available on all platforms.
     */
    accessed: number | null;
    /** The last access time of the file. This corresponds to the `birthtime`
     * field from `stat` on Unix and `ftCreationTime` on Windows. This may not
     * be available on all platforms.
     */
    created: number | null;
    /** The underlying raw st_mode bits that contain the standard Unix permissions
     * for this file/directory. TODO Match behavior with Go on windows for mode.
     */
    mode: number | null;
    /** Returns the file or directory name. */
    name: string | null;
    /** Returns the file or directory path. */
    path: string | null;
    /** Returns whether this is info for a regular file. This result is mutually
     * exclusive to `FileInfo.isDirectory` and `FileInfo.isSymlink`.
     */
    isFile(): boolean;
    /** Returns whether this is info for a regular directory. This result is
     * mutually exclusive to `FileInfo.isFile` and `FileInfo.isSymlink`.
     */
    isDirectory(): boolean;
    /** Returns whether this is info for a symlink. This result is
     * mutually exclusive to `FileInfo.isFile` and `FileInfo.isDirectory`.
     */
    isSymlink(): boolean;
  }

  // @url js/read_dir.d.ts

  /** Reads the directory given by path and returns a list of file info
   * synchronously.
   *
   *       import { readDirSync } from "deno";
   *       const files = readDirSync("/");
   */
  export function readDirSync(path: string): FileInfo[];
  /** Reads the directory given by path and returns a list of file info.
   *
   *       import { readDir } from "deno";
   *       const files = await readDir("/");
   */
  export function readDir(path: string): Promise<FileInfo[]>;

  // @url js/copy_file.d.ts

  /** Copies the contents of a file to another by name synchronously.
   * Creates a new file if target does not exists, and if target exists,
   * overwrites original content of the target file.
   *
   * It would also copy the permission of the original file
   * to the destination.
   *
   *       import { copyFileSync } from "deno";
   *       copyFileSync("from.txt", "to.txt");
   */
  export function copyFileSync(from: string, to: string): void;
  /** Copies the contents of a file to another by name.
   *
   * Creates a new file if target does not exists, and if target exists,
   * overwrites original content of the target file.
   *
   * It would also copy the permission of the original file
   * to the destination.
   *
   *       import { copyFile } from "deno";
   *       await copyFile("from.txt", "to.txt");
   */
  export function copyFile(from: string, to: string): Promise<void>;

  // @url js/read_link.d.ts

  /** Returns the destination of the named symbolic link synchronously.
   *
   *       import { readlinkSync } from "deno";
   *       const targetPath = readlinkSync("symlink/path");
   */
  export function readlinkSync(name: string): string;
  /** Returns the destination of the named symbolic link.
   *
   *       import { readlink } from "deno";
   *       const targetPath = await readlink("symlink/path");
   */
  export function readlink(name: string): Promise<string>;

  // @url js/stat.d.ts

  /** Queries the file system for information on the path provided. If the given
   * path is a symlink information about the symlink will be returned.
   *
   *       import { lstat } from "deno";
   *       const fileInfo = await lstat("hello.txt");
   *       assert(fileInfo.isFile());
   */
  export function lstat(filename: string): Promise<FileInfo>;
  /** Queries the file system for information on the path provided synchronously.
   * If the given path is a symlink information about the symlink will be
   * returned.
   *
   *       import { lstatSync } from "deno";
   *       const fileInfo = lstatSync("hello.txt");
   *       assert(fileInfo.isFile());
   */
  export function lstatSync(filename: string): FileInfo;
  /** Queries the file system for information on the path provided. `stat` Will
   * always follow symlinks.
   *
   *       import { stat } from "deno";
   *       const fileInfo = await stat("hello.txt");
   *       assert(fileInfo.isFile());
   */
  export function stat(filename: string): Promise<FileInfo>;
  /** Queries the file system for information on the path provided synchronously.
   * `statSync` Will always follow symlinks.
   *
   *       import { statSync } from "deno";
   *       const fileInfo = statSync("hello.txt");
   *       assert(fileInfo.isFile());
   */
  export function statSync(filename: string): FileInfo;

  // @url js/symlink.d.ts

  /** Synchronously creates `newname` as a symbolic link to `oldname`. The type
   * argument can be set to `dir` or `file` and is only available on Windows
   * (ignored on other platforms).
   *
   *       import { symlinkSync } from "deno";
   *       symlinkSync("old/name", "new/name");
   */
  export function symlinkSync(
    oldname: string,
    newname: string,
    type?: string
  ): void;
  /** Creates `newname` as a symbolic link to `oldname`. The type argument can be
   * set to `dir` or `file` and is only available on Windows (ignored on other
   * platforms).
   *
   *       import { symlink } from "deno";
   *       await symlink("old/name", "new/name");
   */
  export function symlink(
    oldname: string,
    newname: string,
    type?: string
  ): Promise<void>;

  // @url js/write_file.d.ts

  /** Write a new file, with given filename and data synchronously.
   *
   *       import { writeFileSync } from "deno";
   *
   *       const encoder = new TextEncoder("utf-8");
   *       const data = encoder.encode("Hello world\n");
   *       writeFileSync("hello.txt", data);
   */
  export function writeFileSync(
    filename: string,
    data: Uint8Array,
    perm?: number
  ): void;
  /** Write a new file, with given filename and data.
   *
   *       import { writeFile } from "deno";
   *
   *       const encoder = new TextEncoder("utf-8");
   *       const data = encoder.encode("Hello world\n");
   *       await writeFile("hello.txt", data);
   */
  export function writeFile(
    filename: string,
    data: Uint8Array,
    perm?: number
  ): Promise<void>;

  // @url out/debug/gen/msg_generated.ts

  export enum ErrorKind {
    NoError = 0,
    NotFound = 1,
    PermissionDenied = 2,
    ConnectionRefused = 3,
    ConnectionReset = 4,
    ConnectionAborted = 5,
    NotConnected = 6,
    AddrInUse = 7,
    AddrNotAvailable = 8,
    BrokenPipe = 9,
    AlreadyExists = 10,
    WouldBlock = 11,
    InvalidInput = 12,
    InvalidData = 13,
    TimedOut = 14,
    Interrupted = 15,
    WriteZero = 16,
    Other = 17,
    UnexpectedEof = 18,
    BadResource = 19,
    EmptyHost = 20,
    IdnaError = 21,
    InvalidPort = 22,
    InvalidIpv4Address = 23,
    InvalidIpv6Address = 24,
    InvalidDomainCharacter = 25,
    RelativeUrlWithoutBase = 26,
    RelativeUrlWithCannotBeABaseBase = 27,
    SetHostOnCannotBeABaseUrl = 28,
    Overflow = 29,
    HttpUser = 30,
    HttpClosed = 31,
    HttpCanceled = 32,
    HttpParse = 33,
    HttpOther = 34
  }

  // @url js/errors.d.ts

  /** A Deno specific error.  The `kind` property is set to a specific error code
   * which can be used to in application logic.
   *
   *     import { DenoError, ErrorKind } from "deno";
   *     try {
   *       somethingThatMightThrow();
   *     } catch (e) {
   *       if (e instanceof DenoError && e.kind === DenoError.Overflow) {
   *         console.error("Overflow error!");
   *       }
   *     }
   */
  export class DenoError<T extends ErrorKind> extends Error {
    readonly kind: T;
    constructor(kind: T, msg: string);
  }

  // @url js/types.d.ts

  type TypedArray = Uint8Array | Float32Array | Int32Array;
  interface CallSite {
    /** Value of `this` */
    getThis(): any;
    /** Type of `this` as a string.
     *
     * This is the name of the function stored in the constructor field of
     * `this`, if available.  Otherwise the object's `[[Class]]` internal
     * property.
     */
    getTypeName(): string | null;
    /** Current function. */
    getFunction(): Function | undefined;
    /** Name of the current function, typically its name property.
     *
     * If a name property is not available an attempt will be made to try
     * to infer a name from the function's context.
     */
    getFunctionName(): string | null;
    /** Name of the property (of `this` or one of its prototypes) that holds
     * the current function.
     */
    getMethodName(): string | null;
    /** Name of the script (if this function was defined in a script). */
    getFileName(): string | null;
    /** Get the script name or source URL for the source map. */
    getScriptNameOrSourceURL(): string;
    /** Current line number (if this function was defined in a script). */
    getLineNumber(): number | null;
    /** Current column number (if this function was defined in a script). */
    getColumnNumber(): number | null;
    /** A call site object representing the location where eval was called (if
     * this function was created using a call to `eval`)
     */
    getEvalOrigin(): string | undefined;
    /** Is this a top level invocation, that is, is `this` the global object? */
    isToplevel(): boolean;
    /** Does this call take place in code defined by a call to `eval`? */
    isEval(): boolean;
    /** Is this call in native V8 code? */
    isNative(): boolean;
    /** Is this a constructor call? */
    isConstructor(): boolean;
  }
  interface StartOfSourceMap {
    file?: string;
    sourceRoot?: string;
  }
  interface RawSourceMap extends StartOfSourceMap {
    version: string;
    sources: string[];
    names: string[];
    sourcesContent?: string[];
    mappings: string;
  }
  global {
    interface ErrorConstructor {
      /** Create `.stack` property on a target object */
      captureStackTrace(targetObject: object, constructorOpt?: Function): void;
      /**
       * Optional override for formatting stack traces
       *
       * @see https://github.com/v8/v8/wiki/Stack%20Trace%20API#customizing-stack-traces
       */
      prepareStackTrace?: (err: Error, stackTraces: CallSite[]) => any;
      stackTraceLimit: number;
    }
  }

  // @url js/libdeno.d.ts

  type MessageCallback = (msg: Uint8Array) => void;
  type PromiseRejectEvent =
    | "RejectWithNoHandler"
    | "HandlerAddedAfterReject"
    | "ResolveAfterResolved"
    | "RejectAfterResolved";
  interface Libdeno {
    recv(cb: MessageCallback): void;
    send(control: ArrayBufferView, data?: ArrayBufferView): null | Uint8Array;
    print(x: string, isErr?: boolean): void;
    setGlobalErrorHandler: (
      handler: (
        message: string,
        source: string,
        line: number,
        col: number,
        error: Error
      ) => void
    ) => void;
    setPromiseRejectHandler: (
      handler: (
        error: Error | string,
        event: PromiseRejectEvent,
        promise: Promise<any>
      ) => void
    ) => void;
    setPromiseErrorExaminer: (handler: () => boolean) => void;
    mainSource: string;
    mainSourceMap: RawSourceMap;
  }
  export const libdeno: Libdeno;
  export {};

  // @url js/platform.d.ts

  interface Platform {
    /** The operating system CPU architecture. */
    arch: "x64";
    /** The operating system platform. */
    os: "mac" | "win" | "linux";
  }
  export const platform: Platform;

  // @url js/trace.d.ts

  interface TraceInfo {
    sync: boolean;
    name: string;
  }
  /** Trace privileged operations executed inside a given function or promise.
   *
   * _Notice:_ To capture every operation in asynchronous `deno.*` calls,
   * you might want to put them in functions instead of directly invoking.
   *
   *       import { trace, mkdir } from "deno";
   *
   *       const ops = await trace(async () => {
   *         await mkdir("my_dir");
   *       });
   */
  export function trace(
    fnOrPromise: Function | Promise<any>
  ): Promise<TraceInfo[]>;

  // @url js/truncate.d.ts

  /** Truncates or extends the specified file synchronously, updating the size of
   * this file to become size.
   *
   *       import { truncateSync } from "deno";
   *
   *       truncateSync("hello.txt", 10);
   */
  export function truncateSync(name: string, len?: number): void;
  /**
   * Truncates or extends the specified file, updating the size of this file to
   * become size.
   *
   *       import { truncate } from "deno";
   *
   *       await truncate("hello.txt", 10);
   */
  export function truncate(name: string, len?: number): Promise<void>;

  // @url js/net.d.ts

  type Network = "tcp";
  type Addr = string;
  /** A Listener is a generic network listener for stream-oriented protocols. */
  export interface Listener {
    /** Waits for and resolves to the next connection to the `Listener`. */
    accept(): Promise<Conn>;
    /** Close closes the listener. Any pending accept promises will be rejected
     * with errors.
     */
    close(): void;
    /** Return the address of the `Listener`. */
    addr(): Addr;
  }
  export interface Conn extends Reader, Writer, Closer {
    /** The local address of the connection. */
    localAddr: string;
    /** The remote address of the connection. */
    remoteAddr: string;
    /** Shuts down (`shutdown(2)`) the reading side of the TCP connection. Most
     * callers should just use `close()`.
     */
    closeRead(): void;
    /** Shuts down (`shutdown(2)`) the writing side of the TCP connection. Most
     * callers should just use `close()`.
     */
    closeWrite(): void;
  }
  /** Listen announces on the local network address.
   *
   * The network must be `tcp`, `tcp4`, `tcp6`, `unix` or `unixpacket`.
   *
   * For TCP networks, if the host in the address parameter is empty or a literal
   * unspecified IP address, `listen()` listens on all available unicast and
   * anycast IP addresses of the local system. To only use IPv4, use network
   * `tcp4`. The address can use a host name, but this is not recommended,
   * because it will create a listener for at most one of the host's IP
   * addresses. If the port in the address parameter is empty or `0`, as in
   * `127.0.0.1:` or `[::1]:0`, a port number is automatically chosen. The
   * `addr()` method of `Listener` can be used to discover the chosen port.
   *
   * See `dial()` for a description of the network and address parameters.
   */
  export function listen(network: Network, address: string): Listener;
  /** Dial connects to the address on the named network.
   *
   * Supported networks are only `tcp` currently.
   *
   * TODO: `tcp4` (IPv4-only), `tcp6` (IPv6-only), `udp`, `udp4` (IPv4-only),
   * `udp6` (IPv6-only), `ip`, `ip4` (IPv4-only), `ip6` (IPv6-only), `unix`,
   * `unixgram` and `unixpacket`.
   *
   * For TCP and UDP networks, the address has the form `host:port`. The host must
   * be a literal IP address, or a host name that can be resolved to IP addresses.
   * The port must be a literal port number or a service name. If the host is a
   * literal IPv6 address it must be enclosed in square brackets, as in
   * `[2001:db8::1]:80` or `[fe80::1%zone]:80`. The zone specifies the scope of
   * the literal IPv6 address as defined in RFC 4007. The functions JoinHostPort
   * and SplitHostPort manipulate a pair of host and port in this form. When using
   * TCP, and the host resolves to multiple IP addresses, Dial will try each IP
   * address in order until one succeeds.
   *
   * Examples:
   *
   *     dial("tcp", "golang.org:http")
   *     dial("tcp", "192.0.2.1:http")
   *     dial("tcp", "198.51.100.1:80")
   *     dial("udp", "[2001:db8::1]:domain")
   *     dial("udp", "[fe80::1%lo0]:53")
   *     dial("tcp", ":80")
   */
  export function dial(network: Network, address: string): Promise<Conn>;
  /** **RESERVED** */
  export function connect(network: Network, address: string): Promise<Conn>;

  // @url js/metrics.d.ts

  interface Metrics {
    opsDispatched: number;
    opsCompleted: number;
    bytesSentControl: number;
    bytesSentData: number;
    bytesReceived: number;
  }
  /** Receive metrics from the privileged side of Deno. */
  export function metrics(): Metrics;
  export {};

  // @url js/deno.d.ts

  export const args: string[];
}

declare interface Window {
  window: Window;
  setTimeout: typeof timers.setTimeout;
  setInterval: typeof timers.setInterval;
  clearTimeout: typeof timers.clearTimer;
  clearInterval: typeof timers.clearTimer;
  console: console_.Console;
  TextEncoder: {
    (
      utfLabel?: string | undefined,
      options?: TextEncoding.TextEncoderOptions | undefined
    ): TextEncoder;
    new (
      utfLabel?: string | undefined,
      options?: TextEncoding.TextEncoderOptions | undefined
    ): TextEncoder;
    encoding: string;
  };
  TextDecoder: {
    (
      label?: string | undefined,
      options?: TextDecoderOptions | undefined
    ): TextDecoder;
    new (
      label?: string | undefined,
      options?: TextDecoderOptions | undefined
    ): TextDecoder;
    encoding: string;
  };
  atob: typeof textEncoding.atob;
  btoa: typeof textEncoding.btoa;
  URLSearchParams: typeof urlSearchParams.URLSearchParams;
  fetch: typeof fetch_.fetch;
  Headers: typeof fetch_.DenoHeaders;
  Blob: typeof blob.DenoBlob;
}

declare const window: Window;
declare const setTimeout: typeof timers.setTimeout;
declare const setInterval: typeof timers.setInterval;
declare const clearTimeout: typeof timers.clearTimer;
declare const clearInterval: typeof timers.clearTimer;
declare const console: console_.Console;
declare const TextEncoder: {
  (
    utfLabel?: string | undefined,
    options?: TextEncoding.TextEncoderOptions | undefined
  ): TextEncoder;
  new (
    utfLabel?: string | undefined,
    options?: TextEncoding.TextEncoderOptions | undefined
  ): TextEncoder;
  encoding: string;
};
declare const TextDecoder: {
  (
    label?: string | undefined,
    options?: TextDecoderOptions | undefined
  ): TextDecoder;
  new (
    label?: string | undefined,
    options?: TextDecoderOptions | undefined
  ): TextDecoder;
  encoding: string;
};
declare const atob: typeof textEncoding.atob;
declare const btoa: typeof textEncoding.btoa;
declare const URLSearchParams: typeof urlSearchParams.URLSearchParams;
declare const fetch: typeof fetch_.fetch;
declare const Headers: typeof fetch_.DenoHeaders;
declare const Blob: typeof blob.DenoBlob;

declare namespace domTypes {
  // @url js/dom_types.d.ts

  export type HeadersInit = Headers | string[][] | Record<string, string>;
  export type URLSearchParamsInit =
    | string
    | string[][]
    | Record<string, string>;
  type BodyInit =
    | Blob
    | BufferSource
    | FormData
    | URLSearchParams
    | ReadableStream
    | string;
  export type RequestInfo = Request | string;
  type ReferrerPolicy =
    | ""
    | "no-referrer"
    | "no-referrer-when-downgrade"
    | "origin-only"
    | "origin-when-cross-origin"
    | "unsafe-url";
  export type BlobPart = BufferSource | Blob | string;
  type FormDataEntryValue = File | string;
  export type EventListenerOrEventListenerObject =
    | EventListener
    | EventListenerObject;
  interface Element {}
  export interface HTMLFormElement {}
  type EndingType = "tranparent" | "native";
  export interface BlobPropertyBag {
    type?: string;
    ending?: EndingType;
  }
  interface AbortSignalEventMap {
    abort: ProgressEvent;
  }
  interface EventTarget {
    addEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject | null,
      options?: boolean | AddEventListenerOptions
    ): void;
    dispatchEvent(evt: Event): boolean;
    removeEventListener(
      type: string,
      listener?: EventListenerOrEventListenerObject | null,
      options?: EventListenerOptions | boolean
    ): void;
  }
  export interface ProgressEventInit extends EventInit {
    lengthComputable?: boolean;
    loaded?: number;
    total?: number;
  }
  export interface URLSearchParams {
    /**
     * Appends a specified key/value pair as a new search parameter.
     */
    append(name: string, value: string): void;
    /**
     * Deletes the given search parameter, and its associated value,
     * from the list of all search parameters.
     */
    delete(name: string): void;
    /**
     * Returns the first value associated to the given search parameter.
     */
    get(name: string): string | null;
    /**
     * Returns all the values association with a given search parameter.
     */
    getAll(name: string): string[];
    /**
     * Returns a Boolean indicating if such a search parameter exists.
     */
    has(name: string): boolean;
    /**
     * Sets the value associated to a given search parameter to the given value.
     * If there were several values, delete the others.
     */
    set(name: string, value: string): void;
    /**
     * Sort all key/value pairs contained in this object in place
     * and return undefined. The sort order is according to Unicode
     * code points of the keys.
     */
    sort(): void;
    /**
     * Returns a query string suitable for use in a URL.
     */
    toString(): string;
    /**
     * Iterates over each name-value pair in the query
     * and invokes the given function.
     */
    forEach(
      callbackfn: (value: string, key: string, parent: URLSearchParams) => void,
      thisArg?: any
    ): void;
  }
  interface EventListener {
    (evt: Event): void;
  }
  interface EventInit {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
  }
  interface Event {
    readonly bubbles: boolean;
    cancelBubble: boolean;
    readonly cancelable: boolean;
    readonly composed: boolean;
    readonly currentTarget: EventTarget | null;
    readonly defaultPrevented: boolean;
    readonly eventPhase: number;
    readonly isTrusted: boolean;
    returnValue: boolean;
    readonly srcElement: Element | null;
    readonly target: EventTarget | null;
    readonly timeStamp: number;
    readonly type: string;
    deepPath(): EventTarget[];
    initEvent(type: string, bubbles?: boolean, cancelable?: boolean): void;
    preventDefault(): void;
    stopImmediatePropagation(): void;
    stopPropagation(): void;
    readonly AT_TARGET: number;
    readonly BUBBLING_PHASE: number;
    readonly CAPTURING_PHASE: number;
    readonly NONE: number;
  }
  interface File extends Blob {
    readonly lastModified: number;
    readonly name: string;
  }
  export interface FilePropertyBag extends BlobPropertyBag {
    lastModified?: number;
  }
  interface ProgressEvent extends Event {
    readonly lengthComputable: boolean;
    readonly loaded: number;
    readonly total: number;
  }
  interface EventListenerOptions {
    capture?: boolean;
  }
  interface AddEventListenerOptions extends EventListenerOptions {
    once?: boolean;
    passive?: boolean;
  }
  interface AbortSignal extends EventTarget {
    readonly aborted: boolean;
    onabort: ((this: AbortSignal, ev: ProgressEvent) => any) | null;
    addEventListener<K extends keyof AbortSignalEventMap>(
      type: K,
      listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
      options?: boolean | AddEventListenerOptions
    ): void;
    addEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | AddEventListenerOptions
    ): void;
    removeEventListener<K extends keyof AbortSignalEventMap>(
      type: K,
      listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any,
      options?: boolean | EventListenerOptions
    ): void;
    removeEventListener(
      type: string,
      listener: EventListenerOrEventListenerObject,
      options?: boolean | EventListenerOptions
    ): void;
  }
  interface ReadableStream {
    readonly locked: boolean;
    cancel(): Promise<void>;
    getReader(): ReadableStreamReader;
  }
  interface EventListenerObject {
    handleEvent(evt: Event): void;
  }
  interface ReadableStreamReader {
    cancel(): Promise<void>;
    read(): Promise<any>;
    releaseLock(): void;
  }
  export interface FormData {
    append(name: string, value: string | Blob, fileName?: string): void;
    delete(name: string): void;
    get(name: string): FormDataEntryValue | null;
    getAll(name: string): FormDataEntryValue[];
    has(name: string): boolean;
    set(name: string, value: string | Blob, fileName?: string): void;
    forEach(
      callbackfn: (
        value: FormDataEntryValue,
        key: string,
        parent: FormData
      ) => void,
      thisArg?: any
    ): void;
  }
  /** A blob object represents a file-like object of immutable, raw data. */
  export interface Blob {
    /** The size, in bytes, of the data contained in the `Blob` object. */
    readonly size: number;
    /** A string indicating the media type of the data contained in the `Blob`.
     * If the type is unknown, this string is empty.
     */
    readonly type: string;
    /** Returns a new `Blob` object containing the data in the specified range of
     * bytes of the source `Blob`.
     */
    slice(start?: number, end?: number, contentType?: string): Blob;
  }
  interface Body {
    /** A simple getter used to expose a `ReadableStream` of the body contents. */
    readonly body: ReadableStream | null;
    /** Stores a `Boolean` that declares whether the body has been used in a
     * response yet.
     */
    readonly bodyUsed: boolean;
    /** Takes a `Response` stream and reads it to completion. It returns a promise
     * that resolves with an `ArrayBuffer`.
     */
    arrayBuffer(): Promise<ArrayBuffer>;
    /** Takes a `Response` stream and reads it to completion. It returns a promise
     * that resolves with a `Blob`.
     */
    blob(): Promise<Blob>;
    /** Takes a `Response` stream and reads it to completion. It returns a promise
     * that resolves with a `FormData` object.
     */
    formData(): Promise<FormData>;
    /** Takes a `Response` stream and reads it to completion. It returns a promise
     * that resolves with the result of parsing the body text as JSON.
     */
    json(): Promise<any>;
    /** Takes a `Response` stream and reads it to completion. It returns a promise
     * that resolves with a `USVString` (text).
     */
    text(): Promise<string>;
  }
  export interface Headers {
    /** Appends a new value onto an existing header inside a `Headers` object, or
     * adds the header if it does not already exist.
     */
    append(name: string, value: string): void;
    /** Deletes a header from a `Headers` object. */
    delete(name: string): void;
    /** Returns an iterator allowing to go through all key/value pairs
     * contained in this Headers object. The both the key and value of each pairs
     * are ByteString objects.
     */
    entries(): IterableIterator<[string, string]>;
    /** Returns a `ByteString` sequence of all the values of a header within a
     * `Headers` object with a given name.
     */
    get(name: string): string | null;
    /** Returns a boolean stating whether a `Headers` object contains a certain
     * header.
     */
    has(name: string): boolean;
    /** Returns an iterator allowing to go through all keys contained in
     * this Headers object. The keys are ByteString objects.
     */
    keys(): IterableIterator<string>;
    /** Sets a new value for an existing header inside a Headers object, or adds
     * the header if it does not already exist.
     */
    set(name: string, value: string): void;
    /** Returns an iterator allowing to go through all values contained in
     * this Headers object. The values are ByteString objects.
     */
    values(): IterableIterator<string>;
    forEach(
      callbackfn: (value: string, key: string, parent: Headers) => void,
      thisArg?: any
    ): void;
    /** The Symbol.iterator well-known symbol specifies the default
     * iterator for this Headers object
     */
    [Symbol.iterator](): IterableIterator<[string, string]>;
  }
  type RequestCache =
    | "default"
    | "no-store"
    | "reload"
    | "no-cache"
    | "force-cache"
    | "only-if-cached";
  type RequestCredentials = "omit" | "same-origin" | "include";
  type RequestDestination =
    | ""
    | "audio"
    | "audioworklet"
    | "document"
    | "embed"
    | "font"
    | "image"
    | "manifest"
    | "object"
    | "paintworklet"
    | "report"
    | "script"
    | "sharedworker"
    | "style"
    | "track"
    | "video"
    | "worker"
    | "xslt";
  type RequestMode = "navigate" | "same-origin" | "no-cors" | "cors";
  type RequestRedirect = "follow" | "error" | "manual";
  type ResponseType =
    | "basic"
    | "cors"
    | "default"
    | "error"
    | "opaque"
    | "opaqueredirect";
  export interface RequestInit {
    body?: BodyInit | null;
    cache?: RequestCache;
    credentials?: RequestCredentials;
    headers?: HeadersInit;
    integrity?: string;
    keepalive?: boolean;
    method?: string;
    mode?: RequestMode;
    redirect?: RequestRedirect;
    referrer?: string;
    referrerPolicy?: ReferrerPolicy;
    signal?: AbortSignal | null;
    window?: any;
  }
  export interface ResponseInit {
    headers?: HeadersInit;
    status?: number;
    statusText?: string;
  }
  export interface Request extends Body {
    /** Returns the cache mode associated with request, which is a string
     * indicating how the the request will interact with the browser's cache when
     * fetching.
     */
    readonly cache: RequestCache;
    /** Returns the credentials mode associated with request, which is a string
     * indicating whether credentials will be sent with the request always, never,
     * or only when sent to a same-origin URL.
     */
    readonly credentials: RequestCredentials;
    /** Returns the kind of resource requested by request, (e.g., `document` or
     * `script`).
     */
    readonly destination: RequestDestination;
    /** Returns a Headers object consisting of the headers associated with
     * request.
     *
     * Note that headers added in the network layer by the user agent
     * will not be accounted for in this object, (e.g., the `Host` header).
     */
    readonly headers: Headers;
    /** Returns request's subresource integrity metadata, which is a cryptographic
     * hash of the resource being fetched. Its value consists of multiple hashes
     * separated by whitespace. [SRI]
     */
    readonly integrity: string;
    /** Returns a boolean indicating whether or not request is for a history
     * navigation (a.k.a. back-foward navigation).
     */
    readonly isHistoryNavigation: boolean;
    /** Returns a boolean indicating whether or not request is for a reload
     * navigation.
     */
    readonly isReloadNavigation: boolean;
    /** Returns a boolean indicating whether or not request can outlive the global
     * in which it was created.
     */
    readonly keepalive: boolean;
    /** Returns request's HTTP method, which is `GET` by default. */
    readonly method: string;
    /** Returns the mode associated with request, which is a string indicating
     * whether the request will use CORS, or will be restricted to same-origin
     * URLs.
     */
    readonly mode: RequestMode;
    /** Returns the redirect mode associated with request, which is a string
     * indicating how redirects for the request will be handled during fetching.
     *
     * A request will follow redirects by default.
     */
    readonly redirect: RequestRedirect;
    /** Returns the referrer of request. Its value can be a same-origin URL if
     * explicitly set in init, the empty string to indicate no referrer, and
     * `about:client` when defaulting to the global's default.
     *
     * This is used during fetching to determine the value of the `Referer`
     * header of the request being made.
     */
    readonly referrer: string;
    /** Returns the referrer policy associated with request. This is used during
     * fetching to compute the value of the request's referrer.
     */
    readonly referrerPolicy: ReferrerPolicy;
    /** Returns the signal associated with request, which is an AbortSignal object
     * indicating whether or not request has been aborted, and its abort event
     * handler.
     */
    readonly signal: AbortSignal;
    /** Returns the URL of request as a string. */
    readonly url: string;
    clone(): Request;
  }
  export interface Response extends Body {
    /** Contains the `Headers` object associated with the response. */
    readonly headers: Headers;
    /** Contains a boolean stating whether the response was successful (status in
     * the range 200-299) or not.
     */
    readonly ok: boolean;
    /** Indicates whether or not the response is the result of a redirect; that
     * is, its URL list has more than one entry.
     */
    readonly redirected: boolean;
    /** Contains the status code of the response (e.g., `200` for a success). */
    readonly status: number;
    /** Contains the status message corresponding to the status code (e.g., `OK`
     * for `200`).
     */
    readonly statusText: string;
    readonly trailer: Promise<Headers>;
    /** Contains the type of the response (e.g., `basic`, `cors`). */
    readonly type: ResponseType;
    /** Contains the URL of the response. */
    readonly url: string;
    /** Creates a clone of a `Response` object. */
    clone(): Response;
  }
}

declare namespace blob {
  // @url js/blob.d.ts

  const bytesSymbol: unique symbol;
  export class DenoBlob implements domTypes.Blob {
    private readonly [bytesSymbol];
    readonly size: number;
    readonly type: string;
    /** A blob object represents a file-like object of immutable, raw data. */
    constructor(
      blobParts?: domTypes.BlobPart[],
      options?: domTypes.BlobPropertyBag
    );
    slice(start?: number, end?: number, contentType?: string): DenoBlob;
  }
}

declare namespace console_ {
  // @url js/console.d.ts

  export class Console {
    private printFunc;
    /** Writes the arguments to stdout */
    log: (...args: any[]) => void;
    /** Writes the arguments to stdout */
    debug: (...args: any[]) => void;
    /** Writes the arguments to stdout */
    info: (...args: any[]) => void;
    /** Writes the properties of the supplied `obj` to stdout */
    dir: (
      obj: any,
      options?: Partial<{
        showHidden: boolean;
        depth: number;
        colors: boolean;
      }>
    ) => void;
    /** Writes the arguments to stdout */
    warn: (...args: any[]) => void;
    /** Writes the arguments to stdout */
    error: (...args: any[]) => void;
    /** Writes an error message to stdout if the assertion is `false`. If the
     * assertion is `true`, nothing happens.
     */
    assert: (condition: boolean, ...args: any[]) => void;
  }
}

declare namespace fetch_ {
  // @url js/fetch.d.ts

  export class DenoHeaders implements domTypes.Headers {
    private headerMap;
    constructor(init?: domTypes.HeadersInit);
    private normalizeParams;
    append(name: string, value: string): void;
    delete(name: string): void;
    entries(): IterableIterator<[string, string]>;
    get(name: string): string | null;
    has(name: string): boolean;
    keys(): IterableIterator<string>;
    set(name: string, value: string): void;
    values(): IterableIterator<string>;
    forEach(
      callbackfn: (
        value: string,
        key: string,
        parent: domTypes.Headers
      ) => void,
      thisArg?: any
    ): void;
    [Symbol.iterator](): IterableIterator<[string, string]>;
  }
  /** Fetch a resource from the network. */
  export function fetch(
    input?: domTypes.Request | string,
    init?: domTypes.RequestInit
  ): Promise<domTypes.Response>;
}

type BufferSource = ArrayBufferView | ArrayBuffer;
interface TextDecodeOptions {
  stream?: boolean;
}
interface TextDecoderOptions {
  fatal?: boolean;
  ignoreBOM?: boolean;
}
interface TextDecoder {
  readonly encoding: string;
  readonly fatal: boolean;
  readonly ignoreBOM: boolean;
  decode(input?: BufferSource, options?: TextDecodeOptions): string;
}

declare namespace textEncoding {
  // @url js/text_encoding.d.ts

  export function atob(s: string): string;
  /** Creates a base-64 ASCII string from the input string. */
  export function btoa(s: string): string;
}

declare namespace timers {
  // @url js/timers.d.ts

  export function setTimeout<Args extends Array<unknown>>(
    cb: (...args: Args) => void,
    delay: number,
    ...args: Args
  ): number;
  /** Repeatedly calls a function , with a fixed time delay between each call. */
  export function setInterval<Args extends Array<unknown>>(
    cb: (...args: Args) => void,
    delay: number,
    ...args: Args
  ): number;
  /** Clears a previously set timer by id. */
  export function clearTimer(id: number): void;
}

declare namespace urlSearchParams {
  // @url js/url_search_params.d.ts

  export class URLSearchParams {
    private params;
    constructor(init?: string | string[][] | Record<string, string>);
    /** Appends a specified key/value pair as a new search parameter.
     *
     *       searchParams.append('name', 'first');
     *       searchParams.append('name', 'second');
     */
    append(name: string, value: string): void;
    /** Deletes the given search parameter and its associated value,
     * from the list of all search parameters.
     *
     *       searchParams.delete('name');
     */
    delete(name: string): void;
    /** Returns all the values associated with a given search parameter
     * as an array.
     *
     *       searchParams.getAll('name');
     */
    getAll(name: string): string[];
    /** Returns the first value associated to the given search parameter.
     *
     *       searchParams.get('name');
     */
    get(name: string): string | null;
    /** Returns a Boolean that indicates whether a parameter with the
     * specified name exists.
     *
     *       searchParams.has('name');
     */
    has(name: string): boolean;
    /** Sets the value associated with a given search parameter to the
     * given value. If there were several matching values, this method
     * deletes the others. If the search parameter doesn't exist, this
     * method creates it.
     *
     *       searchParams.set('name', 'value');
     */
    set(name: string, value: string): void;
    /** Sort all key/value pairs contained in this object in place and
     * return undefined. The sort order is according to Unicode code
     * points of the keys.
     *
     *       searchParams.sort();
     */
    sort(): void;
    /** Calls a function for each element contained in this object in
     * place and return undefined. Optionally accepts an object to use
     * as this when executing callback as second argument.
     *
     *       searchParams.forEach((value, key, parent) => {
     *         console.log(value, key, parent);
     *       });
     *
     */
    forEach(
      callbackfn: (value: string, key: string, parent: URLSearchParams) => void,
      thisArg?: any
    ): void;
    /** Returns an iterator allowing to go through all keys contained
     * in this object.
     *
     *       for (const key of searchParams.keys()) {
     *         console.log(key);
     *       }
     */
    keys(): Iterable<string>;
    /** Returns an iterator allowing to go through all values contained
     * in this object.
     *
     *       for (const value of searchParams.values()) {
     *         console.log(value);
     *       }
     */
    values(): Iterable<string>;
    /** Returns an iterator allowing to go through all key/value
     * pairs contained in this object.
     *
     *       for (const [key, value] of searchParams.entries()) {
     *         console.log(key, value);
     *       }
     */
    entries(): Iterable<[string, string]>;
    /** Returns an iterator allowing to go through all key/value
     * pairs contained in this object.
     *
     *       for (const [key, value] of searchParams[Symbol.iterator]()) {
     *         console.log(key, value);
     *       }
     */
    [Symbol.iterator](): Iterable<[string, string]>;
    /** Returns a query string suitable for use in a URL.
     *
     *        searchParams.toString();
     */
    toString(): string;
  }
}
