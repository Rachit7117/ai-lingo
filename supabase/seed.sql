-- ============================================================
-- TRACKS
-- ============================================================
insert into public.tracks (id, slug, title, description, order_index, icon, color) values
  ('11111111-0000-0000-0000-000000000001', 'ai-foundations', 'AI Foundations', 'Master the core concepts that power all of artificial intelligence.', 1, '🧠', '#58CC02'),
  ('11111111-0000-0000-0000-000000000002', 'generative-ai', 'Generative AI', 'Understand how modern AI creates text, images, and more.', 2, '✨', '#1CB0F6'),
  ('11111111-0000-0000-0000-000000000003', 'ai-agents', 'AI Agents', 'Learn how autonomous AI agents reason, plan, and take actions.', 3, '🤖', '#FF9600');

-- ============================================================
-- LESSONS — Track 1: AI Foundations (7 lessons)
-- ============================================================
insert into public.lessons (id, track_id, slug, title, explanation, analogy, example, key_takeaway, order_index, xp_reward) values
(
  '22222222-0000-0000-0000-000000000001',
  '11111111-0000-0000-0000-000000000001',
  'what-is-ai',
  'What is AI?',
  'Artificial Intelligence (AI) is the field of computer science focused on building systems that can perform tasks that typically require human intelligence. These tasks include understanding language, recognizing images, making decisions, and solving problems. AI systems learn from data rather than being explicitly programmed with every rule.',
  'Think of AI like training a dog. You don''t program the dog with every possible command — you train it with examples and rewards until it learns the right behaviors on its own.',
  'When Netflix recommends a show you''ll love, that''s AI analyzing your watch history and comparing it to millions of other viewers to predict what you''ll enjoy.',
  'AI is not magic — it is pattern recognition at scale, powered by data and mathematics.',
  1, 15
),
(
  '22222222-0000-0000-0000-000000000002',
  '11111111-0000-0000-0000-000000000001',
  'machine-learning',
  'Machine Learning',
  'Machine Learning (ML) is a subset of AI where systems learn from data to improve their performance without being explicitly programmed. Instead of writing rules, you give the system examples, and it figures out the patterns itself. ML has three main types: supervised learning, unsupervised learning, and reinforcement learning.',
  'Imagine teaching a child to recognize cats without defining what a cat is. You just show them thousands of pictures saying "cat" or "not a cat." Eventually they learn the pattern. That''s machine learning.',
  'Spam filters use ML. They are trained on millions of emails labeled "spam" or "not spam" and learn to detect spam on their own — including new types they''ve never seen before.',
  'Machine learning flips traditional programming: instead of writing rules, you feed in data and let the system discover the rules itself.',
  2, 15
),
(
  '22222222-0000-0000-0000-000000000003',
  '11111111-0000-0000-0000-000000000001',
  'supervised-learning',
  'Supervised Learning',
  'Supervised learning is the most common type of ML. You train a model on labeled data — input-output pairs where the correct answer is already known. The model learns to map inputs to outputs. At inference time, it can predict outputs for new, unseen inputs. Common tasks include classification (what category?) and regression (what number?).',
  'It''s like learning with an answer key. A teacher gives you problems with the solutions already filled in. You study the pattern until you can solve new problems on your own.',
  'A model trained to detect tumors in X-rays learns from thousands of X-rays labeled "tumor" or "no tumor" by doctors. It learns visual patterns that correlate with tumors.',
  'Supervised learning needs labeled data — the more high-quality labeled examples you have, the better your model will perform.',
  3, 15
),
(
  '22222222-0000-0000-0000-000000000004',
  '11111111-0000-0000-0000-000000000001',
  'deep-learning',
  'Deep Learning',
  'Deep learning is a subset of ML that uses neural networks with many layers (hence "deep"). These layers progressively extract higher-level features from raw data. Deep learning has driven most of the dramatic AI breakthroughs since 2012 — in image recognition, speech, and language. It requires large amounts of data and compute, but achieves superhuman performance on many tasks.',
  'Deep learning is like peeling an onion. The first layer sees basic shapes. The next layer sees edges and corners. The next layer sees parts like eyes and noses. The final layer sees "this is a face." Each layer builds on the last.',
  'AlphaFold, the AI that solved protein structure prediction — a 50-year biology grand challenge — used deep learning. It learned patterns across millions of known protein structures to predict new ones.',
  'Deep learning''s power comes from composing many simple transformations into a complex function — letting the data determine what features matter.',
  4, 15
),
(
  '22222222-0000-0000-0000-000000000005',
  '11111111-0000-0000-0000-000000000001',
  'neural-networks',
  'Neural Networks',
  'Neural networks are computing systems loosely inspired by the human brain. They consist of layers of interconnected nodes (neurons). Each connection has a weight. During training, these weights are adjusted to minimize prediction errors via a process called backpropagation. The result is a function that maps inputs to outputs with remarkable accuracy on complex tasks.',
  'A neural network is like a committee of specialists. The first specialist looks at colors, another at shapes, another at textures. Their combined votes — weighted by how reliable each specialist is — produce a final decision.',
  'GPT-4 is a neural network with hundreds of billions of parameters (weights). Each parameter is a number that was adjusted during training on trillions of words of text.',
  'Neural networks are universal function approximators — given enough neurons and data, they can learn to approximate any function.',
  5, 15
),
(
  '22222222-0000-0000-0000-000000000006',
  '11111111-0000-0000-0000-000000000001',
  'large-language-models',
  'Large Language Models',
  'Large Language Models (LLMs) are a type of deep learning model trained on massive text datasets to predict the next token in a sequence. During training, they develop emergent capabilities: reasoning, coding, translation, and more — without being explicitly taught these skills. LLMs are the technology behind ChatGPT, Claude, Gemini, and similar AI assistants.',
  'An LLM is like someone who has read the entire internet. They didn''t study any specific skill — they just absorbed so much text that they absorbed all the patterns of human thought, language, and knowledge.',
  'When you ask ChatGPT to write code, it''s not executing a coding algorithm. It''s predicting, token by token, what a competent programmer would type next — because it has read billions of lines of code.',
  'LLMs are trained to predict text, but this simple objective, applied at massive scale, produces remarkably general intelligence.',
  6, 15
),
(
  '22222222-0000-0000-0000-000000000007',
  '11111111-0000-0000-0000-000000000001',
  'ai-ethics',
  'AI Ethics & Bias',
  'AI systems can perpetuate or amplify societal biases present in their training data. If a hiring model is trained on historical data where certain groups were underrepresented, it will discriminate against those groups. AI ethics is the field studying how to build AI that is fair, transparent, accountable, and beneficial. Key concerns include bias, hallucinations, privacy, and misuse.',
  'Training an AI on biased data is like teaching a child only using books written in one era. The child absorbs all the biases of that era and carries them forward, even as society changes.',
  'Amazon built an AI resume screener trained on historical hires (mostly male engineers). It learned to penalize resumes with the word "women''s" (e.g., women''s chess club) and was scrapped in 2018.',
  'AI amplifies what it is trained on — biased data produces biased models. Garbage in, garbage out, at scale.',
  7, 15
);

