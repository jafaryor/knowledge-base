## Deploy

### The Twelve-Factor App

In the modern era, software is commonly delivered as a service: called web _apps_, or _software-as-a-service_. The [**twelve-factor app**](https://12factor.net/) is a methodology for building software-as-a-service apps that:

- Use declarative formats for setup automation, to minimize time and cost for new developers joining the project;
- Have a clean contract with the underlying operating system, offering maximum portability between execution environments;
- Are suitable for deployment on modern cloud platforms, obviating the need for servers and systems administration;
- Minimize divergence (расхождение) between development and production, enabling continuous deployment for maximum agility;
- And can scale up without significant changes to tooling, architecture, or development practices.

The twelve-factor methodology can be applied to apps written in any programming language, and which use any combination of backing services (database, queue, memory cache, etc).

The Twelve Factors:

1. #### Codebase
   One codebase tracked in revision control, many deploys
2. #### Dependencies
   Explicitly declare and isolate dependencies
3. #### Config
   Store config in the environment
4. #### Backing services
   Treat backing services as attached resources
5. #### Build, release, run
   Strictly separate build and run stages
6. #### Processes
   Execute the app as one or more stateless processes
7. #### Port binding
   Export services via port binding
8. #### Concurrency
   Scale out via the process model
9. #### Disposability
   Maximize robustness with fast startup and graceful shutdown
10. #### Dev/prod parity
    Keep development, staging, and production as similar as possible
11. #### Logs
    Treat logs as event streams
12. #### Admin processes
    Run admin/management tasks as one-off processes

### Tools

- #### [dotenv](https://github.com/motdotla/dotenv)

  Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`. Storing configuration in the environment separate from code is based on The _Twelve-Factor App_ methodology.

- #### [Prettier](https://prettier.io/)

  Prettier takes your code and reprints it from scratch by taking the line length into account. It removes all original styling\* and ensures that all outputted code conforms to a consistent style.

- #### [tslint](https://palantir.github.io/tslint/)

  TSLint is an extensible static analysis tool that checks TypeScript code for readability, maintainability, and functionality errors.

- #### [Husky](https://github.com/typicode/husky)

  Enables git hook, like: `pre-submit`, `pre-push`, ...

- #### [Nodemon](https://nodemon.io/)

  Nodemon is a utility that will monitor for any changes in your source and automatically restart your server.

- #### [Postman](https://www.postman.com/)

  A tool that provides efficient way to work and test with APIs.

- #### [Fiddler](https://www.telerik.com/fiddler)

  Fiddler Everywhere is a web debugging proxy. Capture all HTTP(S) traffic between your computer and the Internet with Fiddler HTTP(S) proxy. Inspect traffic, set breakpoints, and fiddle with requests & responses.

- #### [NVM](https://github.com/nvm-sh/nvm)

  nvm is a version manager for node.js, designed to be installed per-user, and invoked per-shell.

- #### [forever](https://github.com/foreversd/forever)

  A simple CLI tool for ensuring that a given script runs continuously (i.e. forever). Meaning that if the terminal where you run the server quits, the server will also quite. But not with `forever`.

- #### [Docker](https://docs.docker.com/)

  Docker is a platform for developers and sysadmins to build, run, and share applications with containers. The use of containers to deploy applications is called containerization.

  Containerization is increasingly popular because containers are:

  - **Flexible**: Even the most complex applications can be containerized.
  - **Lightweight**: Containers leverage and share the host kernel, making them much more efficient in terms of system resources than virtual machines.
  - **Portable**: You can build locally, deploy to the cloud, and run anywhere.
  - **Loosely coupled**: Containers are highly self sufficient and encapsulated, allowing you to replace or upgrade one without disrupting others.
  - **Scalable**: You can increase and automatically distribute container replicas across a datacenter.
  - **Secure**: Containers apply aggressive constraints and isolations to processes without any configuration required on the part of the user.

- #### [Heroku](https://devcenter.heroku.com/categories/nodejs-support)

  Heroku makes it easy to deploy and scale Node.js applications. Run any recent version of Node.js. Deploy apps in seconds using dependency caching.

- #### [Jenkins](https://www.jenkins.io/)

  Jenkins provides hundreds of plugins to support building, deploying and automating any project.

- #### [GitHub Actions](https://github.com/features/actions)

  GitHub Actions makes it easy to automate all your software workflows, now with world-class CI/CD. Build, test, and deploy your code right from GitHub. Make code reviews, branch management, and issue triaging work the way you want.
