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

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.x or later)
- **npm** or **bun**
- A **Supabase** account (for the real-time comment system)

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
4. **Linting**:
   Check for code quality and potential errors:
   ```bash
   npm run lint
   ```
5. **Explore the Prototype**:
   - Visit `/components` to see the available UI building blocks.
   - Visit `/settings` to configure your simulation environment.

## 📂 Project Structure

```text
├── src/
│   ├── app/            # Next.js App Router (Pages & Routes)
│   ├── components/
│   │   ├── layout/     # MainLayout and navigation components
│   │   ├── Comments/   # Integrated feedback system
│   │   └── ui/         # Atomic UI primitives (Buttons, Cards, etc.)
│   └── lib/            # Global state (SettingsContext) and utilities
├── public/             # Static assets
└── tailwind.config.ts  # Design system & wireframe tokens
```

## 🧩 Components & Customization

The kit uses a "headless" primitive approach. For detailed instructions on adding new components or transitioning from wireframes to branded UI, see the [COMPONENTS_GUIDE.md](./src/components/COMPONENTS_GUIDE.md).

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

-- Enable RLS and add policies for anonymous access
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access"
ON public.comments
FOR SELECT
TO anon
USING (true);

CREATE POLICY "Allow public insert access"
ON public.comments
FOR INSERT
TO anon
WITH CHECK (true);
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

## 🏃‍♂️ Quick Start: Creating a New Page

Adding a new route is straightforward using the Next.js App Router. Here is a template for a new page:

```tsx
// src/app/my-new-page/page.tsx
import { MainLayout } from "@/components/layout/MainLayout";
import { Card, Button, Label, Input } from "@/components/ui";
import { CommentMarker } from "@/components/Comments/CommentMarker";

export default function MyNewPage() {
  return (
    <MainLayout title="My New Page">
      <div className="max-w-4xl mx-auto p-8 space-y-8">
        <header className="space-y-2">
          <h1 className="text-4xl font-black uppercase tracking-tighter">New Feature</h1>
          <p className="text-zinc-500 font-medium text-lg">Detailed description of the feature.</p>
        </header>

        <Card className="p-8 relative">
          <div className="absolute top-4 right-4">
            <CommentMarker id="new-feature-card" title="Feature Card" description="Feedback on this section." />
          </div>
          <div className="space-y-4">
            <Label className="text-xl font-black">Input Label</Label>
            <Input placeholder="Enter data..." />
            <Button variant="primary">Submit Action</Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
}
```


---

## 🌐 Deployment: GitHub Pages

To publish your prototype to GitHub Pages, follow these steps:

### 1. Verification & Export
Before deploying, it is recommended to run the linter to ensure there are no build-breaking errors:
```bash
npm run lint
```

Ensure your `next.config.mjs` is configured for a static export. This allows Next.js to generate a standalone `out` directory that can be hosted on GitHub Pages:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export
  },
};

export default nextConfig;
```

### 2. Automated Deployment (GitHub Actions)
Create a file at `.github/workflows/deploy.yml`:

```yaml
name: Deploy Next.js site to Pages
on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Detect package manager
        id: detect-package-manager
        run: |
          if [ -f "${{ github.workspace }}/yarn.lock" ]; then
            echo "manager=yarn" >> $GITHUB_OUTPUT
            echo "command=install" >> $GITHUB_OUTPUT
            echo "runner=yarn" >> $GITHUB_OUTPUT
            exit 0
          elif [ -f "${{ github.workspace }}/package.json" ]; then
            echo "manager=npm" >> $GITHUB_OUTPUT
            echo "command=ci" >> $GITHUB_OUTPUT
            echo "runner=npx --no-install" >> $GITHUB_OUTPUT
            exit 0
          else
            echo "Unable to determine package manager"
            exit 1
          fi
      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: ${{ steps.detect-package-manager.outputs.manager }}
      - uses: actions/configure-pages@v5
        with:
          static_site_generator: next
      - name: Restore cache
        uses: actions/cache@v4
        with:
          path: |
            .next/cache
          key: ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json', '**/yarn.lock') }}-${{ hashFiles('**.[jt]s', '**.[jt]sx') }}
          restore-keys: |
            ${{ runner.os }}-nextjs-${{ hashFiles('**/package-lock.json', '**/yarn.lock') }}-
      - name: Install dependencies
        run: ${{ steps.detect-package-manager.outputs.manager }} ${{ steps.detect-package-manager.outputs.command }}
      - name: Build with Next.js
        run: ${{ steps.detect-package-manager.outputs.runner }} next build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - id: deployment
        uses: actions/deploy-pages@v5
```

### 3. Connect a Custom Domain
1. In your GitHub repository, go to **Settings > Pages**.
2. Under **Custom domain**, enter your domain (e.g., `prototype.yourdomain.com`).
3. GitHub will automatically create a `public/CNAME` file for you if you do this via the UI, or you can create it manually.
4. **DNS Configuration**:
   - For a **subdomain**: Add a `CNAME` record pointing to `yourusername.github.io`.
   - For an **apex domain**: Add `A` records pointing to GitHub's IP addresses.

### 4. No Custom Domain?
If you are deploying to `https://<username>.github.io/<repo-name>/` (without a custom domain), you must update your `next.config.mjs` to include the `basePath`:

```js
const nextConfig = {
  output: 'export',
  basePath: '/prototype-kit', // Replace with your repository name
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
```

### 5. GitHub Secrets (Supabase)
For the comment system to work on the deployed site, you must add your Supabase credentials as GitHub Secrets:
1. In your GitHub repository, go to **Settings > Secrets and variables > Actions**.
2. Click **New repository secret**.
3. Add the following secrets:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

The deployment workflow is already configured to inject these secrets during the build process.

---

## 🤝 Contributing

Contributions are welcome! If you're using this kit and want to improve it:
1. **Fork** the repository.
2. Create a **feature branch** (`git checkout -b feature/amazing-ui`).
3. **Commit** your changes (`git commit -m 'Add some brutalist magic'`).
4. **Push** to the branch (`git push origin feature/amazing-ui`).
5. Open a **Pull Request**.

## 📄 License

This project is licensed under the [**GNU GPLv3**](https://www.gnu.org/licenses/gpl-3.0.en.html). You are free to use, modify, and distribute this software, provided that all derivative works remain open-source and carry the same license.