-- ============================================================
-- LESSONS — Track 2: Generative AI (7 lessons)
-- ============================================================
insert into public.lessons (id, track_id, slug, title, explanation, analogy, example, key_takeaway, order_index, xp_reward) values
(
  '22222222-0000-0000-0000-000000000008',
  '11111111-0000-0000-0000-000000000002',
  'tokens',
  'Tokens & Tokenization',
  'LLMs don''t process text as words or characters — they process tokens. A token is roughly 4 characters or 0.75 words. "Tokenization" is the process of splitting text into tokens before feeding it to a model. Tokens are the atomic unit of LLM processing. Context window limits (e.g., "128k context") refer to the maximum number of tokens the model can consider at once.',
  'Think of tokens like Scrabble tiles. You don''t read whole sentences at once — you break language into small, manageable pieces. Some tiles are common letters, some are whole words, depending on the language.',
  '"Hello, World!" tokenizes as: ["Hello", ",", " World", "!"]. The word "unbelievable" might tokenize as ["un", "believ", "able"] — 3 tokens. This is why LLMs sometimes struggle with character-level tasks like counting letters.',
  'Tokens = money with LLMs. Every API call costs tokens. Understanding tokenization helps you write efficient prompts and understand model limitations.',
  1, 15
),
(
  '22222222-0000-0000-0000-000000000009',
  '11111111-0000-0000-0000-000000000002',
  'embeddings',
  'Embeddings',
  'An embedding is a numerical representation of meaning. Text, images, or any data is converted into a vector (list of numbers) where similar things are close together in that mathematical space. Embeddings let computers understand semantic similarity. "King" and "Queen" will be close together. "Cat" and "feline" will be close. "Pizza" and "quantum physics" will be far apart.',
  'Imagine a city map where every word has an address. Synonyms live on the same street. Related concepts are in the same neighborhood. Opposite words are across town. Embeddings are that map for meaning.',
  'When you search on Google and it returns relevant results even when you didn''t use the exact keywords, that''s semantic search powered by embeddings. It understands what you mean, not just what you typed.',
  'Embeddings convert meaning into math, enabling computers to measure semantic similarity and power search, recommendations, and RAG systems.',
  2, 15
),
(
  '22222222-0000-0000-0000-000000000010',
  '11111111-0000-0000-0000-000000000002',
  'vector-databases',
  'Vector Databases',
  'A vector database stores embeddings and allows fast similarity search. You give it a query embedding, and it returns the most semantically similar stored embeddings — and the data they represent. This is called Approximate Nearest Neighbor (ANN) search. Popular vector databases include Pinecone, Weaviate, Qdrant, and pgvector (a Postgres extension). They are the memory layer of modern AI applications.',
  'A vector database is like a library where books aren''t organized by title — they''re organized by meaning. Ask for "books about loneliness" and it returns "Kafka on the Shore," "The Bell Jar," and "Stoner" — even if none of those titles contain the word "loneliness."',
  'Notion AI uses a vector database to search your notes semantically. When you ask "what did I write about my Q3 strategy?" it embeds your question, finds the most similar note embeddings, and returns the relevant content.',
  'Vector databases are the retrieval engine of the AI stack — they let AI find the right information from a large corpus without reading everything.',
  3, 15
),
(
  '22222222-0000-0000-0000-000000000011',
  '11111111-0000-0000-0000-000000000002',
  'context-windows',
  'Context Windows',
  'The context window is the maximum amount of text an LLM can "see" at once — both your input and its output. Everything outside this window is invisible to the model. Modern LLMs range from 8k tokens (small) to 1 million tokens (Gemini 1.5 Pro). Long context windows allow you to pass entire codebases, books, or conversation histories. But longer context costs more and can degrade reasoning quality.',
  'A context window is like a whiteboard during a meeting. Everything written on the whiteboard is available for discussion. Anything erased or never written is forgotten. The bigger your whiteboard, the more context you can keep visible.',
  'Claude 3.5 has a 200k token context window — roughly 150,000 words or a full-length novel. This lets you ask questions about an entire PDF without chunking it, or maintain a very long conversation without losing early context.',
  'The context window is the model''s working memory. What''s inside it, the model knows. What''s outside, it doesn''t.',
  4, 15
),
(
  '22222222-0000-0000-0000-000000000012',
  '11111111-0000-0000-0000-000000000002',
  'prompt-engineering',
  'Prompt Engineering',
  'Prompt engineering is the practice of designing inputs to LLMs to get better outputs. Effective techniques include: role assignment ("You are an expert..."), few-shot examples (showing desired input-output pairs), chain-of-thought ("Let''s think step by step"), output formatting ("Return JSON with these fields"), and constraints ("In 3 bullet points"). The quality of your prompt directly determines the quality of the output.',
  'Prompting an LLM is like briefing a very capable contractor. A vague brief ("build me a website") produces mediocre work. A detailed brief with examples, constraints, and context produces excellent work. The contractor''s talent is fixed — your instructions are the variable.',
  'Bad prompt: "Write a product description." Good prompt: "Write a 3-sentence product description for a standing desk targeting remote workers. Tone: professional but friendly. Emphasize posture benefits and height adjustability. End with a call to action."',
  'With LLMs, the prompt is the program. Better prompts yield better results — prompt engineering is a high-leverage skill.',
  5, 15
),
(
  '22222222-0000-0000-0000-000000000013',
  '11111111-0000-0000-0000-000000000002',
  'rag',
  'Retrieval-Augmented Generation (RAG)',
  'RAG is a technique that combines LLM generation with real-time retrieval from an external knowledge base. When a user asks a question, the system first retrieves relevant documents using semantic search (vector database), then passes those documents + the question to the LLM to generate a grounded answer. This solves the hallucination and knowledge cutoff problems in LLMs.',
  'RAG is like giving an LLM a research assistant. Before answering, the assistant quickly searches your library of documents, pulls the most relevant pages, and hands them to the LLM to read before answering. The LLM''s answer is grounded in your actual documents.',
  'A legal AI tool built with RAG: user asks "What does our contract say about IP ownership?" The system searches the contract PDF using vector search, retrieves clause 8.3, and passes it to the LLM which generates a clear, accurate summary — citing the exact clause.',
  'RAG = LLM + retrieval. It grounds generation in real data, dramatically reducing hallucination and enabling real-time knowledge.',
  6, 15
),
(
  '22222222-0000-0000-0000-000000000014',
  '11111111-0000-0000-0000-000000000002',
  'fine-tuning',
  'Fine-Tuning vs Prompting',
  'You can customize LLM behavior in two main ways: prompting (no training required, just better instructions) or fine-tuning (additional training on your specific data to change model weights). Prompting is fast and cheap. Fine-tuning is expensive but produces a model that deeply understands your domain, style, or format. For most use cases, prompting + RAG is sufficient. Fine-tuning is reserved for specific tone, format, or domain expertise needs.',
  'Prompting is like giving a new employee detailed instructions. Fine-tuning is like hiring someone who has already worked in your industry for 10 years. Both can produce good results — but one is faster and the other is deeper.',
  'A medical AI company fine-tuned an LLM on 1 million de-identified clinical notes. The result was a model that understood medical terminology, clinical abbreviations, and documentation patterns far better than the base model — without any prompting tricks.',
  'Try prompting first. It covers 80% of use cases. Fine-tune only when you need consistent format, tone, or domain knowledge that prompts can''t reliably achieve.',
  7, 15
);

