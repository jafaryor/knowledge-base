# NPM
[npm](https://www.npmjs.com/), short for Node Package Manager, is two things: first and foremost, it is an online repository for the publishing of open-source Node.js projects; second, it is a command-line utility for interacting with said repository that aids in package installation, version management, and dependency management.

### Version parts
npm package versioning follows semantic versioning. So, a package version has 3 parts - __Major.Minor.Patch__
* `Patch` is incremented when a bug fix is made that won’t break consuming code.
* `Minor` is incremented when features are added that won’t break consuming code.
* `Major` is incremented when breaking changes are made.

A version often has a `^` in front of it (e.g. `^16.8.6`). This means that the latest minor version can be safely installed. So in this example, `^16.12.1` can be safely installed if this was the newest version in `16.x`.

Sometimes a version has a `~` in front of it (e.g. `~16.8.6`). This means that only the latest patch version can be safely installed. So in this example, `^16.8.12` can be safely installed if this was the newest version in `16.8.x`.

### Upgrading npm dependencies
If the packages have already been installed into the `node_modules` folder, then `npm install` won’t update any packages.

If the packages haven’t been installed and a `package-lock.json` file exists, then `npm install` will install the exact dependency versions specified in `package-lock.json`.

```bash
# List all outdated dependencies
npm outdated

# Update the dependencies to the wanted version specified
# in the results from "npm outdated"
npm update

# Upgrade the specific dependency to the specific version
npm install <package-name>@<version_number | latest>
```

Is there a quicker way of just updating all the dependencies, including major version changes? So, like `npm update` but for major version updates as well?

Yes, there is a tool called [npm-check-updates](https://github.com/tjunnone/npm-check-updates) that will do this. Just run the following command:

```bash
npx npm-check-updates -u
```


## NPX
[npx](https://www.npmjs.com/package/npx) is an npm package runner — helps to execute packages without installing explicitly.

Use cases:
* To execute script without installing it.
* To use gist based scripts.
* To use different versions of an npm module.
* If you don’t have permission to install it globally.
