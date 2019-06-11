## Web Application Threats
* ### Buffer overfow
    An attacker manages to send enough data in an input buffer to overflow an application or output buffer. As a result, memory outside the buffer becomes corrupted. Some forms of buffer overflow allow the attacker to perform seemingly impossible tasks because the affected memory contains executable code.

    The best way to overcome this problem is to perform range and size checks on any data, input or output, that your application handles.

    [More on YouTube](https://www.youtube.com/watch?v=1S0aBV-Waeo)

* ### Code injection
    An entity adds code to the data stream flowing between a server and a client (such as a browser) in _man-in-the-middle-attack_ fashion. The target often views the added code as part of the original page, but it could contain anything.

    A good way to overcome this attack is to ensure you use encrypted data streams, the HTTPS protocol, and code verification (when possible). Providing a client feedback mechanism is also a good idea.

* ### Cross-site scripting (XSS)
    An attacker injects JavaScript or other executable code into the output stream of your application. The recipient sees your application as the source of the infec‐ tion, even when it isn’t. In most cases, you don’t want to allow users to send data directly to one another through your application without strict verification. A moderated format for applications such as blogs is a must to ensure your applica‐ tion doesn’t end up serving viruses or worse along with seemingly benign data.

* ### File uploads
    Every file upload, even those that might seem otherwise innocuous, is suspect. Hackers sometimes upload backdoors using the file upload capabilities of your server, so the file could contain something nasty. If possible, disallow file uploads to your server. Of course, it isn’t always possible to provide this level of security, so you need to allow just certain types of file and then scan the file for problems. Authenticating the file as much as possible is always a good idea. For example, some files contain a signature at the beginning that you can use to ensure the file is legitimate. Don’t rely on file extension exclusion alone—hackers often make one file look like another type in order to bypass server security.

* ### Hardcoded authentication
    Developers often place authentication information in application initialization files for testing purposes. It’s essential to remove these hardcoded authentication entries and rely on a centralized data store for security information instead. Keeping the data store in a secure location, off the server used for web applica‐ tions, is essential to ensuring that hackers can’t simply view the credentials used to access the application in certain ways. If you do need initialization files for the application, make sure these files reside outside the webroot directory to ensure that hackers can’t discover them accidentally.

* ### Hidden or restricted file/directory discovery
    When your application allows input of special characters such as the forward slash (`/`) or backslash (`\`), it’s possible for a hacker to discover hidden or restricted files and directories. These locations can contain all sorts of information that a hacker can find useful in attacking your system. Disallowing use of special char‐ acters whenever possible is a great idea. In addition, store critical files outside the webroot directory in locations that the operating system can control directly.

* ### Missing or incorrect authentication
    It’s important to know whom you’re dealing with, especially when working with sensitive data. Many web applications rely on common accounts for some tasks, which means it’s impossible to know who has accessed the account. Avoid using guest accounts for any purpose and assign each user a specific account to use.

* ### Missing or incorrect authorization
    Even if you know the person you’re dealing with, it’s important to provide only the level of authorization needed to perform a given task. In addition, the authorization should reflect the user’s method of access. A desktop system accessing the application from the local network is likely more secure than a smartphone accessing the application from the local coffee shop. Relying on security promo‐ tion to assist in sensitive tasks lets you maintain minimal rights the rest of the time. Anything you can do to reduce what the user is authorized to do helps maintain a secure environment.

* ### Missing or incorrect encryption
    Use encryption to transmit data of any sort between two endpoints to help keep hackers from listening in on your communication. It’s important to keep track of the latest encryption techniques and rely on the best encryption supported by the user’s environment. For example, Triple Data Encryption Standard (`3DES`)isn’t secure any longer, yet some organizations continue to use it. The current Advanced Encryption Standard (`AES`) remains mostly secure, but you want to use the largest key possible to help make it harder to crack.

* ### Operating system command injection
    An attacker modifies an operating system command your application uses to perform specific tasks. Your web-based application probably shouldn’t use operating system calls in the first place. However, if you absolutely must make operating system calls, make sure the application runs in a sandbox.

* ### Parameter manipulation
    Hackers can experiment with parameters passed as part of the request header or URL. For example, when working with Google, you can change the URL and the results of your search. Make sure you encrypt any parameters you pass between the browser and the server. In addition, use secure web page protocols, such as HTTPS, when passing parameters.

* ### Remote code inclusion
    Most web applications today rely on included libraries, frameworks, and APIs. In many cases, the include statement contains a relative path or uses a variable containing a hardcoded path to make it easier to change the location of the remote code later. When a hacker is able to gain access to the path information and change it, it’s possible to point the remote code inclusion to any code the hacker wants, giving the hacker full access to the application. The best way to avoid this particular problem is to use hardcoded full paths whenever possible, even though this action makes it harder to maintain the code.

* ### Session hijacking
    Every time someone logs in to your web server, the server gives that user a unique session. A session hijacker jumps into the session and intercepts data transferred between the user and the server. The three common places to look for information used to hijack a session are: cookies, URL rewriting, and hidden fields. Hackers look for session information in these places. By keeping the session information encrypted, you can reduce the risk of someone intercepting it. For example, make sure you rely on the HTTPS protocol for logins. You also want to avoid doing things like making your session IDs predictable.

* ### `SQL` injection
    An attacker modifies a query that your application creates as the result of user or other input. In many cases, the application requests query input data, but it receives `SQL` elements instead. Other forms of `SQL` injection attack involve the use of escape or other unexpected characters or character sequences. A good way to avoid `SQL` injection attacks is to avoid dynamically generated queries.
