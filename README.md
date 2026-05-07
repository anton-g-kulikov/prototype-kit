# Prototype Kit

A high-fidelity, high-speed wireframing system for rapidly building complex, adaptive web interfaces. Built with Next.js and Tailwind CSS, this kit prioritizes structural clarity and stakeholder collaboration over branded aesthetics.

## 🏁 Visual Identity: Shadowless B&W Brutalism

The project follows a strict **"Wireframe-First"** aesthetic to focus discussions on UX and functionality rather than colors or branding:
- **High Contrast**: Monochrome palette (Black, White, Zinc).
- **Sharp Edges**: `rounded-none` everywhere for a technical, wireframe feel.
- **Bold Borders**: Consistent `border-2` (or `border-3`) strokes.
- **Typography**: Clean, non-italicized hierarchy using high-contrast weights.
- **Shadowless**: Minimal use of depth, favoring flat, layered surfaces.

## 🚀 Key Features

- **Integrated Feedback**: Drop `CommentMarker` components anywhere in the UI to collect real-time stakeholder feedback.
- **Context Simulation**: Global `SettingsContext` allows you to toggle between User/Admin roles, Compact/Normal view, and Light/Dark themes instantly.
- **Adaptive Architecture**: Mobile-ready sidebar and header system designed for high-density information displays.
- **Speed-Optimized**: Pre-configured UI primitives (`Button`, `Card`, `Input`) designed to be extended directly with Tailwind utility classes.
- **Contextual Notifications**: Built-in support for status-based badges and alerts (e.g., Personal Email warnings, Connection statuses).

## 🛠 Getting Started

1. **Environment Setup**:
   - Copy `.env.example` to `.env.local`.
   - Add your Supabase credentials (required for the real-time comment system).
2. **Installation**:
   ```bash
   npm install
   ```
3. **Development**:
   ```bash
   npm run dev
   ```
4. **Explore Primitives**:
   - Visit `/components` to see the available UI building blocks.
   - Visit `/settings` to configure your simulation environment.

## 🔑 Configuration & Environment Variables

The project uses Supabase for the real-time comment system. Create a `.env.local` file in the root directory and add your credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> [!NOTE]
> You can find these credentials in your Supabase Project Settings under **API**.



## 💬 Using the Comment System

To collect feedback on a specific element, wrap it or place the `CommentMarker` nearby:

```tsx
import { CommentMarker } from "@/components/Comments/CommentMarker";

<div className="relative">
  <MyComplexComponent />
  <CommentMarker 
    id="referral-logic-01" 
    title="Referral Pipeline" 
    description="Captures the 4-stage state transition logic." 
  />
</div>
```

### Database Schema

The real-time comment system requires a `comments` table in your Supabase project. Run the following SQL in your Supabase SQL Editor:

```sql
CREATE TABLE comments (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  marker_id text not null,
  text text not null,
  author text not null
);
```

## ⚙️ Simulation Settings

The `SettingsContext` allows you to change the app's behavior on the fly:
- **User Mode**: Toggle between `user` and `admin` to test permission-based UI.
- **Compact Mode**: Reduce padding for "Power User" information-dense views.
- **Theme**: Light, Dark, or System-synced monochrome modes.

## 📐 Design Principles

1. **No Placeholders**: Use `generate_image` or real data to keep the prototype feeling "alive."
2. **Direct Tailwind**: Avoid creating small, ad-hoc components. Use Tailwind utility classes directly in the page files for maximum speed.
3. **Purity**: Keep logic separate from presentation to allow for easy transition to production codebases.


---

## 🌐 Deployment: GitHub Pages

To publish your prototype to GitHub Pages, follow these steps:

### 1. Enable Static Export
Ensure your `next.config.mjs` is configured for a static export. This allows Next.js to generate a standalone `out` directory that can be hosted on GitHub Pages:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
```

### 2. Automated Deployment (GitHub Actions)
Create a file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm install
      - run: npm run build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out
  deploy:
    needs: build
    runs-on: ubuntu-latest
    permissions:
      pages: write
      id-token: write
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

### 3. Connect a Custom Domain
1. In your GitHub repository, go to **Settings > Pages**.
2. Under **Custom domain**, enter your domain (e.g., `prototype.yourdomain.com`).
3. GitHub will automatically create a `public/CNAME` file for you if you do this via the UI, or you can create it manually.
4. **DNS Configuration**:
   - For a **subdomain**: Add a `CNAME` record pointing to `yourusername.github.io`.
   - For an **apex domain**: Add `A` records pointing to GitHub's IP addresses.

### 4. GitHub Secrets (Supabase)
For the comment system to work on the deployed site, you must add your Supabase credentials as GitHub Secrets:
1. In your GitHub repository, go to **Settings > Secrets and variables > Actions**.
2. Click **New repository secret**.
3. Add the following secrets:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

The deployment workflow is already configured to inject these secrets during the build process.

---

*Extracted from the DrTalk prototype ecosystem. Optimized for rapid iteration.*
