export class Keyboard {
  keys: Uint8Array

  constructor() {
    this.keys = new Uint8Array(256)
    for (let i = 0; i < 256; ++i) {
      this.keys[0] = 0
    }
  }
}

export namespace Keyboard {
  export enum KEYS {
    A = 'A'.charCodeAt(0),
    B = 'B'.charCodeAt(0),
    C = 'C'.charCodeAt(0),
    D = 'D'.charCodeAt(0),
    E = 'E'.charCodeAt(0),
    F = 'F'.charCodeAt(0),
    G = 'G'.charCodeAt(0),
    H = 'H'.charCodeAt(0),
    I = 'I'.charCodeAt(0),
    J = 'J'.charCodeAt(0),
    K = 'K'.charCodeAt(0),
    L = 'L'.charCodeAt(0),
    M = 'M'.charCodeAt(0),
    N = 'N'.charCodeAt(0),
    O = 'O'.charCodeAt(0),
    P = 'P'.charCodeAt(0),
    Q = 'Q'.charCodeAt(0),
    R = 'R'.charCodeAt(0),
    S = 'S'.charCodeAt(0),
    T = 'T'.charCodeAt(0),
    U = 'U'.charCodeAt(0),
    V = 'V'.charCodeAt(0),
    W = 'W'.charCodeAt(0),
    X = 'X'.charCodeAt(0),
    Y = 'Y'.charCodeAt(0),
    Z = 'Z'.charCodeAt(0),
    CTRL = 17,
    ALT = 18,
    SPACE = 32
  }
}
