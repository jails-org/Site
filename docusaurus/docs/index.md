---
sidebar_position: 1
---

# Getting Started

Let's get started by installing the library using either npm or yarn, and creating our very first `Hello World` component.

## Installing

Just like any other npm module, make sure to add it to your project dependencies.

```bash
npm install jails-js
```

## Our first Component 

Let's create our first component `Hello World` which will include a simple counter functionality.

```html

<hello-world>
  <h1>Hello World!</h1>
  <p>A simple Counter</p>
  <button class="btn add">+</button>
  <span html-inner="counter">0</span>
  <button class="btn subtract">-</button> 
</hello-world>
```

Our component is simply a `Custom Element` that enhances the behavior of our HTML. This means your component will be immediately visible to the user as soon as the page loads, ensuring a high-performance experience.

:::tip[help]

`html-inner` is a Jails diretive used in this example to update the dom using the `counter` state variable.

:::



## Creating the Component Behavior
Every Jails component is a JavaScript module that will need to be imported into our application at a later stage.

`/components/hello-world/index.js`

```ts
export default function helloWorld ({ main, on }) {
  
  main(() => {
    on('click', 'button.add', add)
    on('click', 'button.subtract', subtract)
  })

  const add = () => {
    state.set( s => s.counter += 1 )
  }

  const subtract = () => {
     state.set( s => s.counter -= 1 )
  }
}
```

Here, you can notice that **Jails** implements the concept of **Separation of Concerns**, where the behavior is completely decoupled from the presentation layer (HTML). This approach results in smaller .js files and allows for changes to the HTML without requiring modifications to the behavior code.

Additionally, the concept of [Event Delegation](https://www.freecodecamp.org/news/event-delegation-javascript/) is employed within the behavior layer, leaving the view focused solely on presentation functions.

:::tip[help]

`main` : is our functionalities entrypoint. <br />`on` : is our interface with DOM to listen to events.

More details on helpers section.

:::

## Registering and Starting the Application

Now, we need to register this component, which means attaching the behavior to the custom HTML element displayed on the screen and start the application.

`main.js` 

```ts
import jails from 'jails-js'
import * as helloWorld from 'components/hello-world'

jails.register('hello-world', helloWorld)
//... the Rest of your components in the page.

jails.start()
```

## That's it

Jails is a library that leverages the `Custom Element API` to add useful functionalities for JavaScript Application Development. 

Think of its components as **Web Components on Steroids**, harnessing modern techniques to simplify state management and HTML updates, while maintaining a close alignment with Vanilla JavaScript development.

**Take a look at our curated list of examples featuring various components, including:**  
- Integrations with JavaScript libraries
- Form Validation
- Counters
- Todo App 

... and more here : https://stackblitz.com/@Javiani/collections/jails-organization