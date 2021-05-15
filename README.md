# GraphQL in Next.js

## Configuring Prisma

- `npx prisma init`
- Set the `DATABASE_URL` in the `.env` file

```prisma
model Album {
  id       Int    @id @default(autoincrement())
  name     String
  year     String
  artist   Artist @relation(fields: [artistId], references: [id])
  artistId Int
}

model Artist {
  id     Int     @id @default(autoincrement())
  name   String
  url    String
  albums Album[]
}
```

- `npx prisma migrate dev --name init`
- `npx prisma db seed --preview-feature`

```
"ts-node": "ts-node --compiler-options '{\"module\":\"CommonJS\"}'"
```
