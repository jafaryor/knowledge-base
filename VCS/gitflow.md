## Gitflow
GitFlow is a branching model for Git, created by Vincent Driessen. It has attracted a lot of attention because it is very well suited to collaboration and scaling the development team.

#### How it works
* __Master__ - Represent production-ready state of source code.
* __Develop__ - Represent Latest delivered development changes or also called integration branch.

    * A `develop` branch is created from `master`

* __Release__ - Represent preparation of a new production release to deploy changes on Testing server.

    * A `release` branch is created from `develop`
    * When the `release` branch is done it is merged into `develop` and `master`

* __Feature__ - Represent some app feature.

    * `feature` branches are created from `develop`
    * When a feature is complete it is merged into the `develop` branch

* __Hotfix__ - Represent the emergency fix.

    * If an issue in `master` is detected a `hotfix` branch is created from `master`
    * Once the hotfix is complete it is merged to both `develop` and `master`

![git-model](./images/git-model.png)

> The one exception to the rule here is that, when a `release` branch currently exists, the hotfix changes need to be merged into that `release` branch, instead of `develop`. Back-merging the bug fix into the `release` branch will eventually result in the bug fix being merged into `develop` too, when the `release` branch is finished

#### Key Benefits
* __Parallel Development__
    
    One of the great things about GitFlow is that it makes parallel development very easy, by isolating new development from finished work. New development (such as features and non-emergency bug fixes) is done in feature branches, and is only merged back into main body of code when the developer(s) is happy that the code is ready for release.

    Although interruptions are a BadThing(tm), if you are asked to switch from one task to another, all you need to do is commit your changes and then create a new feature branch for your new task. When that task is done, just checkout your original feature branch and you can continue where you left off.

* __Collaboration__

    Feature branches also make it easier for two or more developers to collaborate on the same feature.

* __Release Staging Area__

    As new development is completed, it gets merged back into the develop branch, which is a staging area for all completed features that haven’t yet been released. So when the next release is branched off of develop, it will automatically contain all of the new stuff that has been finished.

* __Support For Emergency Fixes__

    GitFlow supports hotfix branches — branches made from a tagged release. You can use these to make an emergency change, safe in the knowledge that the hotfix will only contain your emergency fix.

#### [Read More about GitFlow](https://nvie.com/posts/a-successful-git-branching-model/)

## Release and Branching Strategies

