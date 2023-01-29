## System Availability
Availability is the time a system remains operational to perform its required function in a specific period. It is a simple measure of the percentage of time that a system, service, or machine remains operational under normal conditions.

### How to measure it?
Availability is often quantified by uptime (or downtime) as a percentage of time the service is available. It is generally measured in the number of 9s.

`availability = 100% * uptime / (uptime + downtimme)`

If availability is `99%` available, it is said to have "2 nines" of availability, and if it is `99.9%`, it is called "3 nines", and so on.

| Availability % | Downtime (Year) | Downtime (Month) | Downtime (Week) |
| - | - | - | - |
| 90% (one nine) | 36.53 days | 72 hours | 16.8 hours |
| 99% (two nines) | 3.65 days | 7.20 hours | 1.68 hours |
| 99.9% (three nines) | 8.77 hours | 43.8 minutes | 10.1 minutes |
| 99.99% (four nines) | 52.6 minutes | 4.32 minutes | 1.01 minutes |
| 99.999% (five nines) | 5.25 minutes | 25.9 seconds | 6.05 seconds |
| 99.9999% (six nines) | 31.56 seconds | 2.59 seconds | 604.8 milliseconds |
| 99.99999% (seven nines) | 3.15 seconds | 263 milliseconds | 60.5 milliseconds |
| 99.999999% (eight nines) | 315.6 milliseconds | 26.3 milliseconds | 6 milliseconds |
| 99.9999999% (nine nines) | 31.6 milliseconds | 2.6 milliseconds | 0.6 milliseconds |

> __5 nines__ is a gold standard.

### How do we achieve High Availability?
High Availability comes with its own tradeoffs, such as higher latency or lower throughput, and achieving high availability is very difficult. To make highly available systems, we need to make sure that the system does not have any single point of failure. So, How do we eliminate a single point of failure in a system?

To eliminate any _single point of failure_, we need to make our system more redundant. __Redundancy__ is the act of duplicating or adding certain parts of our system. Let's take an example; imagine you have a system consisting of two identical web servers that are installed behind a load balancer. The traffic coming from clients will be distributed between the web servers, but if one of the servers goes down, the load balancer will redirect all traffic to the remaining server, which is working.

Now that we have made our servers redundant and prone to failure as the load balancer can detect the failure and respond accordingly. But, in this scenario, the load balancing layer itself remains the single point of failure. To avoid this, a simple way out is to make the load balancing layer redundant.

An essential thing to note here is that redundancy alone cannot ensure high availability. A device also needs mechanisms for detecting failures. It is also important to be able to perform high-availability testing and to be able to take corrective action any time one of the stack’s components becomes unavailable. Top-to-bottom or distributed high-availability approaches may include both work and hardware, or software-based downtime reduction techniques are also successful. Redundancy is a hardware-based approach. The implementation of high availability techniques, on the other hand, almost always requires software.

__Passive Redundancy__: When you have multiple components at a given layer in your system, and if at any point, one of them dies, the remaining servers take over and prevent any failure.

__Active Redundancy__: When you have multiple machines that work together, only one or a few of the machines will typically be handling traffic or doing work. If one of them fails, the other machines are going to know somehow and then take over.

### High Availability vs Fault Tolerance
Both high availability and fault tolerance apply to methods for providing high uptime levels. However, they accomplish the objective differently.

High availability - is used to describe systems that have particularly high levels of availability, typically 5 nines or more.

Fault-tolerant computing requires full hardware redundancy. To achieve fault tolerance, several systems run in parallel, mirroring programs identically and executing instructions together. If the main system fails, with no loss in uptime, another system can take charge.

A fault-tolerant system has no service interruption but a significantly higher cost, while a highly available system has minimal service interruption. Fault-tolerance requires full hardware redundancy as if the main system fails, with no loss in uptime, another system should take over.

### Replication
The act of duplicating the data from one database server to others. This is sometimes used to increase the redundancy of your system and tolerate regional failures for instance. Other times you can use replication to move data closer to your clients, thus decreasing the latency of accessing specific data.

Replication is widely used in many database management systems (DBMS), usually with a master-slave relationship between the original and the copies.The master gets all the updates, which then ripple through to the slaves. Each slave outputs a message stating that it has received the update successfully, thus allowing the sending of subsequent updates.

Replication can be:
* __Active:__ each node receives each message to keep in sync with the rest of the nodes.
* __Passive:__ this is the master-slave model, where the master receives all the requests and then forwards them to the slaves.

There are 2 ways to sync master db with slave dbs:
1. Synchronously.

    Whenever the master db gets a modification request, it updates the slave dbs synchronously. If it fails to update any slave db, the whole operation reverts and sends a fail message to app server.

    In the event of failure, a slave db will take over. So, the system will keep responding.

    Its main drawback is performance. It takes time to update slave dbs and wait for its completion.

2. Asynchronously

    The modification requests made to master db are collected and applied to slave dbs after some period of time regularly.

    This approach is much faster than previous, since we don't need to update slave dbs immediately.

    Its main drawback is inconsistency between the master and slave dbs.

### Redundancy vs. Replication
“Replication is the synchronization of state between redundant nodes” whereas “Redundancy is the duplication of nodes, in case of some of them are failing.”

> Replication ensures Consistency while Redundancy increases reliability.

### SLA, SLO, SLI
SLAs, SLOs, and SLIs allow companies to define, track and monitor the promises made for a service to its users. Together, SLAs, SLOs, and SLIs should help teams generate more user trust in their services with an added emphasis on continuous improvement to incident management and response processes.

__Service-level Agreement (SLA)__ - is a collection of guarantees given to a customer by a service provider. SLAs typically make guarantees on a system's availability, amongst other things. SLAs are made up of one or multiple SLOs.

__Service-level Objective (SLO)__ - is the promise that a company makes to users regarding a specific metric such as incident response or uptime. SLOs exist within an SLA as individual promises contained within the full user agreement.

__Service Level Indicator (SLI)__ - is a key metric used to determine whether or not the SLO is being met. It is the measured value of the metric described within the SLO. In order to remain in compliance with the SLA, the SLI's value must always meet or exceed the value determined by the SLO.

---

## Disaster recovery
Disaster recovery (DR) is a process of regaining access and functionality of the infrastructure after events like a natural disaster, cyber attack, or even business disruptions.

Disaster recovery relies upon the replication of data and computer processing in an off-premises location not affected by the disaster. When servers go down because of a disaster, a business needs to recover lost data from a second location where the data is backed up. Ideally, an organization can transfer its computer processing to that remote location as well in order to continue operations.

Strategies:
* __Back-up:__ the simplest type of disaster recovery and involves storing data off-site or on a removable drive.
* __Cold Site:__ an organization sets up basic infrastructure in a second site.
* __Hot site:__ a hot site maintains up-to-date copies of data at all times. Hot sites are time-consuming to set up and more expensive than cold sites, but they dramatically reduce downtime.