-- ============================================================
-- LESSONS — Track 3: AI Agents (6 lessons)
-- ============================================================
insert into public.lessons (id, track_id, slug, title, explanation, analogy, example, key_takeaway, order_index, xp_reward) values
(
  '22222222-0000-0000-0000-000000000015',
  '11111111-0000-0000-0000-000000000003',
  'what-are-agents',
  'What are AI Agents?',
  'An AI agent is an LLM that can take actions in the world — not just generate text, but browse the web, write and execute code, send emails, call APIs, and more. Agents operate in a loop: observe the environment, reason about what to do, take an action, observe the result, repeat. This loop continues until the task is complete. Agents transform LLMs from "responders" into "doers."',
  'An AI agent is like a virtual employee. You don''t just ask them questions — you assign them tasks. They figure out the steps, use the tools available to them (computer, internet, email), and complete the work autonomously.',
  'Devin, the AI software engineer, can take a GitHub issue, understand the codebase, write the fix, run tests, and open a pull request — without human intervention at each step. That''s an agent operating autonomously.',
  'Agents = LLMs + tools + a loop. The loop is what makes them autonomous instead of just responsive.',
  1, 20
),
(
  '22222222-0000-0000-0000-000000000016',
  '11111111-0000-0000-0000-000000000003',
  'tools-function-calling',
  'Tools & Function Calling',
  'Function calling (also called tool use) lets LLMs invoke external functions or APIs. You define the tools available (name, description, parameters) and the LLM decides when to call them and with what arguments. Results are returned to the LLM which incorporates them into its response. This is how agents interact with the real world — searching the web, running code, querying databases.',
  'Function calling is like giving an LLM a toolbelt. Without tools, it can only think and talk. With tools, it can pick up a hammer (search the web), use a measuring tape (run calculations), or make a phone call (send an API request).',
  'When you ask ChatGPT with browsing enabled "What''s the current price of AAPL?" it doesn''t hallucinate a price. It calls a search function, gets the real price, and reports it accurately.',
  'Tools are the hands of an AI agent. The LLM is the brain — tools let it act in the world.',
  2, 20
),
(
  '22222222-0000-0000-0000-000000000017',
  '11111111-0000-0000-0000-000000000003',
  'agent-memory',
  'Agent Memory',
  'AI agents have multiple types of memory: in-context memory (what''s in the current context window), external memory (vector databases, files), episodic memory (logs of past actions and outcomes), and semantic memory (learned facts). Managing memory well is key to building useful agents — they need to remember what they''ve done, what they know, and what the user told them in past sessions.',
  'Agent memory is like a person''s cognitive toolkit. Short-term memory is their context window — limited and temporary. Long-term memory is their external database — vast and persistent. Episodic memory is their diary — a log of what happened. Good agents use all three.',
  'A personal assistant agent that remembers: "You prefer evening meetings" (semantic), "Last Tuesday you asked me to follow up with the design team" (episodic), and has the current email thread in context (in-context memory).',
  'Memory is what separates a one-shot LLM call from an agent that improves over time. Persistent memory = persistent value.',
  3, 20
),
(
  '22222222-0000-0000-0000-000000000018',
  '11111111-0000-0000-0000-000000000003',
  'mcp',
  'Model Context Protocol (MCP)',
  'MCP (Model Context Protocol) is an open standard by Anthropic that defines how AI models connect to external tools, data sources, and services. It creates a universal plug-in system: any MCP server can expose tools to any MCP-compatible AI client. This standardizes the integration layer, so developers build tool servers once and any AI can use them — similar to how USB standardized device connections.',
  'MCP is like USB for AI. Before USB, every device needed a different cable. USB created one standard port that works with everything. MCP creates one standard protocol so AI agents can connect to any tool — databases, APIs, file systems — without custom integration code for each one.',
  'Claude Desktop supports MCP. You can run an MCP server that connects to your local files, and Claude can read, search, and edit them directly in conversation — without any special coding, just using the MCP standard.',
  'MCP is the glue layer of the agent ecosystem. It lets tools and AI models connect without custom integration work for every pair.',
  4, 20
),
(
  '22222222-0000-0000-0000-000000000019',
  '11111111-0000-0000-0000-000000000003',
  'multi-agent-systems',
  'Multi-Agent Systems',
  'Multi-agent systems are architectures where multiple AI agents collaborate to complete complex tasks. Common patterns: orchestrator-worker (one agent breaks down the task, sub-agents execute), peer-to-peer (agents communicate directly), and pipeline (output of one agent feeds the next). Multi-agent systems excel at tasks that benefit from parallelism, specialization, or independent verification.',
  'A multi-agent system is like a consulting firm. The engagement manager (orchestrator) breaks down the client''s problem. Specialists (worker agents) — a financial analyst, a market researcher, a strategist — each handle their area. The manager synthesizes the results into a final deliverable.',
  'AutoGen by Microsoft lets you define multiple agents: a "Coder" agent that writes code, a "Critic" agent that reviews it, a "Tester" agent that runs it. They collaborate in a loop until the code is correct.',
  'Multi-agent systems tackle complexity through division of labor. Specialization + coordination = capabilities beyond any single agent.',
  5, 20
),
(
  '22222222-0000-0000-0000-000000000020',
  '11111111-0000-0000-0000-000000000003',
  'evals',
  'AI Evals',
  'Evals (evaluations) are systematic tests that measure AI system performance. Without evals, you are flying blind — you cannot reliably improve what you do not measure. Evals can be automated (run a test suite, check outputs against criteria) or human (expert review). LLM-as-judge is a popular technique where another LLM grades the outputs. Good evals are the foundation of production-grade AI development.',
  'Evals are like unit tests for AI. A software engineer wouldn''t ship code without tests. A serious AI engineer doesn''t ship prompts or models without evals. The difference: code tests check exact outputs, evals check nuanced quality.',
  'Anthropic runs thousands of evals before releasing each Claude model: safety evals (does it refuse harmful requests?), capability evals (can it solve math, code, reason?), and alignment evals (does it behave as intended?). These evals drive every model improvement.',
  'No evals = no confidence. Evals are how you know your AI is improving, not just changing.',
  6, 20
);

