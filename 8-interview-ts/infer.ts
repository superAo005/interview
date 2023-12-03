type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;
type PromiseValue<T> = T extends PromiseLike<infer U> ? U : T;