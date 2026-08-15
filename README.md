# 🌟 Notiva

<div align="center">

[![NPM Version](https://img.shields.io/npm/v/notiva?color=6366f1&label=version)](https://www.npmjs.com/package/notiva)
[![License: MIT](https://img.shields.io/badge/License-MIT-emerald.svg)](https://opensource.org/licenses/MIT)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/notiva?color=ec4899&label=minzipped)](https://bundlephobia.com/package/notiva)
[![Website](https://img.shields.io/badge/website-notiva.habibabdillah.my.id-blue)](https://notiva.habibabdillah.my.id)

**The versatile, lightweight Toast Notification & Confirm Modal library for React, Vue, Svelte, Next.js, Laravel, PHP, and Vanilla JavaScript.**

[🌐 Live Interactive Demo & Documentation](https://notiva.habibabdillah.my.id) • [📦 NPM Package](https://www.npmjs.com/package/notiva) • [🐙 GitHub Repository](https://github.com/muhabibabd/notiva)

</div>

---

## ✨ Features

* 🚀 **Universal & Simple API**: Trigger with `toast('Title')`, `toast.success()`, `toast.fire()`, `toast.confirm()`, or `toast.prompt()`.
* 📦 **Works Everywhere**: Zero external dependencies (< 10KB). Supports React, Vue 3, Svelte, Next.js (App & Pages Router), Nuxt, Astro, Laravel Blade, PHP, and Vanilla JS.
* 🥞 **Smooth 3D Stacking Physics**: Multiple active toasts stack gracefully with depth and auto-expand on hover or touch.
* 🧭 **9 Position Anchors**: Full viewport coverage (`top-left`, `top-center`, `top-right`, `center-left`, `center`, `center-right`, `bottom-left`, `bottom-center`, `bottom-right`).
* 🛡️ **Async Confirm & Prompt Modals**: Native `Promise`-based modal dialogs returning `boolean` or `string` via clean `async/await`.
* 🪟 **Glassmorphism Backdrop & Blur**: Enable frosted-glass background blur overlays on both toasts and modals.
* 🌗 **Light, Dark & System Modes**: Seamlessly synchronizes with Tailwind CSS `.dark` class and listens to the user's OS color scheme in real time via `matchMedia`.
* ⚡ **Promise State Tracking**: `toast.promise()` automatically handles loading, success, and error transitions for asynchronous tasks and HTTP requests.
* 🎨 **Flexible Styling Overrides**: Global configuration via `toast.config()` and granular per-alert color overrides.
* 🐘 **Laravel / PHP Integration**: Includes built-in Session Flash helper class and Blade render component.
* 📘 **TypeScript Ready**: Complete `.d.ts` type declarations with full IDE autocompletion.

---

## 📦 Installation

### Package Manager (NPM / Yarn / PNPM / Bun)

```bash
# Using NPM
npm install notiva

# Using Yarn
yarn add notiva

# Using PNPM
pnpm add notiva

# Using Bun
bun add notiva
```

---

## 🌐 Framework Integration Guides

### 1. React & Next.js (App Router / Pages Router)

```jsx
'use client';
import { toast } from 'notiva';
import 'notiva/dist/notiva.css';

export default function MyComponent() {
  const showToast = () => {
    toast.success('Changes Saved!', 'Your profile has been updated.', {
      position: 'top-right',
      duration: 4000
    });
  };

  const handleConfirm = async () => {
    const isConfirmed = await toast.confirm({
      title: 'Delete Account?',
      text: 'This action cannot be undone.',
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: '#ef4444'
    });

    if (isConfirmed) {
      toast.success('Account deleted successfully.');
    }
  };

  return (
    <div className="space-x-3">
      <button onClick={showToast}>Show Toast</button>
      <button onClick={handleConfirm}>Delete Account</button>
    </div>
  );
}
```

---

### 2. Vue 3 & Nuxt 3

```vue
<script setup>
import { toast } from 'notiva';
import 'notiva/dist/notiva.css';

function save() {
  toast.success('Synced!', 'All changes pushed to server.');
}

async function promptUser() {
  const name = await toast.prompt({
    title: 'Enter Member Name',
    placeholder: 'Full Name...',
    required: true
  });

  if (name) {
    toast.info(`Welcome, ${name}!`);
  }
}
</script>

<template>
  <button @click="save">Save</button>
  <button @click="promptUser">Enter Name</button>
</template>
```

---

### 3. Svelte & SvelteKit

```svelte
<script>
  import { toast } from 'notiva';
  import 'notiva/dist/notiva.css';

  function notify() {
    toast.info('Svelte Ready!', 'Ultra-fast reactivity with Notiva.');
  }
</script>

<button on:click={notify}>Trigger Notification</button>
```

---

### 4. Laravel (Controller & Blade)

#### In Controller:
```php
use Notiva\Toast;

class PostController extends Controller
{
    public function store(Request $request)
    {
        // ... save post logic ...
        Toast::success('Post Published!', 'Your article is now live.');
        return redirect()->route('posts.index');
    }
}
```

#### In Blade Layout (`resources/views/layouts/app.blade.php`):
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="/dist/notiva.css">
</head>
<body>
    @yield('content')

    <script src="/dist/notiva.js"></script>
    {!! \Notiva\Toast::render() !!}
</body>
</html>
```

---

### 5. Vanilla HTML & PHP Native (Script Tag)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Notiva Example</title>
  <link rel="stylesheet" href="/dist/notiva.css">
</head>
<body>
  <button onclick="toast.success('Hello World!')">Show Toast</button>

  <script src="/dist/notiva.js"></script>
</body>
</html>
```

---

## 📖 API Reference

### Quick Notification Methods

```javascript
// Basic Toast
toast('Notification Title', 'Optional description text');

// Status Toast Methods
toast.success('Success Title', 'Success message body');
toast.error('Error Title', 'Error message body');
toast.warning('Warning Title', 'Warning message body');
toast.info('Info Title', 'Info message body');
toast.loading('Loading...', 'Please wait a moment');

// Promise Toast (Auto transition from loading -> success/error)
toast.promise(fetchDataPromise, {
  loading: 'Fetching data from server...',
  success: (data) => `Loaded data for ${data.name}!`,
  error: (err) => `Failed to load: ${err.message}`
});

// Dismissal
toast.dismiss(toastId);
toast.dismissAll();
```

---

### Confirm & Prompt Modals (Async/Await)

```javascript
// 1. Confirm Dialog (returns boolean true/false)
const isConfirmed = await toast.confirm({
  title: 'Are you sure?',
  text: 'Do you want to proceed with this operation?',
  icon: 'warning',              // 'warning' | 'error' | 'question' | 'info' | 'success'
  position: 'center',
  confirmButtonText: 'Yes, Proceed',
  cancelButtonText: 'Cancel',
  confirmButtonColor: '#6366f1',
  backdrop: true,
  backdropBlur: true
});

if (isConfirmed) {
  // Action approved
}

// 2. Prompt Dialog (returns string or null if cancelled)
const userInput = await toast.prompt({
  title: 'Input Required',
  text: 'Please enter your verification code:',
  placeholder: 'e.g. 123456',
  required: true,
  backdrop: true,
  backdropBlur: true
});

if (userInput) {
  toast.success('Code Accepted', `Verification code: ${userInput}`);
}
```

---

### Global Configuration (`toast.config()`)

```javascript
toast.config({
  position: 'top-right',      // Default 9-position anchor
  duration: 4000,             // Auto dismiss duration in ms (0 = infinite)
  theme: 'system',            // 'light' | 'dark' | 'system'
  backdrop: false,            // Background overlay
  backdropBlur: true,         // Frosted glass blur effect
  closeButton: true,          // Display 'X' close button
  progressBar: true,          // Display timer progress bar
  pauseOnHover: true,         // Pause timer on hover
  draggable: true,            // Enable mouse & touch swipe dismiss
  colors: {
    primary: '#6366f1',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  }
});
```

---

### Theme Switcher

```javascript
// Force Light Mode
toast.setTheme('light');

// Force Dark Mode
toast.setTheme('dark');

// Follow User's Operating System Preference (Real-Time)
toast.setTheme('system');
```

---

## 🧭 9 Supported Positions

| Position Key | Viewport Alignment |
| :--- | :--- |
| `'top-left'` | Top Left corner |
| `'top-center'` | Top Center |
| `'top-right'` | Top Right corner *(Default)* |
| `'center-left'` | Center Left |
| `'center'` | Dead Center (Screen Middle) |
| `'center-right'` | Center Right |
| `'bottom-left'` | Bottom Left corner |
| `'bottom-center'` | Bottom Center |
| `'bottom-right'` | Bottom Right corner |

---

## 👨‍💻 Author

Crafted with care by **[Habib Abdillah](https://notiva.habibabdillah.my.id)**.

* **Homepage**: [https://notiva.habibabdillah.my.id](https://notiva.habibabdillah.my.id)
* **GitHub**: [@muhabibabd](https://github.com/muhabibabd)
* **Repository**: [https://github.com/muhabibabd/notiva](https://github.com/muhabibabd/notiva)

---

## 📄 License

This project is open-source software licensed under the **[MIT License](LICENSE)**.
