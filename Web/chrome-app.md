## Chrome Apps Architecture
Chrome Apps integrate closely with a user’s operating system. They are designed to be run outside of a browser tab, to run robustly in offline and poor connectivity scenarios and to have far more powerful capabilities than are available in a typical web browsing environment.

### App container model
The app container describes the visual appearance and loading behavior of Chrome Apps. Chrome Apps look different than traditional web apps because the app container does not show any traditional web page UI controls; it simply contains a blank rectangular area. This allows an app to blend with “native” apps on the system, and it prevents the user from “messing” with the app logic by manually changing the URL.

Chrome Apps are loaded differently than web apps. Both load the same type of content: HTML documents with CSS and JavaScript; however, a Chrome App is loaded in the app container, not in the browser tab. Also, the app container must load the main document of the Chrome App from a local source. This forces all Chrome Apps to be at least minimally functional when offline and it provides a place to enforce stricter security measures.

### Programming model
The programming model describes the lifecycle and window behavior of Chrome Apps. Similar to native apps, the goal of this programming model is to give users and their systems full control over the app lifecycle. The Chrome App lifecycle should be independent of browser window behavior or a network connection.

| Stage	| Summary |
| --- | --- |
| Installation | User chooses to install the app and explicitly accepts the permissions. |
| Startup | The event page is loaded, the 'launch' event fires, and app pages open in windows. You create the windows that your app requires, how they look, and how they communicate with the event page and with other windows. |
| Termination | User can terminate apps at any time and app can be quickly restored to previous state. Stashing data protects against data loss. |
| Update | Apps can be updated at any time; however, the code that a Chrome App is running cannot change during a startup/termination cycle. |
| Uninstallation | User can actively uninstall apps. When uninstalled, no executing code or private data is left behind. |

#### [More about Chrome App Lifecycle](https://developer.chrome.com/apps/app_lifecycle)

### Security model
* Chrome Apps reuse Chrome extension process isolation, and take this a step further by isolating storage and external content. Each app has its own private storage area and can’t access the storage of another app or personal data (such as cookies) for websites that you use in your browser. All external processes are isolated from the app. Since iframes run in the same process as the surrounding page, they can only be used to load other app pages. You can use the `object` tag to embed external content; this content runs in a separate process from the app.
* Loading the Chrome App main page locally provides a place to enforce stricter security than the web. Like Chrome extensions, users must explicitly agree to trust the Chrome App on install; they grant the app permission to access and use their data. Each API that your app uses will have its own permission (like camera permission). The Chrome Apps security model also provides the ability to set up privilege separation on a per window basis. This allows you to minimize the code in your app that has access to dangerous APIs, while still getting to use them.
* The Chrome Apps security model protects users by ensuring their information is managed in a safe and secure manner. Comply with CSP. This policy blocks dangerous scripting reducing cross-site scripting bugs and protecting users against man-in-the-middle attacks.

#### [Learn More](https://developer.chrome.com/apps/about_apps)
