export type MappingFunction<U, V> = (u: U) => Result<V>;

type AbstractResult<Type, U> = {
  type: Type;
  bind: <V>(fn: MappingFunction<U, V>) => Result<V>;
  finally: (onSuccess: (u: U) => void, onError: (error: string) => void) => void;
};

export type Success<U> = AbstractResult<"SUCCESS", U> & { result: U };

export type Error<U> = AbstractResult<"ERROR", U> & { error: string };

export type Result<U> = Success<U> | Error<U>;

export const isSuccess = <U>(result: Result<U>): result is Success<U> => result.type === "SUCCESS";

export const isError = <U>(result: Result<U>): result is Error<U> => result.type === "ERROR";

export const success = <U>(result: U): Success<U> => ({
  type: "SUCCESS",
  result,
  bind: <V>(fn: MappingFunction<U, V>) => fn(result),
  finally: (onSuccess) => {
    onSuccess(result);
  },
});

export const error = <U>(e: string): Error<U> => ({
  type: "ERROR",
  error: e,
  bind: <V>() => error<V>(e),
  finally: (_, onError) => {
    onError(e);
  },
});

/*
 * Testing facilities
 */

export const getResult = <U>(maybe: Result<U>): U => (maybe as Success<U>).result;

export const getError = <U>(maybe: Result<U>): string => (maybe as Error<U>).error;
