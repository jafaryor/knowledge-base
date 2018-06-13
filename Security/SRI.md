## Subresource Integrity `SRI`
_Subresource Integrity_ (`SRI`) is a security feature that enables browsers to verify that files they fetch (for example, from a CDN) are delivered without unexpected manipulation. It works by allowing you to provide a cryptographic hash that a fetched file must match.

Using _Content Delivery Networks_ (_CDNs_) to host files such as scripts and stylesheets that are shared among multiple sites can improve site performance and conserve bandwidth. However, using CDNs also comes with a risk, in that if an attacker gains control of a CDN, the attacker can inject arbitrary malicious content into files on the CDN (or replace the files completely) and thus can also potentially attack all sites that fetch files from that CDN.

The _Subresource Integrity_ feature enables you to mitigate the risk of attacks such as this, by ensuring that the files your Web application or Web document fetches (from a CDN or anywhere) have been delivered without a third-party having injected any additional content into those files — and without any other changes of any kind at all having been made to those files.

An integrity value’s “hash” part is, strictly speaking, a cryptographic digest formed by applying a particular hash function to some input (for example, a script or stylesheet file). But it’s common to use the shorthand hash to mean cryptographic digest, so that’s what’s used in this article.

You can use the following `<script>` element to tell a browser that before executing the `https://example.com/example-framework.js` script, the browser must first compare the script to the expected hash, and verify that there’s a match.
```html
<script src="https://example.com/example-framework.js"
        integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
        crossorigin="anonymous"></script>
```

> You can generate `SRI` hashes from the command-line with `openssl`.

You can use _Content Security Policy_ to configure your server to mandate that specific types of files require the use of _Subresource Integrity_. Do this using the require-sri-for directive in your `CSP` header.
```
Content-Security-Policy: require-sri-for script;
// or
Content-Security-Policy: require-sri-for style;
```
This requires that any attempts to load JavaScript will only succeed if the _Subresource Integrity_ information is in place and the integrity check succeeds.

> An integrity value may contain multiple hashes separated by whitespace. A resource will be loaded if it matches one of those hashes.