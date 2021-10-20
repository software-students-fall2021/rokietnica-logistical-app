# Contributing

## Team Norms

### Standups

Monday    3:15-3:30pm <br>
Wednesday 3:15-3:30pm <br>
Friday    3:15-3:30pm <br>

Team members will make their best effort to attend these meetings.

### Sprint cadence
Sprints will be 2 weeks long.

### Coding standards
Visual Studio Code is the designated code editor. <br>
Prettier is the designated code linter. 


## Git Workflow
The Git workflow that the team follows:
* Fetch and pull from main branch
* Create feature branch for developing a new feature
* Commit and push to feature branch while developing
* Once feature is complete, create pull request into main branch
* Have others review pull request and approve it
* Merge pull request into main branch
* Rinse and repeat!


## Local Development Environment Setup:
*MacOS Instructions*
* Download Visual Studio Code and the Prettier extension.
* Ensure that `npm` and `node` version 14 is installed and used.
* If you are having EACCES permissions errors when installing `npm` globally, uninstall `npm` by running
  `sudo npm uninstall npm -g`, then complete the following steps:
* Run `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash` to install `nvm`.
* Run `nvm install 14`, then `nvm use 14`. This will install and use the version of `node` that we'll be developing on. 
* Run `nvm install-latest-npm` to install `npm`, which is the node package manager.
* Clone this repository, create a branch to work on and you're ready to go! Please follow the Git workflow listed above :)

## How to Build and Test
Coming soon!
