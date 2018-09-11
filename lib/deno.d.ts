// Copyright 2018 the Deno authors. All rights reserved. MIT license.
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
declare module "js/assets" { }
declare module "js/types" {
    export type TypedArray = Uint8Array | Float32Array | Int32Array;
    export interface ModuleInfo {
        moduleName: string | null;
        filename: string | null;
        sourceCode: string | null;
        outputCode: string | null;
    }
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
}
declare module "out/debug/gen/msg_generated" {
    /**
     * @enum
     */
    export enum Any {
        NONE = 0,
        Start = 1,
        StartRes = 2,
        CodeFetch = 3,
        CodeFetchRes = 4,
        CodeCache = 5,
        Exit = 6,
        TimerStart = 7,
        TimerReady = 8,
        TimerClear = 9,
        Environ = 10,
        EnvironRes = 11,
        FetchReq = 12,
        FetchRes = 13,
        MakeTempDir = 14,
        MakeTempDirRes = 15,
        Mkdir = 16,
        ReadFile = 17,
        ReadFileRes = 18,
        RenameSync = 19,
        StatSync = 20,
        StatSyncRes = 21,
        SetEnv = 22,
        WriteFileSync = 23
    }
    /**
     * @enum
     */
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
        EmptyHost = 19,
        IdnaError = 20,
        InvalidPort = 21,
        InvalidIpv4Address = 22,
        InvalidIpv6Address = 23,
        InvalidDomainCharacter = 24,
        RelativeUrlWithoutBase = 25,
        RelativeUrlWithCannotBeABaseBase = 26,
        SetHostOnCannotBeABaseUrl = 27,
        Overflow = 28,
        HttpUser = 29,
        HttpClosed = 30,
        HttpCanceled = 31,
        HttpParse = 32,
        HttpOther = 33
    }
    /**
     * @constructor
     */
    export class Base {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns Base
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): Base;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param Base= obj
         * @returns Base
         */
        static getRootAsBase(bb: flatbuffers.ByteBuffer, obj?: Base): Base;
        /**
         * @returns number
         */
        cmdId(): number;
        /**
         * @param number value
         * @returns boolean
         */
        mutate_cmd_id(value: number): boolean;
        /**
         * @returns boolean
         */
        sync(): boolean;
        /**
         * @param boolean value
         * @returns boolean
         */
        mutate_sync(value: boolean): boolean;
        /**
         * @returns ErrorKind
         */
        errorKind(): ErrorKind;
        /**
         * @param ErrorKind value
         * @returns boolean
         */
        mutate_error_kind(value: ErrorKind): boolean;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        error(): string | null;
        error(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @returns Any
         */
        msgType(): Any;
        /**
         * @param Any value
         * @returns boolean
         */
        mutate_msg_type(value: Any): boolean;
        /**
         * @param flatbuffers.Table obj
         * @returns ?flatbuffers.Table
         */
        msg<T extends flatbuffers.Table>(obj: T): T | null;
        /**
         * @param flatbuffers.Builder builder
         */
        static startBase(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param number cmdId
         */
        static addCmdId(builder: flatbuffers.Builder, cmdId: number): void;
        /**
         * @param flatbuffers.Builder builder
         * @param boolean sync
         */
        static addSync(builder: flatbuffers.Builder, sync: boolean): void;
        /**
         * @param flatbuffers.Builder builder
         * @param ErrorKind errorKind
         */
        static addErrorKind(builder: flatbuffers.Builder, errorKind: ErrorKind): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset errorOffset
         */
        static addError(builder: flatbuffers.Builder, errorOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param Any msgType
         */
        static addMsgType(builder: flatbuffers.Builder, msgType: Any): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset msgOffset
         */
        static addMsg(builder: flatbuffers.Builder, msgOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endBase(builder: flatbuffers.Builder): flatbuffers.Offset;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset offset
         */
        static finishBaseBuffer(builder: flatbuffers.Builder, offset: flatbuffers.Offset): void;
    }
    /**
     * @constructor
     */
    export class Start {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns Start
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): Start;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param Start= obj
         * @returns Start
         */
        static getRootAsStart(bb: flatbuffers.ByteBuffer, obj?: Start): Start;
        /**
         * @returns number
         */
        unused(): number;
        /**
         * @param number value
         * @returns boolean
         */
        mutate_unused(value: number): boolean;
        /**
         * @param flatbuffers.Builder builder
         */
        static startStart(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param number unused
         */
        static addUnused(builder: flatbuffers.Builder, unused: number): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endStart(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class StartRes {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns StartRes
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): StartRes;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param StartRes= obj
         * @returns StartRes
         */
        static getRootAsStartRes(bb: flatbuffers.ByteBuffer, obj?: StartRes): StartRes;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        cwd(): string | null;
        cwd(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param number index
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array
         */
        argv(index: number): string;
        argv(index: number, optionalEncoding: flatbuffers.Encoding): string | Uint8Array;
        /**
         * @returns number
         */
        argvLength(): number;
        /**
         * @returns boolean
         */
        debugFlag(): boolean;
        /**
         * @param boolean value
         * @returns boolean
         */
        mutate_debug_flag(value: boolean): boolean;
        /**
         * @returns boolean
         */
        depsFlag(): boolean;
        /**
         * @param boolean value
         * @returns boolean
         */
        mutate_deps_flag(value: boolean): boolean;
        /**
         * @returns boolean
         */
        typesFlag(): boolean;
        /**
         * @param boolean value
         * @returns boolean
         */
        mutate_types_flag(value: boolean): boolean;
        /**
         * @param flatbuffers.Builder builder
         */
        static startStartRes(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset cwdOffset
         */
        static addCwd(builder: flatbuffers.Builder, cwdOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset argvOffset
         */
        static addArgv(builder: flatbuffers.Builder, argvOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param Array.<flatbuffers.Offset> data
         * @returns flatbuffers.Offset
         */
        static createArgvVector(builder: flatbuffers.Builder, data: flatbuffers.Offset[]): flatbuffers.Offset;
        /**
         * @param flatbuffers.Builder builder
         * @param number numElems
         */
        static startArgvVector(builder: flatbuffers.Builder, numElems: number): void;
        /**
         * @param flatbuffers.Builder builder
         * @param boolean debugFlag
         */
        static addDebugFlag(builder: flatbuffers.Builder, debugFlag: boolean): void;
        /**
         * @param flatbuffers.Builder builder
         * @param boolean depsFlag
         */
        static addDepsFlag(builder: flatbuffers.Builder, depsFlag: boolean): void;
        /**
         * @param flatbuffers.Builder builder
         * @param boolean typesFlag
         */
        static addTypesFlag(builder: flatbuffers.Builder, typesFlag: boolean): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endStartRes(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class CodeFetch {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns CodeFetch
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): CodeFetch;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param CodeFetch= obj
         * @returns CodeFetch
         */
        static getRootAsCodeFetch(bb: flatbuffers.ByteBuffer, obj?: CodeFetch): CodeFetch;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        moduleSpecifier(): string | null;
        moduleSpecifier(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        containingFile(): string | null;
        containingFile(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param flatbuffers.Builder builder
         */
        static startCodeFetch(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset moduleSpecifierOffset
         */
        static addModuleSpecifier(builder: flatbuffers.Builder, moduleSpecifierOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset containingFileOffset
         */
        static addContainingFile(builder: flatbuffers.Builder, containingFileOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endCodeFetch(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class CodeFetchRes {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns CodeFetchRes
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): CodeFetchRes;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param CodeFetchRes= obj
         * @returns CodeFetchRes
         */
        static getRootAsCodeFetchRes(bb: flatbuffers.ByteBuffer, obj?: CodeFetchRes): CodeFetchRes;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        moduleName(): string | null;
        moduleName(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        filename(): string | null;
        filename(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        sourceCode(): string | null;
        sourceCode(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        outputCode(): string | null;
        outputCode(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param flatbuffers.Builder builder
         */
        static startCodeFetchRes(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset moduleNameOffset
         */
        static addModuleName(builder: flatbuffers.Builder, moduleNameOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset filenameOffset
         */
        static addFilename(builder: flatbuffers.Builder, filenameOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset sourceCodeOffset
         */
        static addSourceCode(builder: flatbuffers.Builder, sourceCodeOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset outputCodeOffset
         */
        static addOutputCode(builder: flatbuffers.Builder, outputCodeOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endCodeFetchRes(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class CodeCache {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns CodeCache
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): CodeCache;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param CodeCache= obj
         * @returns CodeCache
         */
        static getRootAsCodeCache(bb: flatbuffers.ByteBuffer, obj?: CodeCache): CodeCache;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        filename(): string | null;
        filename(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        sourceCode(): string | null;
        sourceCode(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        outputCode(): string | null;
        outputCode(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param flatbuffers.Builder builder
         */
        static startCodeCache(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset filenameOffset
         */
        static addFilename(builder: flatbuffers.Builder, filenameOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset sourceCodeOffset
         */
        static addSourceCode(builder: flatbuffers.Builder, sourceCodeOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset outputCodeOffset
         */
        static addOutputCode(builder: flatbuffers.Builder, outputCodeOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endCodeCache(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class Exit {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns Exit
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): Exit;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param Exit= obj
         * @returns Exit
         */
        static getRootAsExit(bb: flatbuffers.ByteBuffer, obj?: Exit): Exit;
        /**
         * @returns number
         */
        code(): number;
        /**
         * @param number value
         * @returns boolean
         */
        mutate_code(value: number): boolean;
        /**
         * @param flatbuffers.Builder builder
         */
        static startExit(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param number code
         */
        static addCode(builder: flatbuffers.Builder, code: number): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endExit(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class TimerStart {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns TimerStart
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): TimerStart;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param TimerStart= obj
         * @returns TimerStart
         */
        static getRootAsTimerStart(bb: flatbuffers.ByteBuffer, obj?: TimerStart): TimerStart;
        /**
         * @returns number
         */
        id(): number;
        /**
         * @param number value
         * @returns boolean
         */
        mutate_id(value: number): boolean;
        /**
         * @returns number
         */
        delay(): number;
        /**
         * @param number value
         * @returns boolean
         */
        mutate_delay(value: number): boolean;
        /**
         * @param flatbuffers.Builder builder
         */
        static startTimerStart(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param number id
         */
        static addId(builder: flatbuffers.Builder, id: number): void;
        /**
         * @param flatbuffers.Builder builder
         * @param number delay
         */
        static addDelay(builder: flatbuffers.Builder, delay: number): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endTimerStart(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class TimerReady {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns TimerReady
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): TimerReady;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param TimerReady= obj
         * @returns TimerReady
         */
        static getRootAsTimerReady(bb: flatbuffers.ByteBuffer, obj?: TimerReady): TimerReady;
        /**
         * @returns number
         */
        id(): number;
        /**
         * @param number value
         * @returns boolean
         */
        mutate_id(value: number): boolean;
        /**
         * @returns boolean
         */
        canceled(): boolean;
        /**
         * @param boolean value
         * @returns boolean
         */
        mutate_canceled(value: boolean): boolean;
        /**
         * @param flatbuffers.Builder builder
         */
        static startTimerReady(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param number id
         */
        static addId(builder: flatbuffers.Builder, id: number): void;
        /**
         * @param flatbuffers.Builder builder
         * @param boolean canceled
         */
        static addCanceled(builder: flatbuffers.Builder, canceled: boolean): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endTimerReady(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class TimerClear {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns TimerClear
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): TimerClear;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param TimerClear= obj
         * @returns TimerClear
         */
        static getRootAsTimerClear(bb: flatbuffers.ByteBuffer, obj?: TimerClear): TimerClear;
        /**
         * @returns number
         */
        id(): number;
        /**
         * @param number value
         * @returns boolean
         */
        mutate_id(value: number): boolean;
        /**
         * @param flatbuffers.Builder builder
         */
        static startTimerClear(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param number id
         */
        static addId(builder: flatbuffers.Builder, id: number): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endTimerClear(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class Environ {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns Environ
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): Environ;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param Environ= obj
         * @returns Environ
         */
        static getRootAsEnviron(bb: flatbuffers.ByteBuffer, obj?: Environ): Environ;
        /**
         * @param flatbuffers.Builder builder
         */
        static startEnviron(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endEnviron(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class SetEnv {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns SetEnv
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): SetEnv;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param SetEnv= obj
         * @returns SetEnv
         */
        static getRootAsSetEnv(bb: flatbuffers.ByteBuffer, obj?: SetEnv): SetEnv;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        key(): string | null;
        key(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        value(): string | null;
        value(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param flatbuffers.Builder builder
         */
        static startSetEnv(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset keyOffset
         */
        static addKey(builder: flatbuffers.Builder, keyOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset valueOffset
         */
        static addValue(builder: flatbuffers.Builder, valueOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endSetEnv(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class EnvironRes {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns EnvironRes
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): EnvironRes;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param EnvironRes= obj
         * @returns EnvironRes
         */
        static getRootAsEnvironRes(bb: flatbuffers.ByteBuffer, obj?: EnvironRes): EnvironRes;
        /**
         * @param number index
         * @param EnvPair= obj
         * @returns EnvPair
         */
        map(index: number, obj?: EnvPair): EnvPair | null;
        /**
         * @returns number
         */
        mapLength(): number;
        /**
         * @param flatbuffers.Builder builder
         */
        static startEnvironRes(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset mapOffset
         */
        static addMap(builder: flatbuffers.Builder, mapOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param Array.<flatbuffers.Offset> data
         * @returns flatbuffers.Offset
         */
        static createMapVector(builder: flatbuffers.Builder, data: flatbuffers.Offset[]): flatbuffers.Offset;
        /**
         * @param flatbuffers.Builder builder
         * @param number numElems
         */
        static startMapVector(builder: flatbuffers.Builder, numElems: number): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endEnvironRes(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class EnvPair {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns EnvPair
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): EnvPair;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param EnvPair= obj
         * @returns EnvPair
         */
        static getRootAsEnvPair(bb: flatbuffers.ByteBuffer, obj?: EnvPair): EnvPair;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        key(): string | null;
        key(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        value(): string | null;
        value(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param flatbuffers.Builder builder
         */
        static startEnvPair(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset keyOffset
         */
        static addKey(builder: flatbuffers.Builder, keyOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset valueOffset
         */
        static addValue(builder: flatbuffers.Builder, valueOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endEnvPair(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class FetchReq {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns FetchReq
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): FetchReq;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param FetchReq= obj
         * @returns FetchReq
         */
        static getRootAsFetchReq(bb: flatbuffers.ByteBuffer, obj?: FetchReq): FetchReq;
        /**
         * @returns number
         */
        id(): number;
        /**
         * @param number value
         * @returns boolean
         */
        mutate_id(value: number): boolean;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        url(): string | null;
        url(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param flatbuffers.Builder builder
         */
        static startFetchReq(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param number id
         */
        static addId(builder: flatbuffers.Builder, id: number): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset urlOffset
         */
        static addUrl(builder: flatbuffers.Builder, urlOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endFetchReq(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class FetchRes {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns FetchRes
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): FetchRes;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param FetchRes= obj
         * @returns FetchRes
         */
        static getRootAsFetchRes(bb: flatbuffers.ByteBuffer, obj?: FetchRes): FetchRes;
        /**
         * @returns number
         */
        id(): number;
        /**
         * @param number value
         * @returns boolean
         */
        mutate_id(value: number): boolean;
        /**
         * @returns number
         */
        status(): number;
        /**
         * @param number value
         * @returns boolean
         */
        mutate_status(value: number): boolean;
        /**
         * @param number index
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array
         */
        headerLine(index: number): string;
        headerLine(index: number, optionalEncoding: flatbuffers.Encoding): string | Uint8Array;
        /**
         * @returns number
         */
        headerLineLength(): number;
        /**
         * @param number index
         * @returns number
         */
        body(index: number): number | null;
        /**
         * @returns number
         */
        bodyLength(): number;
        /**
         * @returns Uint8Array
         */
        bodyArray(): Uint8Array | null;
        /**
         * @param flatbuffers.Builder builder
         */
        static startFetchRes(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param number id
         */
        static addId(builder: flatbuffers.Builder, id: number): void;
        /**
         * @param flatbuffers.Builder builder
         * @param number status
         */
        static addStatus(builder: flatbuffers.Builder, status: number): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset headerLineOffset
         */
        static addHeaderLine(builder: flatbuffers.Builder, headerLineOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param Array.<flatbuffers.Offset> data
         * @returns flatbuffers.Offset
         */
        static createHeaderLineVector(builder: flatbuffers.Builder, data: flatbuffers.Offset[]): flatbuffers.Offset;
        /**
         * @param flatbuffers.Builder builder
         * @param number numElems
         */
        static startHeaderLineVector(builder: flatbuffers.Builder, numElems: number): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset bodyOffset
         */
        static addBody(builder: flatbuffers.Builder, bodyOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param Array.<number> data
         * @returns flatbuffers.Offset
         */
        static createBodyVector(builder: flatbuffers.Builder, data: number[] | Uint8Array): flatbuffers.Offset;
        /**
         * @param flatbuffers.Builder builder
         * @param number numElems
         */
        static startBodyVector(builder: flatbuffers.Builder, numElems: number): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endFetchRes(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class MakeTempDir {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns MakeTempDir
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): MakeTempDir;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param MakeTempDir= obj
         * @returns MakeTempDir
         */
        static getRootAsMakeTempDir(bb: flatbuffers.ByteBuffer, obj?: MakeTempDir): MakeTempDir;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        dir(): string | null;
        dir(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        prefix(): string | null;
        prefix(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        suffix(): string | null;
        suffix(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param flatbuffers.Builder builder
         */
        static startMakeTempDir(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset dirOffset
         */
        static addDir(builder: flatbuffers.Builder, dirOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset prefixOffset
         */
        static addPrefix(builder: flatbuffers.Builder, prefixOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset suffixOffset
         */
        static addSuffix(builder: flatbuffers.Builder, suffixOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endMakeTempDir(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class MakeTempDirRes {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns MakeTempDirRes
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): MakeTempDirRes;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param MakeTempDirRes= obj
         * @returns MakeTempDirRes
         */
        static getRootAsMakeTempDirRes(bb: flatbuffers.ByteBuffer, obj?: MakeTempDirRes): MakeTempDirRes;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        path(): string | null;
        path(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param flatbuffers.Builder builder
         */
        static startMakeTempDirRes(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset pathOffset
         */
        static addPath(builder: flatbuffers.Builder, pathOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endMakeTempDirRes(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class Mkdir {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns Mkdir
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): Mkdir;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param Mkdir= obj
         * @returns Mkdir
         */
        static getRootAsMkdir(bb: flatbuffers.ByteBuffer, obj?: Mkdir): Mkdir;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        path(): string | null;
        path(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @returns number
         */
        mode(): number;
        /**
         * @param number value
         * @returns boolean
         */
        mutate_mode(value: number): boolean;
        /**
         * @param flatbuffers.Builder builder
         */
        static startMkdir(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset pathOffset
         */
        static addPath(builder: flatbuffers.Builder, pathOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param number mode
         */
        static addMode(builder: flatbuffers.Builder, mode: number): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endMkdir(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class ReadFile {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns ReadFile
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): ReadFile;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param ReadFile= obj
         * @returns ReadFile
         */
        static getRootAsReadFile(bb: flatbuffers.ByteBuffer, obj?: ReadFile): ReadFile;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        filename(): string | null;
        filename(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param flatbuffers.Builder builder
         */
        static startReadFile(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset filenameOffset
         */
        static addFilename(builder: flatbuffers.Builder, filenameOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endReadFile(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class ReadFileRes {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns ReadFileRes
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): ReadFileRes;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param ReadFileRes= obj
         * @returns ReadFileRes
         */
        static getRootAsReadFileRes(bb: flatbuffers.ByteBuffer, obj?: ReadFileRes): ReadFileRes;
        /**
         * @param number index
         * @returns number
         */
        data(index: number): number | null;
        /**
         * @returns number
         */
        dataLength(): number;
        /**
         * @returns Uint8Array
         */
        dataArray(): Uint8Array | null;
        /**
         * @param flatbuffers.Builder builder
         */
        static startReadFileRes(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset dataOffset
         */
        static addData(builder: flatbuffers.Builder, dataOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param Array.<number> data
         * @returns flatbuffers.Offset
         */
        static createDataVector(builder: flatbuffers.Builder, data: number[] | Uint8Array): flatbuffers.Offset;
        /**
         * @param flatbuffers.Builder builder
         * @param number numElems
         */
        static startDataVector(builder: flatbuffers.Builder, numElems: number): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endReadFileRes(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class RenameSync {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns RenameSync
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): RenameSync;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param RenameSync= obj
         * @returns RenameSync
         */
        static getRootAsRenameSync(bb: flatbuffers.ByteBuffer, obj?: RenameSync): RenameSync;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        oldpath(): string | null;
        oldpath(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        newpath(): string | null;
        newpath(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param flatbuffers.Builder builder
         */
        static startRenameSync(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset oldpathOffset
         */
        static addOldpath(builder: flatbuffers.Builder, oldpathOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset newpathOffset
         */
        static addNewpath(builder: flatbuffers.Builder, newpathOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endRenameSync(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class StatSync {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns StatSync
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): StatSync;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param StatSync= obj
         * @returns StatSync
         */
        static getRootAsStatSync(bb: flatbuffers.ByteBuffer, obj?: StatSync): StatSync;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        filename(): string | null;
        filename(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @returns boolean
         */
        lstat(): boolean;
        /**
         * @param boolean value
         * @returns boolean
         */
        mutate_lstat(value: boolean): boolean;
        /**
         * @param flatbuffers.Builder builder
         */
        static startStatSync(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset filenameOffset
         */
        static addFilename(builder: flatbuffers.Builder, filenameOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param boolean lstat
         */
        static addLstat(builder: flatbuffers.Builder, lstat: boolean): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endStatSync(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class StatSyncRes {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns StatSyncRes
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): StatSyncRes;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param StatSyncRes= obj
         * @returns StatSyncRes
         */
        static getRootAsStatSyncRes(bb: flatbuffers.ByteBuffer, obj?: StatSyncRes): StatSyncRes;
        /**
         * @returns boolean
         */
        isFile(): boolean;
        /**
         * @param boolean value
         * @returns boolean
         */
        mutate_is_file(value: boolean): boolean;
        /**
         * @returns boolean
         */
        isSymlink(): boolean;
        /**
         * @param boolean value
         * @returns boolean
         */
        mutate_is_symlink(value: boolean): boolean;
        /**
         * @returns flatbuffers.Long
         */
        len(): flatbuffers.Long;
        /**
         * @param flatbuffers.Long value
         * @returns boolean
         */
        mutate_len(value: flatbuffers.Long): boolean;
        /**
         * @returns flatbuffers.Long
         */
        modified(): flatbuffers.Long;
        /**
         * @param flatbuffers.Long value
         * @returns boolean
         */
        mutate_modified(value: flatbuffers.Long): boolean;
        /**
         * @returns flatbuffers.Long
         */
        accessed(): flatbuffers.Long;
        /**
         * @param flatbuffers.Long value
         * @returns boolean
         */
        mutate_accessed(value: flatbuffers.Long): boolean;
        /**
         * @returns flatbuffers.Long
         */
        created(): flatbuffers.Long;
        /**
         * @param flatbuffers.Long value
         * @returns boolean
         */
        mutate_created(value: flatbuffers.Long): boolean;
        /**
         * @param flatbuffers.Builder builder
         */
        static startStatSyncRes(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param boolean isFile
         */
        static addIsFile(builder: flatbuffers.Builder, isFile: boolean): void;
        /**
         * @param flatbuffers.Builder builder
         * @param boolean isSymlink
         */
        static addIsSymlink(builder: flatbuffers.Builder, isSymlink: boolean): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Long len
         */
        static addLen(builder: flatbuffers.Builder, len: flatbuffers.Long): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Long modified
         */
        static addModified(builder: flatbuffers.Builder, modified: flatbuffers.Long): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Long accessed
         */
        static addAccessed(builder: flatbuffers.Builder, accessed: flatbuffers.Long): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Long created
         */
        static addCreated(builder: flatbuffers.Builder, created: flatbuffers.Long): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endStatSyncRes(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
    /**
     * @constructor
     */
    export class WriteFileSync {
        bb: flatbuffers.ByteBuffer | null;
        bb_pos: number;
        /**
         * @param number i
         * @param flatbuffers.ByteBuffer bb
         * @returns WriteFileSync
         */
        __init(i: number, bb: flatbuffers.ByteBuffer): WriteFileSync;
        /**
         * @param flatbuffers.ByteBuffer bb
         * @param WriteFileSync= obj
         * @returns WriteFileSync
         */
        static getRootAsWriteFileSync(bb: flatbuffers.ByteBuffer, obj?: WriteFileSync): WriteFileSync;
        /**
         * @param flatbuffers.Encoding= optionalEncoding
         * @returns string|Uint8Array|null
         */
        filename(): string | null;
        filename(optionalEncoding: flatbuffers.Encoding): string | Uint8Array | null;
        /**
         * @param number index
         * @returns number
         */
        data(index: number): number | null;
        /**
         * @returns number
         */
        dataLength(): number;
        /**
         * @returns Uint8Array
         */
        dataArray(): Uint8Array | null;
        /**
         * @returns number
         */
        perm(): number;
        /**
         * @param number value
         * @returns boolean
         */
        mutate_perm(value: number): boolean;
        /**
         * @param flatbuffers.Builder builder
         */
        static startWriteFileSync(builder: flatbuffers.Builder): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset filenameOffset
         */
        static addFilename(builder: flatbuffers.Builder, filenameOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param flatbuffers.Offset dataOffset
         */
        static addData(builder: flatbuffers.Builder, dataOffset: flatbuffers.Offset): void;
        /**
         * @param flatbuffers.Builder builder
         * @param Array.<number> data
         * @returns flatbuffers.Offset
         */
        static createDataVector(builder: flatbuffers.Builder, data: number[] | Uint8Array): flatbuffers.Offset;
        /**
         * @param flatbuffers.Builder builder
         * @param number numElems
         */
        static startDataVector(builder: flatbuffers.Builder, numElems: number): void;
        /**
         * @param flatbuffers.Builder builder
         * @param number perm
         */
        static addPerm(builder: flatbuffers.Builder, perm: number): void;
        /**
         * @param flatbuffers.Builder builder
         * @returns flatbuffers.Offset
         */
        static endWriteFileSync(builder: flatbuffers.Builder): flatbuffers.Offset;
    }
}
declare module "js/util" {
    export function hexdump(u8: Uint8Array): string;
}
declare module "js/global-eval" { }
declare module "js/libdeno" {
    import { RawSourceMap } from "js/types";
    type MessageCallback = (msg: Uint8Array) => void;
    interface Libdeno {
        recv(cb: MessageCallback): void;
        send(msg: ArrayBufferView): null | Uint8Array;
        print(x: string): void;
        setGlobalErrorHandler: (handler: (message: string, source: string, line: number, col: number, error: Error) => void) => void;
        mainSource: string;
        mainSourceMap: RawSourceMap;
    }
    export const libdeno: Libdeno;
}
declare module "js/errors" {
    import { ErrorKind } from "out/debug/gen/msg_generated";
    export { ErrorKind } from "out/debug/gen/msg_generated";
    export class DenoError<T extends ErrorKind> extends Error {
        readonly kind: T;
        constructor(kind: T, msg: string);
    }
}
declare module "js/dispatch" {
    export function handleAsyncMsgFromRust(ui8: Uint8Array): void;
}
declare module "js/os" {
    import { ModuleInfo } from "js/types";
    export function exit(exitCode?: number): never;
    export function codeFetch(moduleSpecifier: string, containingFile: string): ModuleInfo;
    export function codeCache(filename: string, sourceCode: string, outputCode: string): void;
    /**
     * makeTempDirSync creates a new temporary directory in the directory `dir`, its
     * name beginning with `prefix` and ending with `suffix`.
     * It returns the full path to the newly created directory.
     * If `dir` is unspecified, tempDir uses the default directory for temporary
     * files. Multiple programs calling tempDir simultaneously will not choose the
     * same directory. It is the caller's responsibility to remove the directory
     * when no longer needed.
     */
    export interface MakeTempDirOptions {
        dir?: string;
        prefix?: string;
        suffix?: string;
    }
    export function makeTempDirSync({ dir, prefix, suffix }?: MakeTempDirOptions): string;
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
    /**
     * A FileInfo describes a file and is returned by `stat`, `lstat`,
     * `statSync`, `lstatSync`.
     */
    export class FileInfo {
        private _msg;
        private readonly _isFile;
        private readonly _isSymlink;
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
     * @returns FileInfo
     */
    export function lstatSync(filename: string): FileInfo;
    /**
     * Queries the file system for information on the path provided.
     * `statSync` Will always follow symlinks.
     * @returns FileInfo
     */
    export function statSync(filename: string): FileInfo;
    /**
     * Write a new file.
     *     import { writeFileSync } from "deno";
     *
     *     const encoder = new TextEncoder("utf-8");
     *     const data = encoder.encode("Hello world\n");
     *     writeFileSync("hello.txt", data);
     */
    export function writeFileSync(filename: string, data: Uint8Array, perm?: number): void;
    /**
     * Renames (moves) oldpath to newpath.
     *     import { renameSync } from "deno";
     *     const oldpath = 'from/path';
     *     const newpath = 'to/path';
     *
     *     renameSync(oldpath, newpath);
     */
    export function renameSync(oldpath: string, newpath: string): void;
}
declare module "js/mkdir" {
    /**
     * Creates a new directory with the specified path and permission synchronously.
     *
     *     import { mkdirSync } from "deno";
     *     mkdirSync("new_dir");
     */
    export function mkdirSync(path: string, mode?: number): void;
    /**
     * Creates a new directory with the specified path and permission.
     *
     *     import { mkdir } from "deno";
     *     await mkdir("new_dir");
     */
    export function mkdir(path: string, mode?: number): Promise<void>;
}
declare module "js/read_file" {
    /**
     * Read the entire contents of a file synchronously.
     *
     *     import { readFileSync } from "deno";
     *     const decoder = new TextDecoder("utf-8");
     *     const data = readFileSync("hello.txt");
     *     console.log(decoder.decode(data));
     */
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
declare module "deno" {
    export { env, exit, FileInfo, makeTempDirSync, renameSync, statSync, lstatSync, writeFileSync } from "js/os";
    export { mkdirSync, mkdir } from "js/mkdir";
    export { readFileSync, readFile } from "js/read_file";
    export { ErrorKind, DenoError } from "js/errors";
    export { libdeno } from "js/libdeno";
    export const argv: string[];
}
declare module "js/console" {
    export function stringifyArgs(args: any[]): string;
    type PrintFunc = (x: string) => void;
    export class Console {
        private printFunc;
        constructor(printFunc: PrintFunc);
        log(...args: any[]): void;
        debug: (...args: any[]) => void;
        info: (...args: any[]) => void;
        warn(...args: any[]): void;
        error: (...args: any[]) => void;
        assert(condition: boolean, ...args: any[]): void;
    }
}
declare module "js/timers" {
    export type TimerCallback = (...args: any[]) => void;
    export function setTimeout(cb: TimerCallback, delay: number, ...args: any[]): number;
    export function setInterval(cb: TimerCallback, delay: number, ...args: any[]): number;
    export function clearTimer(id: number): void;
}
declare module "js/text_encoding" {
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
declare module "js/fetch_types" {
    /*! ****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0
    
    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
    ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.
    
    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    *******************************************************************************/
    type HeadersInit = Headers | string[][] | Record<string, string>;
    type BodyInit = Blob | BufferSource | FormData | URLSearchParams | ReadableStream | string;
    type ReferrerPolicy = "" | "no-referrer" | "no-referrer-when-downgrade" | "origin-only" | "origin-when-cross-origin" | "unsafe-url";
    type BlobPart = BufferSource | Blob | string;
    type FormDataEntryValue = File | string;
    type EventListenerOrEventListenerObject = EventListener | EventListenerObject;
    interface Element {
    }
    interface BlobPropertyBag {
        type?: string;
    }
    interface AbortSignalEventMap {
        abort: ProgressEvent;
    }
    interface EventTarget {
        addEventListener(type: string, listener: EventListenerOrEventListenerObject | null, options?: boolean | AddEventListenerOptions): void;
        dispatchEvent(evt: Event): boolean;
        removeEventListener(type: string, listener?: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void;
    }
    interface ProgressEventInit extends EventInit {
        lengthComputable?: boolean;
        loaded?: number;
        total?: number;
    }
    interface URLSearchParams {
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
        sort(): void;
        forEach(callbackfn: (value: string, key: string, parent: URLSearchParams) => void, thisArg?: any): void;
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
    var File: {
        prototype: File;
        new (fileBits: BlobPart[], fileName: string, options?: FilePropertyBag): File;
    };
    interface FilePropertyBag extends BlobPropertyBag {
        lastModified?: number;
    }
    interface ProgressEvent extends Event {
        readonly lengthComputable: boolean;
        readonly loaded: number;
        readonly total: number;
    }
    var ProgressEvent: {
        prototype: ProgressEvent;
        new (type: string, eventInitDict?: ProgressEventInit): ProgressEvent;
    };
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
        addEventListener<K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | AddEventListenerOptions): void;
        addEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | AddEventListenerOptions): void;
        removeEventListener<K extends keyof AbortSignalEventMap>(type: K, listener: (this: AbortSignal, ev: AbortSignalEventMap[K]) => any, options?: boolean | EventListenerOptions): void;
        removeEventListener(type: string, listener: EventListenerOrEventListenerObject, options?: boolean | EventListenerOptions): void;
    }
    var AbortSignal: {
        prototype: AbortSignal;
        new (): AbortSignal;
    };
    interface ReadableStream {
        readonly locked: boolean;
        cancel(): Promise<void>;
        getReader(): ReadableStreamReader;
    }
    var ReadableStream: {
        prototype: ReadableStream;
        new (): ReadableStream;
    };
    interface EventListenerObject {
        handleEvent(evt: Event): void;
    }
    interface ReadableStreamReader {
        cancel(): Promise<void>;
        read(): Promise<any>;
        releaseLock(): void;
    }
    var ReadableStreamReader: {
        prototype: ReadableStreamReader;
        new (): ReadableStreamReader;
    };
    export interface FormData {
        append(name: string, value: string | Blob, fileName?: string): void;
        delete(name: string): void;
        get(name: string): FormDataEntryValue | null;
        getAll(name: string): FormDataEntryValue[];
        has(name: string): boolean;
        set(name: string, value: string | Blob, fileName?: string): void;
        forEach(callbackfn: (value: FormDataEntryValue, key: string, parent: FormData) => void, thisArg?: any): void;
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
        forEach(callbackfn: (value: string, key: string, parent: Headers) => void, thisArg?: any): void;
    }
    type RequestCache = "default" | "no-store" | "reload" | "no-cache" | "force-cache" | "only-if-cached";
    type RequestCredentials = "omit" | "same-origin" | "include";
    type RequestDestination = "" | "audio" | "audioworklet" | "document" | "embed" | "font" | "image" | "manifest" | "object" | "paintworklet" | "report" | "script" | "sharedworker" | "style" | "track" | "video" | "worker" | "xslt";
    type RequestMode = "navigate" | "same-origin" | "no-cors" | "cors";
    type RequestRedirect = "follow" | "error" | "manual";
    type ResponseType = "basic" | "cors" | "default" | "error" | "opaque" | "opaqueredirect";
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
}
declare module "js/fetch" {
    import { Request, Response, RequestInit } from "js/fetch_types";
    export function fetch(input?: Request | string, init?: RequestInit): Promise<Response>;
}
declare module "js/globals" {
    import { Console } from "js/console";
    import * as timers from "js/timers";
    import * as textEncoding from "js/text_encoding";
    import * as fetch_ from "js/fetch";
    global {
        interface Window {
            console: Console;
            define: Readonly<unknown>;
        }
        const clearTimeout: typeof timers.clearTimer;
        const clearInterval: typeof timers.clearTimer;
        const setTimeout: typeof timers.setTimeout;
        const setInterval: typeof timers.setInterval;
        const console: Console;
        const window: Window;
        const fetch: typeof fetch_.fetch;
        let TextEncoder: typeof textEncoding.TextEncoder;
        let TextDecoder: typeof textEncoding.TextDecoder;
    }
    export const window: any;
}
declare module "js/v8_source_maps" { }
declare module "compiler" {
    import * as ts from "typescript";
    export type AmdFactory = (...args: any[]) => object | void;
    export type AmdDefine = (deps: ModuleSpecifier[], factory: AmdFactory) => void;
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
        constructor(moduleId: ModuleId, fileName: ModuleFileName, sourceCode?: SourceCode, outputCode?: OutputCode);
        getText(start: number, end: number): string;
        getLength(): number;
        getChangeRange(): undefined;
    }
    /**
     * A singleton class that combines the TypeScript Language Service host API
     * with Deno specific APIs to provide an interface for compiling and running
     * TypeScript and JavaScript modules.
     */
    export class DenoCompiler implements ts.LanguageServiceHost, ts.FormatDiagnosticsHost {
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
         * cache the result.
         */
        compile(moduleMetaData: ModuleMetaData): OutputCode;
        /**
         * For a given module specifier and containing file, return a list of absolute
         * identifiers for dependent modules that are required by this module.
         */
        getModuleDependencies(moduleSpecifier: ModuleSpecifier, containingFile: ContainingFile): ModuleFileName[];
        /**
         * Given a `moduleSpecifier` and `containingFile`, resolve the module and
         * return the `ModuleMetaData`.
         */
        resolveModule(moduleSpecifier: ModuleSpecifier, containingFile: ContainingFile): ModuleMetaData;
        /**
         * Load and run a module and all of its dependencies based on a module
         * specifier and a containing file
         */
        run(moduleSpecifier: ModuleSpecifier, containingFile: ContainingFile): ModuleMetaData;
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
        resolveModuleNames(moduleNames: ModuleSpecifier[], containingFile: ContainingFile): ts.ResolvedModule[];
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
}

