---
sidebar_position: 4
---

# Jails API 

Jails is an singleton, so it wasn't made to have multiple instances. So you can access most of Jails api throught it static methods.


## start
```ts
jails.start( target?: HTMLElement )
```

After registering all the components on your page, you need to call the `.start()` method. This will trigger a scan of all registered components in the HTML and initiate their bootstrap process. You can specify the root element for this scan; otherwise, it will default to document.body.

The method is designed to be called multiple times, but avoid doing so unnecessarily.

---

## register
```ts
jails.register( name: string, module: Module, dependencies?: object )
```

Method used to register custom elements in the HTML.

**Example**
```ts
import * as myComponent from '/components/my-component'
jails.register('my-component', myComponent)

```

---

:::tip[Dependency Injection]
The third parameter is optional and refers to any instance, class, function, or object you want to pass to your component via the [dependencies](/reference/docs/reference/helpers#dependencies) helper.
:::

**Example**


```main.js ```
```ts
import http from 'shared/utils/http'
import * as myComponent from '/components/my-component'
jails.register('my-component', myComponent, { http })
```

---

```/components/my-component/index.js```

```ts 
export default function myComponent ({ main, dependencies }) {

  const { http } = dependencies

  main(() => {

  })
}

```

## templateConfig

```ts
jails.templateConfig({ tags: ["@{", "}"] })
```

To change default mustach delimiters. Use this when your SSG/SSR engine uses a template system that conflicts with the Jails default template delimiters: `{{}}`.


## publish / subscribe
```ts 
publish( name: string, data?: any )
```

```ts 
subscribe( name:string, fn: Function<data> )
```

A pub/sub pattern interface that you can use to comunicate globally with any of your components. <br />
They're exacly the same [pub/sub functions helpers](/reference/docs/reference/helpers#publish) used on components.