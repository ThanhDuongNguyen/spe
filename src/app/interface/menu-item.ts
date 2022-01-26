export interface MenuItem {
  getNameMenu():string;
  getIconClass():string;
}

// add a registry of the type you expect
export namespace IMenuItem {
  type Constructor<T> = {
    new(...args: any[]): T;
    readonly prototype: T;
  }
  const implementations: Constructor<MenuItem>[] = [];
  export function GetAllMenuItem(): Constructor<MenuItem>[] {
    return implementations;
  }
  export function register<T extends Constructor<MenuItem>>(ctor: T) {
    implementations.push(ctor);
    return ctor;
  }
}
