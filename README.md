## Getting Started

First, run the development server:
npm install

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Dockerization 🐳
```
docker build -t frontend-uc-datahub .
```

### 🚀 How to run it locally
Run it with:
```bash
docker run -p 3000:3000 frontend-uc-datahub
```
Then open: http://localhost:3000

### 📦 How to move this image to your test VM
```
docker save -o frontend-uc-datahub.tar frontend-uc-datahub
```
Copy the .tar file to your test VM:
```
docker load -i frontend-uc-datahub.tar
docker run -p 3000:3000 frontend-uc-datahub
```