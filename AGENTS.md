# Agent Instructions

## Project Goal

Build a modern, advanced, professional web platform for a university innovation marketplace.

The platform must be highly responsive, mobile-first, cleanly coded, easy to maintain, scalable, and suitable for real-world production use.

The main priority is to build a smooth experience for all device sizes, especially mobile users.

---

## Core Development Rules

* Build with a mobile-first mindset.
* Every section, component, layout, card, form, modal, table, and navigation area must work perfectly on small screens first.
* Do not design only for desktop and then shrink it.
* Start from mobile layout, then improve for tablet, laptop, and desktop.
* Keep the codebase clean, modular, reusable, and easy to understand.
* Avoid messy, duplicated, or hard-coded code.
* Use reusable components wherever possible.
* Keep business logic separate from UI components.
* Use clear file names, clear function names, and simple structure.
* Do not create unnecessary files, components, or complex abstractions.
* Build only what is required, but build it properly.

---

## Responsiveness Requirements

The website must work smoothly on:

* Small mobile screens
* Large mobile screens
* Tablets
* Small laptops
* Large desktop screens
* Ultra-wide screens

All layouts must be tested mentally and visually for these screen sizes:

* 320px
* 375px
* 430px
* 768px
* 1024px
* 1280px
* 1440px
* 1920px

No horizontal scrolling should happen unless it is intentionally designed for a carousel or scrollable component.

Text, buttons, cards, inputs, images, and spacing must adjust naturally across devices.

---

## Mobile-First Rules

For mobile screens:

* Use single-column layouts by default.
* Use large, touch-friendly buttons.
* Avoid tiny text, tiny icons, and small clickable areas.
* Keep important actions easy to reach.
* Keep content short and scannable.
* Use collapsible sections where needed.
* Use drawers or bottom sheets for filters, menus, and secondary actions.
* Avoid wide tables on mobile. Convert tables into cards or stacked rows.
* Forms must be broken into clear, simple sections.
* Modals must fit small screens properly.
* Navigation must be simple and easy to use with one hand.
* Cards must not feel crowded.
* Images must scale correctly and not break the layout.
* Buttons must not overflow.
* Long titles and descriptions must wrap correctly.

---

## Tablet and Desktop Rules

For tablet and desktop screens:

* Use multi-column layouts only when there is enough space.
* Use wider grids for cards and content.
* Keep good spacing and visual balance.
* Do not stretch content too wide.
* Use max-width containers for readability.
* Keep actions visible and easy to find.
* Use desktop space to improve clarity, not to add unnecessary clutter.

---

## Layout Quality Requirements

All UI must feel modern, premium, and professional.

The design must feel like a real startup marketplace, not a basic student project website.

Use:

* Clean layouts
* Strong spacing
* Smooth alignment
* Balanced sections
* Modern cards
* Professional empty states
* Clear loading states
* Clear error states
* Smooth hover states
* Smooth focus states
* Subtle animations where useful
* Consistent component behavior

Do not create a boring static layout.

The interface should feel polished, trustworthy, and production-ready.

---

## Component Rules

Create reusable components for common UI patterns.

Examples of reusable component types:

* Buttons
* Cards
* Badges
* Inputs
* Textareas
* Select fields
* Modals
* Drawers
* Tabs
* Accordions
* Forms
* Empty states
* Loading skeletons
* Project cards
* User cards
* Status labels
* Search bars
* Filter panels
* Navigation elements

Each component must be:

* Reusable
* Responsive
* Accessible
* Easy to update
* Clearly named
* Not overloaded with too many responsibilities

If a component becomes too large, split it into smaller components.

---

## Clean Folder Structure Rules

Use a clean and scalable folder structure.

Recommended structure:

```txt
src/
  app/
  components/
    ui/
    layout/
    shared/
    features/
  features/
  lib/
  hooks/
  utils/
  constants/
  types/
  services/
  data/
  styles/
```

Folder purpose:

```txt
app/          Route-level pages and layouts
components/   Reusable UI and layout components
components/ui/   Base UI components
components/layout/   Header, footer, navigation, page shells
components/shared/   Shared reusable blocks
components/features/   Feature-specific UI blocks
features/     Feature logic grouped by domain
lib/          App configuration, helpers, clients
hooks/        Reusable React hooks
utils/        Pure utility functions
constants/    Static values and options
types/        TypeScript types and interfaces
services/     API calls and external service logic
data/         Temporary mock data or static seed data
styles/       Global styles only
```

Do not place everything inside one large components folder without organization.

Do not mix unrelated code in the same file.

---

## Code Quality Rules

* Use TypeScript properly.
* Avoid using `any` unless absolutely necessary.
* Keep components small and focused.
* Use clear props.
* Avoid deeply nested JSX where possible.
* Avoid repeated class names by creating reusable components.
* Avoid magic strings and magic numbers.
* Move repeated values into constants.
* Keep API logic outside UI components.
* Keep validation logic reusable.
* Remove unused imports, variables, and files.
* Keep code readable for another developer.

Every file should have a clear purpose.

---

## Naming Rules

Use clear and meaningful names.

Good examples:

```txt
ProjectCard
UserTypeSelector
ResponsiveContainer
ContactRequestForm
VerificationBadge
ProjectStatusBadge
MobileFilterDrawer
```

Avoid unclear names:

```txt
Box1
NewCard
TestComp
FinalSection
Temp
MainThing
```

Use consistent naming across files, components, functions, and variables.

---

## Accessibility Rules

The website must be accessible and easy to use.

Requirements:

