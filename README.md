# Archaean API - Node.js Learning Project

A self-learning project for mastering **Node.js**, **Express.js**, and **Prisma ORM** by building a production-ready REST API from scratch.

## Project Overview

This project is a comprehensive learning journey through modern backend development with Node.js. It demonstrates architectural patterns, best practices, and progressive complexity from fundamental concepts to advanced optimization techniques.

**Tech Stack:**
- **Runtime:** Node.js with TypeScript
- **Framework:** Express.js 5.x
- **ORM:** Prisma 7.x with PostgreSQL
- **Database:** PostgreSQL
- **Authentication:** Argon2 password hashing
- **Validation:** Zod schema validation
- **Security:** Helmet.js for HTTP headers
- **CORS:** Cross-Origin Resource Sharing support
- **Logging:** Pino logger
- **Package Manager:** npm with ES modules

---

## Learning Checklist

### 🟢 Node.js Fundamentals

#### Beginner
- [x] Understanding Node.js event loop and asynchronous JavaScript
- [x] Setting up a Node.js project with package.json
- [x] Using npm scripts for common tasks (dev, build, seed)
- [x] Working with ES modules (import/export)
- [x] Environment variables with dotenv

#### Intermediate
- [x] TypeScript configuration and setup (tsconfig.json)
- [x] Understanding async/await patterns
- [x] Error handling with try/catch blocks
- [x] Dependency injection patterns
- [ ] Custom error classes and error propagation
- [ ] Logging with structured loggers (Pino)
- [ ] Building scalable project structure

#### Advanced
- [ ] Stream processing for large data
- [ ] Worker threads for CPU-intensive tasks
- [ ] Memory management and garbage collection
- [ ] Performance profiling and optimization
- [ ] Module caching strategies
- [ ] Build optimization with esbuild/swc

---

### 🟢 Express.js Framework

#### Beginner
- [x] Creating an Express application instance
- [x] Defining routes (GET, POST, PUT, DELETE)
- [x] Route parameters and query strings
- [x] Middleware basics (app.use())
- [x] Request/Response objects
- [x] JSON request/response handling
- [x] Static file serving concepts

#### Intermediate
- [x] Security middleware (Helmet, CORS)
- [x] Request validation middleware
- [x] Custom middleware for error handling
- [x] Route grouping and versioning (/api/v1)
- [x] HTTP status codes usage
- [x] Controller-service-repository pattern
- [ ] Global error handling middleware
- [ ] Request/response interceptors
- [ ] Rate limiting and throttling
- [ ] Logging middleware

#### Advanced
- [ ] Authentication middleware (JWT, OAuth)
- [ ] Authorization (role-based access control)
- [ ] Request streaming and piping
- [ ] Async error handling wrapper
- [ ] Custom Express types with augmentation
- [ ] Middleware composition patterns
- [ ] Testing middleware with mocks
- [ ] Performance optimization (compression, caching)

---

### 🟢 Prisma ORM

#### Beginner
- [x] Prisma schema setup and configuration
- [x] Defining data models
- [x] Creating database migrations
- [x] Generating Prisma Client
- [x] Database seeding
- [x] Basic CRUD operations
- [x] Running migrations (migrate dev)

#### Intermediate
- [x] Creating relationships (one-to-many, many-to-one)
- [x] Model mapping (@map, @@map)
- [x] Unique constraints and indexes
- [x] Default values for fields
- [x] Timestamp fields (createdAt, updatedAt)
- [ ] Advanced queries with select/include
- [ ] Filtering, sorting, and pagination
- [ ] Transactions for multi-step operations
- [ ] Raw SQL queries
- [ ] Computed fields with extensions

#### Advanced
- [ ] Schema validation with Zod integration
- [ ] Performance optimization (N+1 query prevention)
- [ ] Advanced relationships (many-to-many, self-relations)
- [ ] Database indexing strategies
- [ ] Query optimization and explain plans
- [ ] Migration strategies for production
- [ ] Prisma studio for data inspection
- [ ] Custom resolvers and computed fields
- [ ] Schema versioning and breaking changes
- [ ] Multi-database support

