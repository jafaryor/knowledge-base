# Tunneling
In the physical world, __tunneling__ is a way to cross terrain or boundaries that could not normally be crossed. Similarly, in networking, tunnels are a method for transporting data across a network using protocols that are not supported by that network.

Tunneling works by __encapsulating packets__: wrapping packets inside of other packets. (Packets are small pieces of data that can be re-assembled at their destination into a larger file.)

An encapsulated packet is essentially a packet inside another packet. In an encapsulated packet, the header and payload of the first packet goes inside the payload section of the surrounding packet. The original packet itself becomes the payload.

## VPN tunnel
Tunneling is often used in virtual private networks (VPNs). It can also set up efficient and secure connections between networks, enable the usage of unsupported network protocols, and in some cases allow users to bypass firewalls.

A __VPN__ is a secure, encrypted connection over a publicly shared network. Tunneling is the process by which VPN packets reach their intended destination, which is typically a private network.

Many VPNs use the __IPsec__ protocol suite. IPsec is a group of protocols that run directly on top of IP at the network layer. Network traffic in an IPsec tunnel is fully encrypted, but it is decrypted once it reaches either the network or the user device. (IPsec also has a mode called "transport mode" that does not create a tunnel.)

Another protocol in common use for VPNs is _Transport Layer Security (TLS)_. This protocol operates at either layer 6 or layer 7 of the OSI model depending on how the model is interpreted. TLS is sometimes called SSL (Secure Sockets Layer), although SSL refers to an older protocol that is no longer in use.

## Tunneling Protocols
* Split tunneling
* GRE tunneling
* IP-in-IP tunneling
* SSH tunneling
* Point-to-Point Tunneling Protocol (PPTP)
* Secure Socket Tunneling Protocol (SSTP)
* Layer 2 Tunneling Protocol (L2TP)
* Virtual Extensible Local Area Network (VXLAN)
