<img width="1000" alt="windup" src="https://github.com/Znoy108x/NXT-Reminder/assets/75539409/cb6e8c77-f456-48fb-a367-71cc4bb4aea3">

## Feautures
- Performed optimistic operations to improve performance.

## Install packages
```shell
npm i
```

## Setup .env file
```js
# CLERK ENV CONFIGS
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
# Data Base
DATABASE_URL="DATABASE-CONNECTION-STRING"
```

## Start the app
```shell
npm install
npm run dev
```

## Setup Prisma
```shell
npx prisma generate
npx prisma db push
```