-- ============================================================
-- QUESTIONS — Lesson 1: What is AI?
-- ============================================================
insert into public.questions (lesson_id, type, question_text, options, correct_answer, explanation, order_index, xp_reward) values
(
  '22222222-0000-0000-0000-000000000001', 'mcq',
  'What is the best definition of Artificial Intelligence?',
  '["A robot that thinks like a human", "Computer systems that perform tasks requiring human intelligence", "Software that follows pre-written rules", "A database of human knowledge"]',
  'Computer systems that perform tasks requiring human intelligence',
  'AI is broadly defined as computer systems capable of performing tasks that typically require human intelligence — like understanding language, recognizing patterns, and making decisions.',
  1, 5
),
(
  '22222222-0000-0000-0000-000000000001', 'true_false',
  'AI systems are explicitly programmed with every rule they need to know.',
  null,
  'false',
  'Modern AI systems learn from data rather than being explicitly programmed with rules. This is what makes machine learning fundamentally different from traditional rule-based programming.',
  2, 5
),
(
  '22222222-0000-0000-0000-000000000001', 'fill_blank',
  'When Netflix recommends a show you might enjoy, it is using ___ to analyze your watch history.',
  null,
  'AI',
  'Netflix''s recommendation system is a classic example of AI in everyday life — it analyzes patterns in viewing data to predict what you''ll enjoy.',
  3, 5
),
(
  '22222222-0000-0000-0000-000000000001', 'mcq',
  'Which of the following is NOT a task that typically requires AI?',
  '["Recognizing faces in photos", "Translating languages", "Sorting a list of numbers alphabetically", "Detecting spam emails"]',
  'Sorting a list of numbers alphabetically',
  'Sorting is a deterministic algorithm — it doesn''t require learning or intelligence. Face recognition, translation, and spam detection all involve learning patterns from data.',
  4, 5
),
(
  '22222222-0000-0000-0000-000000000001', 'true_false',
  'AI learns from data rather than explicit programming.',
  null,
  'true',
  'This is the core insight of modern AI — instead of writing rules by hand, we let the system discover rules from examples (data).',
  5, 5
);

