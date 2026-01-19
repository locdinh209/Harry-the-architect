---
source: /articles/2026-01-19-four-pillars-persona-skills-rag-mcp.md
scheduled: null
status: draft
url: null
---

🧠 The 4 Pillars of Agent Context: Persona, Skills, RAG, MCP

"Should I put this in RAG, a Skill, or the Persona?"

This is the most common question I get about agent architecture.

The wrong answer leads to:
❌ Confused agents that hallucinate
❌ Slow agents burning tokens
❌ Brittle agents that break on updates
❌ Expensive agents costing too much

Here's the decision framework I use:

🎭 PERSONA → WHO the agent is (identity, tone, values)
📚 SKILL → HOW to do things (procedures, workflows)
📖 RAG → WHAT to know (facts, documents)
🔌 MCP → What ACTIONS to take (tools, APIs)

The priority order:
1. Persona First (always present)
2. Skill Second (loaded on demand)
3. RAG Third (retrieved at query time)
4. MCP Fourth (invoked when needed)

Read the full decision framework: [link]

#MultiAgentAI #LLMArchitecture #RAG #PromptEngineering #AIAgent
