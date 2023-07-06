import { UserType } from "../types";

export class User implements UserType {
    public name: string
    public index: number
    constructor(name: string, index: number) {
        this.name = name
        this.index = index
    }
}
