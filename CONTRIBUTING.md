# Contributing to jousting

## Thoughts on Style
Please follow the guidelines set out in the [Airbnb JavaScript ES5 Style Guide](https://github.com/airbnb/javascript/tree/master/es5).

Some examples of style rules to adhere to include, but are not limited to:
* use single quotes `''` for strings
* assign variables at the top of their scope
* use braces with all multi-line blocks (if-else statements)
* use soft tabs set to 2 spaces
* place 1 space before the leading brace of a function body
* place 1 space before the opening parenthesis in control statements (if, while etc.)
* place no space before the argument list in function calls and declarations
* end files with a single newline character
* leave a blank line after blocks and before the next statement
* use semicolons where appropriate

## Git Forking Workflow
***
The Forking Workflow gives every developer working on the project a server-side repository, so that each contributor has not one, but two Git repositories: a private local one and a public server-side one. Developers push to their own server-side repositories, and only the project maintainer (i.e. scrum master) can push to the official repository.

### How It Works
The Forking Workflow begins with an official public repository stored on a server (GitHub). When a developer wants to start working on the project, they do not directly clone the official repository. Instead, they fork the official repository to create a copy of it on the server. This new copy serves as their personal public repository. After they have created their server-side copy, the developer performs a `git clone` to get a copy of it onto their local machine. This serves as their private development environment.

When they are ready to publish a local commit, they push the commit to their own public repository — not the official one. Then, they file a pull request with the official repository, which lets the project maintainer know that an update is ready to be integrated.

To integrate the feature into the official codebase, the maintainer pulls the contributor’s changes into their local repository, checks to make sure it doesn’t break the project, then merges the contributor's changes into the official repository. The contribution is now part of the project, and other developers should pull from the official repository to synchronize their local repositories.

### Example
#### The scrum master initializes the official repository
The official repository exists [here](https://github.com/RickyAndTheWalkers/jousting.git).

#### Developers fork the official repository
At the link above, click the *Fork* button in the upper right-hand corner. After this step, every developer has their own server-side repository.

#### Developers clone their forked repositories
Each developer needs to clone their own public repository. They can do the familiar `git clone` command in the terminal using, for example:

```shell
  git clone https://github.com/<username>/jousting.git
```

The Forking Workflow requires two remotes - one for the official repository, and one for the developer's personal server-side repository. Use `origin` as the name of the remote for your forked repository (this is automatically creates when you run 'git clone') and `upstream` for the official repository.

```shell
  git remote add upstream https://github.com/RickyAndTheWalkers/jousting.git
```

You'll need to create the upstream remote yourself using the above command. This will let you easily keep your local repository up-to-date as the official project progresses.

#### Developers work on their features
In the local repositories that they cloned, developers can edit code, commit changes, and create branches.

```shell
  git checkout -b <feature-branch-name> (see below for branch naming conventions)
  # Edit some code
  git add
  git commit -m <commit-message>
```

All of their changes will be private until they push it to their public repository. And, if the official project has moved forward, they can access new commits with `git pull --rebase`:

```shell
  git pull --rebase upstream dev
```

#### Developers publish their features
Once a developer is ready to share their new feature, they need to do two things. First, they have to make their contribution accessible to other developers by pushing it to their public repository. Their origin remote should already be set up, so all they should have to do is the following:

```shell
  git push origin <feature-branch-name>
```

Second, they need to notify the scrum master that they want to merge their feature into the official codebase. Typically, you’ll want to integrate your feature branch into the upstream remote’s dev branch.

#### The scrum master integrates their features
When the scrum master receives the pull request, his job is to decide whether or not to integrate it into the official codebase. To do this, he (or a developer he delegates the task to) will pull the code into their local repository. The scrum master needs to `fetch` the feature branch from the developer's server-side repository into his own local repository after checking out a review branch for the specific review in question.

```shell
  git fetch https://github.com/user/repo <feature-branch-name>
```

If he finds problems with the developer's changes, the scrum master will comment on the developer's pull request regarding what problems exist. Then the developer can make further changes to resolve the problems and perform another `git add` and `git commit`.

When no problems exist in the changes, the scrum master can merge those changes with the dev branch of the official repository. When he feels that the code is suitable for publication, he will merge the official dev branch with the official master branch.

#### Developers synchronize with the official repository
Since the main codebase has moved forward, other developers should synchronize with the official repository:

```shell
  git pull --rebase upstream dev
```

### Example Workflow

In local branch `dev`:

```shell
  git pull --rebase upstream dev
  git checkout -b <feature-branch-name>
  # Make changes
  git add <file-name>
  git commit -m <commit-message-header>
  git push origin <feature-branch-name>
  # Submit pull request to official respository *dev* branch
  # Include commit message **body** (See below)
  # Once change has been accepted:
  git pull --rebase upstream dev
```

## Submission Guidelines
***

### Naming Branches
Branches should be named using slash notation, with the type of change coming before the slash, and the specific change coming after the slash. If the portion coming after the slash is more than one word, combine words with hyphens, as seen in the example below.

> type/subject

> e.g. feature/login-button

#### Type
Must be one of the following:
* **feature**: A new feature
* **fix**: A bug fix
* **doc**: Documentation changes only
* **style**: Changes that do not affect the meaning of the code (e.g. white-space, formatting, missing semi-colons, etc.)
* **refactor**: A change that neither fixes a bug nore adds a feature
* **performance**: A change that improves performance
* **test**: Adds missing tests
* **chore**: Changes to build process or auxiliary tools and libraries such as documentation generation


### Submitting a Pull Request
* Make your changes in a new git branch

```shell
  git checkout -b <feature-branch>
```

* Add your changes

```shell
  git add <file-name>
```

* Commit your changes using a descriptive commit message

```shell
  git commit -m <commit-message>
```

* In GitHub, send a pull request to 'RickyAndTheWalkers:dev'.

* If the scrum master suggests changes, then:
  * Make the required updates
  * Add the changes
  * Commit the changes

### Git Commit Guidelines
The **header** of the commit message must include a **type** and a **subject**.

> (type) subject

> e.g. (feature) add login button

Please also include a **body**.

#### Type
Must be one of the following:
* **feature**: A new feature
* **fix**: A bug fix
* **doc**: Documentation changes only
* **style**: Changes that do not affect the meaning of the code (e.g. white-space, formatting, missing semi-colons, etc.)
* **refactor**: A change that neither fixes a bug nore adds a feature
* **performance**: A change that improves performance
* **test**: Adds missing tests
* **chore**: Changes to build process or auxiliary tools and libraries such as documentation generation

#### Subject
The subject contains a succinct description of the change:
* use the present tense, reffering to the current state: "changes", not "changed" not "change"
* do not capitalize the first letter
* do not include a dot/period(.) at the end

#### Body
Just as in the **subject**, use the present tense. The body should include *the motivation for the change* and *contrast this with previous behavior*.

#####Special Thanks
Thanks to [Matthew Murkidjanian](https://github.com/mmurkidjanian) for the contributing guide.
