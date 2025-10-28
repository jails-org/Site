---
sidebar_position: 2
---

# Helpers

Helpers are a set of scoped abstractions and functionalities tied to the context of a `Custom Element`. 

They simplify UI development by providing intuitive tools that remain as close as possible to the experience of developing with Vanilla JavaScript.

---

## **Basics**

## `main`
```ts 
main( fn:Function ) : void
```


In JavaScript, you cannot invoke functions before they are defined, which forces you to write the implementation before its usage. This can make code harder to read, as it requires you to dive into implementation details prematurely, rather than first understanding the overall flow of execution.

The main helper is designed to act as the entry point for all functionalities that should run immediately after the component is mounted. **It plays a crucial role in ensuring good Code Design**, allowing you to defer implementation details to later sections of the code. This makes it easier to understand what happens right after the component is mounted, providing a clearer and more organized structure.

Example from : https://jails-chartjs.stackblitz.io

```ts
import { Chart } from 'chart.js'

export default function appchart({ main, elm, on }) {
  //
  const canvas = elm.querySelector('canvas').getContext('2d')
  const chart = new Chart(canvas, options)

  main((_) => {
    on('input', 'input[name=month]', repaint)
  })

  const repaint = (e) => {
    const number = Number(e.target.value)
    chart.data.datasets[0].data[1] = number
    chart.update()
  }
}

const options = {
  type: 'line',
  options: {},
  data: {
    labels: ['January', 'February', 'March'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5],
      }
    ]
  }
}

```

In the code above, you'll notice that the implementation of methods is placed further down, while the definitions for event subscriptions and the actions that occur when the component is mounted are positioned right at the beginning. This structure ensures that the functionalities and execution flows are immediately clear, providing a clean and intuitive overview right at the start of the code.


---

## `elm`

```ts
elm: HTMLElement
```

It's just a reference for the `HTMLElement` Custom Element. That's usefull to accesss directly the component html element and extract data such as `dataset` or for just directly access html elements using just `querySelector` api.
You can check the code above in the `main` section so you can see how it's used to access children elements directly.

---

## `dataset`
A function that parses the value of a component or one of its children.

```ts
dataset( key: string ) : any | dataset( target, key:string ) : any
```

**Usage**

```html
<my-component data-config="{ name: 'my-name', age: 41 }">
<!-- -->
</my-component>
```

```ts
export default function myComponent({ main, dataset }){

  const { name, age } = dataset('config')  
 
  main(() => {
    console.log({  name, age })
  })

}
```

---

## `query`

```ts
query( cssSelector: string ) : Array<Promise<HTMLElement>>
```

Use this method when you need to reference an HTML element that is a Jails component but may not be ready at the time you try to access it. The query method ensures that you can access this element with its public methods available through the parent component.

```ts 
export default function myComponent({ main, query }){

  const formValidation = query('form-validation')
 
  main(() => {
    listComponents()
  })

  const listComponents = () => {
    formValidation.forEach( async component => {
      const element: HTMLElement = await component
      console.log( element )
    })
  }

}
```


## `dependencies`

Dependencies is a helper used to dynamically (at runtime) retrieve shared dependencies between components within your application. It provides an alternative to using import, which can be challenging, particularly when sharing components across different applications in a more generic and flexible manner.

A great example is the `form-validation` component. Each country has its own specific requirements for user data validation. Instead of incorporating all possible rules and unnecessarily increasing the size of your library, a better approach is to allow validation rules to be dynamically injected into the component based on the user's specific needs.

**On Registration**
```ts 
import { register } from 'jails-js'
import { validations, masks } from 'utils/form/validations'
import * as formValidation from 'jails.std/form-validation'
register('form-validation', formValidation, { validations, masks })

```

**On Component**

```ts 
export default function formValidation ({ main, dependencies }) {

  const { validations, masks } = dependencies 

  main(() => {
    ...
  })
}

```

You can see it in action here: https://jails-form-validation.stackblitz.io

---

## `innerHTML`
```ts
innerHTML( html: string ) | innerHTML( target: HTMLElement, html: string )
```