---

### 🟢 Database Design & PostgreSQL

#### Beginner
- [x] Relational database concepts
- [x] Tables and relationships setup
- [x] Data types (String, Float, DateTime, UUID)
- [x] Primary keys (UUID generation)
- [x] Timestamps (created_at, updated_at)
- [x] Unique constraints
- [x] Connection strings and connection pooling

#### Intermediate
- [ ] Indexing strategies for performance
- [ ] Query optimization
- [ ] Foreign key constraints
- [ ] Cascade delete operations
- [ ] Database backups and recovery
- [ ] Connection pooling configuration
- [ ] Transaction isolation levels

#### Advanced
- [ ] JSON/JSONB data types
- [ ] Full-text search
- [ ] Complex joins and query optimization
- [ ] Replication and high availability
- [ ] Monitoring and performance analysis
- [ ] Partitioning large tables

---

### 🟢 REST API Design & HTTP

#### Beginner
- [x] RESTful principles (resources, methods)
- [x] HTTP methods (GET, POST, PUT, DELETE)
- [x] HTTP status codes
- [x] Request/response structure
- [x] API versioning (/api/v1)
- [x] Health check endpoint

#### Intermediate
- [x] Request validation and error responses
- [ ] Pagination for list endpoints
- [ ] Filtering and sorting
- [ ] HATEOAS links in responses
- [ ] Request/response logging
- [ ] API documentation (Swagger/OpenAPI)
- [ ] Rate limiting

#### Advanced
- [ ] Caching strategies (ETags, Cache-Control)
- [ ] Compression (gzip)
- [ ] Content negotiation
- [ ] Partial resource updates (PATCH)
- [ ] Batch operations
- [ ] GraphQL alternative understanding

---

### 🟢 Authentication & Security

#### Beginner
- [x] Password hashing with Argon2
- [x] Basic user registration
- [x] Basic login flow
- [x] User model with password field
- [ ] Password validation rules
- [ ] Secure password storage best practices

#### Intermediate
- [ ] JWT token generation and validation
- [ ] Access and refresh tokens
- [ ] Token expiration handling
- [ ] User authentication middleware
- [ ] Session management
- [ ] HTTPS/TLS understanding

#### Advanced
- [ ] OAuth 2.0 integration (Google, GitHub)
- [ ] Role-based access control (RBAC)
- [ ] Attribute-based access control (ABAC)
- [ ] Two-factor authentication (2FA)
- [ ] API key management
- [ ] CORS security configuration
- [ ] CSRF protection
- [ ] SQL injection prevention

---

### 🟢 Validation & Error Handling

#### Beginner
- [x] Schema validation with Zod
- [x] Request body validation
- [x] Custom error types
- [x] HTTP error responses
- [x] Error messages to clients

#### Intermediate
- [x] Validation middleware
- [ ] Custom validation rules
- [ ] Nested validation schemas
- [ ] Error response standardization
- [ ] Validation error messages localization
- [ ] Input sanitization

#### Advanced
- [ ] Conditional validation based on context
- [ ] Cross-field validation
- [ ] Async validation (unique email checks)
- [ ] Custom error serialization
- [ ] Error tracking and monitoring (Sentry)
- [ ] Detailed error logs for debugging

---

### 🟢 Project Architecture & Patterns

#### Beginner
- [x] MVC pattern basics
- [x] Separation of concerns
- [x] Service layer pattern
- [x] Repository pattern
- [x] Project structure organization

#### Intermediate
- [x] Dependency injection
- [ ] Factory patterns
- [ ] Decorator patterns
- [ ] Strategy patterns
- [ ] Builder patterns
- [ ] Middleware patterns

#### Advanced
- [ ] CQRS (Command Query Responsibility Segregation)
- [ ] Event sourcing
- [ ] Domain-driven design (DDD)
- [ ] Hexagonal architecture
- [ ] Clean architecture principles

---

### 🟢 Testing & Quality

#### Beginner
- [ ] Unit testing basics
- [ ] Test structure (Arrange, Act, Assert)
- [ ] Mock data creation

