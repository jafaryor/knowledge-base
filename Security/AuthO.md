## `AuthO`
`Auth0` provides authentication and authorization as a service.

_Authentication_ - the process of verifying who you are. When you log on to a PC with a user name and password you are authenticating.

_Authorization_ - the process of verifying that you have access to something. Gaining access to a resource (e.g. directory on a hard disk) because the permissions configured on it allow you access is authorization.

[Read More about `AuthO`](https://auth0.com/docs/getting-started/overview)

## `JWT`
__JSON Web Token__ (`JWT`) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. `JWT`s can be signed using a secret (with the HMAC algorithm) or a public/private key pair using RSA or ECDSA.

Scenarios where JSON Web Tokens are useful:
* _Authorization_: This is the most common scenario for using JWT. Once the user is logged in, each subsequent request will include the JWT, allowing the user to access routes, services, and resources that are permitted with that token. Single Sign On is a feature that widely uses JWT nowadays, because of its small overhead and its ability to be easily used across different domains.
* _Information Exchange_: JSON Web Tokens are a good way of securely transmitting information between parties, because as they can be signed, for example using public/private key pairs, you can be sure that the senders are who they say they are. Additionally, as the signature is calculated using the header and the payload, you can also verify that the content hasn't been tampered with.

[Read More about `JWT`](https://auth0.com/docs/jwt)