-- ============================================================
-- QUESTIONS — Lesson 2: Machine Learning
-- ============================================================
insert into public.questions (lesson_id, type, question_text, options, correct_answer, explanation, order_index, xp_reward) values
(
  '22222222-0000-0000-0000-000000000002', 'mcq',
  'What are the three main types of Machine Learning?',
  '["Supervised, Unsupervised, Reinforcement", "Deep, Shallow, Medium", "Classification, Regression, Clustering", "Narrow, General, Super"]',
  'Supervised, Unsupervised, Reinforcement',
  'The three canonical ML paradigms are: supervised (labeled data), unsupervised (no labels), and reinforcement (reward signal).',
  1, 5
),
(
  '22222222-0000-0000-0000-000000000002', 'fill_blank',
  'In machine learning, instead of writing rules, you feed in ___ and let the system discover the rules itself.',
  null,
  'data',
  'ML inverts traditional programming. You provide data (examples) and the algorithm learns the rules/patterns — you don''t write the rules yourself.',
  2, 5
),
(
  '22222222-0000-0000-0000-000000000002', 'true_false',
  'A spam filter is a good example of a machine learning application.',
  null,
  'true',
  'Spam filters learn from millions of labeled emails (spam/not spam) to classify new emails — a classic supervised learning application.',
  3, 5
),
(
  '22222222-0000-0000-0000-000000000002', 'mcq',
  'Which statement best describes what makes ML different from traditional programming?',
  '["ML is faster than traditional code", "ML discovers rules from data instead of having rules written by hand", "ML only works for image recognition", "ML requires no data to function"]',
  'ML discovers rules from data instead of having rules written by hand',
  'The fundamental insight of ML is learning from examples rather than explicit rule-writing. The algorithm finds patterns in data that humans would struggle to define manually.',
  4, 5
),
(
  '22222222-0000-0000-0000-000000000002', 'fill_blank',
  'Machine Learning is a ___ of Artificial Intelligence.',
  null,
  'subset',
  'ML is one approach within the broader field of AI. Not all AI is ML (e.g., rule-based expert systems), but ML is currently the dominant paradigm.',
  5, 5
);

