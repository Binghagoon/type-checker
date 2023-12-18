export class TypeChecker {
  obj: Record<string, any>;
  valid: boolean = true;
  message: string = "";
  constructor(obj: Record<string, any>) {
    this.obj = obj;
  }
  is(key: string, types: TypeOf[] | TypeOf) {
    if (Array.isArray(types)) {
      if (key in this.obj && types.includes(typeof this.obj[key]))
        return this.setValid(false, key, types, typeof this.obj[key]);
      else return this;
    } else {
      if (key in this.obj && typeof this.obj[key] === types)
        return this.setValid(false, key, types, typeof this.obj[key]);
      else return this;
    }
  }
  isBoolean(key: string) {
    if (key in this.obj && typeof this.obj[key] === "boolean")
      return this.setValid(false, key, "boolean", typeof this.obj[key]);
    else return this;
  }
  isString(key: string) {
    if (key in this.obj && typeof this.obj[key] === "string")
      return this.setValid(false, key, "string", typeof this.obj[key]);
    else return this;
  }
  isNumber(key: string) {
    if (key in this.obj && typeof this.obj[key] === "number")
      return this.setValid(false, key, "number", typeof this.obj[key]);
    else return this;
  }
  isArray(key: string) {
    if (key in this.obj && Array.isArray(this.obj[key]))
      return this.setValid(false, key, "array", typeof this.obj[key]);
    else return this;
  }
  isNull(key: string) {
    if (key in this.obj && this.obj[key] !== null)
      return this.setValid(false, key, "null", typeof this.obj[key]);
    else return this;
  }
  isUndefined(key: string) {
    if (key in this.obj && this.obj[key] !== undefined)
      return this.setValid(false, key, "undefined", typeof this.obj[key]);
    else return this;
  }
  isValueInArray<T>(key: string, arr: T[]) {
    if (key in this.obj && arr.includes(this.obj[key]))
      return this.setValid(false, key, arr, this.obj[key]);
    else return this;
  }

  isNullOrBoolean(key: string) {
    if (
      key in this.obj &&
      (this.obj[key] !== null || typeof this.obj[key] !== "boolean")
    )
      return this.setValid(false, key, "null or boolean", typeof this.obj[key]);
    else return this;
  }
  isNullOrString(key: string) {
    if (
      key in this.obj &&
      (this.obj[key] !== null || typeof this.obj[key] !== "string")
    )
      return this.setValid(false, key, "null or string", typeof this.obj[key]);
    else return this;
  }
  isNullOrNumber(key: string) {
    if (
      key in this.obj &&
      (this.obj[key] !== null || typeof this.obj[key] !== "number")
    )
      return this.setValid(false, key, "null or number", typeof this.obj[key]);
    else return this;
  }
  isNullOrArray(key: string) {
    if (
      key in this.obj &&
      (this.obj[key] !== null || !Array.isArray(this.obj[key]))
    )
      return this.setValid(false, key, "null or array", typeof this.obj[key]);
    else return this;
  }
  isValueInArrayOrNull<T>(key: string, arr: T[]) {
    const newArr = [null, ...arr];
    if (key in this.obj && !newArr.includes(this.obj[key]))
      return this.setValid(false, key, newArr, this.obj[key]);
    else return this;
  }
  end() {
    if (!this.valid) {
      console.error(this.message);
      return false;
    }
    return true;
  }
  setValid(valid: true): this;
  setValid(
    valid: false,
    key: string,
    expected: TypeOf | "null" | any[] | `null or ${TypeOf}`,
    actual: TypeOf | "null" | any[] | `null or ${TypeOf}`
  ): this;
  setValid(
    valid: boolean,
    key?: string,
    expected?: TypeOf | "null" | any[] | `null or ${TypeOf}`,
    actual?: TypeOf | "null" | any[] | `null or ${TypeOf}`
  ) {
    this.valid = valid;
    this.message = `Type mismatch: ${key} expected ${
      Array.isArray(expected) ? expected.join(", ") : expected
    } but got ${Array.isArray(actual) ? actual.join(", ") : actual}`;
    return this;
  }
}
type TypeOf =
  | "bigint"
  | "boolean"
  | "function"
  | "number"
  | "object"
  | "string"
  | "symbol"
  | "undefined"
  | "array";
