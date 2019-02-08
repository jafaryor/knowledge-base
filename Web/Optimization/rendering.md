## Rendering Performance
### 60fps and Device Refresh Rates
User interacting with a website.
Most devices today refresh their screens 60 times a second. If there’s an animation or transition running, or the user is scrolling the pages, the browser needs to match the device’s refresh rate and put up 1 new picture, or frame, for each of those screen refreshes.

Each of those frames has a budget of just over 16ms (1 second / 60 = 16.66ms). In reality, however, the browser has housekeeping work to do, so all of your work needs to be completed inside __10ms__. When you fail to meet this budget the frame rate drops, and the content judders on screen. This is often referred to as __jank__, and it negatively impacts the user's experience.

### The pixel pipeline



