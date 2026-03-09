# Feature stubs

Templates used by `pnpm make:feature <name>` to generate a new feature (controller, routes, schema, service, repository, index).

## Usage

```bash
pnpm make:feature notification
```

Creates `src/features/notification/` with:

- `notification.controller.ts`
- `notification.routes.ts`
- `notification.schema.ts`
- `notification.service.ts`
- `notification.repository.ts`
- `index.ts`

Also adds the new route to `src/routes/index.ts` (e.g. `router.use('/notifications', notificationRoutes)`).

## Placeholders

Edit the `.stub` files in this directory to change generated code. The generator replaces:

| Placeholder              | Example (name: `notification`) | Use case                          |
|--------------------------|---------------------------------|-----------------------------------|
| `FEATURE_NAME_PASCAL`    | `Notification`                  | Class names, types, Prisma model  |
| `FEATURE_NAME_CAMEL`     | `notification`                  | Variable names, prisma client     |
| `FEATURE_NAME`           | `notification`                  | Same as camel (e.g. export name)  |
| `FEATURE_NAME_PLURAL`    | `notifications`                 | Route path (e.g. `/notifications`) |
| `FEATURE_NAME_KEBAB`     | `notification` or `demo-feature`| File names and import paths        |

## Conventions

- **Controller**: Class with service dependency; methods use `req`, `res`, `next`; use `.bind(controller)` in routes.
- **Routes**: Express `Router`, `authenticate` middleware, `validateRequest(schema)` for body validation.
- **Schema**: Zod schemas; `create*Schema`, `update*Schema` (partial), and inferred DTO types.
- **Service**: Class with repository dependency; delegates to repository; uses `Prisma.<Model>CreateInput` / `UpdateInput`.
- **Repository**: Uses `@/lib/prisma` and `generated/prisma/client`; standard CRUD (`findMany`, `findUnique`, `create`, `update`, `delete`).

## Customization

- Adjust validation in `schema.stub` (e.g. add fields, use `z.email()`, optional fields).
- Add/remove controller methods and routes (e.g. no `update`, or custom actions).
- If your Prisma model name differs from the feature name (e.g. feature `order-item`, model `OrderItem`), edit the generated repository and service to use the correct model/client name.
- Pluralization is simple (add `s` / `es` / `ies`). If the route path should be different (e.g. `/notifications` vs `/notifs`), change it in `src/routes/index.ts` after generation.
