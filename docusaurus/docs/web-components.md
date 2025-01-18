---
sidebar_position: 5
---

# Web Components

How to build and distribute **Web Components** externally? Well, first of all there are 2 different `Web Components` from Jails perspective.
1. `Logic Featured`
2. `Fully Featured`

---


## Logic Featured
This is the standard model, where Jails executes its logic on a custom element, listening to child events and modifying the HTML through directives. As a result, it does not include HTML within its code, only the logic, making it easier to extend and lighter by default.

"Logic Featured" components are those with highly generic functionality, making them reusable across various scenarios while maintaining the same core functionality. 

An example of this type of component is the [form-validation](https://github.com/jails-org/Std/tree/main/form-validation) included in [Jails' standard library](https://github.com/jails-org/Std). It allows you to reuse the validation logic in different scenarios, with different validation rules and distinct markups.

You can use [Vite](https://vite.dev/) in order to create your component library and distribute it as a npm module, just like the [form-validation](https://github.com/jails-org/Std/tree/main/form-validation) example. 


### SSR

For scenarios where you need to render the component during page load on the server using Node, you can use .js files that contain the template separated from the component. These can then be imported into your application, allowing you to share both the logic and the view.

`counter-template.js`

```ts
import { html } from 'jails-js/html'

export const myComponentTemplate = ({ children }) => {
  return html` 
    <section>
      ${children}
      <p>Counter: {{ counter }}</p>
      <button data-add>+</button>
      <button data-subtract>-</button>
    </section>
  `
}
```

**On my Astro application:**

```html
---
import { myComponentTemplate } from '@my-org-packages/counter/counter-template'
---
<app-counter>
  <Fragment set:html={ myComponentTemplate() } />
</app-counter>
```

**Html Output (SSR)**

```html
<app-counter>
  <section>
    <p>Counter: {{counter}}</p>
    <button data-add>+</button>
    <button data-subtract>-</button>
  </section>
</app-counter>

```

You can then abstract those web components inside an Astro generic component that does that `Fragment` part integration.

---

## Fully Featured 
Fully featured refers to `Web Components` that have all their HTML embedded, allowing you to modify their behavior through the options they provide. Additionally, they enable the injection of custom content into specific parts within the `Web Component`.

"Fully Featured" components are those that do not aim to be highly generic. Their functionality is self-contained, often including business rules, and they operate as mini-apps within their own context, like: **Chat Widget, Cookie Consent Bar, Like and Unlinke Buttons...** and all kind of Widgets.


### Counter App Example
In order to write the fully feature Web Component, we can use the [Template Function](http://localhost:3000/about/docs/reference/components#template-function) feature


```ts
export default function appCounter ({ main, elm }) {
  
  const startAt = Number(elm.dataset.startAt)
 
  main(() => {
    start()
    on('click', '[data-add]', add)
    on('click', '[data-subtract]', subtract)
  })

  const start = () => {
    state.set({ counter: startAt })
  }

  const add = (e) => {
    state.set( s => s.counter += 1 )
  }

  const subtract = (e) => {
    state.set( s => s.counter -= 1 )
  }
}

export const template = ({ children }) => {
  return html` 
    <section>
      ${children}
      <p>Counter: {{ counter }}</p>
      <button data-add>+</button>
      <button data-subtract>-</button>
    </section>
  `
}

```

All the necessary behavior and html is available inside the `app-counter` javascript file, so you can distribute it and share just like any other regular javascript module.

---

In order to use on another application you just have to have `jails-js` installed ( 9kb gzipped) and start it.


```ts
import jails from 'jails-js'
import * as appCounter from '@my-org/components/counter'
... 

///All web components registered on my main.js file
jails.register('app-counter', appCounter)
jails.start()
```

**Usage**

```html
<app-counter data-start-at="10">
  <h1>Hello World!!!</h1>
</app-counter>
```

**Output**

```html
<app-counter data-start-at="10">
  <section>
    <h1>Hello World!!</h1>
    <p>Counter: 10</p>
    <button data-add>+</button>
    <button data-subtract>-</button>
  </section>
</app-counter>
```

:::tip[Tip]

If the component is extensive, it's a good idea to split the HTML into multiple parts across different JavaScript files and import them into the component to build the complete HTML structure. Template strings are excellent for this type of composition.

:::

---
