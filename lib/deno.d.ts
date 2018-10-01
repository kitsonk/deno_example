// Copyright 2018 the Deno authors. All rights reserved. MIT license.

// Note that `@internal/*` modules are internal to Deno and can only be used
// for their type information.

/// <reference no-default-lib="true" />
/// <reference lib="esnext" />

declare module "globals" {
  // @source js/globals.ts

  import * as timers from "@internal/timers";
  import * as textEncoding from "@internal/text_encoding";
  import * as fetch_ from "@internal/fetch";
  import * as console from "@internal/console";
  import * as blob from "@internal/blob";
  interface Window {
    window: Window;
    setTimeout: typeof timers.setTimeout;
    setInterval: typeof timers.setInterval;
    clearTimeout: typeof timers.clearTimer;
    clearInterval: typeof timers.clearTimer;
    console: console.Console;
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
    fetch: typeof fetch_.fetch;
    Headers: typeof fetch_.DenoHeaders;
    Blob: typeof blob.DenoBlob;
  }

  global {
    const window: Window;
    const setTimeout: typeof timers.setTimeout;
    const setInterval: typeof timers.setInterval;
    const clearTimeout: typeof timers.clearTimer;
    const clearInterval: typeof timers.clearTimer;
    const console: console.Console;
    const TextEncoder: {
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
    const TextDecoder: {
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
    const atob: typeof textEncoding.atob;
    const btoa: typeof textEncoding.btoa;
    const fetch: typeof fetch_.fetch;
    const Headers: typeof fetch_.DenoHeaders;
    const Blob: typeof blob.DenoBlob;
  }
}

declare module "@internal/dom_types" {
  // @source js/dom_types.d.ts

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
  export interface Blob {
    readonly size: number;
    readonly type: string;
    slice(start?: number, end?: number, contentType?: string): Blob;
  }
  interface Body {
    readonly body: ReadableStream | null;
    readonly bodyUsed: boolean;
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    json(): Promise<any>;
    text(): Promise<string>;
  }
  export interface Headers {
    append(name: string, value: string): void;
    delete(name: string): void;
    get(name: string): string | null;
    has(name: string): boolean;
    set(name: string, value: string): void;
    forEach(
      callbackfn: (value: string, key: string, parent: Headers) => void,
      thisArg?: any
    ): void;
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
    /**
     * Returns the cache mode associated with request,
     * which is a string indicating how the the request will interact
     * with the browser's cache when fetching.
     */
    readonly cache: RequestCache;
    /**
     * Returns the credentials mode associated with request, which is a string
     * indicating whether credentials will be sent with the request always, never,
     * or only when sent to a same-origin URL.
     */
    readonly credentials: RequestCredentials;
    /**
     * Returns the kind of resource requested by request, e.g., "document" or
     * "script".
     */
    readonly destination: RequestDestination;
    /**
     * Returns a Headers object consisting of the headers associated with request.
     * Note that headers added in the network layer by the user agent
     * will not be accounted for in this object, e.g., the "Host" header.
     */
    readonly headers: Headers;
    /**
     * Returns request's subresource integrity metadata,
     * which is a cryptographic hash of the resource being fetched.
     * Its value consists of multiple hashes separated by whitespace. [SRI]
     */
    readonly integrity: string;
    /**
     * Returns a boolean indicating whether or not request is for a history
     * navigation (a.k.a. back-foward navigation).
     */
    readonly isHistoryNavigation: boolean;
    /**
     * Returns a boolean indicating whether or not requestis for a
     * reload navigation.
     */
    readonly isReloadNavigation: boolean;
    /**
     * Returns a boolean indicating whether or not request can outlive
     * the global in which it was created.
     */
    readonly keepalive: boolean;
    /**
     * Returns request's HTTP method, which is "GET" by default.
     */
    readonly method: string;
    /**
     * Returns the mode associated with request, which is a string
     * indicating whether the request will use CORS, or will be
     * restricted to same-origin URLs.
     */
    readonly mode: RequestMode;
    /**
     * Returns the redirect mode associated with request, which is a string
     * indicating how redirects for the request will be handled during fetching.
     * A request will follow redirects by default.
     */
    readonly redirect: RequestRedirect;
    /**
     * Returns the referrer of request. Its value can be a same-origin URL if
     * explicitly set in init, the empty string to indicate no referrer, and
     * "about:client" when defaulting to the global's default.
     * This is used during fetching to determine the value of the `Referer`
     * header of the request being made.
     */
    readonly referrer: string;
    /**
     * Returns the referrer policy associated with request. This is used during
     * fetching to compute the value of the request's referrer.
     */
    readonly referrerPolicy: ReferrerPolicy;
    /**
     * Returns the signal associated with request, which is an AbortSignal
     * object indicating whether or not request has been aborted,
     * and its abort event handler.
     */
    readonly signal: AbortSignal;
    /**
     * Returns the URL of request as a string.
     */
    readonly url: string;
    clone(): Request;
  }
  export interface Response extends Body {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly trailer: Promise<Headers>;
    readonly type: ResponseType;
    readonly url: string;
    clone(): Response;
  }
  export {};
}

declare module "@internal/blob" {
  // @source js/blob.d.ts

  import { Blob, BlobPart, BlobPropertyBag } from "@internal/dom_types";
  const bytesSymbol: unique symbol;
  export class DenoBlob implements Blob {
    private readonly [bytesSymbol];
    readonly size: number;
    readonly type: string;
    constructor(blobParts?: BlobPart[], options?: BlobPropertyBag);
    slice(start?: number, end?: number, contentType?: string): DenoBlob;
  }
  export {};
}

declare module "@internal/console" {
  // @source js/console.d.ts

  export class Console {
    private printFunc;
    log(...args: any[]): void;
    debug: (...args: any[]) => void;
    info: (...args: any[]) => void;
    warn(...args: any[]): void;
    error: (...args: any[]) => void;
    assert(condition: boolean, ...args: any[]): void;
  }
}

declare module "@internal/fetch" {
  // @source js/fetch.d.ts

  import {
    Headers,
    Request,
    Response,
    RequestInit,
    HeadersInit
  } from "@internal/dom_types";
  export class DenoHeaders implements Headers {
    private headerMap;
    constructor(init?: HeadersInit);
    private normalizeParams;
    append(name: string, value: string): void;
    delete(name: string): void;
    get(name: string): string | null;
    has(name: string): boolean;
    set(name: string, value: string): void;
    forEach(
      callbackfn: (value: string, key: string, parent: Headers) => void,
      thisArg?: any
    ): void;
  }
  export function fetch(
    input?: Request | string,
    init?: RequestInit
  ): Promise<Response>;
}

declare module "@internal/text_encoding" {
  // @source js/text_encoding.d.ts

  export function atob(s: string): string;
  export function btoa(s: string): string;
  global {
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
  }
  export { TextEncoder, TextDecoder } from "text-encoding";
}

declare module "@internal/timers" {
  // @source js/timers.d.ts

  export type TimerCallback = (...args: any[]) => void;
  export function setGlobalTimeout(timeout: number): void;
  export function setTimeout(
    cb: TimerCallback,
    delay: number,
    ...args: any[]
  ): number;
  export function setInterval(
    cb: TimerCallback,
    delay: number,
    ...args: any[]
  ): number;
  export function clearTimer(id: number): void;
}

declare module "@internal/generated" {
  // @source out/debug/gen/msg_generated.d.ts

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
    BadFileDescriptor = 19,
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
}

declare module "@internal/os" {
  // @source js/os.d.ts

  export function exit(exitCode?: number): never;
  /**
   * Returns a snapshot of the environment variables at invocation. Mutating a
   * property in the object will set that variable in the environment for
   * the process. The environment object will only accept `string`s or `number`s
   * as values.
   *     import { env } from "deno";
   *
   *     const myEnv = env();
   *     console.log(myEnv.SHELL);
   *     myEnv.TEST_VAR = "HELLO";
   *     const newEnv = env();
   *     console.log(myEnv.TEST_VAR == newEnv.TEST_VAR);
   */
  export function env(): {
    [index: string]: string;
  };
}

declare module "@internal/io" {
  // @source js/io.d.ts

  export interface ReadResult {
    nread: number;
    eof: boolean;
  }
  export interface Reader {
    read(p: ArrayBufferView): Promise<ReadResult>;
  }
  export interface Writer {
    write(p: ArrayBufferView): Promise<number>;
  }
  export interface Closer {
    close(): void;
  }
  export interface Seeker {
    seek(offset: number, whence: number): Promise<void>;
  }
  export interface ReaderCloser extends Reader, Closer {}
  export interface WriteCloser extends Writer, Closer {}
  export interface ReadSeeker extends Reader, Seeker {}
  export interface WriteSeeker extends Writer, Seeker {}
  export interface ReadWriteCloser extends Reader, Writer, Closer {}
  export interface ReadWriteSeeker extends Reader, Writer, Seeker {}
  export function copy(dst: Writer, src: Reader): Promise<number>;
}

declare module "@internal/files" {
  // @source js/files.d.ts

  import { Reader, Writer, Closer, ReadResult } from "@internal/io";
  export class File implements Reader, Writer, Closer {
    readonly fd: number;
    constructor(fd: number);
    write(p: ArrayBufferView): Promise<number>;
    read(p: ArrayBufferView): Promise<ReadResult>;
    close(): void;
  }
  export const stdin: File;
  export const stdout: File;
  export const stderr: File;
  export type OpenMode = "r" | "w" | "w+" | "x";
  export function create(filename: string): Promise<File>;
  export function open(filename: string, mode?: OpenMode): Promise<File>;
  export function read(fd: number, p: ArrayBufferView): Promise<ReadResult>;
  export function write(fd: number, p: ArrayBufferView): Promise<number>;
  export function close(fd: number): void;
}

declare module "@internal/mkdir" {
  // @source js/mkdir.d.ts

  export function mkdirSync(path: string, mode?: number): void;
  /**
   * Creates a new directory with the specified path and permission.
   *
   *     import { mkdir } from "deno";
   *     await mkdir("new_dir");
   */
  export function mkdir(path: string, mode?: number): Promise<void>;
}

declare module "@internal/make_temp_dir" {
  // @source js/make_temp_dir.d.ts

  export interface MakeTempDirOptions {
    dir?: string;
    prefix?: string;
    suffix?: string;
  }
  /**
   * makeTempDirSync is the synchronous version of `makeTempDir`.
   *
   *     import { makeTempDirSync } from "deno";
   *     const tempDirName0 = makeTempDirSync();
   *     const tempDirName1 = makeTempDirSync({ prefix: 'my_temp' });
   */
  export function makeTempDirSync(options?: MakeTempDirOptions): string;
  /**
   * makeTempDir creates a new temporary directory in the directory `dir`, its
   * name beginning with `prefix` and ending with `suffix`.
   * It returns the full path to the newly created directory.
   * If `dir` is unspecified, tempDir uses the default directory for temporary
   * files. Multiple programs calling tempDir simultaneously will not choose the
   * same directory. It is the caller's responsibility to remove the directory
   * when no longer needed.
   *
   *     import { makeTempDir } from "deno";
   *     const tempDirName0 = await makeTempDir();
   *     const tempDirName1 = await makeTempDir({ prefix: 'my_temp' });
   */
  export function makeTempDir(options?: MakeTempDirOptions): Promise<string>;
}

declare module "@internal/remove" {
  // @source js/remove.d.ts

  export function removeSync(path: string): void;
  /**
   * Removes the named file or (empty) directory.
   * Would throw error if permission denied, not found, or
   * directory not empty.
   *
   *     import { remove } from "deno";
   *     await remove("/path/to/empty_dir/or/file");
   */
  export function remove(path: string): Promise<void>;
  /**
   * Recursively removes the named file or directory synchronously.
   * Would throw error if permission denied or not found
   *
   *     import { removeAllSync } from "deno";
   *     removeAllSync("/path/to/dir/or/file");
   */
  export function removeAllSync(path: string): void;
  /**
   * Recursively removes the named file or directory.
   * Would throw error if permission denied or not found
   *
   *     import { removeAll } from "deno";
   *     await removeAll("/path/to/dir/or/file");
   */
  export function removeAll(path: string): Promise<void>;
}

declare module "@internal/rename" {
  // @source js/rename.d.ts

  export function renameSync(oldpath: string, newpath: string): void;
  /**
   * Renames (moves) oldpath to newpath. If newpath already exists
   * and is not a directory, Rename replaces it. OS-specific restrictions may
   * apply when oldpath and newpath are in different directories.
   *
   *     import { rename } from "deno";
   *     await rename("old/path", "new/path");
   */
  export function rename(oldpath: string, newpath: string): Promise<void>;
}

declare module "@internal/read_file" {
  // @source js/read_file.d.ts

  export function readFileSync(filename: string): Uint8Array;
  /**
   * Read the entire contents of a file.
   *
   *     import { readFile } from "deno";
   *     const decoder = new TextDecoder("utf-8");
   *     const data = await readFile("hello.txt");
   *     console.log(decoder.decode(data));
   */
  export function readFile(filename: string): Promise<Uint8Array>;
}

declare module "@internal/read_link" {
  // @source js/read_link.d.ts

  export function readlinkSync(name: string): string;
  /**
   * Returns the destination of the named symbolic link.
   *
   *     import { readlink } from "deno";
   *     const targetPath = await readlink("symlink/path");
   */
  export function readlink(name: string): Promise<string>;
}

declare module "@internal/stat" {
  // @source js/stat.d.ts

  export interface FileInfo {
    readonly _isFile: boolean;
    readonly _isSymlink: boolean;
    /** The size of the file, in bytes. */
    len: number;
    /**
     * The last modification time of the file. This corresponds to the `mtime`
     * field from `stat` on Unix and `ftLastWriteTime` on Windows. This may not
     * be available on all platforms.
     */
    modified: number | null;
    /**
     * The last access time of the file. This corresponds to the `atime`
     * field from `stat` on Unix and `ftLastAccessTime` on Windows. This may not
     * be available on all platforms.
     */
    accessed: number | null;
    /**
     * The last access time of the file. This corresponds to the `birthtime`
     * field from `stat` on Unix and `ftCreationTime` on Windows. This may not
     * be available on all platforms.
     */
    created: number | null;
    /**
     * The underlying raw st_mode bits that contain the standard Unix permissions
     * for this file/directory. TODO Match behavior with Go on windows for mode.
     */
    mode: number | null;
    /**
     * Returns whether this is info for a regular file. This result is mutually
     * exclusive to `FileInfo.isDirectory` and `FileInfo.isSymlink`.
     */
    isFile(): boolean;
    /**
     * Returns whether this is info for a regular directory. This result is
     * mutually exclusive to `FileInfo.isFile` and `FileInfo.isSymlink`.
     */
    isDirectory(): boolean;
    /**
     * Returns whether this is info for a symlink. This result is
     * mutually exclusive to `FileInfo.isFile` and `FileInfo.isDirectory`.
     */
    isSymlink(): boolean;
  }
  /**
   * Queries the file system for information on the path provided.
   * If the given path is a symlink information about the symlink will
   * be returned.
   *
   *     import { lstat } from "deno";
   *     const fileInfo = await lstat("hello.txt");
   *     assert(fileInfo.isFile());
   */
  export function lstat(filename: string): Promise<FileInfo>;
  /**
   * Queries the file system for information on the path provided synchronously.
   * If the given path is a symlink information about the symlink will
   * be returned.
   *
   *     import { lstatSync } from "deno";
   *     const fileInfo = lstatSync("hello.txt");
   *     assert(fileInfo.isFile());
   */
  export function lstatSync(filename: string): FileInfo;
  /**
   * Queries the file system for information on the path provided.
   * `stat` Will always follow symlinks.
   *
   *     import { stat } from "deno";
   *     const fileInfo = await stat("hello.txt");
   *     assert(fileInfo.isFile());
   */
  export function stat(filename: string): Promise<FileInfo>;
  /**
   * Queries the file system for information on the path provided synchronously.
   * `statSync` Will always follow symlinks.
   *
   *     import { statSync } from "deno";
   *     const fileInfo = statSync("hello.txt");
   *     assert(fileInfo.isFile());
   */
  export function statSync(filename: string): FileInfo;
}

declare module "@internal/symlink" {
  // @source js/symlink.d.ts

  export function symlinkSync(
    oldname: string,
    newname: string,
    type?: string
  ): void;
  /**
   * Creates newname as a symbolic link to oldname.
   * The type argument can be set to 'dir' or 'file' and is only
   * available on Windows (ignored on other platforms).
   *
   *     import { symlink } from "deno";
   *     await symlink("old/name", "new/name");
   */
  export function symlink(
    oldname: string,
    newname: string,
    type?: string
  ): Promise<void>;
}

declare module "@internal/write_file" {
  // @source js/write_file.d.ts

  export function writeFileSync(
    filename: string,
    data: Uint8Array,
    perm?: number
  ): void;
  /**
   * Write a new file, with given filename and data.
   *
   *     import { writeFile } from "deno";
   *
   *     const encoder = new TextEncoder("utf-8");
   *     const data = encoder.encode("Hello world\n");
   *     await writeFile("hello.txt", data);
   */
  export function writeFile(
    filename: string,
    data: Uint8Array,
    perm?: number
  ): Promise<void>;
}

declare module "@internal/errors" {
  // @source js/errors.d.ts

  import { ErrorKind } from "@internal/generated";
  export { ErrorKind } from "@internal/generated";
  export class DenoError<T extends ErrorKind> extends Error {
    readonly kind: T;
    constructor(kind: T, msg: string);
  }
}

declare module "@internal/types" {
  // @source js/types.d.ts

  export type TypedArray = Uint8Array | Float32Array | Int32Array;
  export interface CallSite {
    /**
     * Value of "this"
     */
    getThis(): any;
    /**
     * Type of "this" as a string.
     * This is the name of the function stored in the constructor field of
     * "this", if available.  Otherwise the object's [[Class]] internal
     * property.
     */
    getTypeName(): string | null;
    /**
     * Current function
     */
    getFunction(): Function | undefined;
    /**
     * Name of the current function, typically its name property.
     * If a name property is not available an attempt will be made to try
     * to infer a name from the function's context.
     */
    getFunctionName(): string | null;
    /**
     * Name of the property [of "this" or one of its prototypes] that holds
     * the current function
     */
    getMethodName(): string | null;
    /**
     * Name of the script [if this function was defined in a script]
     */
    getFileName(): string | null;
    /**
     * Get the script name or source URL for the source map
     */
    getScriptNameOrSourceURL(): string;
    /**
     * Current line number [if this function was defined in a script]
     */
    getLineNumber(): number | null;
    /**
     * Current column number [if this function was defined in a script]
     */
    getColumnNumber(): number | null;
    /**
     * A call site object representing the location where eval was called
     * [if this function was created using a call to eval]
     */
    getEvalOrigin(): string | undefined;
    /**
     * Is this a toplevel invocation, that is, is "this" the global object?
     */
    isToplevel(): boolean;
    /**
     * Does this call take place in code defined by a call to eval?
     */
    isEval(): boolean;
    /**
     * Is this call in native V8 code?
     */
    isNative(): boolean;
    /**
     * Is this a constructor call?
     */
    isConstructor(): boolean;
  }
  export interface StartOfSourceMap {
    file?: string;
    sourceRoot?: string;
  }
  export interface RawSourceMap extends StartOfSourceMap {
    version: string;
    sources: string[];
    names: string[];
    sourcesContent?: string[];
    mappings: string;
  }
  global {
    interface ErrorConstructor {
      /** Create .stack property on a target object */
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
  export type DenoArch =
    | "arm"
    | "arm64"
    | "ia32"
    | "mips"
    | "mipsel"
    | "ppc"
    | "ppc64"
    | "s390"
    | "s390x"
    | "x32"
    | "x64"
    | "unknown";
  export type DenoPlatform =
    | "aix"
    | "darwin"
    | "freebsd"
    | "linux"
    | "openbsd"
    | "sunos"
    | "win32"
    | "android"
    | "unknown";
}

declare module "@internal/libdeno" {
  // @source js/libdeno.d.ts

  import { RawSourceMap } from "@internal/types";
  type MessageCallback = (msg: Uint8Array) => void;
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
    mainSource: string;
    mainSourceMap: RawSourceMap;
  }
  export const libdeno: Libdeno;
  export {};
}

declare module "@internal/platform" {
  // @source js/platform.d.ts

  import { DenoArch, DenoPlatform } from "@internal/types";
  export const arch: DenoArch;
  export const platform: DenoPlatform;
}

declare module "@internal/trace" {
  // @source js/trace.d.ts

  export interface TraceInfo {
    sync: boolean;
    name: string;
  }
  /**
   * Trace operations executed inside a given function or promise.
   * Notice: To capture every operation in asynchronous deno.* calls,
   * you might want to put them in functions instead of directly invoking.
   *
   *     import { trace, mkdir } from "deno";
   *
   *     const ops = await trace(async () => {
   *       await mkdir("my_dir");
   *     });
   *     // ops becomes [{ sync: false, name: "Mkdir" }]
   */
  export function trace(
    fnOrPromise: Function | Promise<any>
  ): Promise<TraceInfo[]>;
}

declare module "@internal/truncate" {
  // @source js/truncate.d.ts

  export function truncateSync(name: string, len?: number): void;
  /**
   * Truncates or extends the specified file,
   * updating the size of this file to become size.
   *
   *     import { truncate } from "deno";
   *
   *     await truncate("hello.txt", 10);
   */
  export function truncate(name: string, len?: number): Promise<void>;
}

declare module "deno" {
  // @source js/deno.d.ts

  export { env, exit } from "@internal/os";
  export {
    File,
    open,
    stdin,
    stdout,
    stderr,
    read,
    write,
    close
  } from "@internal/files";
  export { copy, Reader, Writer } from "@internal/io";
  export { mkdirSync, mkdir } from "@internal/mkdir";
  export { makeTempDirSync, makeTempDir } from "@internal/make_temp_dir";
  export {
    removeSync,
    remove,
    removeAllSync,
    removeAll
  } from "@internal/remove";
  export { renameSync, rename } from "@internal/rename";
  export { readFileSync, readFile } from "@internal/read_file";
  export { readlinkSync, readlink } from "@internal/read_link";
  export { FileInfo, statSync, lstatSync, stat, lstat } from "@internal/stat";
  export { symlinkSync, symlink } from "@internal/symlink";
  export { writeFileSync, writeFile } from "@internal/write_file";
  export { ErrorKind, DenoError } from "@internal/errors";
  export { libdeno } from "@internal/libdeno";
  export { arch, platform } from "@internal/platform";
  export { trace } from "@internal/trace";
  export { truncateSync, truncate } from "@internal/truncate";
  export { setGlobalTimeout } from "@internal/timers";
  export const args: string[];
}

declare module "compiler" {
  // @source js/compiler.d.ts

  import * as ts from "typescript";
  export type AmdFactory = (...args: any[]) => object | void;
  export type AmdDefine = (
    deps: ModuleSpecifier[],
    factory: AmdFactory
  ) => void;
  /**
   * The location that a module is being loaded from. This could be a directory,
   * like `.`, or it could be a module specifier like
   * `http://gist.github.com/somefile.ts`
   */
  type ContainingFile = string;
  /**
   * The internal local filename of a compiled module. It will often be something
   * like `/home/ry/.deno/gen/f7b4605dfbc4d3bb356e98fda6ceb1481e4a8df5.js`
   */
  type ModuleFileName = string;
  /**
   * The original resolved resource name.
   * Path to cached module file or URL from which dependency was retrieved
   */
  type ModuleId = string;
  /**
   * The external name of a module - could be a URL or could be a relative path.
   * Examples `http://gist.github.com/somefile.ts` or `./somefile.ts`
   */
  type ModuleSpecifier = string;
  /**
   * The compiled source code which is cached in `.deno/gen/`
   */
  type OutputCode = string;
  /**
   * The original source code
   */
  type SourceCode = string;
  /**
   * A simple object structure for caching resolved modules and their contents.
   *
   * Named `ModuleMetaData` to clarify it is just a representation of meta data of
   * the module, not the actual module instance.
   */
  export class ModuleMetaData implements ts.IScriptSnapshot {
    readonly moduleId: ModuleId;
    readonly fileName: ModuleFileName;
    readonly sourceCode: SourceCode;
    outputCode: OutputCode;
    deps?: ModuleFileName[];
    readonly exports: {};
    factory?: AmdFactory;
    gatheringDeps: boolean;
    hasRun: boolean;
    scriptVersion: string;
    constructor(
      moduleId: ModuleId,
      fileName: ModuleFileName,
      sourceCode?: SourceCode,
      outputCode?: OutputCode
    );
    getText(start: number, end: number): string;
    getLength(): number;
    getChangeRange(): undefined;
  }
  /**
   * A singleton class that combines the TypeScript Language Service host API
   * with Deno specific APIs to provide an interface for compiling and running
   * TypeScript and JavaScript modules.
   */
  export class DenoCompiler
    implements ts.LanguageServiceHost, ts.FormatDiagnosticsHost {
    private readonly _fileNamesMap;
    private _globalEval;
    private _log;
    private readonly _moduleMetaDataMap;
    private readonly _options;
    private _os;
    private _runQueue;
    private _scriptFileNames;
    private _service;
    private _ts;
    private _window;
    recompile: boolean;
    /**
     * Drain the run queue, retrieving the arguments for the module
     * factory and calling the module's factory.
     */
    private _drainRunQueue;
    /**
     * Get the dependencies for a given module, but don't run the module,
     * just add the module factory to the run queue.
     */
    private _gatherDependencies;
    /**
     * Retrieve the arguments to pass a module's factory function.
     */
    private _getFactoryArguments;
    /**
     * The TypeScript language service often refers to the resolved fileName of
     * a module, this is a shortcut to avoid unnecessary module resolution logic
     * for modules that may have been initially resolved by a `moduleSpecifier`
     * and `containingFile`.  Also, `resolveModule()` throws when the module
     * cannot be resolved, which isn't always valid when dealing with the
     * TypeScript compiler, but the TypeScript compiler shouldn't be asking about
     * external modules that we haven't told it about yet.
     */
    private _getModuleMetaData;
    /**
     * Create a localized AMD `define` function and return it.
     */
    private _makeDefine;
    /**
     * Returns a require that specifically handles the resolution of a transpiled
     * emit of a dynamic ES `import()` from TypeScript.
     */
    private _makeLocalRequire;
    /**
     * Given a `moduleSpecifier` and `containingFile` retrieve the cached
     * `fileName` for a given module.  If the module has yet to be resolved
     * this will return `undefined`.
     */
    private _resolveFileName;
    /**
     * Resolve the `fileName` for a given `moduleSpecifier` and `containingFile`
     */
    private _resolveModuleName;
    /**
     * Caches the resolved `fileName` in relationship to the `moduleSpecifier`
     * and `containingFile` in order to reduce calls to the privileged side
     * to retrieve the contents of a module.
     */
    private _setFileName;
    /**
     * Setup being able to map back source references back to their source
     *
     * TODO is this the best place for this?  It is tightly coupled to how the
     * compiler works, but it is also tightly coupled to how the whole runtime
     * environment is bootstrapped.  It also needs efficient access to the
     * `outputCode` of the module information, which exists inside of the
     * compiler instance.
     */
    private _setupSourceMaps;
    private constructor();
    /**
     * Retrieve the output of the TypeScript compiler for a given module and
     * cache the result. Re-compilation can be forced using '--recompile' flag.
     */
    compile(moduleMetaData: ModuleMetaData): OutputCode;
    /**
     * For a given module specifier and containing file, return a list of absolute
     * identifiers for dependent modules that are required by this module.
     */
    getModuleDependencies(
      moduleSpecifier: ModuleSpecifier,
      containingFile: ContainingFile
    ): ModuleFileName[];
    /**
     * Given a `moduleSpecifier` and `containingFile`, resolve the module and
     * return the `ModuleMetaData`.
     */
    resolveModule(
      moduleSpecifier: ModuleSpecifier,
      containingFile: ContainingFile
    ): ModuleMetaData;
    /**
     * Load and run a module and all of its dependencies based on a module
     * specifier and a containing file
     */
    run(
      moduleSpecifier: ModuleSpecifier,
      containingFile: ContainingFile
    ): ModuleMetaData;
    getCanonicalFileName(fileName: string): string;
    getCompilationSettings(): ts.CompilerOptions;
    getNewLine(): string;
    getScriptFileNames(): string[];
    getScriptKind(fileName: ModuleFileName): ts.ScriptKind;
    getScriptVersion(fileName: ModuleFileName): string;
    getScriptSnapshot(fileName: ModuleFileName): ts.IScriptSnapshot | undefined;
    getCurrentDirectory(): string;
    getDefaultLibFileName(): string;
    useCaseSensitiveFileNames(): boolean;
    readFile(path: string): string | undefined;
    fileExists(fileName: string): boolean;
    resolveModuleNames(
      moduleNames: ModuleSpecifier[],
      containingFile: ContainingFile
    ): ts.ResolvedModule[];
    /**
     * Built in modules which can be returned to external modules
     *
     * Placed as a private static otherwise we get use before
     * declared with the `DenoCompiler`
     */
    private static _builtins;
    private static _instance;
    /**
     * Returns the instance of `DenoCompiler` or creates a new instance.
     */
    static instance(): DenoCompiler;
  }
  export {};
}

