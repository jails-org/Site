---
sidebar_position: 8
hide: true
---

# Island Architecture
> tl;dr: The islands architecture encourages small, focused chunks of interactivity within server-rendered web pages. The output of islands is progressively enhanced HTML, with more specificity around how the enhancement occurs. Rather than a single application being in control of full-page rendering, there are multiple entry points. The script for these “islands” of interactivity can be delivered and hydrated independently, allowing the rest of the page to be just static HTML.

*from: https://www.patterns.dev/vanilla/islands-architecture/*

---

Most websites are primarily static, with only a few elements needing to update dynamically based on user interactions. That’s why Jails emphasizes separating JavaScript logic from HTML. It focuses on mounting specific areas of the DOM and leveraging HTML directives to perform efficient and seamless updates.

This approach unlocks new possibilities by eliminating the need for JavaScript to run on the server side. You can focus exclusively on client-side challenges while freely choosing the language to render HTML, whether it’s WordPress, Laravel, PHP, Ruby on Rails, .NET Razor, Node, or others.

We highly recommend using **Jails** as your client-side library in combination with [Astro Web Framework](https://astro.build/).