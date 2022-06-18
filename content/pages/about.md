---
blocks:
  - body: >
      ## What is this?


      This is a [TinaCMS](https://tina.io)-enabled website built with
      [Capri](https://capri.build), so you can edit your content on a live page.


      ## About this port


      The original starter template uses Next.js. In order to port it to Capri,
      a few things had to be changed.


      ### Routing


      While Next.js comes with a built-in routing solution, Capri lets you pick
      your favorite router. Since the Tina admin UI uses [React
      Router](https://reactrouter.com/), it was a natural choice to use it for
      the website too.


      ### Data fetching


      In Next.js data is fetched externally and passed to the pages as props.
      With Capri, every component can fetch its own data. Capri uses suspense to
      wait for the asynchronously loaded data so that it can be included in the
      rendered result. You can use any data fetching library with suspense
      support. In this case we chose [SWR](https://swr.vercel.app/).
    color: default
    _template: content
---

