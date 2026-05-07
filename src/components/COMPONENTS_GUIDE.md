# Prototype Kit: Components & Settings Guide

This guide explains how to add new components using Tailwind CSS and how to leverage the `SettingsContext` to create dynamic, state-aware UI.

## 1. Adding New Components with Tailwind

All UI components should live in `src/components/ui/`. We use a "headless" or "primitive" approach where components are functional wrappers around Tailwind classes.

### Step-by-Step: Adding a `Badge` component

1. **Create the component** in `src/components/ui/index.tsx` (or a new file):

```tsx
export function Badge({ children, variant = "default" }: { children: React.ReactNode, variant?: "default" | "success" }) {
  const styles = {
    default: "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100",
    success: "bg-green-100 text-green-900 dark:bg-green-900/30 dark:text-green-400"
  };

  return (
    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${styles[variant]}`}>
      {children}
    </span>
  );
}
```

2. **Styling Principles**:
   - **Dark Mode**: Always use `dark:` utility classes (e.g., `bg-white dark:bg-zinc-950`).
   - **Transitions**: Use `transition-all duration-200` for smooth theme switching.
   - **Borders**: Use consistent border colors (e.g., `border-zinc-200 dark:border-zinc-800`).

---

## 2. Managing Settings & User Modes

The `SettingsContext` (`src/lib/SettingsContext.tsx`) provides a global state for the prototype. This allows you to simulate different users or toggle UI features without a backend.

### Accessing Settings

Use the `useSettings` hook in any component:

```tsx
import { useSettings } from "@/lib/SettingsContext";

export function ManagementPanel() {
  const { settings } = useSettings();

  // Only show the panel if the user is an Admin
  if (settings.userMode !== "admin") return null;

  return <Button>Manage Users</Button>;
}
```

### Updating Settings

Settings can be updated from anywhere (e.g., a "Toggle" button or the Settings page):

```tsx
const { updateSettings } = useSettings();

<button onClick={() => updateSettings({ theme: 'dark' })}>
  Switch to Dark Mode
</button>
```

---

## 3. Dark Mode Implementation

We use the "class" strategy for dark mode.
- The `SettingsContext` automatically adds/removes the `.dark` class to the `<html>` element.
- Tailwind picks this up via the `dark:` prefix.
- Ensure your `tailwind.config.ts` has `darkMode: 'class'`.

## 4. From Prototype to Production Design

This kit is designed to separate **functional prototyping** from **final UI styling**. When you are ready to move from a B&W wireframe to a branded implementation, follow these steps:

### 1. Update the Global Config
Change the core tokens in `tailwind.config.ts`. Swapping the `zinc` palette for your brand colors (e.g., `indigo`, `emerald`) will instantly update the entire prototype.

### 2. Swap Utility Classes in UI Primitives
Instead of changing every page, modify the base components in `src/components/ui/index.tsx`.
- **Rounded Corners**: Change `rounded-none` to `rounded-lg` or `rounded-full`.
- **Borders & Shadows**: Swap `border-2 border-black` for soft shadows like `shadow-sm` and subtle borders `border-zinc-100`.
- **Transitions**: Add `transition-all duration-300` and `hover:scale-[1.02]` to bring the static wireframe to life.

### 3. Transition Typography
Once the layout is validated, you can swap the high-contrast `font-black uppercase italic` headings for your brand's type system (e.g., `font-medium tracking-normal`).

---

> [!IMPORTANT]
> The goal of this kit is speed. **You don't need to manually style complex elements.** Once the primitives are set, simply ask your coding agent to implement the actual pages, forms, and logic. The Tailwind engine will ensure they respect your current "mode"—whether that's a sharp B&W wireframe or a polished production design.

---

> [!TIP]
> YOU DON'T NEED TO CREATE OR CHANGE THESE PRIMITIVE ELEMENTS YOURSELF – TAILWIND ALREADY HAS EVERYTING YOU NEED. JUST ASK YOUR CODING AGENT TO IMPLEMENT ACTUAL PAGES, FORMS AND OTHER ELEMENTS.
