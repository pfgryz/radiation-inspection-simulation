type Callable = (...args: any[]) => any;

const context: Callable[] = [];

export class Ref<T> {
    private _value: T | undefined;
    private readonly _subscriptions: Set<Callable>;

    constructor(value?: T) {
        this._value = value;
        this._subscriptions = new Set();
    }

    get value(): T {
        if (context.length > 0) {
            this._subscriptions.add(context[context.length - 1]);
        }

        return this._value!;
    }

    set value(value: T) {
        this._value = value;

        for (let subscription of this._subscriptions) {
            subscription();
        }
    }
}

export function ref<T>(value?: T): Ref<T> {
    return new Ref(value);
}

export function watch(fn: Callable): void {
    context.push(fn);
    fn();
    context.pop();
}

export function computed<T>(fn: () => T): Ref<T> {
    const derived = ref<T>();
    watch(() => derived.value = fn());
    return derived;
}