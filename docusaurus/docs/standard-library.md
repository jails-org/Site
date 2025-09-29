---
sidebar_position: 7
---

# Standard Library


Jails's Standard Library was inspired by programming languages that provide a core library for common functionalities.<br />`jails.stdlib` is a repository containing these *functionalities, modules, and components*. They're all documented and distributed as npm modules.

**More** : https://github.com/jails-org/Std-Library

---

**To install:**

``` 
npm install jails.stdlib
```

**Example:**

```ts 
import { isVisible } from 'jails.stdlib/is-visible'

export default async function myComponent ({ main, elm }) {

    await isVisible( elm )

    main(() => {
        console.log('Ready!')
    })
}
```

