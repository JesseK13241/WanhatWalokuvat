Summarized and edited from [Next.js docs](https://nextjs.org/docs)

From [Wikipedia](https://en.wikipedia.org/wiki/Next.js):

> Next.js is an open-source web development framework created by the private company Vercel providing React-based web applications with server-side rendering and static rendering. (Initial release 2016)

## [Main Features](https://nextjs.org/docs#main-features)

Some of the main Next.js features include:

|Feature|Description|
|---|---|
|[Routing](https://nextjs.org/docs/app/building-your-application/routing)|A file-system based router built on top of Server Components that supports layouts, nested routing, loading states, error handling, and more.|
|[Rendering](https://nextjs.org/docs/app/building-your-application/rendering)|Client-side and Server-side Rendering with Client and Server Components. Further optimized with Static and Dynamic Rendering on the server with Next.js. Streaming on Edge and Node.js runtimes.|
|[Data Fetching](https://nextjs.org/docs/app/building-your-application/data-fetching)|Simplified data fetching with async/await in Server Components, and an extended `fetch` API for request memoization, data caching and revalidation.|
|[Styling](https://nextjs.org/docs/app/building-your-application/styling)|Support for your preferred styling methods, including CSS Modules, Tailwind CSS, and CSS-in-JS|
|[Optimizations](https://nextjs.org/docs/app/building-your-application/optimizing)|Image, Fonts, and Script Optimizations to improve your application's Core Web Vitals and User Experience.|
|[TypeScript](https://nextjs.org/docs/app/api-reference/config/typescript)|Improved support for TypeScript, with better type checking and more efficient compilation, as well as custom TypeScript Plugin and type checker.|

## [App Router vs Pages Router](https://nextjs.org/docs#app-router-vs-pages-router)

Next.js has two different routers: the App Router and the Pages Router. The **App Router is a newer** router that allows you to use React's latest features, such as [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components), [Streaming with Suspense](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#streaming-with-suspense), and [Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations).

## Server Components

React Server Components allow you to write UI that can be rendered and optionally cached **on the server**. In Next.js, the rendering work is **further split by route segments** to enable streaming and partial rendering, and there are three different server rendering strategies:

- [Static Rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#static-rendering-default)
- [Dynamic Rendering](https://nextjs.org/docs/app/building-your-application/rendering/server-components#dynamic-rendering)
- [Streaming](https://nextjs.org/docs/app/building-your-application/rendering/server-components#streaming)

By default, Next.js uses Server Components. This allows you to **automatically** implement server rendering with **no additional configuration**.

As a developer, **you do not need to choose** between static and dynamic rendering as Next.js will automatically choose the best rendering strategy for each route **based on the features and APIs used**. Instead, you choose when to [cache](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching) or [revalidate specific data](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration), and you may choose to [stream](https://nextjs.org/docs/app/building-your-application/rendering/server-components#streaming) parts of your UI.

### Static Rendering

With Static Rendering, routes are rendered at **build time**, or in the background after [data revalidation](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration). The result is cached and can be pushed to a [Content Delivery Network (CDN)](https://developer.mozilla.org/docs/Glossary/CDN). Useful when a route has data that is not personalized to the user and can be known at build time, such as a static blog post or a product page.

### Dynamic Rendering

With Dynamic Rendering, routes are rendered for each user at **request time**. Useful when a route has data that is personalized to the user or has information that can only be known at request time, such as cookies or the URL's search params.

## Client Components

Client Components allow you to write interactive UI that is [prerendered on the server](https://github.com/reactwg/server-components/discussions/4) and can use client JavaScript to run in the browser.

To use Client Components, you can add the React [`"use client"` directive](https://react.dev/reference/react/use-client) at the top of a file, above your imports.

## Server-Side Rendering (SSR)

With SSR, there's a series of steps that need to be completed before a user can see and interact with a page:

1. First, all data for a given page is fetched on the server.
2. The **server then renders** the HTML for the page.
3. The HTML, CSS, and JavaScript for the page are **sent to the client**.
4. A non-interactive user interface is shown using the generated HTML, and CSS.
5. Finally, React [hydrates](https://react.dev/reference/react-dom/client/hydrateRoot#hydrating-server-rendered-html) Hydration is the process of attaching event listeners to the DOM, to make the static HTML interactive.

These steps are **sequential** and **blocking**, meaning the server can only render the HTML for a page once all the data has been fetched. And, on the client, React can only hydrate the UI once the code for all components in the page has been downloaded.

SSR with React and Next.js helps improve the **perceived loading performance** by showing a non-interactive page to the user as soon as possible.

However, it can still be slow as **all data fetching on server needs to be completed** before the page can be shown to the user.

**Streaming** allows you to break down the page's HTML into smaller chunks and progressively send those chunks from the server to the client.

![server-rendering-with-streaming-chart](imgs/server-rendering-with-streaming-chart.avif)

```jsx
import { Suspense } from 'react'
import { PostFeed, Weather } from './Components'
 
export default function Posts() {
  return (
    <section>
      <Suspense fallback={<p>Loading feed...</p>}>
        <PostFeed />
      </Suspense>
      <Suspense fallback={<p>Loading weather...</p>}>
        <Weather />
      </Suspense>
    </section>
  )
}
```

By using `<Suspense>` and `<Loading>`, you get:

1. **Streaming Server Rendering** - Progressively rendering HTML from the server to the client.
2. **Selective Hydration** - React prioritizes what components to make interactive first based on user interaction.

## Server and Client Composition Patterns

When building React applications, you will need to consider what parts of your application should be rendered on the server or the client. 

When interleaving Client and Server Components, it may be helpful to visualize your UI as a tree of components. Starting with the [root layout](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates#root-layout-required), which is a Server Component, you can then render certain subtrees of components on the client by adding the `"use client"` directive.

To reduce the Client JavaScript bundle size, we recommend moving Client Components down your component tree.

For example, you may have a Layout that has static elements (e.g. logo, links, etc) and an interactive search bar that uses state.

Instead of making the whole layout a Client Component, move the interactive logic to a Client Component (e.g. `<SearchBar />`) and keep your layout as a Server Component. This means you don't have to send all the component JavaScript of the layout to the client.


```jsx
// app/layout.js

import SearchBar from './searchbar' // Client Component
import Logo from './logo' // Server Component
 
// Layout is a Server Component by default
export default function Layout({ children }) {
  return (
    <>
      <nav>
        <Logo />
        <SearchBar />
      </nav>
      <main>{children}</main>
    </>
  )
}
```

Since Client Components are rendered after Server Components, you cannot import a Server Component into a Client Component module (since it would require a new request back to the server). Instead, you can **pass a Server Component as `props` to a Client Component.**

```jsx
// app/client-component.js

'use client'
 
import { useState } from 'react'
 
export default function ClientComponent({ children }) {
  const [count, setCount] = useState(0)
 
  return (
    <>
      <button onClick={() => setCount(count + 1)}>
	      {count}
	  </button>
      {children}
    </>
  )
}
```

`<ClientComponent>` doesn't know that `children` will eventually be filled in by the result of a Server Component. The only responsibility `<ClientComponent>` has is to decide **where** `children` will eventually be placed.

In a parent Server Component, you can import both the `<ClientComponent>` and `<ServerComponent>` and pass `<ServerComponent>` as a child of `<ClientComponent>`:

```jsx
// app/page.js

import ClientComponent from './client-component'
import ServerComponent from './server-component'
 
// Pages in Next.js are Server Components by default
export default function Page() {
  return (
    <ClientComponent>
      <ServerComponent />
    </ClientComponent>
  )
}
```

In this case, the child `<ServerComponent>` can be rendered on the server, well before `<ClientComponent>` is rendered on the client.
## Project Structure and Organization

```python
# App Router Structure
app/
├── layout.js
├── page.js
├── about/
│   └── page.js
└── dashboard/
    ├── layout.js
    └── page.js

# Pages Router Structure
pages/
├── _app.js
├── index.js
├── about.js
└── dashboard.js
```

Both routers **can be used** in the same directory, but **not recommended**.

The App Router **takes priority** over the Pages Router. Routes across directories should **not resolve to the same URL path** and will **cause a build-time error to prevent a conflict.**

## [File Conventions](https://nextjs.org/docs/app/building-your-application/routing#file-conventions)

Next.js provides a set of special files to create UI with specific behavior in nested routes:

| file                                                                                                        | explanation                                                                                                                                                                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`layout`](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates#layouts)     | A layout is UI that is **shared** between multiple routes. On navigation, layouts preserve state, remain interactive, and do not re-render. Layouts can also be [nested](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates#nesting-layouts). |
| [`page`](https://nextjs.org/docs/app/building-your-application/routing/pages)                               | Unique UI of a route and make routes publicly accessible                                                                                                                                                                                                                       |
| [`loading`](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)         | Loading UI for a segment and its children                                                                                                                                                                                                                                      |
| [`not-found`](https://nextjs.org/docs/app/api-reference/file-conventions/not-found)                         | Not found UI for a segment and its children                                                                                                                                                                                                                                    |
| [`error`](https://nextjs.org/docs/app/building-your-application/routing/error-handling)                     | Error UI for a segment and its children                                                                                                                                                                                                                                        |
| [`global-error`](https://nextjs.org/docs/app/building-your-application/routing/error-handling)              | Global Error UI                                                                                                                                                                                                                                                                |
| [`route`](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)                     | Server-side API endpoint                                                                                                                                                                                                                                                       |
| [`template`](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates#templates) | Unlike layouts that persist across routes and maintain state, templates create a new instance for each of their children on navigation. State is **not** preserved and effects are re-synchronized.                                                                            |
| [`default`](https://nextjs.org/docs/app/api-reference/file-conventions/default)                             | Fallback UI for [Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)                                                                                                                                                               |

### Rendering hierarchy

- 1. `layout.js`
- 2. `template.js`
- 3. `error.js` (React error boundary)
- 4. `loading.js` (React suspense boundary)
- 5. `not-found.js` (React error boundary)
- 6. `page.js` or nested `layout.js`

Nested route example:

![nested-file-conventions-component-hierarchy](imgs/nested-file-conventions-component-hierarchy.avif)

In addition to special files, you have the option to colocate your own files (e.g. components, styles, tests, etc) inside folders in the `app` directory. (only the contents returned by `page.js` or `route.js` are publicly addressable.)

![project-organization-colocation](imgs/project-organization-colocation.avif)

## [Advanced Routing Patterns](https://nextjs.org/docs/app/building-your-application/routing#advanced-routing-patterns)

The App Router also provides a set of conventions to help you implement more advanced routing patterns. These include:

- [Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes): Allow you to simultaneously show two or more pages in the same view that can be navigated independently. You can use them for split views that have their own sub-navigation. E.g. Dashboards.
- [Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes): Allow you to intercept a route and show it in the context of another route. You can use these when keeping the context for the current page is important. E.g. Seeing all tasks while editing one task or expanding a photo in a feed.

## Basic UI example

```jsx
// app/page.js
export default function Page() {
  return <h1>Hello, Next.js!</h1>
}
```

## Navigation

Four ways to navigate between routes in Next.js:

- Using the [`<Link>` Component](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#link-component)
- Using the [`useRouter` hook](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#userouter-hook) ([Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components))
- Using the [`redirect` function](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#redirect-function) ([Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components))
- Using the native [History API](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#using-the-native-history-api)

### `Link` Component

`<Link>` is a built-in component that extends the HTML `<a>` tag to provide [prefetching](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#2-prefetching) and client-side navigation between routes. It is the primary and **recommended** way to navigate between routes in Next.js. Routes are **automatically prefetched** as they become visible in the user's viewport.

```jsx
import Link from 'next/link'
 
export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

### `useRouter` Hook

Allows to **programmatically** change routes from [Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components).

```jsx
'use client'
 
import { useRouter } from 'next/navigation'
 
export default function Page() {
  const router = useRouter()
 
  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  )
}
```

### `redirect` function

For [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components), use the `redirect` function instead.

```jsx
import { redirect } from 'next/navigation'
 
async function fetchTeam(id) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}
 
export default async function Profile({ params }) {
  const team = await fetchTeam(params.id)
  if (!team) {
    redirect('/login')
  }
 
  // ...
}
```

### Using the native History API

Next.js allows you to use the native [`window.history.pushState`](https://developer.mozilla.org/en-US/docs/Web/API/History/pushState) and [`window.history.replaceState`](https://developer.mozilla.org/en-US/docs/Web/API/History/replaceState) methods to **update the browser's history stack without reloading the page.**

`pushState` and `replaceState` calls integrate into the Next.js Router, allowing you to sync with [`usePathname`](https://nextjs.org/docs/app/api-reference/functions/use-pathname) and [`useSearchParams`](https://nextjs.org/docs/app/api-reference/functions/use-search-params).

- [`window.history.pushState`](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#windowhistorypushstate) = Use it to add a new entry to the browser's history stack. **The user can navigate back to the previous state.** For example, to sort a list of products.
- [`window.history.replaceState`](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#windowhistoryreplacestate) = Use it to replace the current entry on the browser's history stack. **The user is not able to navigate back to the previous state.** For example, to switch the application's locale.

## Loading UI and Streaming

The special file `loading.js` helps you create meaningful Loading UI with [React Suspense](https://react.dev/reference/react/Suspense). With this convention, you can show an [instant loading state](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming#instant-loading-states) from the server while the content of a route segment loads. The new content is **automatically swapped** in once rendering is complete.

Loading state is created by adding a `loading.js` file inside the relevant directory.

![loading-special-file](imgs/loading-special-file.avif)

![loading-overview](imgs/loading-overview.avif)

## Routing conventions

### Route Groups `(folderName)`

To organize routes without affecting the URL, create a group to keep related routes together. The folders in parenthesis will be omitted from the URL (e.g. `(marketing)` or `(shop)`.

Routes that include a route group **should not** resolve to the same URL path as other routes. For example, since route groups don't affect URL structure, `(marketing)/about/page.js` and `(shop)/about/page.js` would both resolve to `/about` and **cause an error**.

![route-group-organisation](imgs/route-group-organisation.avif)

### Dynamic Routes `[folderName]`

When you don't know the exact segment names ahead of time and want to create routes from dynamic data, you can use Dynamic Segments that are filled in at request time or [prerendered](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#generating-static-params) at build time.

A Dynamic Segment can be created by wrapping a folder's name in square brackets: `[folderName]`. For example, `[id]` or `[slug]`.

Dynamic Segments are passed as the `params` prop to [`layout`](https://nextjs.org/docs/app/api-reference/file-conventions/layout), [`page`](https://nextjs.org/docs/app/api-reference/file-conventions/page), [`route`](https://nextjs.org/docs/app/building-your-application/routing/route-handlers), and [`generateMetadata`](https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function) functions.

For example, a blog could include the following route `app/blog/[slug]/page.js` where `[slug]` is the Dynamic Segment for blog posts.

```jsx
// app/blog/[slug]/page.js
export default async function Page({ params }) {
  const slug = (await params).slug
  return <div>My Post: {slug}</div>
}
```

#### [Catch-all Segments](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#catch-all-segments) `[...folderName]`

Dynamic Segments can be extended to **catch-all** subsequent segments by adding an ellipsis inside the brackets `[...folderName]`.

|Route|Example URL|`params`|
|---|---|---|
|`app/shop/[...slug]/page.js`|`/shop/a`|`{ slug: ['a'] }`|
|`app/shop/[...slug]/page.js`|`/shop/a/b`|`{ slug: ['a', 'b'] }`|
|`app/shop/[...slug]/page.js`|`/shop/a/b/c`|`{ slug: ['a', 'b',`|

#### [Optional Catch-all Segments](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes#optional-catch-all-segments) `[[...folderName]]`

Catch-all Segments can be made **optional** by including the parameter in double square brackets: `[[...folderName]]`.

The difference between **catch-all** and **optional catch-all** segments is that with optional, the route without the parameter is also matched (`/shop` in the example above).

| Route                          | Example URL   | `params`                    |
| ------------------------------ | ------------- | --------------------------- |
| `app/shop/[[...slug]]/page.js` | `/shop`       | `{ slug: undefined }`       |
| `app/shop/[[...slug]]/page.js` | `/shop/a`     | `{ slug: ['a'] }`           |
| `app/shop/[[...slug]]/page.js` | `/shop/a/b`   | `{ slug: ['a', 'b'] }`      |
| `app/shop/[[...slug]]/page.js` | `/shop/a/b/c` | `{ slug: ['a', 'b', 'c'] }` |

### Parallel Routes `@folderName`

Parallel Routes allows you to simultaneously or conditionally render one or more pages within the same layout. Parallel Routes can be streamed independently, allowing you to define independent error and loading states for each route.

Parallel routes are created using named **slots**. Slots are defined with the `@folder` convention.

For example, considering a dashboard, you can use parallel routes to simultaneously render the `team` and `analytics` pages:

![parallel-routes](imgs/parallel-routes.avif)

Slots are **not** [route segments](https://nextjs.org/docs/app/building-your-application/routing#route-segments) and do not affect the URL structure. For example, for `/@analytics/views`, the URL will be `/views` since `@analytics` is a slot. Slots are combined with the regular [Page](https://nextjs.org/docs/app/api-reference/file-conventions/page) component to form the final page associated with the route segment.

The `children` prop is an **implicit slot** that does not need to be mapped to a folder. This means `app/page.js` is equivalent to `app/@children/page.js`.

You can use Parallel Routes to conditionally render routes based on certain conditions, such as user role. For example, to render a different dashboard page for the `/admin` or `/user` roles:

![imgs/conditional-routes-ui.avif](conditional-routes-ui)

```jsx
// app/dashboard/layout.js
import { checkUserRole } from '@/lib/auth'
 
export default function Layout({ user, admin }) {
  const role = checkUserRole()
  return <>{role === 'admin' ? admin : user}</>
}
```

### Intercepted Routes `(.)folderName`

Intercepting routes allows you to load a route from another part of your application within the current layout.

For example, when clicking on a photo in a feed, you can display the photo in a modal, overlaying the feed. In this case, Next.js intercepts the `/photo/123` route, masks the URL, and overlays it over `/feed`.

![intercepting-routes-soft-navigate](imgs/intercepting-routes-soft-navigate.avif)

However, **when navigating** to the photo **by clicking a shareable URL** or **by refreshing the page**, the **entire photo page should render** instead of the modal. No route interception should occur

You can use:

- `(.)` to match segments on the **same level**
- `(..)` to match segments **one level above**
- `(..)(..)` to match segments **two levels above**
- `(...)` to match segments from the **root** `app` directory.

![intercepted-routes-files 1](imgs/intercepted-routes-files 1.avif)

## Route Handlers

Route Handlers allow you to create custom request handlers for a given route using the Web [Request](https://developer.mozilla.org/docs/Web/API/Request) and [Response](https://developer.mozilla.org/docs/Web/API/Response) APIs.

Route Handlers are for API functionality. The following [HTTP methods](https://developer.mozilla.org/docs/Web/HTTP/Methods) are supported: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`, `HEAD`, and `OPTIONS`.

You can use Route Handlers to return **non-UI content** such as JSON data.

Route Handlers are defined in a `route.js` inside the `app` directory. They **do not** participate in layouts or client-side navigations like `page.js`. There **cannot** be a `route.js` file at the same route segment level as `page.js`.

Route Handlers are not cached by default. You can, however, opt into caching for `GET` methods. Other methods are **not** cached. To cache a `GET` method, use a [route config option](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#dynamic) such as `export const dynamic = 'force-static'` in your Route Handler file.

```js
// app/api/todos/route.js

let todos = []

export async function GET() {
  return Response.json(todos)
  // Use NextResponse.json() in real life
}

export async function POST(request) {
  // Assume valid request
  if (!data.title) {
    return Response.json(
      { error: 'Title is required' },
      { status: 400 }
    )
  }
  
  const newTodo = {
    id: todos.length + 1,
    title: data.title,
    completed: false,
    createdAt: new Date()
  }
  
  todos.push(newTodo)
  
  return Response.json(newTodo, { 
    status: 201,
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

```

You can use `headers` and `cookies` in Route Handlers:

```jsx
import { headers } from 'next/headers'
import { cookies } from 'next/headers'
```

Route Handlers can use [Dynamic Segments](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes) to create request handlers from dynamic data.

```jsx
// app/items/[slug]/route.js
export async function GET(request, { params }) {
  const slug = (await params).slug // 'a', 'b', or 'c'
}
```

The request object passed to the Route Handler is a `NextRequest` instance, which has [some additional convenience methods](https://nextjs.org/docs/app/api-reference/functions/next-request#nexturl), including for more easily **handling URL query parameters**.

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('query');

  const results = {
    query,
    timestamp: new Date().toISOString(),
    // Search logic here
  };

  return NextResponse.json(results);
}
```

## Middleware

Middleware allows you to run code before a request is completed. Then, based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.

Middleware runs before cached content and routes are matched.

### Use Cases

- Authentication and Authorization
- Redirects, Custom Headers or Cookies
- Bot Detection, Rate Limiting
- Logging and Analytics

## Data Fetching

The response from `fetch` is **not cached by default**. Requests can be [memoized](https://nextjs.org/docs/app/building-your-application/caching#request-memoization) by adding `cache: 'force-cache'`. This means you can safely call the same URL with the same options, and only one request will be made.

Minimal **server-side** data fetch example:

```jsx
// app/page.js
export default async function Page() {
  let data = await fetch('https://api.vercel.app/blog')
  let posts = await data.json()
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

Minimal **client-side** data fetch example:

```jsx
// app/page.js
'use client'
 
import { useState, useEffect } from 'react'
 
export function Posts() {
  const [posts, setPosts] = useState(null)
 
  useEffect(() => {
    async function fetchPosts() {
      let res = await fetch('https://api.vercel.app/blog')
      let data = await res.json()
      setPosts(data)
    }
    fetchPosts()
  }, [])
 
  if (!posts) return <div>Loading...</div>
 
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  )
}
```

## Server Actions and Mutations

[Server Actions](https://react.dev/reference/rsc/server-actions) are **asynchronous functions** that are executed on the server. They can be called in Server and Client Components to handle form submissions and data mutations in Next.js applications.

A Server Action can be defined with the React [`"use server"`](https://react.dev/reference/react/use-server) directive on **top of the file**. **Alternatively**, you can add it at the **top of an `async` function** to mark the function as a Server Action.

Server Actions offer unique advantages over `Route Handlers` (or traditional API routes):

- 1) Simpler integration
- 2) No extra HTTP overhead
- 3) Better Data Fetching Integration
- 4) Security
- 5) Type Safety

Use Route Handlers instead for:

- 1) Public APIs
- 2) Cross-App Usage
- 3) Middleware-Like Logic

React extends the HTML [`<form>`](https://developer.mozilla.org/docs/Web/HTML/Element/form) element to allow Server Actions to be invoked with the `action` prop.

When invoked in a form, the action automatically receives the [`FormData`](https://developer.mozilla.org/docs/Web/API/FormData/FormData) object.

```jsx
// app/invoices/page.js
export default function Page() {
  async function createInvoice(formData) {
    'use server'
 
    const rawFormData = {
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: formData.get('status'),
    }
 
    // mutate data
    // revalidate cache
  }
 
  return <form action={createInvoice}>...</form>
}
```

While it's common to use Server Actions within `<form>` elements, they can also be invoked with event handlers such as `onClick`

``` jsx
'use client'
// app/like-button.js
 
import { incrementLike } from './actions'
import { useState } from 'react'
 
export default function LikeButton({ initialLikes }) {
  const [likes, setLikes] = useState(initialLikes)
 
  return (
    <>
      <p>Total Likes: {likes}</p>
      <button
        onClick={async () => {
          const updatedLikes = await incrementLike()
          setLikes(updatedLikes)
        }}
      >
        Like
      </button>
    </>
  )
}
```

You can use the React [`useEffect`](https://react.dev/reference/react/useEffect) hook to invoke a Server Action when the component mounts or a dependency changes. This is useful for **mutations that depend on global events** or **need to be triggered automatically** without user interaction.

Remember to consider the [behavior and caveats](https://react.dev/reference/react/useEffect#caveats) of `useEffect`.

## [Error Handling](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#error-handling)

When an error is thrown, it'll be caught by the nearest [`error.js`](https://nextjs.org/docs/app/building-your-application/routing/error-handling) or `<Suspense>` boundary on the client. We recommend using `try/catch` to return errors to be handled by your UI.

For example, your Server Action might handle errors from creating a new item by returning a message:

``` jsx
'use server'
 
export async function createTodo(prevState, formData) {
  try {
    //  ...
  } catch (e) {
    throw new Error('Failed to create task')
  }
}
```

## [Revalidating data](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations#revalidating-data)

You can revalidate the [Next.js Cache](https://nextjs.org/docs/app/building-your-application/caching) inside your Server Actions with the [`revalidatePath`](https://nextjs.org/docs/app/api-reference/functions/revalidatePath) API:

```jsx
'use server'
// app/actions.js

import { revalidatePath } from 'next/cache'
 
export async function createPost() {
  try {
    // ...
  } catch (error) {
    // ...
  }
 
  revalidatePath('/posts')
}
```

## Optimizations

Next.js comes with a variety of built-in optimizations designed to improve your application's speed and [Core Web Vitals](https://web.dev/vitals/).

### Images

Built on the native `<img>` element. The Image Component optimizes images for performance by lazy loading and automatically resizing images based on device size.

- **Size Optimization:** Automatically serve correctly sized images for each device, using modern image formats like WebP and AVIF.
- **Visual Stability:** Prevent [layout shift](https://nextjs.org/learn/seo/web-performance/cls) automatically when images are loading.
- **Faster Page Loads:** Images are only loaded when they enter the viewport using native browser lazy loading, with optional blur-up placeholders.
- **Asset Flexibility:** On-demand image resizing, even for images stored on remote servers



```jsx
// app/page.js
import Image from 'next/image'
 
export default function Page() {
  return (
    <Image
      src="https://s3.amazonaws.com/my-bucket/profile.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  )
}
```

The `width` and `height` attributes are used to infer the correct aspect ratio of image and **avoid layout shift** from the image loading in. The `width` and `height` do _not_ determine the rendered size of the image file.

An optional property `fill` is a boolean that causes the image to fill the parent element, which is useful when the [`width`](https://nextjs.org/docs/app/api-reference/components/image#width) and [`height`](https://nextjs.org/docs/app/api-reference/components/image#height) are **unknown**. 

A loader is a function that generates the URLs for your image. It modifies the provided `src`, and generates multiple URLs to request the image at different sizes. These multiple URLs are used in the automatic [srcset](https://developer.mozilla.org/docs/Web/API/HTMLImageElement/srcset)

You can define a loader per-image with the [`loader` prop](https://nextjs.org/docs/app/api-reference/components/image#loader), or at the application level with the [`loaderFile` configuration](https://nextjs.org/docs/app/api-reference/components/image#loaderfile).
### Link

Built on the native `<a>` tags. The Link Component prefetches pages in the background, for faster and smoother page transitions.

### Script 

Built on the native `<script>` tags. The Script Component gives you control over loading and execution of third-party scripts.
