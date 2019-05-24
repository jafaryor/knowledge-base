# Web Security
__Security__ - the state of  being protected or safe from harm.

__Web Security__ - keeping a web server and its apps protected of safe from harm. 

* Awareness + Protection = Security
* Total security is unachivable.
* Weakest link in your security = Overall security level
* Define Security Policy for Organization


## General Security Principles
### Least Privilege
Every program and every privileged user of the system should operate using the least amount of privilege necessary to complete the job.

Benefits:
* Code stability
    * because you controll the access of data
    * Easier to test actions and interactions
* System security
    * Vulnerabilities are limited and localized

### Simple is more Secure
* Complexity invites bugs
* Use clearly named functions and variables
* Write code comments
* Break up long sections of code into small functions
* Don't repeat yourself (`DRY` principle)
* Legacy code is a security concern
* Built-in functions are often better than your own versions
* Disable or remove unused features when possible

### Never Trust Users

### Expect the Unexpected
* Security is not reactive

    > _Reactive_ - reacting to events or situations rather than doing something first in order to change or prevent something

* Prevent the crime before it happens
* Consider "edge cases"

### Defence in Depth
Defence should be layered.

Layers:
* People
    * Write Security Policy
    * Gets everyone educated
    * Get them to follow the best practices
    * Assigning responsibilities to them
* Technology
    * Hardware
    * Software
    * System administration
    * Firewall
    * Code
    * ...
* Opearations
    * Periodic security reviews
    * Data handling procedures
    * Monitoring responsibilities
    * How you respond to threats

### Security through Obscurity (неясность)

The less information you give out, the better.

### Blacklisting & Whitelisting
_Blacklist_ - reference list for what is forbidden.

_Whitelist_ - reference list for what is permitted.
 
### Map Exposure Points & Data Passageways
Maps the data as it moves through your app.

Benefits:
* Understand site typography
* Helps "Expect and Unexpected"

Input:
* Urls
* Forms
* Cookies/sessions
* Database reads
* Your public api

Outgoing exposure:
* HTML
* Javascript/json/xml/rss
* Cookies/sessions
* Database write
* Third-party APIs


## Filtering Input and Controlling Output
### Regulating HTTP requests/response format
* `Content-type` - a format of sent data.
* `Accept` - format for returned data.

### Validation Input
* Only allow expected data in submission.
* Do double data validation (front-end and backend).

Common validations:
* Presence
* Length
* Type
* Format
* Within a set/range of values
* Uniqueness

### Sanitazing Data
* Use type casting (`1+(+'1')`), not type juggling (`==`, `1+'1'`)
* Sanitize SQL, HTML, JS, JSON, XML, ...
* Encoding - replacing powerful characters with harmless equivalent.

    HTML: `"<"` with `"&lt;"`, `">"` with `"&gt;"`

* Escapeing - add escape characters before powerful characters.

    SQL: `" ' "` with `" \' "`

* Don't write custom sanitization methods. Use well-tested, language-specific functions.
* Don't remove or correct invalid data.
    ```javascript
    // Hacker tries:
    "<script>alert('Gotcha!')</script>"

    // You remove <sctript></sctript> tags:
    "alert('Gotcha!')"

    // Hacker tries:
    "<scr<script>ipt>alert('Gotcha!')</scr</script>ipt>"

    // You remove <sctript></sctript> tags:
    "<script>alert('Gotcha!')</script>"
    ```
    It might goes endless.

### Labeling Variables
Use names to identify condition of data.
* Before sanitization: `dirty`, `raw`, `tainted`, `unsafe`
* After sanitization: `clean`, `filtered`, `sanitized`, `safe`

### Keeping Code Private
* Web Server configuration
* Set correct permission to files/folder
* Set complex password

### Keeping Credentials Private
* Keep credentials separate from code
* Keep them outof VCS
* Have as few copies of credentials as necessary
* Don't reuse passwords
* Hash passwords whenever possible
* Encrypt passwords with public + private keys

### Keeping Error Messages Vague
* In order to confuse the hacker.
* Return generic 400 (not found) or 500 (some error) pages.
* Developers can look up errors in log file.
* Configure the web server to use same error pages.

