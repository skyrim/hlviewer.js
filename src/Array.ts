class Array {
  static indexOf<T>(a: T[], what: T): T[] {
    let result: T[] = []

    for (let i = 0; i < a.length; ++i) {
      if (a[i] === what) {
        result.push(a[i])
      }
    }

    return result
  }

  static find<T>(a: T[], f: (what: T) => boolean): T | undefined {
    for (let i = 0; i < a.length; ++i) {
      if (f(a[i])) {
        return a[i]
      }
    }

    return undefined
  }

  static filter<T>(a: T[], f: (what: T) => boolean): T[] {
    let result: T[] = []

    for (let i = 0; i < a.length; ++i) {
      if (f(a[i])) {
        result.push(a[i])
      }
    }

    return result
  }
}

export { Array }