-- ============================================================
-- QUESTIONS — Lesson 3: Supervised Learning
-- ============================================================
insert into public.questions (lesson_id, type, question_text, options, correct_answer, explanation, order_index, xp_reward) values
(
  '22222222-0000-0000-0000-000000000003', 'mcq',
  'What is the defining characteristic of supervised learning?',
  '["It requires no data", "Training uses labeled input-output pairs", "The model learns through trial and error", "It only works for image tasks"]',
  'Training uses labeled input-output pairs',
  'Supervised learning is defined by the use of labeled data — pairs of (input, correct output) — from which the model learns to predict outputs for new inputs.',
  1, 5
),
(
  '22222222-0000-0000-0000-000000000003', 'true_false',
  'Classification and regression are both types of supervised learning tasks.',
  null,
  'true',
  'Classification predicts a category (spam/not spam, cat/dog) while regression predicts a number (house price, temperature). Both are supervised learning tasks.',
  2, 5
),
(
  '22222222-0000-0000-0000-000000000003', 'fill_blank',
  'A tumor detection model trained on X-rays labeled by doctors is an example of ___ learning.',
  null,
  'supervised',
  'Medical diagnosis AI is a classic supervised learning application — doctors provide the labels (has tumor / no tumor) and the model learns to replicate that expertise.',
  3, 5
),
(
  '22222222-0000-0000-0000-000000000003', 'mcq',
  'What does a supervised learning model do at inference time?',
  '["It generates new training data", "It predicts outputs for new, unseen inputs", "It asks the user to label data", "It trains itself on new examples"]',
  'It predicts outputs for new, unseen inputs',
  'After training, a supervised model is deployed to predict outputs for new examples it has never seen — this is called inference.',
  4, 5
),
(
  '22222222-0000-0000-0000-000000000003', 'true_false',
  'More high-quality labeled data generally leads to better supervised learning models.',
  null,
  'true',
  'Supervised learning performance is heavily dependent on the quantity and quality of labeled training data. More labeled examples = better learned patterns.',
  5, 5
);

-- ============================================================
-- QUESTIONS — Lesson 6: LLMs
-- ============================================================
insert into public.questions (lesson_id, type, question_text, options, correct_answer, explanation, order_index, xp_reward) values
(
  '22222222-0000-0000-0000-000000000006', 'mcq',
  'What do Large Language Models predict during generation?',
  '["The meaning of your sentence", "The next token in a sequence", "The best answer from a database", "Your intent and emotions"]',
  'The next token in a sequence',
  'LLMs are fundamentally trained to predict the next token. Through this simple objective at massive scale, they develop rich language understanding and generation capabilities.',
  1, 5
),
(
  '22222222-0000-0000-0000-000000000006', 'true_false',
  'ChatGPT executes a specialized coding algorithm when asked to write code.',
  null,
  'false',
  'ChatGPT doesn''t have special coding logic. It predicts what a skilled programmer would type next, because it trained on billions of lines of code.',
  2, 5
),
(
  '22222222-0000-0000-0000-000000000006', 'fill_blank',
  'LLMs develop emergent capabilities like reasoning and coding from the simple objective of predicting the next ___.',
  null,
  'token',
  'Token prediction, applied at enormous scale, produces emergent capabilities that were never explicitly trained — a surprising and profound discovery in AI.',
  3, 5
),
(
  '22222222-0000-0000-0000-000000000006', 'mcq',
  'Which of these is NOT an LLM?',
  '["GPT-4", "Claude", "Gemini", "AlexNet"]',
  'AlexNet',
  'AlexNet is a convolutional neural network for image classification (2012), not a language model. GPT-4, Claude, and Gemini are all large language models.',
  4, 5
),
(
  '22222222-0000-0000-0000-000000000006', 'true_false',
  'LLMs are trained on large amounts of text data.',
  null,
  'true',
  'LLMs are trained on trillions of tokens of text from the internet, books, and code — this vast training corpus is what gives them broad knowledge.',
  5, 5
);

