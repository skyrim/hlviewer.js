# HLViewer.js Style Guide

## Table of Contents

1. [Files](#files)
1. [Literals](#literals)
1. [Constants](#constants)
1. [Variables](#variables)
1. [Code blocks](#code-blocks)
1. [If](#if)
1. [For](#for)
1. [While](#while)
1. [Do While](#do-while)
1. [Switch](#switch)
1. [Try](#try)
1. [Functions](#functions)
1. [Classes](#classes)
1. [Interfaces](#interfaces)
1. [Modules](#modules)
1. [Comments](#comments)

## Files

* Do name files using lowercase letters, number and periods.

* Do use appropriate extensions. JavaScript and TypeScript must use `.js` and
`.ts` respectively.

* Do use four spaces instead of tab.

* Do NOT have lines with more than 80 characters.

* Do end files with a new line.

* Do NOT split file into multiple files only because its size is too big.
It is better to have 1 file with 1000 lines of code, than 100 files with 10
lines of code. Of course, it would be ideal for the size to be somewhere in the
middle.

## Literals

* Do use `{}` instead of `new Object()`.

* Do use `[]` instead of `new Array()`.

* Do use single quotes instead double quotes.

``` typescript
// bad
let str = "asd"

// good
let str = 'asd'
```

* Do use string interpolation instead string concatenation.

``` typescript
// bad
let name = user.lastName + ', ' + user.firstName

// good
let name = `${user.lastName}, ${user.firstName}`
```

## Constants

* Do use `const` to declare a constant.

* Do declare each constant on a new line.

``` typescript
// bad
const A = 1, B = 2

// good
const A = 1
const B = 2
```

* Do name constants using only uppercase letters, numbers and underscores.

``` typescript
// bad
const svc_print = 8
const svcPrint = 8
const SvcPrint = 8

// good
const SVC_PRINT = 8
```

## Variables

* Do use `let` instead of `var` to declare a variable.

* Do declare each variable on a new line.

``` typescript
// bad
let x = 1, y = 2

// good
let x = 1
let y = 2
```

* Do use `camelCase` for variable names.

``` typescript
// bad
let mapname = 'kz_cellblock'
let MapName = 'kz_cellblock'
let Mapname = 'kz_cellblock'

// good
let mapName = 'kz_cellblock'
```

## Operators

* Do NOT use `==` and `!=`.

* Do use `===` and `!==`.

## Code blocks

* Do NOT use semicolons, unless necessary.

* Do use empty lines to break up code into logical paragraphs.

## If

* Do use the following form.

``` typescript
// example
if (someCondition) {
    // code block
} else if (anotherCondition) {
    // code block
} else {
    // code block
}
```

## For

* Do use the following form.

``` typescript
// example
for (let i = 0; i < 10; ++i) {
    sum += i
}
```

## While

* Do use the following form.

``` typescript
// example
while (someCondition) {
    // code block
}
```

## Do While

* Do NOT use do while, unless necessary.

## Switch

* Do use the following form.

``` typescript
switch (expression) {
    case condition1: {
        // code block
        break
    }
    case condition2: {
        // code block
        break
    }
    ...
    default: {
        break
    }
}
```

## Try

* Do use the following form.

``` typescript
try {
    // code block
} catch (error: Error) {
    // code block
}
```

## Functions

* Do use `camelCase` for function names.

``` typescript
// bad
function addtwonumbers(x, y) { return x + y }
function AddTwoNumbers(x, y) { return x + y }
function add_two_numbers(x, y) { return x + y }

// good
function addTwoNumbers(x, y) { return x + y }
```

* Do always define parameter types and return type.

``` typescript
// bad
function foo(bar) {
    return `${bar}!`
}

// good
function foo(bar: string): string {
    return `${bar}!`
}
```

* Do add JSDoc comment style description for each function.

``` typescript
/**
 * Description of foo function would go here
 */
function foo() {

}
```

* Do prefer return-first approach.

``` typescript
// bad
function foo(val: number) {
    let out = val

    if (val > 100) {
        out = 100
    }

    return out
}

// good
function foo(val: number) {
    if (val > 100) {
        return 100
    }

    return val
}
```

## Classes

* Do use `PascalCase` for class names.

``` typescript
// bad
class replayPlayer {}
class REPLAYPLAYER {}
class replayplayer {}

// good
class ReplayPlayer {}
```

* Do add JSDoc style description for each class and its methods.

``` typescript
/**
 * Description of Foo class would go here
 */
class Foo {
    ...

    /**
     * Description of bar method would go here
     *
     * @param param1 Description of param1 would go here
     * @param param2 ...
     */
    bar(param1: ParamType, param2: ParamType) {

    }
}
```

* Do use `private` sparingly.

* Do NOT use `protected`.

* Do follow the same style for class methods as functions.

* Do NOT create getters/setters if they do nothing.

``` typescript
// BAD!
class Foo {
    private bar

    getBar() {
        return this.bar
    }

    setBar(bar) {
        this.bar = bar
    }
}

// good
class Foo {
    bar
}

// also good (if getter or setter do something)
class Foo {
    private bar: number

    getBar(): number {
        return bar
    }

    setBar(bar: number) {
        // clamp value between 0 and 1
        let value = Math.max(0, Math.max(1, bar))
        this.bar = value
    }
}
```

## Interfaces

* Do use `PascalCase` for interface names.

``` typescript
// bad
interface basecomponent {}
interface BASECOMPONENT {}
interface baseComponent {}

// good
interface BaseComponent {}
```

## Modules

* Do use always named exports.

* Do NOT use default exports.

``` typescript
// bad
export default function foo() {}

// good
export function foo() {}
```

## Comments

* Do add comment for any "tricky" code where it is not immediately obvious what
you are trying to accomplish.

* Do NOT write a lot of comments. Prefer making self documenting code.