### Smart Logging
* Log: _Errors_, _Sensitive Acrions_ (log in, export file, ), _Possible attacks_.
* Date and Time of event
* Source of actions (user, `IP`, email ...)
* The Actions itself
* Target of attack
* Cookie/Session information
* URL and all parameters
* Backtrace - all steps in your code on the way to generating error or action.
* Don't Log sensitive data (password, POST params, DB queries)
* Filter out passwords, keys and tokens
* Keep old content (old data before attack)


## Common Attacks
### Cross-site Scripting (XSS)
Injecting JS into a web page. "Cross-site" because scripting is done via another website.

Used to:
* trick users into running JS code.
* steal cookies.

Solution:
* Sanitize any dynamic text hat gets output of browser

### Cross-Site Request Forgery (CSRF)
When hacker tricks users into making a request to your server.

Used to:
* make fraudulent (поддельный) clicks.
* take advantage of a user's logged in state

Example:
```jsx
// you logged into your online bank account 
// You close browser window, but don't log out
// which means your session is still active

// Then you go hacker website
<img src="https://bank.com/transfer?amount=100&to=123456789"></img>
```

Solution:
* `GET` requests should be idempotent
* Only use `POST` requests for making changes, because `<img>` makes `GET` requests.
* Insure that the form data that we received comes from legitimate forms that we have generated for our users by using `form token` in user's session.
* Store the token generation time in user's session.
* Check if too much time has passed (1 day for instance).

### SQL Injection
When hacker is able to execute arbitrary SQL requesrts.

Can be used to:
* probe DB scheme
* to steal DB data (password, email, credit card data, ...)
* add or change DB data
* destroy DB data

