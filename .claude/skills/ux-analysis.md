---
name: ux-analysis
description: World-class UI/UX design critique and analysis. Use this skill when analysing, critiquing, or evaluating UI designs, wireframes, mockups, or prototypes. Provides structured feedback using the CRISP framework (Contextual, Responsive, Intelligent, Seamless, Powerful), benchmarks against industry leaders (Stripe, Linear, Notion, Asana, Slack), and delivers actionable recommendations ranked by user impact. Triggers on design review requests, UI feedback, usability assessments, or quality audits.
---

# UX Analysis Skill

Analyse UI designs with the critical eye of a world-class product designer, focusing on creating the simplest, most intuitive user experience possible.

## Analysis Protocol

### Step 1: 30-Second Scan
Before detailed analysis, capture immediate impressions:
- **Strengths**: What works well at first glance
- **Red Flags**: Critical issues that would hurt user experience
- **Overall Grade**: A-F rating with brief justification

### Step 2: Structured Analysis

#### 1. First Impressions & Cognitive Load
- What's the immediate visual hierarchy?
- How much cognitive effort to understand the interface?
- Any elements creating confusion or friction?

#### 2. Information Architecture & Navigation
- Is the information structure logical and predictable?
- Can users understand where they are and how to navigate?
- Are navigation patterns consistent with mental models?

#### 3. Visual Design & Clarity
- Does visual design enhance or hinder usability?
- Appropriate use of whitespace, typography, colour?
- Are interactive elements clearly distinguishable?

#### 4. Interaction Design & Flow
- Are user flows optimised for efficiency?
- Do interactions feel natural and responsive?
- Any unnecessary steps or friction points?

#### 5. Accessibility & Inclusivity
- WCAG 2.1 Level AA compliance
- Colour contrasts, font sizes, touch targets appropriate?
- Inclusive of different contexts and devices?

### Step 3: CRISP Framework Evaluation

Rate each dimension and identify specific violations:

| Dimension | Question | Fail Indicators |
|-----------|----------|-----------------|
| **C - Contextual** | Can user tell what page they're on and its purpose within 5 seconds? | Dead-end empty states, missing breadcrumbs, unclear orientation |
| **R - Responsive** | Does UI update immediately on interaction? | Spinners, click-wait-update patterns, no hover feedback |
| **I - Intelligent** | Are we showing insights, not raw data? | Numbers without meaning, blank forms, no next-best-action |
| **S - Seamless** | Are we fitting into their day, not forcing them into ours? | Unnecessary logins, custom components that break habits |
| **P - Powerful** | Is complexity hidden appropriately? | Expert settings shown to novices, no keyboard shortcuts, no undo |

### Step 4: Benchmark Comparison

Compare against these exemplars:
- **Stripe**: Clean, trustworthy, progressive disclosure, excellent error handling
- **Linear**: Minimal, fast, keyboard-friendly, excellent micro-interactions
- **Notion**: Flexible, intuitive, powerful yet simple, great onboarding
- **Asana**: Task-focused, clear status indicators, seamless collaboration
- **Slack**: Clear hierarchy, efficient workflows, contextual design

### Step 5: Deliverables

Structure output as:

```markdown
## Immediate Feedback
[Grade] - [Justification]
Strengths: [List]
Red Flags: [List]

## Top 3 UX Issues (by user impact)
1. [Issue + CRISP violation + impact]
2. ...
3. ...

## Top 3 UI Improvements
1. [Improvement + rationale]
2. ...
3. ...

## Quick Wins (high-impact, low-effort)
- [List actionable items]

## Strategic Recommendations
- [How to elevate to world-class]
- [User research questions to validate]
- [Success metrics to track]
```

## Analysis Style Guidelines

- Be direct but constructive
- Focus on user outcomes, not personal preferences
- Provide specific, actionable feedback
- Reference design principles and best practices
- Consider business context and constraints
- Think like mentoring a junior designer

## Key Questions to Address

1. Would a new user succeed at their primary task without help?
2. Does this feel as polished as the best apps users know?
3. What would make this 10x better for users?
4. Are we solving the right problems in the right way?

## Painkiller Feedback Patterns

Use these when giving critique:

| If you see... | Say this... |
|---------------|-------------|
| Cluttered screen | "This fails P (Powerful). Expert settings shown to novice. What can be hidden?" |
| Generic 'Success' message | "This fails C (Context). 'Success' tells nothing. Tell user exactly what changed." |
| Spinning loader | "This fails R (Responsive). Why is user waiting? Make UI optimistic." |
| Blank form | "This fails I (Intelligent). We know this user. Why aren't we guessing intent?" |
| New portal/page | "This fails S (Seamless). Why isn't this an email approval? Don't make them log in." |