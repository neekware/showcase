# Showcase

<!-- [![status-image]][status-link] -->

[![coverage-image]][coverage-link]

## Overview

This project is a showcase of profiles for political figures.

## Structure of the Project

The project has the following structure:

```text
├── README.md
├── apps # Directory for applications
│ └── web # Web application built using Next.js
| └── web-e2e # E2E tests for the web application
├── cfgs # tsconfig, jest, eslint, tailwind, ... etc.
├── libs # logger, ui, vendor, ... etc.
├── tools # Node.js scripts, infrastructure tools & utilities
│ └── infra # Utility scripts and tools

```

## Using the Project

To use this mono-repo project, please follow these steps:

First, prepare your development environment. You need to install Node version 18.0.0 or higher. Additionally, install `pnpm` globally by running the following commands:

```bash
npm install -g pnpm
```

Next, clone the mono-repo:

```bash
# Clone the repository (using HTTPS)
git clone https://github.com/neekware/showcase.git

# Change directory into the cloned repository
cd showcase

# Install dependencies
pnpm install
```

You can format all files of a specific type:

```bash
# Example: Format all .ts, .tsx, .json, .html, .css, .scss files
pnpm format
```

To run lint, build and test.

```bash
# lint all apps/packages
pnpm lint

# build all apps/packages
pnpm build

# test all apps/packages
pnpm test
```

To run code coverage, coveralls (note: ci/cd).

```bash
# run test with coverage for all apps/packages
pnpm coverage

# combine test coverage for all apps/packages
pnpm coveralls
```

To clean build,test,lint cache artifact.

```bash
# clean all lint, build, test, ...
pnpm clean

pnpm clean:arts # clean all artifacts e2e, coverage, ...

pnpm clean:mod # clean all node_modules

pnpm reset:all # clean all node_modules, artifacts, and reinstall packages
```

To execute long-running processes.

```bash
# run the apps in development (watch mode)
pnpm dev

# run the apps from the `build` artifacts (prod mode)
pnpm start
```

### To Install New Packages

To install new packages, you can use the following commands:

```bash
# Install an external dependency at the root/top-level in the main package.json
pnpm -w add <package-name>

# Install a external development dependency at the root/top-level in the main package.json
pnpm -w add -D <package-name>

# Install a dependency in a sub-package (lib/app) ONLY
# Example: pnpm workspace web add uuid
# (where "web" is the workspace and "uuid" is the external dependency)
pnpm add <package-name> --filter <workspace-name>
```

To execute end-to-end tests.

```bash
# run the e2e test (headless mode)
# Development server will be started automatically (pnpm run dev)
pnpm e2e

# run the e2e test (ui mode)
# Development server will be started automatically (pnpm run dev)
pnpm e2e -- --ui

# run the e2e test (headless mode) against the custom target URL
TARGET_URL=https://exmple.com; pnpm e2e

# run the e2e test (ui mode) against the custom target URL
TARGET_URL=https://exmple.com; pnpm e2e -- --ui
```

### Contribution

#### To contribute to the repository.

- Fork the repository on GitHub.
- Clone the repository locally.
- Set up your environment and install global dependencies.
- Install the recommended plugins (e.g., VSCode).
- Create a branch off of the `main` branch and call it `feature/<name>` or `bug/<name>`.
- Make modifications, fix bugs, and add new features.
- Write unit tests for your new logic.
- Format, lint, test, and build.
- Commit your changes to your own repository.
- `Issue your PR` (pull request) from your branch against the `dev` branch.
- Monitor your PR for further instructions and recommended fixes, if required.
- Sync your forked repository with the upstream showcase repository.
- Rinse and repeat.
- `Note:` Don't recycle bug/feature branches, just create new ones.

#### Branches pipeline / flow

```txt
bug/<name> ---+
feat/<name> --|--> (dev) --> (ci) --> (main) --> (deploy)
    ^                ^        ^         ^
    |                |        |         |
    |                |        |         |
Local Development    |        |         |
& Experimentation    |        |         |
                     |        |         |
                Pull Requests |         |
                from forks    |         |
                              |         |
                       Comprehensive    |
                       Testing and      |
                       Integration      |
                                        |
                                   Production
```

#### Community Guidelines

- There are no guarantees that all PRs will be accepted.
- Respect each other and be objective when raising PRs, making comments, etc.
- Enjoy contributing to the mono-repo.

## License

- Released under a ([MIT](https://raw.githubusercontent.com/neekware/showcase/main/LICENSE.md)) license.

## Version

X.Y.Z Semantic Versioning

    `MAJOR` version -- making incompatible API changes
    `MINOR` version -- adding functionality in a backwards-compatible manner
    `PATCH` version -- making backwards-compatible bug fixes

## Lines of Code (auto-generated stats)

```txt<br>--------------------------------------------------------------------------------
 Language             Files        Lines        Blank      Comment         Code
--------------------------------------------------------------------------------
 Typescript JSX          77         5439          538           10         4891
 TypeScript              91         3366          388          303         2675
 JSON                    88         1474            0            0         1474
 CSS                      6         1512          409           19         1084
 JavaScript              39          520           14           80          426
 Markdown                 4          340           99            0          241
 YAML                     3          217           24           19          174
 Plain Text               1          202           33            0          169
 SQL                      2           25            0            1           24
--------------------------------------------------------------------------------
 Total                  311        13095         1505          432        11158
--------------------------------------------------------------------------------
```

## Sponsors

[ [Neekware Inc.](http://neekware.com) ]

[status-image]: https://github.com/neekware/showcase/actions/workflows/main.yml/badge.svg
[status-link]: https://github.com/neekware/showcase/actions/workflows/main.yml
[version-image]: https://img.shields.io/npm/v/@showcase.svg
[version-link]: https://www.npmjs.com/settings/showcase/packages
[coverage-image]: https://coveralls.io/repos/neekware/showcase/badge.svg
[coverage-link]: https://coveralls.io/r/neekware/showcase