This helper updates a `HTMLElement` using an html string using dom diffing.

```ts
export default function mycomponent ({ main, on, innerHTML }) {

    let count = 1

    main( _ => {
        on('click', button, updateElement)
    })

    const updateElement = () => {
        innerHTML(`
            <h1>Hello World - Counter ${count++}<h1>
        `)
    }
}
```

Or, using a specific target:

```ts
export default function mycomponent ({ main, elm, on, innerHTML }) {

  let count = 1
  const target = elm.querySelector('div')

  main( _ => {
    on('click', button, updateElement)
  })

  const updateElement = () => {
    innerHTML(target, `
        <h1>Hello World - Counter ${count++}<h1>
    `)
  }
}
```

---


## **State Managment**
**state** is a helper used to manage the local state of a component. Whenever the state changes, the component updates the HTML by leveraging directives and the current state values. You can use the object form when you want to update a specific property or use the function form if you want to get the current state data in order to update the state.


## `set`
```ts
state.set( newprops: object ) : Promise | state.set( (currentState: object) => void ) : Promise
```

**set** method is used to change / mutate state. You only need to send the properties you want to change. There's no need to pass the entire state structure to the `.set` method.

**The Markup:**

```html
<my-component>
    <p html-if="isVisible">Hey! Now you see me</p>
    <button data-toggle>Toggle</button>
</my-component>

```

:::tip[help]

The `html-if` part in the html example code is a Template System feature, you can check it out in the **Template System** section.

:::



**The component:**

```ts
export default function myComponent ({ main, on, state }) {

  main(() => {
    on('click', '[data-toggle]', toggle)
  })

  const toggle = (e) => {
    state.set( s => {
      s.isVisible = !s.isVisible 
    })
  }
}

export const model = {
  isVisible: true 
}
```

In the example above, we are using a callback function as the `.set` method parameter because we want to get the current state and mutate it.

But we can also use the direct object form to update only the property we want. 

```ts
state.set({ isVisible: false })
```


:::tip[Tip]

`.set` method returns a Promise, which can be used to execute tasks in the nextTick. Usefull for animations and actions after DOM Updates.

:::

```ts
state.set({ isVisible: false })
  .then(( state ) => {
    console.log('Do another thing now')
  })
```


## `get`
```ts 
state.get() // Returns the entire state e.g : { isVisible: false, title: '', ...etc }
```
Returns the entire object of your current state  


## `protected`
```ts
state.protected( props: Array )
```

Prevents child component props to be overwritten by parent updates.

```ts 
export default function myComponent ({ main, state }) {

  state.protected(['counter'])

  main(() => {
    //...
  })

  //...
}

export const model = {
  counter : 0
}

```

:::tip[tip]

Use this feature only when you're facing inconcistencies updates on your project. For the most use cases its convenient to have parent props updates in your child components.

:::


---


## **Events**

Events are a powerful tool to sending messages from children to parent nodes, it's a widely adopted pattern and very familiar to javascript developers. Jails extends this feature with some sugar.

## `on`

```ts 
on( event:string, cssSelector: string, callback: function )
```

Like any other helper, `on` is binded to the current component, so event will be registered in the component custom element. It uses a very powerful technic called event delegation. This makes possible to listen to child nodes even if they are replaced with new nodes and simplify the way you bind events in child elements.


The Component: 

```ts 
export default function inputExample ({ main, elm, on }) {

  const display = elm.querySelector('.display')

  main(() => {
    on('keypress', 'input[type="text"]', updateScreen)
  })

  const updateScreen = (e) => {
    display.innerText = e.target.value
  }
}
```

The Html: 

```html
<input-example>
  <div class="display"></div>
  <label>Type what you want here:</label>
  <input type="text" />
</input-example>
```

:::tip[Tip]

Jails augments the `event:Event` object with `e.delegateTarget` property because **event.target** might be a different html element from that you register. So **delegateTarget** will assure that you get the element you pass as the second parameter in the `on` function.

:::