* Use semantic HTML where possible.
* Buttons must be real buttons.
* Links must be real links.
* Inputs must have labels.
* Interactive elements must have focus states.
* Keyboard navigation must work.
* Use proper alt text for meaningful images.
* Do not rely only on color to show meaning.
* Keep good contrast.
* Use readable spacing and sizes.
* Modals and drawers must be usable with keyboard.

Accessibility is not optional.

---

## Performance Rules

The website must feel fast and smooth.

Requirements:

* Optimize images.
* Use lazy loading where suitable.
* Avoid unnecessary large libraries.
* Avoid unnecessary client-side rendering.
* Use server components where suitable.
* Use loading skeletons for async content.
* Avoid heavy animations.
* Avoid blocking the main thread.
* Keep bundle size reasonable.
* Do not fetch the same data repeatedly.
* Use pagination or infinite loading for large lists.

The site must work well even on normal mobile connections.

---

## Image and Media Rules

* Images must be responsive.
* Images must not break layout.
* Use proper aspect ratios.
* Use optimized image components where available.
* Use placeholder states while images load.
* Avoid huge uncompressed images.
* Project thumbnails must crop nicely across screen sizes.
* Demo previews must not overflow mobile screens.

---

## Form Rules

Forms must be clean and easy to complete.

Requirements:

* Use clear labels.
* Show helpful error messages.
* Validate required fields.
* Do not make forms feel overwhelming.
* Use step-by-step form sections if the form is long.
* Save progress where useful.
* Use mobile-friendly inputs.
* Use clear submit and cancel actions.
* Prevent double submission.
* Show loading state after submit.
* Show success and error feedback clearly.

---

## Navigation Rules

Navigation must be simple and responsive.

Mobile navigation:

* Use a clean mobile menu, drawer, or bottom navigation.
* Keep primary actions easy to reach.
* Avoid too many links.
* Make tap targets large enough.

Desktop navigation:

* Use clean horizontal navigation.
* Keep important actions visible.
* Use clear CTA buttons.
* Avoid clutter.

Navigation must never hide the main purpose of the platform.

---

## State Handling Rules

Every user action must have clear feedback.

Include states for:

* Loading
* Empty data
* Error
* Success
* Disabled
* Pending
* Approved
* Rejected
* Draft
* Published

Do not leave users confused after clicking something.

---

## Trust and Safety Rules

The platform must feel safe and trusted.

Do not publicly show private contact details unless explicitly required.

Private user data must be protected.

Important project files must be treated carefully.

Use clear status indicators for:

* Verified student
* Verified company
* Reviewed project
* Private files available
* Demo available
* Open for collaboration
* Open for investment
* Available for licensing
* Available for acquisition

Badges must be visually clear but not distracting.

---

## Marketplace UX Rules

The platform has two main user groups:

* Students
* Companies / investors / collaborators

The UI must support both groups clearly.

Do not make the website feel only student-focused.

Do not make the website feel only company-focused.

The interface must make both users understand their path quickly.

Actions must be clear:

* Students should understand how to publish and manage projects.
* Companies should understand how to discover and request access.
* Both sides should feel protected and guided.

---

## Admin and Moderation Rules

Admin-related code must be planned cleanly.

Admin features should be separated from public user features.

Admin actions must be clear and safe.

Important admin actions should have confirmation before execution.

Use clear statuses for review and moderation.

Do not mix admin UI with public UI in a messy way.

---

## Error Handling Rules

Handle errors properly.

Do not show raw technical errors to users.

Show simple messages like:

* Something went wrong. Please try again.
* This field is required.
* You do not have permission to access this.
* This project is not available right now.
* Upload failed. Please check the file and try again.

Log technical errors in a developer-friendly way.

---

## Security Rules

Follow basic security best practices.

Requirements:

* Validate all user inputs.
* Protect private routes.
* Protect admin routes.
* Do not trust client-side data.
* Check user permissions on the server.
* Avoid exposing private files publicly.
* Avoid exposing API secrets.
* Use environment variables for secrets.
* Sanitize user-generated content.
* Protect against spam and abuse.
* Add rate limiting where needed.
* Do not store sensitive payment data directly.

Security must be considered from the start.

---

## Data and API Rules

Keep data handling clean.

* Use typed API responses.
* Keep API functions reusable.
* Keep database logic separate from UI.
* Use proper error handling.
* Do not duplicate API logic in many components.
* Use clear loading and error states.
* Use pagination for large data.
* Use filtering and search in a scalable way.

---

## Scalability Rules

Build the project so it can grow later.

The first version should be simple, but the structure must support future features.

Future features may include:

* Private access requests
* Internal messaging
* Project verification
* Company verification
* Deal rooms
* Payments
* University dashboards
* Advanced search
* Saved projects
* Notifications
* Analytics

Do not overbuild now, but do not create a messy structure that blocks future growth.

---

## Quality Check Before Finishing Any Feature

Before marking any feature as complete, check:

* Does it work on mobile?
* Does it work on tablet?
* Does it work on desktop?
* Does it have loading states?
* Does it have error states?
* Does it have empty states?
* Are buttons easy to tap?
* Is the layout clean?
* Is the code reusable?
* Is the file structure clean?
* Are private data and routes protected?
* Is there any duplicated code?
* Is the feature easy to maintain?

If any answer is no, improve it before finishing.

---

## Final Build Standard

The final result must feel like a premium, modern, production-ready marketplace platform.

It must be:

* Mobile-first
* Fully responsive
* Cleanly coded
* Easy to maintain
* Fast
* Accessible
* Secure
* Scalable
* Professional
* Trustworthy
* Modern

Do not deliver a basic or unfinished-looking UI.

Do not deliver desktop-only layouts.

Do not deliver messy code.

Do not deliver components that work only for one screen size.

Build everything with real users, real devices, and future growth in mind.

