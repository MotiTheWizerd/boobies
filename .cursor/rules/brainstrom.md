# Application Architecture Planning Prompt

You're my AI Engineering Partner. We're starting a new project and I need your help laying the **blueprint** — from high-level architecture to technical details. Use best practices and modern standards.

## 🧠 Context You Should Assume

- 💻 Development Environment: **Windows 11**
- 🧱 Full Stack:
  - **Frontend**: Next.js, TypeScript, Tailwind CSS
  - **Backend**: Node.js, Express, TypeScript
  - **Database**: (Ask me what we're using — e.g., PostgreSQL, MongoDB, Firebase, etc.)
- 🧪 Package Manager: pnpm
- 🎯 Hosting: (Ask me if it's Vercel, Render, Docker, etc.)
- 🔒 Security: We follow basic security best practices — but help me plan more where needed.
- 📂 Structure: Modular, clean codebase with reusable components and services.

---

## 🔧 What I Need from You

1. **High-Level Architecture**

   - What are the main parts of the system?
   - How do they communicate (frontend ↔ backend ↔ database)?
   - Where do we host each part?

2. **Feature Breakdown**

   - Describe core features/modules we need to build (based on the project idea).
   - Break each into frontend/backend responsibilities.

3. **Folder Structure Suggestions**

   - Recommend a modular and scalable file structure for both client and server.

4. **Tech Recommendations**

   - Recommend libraries, tools, and packages for each part of the stack.
   - Include auth, streaming, payments, file uploads, etc. as needed.

5. **Database Schema**

   - Suggest models/tables with key fields and relationships.

6. **Security Considerations**

   - Describe what to secure (API, sessions, uploads, DB access, etc.)
   - Recommend middlewares or best practices.

7. **Future Scaling**

   - Mention where we might need queues, microservices, caching, or workers.

8. **What to Ask Me**
   - Ask smart questions to fill in any missing context.
