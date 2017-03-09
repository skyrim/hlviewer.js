class DOM {
    static htmlToElement(src: string): HTMLElement {
        let temp = document.createElement('div')
        temp.innerHTML = src.trim()
        if (temp.children.length !== 1) {
            throw new Error('There must be a single root element.')
        } else if (!(temp.firstChild instanceof HTMLElement)) {
            throw new Error('Element not found.')
        } else {
            return temp.firstChild
        }
    }

    static element(src: string): Element {
        let temp = document.createElement('div')
        temp.innerHTML = src.trim()
        if (temp.children.length !== 1) {
            throw new Error('There must be a single root element.')
        } else if (!(temp.firstChild instanceof Element)) {
            throw new Error('Element not found.')
        } else {
            return temp.firstChild
        }
    }

    static find(root: Element, query: string): HTMLElement {
        let result = root.querySelector(query)
        if (!result || !(result instanceof HTMLElement)) {
            throw new Error('Element not found')
        }

        return result
    }

    static findAll(root: Element, query: string): HTMLElement[] {
        let result = root.querySelectorAll(query)
        if (!result) {
            throw new Error('Element not found')
        }

        let temp: HTMLElement[] = []
        for (let i = 0; i < result.length; ++i) {
            let element = result[i]
            if (element instanceof HTMLElement) {
                temp.push(element)
            }
        }

        return temp
    }

    static createPath(event: Event): HTMLElement[] {
        if (!(event.target instanceof HTMLElement)) {
            return []
        }

        let path: HTMLElement[] = [event.target]
        while (true) {
            let el = path[path.length - 1].parentElement
            if (el instanceof HTMLElement) {
                path.push(el)
            } else {
                break
            }
        }

        return path
    }
}

export { DOM }
