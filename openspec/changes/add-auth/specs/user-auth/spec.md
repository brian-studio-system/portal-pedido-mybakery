# Spec Delta

## Purpose

Identifica a clientes y administradores sin contraseñas, mantiene la sesión y
protege los datos y rutas según el rol.

## ADDED Requirements

### Requirement: Magic link sign-in

The system SHALL authenticate a user by sending a one-time sign-in link to the
email they submit and completing the session when that link is opened.

#### Scenario: Valid email requests a link

- **WHEN** a visitor submits a valid email on `/login`
- **THEN** the system sends a magic link and shows a confirmation message

#### Scenario: Invalid email is rejected

- **WHEN** a visitor submits an empty or malformed email
- **THEN** the form shows a validation error and no link is sent

#### Scenario: Link completes the session

- **WHEN** the user opens a valid magic link
- **THEN** the system creates a session and redirects to `/cuenta`

#### Scenario: Invalid or expired link fails safely

- **WHEN** the user opens an expired or invalid link
- **THEN** the system shows an error and offers to request a new link

### Requirement: Session persistence

The system SHALL keep the authenticated session across page reloads and clear it
when the user signs out.

#### Scenario: Reload keeps the session

- **WHEN** an authenticated user reloads a protected page
- **THEN** the page loads without asking for the email again

#### Scenario: Sign out clears the session

- **WHEN** the user chooses "Cerrar sesión"
- **THEN** the session is cleared and protected routes redirect to `/login`

### Requirement: Profile and role assignment

The system SHALL create exactly one profile per authenticated user with an email
and a role of `user` by default. The role SHALL be one of `user` or `admin`.

#### Scenario: Profile created on first sign-in

- **WHEN** a user signs in for the first time
- **THEN** a profile is created with their email and role `user`

#### Scenario: A user cannot promote themselves

- **WHEN** a `user` attempts to change their own role to `admin`
- **THEN** the change is rejected and the role remains `user`

### Requirement: Route protection

The system SHALL require a session for `/cuenta` and the `admin` role for
`/admin`.

#### Scenario: Anonymous user is redirected

- **WHEN** an anonymous visitor opens `/cuenta`
- **THEN** the system redirects to `/login` and preserves the intended path

#### Scenario: Non-admin cannot enter admin

- **WHEN** a `user` opens `/admin`
- **THEN** the system denies access without revealing admin data

#### Scenario: Admin enters admin

- **WHEN** an `admin` opens `/admin`
- **THEN** the admin panel is rendered

### Requirement: Profile row-level security

The system SHALL allow a user to read and update only their own profile and SHALL
allow an admin to read all profiles.

#### Scenario: User reads own profile

- **WHEN** an authenticated user queries their own profile
- **THEN** the row is returned

#### Scenario: User cannot read another profile

- **WHEN** an authenticated user queries another user's profile
- **THEN** no row is returned

#### Scenario: Admin reads all profiles

- **WHEN** an admin queries profiles
- **THEN** all profiles are returned

### Requirement: Admin bootstrap

The system SHALL provide a server-side, documented procedure to promote an
existing user to `admin`; the promotion SHALL NOT be callable from the browser.

#### Scenario: Documented promotion works

- **WHEN** an operator runs the documented server-side promotion for a user
- **THEN** that user's role becomes `admin`

#### Scenario: Client cannot promote

- **WHEN** a browser client attempts to set a role to `admin` through the public
  API
- **THEN** the operation is rejected