-- ============================================================
-- QUESTIONS — Lesson 8: Tokens
-- ============================================================
insert into public.questions (lesson_id, type, question_text, options, correct_answer, explanation, order_index, xp_reward) values
(
  '22222222-0000-0000-0000-000000000008', 'mcq',
  'Approximately how many characters does one token represent?',
  '["1 character", "4 characters", "1 full word always", "1 sentence"]',
  '4 characters',
  'On average, one token is roughly 4 characters or 0.75 words in English. This varies by language and content type.',
  1, 5
),
(
  '22222222-0000-0000-0000-000000000008', 'true_false',
  'LLMs process text at the character level, one character at a time.',
  null,
  'false',
  'LLMs process text as tokens, not individual characters. Tokenization is the process of splitting text into these token units before model processing.',
  2, 5
),
(
  '22222222-0000-0000-0000-000000000008', 'fill_blank',
  'The maximum number of tokens a model can process at once is called its ___ window.',
  null,
  'context',
  'The context window defines how much text (input + output) the model can "see" at once. It''s measured in tokens.',
  3, 5
),
(
  '22222222-0000-0000-0000-000000000008', 'mcq',
  'Why might LLMs struggle to count the letters in a word?',
  '["They are not smart enough", "Words are often split into multiple tokens that don''t align with characters", "They cannot read text", "Counting is too computationally expensive"]',
  'Words are often split into multiple tokens that don''t align with characters',
  'Since LLMs see tokens (not characters), letter-level tasks are difficult. "strawberry" might tokenize as "straw", "berry" — making it hard to count individual letters.',
  4, 5
),
(
  '22222222-0000-0000-0000-000000000008', 'true_false',
  'Token limits affect the cost of using LLM APIs.',
  null,
  'true',
  'LLM APIs charge per token. Longer inputs and outputs cost more. Understanding tokenization helps write efficient prompts.',
  5, 5
);

-- ============================================================
-- QUESTIONS — Lesson 13: RAG
-- ============================================================
insert into public.questions (lesson_id, type, question_text, options, correct_answer, explanation, order_index, xp_reward) values
(
  '22222222-0000-0000-0000-000000000013', 'mcq',
  'What problem does RAG primarily solve?',
  '["LLMs being too slow", "LLM hallucination and knowledge cutoff", "LLMs being too expensive", "LLMs not supporting multiple languages"]',
  'LLM hallucination and knowledge cutoff',
  'RAG grounds LLM responses in real, retrieved documents — dramatically reducing hallucination and enabling answers based on up-to-date or private knowledge.',
  1, 5
),
(
  '22222222-0000-0000-0000-000000000013', 'fill_blank',
  'RAG combines LLM generation with real-time ___ from an external knowledge base.',
  null,
  'retrieval',
  'The "R" in RAG stands for Retrieval. Documents are retrieved first, then passed to the LLM to generate a grounded answer.',
  2, 5
),
(
  '22222222-0000-0000-0000-000000000013', 'true_false',
  'In a RAG system, the LLM reads your entire document database for every query.',
  null,
  'false',
  'RAG uses vector search to retrieve only the most relevant documents (typically 3-10 chunks), which are then passed to the LLM. It does not read the entire corpus.',
  3, 5
),
(
  '22222222-0000-0000-0000-000000000013', 'mcq',
  'What is the correct order of steps in a RAG pipeline?',
  '["Generate → Retrieve → Answer", "Retrieve → Generate → Store", "Embed query → Retrieve docs → Generate answer", "Train model → Fine-tune → Deploy"]',
  'Embed query → Retrieve docs → Generate answer',
  'RAG flow: (1) embed the user query, (2) search vector DB for similar documents, (3) pass query + retrieved docs to LLM to generate a grounded answer.',
  4, 5
),
(
  '22222222-0000-0000-0000-000000000013', 'true_false',
  'RAG can be used to give LLMs access to private company documents without fine-tuning.',
  null,
  'true',
  'This is one of RAG''s most powerful use cases — you can build a Q&A system over proprietary docs without any model training, just indexing.',
  5, 5
);

-- ============================================================
-- QUESTIONS — Lesson 15: What are AI Agents?
-- ============================================================
insert into public.questions (lesson_id, type, question_text, options, correct_answer, explanation, order_index, xp_reward) values
(
  '22222222-0000-0000-0000-000000000015', 'mcq',
  'What distinguishes an AI agent from a regular LLM?',
  '["Agents are smarter", "Agents can take actions in the world, not just generate text", "Agents are cheaper to run", "Agents don''t need a context window"]',
  'Agents can take actions in the world, not just generate text',
  'The defining characteristic of an agent is the ability to act — browse the web, execute code, call APIs — not just respond with text.',
  1, 5
),
(
  '22222222-0000-0000-0000-000000000015', 'fill_blank',
  'An AI agent operates in a loop: observe, reason, ___, repeat.',
  null,
  'act',
  'The observe-reason-act loop (also called the ReAct pattern) is the fundamental architecture of AI agents. They continuously cycle through these steps until the task is complete.',
  2, 5
),
(
  '22222222-0000-0000-0000-000000000015', 'true_false',
  'AI agents can only complete tasks that take a single step.',
  null,
  'false',
  'Agents are specifically designed for multi-step tasks. They plan, take actions, observe results, adjust, and continue — completing complex, long-horizon tasks.',
  3, 5
),
(
  '22222222-0000-0000-0000-000000000015', 'mcq',
  'What is the formula for an AI agent?',
  '["LLM + more parameters", "LLM + tools + a loop", "LLM + fine-tuning", "LLM + human supervision"]',
  'LLM + tools + a loop',
  'An agent is an LLM equipped with tools (to act in the world) operating in an agentic loop (observe-reason-act) until the task is done.',
  4, 5
),
(
  '22222222-0000-0000-0000-000000000015', 'true_false',
  'Devin (the AI software engineer) is an example of an AI agent.',
  null,
  'true',
  'Devin can read GitHub issues, understand codebases, write fixes, run tests, and open PRs — a complex multi-step workflow executed autonomously, which is precisely what agents do.',
  5, 5
);

