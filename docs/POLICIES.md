# POLICIES.md

In this document you'll find all the policies to all the repositories of DIS organization.

### 1. Access Control

**Objective:** Restrict and manage who can view, modify, or administrate repositories to protect intellectual property and maintain workflow integrity.

**Guidelines:**

- **Role-Based Permissions:**  
  - Define clear roles such as Owner, Admin, Developer, and Read-Only.  
  - Use GitHub’s team structure to assign repositories to teams with pre-defined permissions.  
  - Regularly review and audit team memberships.

- **Repository Creation:**  
  - Limit repository creation to a select group of administrators to prevent sprawl and misconfiguration.  
  - Use organizational policies to set default access permissions (e.g., private or internal) for new repositories.

- **Access Reviews:**  
  - Implement scheduled audits or automated scripts that notify owners when a user’s access level remains too permissive for an extended period.  
  - Maintain a log or audit trail for access changes to track modifications over time.

- **External Collaborators:**  
  - Set strict guidelines for when and how external contributors are invited.  
  - Use time-bound or scoped access for contractors and third-party collaborators.

---

### 2. Naming

**Objective:** Establish a clear and consistent naming convention to facilitate discoverability, clarity, and maintainability across the organization’s digital assets.

**Guidelines:**

- **Repository Names:**  
  - Use a structured format that reflects the project type. For example:  
    - For game engines: `GameName-Engine` (e.g., `GalaxyQuest-Unity` or `Arcadia-UE4`)  
    - For auxiliary projects: `Project-Feature` (e.g., `AI-Pathfinding`).
  - Avoid ambiguous abbreviations; clarity is preferred over brevity.

- **Branch Naming:**  
  - Use standard prefixes such as `feature/`, `bugfix/`, `hotfix/` so branches are immediately identifiable.  
  - Incorporate issue numbers when applicable (e.g., `feature/123-add-new-character`).

- **Tags and Releases:**  
  - Adopt semantic versioning (e.g., `v1.0.0`) to clearly indicate releases.  
  - Ensure that tag names are in a consistent format to simplify searches and automation.

---

### 3. Branch Protection Rules

**Objective:** Ensure code integrity on critical branches by enforcing review processes, testing, and other quality checks.

**Guidelines:**

- **Protected Branch Setup:**  
  - Identify primary branches such as `main`, `master`, or `release` for strict protection.  
  - Disallow direct commits; require all contributions via pull requests.

- **Pull Request Requirements:**  
  - Mandate that each pull request has at least one or two peer reviews before merging.  
  - Require that all CI/CD checks (e.g., tests, linters, builds) pass before the pull request can be merged.
  - Enforce a rule that pull requests must not be merged if there are unresolved merge conflicts or outdated base branches.

- **Commit Standards:**  
  - Require commit signing on sensitive branches to ensure authenticity.  
  - Encourage detailed commit messages that reference specific issues or tasks.

- **Additional Safeguards:**  
  - Consider automatic branch backup or snapshot tools before applying major changes.  
  - Implement automated alerts for unusual branch activity to preempt potential security breaches.

---

### 4. Repository Deletion and Transfer

**Objective:** Prevent accidental loss or unauthorized movement of repositories by imposing strict controls on deletion or transfer operations.

**Guidelines:**

- **Permission Restrictions:**  
  - Allow repository deletion and transfer actions only for organization administrators.  
  - Use role-based policies that restrict these actions from being performed by developers or other lower-level access groups.

- **Deletion Procedures:**  
  - Require a formal review process before deletion; for example, a ticket or a documented approval process from at least one admin and one project lead.
  - Maintain an archival process: Before deletion, ensure that the repository is archived and associated data (e.g., issues, pull requests, commit history) is backed up.

- **Transfer Protocols:**  
  - When transferring repositories between organizations or owners, require a formal approval process and clear documentation of the transfer rationale.
  - Notify all stakeholders of the impending transfer and ensure that access configurations are synchronized post-transfer.

---

### 5. Code Quality and CI/CD

**Objective:** Maintain high standards for code quality and streamline the build-deploy-feedback cycle with robust CI/CD practices.

**Guidelines:**

- **Automated Testing:**  
  - Enforce that all new code contributions come with unit and integration tests.  
  - Configure CI pipelines (e.g., GitHub Actions, Jenkins, Travis CI) to run tests automatically on every pull request.

- **Static Analysis and Linting:**  
  - Integrate automated linters, code formatters, and static analysis tools to catch common issues before code review.
  - Prevent merging if quality checks fall below a predefined threshold.

- **Continuous Integration Pipelines:**  
  - Standardize build scripts and CI configurations across projects to promote consistency.  
  - Use the CI system to compile, run tests, and deploy preview builds for faster feedback loops.

- **Code Review Standards:**  
  - Create a checklist for reviewers that includes code quality, architecture, performance, security, and compliance considerations.  
  - Use automated peer review bots to help enforce certain style guidelines.

- **Knowledge Sharing:**  
  - Maintain a shared repository or documentation page that contains best practices for writing tests, using CI/CD, and code review procedures.

---

### 6. Documentation and Metadata

**Objective:** Ensure that every repository is self-descriptive, easy to onboard new contributors, and maintained with up-to-date information.

**Guidelines:**

- **Mandatory Files:**  
  - **README.md:**  
    - Provide an overview of the project, installation instructions, usage examples, and any special requirements (e.g., game engine specifics).  
    - Include badges (build, license, version) where applicable to quickly convey the repository status.
  - **CONTRIBUTING.md:**  
    - Offer guidelines on how to contribute, including coding standards, pull request processes, and branch strategies.
  - **LICENSE:**  
    - Clearly state the licensing information for the project to define usage rights and obligations.

- **Metadata Standards:**  
  - Enforce the addition of topics and tags in GitHub to improve repository searchability (e.g., `game-development`, `Unity`, `Unreal`, etc.).
  - Add a `CHANGELOG.md` for tracking version changes and release notes in a structured format.
  - Keep additional documentation files (e.g., `INSTALL.md`, `ARCHITECTURE.md`) up to date, especially when significant changes to the project occur.

- **Review and Maintenance:**  
  - Set a policy to review and update documentation at dedicated intervals or as part of sprint retrospectives.  
  - Encourage contributors to update documentation when submitting pull requests that impact public interfaces or functionality.
