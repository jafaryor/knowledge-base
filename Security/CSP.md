## Content Security Policy
The web's security model is rooted in the same-origin policy. Code from https://mybank.com should only have access to https://mybank.com's data, and https://evil.example.com should certainly never be allowed access. Each origin is kept isolated from the rest of the web, giving developers a safe sandbox in which to build and play.

Cross-site scripting (XSS) attacks bypass the SOP by tricking a site into delivering malicious code along with the intended content. This is a huge problem, as browsers trust all of the code that shows up on a page as being legitimately part of that page's security origin.

How to avoid XSS:
* Source whitelists

    The issue exploited by XSS attacks is the browser's inability to distinguish between script that's part of your application and script that's been maliciously injected by a third-party.

    Instead of blindly trusting everything that a server delivers, CSP defines the Content-Security-Policy HTTP header, which allows you to create a whitelist of sources of trusted content, and instructs the browser to only execute or render resources from those sources.

    CSPs preferred delivery mechanism is an HTTP header. It can be useful, however, to set a policy on a page directly in the markup. Do that using a <meta> tag with an http-equiv attribute:
    ```html
    <meta http-equiv="Content-Security-Policy" content="default-src https://cdn.example.net; child-src 'none'; object-src 'none'">
    ```

* Avoid inline code

    It should be clear that CSP is based on whitelisting origins, as that's an unambiguous way of instructing the browser to treat specific sets of resources as acceptable and to reject the rest. Origin-based whitelisting doesn't, however, solve the biggest threat posed by XSS attacks: inline script injection.

    If an attacker can inject a script tag that directly contains some malicious payload (`<script>sendMyDataToEvilDotCom();</script>`), the browser has no mechanism by which to distinguish it from a legitimate inline script tag. CSP solves this problem by banning inline script entirely: it's the only way to be sure.

    This ban includes not only scripts embedded directly in `script` tags, but also inline event handlers (`onclick='doAmazingThings();'`) and `javascript:` URLs.

* Avoid inline styles

    Inline style is treated in the same way: both the style attribute and style tags should be consolidated into external stylesheets to protect against a variety of [surprisingly clever](https://scarybeastsecurity.blogspot.com/2009/12/generic-cross-browser-cross-domain.html) data exfiltration methods that CSS enables.

* Use cryptographic __nonce__ (number used once) or a __hash__ for inline scripts

    ```javascript
    <script nonce=EDNnf03nceIOfn39fn3e9h3sdfa>
        //Some inline code I cant remove yet, but need to asap.
    </script>
    ```

    Now, add the nonce to your script-src directive appended to the nonce- keyword.
    ```
    Content-Security-Policy: script-src 'nonce-EDNnf03nceIOfn39fn3e9h3sdfa'
    ```

    > Remember that nonces must be regenerated for every page request and they must be unguessable.

    Hashes work in much the same way.

* No string evaluation at runtime

    Even when an attacker can't inject script directly, they might be able to trick your application into converting otherwise inert text into executable JavaScript and executing it on their behalf. `eval()`, `new Function()`, `setTimeout([string], ...)`, and `setInterval([string], ...)`.

    However, a better choice would be a templating language that offers precompilation ([Handlebars](http://handlebarsjs.com/precompilation.html) does, for instance). Precompiling your templates can make the user experience even faster than the fastest runtime implementation, and it's safer too. If eval and its text-to-JavaScript brethren are essential to your application, you can enable them by adding `unsafe-eval` as an allowed source in a script-src directive, but we strongly discourage this.

* Reporting

    you can instruct the browser to `POST` JSON-formatted violation reports to a location specified in a `report-uri` directive.

#### [read More](https://developers.google.com/web/fundamentals/security/csp/)