-- ============================================================
-- QUESTIONS — Lesson 18: MCP
-- ============================================================
insert into public.questions (lesson_id, type, question_text, options, correct_answer, explanation, order_index, xp_reward) values
(
  '22222222-0000-0000-0000-000000000018', 'mcq',
  'What does MCP stand for?',
  '["Machine Control Protocol", "Model Context Protocol", "Multi-Chain Processing", "Memory and Context Pipeline"]',
  'Model Context Protocol',
  'MCP — Model Context Protocol — is an open standard by Anthropic for connecting AI models to external tools and data sources.',
  1, 5
),
(
  '22222222-0000-0000-0000-000000000018', 'fill_blank',
  'MCP was created by ___ as an open standard for connecting AI to tools.',
  null,
  'Anthropic',
  'Anthropic open-sourced MCP to create a universal standard for AI-tool integration, similar to how USB standardized device connections.',
  2, 5
),
(
  '22222222-0000-0000-0000-000000000018', 'true_false',
  'MCP requires custom integration code for each AI-tool pair.',
  null,
  'false',
  'MCP''s whole point is to eliminate custom integration code. Build an MCP server once, and any MCP-compatible AI can use it.',
  3, 5
),
(
  '22222222-0000-0000-0000-000000000018', 'mcq',
  'Which analogy best describes MCP?',
  '["Bluetooth for audio", "USB for AI tools", "WiFi for databases", "HDMI for screens"]',
  'USB for AI tools',
  'Like USB created one standard port for all devices, MCP creates one standard protocol for connecting any AI to any tool — without custom cables (integration code) for each pair.',
  4, 5
),
(
  '22222222-0000-0000-0000-000000000018', 'true_false',
  'An MCP server built for one AI system can work with any MCP-compatible AI.',
  null,
  'true',
  'This is the core value of MCP — build once, works everywhere. An MCP file system server works with Claude, and any other MCP-compatible client.',
  5, 5
);

-- ============================================================
-- QUESTIONS — Lesson 20: Evals
-- ============================================================
insert into public.questions (lesson_id, type, question_text, options, correct_answer, explanation, order_index, xp_reward) values
(
  '22222222-0000-0000-0000-000000000020', 'mcq',
  'What are "evals" in the context of AI?',
  '["Evaluations that measure AI system performance", "The cost of running an AI model", "The training data for an AI", "User feedback forms"]',
  'Evaluations that measure AI system performance',
  'Evals are systematic tests that measure how well an AI system performs — covering accuracy, safety, reasoning quality, and more.',
  1, 5
),
(
  '22222222-0000-0000-0000-000000000020', 'fill_blank',
  'LLM-as-___ is a technique where one AI grades the outputs of another AI.',
  null,
  'judge',
  'LLM-as-judge uses a capable model to evaluate outputs at scale — faster and cheaper than human review for many tasks.',
  2, 5
),
(
  '22222222-0000-0000-0000-000000000020', 'true_false',
  'You can reliably improve an AI system without measuring its performance.',
  null,
  'false',
  'Without evals, you''re flying blind. You might make changes that improve one thing while breaking another. Evals are how you know what''s actually improving.',
  3, 5
),
(
  '22222222-0000-0000-0000-000000000020', 'mcq',
  'Which analogy best describes the role of evals in AI development?',
  '["Evals are like marketing for AI", "Evals are like unit tests for AI", "Evals are like databases for AI", "Evals are like prompts for AI"]',
  'Evals are like unit tests for AI',
  'Just as software engineers need tests to ship with confidence, AI engineers need evals. The key difference: tests check exact outputs, evals assess nuanced quality.',
  4, 5
),
(
  '22222222-0000-0000-0000-000000000020', 'true_false',
  'Anthropic uses evals to measure safety, capability, and alignment before releasing new models.',
  null,
  'true',
  'Model evaluation is a core part of Anthropic''s development process — evals run across safety, capability, and alignment dimensions before any model release.',
  5, 5
);
