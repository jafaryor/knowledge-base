## Progressive Web App
Progressive Web Apps (`PWA`s) are web applications that are regular web pages or websites, but can appear to the user like traditional applications or native mobile applications. The application type attempts to combine features offered by most modern browsers with the benefits of a mobile experience.

`PWA`s are taking advantage of new features supported by modern browsers, including [service workers](https://en.wikipedia.org/wiki/Web_worker) and web app [manifests](https://en.wikipedia.org/wiki/Manifest_file), that let users upgrade web apps to progressive web applications in their native operating system (OS).

According to Google Developers, these characteristics are:
* __Progressive__ - Work for every user, regardless of browser choice because they’re built with progressive enhancement as a core tenet.
* __Responsive__ - Fit any form factor: desktop, mobile, tablet, or forms yet to emerge.
* __Connectivity independent__ - Service workers allow work offline, or on low quality networks.
* __App-like__ - Feel like an app to the user with app-style interactions and navigation.
* __Fresh__ - Always up-to-date thanks to the service worker update process.
* __Safe__ - Served via HTTPS to prevent snooping and ensure content hasn’t been tampered with.
* __Discoverable__ - Are identifiable as “applications” thanks to W3C manifests and service worker registration scope allowing search engines to find them.
* __Re-engageable__ - Make re-engagement easy through features like push notifications.
* __Installable__ - Allow users to “keep” apps they find most useful on their home screen without the hassle of an app store.
* __Linkable__ - Easily shared via a URL and do not require complex installation.

### HTML5 Cache Manifest
A cache manifest in HTML5 is a plain text file accompanying a web app that helps it run when there is no network connectivity. The caching mechanism reads this file and ensures that its contents are available locally. An HTML5 cache manifest is served with its content type set to `"text/cache-manifest"`.

Example:
```html
CACHE MANIFEST 
/test.css
/test.js
/test.png
```

### Service Workers
A service worker is a script that your browser runs in the background, separate from a web page.

Things to note about a service worker:
* It's a [JavaScript Worker](https://www.html5rocks.com/en/tutorials/workers/basics/), so it can't access the `DOM` directly. Instead, a service worker can communicate with the pages it controls by responding to messages sent via the postMessage interface, and those pages can manipulate the `DOM` if needed.
* Service worker is a programmable network proxy, allowing you to control how network requests from your page are handled.
* It's terminated when not in use, and restarted when it's next needed, so you cannot rely on global state within a service worker's onfetch and onmessage handlers. If there is information that you need to persist and reuse across restarts, service workers do have access to the `IndexedDB` API.

Benefits of service workers
* Capable of handling the push notification easily
* Synchronise data in the background

    `Background Sync` is a new web API that lets you defer actions until the user has stable connectivity. This is useful for ensuring that whatever the user wants to send, is actually sent.

    __[More about Background Sync](https://developers.google.com/web/updates/2015/12/background-sync)__

* Capable of responding to the resource requests originate elsewhere
* Receive centralized updates

__[More about Service Workers](https://developers.google.com/web/fundamentals/primers/service-workers/)__