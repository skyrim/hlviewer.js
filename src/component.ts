class Component {
    node: HTMLElement

    on(eventType: string, listener: EventListenerOrEventListenerObject) {
        this.node.addEventListener(eventType, listener)
    }
}

interface ComponentAttributes {
    [propName: string]: string
}

type ComponentContent = Component[] | Component | string

class BasicComponent extends Component {
    node: HTMLElement

    constructor(tag: string,
                attrs?: ComponentAttributes,
                content?: ComponentContent) {
        super()

        let node = document.createElement(tag)

        if (attrs instanceof Component
        || Array.isArray(attrs)
        || typeof attrs === 'string') {
            content = attrs
        }

        if (content instanceof Component) {
            node.appendChild(content.node)
        } else if (Array.isArray(content)) {
            for (let i = 0; i < content.length; ++i) {
                node.appendChild(content[i].node)
            }
        } else if (typeof content === 'string') {
            node.textContent = content
        } else {
            node.textContent = ''
        }

        if (attrs) {
            let keys = Object.keys(attrs)
            for (let i = 0; i < keys.length; ++i) {
                node.setAttribute(keys[i], attrs[keys[i]])
            }
        }

        this.node = node
    }
}

// basic
const div = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('div', attrs, content)

const span = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('span', attrs, content)

const p = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('p', attrs, content)

const img = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('img', attrs, content)

const ol = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('ol', attrs, content)

const ul = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('ul', attrs, content)

const li = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('li', attrs, content)

const h1 = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('h1', attrs, content)

const h2 = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('h2', attrs, content)

const h3 = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('h3', attrs, content)

const h4 = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('h4', attrs, content)

const h5 = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('h5', attrs, content)

const h6 = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('h6', attrs, content)

const iframe = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('iframe', attrs, content)

// form
const form = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('form', attrs, content)

const input = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('input', attrs, content)

const button = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('button', attrs, content)

const textarea = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('textarea', attrs, content)

const label = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('label', attrs, content)

const select = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('select', attrs, content)

const optgroup = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('optgroup', attrs, content)

const option = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('option', attrs, content)

// table
const table = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('table', attrs, content)

const tr = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('tr', attrs, content)

const th = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('th', attrs, content)

const td = (attrs?: ComponentAttributes, content?: ComponentContent) =>
    new BasicComponent('td', attrs, content)

const createComponent = (tag: string,
                        attrs?: ComponentAttributes,
                        content?: ComponentContent) =>
    new BasicComponent(tag, attrs, content)

export {
    Component,
    ComponentAttributes,
    ComponentContent,
    BasicComponent,
    createComponent,
    div, span, p, img, ol, ul, li, h1, h2, h3, h4, h5, h6, iframe,
    form, input, button, textarea, label, select, optgroup, option,
    table, tr, th, td
}
