import {Ref} from "../ref";

export interface Parameter<T> {
    get Value(): Ref<T>;
}