## `on([attribute])`
This is a special case for listening to attributes changes. It works in the component and its children.

Ex.
```ts 
export default function iframeExample ({ main, on }) {

  main(() => {
    on('[src]', 'iframe', iframeSrcChange)
  })

  const iframeSrcChange = ({ target, value, attribute }) => {
    console.log({ target, value, attribute })
  }
}

```


---


## `off`

```ts 
off( event:string, callback: function )
```

A helper that removes a event listener.

```ts
export default function myComponent ({ main, off }) {

  main(() => {
    on('click', componentClick)
  })

  const componentClick = (event) => {
      console.log( 'Clicking in the component area', event.target )
      off('click', componentClick)
      //Click will no longer log anymore
  }
}
```

---

## `emit`

```ts 
emit( event:string, data: object )
```

This handler emits DOM Custom Events an event to parent and siblings components. It is a way to communicate one component to another in a child -> parent direction.

The first parameter is any string you want, the second parameter optional data to pass on.

**Parent Component**

```ts
export default function parentComponent ({ main, on }) {

  main(() => {
    on('time-ellapsed', shout)
  })

  const shout = (event, msg) => {
    alert( msg + '!!!' )
  }
}
```

**Child Component**

```ts
export default function childComponent ({ main, emit }){

  main(() => {
    on('click', thisComponentClick)
  })

  const thisComponentClick = (event) => {
    setTimeout(() => {
        emit('time-ellapsed','10 seconds elapsed since click')
    },10000)
  }
}
```

Emitted events are bubbled up just like any DOM Events. They can be prevented just like any other event.

---

## `trigger`
```ts 
trigger( event: string, data: object )
```

This helper triggers an event or a custom event of a element. It also uses event delegation.

**Triggering a click event from the Custom Element component to its parents.**

```ts
trigger('click', {someparam:true})
```

**Triggering a click from a child of the Custom Element component.**

```ts
trigger('click', 'button', { anotherparam:true })
```

---

## `publish`
```ts 
publish( event: string, data?: any )
```
Publishes a custom event globally, enabling communication between sibling components or components located in different trees.

```ts 
export default function myComponent ({ main, on, publish }) {

    main( _ => {
      on('click', 'button', doSomething)  
    })

    const doSomething = () => {
      fetch('some/service')
        .then( response => response.json() )
        .then((data) => publish('my-component:fetched', data))
    }
}

```

You can listen to that global event using `subscribe` which will be cover next.

---

## `subscribe`
```ts 
subscribe( event: string, callback: Function ) : unsubscribe: Function
```
Subscribes to a custom event globally, enabling communication between sibling components or components located in different trees.

```ts 
export default function anotherComponent ({ main, on, subscribe }) {

    main( _ => {
      subscribe('my-component:fetched', doSomethingWithData)
    })

    const doSomethingWithData = ( data ) => {
      console.log('heeey, here is the data', data)
    }
}

```

Subscribe returns a `unsubscribe` function. So you can remove the listener just by calling the returned function.

---

## **lifecycle**


## `effect`
```ts
effect( callback: Function ) : void | Promise<any>
```
It register a function that listens to parent updates, receiving its props so you can either override them or compose them with new changes.

It can be `sync` or `async` function.

```ts 
export default function myComponent ({ main, effect }) {

    main( _ => {
        
    })

    effect( async (props) => {
        console.log('Parent props changed', props)
        console.log('Parent count prop has a value of:', props.count)
        await new Promise(resolve => setTimeout(resolve, 1000))
        props.count += 1
        console.log('Child count prop will update with a new count prop value:', props.count)
    })
}

export const model = {
  count: 0
}
```



## `unmount`
```ts
unmount( callback: Function ) : void
```

A function that takes a callback that will be executed when the HTMLElement of that component is deatached from DOM. You can use this function to unsubscribe or unregister your component and prevent memory leaks or multiple bindings.

```ts 
export default function myComponent ({ main, elm, unmount }) {

    main( _ => {
        
    })

    unmount(() => {
        console.log('I am no longer aliveee!')
    })
}
```
