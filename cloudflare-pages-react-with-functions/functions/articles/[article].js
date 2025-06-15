// This object holds the detailed content for each article.
// In a real-world application, this might come from a database, a CMS,
// or separate Markdown files.
const articlesContent = {
  'introduction-to-cloudflare-pages': {
    id: 1,
    path: 'introduction-to-cloudflare-pages',
    title: 'Introduction to Cloudflare Pages',
    author: 'Alex Doe',
    publishedDate: '2024-10-01',
    tags: ['Cloudflare', 'Hosting', 'Serverless'],
    content: `
# Welcome to Cloudflare Pages!

Cloudflare Pages is a Jamstack platform for frontend developers to collaborate and deploy websites. 
It offers a seamless integration with Git, enabling automatic builds and deployments upon new commits.

## Key Features:
- **Git Integration:** Connect your GitHub or GitLab repository for automatic deployments.
- **Blazing Fast Speeds:** Websites are served from Cloudflare's global edge network, ensuring low latency for users worldwide.
- **Unlimited Requests & Bandwidth:** No need to worry about traffic spikes.
- **Easy Custom Domains:** Add your own domain with free, automatically renewed SSL certificates.
`
  },
  'deploying-a-react-app-to-cloudflare-pages': {
    id: 2,
    path: 'deploying-a-react-app-to-cloudflare-pages',
    title: 'Deploying a React App to Cloudflare Pages',
    author: 'Jane Smith',
    publishedDate: '2024-10-05',
    tags: ['React', 'Cloudflare', 'Deployment'],
    content: `
# How to Deploy Your React App on Cloudflare Pages

Deploying a Create React App project is incredibly simple with Cloudflare Pages.

## Step 1: Push to Git
First, ensure your React application is pushed to a GitHub or GitLab repository.

## Step 2: Create a New Pages Project
1. Log in to your Cloudflare dashboard.
2. Navigate to **Workers & Pages** and select the **Pages** tab.
3. Click **Create a project** and connect your Git account.
4. Select the repository containing your React app.

## Step 3: Configure Build Settings
For a standard Create React App, use the following build settings:
- **Framework preset:** Create React App
- **Build command:** \`npm run build\`
- **Build output directory:** \`build\`

That's it! Cloudflare will build and deploy your site.
`
  },
  'tailwind-with-react': {
    id: 3,
    path: 'tailwind-with-react',
    title: 'Setting Up Tailwind CSS with React',
    author: 'Sam Ray',
    publishedDate: '2024-10-12',
    tags: ['React', 'TailwindCSS', 'CSS'],
    content: `
# Integrating Tailwind CSS into a React Project

Tailwind CSS is a utility-first CSS framework that can be composed to build any design, directly in your markup.

## Installation
Follow the official Tailwind CSS guide for the most up-to-date instructions. The general steps are:

1.  **Install Tailwind and its dependencies:**
    \`\`\`bash
    npm install tailwindcss @tailwindcss/vite
    \`\`\`

2.  **Add to your config file:**
    \`\`\`typescript
    import { defineConfig } from 'vite'
    import tailwindcss from '@tailwindcss/vite' // Import Tailwind CSS plugin
    export default defineConfig({
      plugins: [
        tailwindcss(), // Use the Tailwind CSS plugin
      ],
    })
    \`\`\`

3.  **Add import to index.css:**
    In your \`index.css\`,add the following to include Tailwind's styles:
    \`\`\`css
    @import "tailwindcss";
    \`\`\`

Now you can start using Tailwind's utility classes in your React components!
`
  }
};

/**
 * Handles GET requests to /articles/[article]
 * where [article] is the dynamic path segment.
 */
export const onRequestGet = async (context) => {
  // context.params.article will contain the value of the [article] wildcard
  // e.g., for /articles/introduction-to-cloudflare-pages, it will be "introduction-to-cloudflare-pages"
  const articlePath = context.params.article;
  const article = articlesContent[articlePath];

  if (!article) {
    const errorResponse = {
      error: "Article not found",
      path: articlePath
    };
    return new Response(JSON.stringify(errorResponse), {
      status: 404,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  return new Response(JSON.stringify(article), {
    headers: {
      'Content-Type': 'application/json',
    },
  });
};