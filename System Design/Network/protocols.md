# Network
A network is a group of two or more connected computing devices. Usually all devices in the network are connected to a central hub — for instance, a router. A network can also include subnetworks, or smaller subdivisions of the network. Subnetworking is how very large networks, such as those provided by ISPs, are able to manage thousands of IP addresses and connected devices.

Think of the Internet as a network of networks: computers are connected to each other within networks, and these networks connect to other networks. This enables these computers to connect with other computers both near and far.

__Protocol__ -  is a standardized way of doing certain actions and formatting data so that two or more devices are able to communicate with and understand each other.

## Internet Protocol (IP)
The __Internet Protocol__ - is a network layer protocol that allows data packets to be routed and addressed in order to pass through networks and reach their destination. When one machine or client wants to communicate with another machine or server and sends data to other machines, it does so in the form of an _IP packet_.

Sometimes more broadly referred to as just a (network) packet, an __IP packet__ is effectively the smallest unit used to describe data being sent over IP, aside from bytes. An IP packet consists of:
* an __IP header__, which contains the source and destination IP addresses as well as other information related to the network
* a __payload__, which is just the data being sent over the network

When Bob sends Alice a message, for instance, his message is broken down into smaller pieces and then reassembled on Alice's computer. A packet has two parts: the header, which contains information about the packet itself, and the body, which is the actual data being sent.

At the network layer, networking software attaches a header to each packet when the packet is sent out over the Internet, and on the other end, networking software can use the header to understand how to handle the packet.

A header contains information about the content, source, and destination of each packet (somewhat like stamping an envelope with a destination and return address). For example, an IP header contains the destination IP address of each packet, the total size of the packet, an indication of whether or not the packet has been fragmented (broken up into still smaller pieces) in transit, and a count of how many networks the packet has traveled through.

![ip-packet](./images/ip-packet.svg)

Every device or domain that connects to the Internet is assigned an _IP address_. `IPv4` addresses consist of four numbers separated by dots: `a.b.c.d` where all four numbers are between `0` and `255`. Special values include:
* `127.0.0.1`: Your own local machine. Also referred to as `localhost`.
* `192.168.x.y`: Your private network. For instance, your machine and all machines on your private wifi network will usually have the `192.168` prefix.

### Port
In order for multiple programs to listen for new network connections on the same machine without colliding, they pick a __port__ to listen on. A port is an integer between 0 and 65,535 (2^16 ports total).

Typically, ports 0-1023 are reserved for system ports (also called well-known ports) and shouldn't be used by user-level processes. Certain ports have pre-defined uses, and although you usually won't be required to have them memorized, they can sometimes come in handy. Below are some examples:
* `22`: Secure Shell
* `53`: DNS lookup
* `80`: HTTP
* `443`: HTTPS

## Border Gateway Protocol (BGP)
The Internet is made up of interconnected large networks that are each responsible for certain blocks of IP addresses; these large networks are known as __autonomous systems (AS)__. A variety of routing protocols, including BGP, help route packets across ASes based on their destination IP addresses. Routers have routing tables that indicate which ASes the packets should travel through in order to reach the desired destination as quickly as possible. Packets travel from AS to AS until they reach one that claims responsibility for the targeted IP address. That AS then internally routes the packets to the destination.

__Border Gateway Protocol (BGP)__ is the postal service of the Internet. When someone drops a letter into a mailbox, the Postal Service processes that piece of mail and chooses a fast, efficient route to deliver that letter to its recipient. Similarly, when someone submits data via the Internet, BGP is responsible for looking at all of the available paths that data could travel and picking the best route, which usually means hopping between autonomous systems.

BGP is the protocol that makes the Internet work by enabling data routing. When a user in Singapore loads a website with origin servers in Argentina, BGP is the protocol that enables that communication to happen quickly and efficiently.

## Transmission Control Protocol (TCP)
__TCP__ - is a transport layer protocol used to transmit data over a network. It is built on top of the Internet Protocol (IP) and is used to solve problems that may arise when transmitting data.

When a machine wants to communicate with another machine using TCP, it establishes a connection with the destination server through a handshake process. Once the connection is established, the two machines can communicate freely.

