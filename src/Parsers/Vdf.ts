export function vdf(input: string): {[name: string]: any}[] {
  let state = 0
  let key: string = ''
  let val: string = ''
  const objects: any[] = []

  for (let i = 0; i < input.length; ++i) {
    const c = input[i]

    switch (state) {
      case 0: {
        // ROOT
        if (/\s/.test(c)) {
          continue
        } else if (c === '{') {
          objects.push({})
          state = 1
        } else {
          return []
        }
        break
      }

      case 1: {
        // OBJECT
        if (/\s/.test(c)) {
          continue
        } else if (c === '}') {
          state = 0
        } else if (c === '"') {
          key = ''
          state = 2
        } else {
          return []
        }
        break
      }

      case 2: {
        // KEY
        if (c === '"') {
          state = 3
        } else {
          key += c
        }
        break
      }

      case 3: {
        // BETWEEN KEY AND VALUE
        if (/\s/.test(c)) {
          continue
        } else if (c === '"') {
          val = ''
          state = 4
        }
        break
      }

      case 4: {
        // VALUE
        if (c === '"') {
          objects[objects.length - 1][key] = val
          state = 1
        } else {
          val += c
        }
        break
      }
    }
  }

  return objects
}
