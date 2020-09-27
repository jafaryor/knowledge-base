## NodeJS Security
### Passport
[Passport](http://www.passportjs.org/) is authentication middleware for Node.js. It is designed to serve a singular purpose: authenticate requests.

Traditionally, users log in by providing a username and password. With the rise of social networking, single sign-on using an OAuth provider such as Facebook or Twitter has become a popular authentication method. Services that expose an API often require token-based credentials to protect access.

Passport recognizes that each application has unique authentication requirements. Authentication mechanisms, known as strategies, are packaged as individual modules. Applications can choose which strategies to employ, without creating unnecessary dependencies.

Passport uses what are termed strategies to authenticate requests. Strategies range from verifying a username and password, delegated authentication using OAuth or federated authentication using OpenID.

[Here](http://www.passportjs.org/packages/) is the list of Passport's strategies.


### JSON Web Token (JWT)
[JWT](https://jwt.io/) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs can be signed using a secret (with the __HMAC__ algorithm) or a public/private key pair using __RSA__ or __ECDSA__.

Although JWTs can be encrypted to also provide secrecy between parties, we will focus on signed tokens. Signed tokens can verify the integrity of the claims contained within it, while encrypted tokens hide those claims from other parties. When tokens are signed using public/private key pairs, the signature also certifies that only the party holding the private key is the one that signed it.

#### When to use
* __Authorization__

    This is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token. Single Sign On is a feature that widely uses JWT nowadays, because of its small overhead and its ability to be easily used across different domains.

* __Information Exchange__

    JSON Web Tokens are a good way of securely transmitting information between parties. Because JWTs can be signed—for example, using public/private key pairs—you can be sure the senders are who they say they are. Additionally, as the signature is calculated using the header and the payload, you can also verify that the content hasn't been tampered with.

#### Structure
In its compact form, JSON Web Tokens consist of three parts separated by dots (`.`), which are:
* __Header__

    The header typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as _HMAC_ _SHA256_ or _RSA_.

    ```json
    {
        "alg": "HS256",
        "typ": "JWT"
    }
    ```

    Then, this JSON is __Base64Url__ encoded to form the first part of the JWT.

* __Payload__

    The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: _registered_, _public_, and _private_ claims.
    
    * _Registered claims_: These are a set of predefined claims which are not mandatory but recommended, to provide a set of useful, interoperable claims. Some of them are: iss (issuer), exp (expiration time), sub (subject), aud (audience), and [others](https://tools.ietf.org/html/rfc7519#section-4.1).
    * _Public claims_: These can be defined at will by those using JWTs. But to avoid collisions they should be defined in the IANA JSON Web Token Registry or be defined as a URI that contains a collision resistant namespace.
    * _Private claims_: These are the custom claims created to share information between parties that agree on using them and are neither registered or public claims.

    ```json
    {
        "sub": "1234567890",
        "name": "John Doe",
        "admin": true
    }
    ```

    The payload is then __Base64Url__ encoded to form the second part of the JSON Web Token.

* __Signature__

    To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.

    For example if you want to use the _HMAC_ _SHA256_ algorithm, the signature will be created in the following way:

    ```javascript
    HMACSHA256(
        base64UrlEncode(header) + "." +
        base64UrlEncode(payload),
        secret
    )
    ```

    The signature is used to verify the message wasn't changed along the way, and, in the case of tokens signed with a private key, it can also verify that the sender of the JWT is who it says it is.

Therefore, a JWT typically looks like the following: `<base64-header>.<base64-payload>.<signature>`.

Example:
![encoded-jwt](../images/encoded-jwt.png)

### How it works
In authentication, when the user successfully logs in using their credentials, a JSON Web Token will be returned. Since tokens are credentials, great care must be taken to prevent security issues. In general, you should not keep tokens longer than required.

> #### You also should not store sensitive session data in browser storage due to lack of security.

Whenever the user wants to access a protected route or resource, the user agent should send the JWT, typically in the `Authorization` header using the `Bearer` schema. The content of the header should look like the following:

```
Authorization: Bearer <token>
```

This can be, in certain cases, a stateless authorization mechanism. The server's protected routes will check for a valid JWT in the `Authorization` header, and if it's present, the user will be allowed to access protected resources.

> If the token is sent in the `Authorization` header, Cross-Origin Resource Sharing (__CORS__) won't be an issue as it doesn't use cookies.


### HELMET
[Helmet](https://helmetjs.github.io/) can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.

Helmet is Connect-style middleware, which is compatible with frameworks like Express.

The top-level helmet function is a wrapper around 11 smaller middlewares.
```javascript
// This...
app.use(helmet());

// ...is equivalent to this:
app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());
```


### CORS
[CORS](https://github.com/expressjs/cors#readme) is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.


### RetireJS
There is a pile of JavaScript libraries for use on the Web and in Node.JS apps out there. This greatly simplifies development,but we need to stay up-to-date on security fixes. "Using Components with Known Vulnerabilities" is now a part of the [OWASP Top 10](https://www.owasp.org/index.php/Top_10_2013-A9-Using_Components_with_Known_Vulnerabilities) list of security risks and insecure libraries can pose a huge risk to your Web app. The goal of Retire.js is to help you detect the use of JS-library versions with known vulnerabilities.

---

#### [REST Security Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/REST_Security_Cheat_Sheet.html)

#### [Security Best Practices](http://expressjs.com/en/advanced/best-practice-security.html)

#### [passport-local Strategy](http://www.passportjs.org/packages/passport-local/)

#### [passport-jwt Strategy](http://www.passportjs.org/packages/passport-jwt/)
