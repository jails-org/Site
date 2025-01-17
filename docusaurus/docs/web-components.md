---
sidebar_position: 5
---

# Web Components


Jails's Standard Library was inspired by programming languages that provide a core library for common functionalities.<br />`jails.std` is a repository containing these *functionalities, modules, and components*. They're all documented and distributed as npm modules.

---


```ts
export default function myCounter ({ main }) {

  main(() => {
    on('click', '[data-add]', add)
    on('click', '[data-subtract]', subtract)
  })

  const add = () => {
    state.set( s => s.counter += 1 )
  }

  const subtract = () => {
    state.set( s => s.counter -= 1 )
  }
}

export const model = {
  counter: 0
}

export const template = ({ children }) => {
  return html`
    <h1>My Counter</h1>
    <input type="text" html-value="counter" readonly />
    ${children}
    <button>+</button>
    <button>-</button>
  `
}

```