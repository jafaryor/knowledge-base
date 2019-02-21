## RAIL Model
RAIL is a user-centric performance model that breaks down the user's experience into key actions. RAIL's goals and guidelines aim to help developers and designers ensure a good user experience for each of these actions.

### Response: process events in under 50ms
* __Goal__:

    Complete a transition initiated by user input within 100ms.

* __Guidelines__:

    * Process user input events within 50ms to ensure a visible response within 100ms, otherwise the connection between action and reaction is broken. This applies to most inputs, such as clicking buttons, toggling form controls, or starting animations. This does not apply to touch drags or scrolls.

    * Though it may sound counterintuitive, it's not always the right call to respond to user input immediately. You can use this 100ms window to do other expensive work. But be careful not to block the user. If possible, do work in the background.

    * For actions that take longer than 50ms to complete, always provide feedback.

### Animation: produce a frame in 10ms
* __Goal__:

    * Produce each frame in an animation in 10ms or less. Technically, the maximum budget for each frame is 16ms (1000ms / 60 frames per second ≈ 16ms), but browsers need about 6ms to render each frame, hence the guideline of 10ms per frame.

    * Aim for visual smoothness. Users notice when frame rates vary.

* __Guidelines__:

    In high pressure points like animations, the key is to do nothing where you can, and the absolute minimum where you can't. Whenever possible, make use of the 100ms response to pre-calculate expensive work so that you maximize your chances of hitting 60fps.

### Idle: maximize idle time
* __Goal__:

    Maximize idle time to increase the odds that the page responds to user input within 50ms.

* __Guidelines__:

    * Use idle time to complete deferred work. For example, for the initial page load, load as little data as possible, then use idle time to load the rest.

    * Perform work during idle time in 50ms or less. Any longer, and you risk interfering with the app's ability to respond to user input within 50ms.

    * If a user interacts with a page during idle time work, the user interaction should always take the highest priority and interrupt the idle time work.

### Load: deliver content and become interactive in under 5 seconds
* __Goal__:

    Optimize for fast loading performance relative to the device and network capabilities that your users use to access your site. Currently, a good target for first loads is to load the page and be interactive in 5 seconds or less on mid-range mobile devices with slow 3G connections.

* __Guidelines__:

    * Focus on optimizing the Critical Rendering Path to unblock rendering.

    * You don't have to load everything in under 5 seconds to produce the perception of a complete load. Enable progressive rendering and do some work in the background. Defer non-essential loads to periods of idle time.

    * Recognize the factors that affect page load performance:
        * Network speed and latency
        * Hardware (slower CPUs, for example)
        * Cache eviction
        * Differences in L2/L3 caching
        * Parsing JavaScript
