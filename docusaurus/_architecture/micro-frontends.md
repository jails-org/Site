---
sidebar_position: 7
---

# Micro Frontends

A Jails Perspective

Micro-Frontends should align with the ["Fully Featured" Web Components](/reference/docs/web-components). Anything beyond that, especially involving SPAs, doesn't make sense.

---

Adopting approaches like multiple pages with different frameworks or module federation for version management inevitably leads to performance issues, perceived slow loading times, and exponentially higher complexity in building, maintaining, and evolving the application.

We advocate for using reverse proxies in large applications managed by multiple teams. This allows breaking the application into verticals where each team can choose its preferred model and framework, as long as they deliver a separate URL under the same domain.

Jails' perspective aligns with the ideas shared in this post: https://medium.com/@eduardo-ottaviani/micro-frontends-be-simple-9279978aa862
