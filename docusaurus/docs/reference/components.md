---
sidebar_position: 2
---

# Components

Components are JavaScript modules that add behavior to `Custom Element` in HTML. They treat HTML as a data source to extract: **Values, Information, Events, and Directives**, which are then used to update the DOM.

---

Each component consists of four types of exported functionalities:

- **Controller** Default Function. **`Required`**
- **Model** Object. **`Required`**
- **View** Function. `Optional`
- **Template** Function. `Optional`

## Controller Default Function
```ts 
export default function myComponent({ ... }: Component)
```


Each controller runs for every instance of the registered `Custom Elements` on the page, providing a variety of built-in helpers. These helpers allow you to capture events, manipulate the DOM, update states, and more, streamlining the development process.

```ts 
import type { Component } from 'jails-js/types'

export default function myComponent ({ main, elm, on, state }: Component) {

  main(() => {
    on('click', '[data-add]', add)
  })

  const add = () => {
    state.set( s => s.counter += 1 )
  }
} 
```

## Async Controller Default Function
You can also define it as `async` if you want to use `await` keyword before code execution.

```ts 
import type { Component } from 'jails-js/types'

export default async function myComponent ({ main, elm, on, state }: Component) {
  
  const data = await getSomething('/some/service')

  main(() => {
    on('click', '[data-add]', add)
  })

  const add = () => {
    state.set( s => s.counter += 1 )
  }
}
```

:::warning[Caution]
Keep in mind that when using **async / await**, everything below the `await` keyword will not execute until the promise is resolved.
:::

---


## Model Object

```ts 
export const model: Model = {}
```

The model initializes the component's state while also serving as documentation, allowing other developers to understand which local states the component manages.

```ts 
import type { Component, Model } from 'jails-js/types'

export default function myComponent ({ main, on, state }: Component) {

  main(() => {
    on('click', '[data-add]', add)
  })

  const add = () => {
    state.set( counter => counter += 1 )
  }
}

//Initial state is counter = 0
export const model: Model = {
  counter : 0
}
```

You can also use the `Function` version which provides the `HTMLElement` element of the component so you can retrieve some data from the html such as dataset, attributes etc.

```ts 
export const model = ({ elm, initialState }) : Model => {
  // initialState is retrieved from : <my-component html-model="{name: 'my-name'}">
  const counter = Number(elm.dataset.counter) // <my-component data-counter="10">
  return {
    counter
  }
}
```

## View Function
```ts 
export const view: View = ( state: any ) => state : any
```

Sometimes, we need to enhance the data passed to our view (HTML) by formatting content based on the component's states. Instead of creating additional variables within the component's state, the `View` function allows us to override everything that will be sent as state variables. This approach avoids cluttering the state scope with extra variables that would otherwise persist over time.

```ts 
import type { Component, Model, View } from 'jails-js/types'

export default function myComponent ({ main, on, state }: Component) {

  main(() => {
    on('click', '[data-add]', add)
  })

  const add = () => {
    state.set( counter => counter += 1 )
  }
}

//Initial state is counter = 11
export const model: Model = {
  counter : 11
}

export const view: View = ( state ) => {
  return {
    ...state,
    biggerThen10 : state.counter > 10? 'bigger' : ''
  }
}
```

The Html :

```html
<my-component>
  <h2>Counter</h2>
  <div html-class="biggerThen10">{{ counter }}</div>
  <button data-add>+</button>
</my-component>
```

The Result: 

```html
<my-component>
  <h2>Counter</h2>
  <div class="bigger">11</div>
  <button data-add>+</button> 
</my-component>
```

In the code above, we see that with the View function, we can create new variables specifically for the HTML view's scope. This allows us to introduce additional variables to simplify usage within the HTML context without actually creating new state variables. The state remains solely with `counter` variable.

## Template Function
```ts 
export const template: Template = ({ elm: HTMLElement, children: string }) => string
```

Components in Jails are designed to enhance already-rendered HTML, making them particularly suited for **SSR** (Server-Side Rendering) or **SSG** (Static Site Generation) strategies. However, there are scenarios where we may want to export our functionalities as complete, self-contained web components. This allows other teams to simply import these components, with the HTML embedded and all functionality ready to use.

The `template` function handles the rendering of the component's HTML in an embedded manner, providing a seamless, out-of-the-box experience.

```ts
import type { Component, Model, Template } from 'jails-js/types'
import { html, attributes } from 'jails-js/html'

export default function myComponent ({ main, on, state }: Component) {

  main(() => {
    on('click', '[data-add]', add)
  })

  const add = () => {
    state.set( counter => counter += 1 )
  }
}

//Initial state is counter = 11
export const model: Model = {
  counter : 0
}

export const template: Template = ({ elm, children }) => {
  return html`
    ${children}
    <div class="bigger">{{counter}}</div>
    <button data-add ${attributes({ id: 'my-button-id' })}>+</button>
  `
}
```

The Html:

```html
<my-component>
  <h2>Counter</h2>
</my-component>
```

Result would be:

```html
  <my-component>
    <h2>Counter</h2>
    <div>0</div>
    <button data-add id="my-button-id">+</button>
  </my-component>
```