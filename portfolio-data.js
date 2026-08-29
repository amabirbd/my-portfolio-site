window.portfolioProjects = {
  "wander-woman": {
    name: "Wander Woman",
    category: "Production travel platform",
    status: "Production",
    intro: "A travel booking ecosystem connecting customer journeys, installment payments, trip operations, and internal business tools.",
    image: "../../assets/wander-woman.webp",
    imageAlt: "Wander Woman trip booking website home page",
    role: "Sole backend developer; architecture, implementation, infrastructure, CI/CD, and selected Next.js frontend modules.",
    overview: "Wander Woman needed more than a booking website. The product brings together a customer-facing trip application with the operational systems used to manage content, customers, staff, bookings, and financial workflows.",
    problem: "Booking state, payment state, and operational state must remain understandable across both the public application and internal CRM, CMS, and HRMS workflows. Installment-based bookings add a financial lifecycle that cannot be treated as a single checkout action.",
    flow: ["Next.js client", "Express.js API", "Booking & payment workflows", "PostgreSQL", "Admin operations"],
    flowLabel: "booking.updated",
    responsibilities: [
      "Set up the application architecture and implemented the backend from scratch.",
      "Engineered booking management and installment-payment workflows.",
      "Integrated SSLCommerz for payment processing.",
      "Built core capabilities for CRM, CMS, HRMS, and customer-facing applications.",
      "Contributed to Next.js frontend modules.",
      "Established CI/CD using GitHub Actions, AWS, and other cloud providers.",
      "Optimized API and database behavior for approximately 1.5K–2K daily active traffic."
    ],
    challenges: ["A broad business domain spanning customer and back-office workflows", "Payment and installment state across a longer booking lifecycle", "Consistent data behavior across multiple product surfaces", "Delivery ownership from architecture through cloud deployment"],
    decision: {
      title: "A typed backend with PostgreSQL as the system of record",
      problem: "Bookings, payments, and operational tools all depend on a coherent representation of business state.",
      choice: "The backend was built in TypeScript and Express.js with PostgreSQL, behind explicit application workflows shared by the public and internal products.",
      tradeoff: "A wide backend surface increases the importance of clear module boundaries and disciplined database design, but keeps the core business state controlled by one backend foundation."
    },
    tech: ["TypeScript", "Express.js", "PostgreSQL", "Next.js", "AWS", "GitHub Actions", "SSLCommerz", "CI/CD"],
    next: ["Continue evolving operational visibility as workflows grow", "Expand automated coverage around financial edge cases", "Deepen event-driven separation where it improves failure isolation"]
  },
  "sneaker-drop": {
    name: "Sneaker Drop",
    category: "Real-time concurrency system",
    status: "Completed",
    intro: "A full-stack application for limited-edition sneaker drops with atomic reservations, live inventory, and automatic stock recovery.",
    image: "../../assets/sneaker-drop.webp",
    imageAlt: "Sneaker Drop limited-edition release interface",
    role: "Full-stack architecture and implementation.",
    overview: "Limited releases turn ordinary inventory into a concurrency problem. Multiple buyers may attempt to reserve the last item at nearly the same time, while every connected client expects stock to update immediately.",
    problem: "A reservation must hold stock for one buyer without overselling, recover it when the hold expires, and broadcast the authoritative quantity to other clients.",
    flow: ["React client", "Express.js API", "Atomic reservation", "Inventory store", "Socket.io broadcast"],
    flowLabel: "stock.updated",
    responsibilities: ["Built the full-stack drop-management experience", "Implemented atomic reservation behavior", "Added automatic recovery for expired reservations", "Synchronized inventory across connected browser clients with Socket.io"],
    challenges: ["Competing requests for the same limited stock", "Separating available, reserved, and purchased inventory", "Recovering abandoned reservations automatically", "Keeping connected clients synchronized without treating the browser as authoritative"],
    decision: {
      title: "Temporary holds instead of immediate depletion",
      problem: "Reducing inventory as soon as a user clicks can strand stock when checkout is abandoned; waiting until checkout can oversell the last item.",
      choice: "Create a time-bounded reservation and expose the resulting stock state to all clients in real time.",
      tradeoff: "Reservations add an expiry lifecycle and recovery work, but give buyers a fair checkout window while preserving inventory correctness."
    },
    tech: ["Express.js", "Node.js", "React", "Socket.io"],
    next: ["Add load testing around the final-unit race", "Instrument reservation expiry and recovery rates", "Introduce durable event delivery if broadcasts need replay guarantees"]
  },
  "rag-saas": {
    name: "RAG SaaS",
    category: "Multi-tenant AI platform",
    status: "MVP",
    intro: "A knowledge platform that lets organizations ingest documents and websites, then ask questions through a source-grounded AI assistant.",
    image: "../../assets/rag-saas.webp",
    imageAlt: "RAG SaaS AI assistant conversation interface",
    role: "Independent full-stack architecture and implementation.",
    overview: "RAG SaaS turns organization-owned documents and website content into searchable knowledge. Each tenant can manage content, invite teammates, and interact with an assistant without exposing another organization’s data.",
    problem: "The product must connect conventional SaaS concerns—authentication, teams, usage, and API keys—with retrieval concerns such as ingestion, embeddings, vector isolation, source selection, and local model inference.",
    flow: ["React workspace", "FastAPI", "Ingestion & chunking", "Chroma vector search", "Ollama response"],
    flowLabel: "context.retrieved",
    responsibilities: ["Built the multi-tenant application independently", "Implemented document and website ingestion", "Created tenant-isolated vector retrieval", "Added authentication, team invitations, usage tracking, and API-key management", "Connected source retrieval to locally hosted Ollama models through LangChain"],
    challenges: ["Tenant isolation across relational and vector data", "Turning different source formats into consistent retrieval units", "Keeping answers grounded in the organization’s sources", "Coordinating access control with usage and API-key workflows"],
    decision: {
      title: "Separate operational data from vector retrieval",
      problem: "Users, organizations, invitations, and usage records have relational constraints, while semantic retrieval needs an embedding index.",
      choice: "Use PostgreSQL for SaaS state and Chroma for vector search, with tenant context carried through ingestion and retrieval.",
      tradeoff: "Two storage systems require careful identity mapping and lifecycle coordination, but each can serve the access pattern it is designed for."
    },
    tech: ["Python", "FastAPI", "React", "PostgreSQL", "LangChain", "Chroma", "Ollama"],
    next: ["Evaluate retrieval quality with repeatable test sets", "Add richer ingestion observability", "Introduce configurable retention and document lifecycle policies"]
  },
  "iqbarter": {
    name: "IQBarter",
    category: "Real-time quiz & bidding platform",
    status: "Completed",
    intro: "A quiz platform where users earn points, spend them in live prize auctions, and compete to finish as the top bidder.",
    image: "../../assets/iqbarter.webp",
    imageAlt: "IQBarter quiz and rewards website",
    role: "Full-stack product development with a focus on the real-time bidding system.",
    overview: "IQBarter combines quiz participation, a points economy, prize inventory, and live auctions. The bidding experience was the most demanding part of the build because every participant must see a consistent leading bid while activity is happening.",
    problem: "Bid state changes quickly and is shared by many clients. The application has to validate a bid, update the current leader, and notify connected participants in real time.",
    flow: ["React client", "Socket.io event", "Express.js bid logic", "PostgreSQL", "Live auction broadcast"],
    flowLabel: "bid.accepted",
    responsibilities: ["Built quiz and points-based reward workflows", "Developed the real-time auction experience with Socket.io", "Connected Node.js business logic to PostgreSQL through Sequelize", "Implemented the flow that determines the top bidder for a prize"],
    challenges: ["Fast-moving shared bid state", "Validating user points before accepting a bid", "Keeping participants synchronized", "Resolving the top bidder at auction completion"],
    decision: {
      title: "Server-owned auction state with real-time delivery",
      problem: "Clients need immediate updates, but no individual browser can be trusted as the final authority for a bid.",
      choice: "Route bidding through the Node.js backend, persist the auction state, and use Socket.io to distribute accepted changes.",
      tradeoff: "Persistent connections add connection and scaling concerns, but they match the interaction model better than repeated polling."
    },
    tech: ["JavaScript", "Node.js", "React", "PostgreSQL", "Sequelize", "Express.js", "Socket.io"],
    next: ["Add deterministic auction-close handling under reconnects", "Stress test concurrent bid bursts", "Improve monitoring around rejected and late bids"]
  },
  "unishopr": {
    name: "UniShopr",
    category: "Cross-border marketplace",
    status: "Product work",
    intro: "A crowd-sourced logistics marketplace connecting international shoppers with travelers who can monetize unused luggage capacity.",
    image: "../../assets/unishopr.webp",
    imageAlt: "UniShopr cross-border shopping platform",
    role: "Full-stack product development.",
    overview: "UniShopr applies a sharing-economy model to cross-border shopping. Consumers gain a more convenient route to international marketplaces, while travelers can earn from luggage space they would otherwise leave unused.",
    problem: "The platform coordinates two different user journeys—shopping requests and travel capacity—inside one marketplace experience.",
    flow: ["React interface", "Redux state", "Node.js services", "Request matching", "Marketplace workflow"],
    flowLabel: "request.matched",
    responsibilities: ["Contributed to the full-stack marketplace application", "Built user-facing flows with React", "Managed shared application state with Redux", "Connected the product experience to Node.js services"],
    challenges: ["Two-sided marketplace workflows", "Different states for requests, trips, and matching", "Shared state across a multi-step product journey", "Communicating a new logistics model clearly to users"],
    decision: {
      title: "Explicit client state for a multi-step marketplace",
      problem: "Shopping and travel journeys create shared state that spans multiple screens and user actions.",
      choice: "Use React with Redux to make cross-screen application state explicit while Node.js supports the product workflows.",
      tradeoff: "Centralized client state adds structure and ceremony, but reduces ambiguity when several interfaces depend on the same request and matching state."
    },
    tech: ["HTML", "JavaScript", "Node.js", "React", "Redux"],
    next: ["Clarify marketplace state transitions as the workflow expands", "Add deeper operational instrumentation", "Continue reducing friction across the shopper and traveler journeys"]
  }
};
