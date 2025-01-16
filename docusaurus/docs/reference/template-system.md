---
sidebar_position: 3
---

# Template System 

Jails uses directives in HTML as a language to connect seamlessly with the component's state.
But you can also use  mustache syntax `{{}}` for simple variable interpolations, you're gonna see it in action along the examples.
Directives and mustache delimiters `{{}}` processes values as valid Javascript expressions.

:::tip[Tip]
To change default mustach delimiters: `jails.templateConfig({ tags: ["@{", "}"] })`
:::


## `html-if`

```html
<my-component>
  <div html-if="show">Hello, {{name}}</div>
  <div html-if="!show">I\'m hidden!</div>
</my-component>
```

```ts
state.set({ name: 'Clark Kent', show: true })
```

**Result**

```html
<div>Hello, Clark Kent</div>
```

---

## `html-for`

For Arrays and Objects. Iterable variables `$index` and `$key` is automatically generated. 

```html
<my-component>
  <ul>
    <li html-for="item in list">
      <span html-if="item.show">
        {{ item.name }}
        {{ $index }}
      </span>
    </li>
  </ul>
</my-component>
```

```ts
state.set({
  list: [
    {name: "Hello", show: true},
    {name: "Clark", show: true},
    {name: "Kent"}
  ]
})
```

**Result**

```html
<my-component>
  <ul>
    <li>
      <span>Hello 0</span>
    </li>
    <li>
      <span>Clark 1</span>
    </li>
    <li>

    </li>
  </ul>
</my-component>
```

---

## `html-inner`
This directive does exactly what `{{ }}` does, but it outputs value in a specific html element. That's especially usefull when you want your html to have something while Javascript isn't loaded yet.

```html
<my-component>
  <p>My name is <strong html-inner="name">Some default value</strong></p>
</my-component>
```

**After mount**

```html
<my-component>
  <p>My name is <strong>Clark Kent</strong></p>
</my-component>
```

---

## `html-model`
Used to set a `initialState` for your component. It will override props from your current `model`.

```html
<my-component html-model="{ counter: 5 }">
    <p>The counter initial value is: {{counter}}</p>
    <!-- Or -->
    <p>The counter initial value is: <span html-inner="counter"></span></p>
</my-component>
```

**Output**

```html
<my-component>
    <p>The counter initial value is: 5</p>
    <!-- Or -->
    <p>The counter initial value is: <span>5</span></p>
</my-component>
```

---

## `html-*`

You can prepend html- for all html attributes, the template system will strip them off. Very usefull for attributes that you need to be quiet on page load, like `src` until Javascript is ready, you don't want to make any requests when before javascript parsing.

**`html-*` attributes accepts Javascript expressions.**


```html
<my-component html-class="loading? 'is-loading': ''">
  <img html-src="imageUrl" alt="" />
</my-component>
```

```ts
export default function myComponent ({ main, state }) {

  main(() => {
    getTheImageUrl()
  })

  const getTheImageUrl = () => {
    fetch('/my/image/service')
      .then(response => response.json())
      .then( imageUrl => {
        state.set({ imageUrl, loading: false })
      })
  }
}

export const model = {
  loading: true,
  imageUrl: null
}

```

:::tip[Tip]

`selected` | `checked` | `readonly` | `disabled` | `autoplay`

Boolean attributes are special attributes because they have to be present or not depending on their values.
They will work just like any other regular attributes but they will be striped off from the element if the expression results in a `falsy` value. 

:::

---

## `html-static`
A special directive for **creating static areas** inside your component.

You can bypass DOM diffing by using the `html-static` property. The Jails template system recognizes this attribute and skips virtual DOM updates for the specified node and its children. This feature is particularly useful when integrating your component with UI libraries like Swiper or other any other libraries that mutates the DOM.

**The Swiper integration example**: ( [Full Demo Here](https://jails-swiper-integration.stackblitz.io) )

```html
<app-swiper>
  <label>Choose Page</label>
  <input type="number" value="1" min="1" max="9" html-static />
  <p>Chosen page: {{page}}</p>
  <div class="swiper mySwiper" html-static>
    <div class="swiper-wrapper">
      <div class="swiper-slide">Slide 1</div>
      <div class="swiper-slide">Slide 2</div>
      <div class="swiper-slide">Slide 3</div>
      <div class="swiper-slide">Slide 4</div>
      <div class="swiper-slide">Slide 5</div>
      <div class="swiper-slide">Slide 6</div>
      <div class="swiper-slide">Slide 7</div>
      <div class="swiper-slide">Slide 8</div>
      <div class="swiper-slide">Slide 9</div>
    </div>
  </div>
</app-swiper>

```

**The Component** 

```ts
import Swiper from 'swiper'

export default function appSwiper({ main, on, elm, state }) {
  //
  const wrapper = elm.querySelector('.swiper')
  const swiper = new Swiper(wrapper)

  main((_) => {
    on('input', 'input[type=number]', goTo)
  })

  const goTo = (e) => {
    const page = Number(e.target.value) || 1
    swiper.slideTo(page - 1)
    state.set({ page })
  }
}

export const model = {
  page: 1
}

```

:::tip[Tip]

It is also common to use the `html-static` property with form elements such as `input`, `textarea`, and `select`. This approach allows the browser to manage the persistence of their values, eliminating the need to handle them manually using state variables. 

:::



---

## `<template>`

The `<template />` tag has a very interesting native property: it prevents its content from being rendered directly in the HTML of the page. Jails leverages this feature precisely for this purpose, without reinventing the wheel or adding unnecessary functionalities.

In the context of Jails, this tag can be used to hide parts of a component's content that require dynamic data for rendering. This approach ensures that template markers, such as delimiters like `{{ }}`, do not appear during the initial page load it can be used anywhere inside the component tree.

```html
<my-component>
  
  <h1>Hello, this part is server rendered so its nice to appear as soon as possible</h1>
  
  <!--But this part below should be rendered only when data is available -->
  <template>
    <div html-if="userData">
      Welcome, {{userData.name}}!
    </div>
  </template>

</my-component>
```
