/*
    Web Storage API provides mechanisms by which browsers can store key/value pairs, in a much
    more intuitive fashion than using cookies.

    The two mechanisms within Web Storage are as follows:
        * sessionStorage maintains a separate storage area for each given origin that's available
            for the duration of the page session (as long as the browser is open,
            including page reloads and restores)
        * localStorage does the same thing, but persists even when the browser is closed and reopened.

    These mechanisms are available via the Window.sessionStorage and Window.localStorage properties.

    'Incognito', 'Private Browsing' or something similar that doesn't store data like history and cookies.
*/