#### Intermediate
- [ ] Unit testing services and repositories
- [ ] Integration testing APIs
- [ ] Test coverage measurement
- [ ] Mocking Prisma Client
- [ ] Testing error scenarios

#### Advanced
- [ ] End-to-end (E2E) testing
- [ ] Performance testing
- [ ] Load testing
- [ ] Test-driven development (TDD)
- [ ] Continuous integration setup

---

### 🟢 DevOps & Deployment

#### Beginner
- [x] Git and version control basics
- [x] npm scripts and build process
- [ ] Environment configuration

#### Intermediate
- [ ] Docker containerization
- [ ] Docker Compose for local development
- [ ] Database migrations in deployment
- [ ] Environment-specific configurations
- [ ] Monitoring and logging setup

#### Advanced
- [ ] Kubernetes deployment
- [ ] CI/CD pipelines (GitHub Actions, GitLab CI)
- [ ] Zero-downtime deployments
- [ ] Database schema migrations in production
- [ ] Rollback strategies
- [ ] Observability and distributed tracing

---

### 🟢 Code Quality & Tooling

#### Beginner
- [x] TypeScript for type safety
- [ ] ESLint for code linting
- [ ] Prettier for code formatting

#### Intermediate
- [ ] Pre-commit hooks
- [ ] Husky for git hooks
- [ ] Lint-staged for staged files
- [ ] Code review processes

#### Advanced
- [ ] SonarQube for code quality analysis
- [ ] Dependency vulnerability scanning
- [ ] Performance benchmarking
- [ ] Automated security scanning

---

## Project Features Implemented

### Authentication Module
- User registration with email and password
- User login with Argon2 password verification
- Password hashing for security
- User service for business logic
- User repository for data access

### User Management
- Get all users
- Get user by ID
- Create new user
- Update user details
- Delete user
- Find user by email

### Database Models
- **User** - User account information with relationships
- **Product** - Product catalog with pricing
- **Order** - Order records linking users and products
- **AccessToken** - Token management for sessions

### API Structure
- RESTful routing with API versioning
- Service-Repository-Controller pattern
- Error handling with custom error types
- Request validation with Zod
- HTTP status code management
- Health check endpoint

### Security Features
- Helmet.js for HTTP security headers
- CORS configuration
- Argon2 password hashing
- Environment variable management
- TypeScript for type safety

---

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/mrriddwan/archaean-api-nodets.git
cd archaean-api-nodets

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run migrations
npm run migrate-dev

# Seed the database
npm run seed

# Start development server
npm run dev
```

### Development Scripts

```bash
npm run dev              # Start dev server with hot reload
npm run build            # Build TypeScript to JavaScript
npm run migrate-dev      # Run Prisma migrations
npm run seed             # Seed database with initial data
npm test                 # Run tests (not yet configured)
```

---

## Next Learning Steps

1. **Implement Global Error Handler Middleware** - Centralize error handling across all routes
2. **Add JWT Authentication** - Secure endpoints with token-based auth
3. **Create API Documentation** - Generate Swagger/OpenAPI docs
4. **Add Rate Limiting** - Protect endpoints from abuse
5. **Implement Request Logging** - Log all incoming requests with Pino
6. **Setup Testing Framework** - Add Jest or Vitest for unit/integration tests
7. **Add Pagination** - Implement list pagination for large datasets
8. **Database Optimization** - Add indexes and optimize queries
9. **Docker Setup** - Containerize the application
10. **CI/CD Pipeline** - Setup automated testing and deployment

---

## Project Statistics

- **Models:** 4 (User, Product, Order, AccessToken)
- **API Endpoints:** 5+ (and growing)
- **Features Implemented:** Authentication, User CRUD, Database ORM
- **Tech Stack:** 12 dependencies, TypeScript, Express, Prisma

---

## License

ISC

---

## Contributing

This is a learning project. Feel free to fork it and extend it with new features as you learn!

---

**Last Updated:** December 2024  
**Current Status:** Active Development - Building foundational features
