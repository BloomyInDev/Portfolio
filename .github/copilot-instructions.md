# Copilot Instructions

You must use Conventional Commits for commit message generation. Follow the format:

<type>(optional scope): <description>

### Types

- Changes relevant to the API or UI:
    - `feat` Commits that add, adjust or remove a new feature to the API or UI
    - `fix` Commits that fix an API or UI bug of a preceded `feat` commit
- `refactor` Commits that rewrite or restructure code without altering API or UI behavior
    - `perf` Commits are special type of `refactor` commits that specifically improve performance
- `style` Commits that address code style (e.g., white-space, formatting, missing semi-colons) and do not affect application behavior
- `test` Commits that add missing tests or correct existing ones
- `docs` Commits that exclusively affect documentation
- `build` Commits that affect build-related components such as build tools, dependencies, project version, CI/CD pipelines, ...
- `ops` Commits that affect operational components like infrastructure, deployment, backup, recovery procedures, ...
- `chore` Miscellaneous commits e.g. modifying `.gitignore`, ...

### Examples:

- ```
  feat: add email notifications on new direct messages
  ```
- ```
  feat(shopping cart): add the amazing button
  ```
- ```
  feat!: remove ticket list endpoint

  refers to JIRA-1337

  BREAKING CHANGE: ticket endpoints no longer supports list all entities.
  ```

- ```
  fix(shopping-cart): prevent order an empty shopping cart
  ```
- ```
  fix(api): fix wrong calculation of request body checksum
  ```
- ```
  fix: add missing parameter to service call

  The error occurred due to <reasons>.
  ```

- ```
  perf: decrease memory footprint for determine unique visitors by using HyperLogLog
  ```
- ```
  build: update dependencies
  ```
- ```
  build(release): bump version to 1.0.0
  ```
- ```
  refactor: implement fibonacci number calculation as recursion
  ```
- ```
  style: remove empty line
  ```