> IP is responsible for delivering the packets, while TCP helps put them back in the correct order.

The TCP is a transport protocol, meaning it dictates the way data is sent and received. A TCP header is included in the data portion of each packet that uses TCP/IP. Before transmitting data, TCP opens a connection with the recipient. TCP ensures that all packets arrive in order once transmission begins. Via TCP, the recipient will acknowledge receiving each packet that arrives. Missing packets will be sent again if receipt is not acknowledged.

TCP provides a reliable stream delivery service to applications through sequenced acknowledgement. It is a connection-oriented protocol, meaning a connection must be established between applications before data transfer occurs. TCP also provides extensive error checking through flow control and acknowledgement of data, and it ensures that the data packets arrive in the correct order at the receiving end. Lost data packets can also be retransmitted using TCP.

Some advantages of TCP include its ability to ensure that data reaches its destination, arrives on time, and does not have duplicates. It also automatically breaks data into packets before transmission. However, TCP cannot be used for broadcast or multicast connections.

TCP is designed for reliability, not speed. Because TCP has to make sure all packets arrive in order, loading data via TCP/IP can take longer if some packets are missing.

## User Datagram Protocol (UDP)
The __UDP__ - is another widely used transport protocol. It's faster than TCP, but it is also less reliable. UDP does not make sure all packets are delivered and in order, and it doesn't establish a connection before beginning or receiving transmissions.

As a result, UDP is useful in situations where the reliability mechanisms of TCP are not necessary and faster transmission is desired, such as in video streaming and gaming.

UDP is also suitable for multicast and broadcast connections i.e. sending a single message to multiple recipients. However, there are some disadvantages to using UDP. It is possible for packets to be lost, delivered twice, or not delivered at all.

## TCP vs UDP
TCP is a connection-oriented protocol, whereas UDP is a connectionless protocol. A key difference between TCP and UDP is speed, as TCP is comparatively slower than UDP. Overall, UDP is a much faster, simpler, and more efficient protocol, however, retransmission of lost data packets is only possible with TCP.

TCP provides ordered delivery of data from user to server (and vice versa), whereas UDP is not dedicated to end-to-end communications, nor does it check the readiness of the receiver.

## File Transfer Protocol (FTP)
The FTP is a protocol used for transferring files between hosts, both local and remote. It runs on top of the TCP and creates two TCP connections: a control connection and a data connection. The control connection is used to transfer control information, such as passwords and commands to retrieve and store files, while the data connection is used to transfer the actual file. Both connections run in parallel during the entire file transfer process.

FTP has several advantages, including the ability to share large files and multiple directories at the same time, the ability to resume file sharing if it is interrupted, and the ability to recover lost data and schedule file transfers. However, FTP has some disadvantages as well. It lacks security, as data, usernames, and passwords are transferred in plain text, making them vulnerable to malicious actors. FTP also lacks encryption capabilities, which makes it non-compliant with industry standards.

## Remote Procedure Call (RPC)
RPC is a protocol that allows a program on one device to request a service from a program on another device over a network, without the need to understand the details of the network. It is used for interprocess communication in client-server based applications and is also known as a subroutine call or function call.

It uses either the TCP or the UDP to carry messages between communicating programs.

There are several advantages to using RPC. It can improve performance by omitting many protocol layers and minimize code rewriting or redevelopment efforts. However, RPC has not yet been proven to work effectively over wide-area networks and does not support other transport protocols besides TCP/IP.

The most preferred version of RPC is __gRPC__.

## What physical infrastructure makes the Internet work?
A lot of different kinds of hardware and infrastructure go into making the Internet work for everyone. Some of the most important types include the following:
* __Routers__ forward packets to different computer networks based on their destination. Routers are like the traffic cops of the Internet, making sure that Internet traffic goes to the right networks.
* __Switches__ connect devices that share a single network. They use packet switching to forward packets to the correct devices. They also receive outbound packets from those devices and pass them along to the right destination.
* __Web servers__ are specialized high-powered computers that store and serve content (webpages, images, videos) to users, in addition to hosting applications and databases. Servers also respond to DNS queries and perform other important tasks to keep the Internet up and running. Most servers are kept in large data centers, which are located throughout the world.
