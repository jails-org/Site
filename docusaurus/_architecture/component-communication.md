---
sidebar_position: 6
---

# Components Communication

The most important part of any component library is how to make communication between them. There are 3 ways to communicate with component using Jails.

---

### Parent ➝ Child

Every state changes on parent will update child components that will receive props from parent by default. Check out [update](/reference/docs/reference/helpers#onupdate) helper for more. 

### Parent → Child 

#### Event Delegation 

The most basic pattern used internally is Event Delegation in order to track user interaction with html elements inside a component tree. It will improve performance by attatching dom events only to the component element. That also make possible to change inner html elements without having to re-attach events to the new elements in the component tree.

This way, component can react to every not only to native DOM events, but also custom events emitted by some Javascript `Third-Party` libraries or using [emit](/reference/docs/reference/helpers#emit) helper.

### Component ← → Component 

For component in different Html treee we do recommend you to use [publish/subscribe](/reference/docs/reference/helpers#publish) helpers in order to make communications around your entire system using this simple and powerfull pattern.