Solution:
* Give limited privileges to DB usres. (Most users don't need to create tables for instance)
* Sanitize input
* Escape for SQL
* Use SQL Prepared Statements:
    ```sql
    SET @sql = "SELECT * FROM articles WHERE title = ?";

    PREPARE stmt FROM @sql;
    EXECUTE stmt USING @query;
    ```

### URL Manipulation
Is editing URL string in the browser location bar to probe the web site when some sensitive data is part of URL.

Can be used:
* for revealing private info.
* for performing restricted actions

Examples:
* `http://yourwebsite.com?invoice=32534534`
* `http://yourwebsite.com/auhtorize?userId=049588723`
* `http://yourwebsite.com?sessionId=7123103`
* `http://yourwebsite.com?preview=false`

Here we can change any this sensitive data and fetch another sensitive data

Solutions:
* Realize that URLs are exposed and editable
* Don't use obscurity (неясность) for access control
* Keep error messages vague
* First two solutions from CSRF

### Faked Requests and Forms
Request header info can be manifactured.

HTML forms can also be manufactured. Moreover they can be duplicated.

Solutions:
* Don't rely on form structure for data validation
* Don't rely on client-side validation
* Use `HTTP Referer` to enforce same-domain forms
* Use CSRF protextions (tokens, timestamp)

> The `Referer` request header contains the address of the previous web page from which a link to the currently requested page was followed. The `Referer` header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.

### Cookie Visibility and Theft
* Cookie data is visible to user
* Cookies can be stolen using XSS attack
* Cookie can be sniffed by observing network traffic (as it is visible to everyone)
* Cookie can be manufactured

Solutions:
* Only put non-sensitive data in cookies (preferences ...)
* Use `HttpOnly` cookies (It is not supported by older browsers)
* Use `Secure` cookies (`HTTPS` only)
* Use `SSL`
* Set cookie expiration date
* Set cookie domain and path
* Consider expiration logins after a set period of time

If you have to put sensitive data into cookie, then:
* Encrypt cookie data
* Use server-side sessions intead of client-side cookies

> When setting the cookie, the `Secure` attribute instructs the browser that the cookie should only be returned to the application over encrypted connections.

### Session Hijacking
How sessions work:
1. We save sensitive data in the web server
2. Send the browser a cookie with a session ID to reference that info

So the information is safer because it is never sent to browser. You can't see it in cookie and can't see it while it is in transit. However hacker can see session ID.

_Session Hijacking_ is similar to cookie theft, but much more valuable.

Used to:
* assume your identity and logged in status
* steal personal info, change password

_Session Hijacking_ is often done by network eavesdropping (подслушивание). So beware of open wireless network at coffee shop as eavesdropping in such network is extremely easy.

Solution:
* Save user agent (browser version) in session and confirm it.
    
    This is weak solution because user agent is avalable in header so it can be spoofed.

*  Check `IP` address.

    It is buggy solution, because:
    * For most legitimate users the `IP` may change.
    * Single `IP` address does not necessarily represent one computer. Company employees for instance share one corporate `IP` address.

* Use `HttpOnly` cookies
* Regenerate session ID periodically, at key points

    Especially important to regenerate session ID _after_ log in.

* Expire/remove old session files regularly
* Use `SSL` (best)

    > There is going to be a small performance penalty due to encryption and decryption of transfered data.

### Session Fixation
When hacker tricks a user into using a hacker-provided session ID.

Attack steps:
1. Hacker to web site (`https:yourbank.com`) and log in.
2. Get session ID from cookies
3. Hacker tricks user to go to `https:yourbank.com/login?SESSION_ID=...`
4. Provided session ID becomes ID of user.
5. Now hacker and user share the same session ID.
6. When user loges into web site, hacker get logged in automatically.

Can be used to:
* assume your identity and logged in status
* steal personal info, change password

Solution:
* Don't accept session ID from `GET` or `POST` variables. Session ID should come from cookies only.
* Session Hijacking protection

### Remote System Execution (MOST POWERFULL HACK)
When hacker able to run OS commands on a web server. Typically hardest to achieve (unless you make it easy).

Most programming languages do not allow casual access to the underlying OS.

Most programming languages offer special commands which can access the underlying OS. Such commands are called `System Execution Commands`

Can be used to:
* do _anything_ your OS can do.

Solution:
* Avoid System Execution Keywords
* Perform system execution with extreme caution
* Sanitize any dynamic data carefully
* Understand the commands and thir syntax completely
* Add additional data validation

### File Upload Abuse (злоупотребление)
When hacker abuses of allowed file upload feature.

Can be used to:
* upload too much (quantity, file size)
* upload malicious files

Solution:
* Require user authentication, no anonymous uploads.
* Limit the maximum upload size
* Limit the amount of files to upload
* Limit allowable file formats, file extensions
* Scan the uploaded files with antivirus
* Don't host uploaded files which have not been verified

### Denial of Service (DoS)
When hacker overloads a server with too many requests. Includes DNS, routing disruption (нарушение), using up disk space, processor power, bandwidth ... In short averything that can make a server unavalable to users.

Attacks often performed by distributed network. Thanks is why they are also called __`DDoS`__ attacks.

`DoS` attacks are cheap to launch and difficult to prevent.

Can be used:
* to revenge
* as a distraction (отвлечение) from other hacking attempts

Solution:
* Firewalls, which allow you to set rules about what traffic is allowed to pass on the web server. You can block certain ports, filter out `IP` addresses
* Switches and Routers through _access controll list_
* Load management hardware/software
* Collection of reverse proxies. Make the threshold the hacker has to hit a little higher. If they come with more fire power, then you need to raise the threshold again. And so on.
* Map your infrastructure
* Keep infrastructure up to date
* Purchase high-quality hosting and equipment
* Make network traffic visible to see what traffic is comming in and know you become overloaded
* Develop a response plan
* Change `IP` adress (temporary protection)
* "Black Hole" or "Null Route" traffic. `ISP` (Internet Service Provider) often do it.

> __Load management hardware/software__ - load balancing tools that allowes balancing load between different servers ao no one server has to handle all requests on its own. They also can be configured to spin up additional server or cloud server as other server are overloaded.

### Brute Force Attack
When hacker systematically trying all possible input combinations until the correct solution is found. Before bruteforcing hackers try _Dictionaries_ to find the password faster.

Solution:
* Encourage users to provide strong passwords
* Slow password hashing algorithms (`Blowfish`)
* Timing and Throttling
    * 3 password attempt per 30 min
    * Lock user after 20 attempts
* Logging
* Blacklisting

These solutions doesn't prevent Bruteforce attack, but slow the attack.

### Buffer/Stack Overflow Attack
In low-level programming languages, develpoer has control over memory allocation. They allocate memory with a fixed size and assign data to it. User input should be should be the same size, the momory allocated for it. But if input is too large, it overflows the boundaries assign to it and potentially it overwrites part of a block memory that has been used for something else. When it happens, part of a program becomes corrupted. It can then crash the system. Or if the data overflows the user input, if it crafted correctly, can change the program's behaviour. Or in really extreme scenario it can be used the break out of the program and run system-level commands as well.

* System which are very effective by this are going to be low-level languages (`C`, `C++`, `Objectve-C`).
* But any languages could have flaws as many high-level languages use low level libraries.

Solution:
* Allocate memory accurately
* Use safe string functions
* Validate data (by length in particular)

> Many system security problems are caused by poor buffer handling and the resulting buffer overruns. Poor buffer handling is often associated with string manipulation operations. The standard string manipulation functions that are supplied by `C/C++` language runtime libraries (`strcat`, `strcpy`, `sprintf`, ...) do not prevent writing beyond the end of buffers. So use __Safe String Functions__ which are built functions.

[More on YouTube](https://www.youtube.com/watch?v=1S0aBV-Waeo)

## Encryption and User Authentification
### Password Encryption
> Never store password in plain text!

Encrypt the password using Hash Functions (one-way/non-reversible encryption)

`Same input + same hashing algorithm = same output`

Hashing Algorithms:
* `MD5` (is not save anymore)
* `SHA-1`
* `SHA-2` (`SHA-256`, `SHA-512`)
* `Whirlpool`
* `Tiger`
* `AES`
* `Blowfish` (recommended) - secure, free, easy, slow

### Salting Password
Main enemies of hashing algorithms are __Rainbow Tables__

> __Rainbow Tables__ are pre-computed tables of password hashes for each hashing algorithm.

Solution is __Salt__.

> __Salt__ - additional data added to password before encryption.

To make protection even stronger, use __Unique Salt__ for each user. It can be either `user_name` or some random string like current date and time.

In this case _Rainbow Table_ also can be used, but they would be almost impossibly large.

Like: `'Unique Salt in' + password + ' for ' + user`

So you need to store the _Salt_. Not as a plain text, but hashed _Salt_.

### Password Requirements
* Require length, but do not limit length
* Require non-alphanumeric characters
* Reconfirm password
* Report password strength
* Do not record a password hint. Because some users put password in hint field
* Security questions are questionable (сомнительная)

### Using  Secure Sockets Layer (`SSL`) for Login
`SSL` provides communication security in two ways:
1. Verifies authenticity of remote server, to make sure is who we think it is.
2. Encrypts all data exchanged with server.

> There is a network of hardware between client and your server.

Using SSL prevents:
* Snooping (шпионить)
* Session Hijaking

Usage:
* Use SSL all the time (GitHub)
* Switch SSL when it needed (Amazon)
* Offer user-configurable option (Facebook)

### Handling Forgotten Passwords
Ask the following:
* Ask privilege info. This information needs be something that is unlikely to be lost and found (`PIN`).
* Security challange questions
* Provide customer service staff and let people decide.
* Send email with new password
* Send email with reset token
    1. Request username to reset
    2. Always respond positively in order to confuse hacker
    3. Generate a unique token, store in DB
    4. Store token generation time; to limit time for use
    5. Email a `URL` that includes the token
    6. `URL` grants access; allow setting password
    7. Account still functions up until the reset

### Regulating Access Privileges
* Least privileges principle
* Make privileges easy to revoke (аннулировать)
* Restrict access to access privilege administration tools. It is OK if one or two people in the organization to have such access.

What should you restrict access to:
* Evaluate (оценить) organizational needs and workflow (рабочий процесс)
* Devide restricted actions into "privilege areas" (articles, products, ...)
* Regulate (упорядочить) access by user access level (1, 2, 3 ...), category (admin, staff, user, ...) or role (publisher, developer, designer, ...).

### Multi-factor Authentication (`MFA`)
Requires two or more factors to gain access. Username/password would be one factor.

The second factor can be:
* Something only the user __knows__ (`SMS` number)
* Something only the user __has__ (Bank Card)
* Something only the user __is__ (fingerprints, voice, retina)

Common implementaion:
1. User creates an account
2. Site logs computer being used (`IP`, set cookies, ...)
3. Future logins from the same device is approved (as user has computer)
4. Future logins from new device require _additional factor_

The Additional Factor can be:
* Send email to account on file (passcode to enter, URL to click)
* Send `SMS` message to mobile phone on file (passcode to enter, require an `SMS` response)
* Call phone on file with recorded message (passcode to enter, require voice response)

`MFA` pitfalls:
* Most users are not familiar with `MFA`
* Reluctance (неохотность) to provide additional data
* You should have a clear instructions
* Our system has to be 100% reliable
* Error handling should be done exceptionally well (you should consider all possible cases)
* Leads to customer service issues

So for average web sites `MFA` may not be a good iidea.


## Other Concerns
### Regular Expression Flaws
* Every regular expression is suspect (подозрительный). As you can easily make a mistake.
* Treat all regular expressions as weak point. Because they use special symbols to describe complex idea
* The more complicated it is, the weaker it is
* But it doesn't have to be complicated, to be flawed

For example
```javascript
const str = 'First: Jafar, Last: Yor, Country: Tajikistan,';

/First: (.+), Last: (.+),/.exec(str);
/*
As (.+) is greedy, so
    First === 'Jafar'
    Last === 'Yor, Country: Tajikistan'
*/

/First: (.+?), Last: (.+?),/.exec(str);
/*
As (.+?) is not greedy, so
    First === 'Jafar'
    Last === 'Yor'
*/
```

### Database Security
* Make sure you set strong `root` password
* Connect using a user besides `root`
* Stick to _Least Privilege Principle_
* Allow access only from `localhost` or specific `IP` address
* Back up DBs regularly (weekly, nughtly, hourly)
* Protect DB backups physically. So put you backups in different location than the server is located
* Regulate access to DB backups
* Some `ISP`s automatically back up the entire server

### Server Security
* Make sure you set strong `root` password
* Set up access privileges and manage them
* Stick to _Least Privilege Principle_
* Pay attention to `superuser` privileges (in Lunx-kind systems) as they can do almost anything `root` can
* `SSH` keys. If you use `SSH` key, you can tunr off password-based logins completely.
* Customize connection port numbers (`HTTP` requests usually use port `80`, `FTP` - `20`, `SSH/SFTP` - `22`). Most of the ports up yo `1000` are taken by various services.
* Set up Firewall
* Know your server
* Keep software up to date
* Disable/remove everything you are not needed

### Credit Card Payment
All of the credit card companies got together and form the organization called __Payment Card Industry Security Standards Council (PCI)__. PCI forms data security standards. __PCI Compliance__ is a shorthand (краткая запись) for being in compliance with data security standards.

PCI Compliance:
* different requirement levels depending on your business (type of product, volume of business, ...)
* Some levels may even require security audits.
* Total security of transaction, including your `ISP`
* ...

Best Practices:
* Transmit all payments info over `SSL`
* Never store full credit card number
* Never store security code (`SVV`)
* Store card _brand_ and _last four digits_ of card number

__Credit Card Vaults__ - This is where your processor (обработчик) stores card info for you.

How it works:
1. You send credit card number to them (processor)
2. They send you back a reference token

> If token is stolen, it is useless in different context. It only works with you and with that processor.

Credit Card Vaults pros:
* Usefull for recurring billing (повторяющиеся платежи)
* Managed by security specialists
* Makes PCI compliance easier

### Conversions and Transformations
* Be careful when converting data between formats (JSON -> array, ...)
* Be careful when transforming data (text encoding, character replcaing)
* After re-sanitize the result

### Source Code Managers (`SCM`)
It is part of larger set of software called __Version Controll Systems (`VSC`)__. `SCM`s are used to track revisions in software. Each revision is given a timestamp and includes the name of the person who is responsible for the change. Various revisions may be compared, stored, and merged with other revisions.

Controll Access to Repositories:
* Decide if the code is public or private
* Manage contributor access privileges
* Policy and procedure for removal of distributed code in case of employee left
* If Open Source project, consider the model: read-only, fork, pull requests

Contoll Content in Repositories:
* Do not commit DBs, credentials, tokens, hashes
* Maintain key info in discreet files and list them in _`.gitignore`_ file
* Removing data later is difficult, as the system keeps history
* Many `SCM`s are designed to prevent data loss/removal
