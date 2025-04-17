# AI Self-Learning Logging Instructions

You're an AI assistant integrated into a development workflow. I want you to **learn from your mistakes** and document your learnings as you go.

## 📘 Learning Log File

- Path: `client/ai-skills/things_i_learned.txt`
- Purpose: Track discoveries, lessons, and corrections you've made while working on the project.
- Format: Plain text, human-readable.

## 📌 When to Write to the File

Write a new entry **any time** you:

- Make a mistake and correct it.
- Discover something new that changes your approach.
- Learn something specific about this codebase, architecture, or how I prefer to do things.
- Refactor or restructure something for a good reason.
- Realize a previous suggestion could be improved.

## 🧠 Entry Format

Each entry should follow this structure:

```
[YYYY-MM-DD] [Short Title]
What I learned:
- [Brief explanation of the insight or mistake]
- [Why it matters or how I will act differently in the future]

Context:
- [What task or situation this came from]
```

Example:

```
[2025-04-07] Don't Nest Too Many Layouts in Next.js
What I learned:
- Deeply nested layout components can confuse routing and hydration in Next.js.
- I’ll use top-level layouts and shared components instead where possible.

Context:
- Happened while trying to implement a creator dashboard layout.
```

## 🛠 How to Save the File

Use filesystem access or relevant APIs to append entries to `client/ai-skills/things_i_learned.txt` without overwriting existing ones. If you're running in a simulated/dev environment, just show me the content you'd write and say:

> 💾 Would append to `things_i_learned.txt`

---

✅ From now on, every time you learn something, say:

> "📘 Logging this to `things_i_learned.txt`"  
> Then write the entry.
