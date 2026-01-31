# CLAUDE.md
## Project Context
RooferHQ is a Market Intelligence and Lead Engineering platform exclusively serving the commercial roofing industry, helping users accomplish lead generation and market monitoring tasks.

## Tech Stack
- Framework: Next.js 16
- Language: TypeScript
- Database: TBD/Planning
- Styling: Tailwind CSS
- Animation: Framer Motion
- Icons: Lucide React

## Key Directories
- app/problem — Webhook trigger phase of workflow
- app/solution — Search/Qualification phase
- app/verify — Update/Notification phase
- components — Reusable React components
- scripts — Build and utility scripts
- public — Static assets and images
- .agent — Agent skills and configuration (DO NOT EDIT)

## Commands
- `npm run dev` — Start dev server
- `npm run build` — Build for production
- `npm start` — Start production server
- `npm run lint` — Run linter

---

## How I Want You to Work

### Before Coding
- Ask clarifying questions before starting
- Draft a plan for complex work and confirm before coding
- If unsure, ask — don't assume

### While Coding
- Write complete, working code — no placeholders, no TODOs
- Keep it simple and readable over clever
- Follow existing patterns in the codebase
- One change at a time, verify as you go

### After Coding
- Run tests to verify your changes work
- Run linter/formatter before finishing
- Summarize what you changed and why

---

## Code Style
- Use ES modules (import/export)
- Functional components with hooks (React)
- Type hints on all functions
- Descriptive variable names
- No commented-out code

## Do Not
- Edit files in .agent folder
- Commit directly to main
- Leave placeholder code or TODOs
- Make changes outside the scope of the task
- Assume — ask if unclear

---

## Verification Loop
After completing a task, verify:
1. Code compiles without errors
2. Tests pass (when implemented)
3. No linting warnings
4. Changes match the original request

If any fail, fix before marking complete.

---

## Quick Commands
When I type these shortcuts, do the following:

**"plan"** — Analyze the task, draft an approach, ask clarifying questions, don't write code yet

**"build"** — Implement the plan, run tests, verify it works

**"check"** — Review your changes like a skeptical senior dev. Check for bugs, edge cases, and code quality

**"verify"** — Run all tests and linting, summarize results

**"done"** — Summarize what changed, what was tested, and any notes for me

---

## Success Criteria
A task is complete when:
- [ ] Code works as requested
- [ ] Tests pass (when implemented)
- [ ] No errors or warnings
- [ ] Changes are minimal and focused
- [ ] I can understand what you did without explanation

---

## Notes
### Workflow Architecture
- Process-driven workflow: Webhook → Search/Qualification → Update/Notification
- Data flows sequentially through problem → solution → verify phases
- Each app subdirectory represents a step in the lead generation pipeline

### To Add Later
- Testing framework (Jest/Vitest recommended)
- Database integration
- API routes documentation
