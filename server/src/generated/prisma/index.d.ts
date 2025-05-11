/**
 * Client
 **/

import * as runtime from "./runtime/library.js";
import $Types = runtime.Types; // general types
import $Public = runtime.Types.Public;
import $Utils = runtime.Types.Utils;
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export type PrismaPromise<T> = $Public.PrismaPromise<T>;

/**
 * Model User
 *
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>;
/**
 * Model Client
 *
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>;
/**
 * Model Campaign
 *
 */
export type Campaign = $Result.DefaultSelection<Prisma.$CampaignPayload>;
/**
 * Model Ad
 *
 */
export type Ad = $Result.DefaultSelection<Prisma.$AdPayload>;

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = "log" extends keyof ClientOptions
    ? ClientOptions["log"] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
      ? Prisma.GetEvents<ClientOptions["log"]>
      : never
    : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>["other"] };

  /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(
    optionsArg?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>
  );
  $on<V extends U>(
    eventType: V,
    callback: (
      event: V extends "query" ? Prisma.QueryEvent : Prisma.LogEvent
    ) => void
  ): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void;

  /**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(
    query: TemplateStringsArray | Prisma.Sql,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(
    query: string,
    ...values: any[]
  ): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(
    arg: [...P],
    options?: { isolationLevel?: Prisma.TransactionIsolationLevel }
  ): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;

  $transaction<R>(
    fn: (
      prisma: Omit<PrismaClient, runtime.ITXClientDenyList>
    ) => $Utils.JsPromise<R>,
    options?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    }
  ): $Utils.JsPromise<R>;

  $extends: $Extensions.ExtendsHook<
    "extends",
    Prisma.TypeMapCb<ClientOptions>,
    ExtArgs,
    $Utils.Call<
      Prisma.TypeMapCb<ClientOptions>,
      {
        extArgs: ExtArgs;
      }
    >
  >;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Clients
   * const clients = await prisma.client.findMany()
   * ```
   */
  get client(): Prisma.ClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.campaign`: Exposes CRUD operations for the **Campaign** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Campaigns
   * const campaigns = await prisma.campaign.findMany()
   * ```
   */
  get campaign(): Prisma.CampaignDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.ad`: Exposes CRUD operations for the **Ad** model.
   * Example usage:
   * ```ts
   * // Fetch zero or more Ads
   * const ads = await prisma.ad.findMany()
   * ```
   */
  get ad(): Prisma.AdDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF;

  export type PrismaPromise<T> = $Public.PrismaPromise<T>;

  /**
   * Validator
   */
  export import validator = runtime.Public.validator;

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError;
  export import PrismaClientValidationError = runtime.PrismaClientValidationError;

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag;
  export import empty = runtime.empty;
  export import join = runtime.join;
  export import raw = runtime.raw;
  export import Sql = runtime.Sql;

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal;

  export type DecimalJsLike = runtime.DecimalJsLike;

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics;
  export type Metric<T> = runtime.Metric<T>;
  export type MetricHistogram = runtime.MetricHistogram;
  export type MetricHistogramBucket = runtime.MetricHistogramBucket;

  /**
   * Extensions
   */
  export import Extension = $Extensions.UserArgs;
  export import getExtensionContext = runtime.Extensions.getExtensionContext;
  export import Args = $Public.Args;
  export import Payload = $Public.Payload;
  export import Result = $Public.Result;
  export import Exact = $Public.Exact;

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string;
  };

  export const prismaVersion: PrismaVersion;

  /**
   * Utility Types
   */

  export import JsonObject = runtime.JsonObject;
  export import JsonArray = runtime.JsonArray;
  export import JsonValue = runtime.JsonValue;
  export import InputJsonObject = runtime.InputJsonObject;
  export import InputJsonArray = runtime.InputJsonArray;
  export import InputJsonValue = runtime.InputJsonValue;

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
     * Type of `Prisma.DbNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class DbNull {
      private DbNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.JsonNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class JsonNull {
      private JsonNull: never;
      private constructor();
    }

    /**
     * Type of `Prisma.AnyNull`.
     *
     * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
     *
     * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
     */
    class AnyNull {
      private AnyNull: never;
      private constructor();
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull;

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull;

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull;

  type SelectAndInclude = {
    select: any;
    include: any;
  };

  type SelectAndOmit = {
    select: any;
    omit: any;
  };

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<
    infer U
  >
    ? U
    : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<
    T extends (...args: any) => $Utils.JsPromise<any>
  > = PromiseType<ReturnType<T>>;

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
  };

  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K;
  }[keyof T];

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K;
  };

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>;

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & (T extends SelectAndInclude
    ? "Please either choose `select` or `include`."
    : T extends SelectAndOmit
    ? "Please either choose `select` or `omit`."
    : {});

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  } & K;

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> = T extends object
    ? U extends object
      ? (Without<T, U> & U) | (Without<U, T> & T)
      : U
    : T;

  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
    ? False
    : T extends Date
    ? False
    : T extends Uint8Array
    ? False
    : T extends BigInt
    ? False
    : T extends object
    ? True
    : False;

  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O>; // With K possibilities
    }[K];

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<
    __Either<O, K>
  >;

  type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
  }[strict];

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never;

  export type Union = any;

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
  } & {};

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never;

  export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<
    Overwrite<
      U,
      {
        [K in keyof U]-?: At<U, K>;
      }
    >
  >;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O
    ? O[K]
    : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown
    ? AtStrict<O, K>
    : never;
  export type At<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function
    ? A
    : {
        [K in keyof A]: A[K];
      } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
      ?
          | (K extends keyof O ? { [P in K]: O[P] } & O : O)
          | ({ [P in keyof O as P extends K ? P : never]-?: O[P] } & O)
      : never
  >;

  type _Strict<U, _U = U> = U extends unknown
    ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>>
    : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False;

  // /**
  // 1
  // */
  export type True = 1;

  /**
  0
  */
  export type False = 0;

  export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
  }[B];

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0;

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >;

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0;
      1: 1;
    };
    1: {
      0: 1;
      1: 1;
    };
  }[B1][B2];

  export type Keys<U extends Union> = U extends unknown ? keyof U : never;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object
    ? {
        [P in keyof T]: P extends keyof O ? O[P] : never;
      }
    : never;

  type FieldPaths<
    T,
    U = Omit<T, "_avg" | "_sum" | "_count" | "_min" | "_max">
  > = IsObject<T> extends True ? U : T;

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<"OR", K>, Extends<"AND", K>>,
      Extends<"NOT", K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<
            UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never
          >
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K;
  }[keyof T];

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<
    T,
    K extends Enumerable<keyof T> | keyof T
  > = Prisma__Pick<T, MaybeTupleToUnion<K>>;

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}`
    ? never
    : T;

  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;

  type FieldRefInputType<Model, FieldType> = Model extends never
    ? never
    : FieldRef<Model, FieldType>;

  export const ModelName: {
    User: "User";
    Client: "Client";
    Campaign: "Campaign";
    Ad: "Ad";
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName];

  export type Datasources = {
    db?: Datasource;
  };

  interface TypeMapCb<ClientOptions = {}>
    extends $Utils.Fn<
      { extArgs: $Extensions.InternalArgs },
      $Utils.Record<string, any>
    > {
    returns: Prisma.TypeMap<
      this["params"]["extArgs"],
      ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}
    >;
  }

  export type TypeMap<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > = {
    globalOmitOptions: {
      omit: GlobalOmitOptions;
    };
    meta: {
      modelProps: "user" | "client" | "campaign" | "ad";
      txIsolationLevel: Prisma.TransactionIsolationLevel;
    };
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>;
        fields: Prisma.UserFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[];
          };
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$UserPayload>;
          };
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateUser>;
          };
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>;
            result: $Utils.Optional<UserGroupByOutputType>[];
          };
          count: {
            args: Prisma.UserCountArgs<ExtArgs>;
            result: $Utils.Optional<UserCountAggregateOutputType> | number;
          };
        };
      };
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>;
        fields: Prisma.ClientFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>;
          };
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>;
          };
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[];
          };
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>;
          };
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.ClientCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[];
          };
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>;
          };
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>;
          };
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.ClientUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[];
          };
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>;
          };
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateClient>;
          };
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>;
            result: $Utils.Optional<ClientGroupByOutputType>[];
          };
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>;
            result: $Utils.Optional<ClientCountAggregateOutputType> | number;
          };
        };
      };
      Campaign: {
        payload: Prisma.$CampaignPayload<ExtArgs>;
        fields: Prisma.CampaignFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.CampaignFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.CampaignFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>;
          };
          findFirst: {
            args: Prisma.CampaignFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.CampaignFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>;
          };
          findMany: {
            args: Prisma.CampaignFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[];
          };
          create: {
            args: Prisma.CampaignCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>;
          };
          createMany: {
            args: Prisma.CampaignCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.CampaignCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[];
          };
          delete: {
            args: Prisma.CampaignDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>;
          };
          update: {
            args: Prisma.CampaignUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>;
          };
          deleteMany: {
            args: Prisma.CampaignDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.CampaignUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.CampaignUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>[];
          };
          upsert: {
            args: Prisma.CampaignUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$CampaignPayload>;
          };
          aggregate: {
            args: Prisma.CampaignAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateCampaign>;
          };
          groupBy: {
            args: Prisma.CampaignGroupByArgs<ExtArgs>;
            result: $Utils.Optional<CampaignGroupByOutputType>[];
          };
          count: {
            args: Prisma.CampaignCountArgs<ExtArgs>;
            result: $Utils.Optional<CampaignCountAggregateOutputType> | number;
          };
        };
      };
      Ad: {
        payload: Prisma.$AdPayload<ExtArgs>;
        fields: Prisma.AdFieldRefs;
        operations: {
          findUnique: {
            args: Prisma.AdFindUniqueArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdPayload> | null;
          };
          findUniqueOrThrow: {
            args: Prisma.AdFindUniqueOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdPayload>;
          };
          findFirst: {
            args: Prisma.AdFindFirstArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdPayload> | null;
          };
          findFirstOrThrow: {
            args: Prisma.AdFindFirstOrThrowArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdPayload>;
          };
          findMany: {
            args: Prisma.AdFindManyArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdPayload>[];
          };
          create: {
            args: Prisma.AdCreateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdPayload>;
          };
          createMany: {
            args: Prisma.AdCreateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          createManyAndReturn: {
            args: Prisma.AdCreateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdPayload>[];
          };
          delete: {
            args: Prisma.AdDeleteArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdPayload>;
          };
          update: {
            args: Prisma.AdUpdateArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdPayload>;
          };
          deleteMany: {
            args: Prisma.AdDeleteManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateMany: {
            args: Prisma.AdUpdateManyArgs<ExtArgs>;
            result: BatchPayload;
          };
          updateManyAndReturn: {
            args: Prisma.AdUpdateManyAndReturnArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdPayload>[];
          };
          upsert: {
            args: Prisma.AdUpsertArgs<ExtArgs>;
            result: $Utils.PayloadToResult<Prisma.$AdPayload>;
          };
          aggregate: {
            args: Prisma.AdAggregateArgs<ExtArgs>;
            result: $Utils.Optional<AggregateAd>;
          };
          groupBy: {
            args: Prisma.AdGroupByArgs<ExtArgs>;
            result: $Utils.Optional<AdGroupByOutputType>[];
          };
          count: {
            args: Prisma.AdCountArgs<ExtArgs>;
            result: $Utils.Optional<AdCountAggregateOutputType> | number;
          };
        };
      };
    };
  } & {
    other: {
      payload: any;
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]];
          result: any;
        };
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]];
          result: any;
        };
      };
    };
  };
  export const defineExtension: $Extensions.ExtendsHook<
    "define",
    Prisma.TypeMapCb,
    $Extensions.DefaultArgs
  >;
  export type DefaultPrismaClient = PrismaClient;
  export type ErrorFormat = "pretty" | "colorless" | "minimal";
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources;
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string;
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number;
      timeout?: number;
      isolationLevel?: Prisma.TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig;
  }
  export type GlobalOmitConfig = {
    user?: UserOmit;
    client?: ClientOmit;
    campaign?: CampaignOmit;
    ad?: AdOmit;
  };

  /* Types for Logging */
  export type LogLevel = "info" | "query" | "warn" | "error";
  export type LogDefinition = {
    level: LogLevel;
    emit: "stdout" | "event";
  };

  export type GetLogType<T extends LogLevel | LogDefinition> =
    T extends LogDefinition
      ? T["emit"] extends "event"
        ? T["level"]
        : never
      : never;
  export type GetEvents<T extends any> = T extends Array<
    LogLevel | LogDefinition
  >
    ? GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never;

  export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
  };

  export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
  };
  /* End Types for Logging */

  export type PrismaAction =
    | "findUnique"
    | "findUniqueOrThrow"
    | "findMany"
    | "findFirst"
    | "findFirstOrThrow"
    | "create"
    | "createMany"
    | "createManyAndReturn"
    | "update"
    | "updateMany"
    | "updateManyAndReturn"
    | "upsert"
    | "delete"
    | "deleteMany"
    | "executeRaw"
    | "queryRaw"
    | "aggregate"
    | "count"
    | "runCommandRaw"
    | "findRaw"
    | "groupBy";

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName;
    action: PrismaAction;
    args: any;
    dataPath: string[];
    runInTransaction: boolean;
  };

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>
  ) => $Utils.JsPromise<T>;

  // tested in getLogLevel.test.ts
  export function getLogLevel(
    log: Array<LogLevel | LogDefinition>
  ): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<
    Prisma.DefaultPrismaClient,
    runtime.ITXClientDenyList
  >;

  export type Datasource = {
    url?: string;
  };

  /**
   * Count Types
   */

  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    campaigns: number;
  };

  export type ClientCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    campaigns?: boolean | ClientCountOutputTypeCountCampaignsArgs;
  };

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountCampaignsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: CampaignWhereInput;
  };

  /**
   * Count Type CampaignCountOutputType
   */

  export type CampaignCountOutputType = {
    ads: number;
  };

  export type CampaignCountOutputTypeSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    ads?: boolean | CampaignCountOutputTypeCountAdsArgs;
  };

  // Custom InputTypes
  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the CampaignCountOutputType
     */
    select?: CampaignCountOutputTypeSelect<ExtArgs> | null;
  };

  /**
   * CampaignCountOutputType without action
   */
  export type CampaignCountOutputTypeCountAdsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: AdWhereInput;
  };

  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    username: string | null;
    name: string | null;
    last: string | null;
    password: string | null;
    bio: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    username: string | null;
    name: string | null;
    last: string | null;
    password: string | null;
    bio: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    username: number;
    name: number;
    last: number;
    password: number;
    bio: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    username?: true;
    name?: true;
    last?: true;
    password?: true;
    bio?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    username?: true;
    name?: true;
    last?: true;
    password?: true;
    bio?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    username?: true;
    name?: true;
    last?: true;
    password?: true;
    bio?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type UserAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
     **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: UserMaxAggregateInputType;
  };

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>;
  };

  export type UserGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: UserWhereInput;
    orderBy?:
      | UserOrderByWithAggregationInput
      | UserOrderByWithAggregationInput[];
    by: UserScalarFieldEnum[] | UserScalarFieldEnum;
    having?: UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
  };

  export type UserGroupByOutputType = {
    id: string;
    email: string;
    username: string;
    name: string | null;
    last: string | null;
    password: string;
    bio: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
  };

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof UserGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], UserGroupByOutputType[P]>
          : GetScalarType<T[P], UserGroupByOutputType[P]>;
      }
    >
  >;

  export type UserSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
      username?: boolean;
      name?: boolean;
      last?: boolean;
      password?: boolean;
      bio?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
      username?: boolean;
      name?: boolean;
      last?: boolean;
      password?: boolean;
      bio?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      email?: boolean;
      username?: boolean;
      name?: boolean;
      last?: boolean;
      password?: boolean;
      bio?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["user"]
  >;

  export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    username?: boolean;
    name?: boolean;
    last?: boolean;
    password?: boolean;
    bio?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type UserOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetOmit<
    | "id"
    | "email"
    | "username"
    | "name"
    | "last"
    | "password"
    | "bio"
    | "createdAt"
    | "updatedAt",
    ExtArgs["result"]["user"]
  >;

  export type $UserPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: "User";
    objects: {};
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        email: string;
        username: string;
        name: string | null;
        last: string | null;
        password: string;
        bio: string | null;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["user"]
    >;
    composites: {};
  };

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> =
    $Result.GetResult<Prisma.$UserPayload, S>;

  type UserCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = Omit<UserFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: UserCountAggregateInputType | true;
  };

  export interface UserDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["User"];
      meta: { name: "User" };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(
      args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(
      args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(
      args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<
      $Result.GetResult<
        Prisma.$UserPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
     **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], UserCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends UserAggregateArgs>(
      args: Subset<T, UserAggregateArgs>
    ): Prisma.PrismaPromise<GetUserAggregateType<T>>;

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs["orderBy"] }
        : { orderBy?: UserGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [
                  Error,
                  "Field ",
                  P,
                  ` in "having" needs to be provided in "by"`
                ];
          }[HavingFields]
        : "take" extends Keys<T>
        ? "orderBy" extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : "skip" extends Keys<T>
        ? "orderBy" extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields]
    >(
      args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetUserGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", "String">;
    readonly email: FieldRef<"User", "String">;
    readonly username: FieldRef<"User", "String">;
    readonly name: FieldRef<"User", "String">;
    readonly last: FieldRef<"User", "String">;
    readonly password: FieldRef<"User", "String">;
    readonly bio: FieldRef<"User", "String">;
    readonly createdAt: FieldRef<"User", "DateTime">;
    readonly updatedAt: FieldRef<"User", "DateTime">;
  }

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User findMany
   */
  export type UserFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[];
  };

  /**
   * User create
   */
  export type UserCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>;
  };

  /**
   * User createMany
   */
  export type UserCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * User update
   */
  export type UserUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
  };

  /**
   * User upsert
   */
  export type UserUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>;
  };

  /**
   * User delete
   */
  export type UserDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput;
  };

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
  };

  /**
   * User without action
   */
  export type UserDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null;
  };

  /**
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null;
    _min: ClientMinAggregateOutputType | null;
    _max: ClientMaxAggregateOutputType | null;
  };

  export type ClientMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    title: string | null;
    mobile: string | null;
    email: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ClientMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    title: string | null;
    mobile: string | null;
    email: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type ClientCountAggregateOutputType = {
    id: number;
    name: number;
    title: number;
    mobile: number;
    email: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type ClientMinAggregateInputType = {
    id?: true;
    name?: true;
    title?: true;
    mobile?: true;
    email?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ClientMaxAggregateInputType = {
    id?: true;
    name?: true;
    title?: true;
    mobile?: true;
    email?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type ClientCountAggregateInputType = {
    id?: true;
    name?: true;
    title?: true;
    mobile?: true;
    email?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type ClientAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Clients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Clients
     **/
    _count?: true | ClientCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: ClientMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: ClientMaxAggregateInputType;
  };

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
    [P in keyof T & keyof AggregateClient]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>;
  };

  export type ClientGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: ClientWhereInput;
    orderBy?:
      | ClientOrderByWithAggregationInput
      | ClientOrderByWithAggregationInput[];
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum;
    having?: ClientScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ClientCountAggregateInputType | true;
    _min?: ClientMinAggregateInputType;
    _max?: ClientMaxAggregateInputType;
  };

  export type ClientGroupByOutputType = {
    id: string;
    name: string;
    title: string;
    mobile: string | null;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    _count: ClientCountAggregateOutputType | null;
    _min: ClientMinAggregateOutputType | null;
    _max: ClientMaxAggregateOutputType | null;
  };

  type GetClientGroupByPayload<T extends ClientGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<ClientGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof ClientGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>;
        }
      >
    >;

  export type ClientSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      title?: boolean;
      mobile?: boolean;
      email?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      campaigns?: boolean | Client$campaignsArgs<ExtArgs>;
      _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["client"]
  >;

  export type ClientSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      title?: boolean;
      mobile?: boolean;
      email?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["client"]
  >;

  export type ClientSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      title?: boolean;
      mobile?: boolean;
      email?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
    },
    ExtArgs["result"]["client"]
  >;

  export type ClientSelectScalar = {
    id?: boolean;
    name?: boolean;
    title?: boolean;
    mobile?: boolean;
    email?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type ClientOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetOmit<
    "id" | "name" | "title" | "mobile" | "email" | "createdAt" | "updatedAt",
    ExtArgs["result"]["client"]
  >;
  export type ClientInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    campaigns?: boolean | Client$campaignsArgs<ExtArgs>;
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type ClientIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {};
  export type ClientIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {};

  export type $ClientPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: "Client";
    objects: {
      campaigns: Prisma.$CampaignPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        title: string;
        mobile: string | null;
        email: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["client"]
    >;
    composites: {};
  };

  type ClientGetPayload<
    S extends boolean | null | undefined | ClientDefaultArgs
  > = $Result.GetResult<Prisma.$ClientPayload, S>;

  type ClientCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = Omit<ClientFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: ClientCountAggregateInputType | true;
  };

  export interface ClientDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Client"];
      meta: { name: "Client" };
    };
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(
      args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>
    ): Prisma__ClientClient<
      $Result.GetResult<
        Prisma.$ClientPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(
      args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ClientClient<
      $Result.GetResult<
        Prisma.$ClientPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(
      args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>
    ): Prisma__ClientClient<
      $Result.GetResult<
        Prisma.$ClientPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(
      args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ClientClient<
      $Result.GetResult<
        Prisma.$ClientPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     *
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ClientFindManyArgs>(
      args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ClientPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     *
     */
    create<T extends ClientCreateArgs>(
      args: SelectSubset<T, ClientCreateArgs<ExtArgs>>
    ): Prisma__ClientClient<
      $Result.GetResult<
        Prisma.$ClientPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ClientCreateManyArgs>(
      args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Clients and returns the data saved in the database.
     * @param {ClientCreateManyAndReturnArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ClientCreateManyAndReturnArgs>(
      args?: SelectSubset<T, ClientCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ClientPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     *
     */
    delete<T extends ClientDeleteArgs>(
      args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>
    ): Prisma__ClientClient<
      $Result.GetResult<
        Prisma.$ClientPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ClientUpdateArgs>(
      args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>
    ): Prisma__ClientClient<
      $Result.GetResult<
        Prisma.$ClientPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ClientDeleteManyArgs>(
      args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ClientUpdateManyArgs>(
      args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Clients and returns the data updated in the database.
     * @param {ClientUpdateManyAndReturnArgs} args - Arguments to update many Clients.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Clients and only return the `id`
     * const clientWithIdOnly = await prisma.client.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ClientUpdateManyAndReturnArgs>(
      args: SelectSubset<T, ClientUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$ClientPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(
      args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>
    ): Prisma__ClientClient<
      $Result.GetResult<
        Prisma.$ClientPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
     **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], ClientCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends ClientAggregateArgs>(
      args: Subset<T, ClientAggregateArgs>
    ): Prisma.PrismaPromise<GetClientAggregateType<T>>;

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs["orderBy"] }
        : { orderBy?: ClientGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [
                  Error,
                  "Field ",
                  P,
                  ` in "having" needs to be provided in "by"`
                ];
          }[HavingFields]
        : "take" extends Keys<T>
        ? "orderBy" extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : "skip" extends Keys<T>
        ? "orderBy" extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields]
    >(
      args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetClientGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Client model
     */
    readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    campaigns<T extends Client$campaignsArgs<ExtArgs> = {}>(
      args?: Subset<T, Client$campaignsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$CampaignPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Client model
   */
  interface ClientFieldRefs {
    readonly id: FieldRef<"Client", "String">;
    readonly name: FieldRef<"Client", "String">;
    readonly title: FieldRef<"Client", "String">;
    readonly mobile: FieldRef<"Client", "String">;
    readonly email: FieldRef<"Client", "String">;
    readonly createdAt: FieldRef<"Client", "DateTime">;
    readonly updatedAt: FieldRef<"Client", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null;
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput;
  };

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null;
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput;
  };

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null;
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Clients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[];
  };

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null;
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Clients.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[];
  };

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null;
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Clients.
     */
    skip?: number;
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[];
  };

  /**
   * Client create
   */
  export type ClientCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null;
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>;
  };

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Client createManyAndReturn
   */
  export type ClientCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Client update
   */
  export type ClientUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null;
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>;
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput;
  };

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>;
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput;
    /**
     * Limit how many Clients to update.
     */
    limit?: number;
  };

  /**
   * Client updateManyAndReturn
   */
  export type ClientUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>;
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput;
    /**
     * Limit how many Clients to update.
     */
    limit?: number;
  };

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null;
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput;
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>;
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>;
  };

  /**
   * Client delete
   */
  export type ClientDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null;
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput;
  };

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput;
    /**
     * Limit how many Clients to delete.
     */
    limit?: number;
  };

  /**
   * Client.campaigns
   */
  export type Client$campaignsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null;
    where?: CampaignWhereInput;
    orderBy?:
      | CampaignOrderByWithRelationInput
      | CampaignOrderByWithRelationInput[];
    cursor?: CampaignWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[];
  };

  /**
   * Client without action
   */
  export type ClientDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null;
  };

  /**
   * Model Campaign
   */

  export type AggregateCampaign = {
    _count: CampaignCountAggregateOutputType | null;
    _min: CampaignMinAggregateOutputType | null;
    _max: CampaignMaxAggregateOutputType | null;
  };

  export type CampaignMinAggregateOutputType = {
    id: string | null;
    campaign_name: string | null;
    clientId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type CampaignMaxAggregateOutputType = {
    id: string | null;
    campaign_name: string | null;
    clientId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type CampaignCountAggregateOutputType = {
    id: number;
    campaign_name: number;
    clientId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type CampaignMinAggregateInputType = {
    id?: true;
    campaign_name?: true;
    clientId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type CampaignMaxAggregateInputType = {
    id?: true;
    campaign_name?: true;
    clientId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type CampaignCountAggregateInputType = {
    id?: true;
    campaign_name?: true;
    clientId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type CampaignAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which Campaign to aggregate.
     */
    where?: CampaignWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Campaigns to fetch.
     */
    orderBy?:
      | CampaignOrderByWithRelationInput
      | CampaignOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: CampaignWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Campaigns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Campaigns
     **/
    _count?: true | CampaignCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: CampaignMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: CampaignMaxAggregateInputType;
  };

  export type GetCampaignAggregateType<T extends CampaignAggregateArgs> = {
    [P in keyof T & keyof AggregateCampaign]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCampaign[P]>
      : GetScalarType<T[P], AggregateCampaign[P]>;
  };

  export type CampaignGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: CampaignWhereInput;
    orderBy?:
      | CampaignOrderByWithAggregationInput
      | CampaignOrderByWithAggregationInput[];
    by: CampaignScalarFieldEnum[] | CampaignScalarFieldEnum;
    having?: CampaignScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CampaignCountAggregateInputType | true;
    _min?: CampaignMinAggregateInputType;
    _max?: CampaignMaxAggregateInputType;
  };

  export type CampaignGroupByOutputType = {
    id: string;
    campaign_name: string;
    clientId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: CampaignCountAggregateOutputType | null;
    _min: CampaignMinAggregateOutputType | null;
    _max: CampaignMaxAggregateOutputType | null;
  };

  type GetCampaignGroupByPayload<T extends CampaignGroupByArgs> =
    Prisma.PrismaPromise<
      Array<
        PickEnumerable<CampaignGroupByOutputType, T["by"]> & {
          [P in keyof T & keyof CampaignGroupByOutputType]: P extends "_count"
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CampaignGroupByOutputType[P]>
            : GetScalarType<T[P], CampaignGroupByOutputType[P]>;
        }
      >
    >;

  export type CampaignSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      campaign_name?: boolean;
      clientId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      client?: boolean | ClientDefaultArgs<ExtArgs>;
      ads?: boolean | Campaign$adsArgs<ExtArgs>;
      _count?: boolean | CampaignCountOutputTypeDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["campaign"]
  >;

  export type CampaignSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      campaign_name?: boolean;
      clientId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      client?: boolean | ClientDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["campaign"]
  >;

  export type CampaignSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      campaign_name?: boolean;
      clientId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      client?: boolean | ClientDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["campaign"]
  >;

  export type CampaignSelectScalar = {
    id?: boolean;
    campaign_name?: boolean;
    clientId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type CampaignOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetOmit<
    "id" | "campaign_name" | "clientId" | "createdAt" | "updatedAt",
    ExtArgs["result"]["campaign"]
  >;
  export type CampaignInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    client?: boolean | ClientDefaultArgs<ExtArgs>;
    ads?: boolean | Campaign$adsArgs<ExtArgs>;
    _count?: boolean | CampaignCountOutputTypeDefaultArgs<ExtArgs>;
  };
  export type CampaignIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    client?: boolean | ClientDefaultArgs<ExtArgs>;
  };
  export type CampaignIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    client?: boolean | ClientDefaultArgs<ExtArgs>;
  };

  export type $CampaignPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: "Campaign";
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>;
      ads: Prisma.$AdPayload<ExtArgs>[];
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        campaign_name: string;
        clientId: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["campaign"]
    >;
    composites: {};
  };

  type CampaignGetPayload<
    S extends boolean | null | undefined | CampaignDefaultArgs
  > = $Result.GetResult<Prisma.$CampaignPayload, S>;

  type CampaignCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = Omit<CampaignFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: CampaignCountAggregateInputType | true;
  };

  export interface CampaignDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Campaign"];
      meta: { name: "Campaign" };
    };
    /**
     * Find zero or one Campaign that matches the filter.
     * @param {CampaignFindUniqueArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CampaignFindUniqueArgs>(
      args: SelectSubset<T, CampaignFindUniqueArgs<ExtArgs>>
    ): Prisma__CampaignClient<
      $Result.GetResult<
        Prisma.$CampaignPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Campaign that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CampaignFindUniqueOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CampaignFindUniqueOrThrowArgs>(
      args: SelectSubset<T, CampaignFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__CampaignClient<
      $Result.GetResult<
        Prisma.$CampaignPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Campaign that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CampaignFindFirstArgs>(
      args?: SelectSubset<T, CampaignFindFirstArgs<ExtArgs>>
    ): Prisma__CampaignClient<
      $Result.GetResult<
        Prisma.$CampaignPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Campaign that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindFirstOrThrowArgs} args - Arguments to find a Campaign
     * @example
     * // Get one Campaign
     * const campaign = await prisma.campaign.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CampaignFindFirstOrThrowArgs>(
      args?: SelectSubset<T, CampaignFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__CampaignClient<
      $Result.GetResult<
        Prisma.$CampaignPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Campaigns that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Campaigns
     * const campaigns = await prisma.campaign.findMany()
     *
     * // Get first 10 Campaigns
     * const campaigns = await prisma.campaign.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const campaignWithIdOnly = await prisma.campaign.findMany({ select: { id: true } })
     *
     */
    findMany<T extends CampaignFindManyArgs>(
      args?: SelectSubset<T, CampaignFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$CampaignPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Campaign.
     * @param {CampaignCreateArgs} args - Arguments to create a Campaign.
     * @example
     * // Create one Campaign
     * const Campaign = await prisma.campaign.create({
     *   data: {
     *     // ... data to create a Campaign
     *   }
     * })
     *
     */
    create<T extends CampaignCreateArgs>(
      args: SelectSubset<T, CampaignCreateArgs<ExtArgs>>
    ): Prisma__CampaignClient<
      $Result.GetResult<
        Prisma.$CampaignPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Campaigns.
     * @param {CampaignCreateManyArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaign = await prisma.campaign.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends CampaignCreateManyArgs>(
      args?: SelectSubset<T, CampaignCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Campaigns and returns the data saved in the database.
     * @param {CampaignCreateManyAndReturnArgs} args - Arguments to create many Campaigns.
     * @example
     * // Create many Campaigns
     * const campaign = await prisma.campaign.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Campaigns and only return the `id`
     * const campaignWithIdOnly = await prisma.campaign.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends CampaignCreateManyAndReturnArgs>(
      args?: SelectSubset<T, CampaignCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$CampaignPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Campaign.
     * @param {CampaignDeleteArgs} args - Arguments to delete one Campaign.
     * @example
     * // Delete one Campaign
     * const Campaign = await prisma.campaign.delete({
     *   where: {
     *     // ... filter to delete one Campaign
     *   }
     * })
     *
     */
    delete<T extends CampaignDeleteArgs>(
      args: SelectSubset<T, CampaignDeleteArgs<ExtArgs>>
    ): Prisma__CampaignClient<
      $Result.GetResult<
        Prisma.$CampaignPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Campaign.
     * @param {CampaignUpdateArgs} args - Arguments to update one Campaign.
     * @example
     * // Update one Campaign
     * const campaign = await prisma.campaign.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends CampaignUpdateArgs>(
      args: SelectSubset<T, CampaignUpdateArgs<ExtArgs>>
    ): Prisma__CampaignClient<
      $Result.GetResult<
        Prisma.$CampaignPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Campaigns.
     * @param {CampaignDeleteManyArgs} args - Arguments to filter Campaigns to delete.
     * @example
     * // Delete a few Campaigns
     * const { count } = await prisma.campaign.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends CampaignDeleteManyArgs>(
      args?: SelectSubset<T, CampaignDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Campaigns
     * const campaign = await prisma.campaign.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends CampaignUpdateManyArgs>(
      args: SelectSubset<T, CampaignUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Campaigns and returns the data updated in the database.
     * @param {CampaignUpdateManyAndReturnArgs} args - Arguments to update many Campaigns.
     * @example
     * // Update many Campaigns
     * const campaign = await prisma.campaign.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Campaigns and only return the `id`
     * const campaignWithIdOnly = await prisma.campaign.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends CampaignUpdateManyAndReturnArgs>(
      args: SelectSubset<T, CampaignUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$CampaignPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Campaign.
     * @param {CampaignUpsertArgs} args - Arguments to update or create a Campaign.
     * @example
     * // Update or create a Campaign
     * const campaign = await prisma.campaign.upsert({
     *   create: {
     *     // ... data to create a Campaign
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Campaign we want to update
     *   }
     * })
     */
    upsert<T extends CampaignUpsertArgs>(
      args: SelectSubset<T, CampaignUpsertArgs<ExtArgs>>
    ): Prisma__CampaignClient<
      $Result.GetResult<
        Prisma.$CampaignPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Campaigns.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignCountArgs} args - Arguments to filter Campaigns to count.
     * @example
     * // Count the number of Campaigns
     * const count = await prisma.campaign.count({
     *   where: {
     *     // ... the filter for the Campaigns we want to count
     *   }
     * })
     **/
    count<T extends CampaignCountArgs>(
      args?: Subset<T, CampaignCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], CampaignCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends CampaignAggregateArgs>(
      args: Subset<T, CampaignAggregateArgs>
    ): Prisma.PrismaPromise<GetCampaignAggregateType<T>>;

    /**
     * Group by Campaign.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CampaignGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends CampaignGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CampaignGroupByArgs["orderBy"] }
        : { orderBy?: CampaignGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [
                  Error,
                  "Field ",
                  P,
                  ` in "having" needs to be provided in "by"`
                ];
          }[HavingFields]
        : "take" extends Keys<T>
        ? "orderBy" extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : "skip" extends Keys<T>
        ? "orderBy" extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields]
    >(
      args: SubsetIntersection<T, CampaignGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetCampaignGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Campaign model
     */
    readonly fields: CampaignFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Campaign.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CampaignClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, ClientDefaultArgs<ExtArgs>>
    ): Prisma__ClientClient<
      | $Result.GetResult<
          Prisma.$ClientPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    ads<T extends Campaign$adsArgs<ExtArgs> = {}>(
      args?: Subset<T, Campaign$adsArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      | $Result.GetResult<
          Prisma.$AdPayload<ExtArgs>,
          T,
          "findMany",
          GlobalOmitOptions
        >
      | Null
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Campaign model
   */
  interface CampaignFieldRefs {
    readonly id: FieldRef<"Campaign", "String">;
    readonly campaign_name: FieldRef<"Campaign", "String">;
    readonly clientId: FieldRef<"Campaign", "String">;
    readonly createdAt: FieldRef<"Campaign", "DateTime">;
    readonly updatedAt: FieldRef<"Campaign", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Campaign findUnique
   */
  export type CampaignFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null;
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput;
  };

  /**
   * Campaign findUniqueOrThrow
   */
  export type CampaignFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null;
    /**
     * Filter, which Campaign to fetch.
     */
    where: CampaignWhereUniqueInput;
  };

  /**
   * Campaign findFirst
   */
  export type CampaignFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null;
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Campaigns to fetch.
     */
    orderBy?:
      | CampaignOrderByWithRelationInput
      | CampaignOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Campaigns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[];
  };

  /**
   * Campaign findFirstOrThrow
   */
  export type CampaignFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null;
    /**
     * Filter, which Campaign to fetch.
     */
    where?: CampaignWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Campaigns to fetch.
     */
    orderBy?:
      | CampaignOrderByWithRelationInput
      | CampaignOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Campaigns.
     */
    cursor?: CampaignWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Campaigns.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Campaigns.
     */
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[];
  };

  /**
   * Campaign findMany
   */
  export type CampaignFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null;
    /**
     * Filter, which Campaigns to fetch.
     */
    where?: CampaignWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Campaigns to fetch.
     */
    orderBy?:
      | CampaignOrderByWithRelationInput
      | CampaignOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Campaigns.
     */
    cursor?: CampaignWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Campaigns from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Campaigns.
     */
    skip?: number;
    distinct?: CampaignScalarFieldEnum | CampaignScalarFieldEnum[];
  };

  /**
   * Campaign create
   */
  export type CampaignCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null;
    /**
     * The data needed to create a Campaign.
     */
    data: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>;
  };

  /**
   * Campaign createMany
   */
  export type CampaignCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many Campaigns.
     */
    data: CampaignCreateManyInput | CampaignCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Campaign createManyAndReturn
   */
  export type CampaignCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null;
    /**
     * The data used to create many Campaigns.
     */
    data: CampaignCreateManyInput | CampaignCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Campaign update
   */
  export type CampaignUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null;
    /**
     * The data needed to update a Campaign.
     */
    data: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>;
    /**
     * Choose, which Campaign to update.
     */
    where: CampaignWhereUniqueInput;
  };

  /**
   * Campaign updateMany
   */
  export type CampaignUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update Campaigns.
     */
    data: XOR<
      CampaignUpdateManyMutationInput,
      CampaignUncheckedUpdateManyInput
    >;
    /**
     * Filter which Campaigns to update
     */
    where?: CampaignWhereInput;
    /**
     * Limit how many Campaigns to update.
     */
    limit?: number;
  };

  /**
   * Campaign updateManyAndReturn
   */
  export type CampaignUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null;
    /**
     * The data used to update Campaigns.
     */
    data: XOR<
      CampaignUpdateManyMutationInput,
      CampaignUncheckedUpdateManyInput
    >;
    /**
     * Filter which Campaigns to update
     */
    where?: CampaignWhereInput;
    /**
     * Limit how many Campaigns to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Campaign upsert
   */
  export type CampaignUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null;
    /**
     * The filter to search for the Campaign to update in case it exists.
     */
    where: CampaignWhereUniqueInput;
    /**
     * In case the Campaign found by the `where` argument doesn't exist, create a new Campaign with this data.
     */
    create: XOR<CampaignCreateInput, CampaignUncheckedCreateInput>;
    /**
     * In case the Campaign was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CampaignUpdateInput, CampaignUncheckedUpdateInput>;
  };

  /**
   * Campaign delete
   */
  export type CampaignDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null;
    /**
     * Filter which Campaign to delete.
     */
    where: CampaignWhereUniqueInput;
  };

  /**
   * Campaign deleteMany
   */
  export type CampaignDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which Campaigns to delete
     */
    where?: CampaignWhereInput;
    /**
     * Limit how many Campaigns to delete.
     */
    limit?: number;
  };

  /**
   * Campaign.ads
   */
  export type Campaign$adsArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Ad
     */
    select?: AdSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ad
     */
    omit?: AdOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdInclude<ExtArgs> | null;
    where?: AdWhereInput;
    orderBy?: AdOrderByWithRelationInput | AdOrderByWithRelationInput[];
    cursor?: AdWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: AdScalarFieldEnum | AdScalarFieldEnum[];
  };

  /**
   * Campaign without action
   */
  export type CampaignDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Campaign
     */
    select?: CampaignSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Campaign
     */
    omit?: CampaignOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CampaignInclude<ExtArgs> | null;
  };

  /**
   * Model Ad
   */

  export type AggregateAd = {
    _count: AdCountAggregateOutputType | null;
    _avg: AdAvgAggregateOutputType | null;
    _sum: AdSumAggregateOutputType | null;
    _min: AdMinAggregateOutputType | null;
    _max: AdMaxAggregateOutputType | null;
  };

  export type AdAvgAggregateOutputType = {
    likesCount: number | null;
    viewsCount: number | null;
  };

  export type AdSumAggregateOutputType = {
    likesCount: number | null;
    viewsCount: number | null;
  };

  export type AdMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    isHappyHour: boolean | null;
    isHot: boolean | null;
    isPremium: boolean | null;
    likesCount: number | null;
    viewsCount: number | null;
    priority: boolean | null;
    campaignId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type AdMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    isHappyHour: boolean | null;
    isHot: boolean | null;
    isPremium: boolean | null;
    likesCount: number | null;
    viewsCount: number | null;
    priority: boolean | null;
    campaignId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
  };

  export type AdCountAggregateOutputType = {
    id: number;
    name: number;
    imageUrl: number;
    isHappyHour: number;
    isHot: number;
    isPremium: number;
    likesCount: number;
    viewsCount: number;
    priority: number;
    campaignId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
  };

  export type AdAvgAggregateInputType = {
    likesCount?: true;
    viewsCount?: true;
  };

  export type AdSumAggregateInputType = {
    likesCount?: true;
    viewsCount?: true;
  };

  export type AdMinAggregateInputType = {
    id?: true;
    name?: true;
    imageUrl?: true;
    isHappyHour?: true;
    isHot?: true;
    isPremium?: true;
    likesCount?: true;
    viewsCount?: true;
    priority?: true;
    campaignId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type AdMaxAggregateInputType = {
    id?: true;
    name?: true;
    imageUrl?: true;
    isHappyHour?: true;
    isHot?: true;
    isPremium?: true;
    likesCount?: true;
    viewsCount?: true;
    priority?: true;
    campaignId?: true;
    createdAt?: true;
    updatedAt?: true;
  };

  export type AdCountAggregateInputType = {
    id?: true;
    name?: true;
    imageUrl?: true;
    isHappyHour?: true;
    isHot?: true;
    isPremium?: true;
    likesCount?: true;
    viewsCount?: true;
    priority?: true;
    campaignId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
  };

  export type AdAggregateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which Ad to aggregate.
     */
    where?: AdWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Ads to fetch.
     */
    orderBy?: AdOrderByWithRelationInput | AdOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: AdWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Ads from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Ads.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Ads
     **/
    _count?: true | AdCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
     **/
    _avg?: AdAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
     **/
    _sum?: AdSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
     **/
    _min?: AdMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
     **/
    _max?: AdMaxAggregateInputType;
  };

  export type GetAdAggregateType<T extends AdAggregateArgs> = {
    [P in keyof T & keyof AggregateAd]: P extends "_count" | "count"
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAd[P]>
      : GetScalarType<T[P], AggregateAd[P]>;
  };

  export type AdGroupByArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    where?: AdWhereInput;
    orderBy?: AdOrderByWithAggregationInput | AdOrderByWithAggregationInput[];
    by: AdScalarFieldEnum[] | AdScalarFieldEnum;
    having?: AdScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: AdCountAggregateInputType | true;
    _avg?: AdAvgAggregateInputType;
    _sum?: AdSumAggregateInputType;
    _min?: AdMinAggregateInputType;
    _max?: AdMaxAggregateInputType;
  };

  export type AdGroupByOutputType = {
    id: string;
    name: string;
    isHappyHour: boolean;
    isHot: boolean;
    isPremium: boolean;
    likesCount: number;
    viewsCount: number;
    priority: boolean;
    campaignId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: AdCountAggregateOutputType | null;
    _avg: AdAvgAggregateOutputType | null;
    _sum: AdSumAggregateOutputType | null;
    _min: AdMinAggregateOutputType | null;
    _max: AdMaxAggregateOutputType | null;
  };

  type GetAdGroupByPayload<T extends AdGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdGroupByOutputType, T["by"]> & {
        [P in keyof T & keyof AdGroupByOutputType]: P extends "_count"
          ? T[P] extends boolean
            ? number
            : GetScalarType<T[P], AdGroupByOutputType[P]>
          : GetScalarType<T[P], AdGroupByOutputType[P]>;
      }
    >
  >;

  export type AdSelect<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      imageUrl?: boolean;
      isHappyHour?: boolean;
      isHot?: boolean;
      isPremium?: boolean;
      likesCount?: boolean;
      viewsCount?: boolean;
      priority?: boolean;
      campaignId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      campaign?: boolean | CampaignDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["ad"]
  >;

  export type AdSelectCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      imageUrl?: boolean;
      isHappyHour?: boolean;
      isHot?: boolean;
      isPremium?: boolean;
      likesCount?: boolean;
      viewsCount?: boolean;
      priority?: boolean;
      campaignId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      campaign?: boolean | CampaignDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["ad"]
  >;

  export type AdSelectUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetSelect<
    {
      id?: boolean;
      name?: boolean;
      imageUrl?: boolean;
      isHappyHour?: boolean;
      isHot?: boolean;
      isPremium?: boolean;
      likesCount?: boolean;
      viewsCount?: boolean;
      priority?: boolean;
      campaignId?: boolean;
      createdAt?: boolean;
      updatedAt?: boolean;
      campaign?: boolean | CampaignDefaultArgs<ExtArgs>;
    },
    ExtArgs["result"]["ad"]
  >;

  export type AdSelectScalar = {
    id?: boolean;
    name?: boolean;
    imageUrl?: boolean;
    isHappyHour?: boolean;
    isHot?: boolean;
    isPremium?: boolean;
    likesCount?: boolean;
    viewsCount?: boolean;
    priority?: boolean;
    campaignId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
  };

  export type AdOmit<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = $Extensions.GetOmit<
    | "id"
    | "name"
    | "imageUrl"
    | "isHappyHour"
    | "isHot"
    | "isPremium"
    | "likesCount"
    | "viewsCount"
    | "priority"
    | "campaignId"
    | "createdAt"
    | "updatedAt",
    ExtArgs["result"]["ad"]
  >;
  export type AdInclude<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>;
  };
  export type AdIncludeCreateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>;
  };
  export type AdIncludeUpdateManyAndReturn<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    campaign?: boolean | CampaignDefaultArgs<ExtArgs>;
  };

  export type $AdPayload<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    name: "Ad";
    objects: {
      campaign: Prisma.$CampaignPayload<ExtArgs>;
    };
    scalars: $Extensions.GetPayloadResult<
      {
        id: string;
        name: string;
        isHappyHour: boolean;
        isHot: boolean;
        isPremium: boolean;
        likesCount: number;
        viewsCount: number;
        priority: boolean;
        campaignId: string;
        createdAt: Date;
        updatedAt: Date;
      },
      ExtArgs["result"]["ad"]
    >;
    composites: {};
  };

  type AdGetPayload<S extends boolean | null | undefined | AdDefaultArgs> =
    $Result.GetResult<Prisma.$AdPayload, S>;

  type AdCountArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = Omit<AdFindManyArgs, "select" | "include" | "distinct" | "omit"> & {
    select?: AdCountAggregateInputType | true;
  };

  export interface AdDelegate<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > {
    [K: symbol]: {
      types: Prisma.TypeMap<ExtArgs>["model"]["Ad"];
      meta: { name: "Ad" };
    };
    /**
     * Find zero or one Ad that matches the filter.
     * @param {AdFindUniqueArgs} args - Arguments to find a Ad
     * @example
     * // Get one Ad
     * const ad = await prisma.ad.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdFindUniqueArgs>(
      args: SelectSubset<T, AdFindUniqueArgs<ExtArgs>>
    ): Prisma__AdClient<
      $Result.GetResult<
        Prisma.$AdPayload<ExtArgs>,
        T,
        "findUnique",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find one Ad that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdFindUniqueOrThrowArgs} args - Arguments to find a Ad
     * @example
     * // Get one Ad
     * const ad = await prisma.ad.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdFindUniqueOrThrowArgs>(
      args: SelectSubset<T, AdFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__AdClient<
      $Result.GetResult<
        Prisma.$AdPayload<ExtArgs>,
        T,
        "findUniqueOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Ad that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdFindFirstArgs} args - Arguments to find a Ad
     * @example
     * // Get one Ad
     * const ad = await prisma.ad.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdFindFirstArgs>(
      args?: SelectSubset<T, AdFindFirstArgs<ExtArgs>>
    ): Prisma__AdClient<
      $Result.GetResult<
        Prisma.$AdPayload<ExtArgs>,
        T,
        "findFirst",
        GlobalOmitOptions
      > | null,
      null,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find the first Ad that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdFindFirstOrThrowArgs} args - Arguments to find a Ad
     * @example
     * // Get one Ad
     * const ad = await prisma.ad.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AdFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__AdClient<
      $Result.GetResult<
        Prisma.$AdPayload<ExtArgs>,
        T,
        "findFirstOrThrow",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Find zero or more Ads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Ads
     * const ads = await prisma.ad.findMany()
     *
     * // Get first 10 Ads
     * const ads = await prisma.ad.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const adWithIdOnly = await prisma.ad.findMany({ select: { id: true } })
     *
     */
    findMany<T extends AdFindManyArgs>(
      args?: SelectSubset<T, AdFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AdPayload<ExtArgs>,
        T,
        "findMany",
        GlobalOmitOptions
      >
    >;

    /**
     * Create a Ad.
     * @param {AdCreateArgs} args - Arguments to create a Ad.
     * @example
     * // Create one Ad
     * const Ad = await prisma.ad.create({
     *   data: {
     *     // ... data to create a Ad
     *   }
     * })
     *
     */
    create<T extends AdCreateArgs>(
      args: SelectSubset<T, AdCreateArgs<ExtArgs>>
    ): Prisma__AdClient<
      $Result.GetResult<
        Prisma.$AdPayload<ExtArgs>,
        T,
        "create",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Create many Ads.
     * @param {AdCreateManyArgs} args - Arguments to create many Ads.
     * @example
     * // Create many Ads
     * const ad = await prisma.ad.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends AdCreateManyArgs>(
      args?: SelectSubset<T, AdCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Create many Ads and returns the data saved in the database.
     * @param {AdCreateManyAndReturnArgs} args - Arguments to create many Ads.
     * @example
     * // Create many Ads
     * const ad = await prisma.ad.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Ads and only return the `id`
     * const adWithIdOnly = await prisma.ad.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends AdCreateManyAndReturnArgs>(
      args?: SelectSubset<T, AdCreateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AdPayload<ExtArgs>,
        T,
        "createManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Delete a Ad.
     * @param {AdDeleteArgs} args - Arguments to delete one Ad.
     * @example
     * // Delete one Ad
     * const Ad = await prisma.ad.delete({
     *   where: {
     *     // ... filter to delete one Ad
     *   }
     * })
     *
     */
    delete<T extends AdDeleteArgs>(
      args: SelectSubset<T, AdDeleteArgs<ExtArgs>>
    ): Prisma__AdClient<
      $Result.GetResult<
        Prisma.$AdPayload<ExtArgs>,
        T,
        "delete",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Update one Ad.
     * @param {AdUpdateArgs} args - Arguments to update one Ad.
     * @example
     * // Update one Ad
     * const ad = await prisma.ad.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends AdUpdateArgs>(
      args: SelectSubset<T, AdUpdateArgs<ExtArgs>>
    ): Prisma__AdClient<
      $Result.GetResult<
        Prisma.$AdPayload<ExtArgs>,
        T,
        "update",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Delete zero or more Ads.
     * @param {AdDeleteManyArgs} args - Arguments to filter Ads to delete.
     * @example
     * // Delete a few Ads
     * const { count } = await prisma.ad.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends AdDeleteManyArgs>(
      args?: SelectSubset<T, AdDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Ads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Ads
     * const ad = await prisma.ad.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends AdUpdateManyArgs>(
      args: SelectSubset<T, AdUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>;

    /**
     * Update zero or more Ads and returns the data updated in the database.
     * @param {AdUpdateManyAndReturnArgs} args - Arguments to update many Ads.
     * @example
     * // Update many Ads
     * const ad = await prisma.ad.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Ads and only return the `id`
     * const adWithIdOnly = await prisma.ad.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends AdUpdateManyAndReturnArgs>(
      args: SelectSubset<T, AdUpdateManyAndReturnArgs<ExtArgs>>
    ): Prisma.PrismaPromise<
      $Result.GetResult<
        Prisma.$AdPayload<ExtArgs>,
        T,
        "updateManyAndReturn",
        GlobalOmitOptions
      >
    >;

    /**
     * Create or update one Ad.
     * @param {AdUpsertArgs} args - Arguments to update or create a Ad.
     * @example
     * // Update or create a Ad
     * const ad = await prisma.ad.upsert({
     *   create: {
     *     // ... data to create a Ad
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Ad we want to update
     *   }
     * })
     */
    upsert<T extends AdUpsertArgs>(
      args: SelectSubset<T, AdUpsertArgs<ExtArgs>>
    ): Prisma__AdClient<
      $Result.GetResult<
        Prisma.$AdPayload<ExtArgs>,
        T,
        "upsert",
        GlobalOmitOptions
      >,
      never,
      ExtArgs,
      GlobalOmitOptions
    >;

    /**
     * Count the number of Ads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdCountArgs} args - Arguments to filter Ads to count.
     * @example
     * // Count the number of Ads
     * const count = await prisma.ad.count({
     *   where: {
     *     // ... the filter for the Ads we want to count
     *   }
     * })
     **/
    count<T extends AdCountArgs>(
      args?: Subset<T, AdCountArgs>
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<"select", any>
        ? T["select"] extends true
          ? number
          : GetScalarType<T["select"], AdCountAggregateOutputType>
        : number
    >;

    /**
     * Allows you to perform aggregations operations on a Ad.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
     **/
    aggregate<T extends AdAggregateArgs>(
      args: Subset<T, AdAggregateArgs>
    ): Prisma.PrismaPromise<GetAdAggregateType<T>>;

    /**
     * Group by Ad.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
     **/
    groupBy<
      T extends AdGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<"skip", Keys<T>>,
        Extends<"take", Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdGroupByArgs["orderBy"] }
        : { orderBy?: AdGroupByArgs["orderBy"] },
      OrderFields extends ExcludeUnderscoreKeys<
        Keys<MaybeTupleToUnion<T["orderBy"]>>
      >,
      ByFields extends MaybeTupleToUnion<T["by"]>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T["having"]>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T["by"] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
        ? `Error: "by" must not be empty.`
        : HavingValid extends False
        ? {
            [P in HavingFields]: P extends ByFields
              ? never
              : P extends string
              ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
              : [
                  Error,
                  "Field ",
                  P,
                  ` in "having" needs to be provided in "by"`
                ];
          }[HavingFields]
        : "take" extends Keys<T>
        ? "orderBy" extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "take", you also need to provide "orderBy"'
        : "skip" extends Keys<T>
        ? "orderBy" extends Keys<T>
          ? ByValid extends True
            ? {}
            : {
                [P in OrderFields]: P extends ByFields
                  ? never
                  : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
              }[OrderFields]
          : 'Error: If you provide "skip", you also need to provide "orderBy"'
        : ByValid extends True
        ? {}
        : {
            [P in OrderFields]: P extends ByFields
              ? never
              : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
          }[OrderFields]
    >(
      args: SubsetIntersection<T, AdGroupByArgs, OrderByArg> & InputErrors
    ): {} extends InputErrors
      ? GetAdGroupByPayload<T>
      : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Ad model
     */
    readonly fields: AdFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Ad.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdClient<
    T,
    Null = never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
    GlobalOmitOptions = {}
  > extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    campaign<T extends CampaignDefaultArgs<ExtArgs> = {}>(
      args?: Subset<T, CampaignDefaultArgs<ExtArgs>>
    ): Prisma__CampaignClient<
      | $Result.GetResult<
          Prisma.$CampaignPayload<ExtArgs>,
          T,
          "findUniqueOrThrow",
          GlobalOmitOptions
        >
      | Null,
      Null,
      ExtArgs,
      GlobalOmitOptions
    >;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(
      onfulfilled?:
        | ((value: T) => TResult1 | PromiseLike<TResult1>)
        | undefined
        | null,
      onrejected?:
        | ((reason: any) => TResult2 | PromiseLike<TResult2>)
        | undefined
        | null
    ): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(
      onrejected?:
        | ((reason: any) => TResult | PromiseLike<TResult>)
        | undefined
        | null
    ): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }

  /**
   * Fields of the Ad model
   */
  interface AdFieldRefs {
    readonly id: FieldRef<"Ad", "String">;
    readonly name: FieldRef<"Ad", "String">;
    readonly imageUrl: FieldRef<"Ad", "String">;
    readonly isHappyHour: FieldRef<"Ad", "Boolean">;
    readonly isHot: FieldRef<"Ad", "Boolean">;
    readonly isPremium: FieldRef<"Ad", "Boolean">;
    readonly likesCount: FieldRef<"Ad", "Int">;
    readonly viewsCount: FieldRef<"Ad", "Int">;
    readonly priority: FieldRef<"Ad", "Boolean">;
    readonly campaignId: FieldRef<"Ad", "String">;
    readonly createdAt: FieldRef<"Ad", "DateTime">;
    readonly updatedAt: FieldRef<"Ad", "DateTime">;
  }

  // Custom InputTypes
  /**
   * Ad findUnique
   */
  export type AdFindUniqueArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Ad
     */
    select?: AdSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ad
     */
    omit?: AdOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdInclude<ExtArgs> | null;
    /**
     * Filter, which Ad to fetch.
     */
    where: AdWhereUniqueInput;
  };

  /**
   * Ad findUniqueOrThrow
   */
  export type AdFindUniqueOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Ad
     */
    select?: AdSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ad
     */
    omit?: AdOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdInclude<ExtArgs> | null;
    /**
     * Filter, which Ad to fetch.
     */
    where: AdWhereUniqueInput;
  };

  /**
   * Ad findFirst
   */
  export type AdFindFirstArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Ad
     */
    select?: AdSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ad
     */
    omit?: AdOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdInclude<ExtArgs> | null;
    /**
     * Filter, which Ad to fetch.
     */
    where?: AdWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Ads to fetch.
     */
    orderBy?: AdOrderByWithRelationInput | AdOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Ads.
     */
    cursor?: AdWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Ads from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Ads.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Ads.
     */
    distinct?: AdScalarFieldEnum | AdScalarFieldEnum[];
  };

  /**
   * Ad findFirstOrThrow
   */
  export type AdFindFirstOrThrowArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Ad
     */
    select?: AdSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ad
     */
    omit?: AdOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdInclude<ExtArgs> | null;
    /**
     * Filter, which Ad to fetch.
     */
    where?: AdWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Ads to fetch.
     */
    orderBy?: AdOrderByWithRelationInput | AdOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Ads.
     */
    cursor?: AdWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Ads from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Ads.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Ads.
     */
    distinct?: AdScalarFieldEnum | AdScalarFieldEnum[];
  };

  /**
   * Ad findMany
   */
  export type AdFindManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Ad
     */
    select?: AdSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ad
     */
    omit?: AdOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdInclude<ExtArgs> | null;
    /**
     * Filter, which Ads to fetch.
     */
    where?: AdWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Ads to fetch.
     */
    orderBy?: AdOrderByWithRelationInput | AdOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Ads.
     */
    cursor?: AdWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Ads from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Ads.
     */
    skip?: number;
    distinct?: AdScalarFieldEnum | AdScalarFieldEnum[];
  };

  /**
   * Ad create
   */
  export type AdCreateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Ad
     */
    select?: AdSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ad
     */
    omit?: AdOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdInclude<ExtArgs> | null;
    /**
     * The data needed to create a Ad.
     */
    data: XOR<AdCreateInput, AdUncheckedCreateInput>;
  };

  /**
   * Ad createMany
   */
  export type AdCreateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to create many Ads.
     */
    data: AdCreateManyInput | AdCreateManyInput[];
    skipDuplicates?: boolean;
  };

  /**
   * Ad createManyAndReturn
   */
  export type AdCreateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Ad
     */
    select?: AdSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Ad
     */
    omit?: AdOmit<ExtArgs> | null;
    /**
     * The data used to create many Ads.
     */
    data: AdCreateManyInput | AdCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdIncludeCreateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Ad update
   */
  export type AdUpdateArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Ad
     */
    select?: AdSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ad
     */
    omit?: AdOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdInclude<ExtArgs> | null;
    /**
     * The data needed to update a Ad.
     */
    data: XOR<AdUpdateInput, AdUncheckedUpdateInput>;
    /**
     * Choose, which Ad to update.
     */
    where: AdWhereUniqueInput;
  };

  /**
   * Ad updateMany
   */
  export type AdUpdateManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * The data used to update Ads.
     */
    data: XOR<AdUpdateManyMutationInput, AdUncheckedUpdateManyInput>;
    /**
     * Filter which Ads to update
     */
    where?: AdWhereInput;
    /**
     * Limit how many Ads to update.
     */
    limit?: number;
  };

  /**
   * Ad updateManyAndReturn
   */
  export type AdUpdateManyAndReturnArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Ad
     */
    select?: AdSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Ad
     */
    omit?: AdOmit<ExtArgs> | null;
    /**
     * The data used to update Ads.
     */
    data: XOR<AdUpdateManyMutationInput, AdUncheckedUpdateManyInput>;
    /**
     * Filter which Ads to update
     */
    where?: AdWhereInput;
    /**
     * Limit how many Ads to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdIncludeUpdateManyAndReturn<ExtArgs> | null;
  };

  /**
   * Ad upsert
   */
  export type AdUpsertArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Ad
     */
    select?: AdSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ad
     */
    omit?: AdOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdInclude<ExtArgs> | null;
    /**
     * The filter to search for the Ad to update in case it exists.
     */
    where: AdWhereUniqueInput;
    /**
     * In case the Ad found by the `where` argument doesn't exist, create a new Ad with this data.
     */
    create: XOR<AdCreateInput, AdUncheckedCreateInput>;
    /**
     * In case the Ad was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdUpdateInput, AdUncheckedUpdateInput>;
  };

  /**
   * Ad delete
   */
  export type AdDeleteArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Ad
     */
    select?: AdSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ad
     */
    omit?: AdOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdInclude<ExtArgs> | null;
    /**
     * Filter which Ad to delete.
     */
    where: AdWhereUniqueInput;
  };

  /**
   * Ad deleteMany
   */
  export type AdDeleteManyArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Filter which Ads to delete
     */
    where?: AdWhereInput;
    /**
     * Limit how many Ads to delete.
     */
    limit?: number;
  };

  /**
   * Ad without action
   */
  export type AdDefaultArgs<
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
  > = {
    /**
     * Select specific fields to fetch from the Ad
     */
    select?: AdSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Ad
     */
    omit?: AdOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AdInclude<ExtArgs> | null;
  };

  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: "ReadUncommitted";
    ReadCommitted: "ReadCommitted";
    RepeatableRead: "RepeatableRead";
    Serializable: "Serializable";
  };

  export type TransactionIsolationLevel =
    (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];

  export const UserScalarFieldEnum: {
    id: "id";
    email: "email";
    username: "username";
    name: "name";
    last: "last";
    password: "password";
    bio: "bio";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type UserScalarFieldEnum =
    (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];

  export const ClientScalarFieldEnum: {
    id: "id";
    name: "name";
    title: "title";
    mobile: "mobile";
    email: "email";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type ClientScalarFieldEnum =
    (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum];

  export const CampaignScalarFieldEnum: {
    id: "id";
    campaign_name: "campaign_name";
    clientId: "clientId";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type CampaignScalarFieldEnum =
    (typeof CampaignScalarFieldEnum)[keyof typeof CampaignScalarFieldEnum];

  export const AdScalarFieldEnum: {
    id: "id";
    name: "name";
    imageUrl: "imageUrl";
    isHappyHour: "isHappyHour";
    isHot: "isHot";
    isPremium: "isPremium";
    likesCount: "likesCount";
    viewsCount: "viewsCount";
    priority: "priority";
    campaignId: "campaignId";
    createdAt: "createdAt";
    updatedAt: "updatedAt";
  };

  export type AdScalarFieldEnum =
    (typeof AdScalarFieldEnum)[keyof typeof AdScalarFieldEnum];

  export const SortOrder: {
    asc: "asc";
    desc: "desc";
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];

  export const QueryMode: {
    default: "default";
    insensitive: "insensitive";
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];

  export const NullsOrder: {
    first: "first";
    last: "last";
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];

  /**
   * Field references
   */

  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String"
  >;

  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "String[]"
  >;

  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime"
  >;

  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "DateTime[]"
  >;

  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Boolean"
  >;

  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int"
  >;

  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Int[]"
  >;

  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Float"
  >;

  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<
    $PrismaModel,
    "Float[]"
  >;

  /**
   * Deep Input Types
   */

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[];
    OR?: UserWhereInput[];
    NOT?: UserWhereInput | UserWhereInput[];
    id?: StringFilter<"User"> | string;
    email?: StringFilter<"User"> | string;
    username?: StringFilter<"User"> | string;
    name?: StringNullableFilter<"User"> | string | null;
    last?: StringNullableFilter<"User"> | string | null;
    password?: StringFilter<"User"> | string;
    bio?: StringNullableFilter<"User"> | string | null;
    createdAt?: DateTimeFilter<"User"> | Date | string;
    updatedAt?: DateTimeFilter<"User"> | Date | string;
  };

  export type UserOrderByWithRelationInput = {
    id?: SortOrder;
    email?: SortOrder;
    username?: SortOrder;
    name?: SortOrderInput | SortOrder;
    last?: SortOrderInput | SortOrder;
    password?: SortOrder;
    bio?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      email?: string;
      username?: string;
      AND?: UserWhereInput | UserWhereInput[];
      OR?: UserWhereInput[];
      NOT?: UserWhereInput | UserWhereInput[];
      name?: StringNullableFilter<"User"> | string | null;
      last?: StringNullableFilter<"User"> | string | null;
      password?: StringFilter<"User"> | string;
      bio?: StringNullableFilter<"User"> | string | null;
      createdAt?: DateTimeFilter<"User"> | Date | string;
      updatedAt?: DateTimeFilter<"User"> | Date | string;
    },
    "id" | "email" | "username"
  >;

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder;
    email?: SortOrder;
    username?: SortOrder;
    name?: SortOrderInput | SortOrder;
    last?: SortOrderInput | SortOrder;
    password?: SortOrder;
    bio?: SortOrderInput | SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: UserCountOrderByAggregateInput;
    _max?: UserMaxOrderByAggregateInput;
    _min?: UserMinOrderByAggregateInput;
  };

  export type UserScalarWhereWithAggregatesInput = {
    AND?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    OR?: UserScalarWhereWithAggregatesInput[];
    NOT?:
      | UserScalarWhereWithAggregatesInput
      | UserScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"User"> | string;
    email?: StringWithAggregatesFilter<"User"> | string;
    username?: StringWithAggregatesFilter<"User"> | string;
    name?: StringNullableWithAggregatesFilter<"User"> | string | null;
    last?: StringNullableWithAggregatesFilter<"User"> | string | null;
    password?: StringWithAggregatesFilter<"User"> | string;
    bio?: StringNullableWithAggregatesFilter<"User"> | string | null;
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string;
  };

  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[];
    OR?: ClientWhereInput[];
    NOT?: ClientWhereInput | ClientWhereInput[];
    id?: StringFilter<"Client"> | string;
    name?: StringFilter<"Client"> | string;
    title?: StringFilter<"Client"> | string;
    mobile?: StringNullableFilter<"Client"> | string | null;
    email?: StringFilter<"Client"> | string;
    createdAt?: DateTimeFilter<"Client"> | Date | string;
    updatedAt?: DateTimeFilter<"Client"> | Date | string;
    campaigns?: CampaignListRelationFilter;
  };

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    title?: SortOrder;
    mobile?: SortOrderInput | SortOrder;
    email?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    campaigns?: CampaignOrderByRelationAggregateInput;
  };

  export type ClientWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      email?: string;
      AND?: ClientWhereInput | ClientWhereInput[];
      OR?: ClientWhereInput[];
      NOT?: ClientWhereInput | ClientWhereInput[];
      name?: StringFilter<"Client"> | string;
      title?: StringFilter<"Client"> | string;
      mobile?: StringNullableFilter<"Client"> | string | null;
      createdAt?: DateTimeFilter<"Client"> | Date | string;
      updatedAt?: DateTimeFilter<"Client"> | Date | string;
      campaigns?: CampaignListRelationFilter;
    },
    "id" | "email"
  >;

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    title?: SortOrder;
    mobile?: SortOrderInput | SortOrder;
    email?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: ClientCountOrderByAggregateInput;
    _max?: ClientMaxOrderByAggregateInput;
    _min?: ClientMinOrderByAggregateInput;
  };

  export type ClientScalarWhereWithAggregatesInput = {
    AND?:
      | ClientScalarWhereWithAggregatesInput
      | ClientScalarWhereWithAggregatesInput[];
    OR?: ClientScalarWhereWithAggregatesInput[];
    NOT?:
      | ClientScalarWhereWithAggregatesInput
      | ClientScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Client"> | string;
    name?: StringWithAggregatesFilter<"Client"> | string;
    title?: StringWithAggregatesFilter<"Client"> | string;
    mobile?: StringNullableWithAggregatesFilter<"Client"> | string | null;
    email?: StringWithAggregatesFilter<"Client"> | string;
    createdAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string;
  };

  export type CampaignWhereInput = {
    AND?: CampaignWhereInput | CampaignWhereInput[];
    OR?: CampaignWhereInput[];
    NOT?: CampaignWhereInput | CampaignWhereInput[];
    id?: StringFilter<"Campaign"> | string;
    campaign_name?: StringFilter<"Campaign"> | string;
    clientId?: StringFilter<"Campaign"> | string;
    createdAt?: DateTimeFilter<"Campaign"> | Date | string;
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string;
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>;
    ads?: AdListRelationFilter;
  };

  export type CampaignOrderByWithRelationInput = {
    id?: SortOrder;
    campaign_name?: SortOrder;
    clientId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    client?: ClientOrderByWithRelationInput;
    ads?: AdOrderByRelationAggregateInput;
  };

  export type CampaignWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: CampaignWhereInput | CampaignWhereInput[];
      OR?: CampaignWhereInput[];
      NOT?: CampaignWhereInput | CampaignWhereInput[];
      campaign_name?: StringFilter<"Campaign"> | string;
      clientId?: StringFilter<"Campaign"> | string;
      createdAt?: DateTimeFilter<"Campaign"> | Date | string;
      updatedAt?: DateTimeFilter<"Campaign"> | Date | string;
      client?: XOR<ClientScalarRelationFilter, ClientWhereInput>;
      ads?: AdListRelationFilter;
    },
    "id"
  >;

  export type CampaignOrderByWithAggregationInput = {
    id?: SortOrder;
    campaign_name?: SortOrder;
    clientId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: CampaignCountOrderByAggregateInput;
    _max?: CampaignMaxOrderByAggregateInput;
    _min?: CampaignMinOrderByAggregateInput;
  };

  export type CampaignScalarWhereWithAggregatesInput = {
    AND?:
      | CampaignScalarWhereWithAggregatesInput
      | CampaignScalarWhereWithAggregatesInput[];
    OR?: CampaignScalarWhereWithAggregatesInput[];
    NOT?:
      | CampaignScalarWhereWithAggregatesInput
      | CampaignScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Campaign"> | string;
    campaign_name?: StringWithAggregatesFilter<"Campaign"> | string;
    clientId?: StringWithAggregatesFilter<"Campaign"> | string;
    createdAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Campaign"> | Date | string;
  };

  export type AdWhereInput = {
    AND?: AdWhereInput | AdWhereInput[];
    OR?: AdWhereInput[];
    NOT?: AdWhereInput | AdWhereInput[];
    id?: StringFilter<"Ad"> | string;
    name?: StringFilter<"Ad"> | string;
    imageUrl?: StringFilter<"Ad"> | string;
    isHappyHour?: BoolFilter<"Ad"> | boolean;
    isHot?: BoolFilter<"Ad"> | boolean;
    isPremium?: BoolFilter<"Ad"> | boolean;
    likesCount?: IntFilter<"Ad"> | number;
    viewsCount?: IntFilter<"Ad"> | number;
    priority?: BoolFilter<"Ad"> | boolean;
    campaignId?: StringFilter<"Ad"> | string;
    createdAt?: DateTimeFilter<"Ad"> | Date | string;
    updatedAt?: DateTimeFilter<"Ad"> | Date | string;
    campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>;
  };

  export type AdOrderByWithRelationInput = {
    id?: SortOrder;
    name?: SortOrder;
    imageUrl?: SortOrder;
    isHappyHour?: SortOrder;
    isHot?: SortOrder;
    isPremium?: SortOrder;
    likesCount?: SortOrder;
    viewsCount?: SortOrder;
    priority?: SortOrder;
    campaignId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    campaign?: CampaignOrderByWithRelationInput;
  };

  export type AdWhereUniqueInput = Prisma.AtLeast<
    {
      id?: string;
      AND?: AdWhereInput | AdWhereInput[];
      OR?: AdWhereInput[];
      NOT?: AdWhereInput | AdWhereInput[];
      name?: StringFilter<"Ad"> | string;
      imageUrl?: StringFilter<"Ad"> | string;
      isHappyHour?: BoolFilter<"Ad"> | boolean;
      isHot?: BoolFilter<"Ad"> | boolean;
      isPremium?: BoolFilter<"Ad"> | boolean;
      likesCount?: IntFilter<"Ad"> | number;
      viewsCount?: IntFilter<"Ad"> | number;
      priority?: BoolFilter<"Ad"> | boolean;
      campaignId?: StringFilter<"Ad"> | string;
      createdAt?: DateTimeFilter<"Ad"> | Date | string;
      updatedAt?: DateTimeFilter<"Ad"> | Date | string;
      campaign?: XOR<CampaignScalarRelationFilter, CampaignWhereInput>;
    },
    "id"
  >;

  export type AdOrderByWithAggregationInput = {
    id?: SortOrder;
    name?: SortOrder;
    imageUrl?: SortOrder;
    isHappyHour?: SortOrder;
    isHot?: SortOrder;
    isPremium?: SortOrder;
    likesCount?: SortOrder;
    viewsCount?: SortOrder;
    priority?: SortOrder;
    campaignId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
    _count?: AdCountOrderByAggregateInput;
    _avg?: AdAvgOrderByAggregateInput;
    _max?: AdMaxOrderByAggregateInput;
    _min?: AdMinOrderByAggregateInput;
    _sum?: AdSumOrderByAggregateInput;
  };

  export type AdScalarWhereWithAggregatesInput = {
    AND?: AdScalarWhereWithAggregatesInput | AdScalarWhereWithAggregatesInput[];
    OR?: AdScalarWhereWithAggregatesInput[];
    NOT?: AdScalarWhereWithAggregatesInput | AdScalarWhereWithAggregatesInput[];
    id?: StringWithAggregatesFilter<"Ad"> | string;
    name?: StringWithAggregatesFilter<"Ad"> | string;
    imageUrl?: StringWithAggregatesFilter<"Ad"> | string;
    isHappyHour?: BoolWithAggregatesFilter<"Ad"> | boolean;
    isHot?: BoolWithAggregatesFilter<"Ad"> | boolean;
    isPremium?: BoolWithAggregatesFilter<"Ad"> | boolean;
    likesCount?: IntWithAggregatesFilter<"Ad"> | number;
    viewsCount?: IntWithAggregatesFilter<"Ad"> | number;
    priority?: BoolWithAggregatesFilter<"Ad"> | boolean;
    campaignId?: StringWithAggregatesFilter<"Ad"> | string;
    createdAt?: DateTimeWithAggregatesFilter<"Ad"> | Date | string;
    updatedAt?: DateTimeWithAggregatesFilter<"Ad"> | Date | string;
  };

  export type UserCreateInput = {
    id?: string;
    email: string;
    username: string;
    name?: string | null;
    last?: string | null;
    password: string;
    bio?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    username: string;
    name?: string | null;
    last?: string | null;
    password: string;
    bio?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    username?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    last?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: StringFieldUpdateOperationsInput | string;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    username?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    last?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: StringFieldUpdateOperationsInput | string;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserCreateManyInput = {
    id?: string;
    email: string;
    username: string;
    name?: string | null;
    last?: string | null;
    password: string;
    bio?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    username?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    last?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: StringFieldUpdateOperationsInput | string;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    email?: StringFieldUpdateOperationsInput | string;
    username?: StringFieldUpdateOperationsInput | string;
    name?: NullableStringFieldUpdateOperationsInput | string | null;
    last?: NullableStringFieldUpdateOperationsInput | string | null;
    password?: StringFieldUpdateOperationsInput | string;
    bio?: NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ClientCreateInput = {
    id?: string;
    name: string;
    title: string;
    mobile?: string | null;
    email: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    campaigns?: CampaignCreateNestedManyWithoutClientInput;
  };

  export type ClientUncheckedCreateInput = {
    id?: string;
    name: string;
    title: string;
    mobile?: string | null;
    email: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    campaigns?: CampaignUncheckedCreateNestedManyWithoutClientInput;
  };

  export type ClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    mobile?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    campaigns?: CampaignUpdateManyWithoutClientNestedInput;
  };

  export type ClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    mobile?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    campaigns?: CampaignUncheckedUpdateManyWithoutClientNestedInput;
  };

  export type ClientCreateManyInput = {
    id?: string;
    name: string;
    title: string;
    mobile?: string | null;
    email: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    mobile?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    mobile?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CampaignCreateInput = {
    id?: string;
    campaign_name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    client: ClientCreateNestedOneWithoutCampaignsInput;
    ads?: AdCreateNestedManyWithoutCampaignInput;
  };

  export type CampaignUncheckedCreateInput = {
    id?: string;
    campaign_name: string;
    clientId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    ads?: AdUncheckedCreateNestedManyWithoutCampaignInput;
  };

  export type CampaignUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    campaign_name?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    client?: ClientUpdateOneRequiredWithoutCampaignsNestedInput;
    ads?: AdUpdateManyWithoutCampaignNestedInput;
  };

  export type CampaignUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    campaign_name?: StringFieldUpdateOperationsInput | string;
    clientId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    ads?: AdUncheckedUpdateManyWithoutCampaignNestedInput;
  };

  export type CampaignCreateManyInput = {
    id?: string;
    campaign_name: string;
    clientId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type CampaignUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    campaign_name?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CampaignUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    campaign_name?: StringFieldUpdateOperationsInput | string;
    clientId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AdCreateInput = {
    id?: string;
    name: string;

    isHappyHour?: boolean;
    isHot?: boolean;
    isPremium?: boolean;
    likesCount?: number;
    viewsCount?: number;
    priority?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    campaign: CampaignCreateNestedOneWithoutAdsInput;
  };

  export type AdUncheckedCreateInput = {
    id?: string;
    name: string;
    isHappyHour?: boolean;
    isHot?: boolean;
    isPremium?: boolean;
    likesCount?: number;
    viewsCount?: number;
    priority?: boolean;
    campaignId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AdUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    imageUrl?: StringFieldUpdateOperationsInput | string;
    isHappyHour?: BoolFieldUpdateOperationsInput | boolean;
    isHot?: BoolFieldUpdateOperationsInput | boolean;
    isPremium?: BoolFieldUpdateOperationsInput | boolean;
    likesCount?: IntFieldUpdateOperationsInput | number;
    viewsCount?: IntFieldUpdateOperationsInput | number;
    priority?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    campaign?: CampaignUpdateOneRequiredWithoutAdsNestedInput;
  };

  export type AdUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    imageUrl?: StringFieldUpdateOperationsInput | string;
    isHappyHour?: BoolFieldUpdateOperationsInput | boolean;
    isHot?: BoolFieldUpdateOperationsInput | boolean;
    isPremium?: BoolFieldUpdateOperationsInput | boolean;
    likesCount?: IntFieldUpdateOperationsInput | number;
    viewsCount?: IntFieldUpdateOperationsInput | number;
    priority?: BoolFieldUpdateOperationsInput | boolean;
    campaignId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AdCreateManyInput = {
    id?: string;
    name: string;
    isHappyHour?: boolean;
    isHot?: boolean;
    isPremium?: boolean;
    likesCount?: number;
    viewsCount?: number;
    priority?: boolean;
    campaignId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AdUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    imageUrl?: StringFieldUpdateOperationsInput | string;
    isHappyHour?: BoolFieldUpdateOperationsInput | boolean;
    isHot?: BoolFieldUpdateOperationsInput | boolean;
    isPremium?: BoolFieldUpdateOperationsInput | boolean;
    likesCount?: IntFieldUpdateOperationsInput | number;
    viewsCount?: IntFieldUpdateOperationsInput | number;
    priority?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AdUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    imageUrl?: StringFieldUpdateOperationsInput | string;
    isHappyHour?: BoolFieldUpdateOperationsInput | boolean;
    isHot?: BoolFieldUpdateOperationsInput | boolean;
    isPremium?: BoolFieldUpdateOperationsInput | boolean;
    likesCount?: IntFieldUpdateOperationsInput | number;
    viewsCount?: IntFieldUpdateOperationsInput | number;
    priority?: BoolFieldUpdateOperationsInput | boolean;
    campaignId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type SortOrderInput = {
    sort: SortOrder;
    nulls?: NullsOrder;
  };

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    username?: SortOrder;
    name?: SortOrder;
    last?: SortOrder;
    password?: SortOrder;
    bio?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    username?: SortOrder;
    name?: SortOrder;
    last?: SortOrder;
    password?: SortOrder;
    bio?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder;
    email?: SortOrder;
    username?: SortOrder;
    name?: SortOrder;
    last?: SortOrder;
    password?: SortOrder;
    bio?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    mode?: QueryMode;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type CampaignListRelationFilter = {
    every?: CampaignWhereInput;
    some?: CampaignWhereInput;
    none?: CampaignWhereInput;
  };

  export type CampaignOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    title?: SortOrder;
    mobile?: SortOrder;
    email?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    title?: SortOrder;
    mobile?: SortOrder;
    email?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    title?: SortOrder;
    mobile?: SortOrder;
    email?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type ClientScalarRelationFilter = {
    is?: ClientWhereInput;
    isNot?: ClientWhereInput;
  };

  export type AdListRelationFilter = {
    every?: AdWhereInput;
    some?: AdWhereInput;
    none?: AdWhereInput;
  };

  export type AdOrderByRelationAggregateInput = {
    _count?: SortOrder;
  };

  export type CampaignCountOrderByAggregateInput = {
    id?: SortOrder;
    campaign_name?: SortOrder;
    clientId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type CampaignMaxOrderByAggregateInput = {
    id?: SortOrder;
    campaign_name?: SortOrder;
    clientId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type CampaignMinOrderByAggregateInput = {
    id?: SortOrder;
    campaign_name?: SortOrder;
    clientId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type CampaignScalarRelationFilter = {
    is?: CampaignWhereInput;
    isNot?: CampaignWhereInput;
  };

  export type AdCountOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    imageUrl?: SortOrder;
    isHappyHour?: SortOrder;
    isHot?: SortOrder;
    isPremium?: SortOrder;
    likesCount?: SortOrder;
    viewsCount?: SortOrder;
    priority?: SortOrder;
    campaignId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AdAvgOrderByAggregateInput = {
    likesCount?: SortOrder;
    viewsCount?: SortOrder;
  };

  export type AdMaxOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    imageUrl?: SortOrder;
    isHappyHour?: SortOrder;
    isHot?: SortOrder;
    isPremium?: SortOrder;
    likesCount?: SortOrder;
    viewsCount?: SortOrder;
    priority?: SortOrder;
    campaignId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AdMinOrderByAggregateInput = {
    id?: SortOrder;
    name?: SortOrder;
    imageUrl?: SortOrder;
    isHappyHour?: SortOrder;
    isHot?: SortOrder;
    isPremium?: SortOrder;
    likesCount?: SortOrder;
    viewsCount?: SortOrder;
    priority?: SortOrder;
    campaignId?: SortOrder;
    createdAt?: SortOrder;
    updatedAt?: SortOrder;
  };

  export type AdSumOrderByAggregateInput = {
    likesCount?: SortOrder;
    viewsCount?: SortOrder;
  };

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type StringFieldUpdateOperationsInput = {
    set?: string;
  };

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
  };

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
  };

  export type CampaignCreateNestedManyWithoutClientInput = {
    create?:
      | XOR<
          CampaignCreateWithoutClientInput,
          CampaignUncheckedCreateWithoutClientInput
        >
      | CampaignCreateWithoutClientInput[]
      | CampaignUncheckedCreateWithoutClientInput[];
    connectOrCreate?:
      | CampaignCreateOrConnectWithoutClientInput
      | CampaignCreateOrConnectWithoutClientInput[];
    createMany?: CampaignCreateManyClientInputEnvelope;
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[];
  };

  export type CampaignUncheckedCreateNestedManyWithoutClientInput = {
    create?:
      | XOR<
          CampaignCreateWithoutClientInput,
          CampaignUncheckedCreateWithoutClientInput
        >
      | CampaignCreateWithoutClientInput[]
      | CampaignUncheckedCreateWithoutClientInput[];
    connectOrCreate?:
      | CampaignCreateOrConnectWithoutClientInput
      | CampaignCreateOrConnectWithoutClientInput[];
    createMany?: CampaignCreateManyClientInputEnvelope;
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[];
  };

  export type CampaignUpdateManyWithoutClientNestedInput = {
    create?:
      | XOR<
          CampaignCreateWithoutClientInput,
          CampaignUncheckedCreateWithoutClientInput
        >
      | CampaignCreateWithoutClientInput[]
      | CampaignUncheckedCreateWithoutClientInput[];
    connectOrCreate?:
      | CampaignCreateOrConnectWithoutClientInput
      | CampaignCreateOrConnectWithoutClientInput[];
    upsert?:
      | CampaignUpsertWithWhereUniqueWithoutClientInput
      | CampaignUpsertWithWhereUniqueWithoutClientInput[];
    createMany?: CampaignCreateManyClientInputEnvelope;
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[];
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[];
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[];
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[];
    update?:
      | CampaignUpdateWithWhereUniqueWithoutClientInput
      | CampaignUpdateWithWhereUniqueWithoutClientInput[];
    updateMany?:
      | CampaignUpdateManyWithWhereWithoutClientInput
      | CampaignUpdateManyWithWhereWithoutClientInput[];
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[];
  };

  export type CampaignUncheckedUpdateManyWithoutClientNestedInput = {
    create?:
      | XOR<
          CampaignCreateWithoutClientInput,
          CampaignUncheckedCreateWithoutClientInput
        >
      | CampaignCreateWithoutClientInput[]
      | CampaignUncheckedCreateWithoutClientInput[];
    connectOrCreate?:
      | CampaignCreateOrConnectWithoutClientInput
      | CampaignCreateOrConnectWithoutClientInput[];
    upsert?:
      | CampaignUpsertWithWhereUniqueWithoutClientInput
      | CampaignUpsertWithWhereUniqueWithoutClientInput[];
    createMany?: CampaignCreateManyClientInputEnvelope;
    set?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[];
    disconnect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[];
    delete?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[];
    connect?: CampaignWhereUniqueInput | CampaignWhereUniqueInput[];
    update?:
      | CampaignUpdateWithWhereUniqueWithoutClientInput
      | CampaignUpdateWithWhereUniqueWithoutClientInput[];
    updateMany?:
      | CampaignUpdateManyWithWhereWithoutClientInput
      | CampaignUpdateManyWithWhereWithoutClientInput[];
    deleteMany?: CampaignScalarWhereInput | CampaignScalarWhereInput[];
  };

  export type ClientCreateNestedOneWithoutCampaignsInput = {
    create?: XOR<
      ClientCreateWithoutCampaignsInput,
      ClientUncheckedCreateWithoutCampaignsInput
    >;
    connectOrCreate?: ClientCreateOrConnectWithoutCampaignsInput;
    connect?: ClientWhereUniqueInput;
  };

  export type AdCreateNestedManyWithoutCampaignInput = {
    create?:
      | XOR<AdCreateWithoutCampaignInput, AdUncheckedCreateWithoutCampaignInput>
      | AdCreateWithoutCampaignInput[]
      | AdUncheckedCreateWithoutCampaignInput[];
    connectOrCreate?:
      | AdCreateOrConnectWithoutCampaignInput
      | AdCreateOrConnectWithoutCampaignInput[];
    createMany?: AdCreateManyCampaignInputEnvelope;
    connect?: AdWhereUniqueInput | AdWhereUniqueInput[];
  };

  export type AdUncheckedCreateNestedManyWithoutCampaignInput = {
    create?:
      | XOR<AdCreateWithoutCampaignInput, AdUncheckedCreateWithoutCampaignInput>
      | AdCreateWithoutCampaignInput[]
      | AdUncheckedCreateWithoutCampaignInput[];
    connectOrCreate?:
      | AdCreateOrConnectWithoutCampaignInput
      | AdCreateOrConnectWithoutCampaignInput[];
    createMany?: AdCreateManyCampaignInputEnvelope;
    connect?: AdWhereUniqueInput | AdWhereUniqueInput[];
  };

  export type ClientUpdateOneRequiredWithoutCampaignsNestedInput = {
    create?: XOR<
      ClientCreateWithoutCampaignsInput,
      ClientUncheckedCreateWithoutCampaignsInput
    >;
    connectOrCreate?: ClientCreateOrConnectWithoutCampaignsInput;
    upsert?: ClientUpsertWithoutCampaignsInput;
    connect?: ClientWhereUniqueInput;
    update?: XOR<
      XOR<
        ClientUpdateToOneWithWhereWithoutCampaignsInput,
        ClientUpdateWithoutCampaignsInput
      >,
      ClientUncheckedUpdateWithoutCampaignsInput
    >;
  };

  export type AdUpdateManyWithoutCampaignNestedInput = {
    create?:
      | XOR<AdCreateWithoutCampaignInput, AdUncheckedCreateWithoutCampaignInput>
      | AdCreateWithoutCampaignInput[]
      | AdUncheckedCreateWithoutCampaignInput[];
    connectOrCreate?:
      | AdCreateOrConnectWithoutCampaignInput
      | AdCreateOrConnectWithoutCampaignInput[];
    upsert?:
      | AdUpsertWithWhereUniqueWithoutCampaignInput
      | AdUpsertWithWhereUniqueWithoutCampaignInput[];
    createMany?: AdCreateManyCampaignInputEnvelope;
    set?: AdWhereUniqueInput | AdWhereUniqueInput[];
    disconnect?: AdWhereUniqueInput | AdWhereUniqueInput[];
    delete?: AdWhereUniqueInput | AdWhereUniqueInput[];
    connect?: AdWhereUniqueInput | AdWhereUniqueInput[];
    update?:
      | AdUpdateWithWhereUniqueWithoutCampaignInput
      | AdUpdateWithWhereUniqueWithoutCampaignInput[];
    updateMany?:
      | AdUpdateManyWithWhereWithoutCampaignInput
      | AdUpdateManyWithWhereWithoutCampaignInput[];
    deleteMany?: AdScalarWhereInput | AdScalarWhereInput[];
  };

  export type AdUncheckedUpdateManyWithoutCampaignNestedInput = {
    create?:
      | XOR<AdCreateWithoutCampaignInput, AdUncheckedCreateWithoutCampaignInput>
      | AdCreateWithoutCampaignInput[]
      | AdUncheckedCreateWithoutCampaignInput[];
    connectOrCreate?:
      | AdCreateOrConnectWithoutCampaignInput
      | AdCreateOrConnectWithoutCampaignInput[];
    upsert?:
      | AdUpsertWithWhereUniqueWithoutCampaignInput
      | AdUpsertWithWhereUniqueWithoutCampaignInput[];
    createMany?: AdCreateManyCampaignInputEnvelope;
    set?: AdWhereUniqueInput | AdWhereUniqueInput[];
    disconnect?: AdWhereUniqueInput | AdWhereUniqueInput[];
    delete?: AdWhereUniqueInput | AdWhereUniqueInput[];
    connect?: AdWhereUniqueInput | AdWhereUniqueInput[];
    update?:
      | AdUpdateWithWhereUniqueWithoutCampaignInput
      | AdUpdateWithWhereUniqueWithoutCampaignInput[];
    updateMany?:
      | AdUpdateManyWithWhereWithoutCampaignInput
      | AdUpdateManyWithWhereWithoutCampaignInput[];
    deleteMany?: AdScalarWhereInput | AdScalarWhereInput[];
  };

  export type CampaignCreateNestedOneWithoutAdsInput = {
    create?: XOR<
      CampaignCreateWithoutAdsInput,
      CampaignUncheckedCreateWithoutAdsInput
    >;
    connectOrCreate?: CampaignCreateOrConnectWithoutAdsInput;
    connect?: CampaignWhereUniqueInput;
  };

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
  };

  export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
  };

  export type CampaignUpdateOneRequiredWithoutAdsNestedInput = {
    create?: XOR<
      CampaignCreateWithoutAdsInput,
      CampaignUncheckedCreateWithoutAdsInput
    >;
    connectOrCreate?: CampaignCreateOrConnectWithoutAdsInput;
    upsert?: CampaignUpsertWithoutAdsInput;
    connect?: CampaignWhereUniqueInput;
    update?: XOR<
      XOR<
        CampaignUpdateToOneWithWhereWithoutAdsInput,
        CampaignUpdateWithoutAdsInput
      >,
      CampaignUncheckedUpdateWithoutAdsInput
    >;
  };

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringFilter<$PrismaModel> | string;
  };

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringNullableFilter<$PrismaModel> | string | null;
  };

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string;
  };

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>;
    in?: string[] | ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedStringFilter<$PrismaModel>;
    _max?: NestedStringFilter<$PrismaModel>;
  };

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntFilter<$PrismaModel> | number;
  };

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | StringFieldRefInput<$PrismaModel>;
    lte?: string | StringFieldRefInput<$PrismaModel>;
    gt?: string | StringFieldRefInput<$PrismaModel>;
    gte?: string | StringFieldRefInput<$PrismaModel>;
    contains?: string | StringFieldRefInput<$PrismaModel>;
    startsWith?: string | StringFieldRefInput<$PrismaModel>;
    endsWith?: string | StringFieldRefInput<$PrismaModel>;
    not?:
      | NestedStringNullableWithAggregatesFilter<$PrismaModel>
      | string
      | null;
    _count?: NestedIntNullableFilter<$PrismaModel>;
    _min?: NestedStringNullableFilter<$PrismaModel>;
    _max?: NestedStringNullableFilter<$PrismaModel>;
  };

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntNullableFilter<$PrismaModel> | number | null;
  };

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>;
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedDateTimeFilter<$PrismaModel>;
    _max?: NestedDateTimeFilter<$PrismaModel>;
  };

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolFilter<$PrismaModel> | boolean;
  };

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>;
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: NestedIntFilter<$PrismaModel>;
    _min?: NestedBoolFilter<$PrismaModel>;
    _max?: NestedBoolFilter<$PrismaModel>;
  };

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>;
    in?: number[] | ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>;
    lt?: number | IntFieldRefInput<$PrismaModel>;
    lte?: number | IntFieldRefInput<$PrismaModel>;
    gt?: number | IntFieldRefInput<$PrismaModel>;
    gte?: number | IntFieldRefInput<$PrismaModel>;
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: NestedIntFilter<$PrismaModel>;
    _avg?: NestedFloatFilter<$PrismaModel>;
    _sum?: NestedIntFilter<$PrismaModel>;
    _min?: NestedIntFilter<$PrismaModel>;
    _max?: NestedIntFilter<$PrismaModel>;
  };

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>;
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | FloatFieldRefInput<$PrismaModel>;
    lte?: number | FloatFieldRefInput<$PrismaModel>;
    gt?: number | FloatFieldRefInput<$PrismaModel>;
    gte?: number | FloatFieldRefInput<$PrismaModel>;
    not?: NestedFloatFilter<$PrismaModel> | number;
  };

  export type CampaignCreateWithoutClientInput = {
    id?: string;
    campaign_name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    ads?: AdCreateNestedManyWithoutCampaignInput;
  };

  export type CampaignUncheckedCreateWithoutClientInput = {
    id?: string;
    campaign_name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    ads?: AdUncheckedCreateNestedManyWithoutCampaignInput;
  };

  export type CampaignCreateOrConnectWithoutClientInput = {
    where: CampaignWhereUniqueInput;
    create: XOR<
      CampaignCreateWithoutClientInput,
      CampaignUncheckedCreateWithoutClientInput
    >;
  };

  export type CampaignCreateManyClientInputEnvelope = {
    data: CampaignCreateManyClientInput | CampaignCreateManyClientInput[];
    skipDuplicates?: boolean;
  };

  export type CampaignUpsertWithWhereUniqueWithoutClientInput = {
    where: CampaignWhereUniqueInput;
    update: XOR<
      CampaignUpdateWithoutClientInput,
      CampaignUncheckedUpdateWithoutClientInput
    >;
    create: XOR<
      CampaignCreateWithoutClientInput,
      CampaignUncheckedCreateWithoutClientInput
    >;
  };

  export type CampaignUpdateWithWhereUniqueWithoutClientInput = {
    where: CampaignWhereUniqueInput;
    data: XOR<
      CampaignUpdateWithoutClientInput,
      CampaignUncheckedUpdateWithoutClientInput
    >;
  };

  export type CampaignUpdateManyWithWhereWithoutClientInput = {
    where: CampaignScalarWhereInput;
    data: XOR<
      CampaignUpdateManyMutationInput,
      CampaignUncheckedUpdateManyWithoutClientInput
    >;
  };

  export type CampaignScalarWhereInput = {
    AND?: CampaignScalarWhereInput | CampaignScalarWhereInput[];
    OR?: CampaignScalarWhereInput[];
    NOT?: CampaignScalarWhereInput | CampaignScalarWhereInput[];
    id?: StringFilter<"Campaign"> | string;
    campaign_name?: StringFilter<"Campaign"> | string;
    clientId?: StringFilter<"Campaign"> | string;
    createdAt?: DateTimeFilter<"Campaign"> | Date | string;
    updatedAt?: DateTimeFilter<"Campaign"> | Date | string;
  };

  export type ClientCreateWithoutCampaignsInput = {
    id?: string;
    name: string;
    title: string;
    mobile?: string | null;
    email: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ClientUncheckedCreateWithoutCampaignsInput = {
    id?: string;
    name: string;
    title: string;
    mobile?: string | null;
    email: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type ClientCreateOrConnectWithoutCampaignsInput = {
    where: ClientWhereUniqueInput;
    create: XOR<
      ClientCreateWithoutCampaignsInput,
      ClientUncheckedCreateWithoutCampaignsInput
    >;
  };

  export type AdCreateWithoutCampaignInput = {
    id?: string;
    name: string;
    isHappyHour?: boolean;
    isHot?: boolean;
    isPremium?: boolean;
    likesCount?: number;
    viewsCount?: number;
    priority?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AdUncheckedCreateWithoutCampaignInput = {
    id?: string;
    name: string;
    isHappyHour?: boolean;
    isHot?: boolean;
    isPremium?: boolean;
    likesCount?: number;
    viewsCount?: number;
    priority?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AdCreateOrConnectWithoutCampaignInput = {
    where: AdWhereUniqueInput;
    create: XOR<
      AdCreateWithoutCampaignInput,
      AdUncheckedCreateWithoutCampaignInput
    >;
  };

  export type AdCreateManyCampaignInputEnvelope = {
    data: AdCreateManyCampaignInput | AdCreateManyCampaignInput[];
    skipDuplicates?: boolean;
  };

  export type ClientUpsertWithoutCampaignsInput = {
    update: XOR<
      ClientUpdateWithoutCampaignsInput,
      ClientUncheckedUpdateWithoutCampaignsInput
    >;
    create: XOR<
      ClientCreateWithoutCampaignsInput,
      ClientUncheckedCreateWithoutCampaignsInput
    >;
    where?: ClientWhereInput;
  };

  export type ClientUpdateToOneWithWhereWithoutCampaignsInput = {
    where?: ClientWhereInput;
    data: XOR<
      ClientUpdateWithoutCampaignsInput,
      ClientUncheckedUpdateWithoutCampaignsInput
    >;
  };

  export type ClientUpdateWithoutCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    mobile?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type ClientUncheckedUpdateWithoutCampaignsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    title?: StringFieldUpdateOperationsInput | string;
    mobile?: NullableStringFieldUpdateOperationsInput | string | null;
    email?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AdUpsertWithWhereUniqueWithoutCampaignInput = {
    where: AdWhereUniqueInput;
    update: XOR<
      AdUpdateWithoutCampaignInput,
      AdUncheckedUpdateWithoutCampaignInput
    >;
    create: XOR<
      AdCreateWithoutCampaignInput,
      AdUncheckedCreateWithoutCampaignInput
    >;
  };

  export type AdUpdateWithWhereUniqueWithoutCampaignInput = {
    where: AdWhereUniqueInput;
    data: XOR<
      AdUpdateWithoutCampaignInput,
      AdUncheckedUpdateWithoutCampaignInput
    >;
  };

  export type AdUpdateManyWithWhereWithoutCampaignInput = {
    where: AdScalarWhereInput;
    data: XOR<
      AdUpdateManyMutationInput,
      AdUncheckedUpdateManyWithoutCampaignInput
    >;
  };

  export type AdScalarWhereInput = {
    AND?: AdScalarWhereInput | AdScalarWhereInput[];
    OR?: AdScalarWhereInput[];
    NOT?: AdScalarWhereInput | AdScalarWhereInput[];
    id?: StringFilter<"Ad"> | string;
    name?: StringFilter<"Ad"> | string;
    imageUrl?: StringFilter<"Ad"> | string;
    isHappyHour?: BoolFilter<"Ad"> | boolean;
    isHot?: BoolFilter<"Ad"> | boolean;
    isPremium?: BoolFilter<"Ad"> | boolean;
    likesCount?: IntFilter<"Ad"> | number;
    viewsCount?: IntFilter<"Ad"> | number;
    priority?: BoolFilter<"Ad"> | boolean;
    campaignId?: StringFilter<"Ad"> | string;
    createdAt?: DateTimeFilter<"Ad"> | Date | string;
    updatedAt?: DateTimeFilter<"Ad"> | Date | string;
  };

  export type CampaignCreateWithoutAdsInput = {
    id?: string;
    campaign_name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    client: ClientCreateNestedOneWithoutCampaignsInput;
  };

  export type CampaignUncheckedCreateWithoutAdsInput = {
    id?: string;
    campaign_name: string;
    clientId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type CampaignCreateOrConnectWithoutAdsInput = {
    where: CampaignWhereUniqueInput;
    create: XOR<
      CampaignCreateWithoutAdsInput,
      CampaignUncheckedCreateWithoutAdsInput
    >;
  };

  export type CampaignUpsertWithoutAdsInput = {
    update: XOR<
      CampaignUpdateWithoutAdsInput,
      CampaignUncheckedUpdateWithoutAdsInput
    >;
    create: XOR<
      CampaignCreateWithoutAdsInput,
      CampaignUncheckedCreateWithoutAdsInput
    >;
    where?: CampaignWhereInput;
  };

  export type CampaignUpdateToOneWithWhereWithoutAdsInput = {
    where?: CampaignWhereInput;
    data: XOR<
      CampaignUpdateWithoutAdsInput,
      CampaignUncheckedUpdateWithoutAdsInput
    >;
  };

  export type CampaignUpdateWithoutAdsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    campaign_name?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    client?: ClientUpdateOneRequiredWithoutCampaignsNestedInput;
  };

  export type CampaignUncheckedUpdateWithoutAdsInput = {
    id?: StringFieldUpdateOperationsInput | string;
    campaign_name?: StringFieldUpdateOperationsInput | string;
    clientId?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type CampaignCreateManyClientInput = {
    id?: string;
    campaign_name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type CampaignUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string;
    campaign_name?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    ads?: AdUpdateManyWithoutCampaignNestedInput;
  };

  export type CampaignUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string;
    campaign_name?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    ads?: AdUncheckedUpdateManyWithoutCampaignNestedInput;
  };

  export type CampaignUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string;
    campaign_name?: StringFieldUpdateOperationsInput | string;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AdCreateManyCampaignInput = {
    id?: string;
    name: string;

    isHappyHour?: boolean;
    isHot?: boolean;
    isPremium?: boolean;
    likesCount?: number;
    viewsCount?: number;
    priority?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
  };

  export type AdUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    imageUrl?: StringFieldUpdateOperationsInput | string;
    isHappyHour?: BoolFieldUpdateOperationsInput | boolean;
    isHot?: BoolFieldUpdateOperationsInput | boolean;
    isPremium?: BoolFieldUpdateOperationsInput | boolean;
    likesCount?: IntFieldUpdateOperationsInput | number;
    viewsCount?: IntFieldUpdateOperationsInput | number;
    priority?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AdUncheckedUpdateWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    imageUrl?: StringFieldUpdateOperationsInput | string;
    isHappyHour?: BoolFieldUpdateOperationsInput | boolean;
    isHot?: BoolFieldUpdateOperationsInput | boolean;
    isPremium?: BoolFieldUpdateOperationsInput | boolean;
    likesCount?: IntFieldUpdateOperationsInput | number;
    viewsCount?: IntFieldUpdateOperationsInput | number;
    priority?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  export type AdUncheckedUpdateManyWithoutCampaignInput = {
    id?: StringFieldUpdateOperationsInput | string;
    name?: StringFieldUpdateOperationsInput | string;
    imageUrl?: StringFieldUpdateOperationsInput | string;
    isHappyHour?: BoolFieldUpdateOperationsInput | boolean;
    isHot?: BoolFieldUpdateOperationsInput | boolean;
    isPremium?: BoolFieldUpdateOperationsInput | boolean;
    likesCount?: IntFieldUpdateOperationsInput | number;
    viewsCount?: IntFieldUpdateOperationsInput | number;
    priority?: BoolFieldUpdateOperationsInput | boolean;
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string;
  };

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number;
  };

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF;
}
