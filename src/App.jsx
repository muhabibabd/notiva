import React, { useState } from 'react';
import { toast } from '../dist/notiva.esm.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('playground'); // 'playground' | 'frameworks' | 'docs' | 'api'
  const [currentPosition, setCurrentPosition] = useState('top-right');
  const [theme, setTheme] = useState('dark');
  const [chkBackdrop, setChkBackdrop] = useState(true);
  const [chkBackdropBlur, setChkBackdropBlur] = useState(true);
  const [colorBg, setColorBg] = useState('#1e1b4b');
  const [colorAccent, setColorAccent] = useState('#6366f1');
  const [codeTab, setCodeTab] = useState('react');
  const [copied, setCopied] = useState(false);
  const [npmCopied, setNpmCopied] = useState(false);

  // Handle Theme Switching
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    toast.setTheme(newTheme);
    toast.info('Theme Changed', `Active theme mode: ${newTheme.toUpperCase()}`, { duration: 2000 });
  };

  // Set Position & trigger notification
  const handlePositionChange = (pos) => {
    setCurrentPosition(pos);
    toast.success(`Position: ${pos}`, `Next alerts will appear at ${pos}`, {
      position: pos
    });
  };

  // Copy npm command
  const copyNpmCommand = () => {
    navigator.clipboard.writeText('npm install notiva');
    setNpmCopied(true);
    toast.success('Copied to clipboard!', 'npm install notiva', { duration: 2500 });
    setTimeout(() => setNpmCopied(false), 2000);
  };

  // Promise Toast Demo
  const triggerPromiseToast = () => {
    const mockApiCall = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.3 ? resolve({ user: 'Alex Morgan' }) : reject('Network timeout');
      }, 2200);
    });

    toast.promise(mockApiCall, {
      position: currentPosition,
      loading: 'Contacting API server...',
      success: (data) => `Data for ${data.user} successfully loaded!`,
      error: (err) => `Failed: ${err}`
    });
  };

  // Stacking 3x Toast
  const triggerStackingToast = () => {
    toast.info('Queue Item #1', 'Reading configuration files...', { position: currentPosition });
    setTimeout(() => {
      toast.warning('Queue Item #2', 'Admin authorization required', { position: currentPosition });
    }, 300);
    setTimeout(() => {
      toast.success('Queue Item #3', 'Transaction invoice generated.', { position: currentPosition });
    }, 600);
  };

  // Action Button Toast
  const triggerActionToast = () => {
    toast('Order #9482 Created', 'Please complete payment within 24 hours.', {
      position: currentPosition,
      icon: 'info',
      action: {
        label: 'Pay Now',
        onClick: () => toast.success('Opening payment gateway...')
      },
      cancel: {
        label: 'Dismiss',
        onClick: () => {}
      }
    });
  };

  // Universal Object Syntax Toast
  const triggerObjectToast = () => {
    toast.fire({
      title: 'Universal Object Syntax',
      text: 'Call toast.fire() with clean options across any framework.',
      icon: 'success',
      position: currentPosition,
      duration: 3500
    });
  };

  // Confirm Modal: Danger Delete
  const triggerConfirmDanger = async () => {
    const confirmed = await toast.confirm({
      title: 'Delete User Account?',
      text: 'All associated customer data and transaction logs will be permanently removed.',
      icon: 'warning',
      position: 'center',
      confirmButtonText: 'Yes, Delete Account',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#ef4444',
      backdrop: chkBackdrop,
      backdropBlur: chkBackdropBlur
    });

    if (confirmed) {
      toast.success('Account deleted successfully.');
    } else {
      toast.info('Deletion cancelled.');
    }
  };

  // Confirm Modal: Custom Action
  const triggerConfirmCustom = async () => {
    const confirmed = await toast.confirm({
      title: 'Upgrade to Pro Plan?',
      text: 'Unlock unlimited API bandwidth, custom domains, and 24/7 dedicated priority support.',
      icon: 'question',
      position: 'center',
      confirmButtonText: 'Upgrade Now ($19/mo)',
      cancelButtonText: 'Maybe Later',
      confirmButtonColor: '#6366f1',
      backdrop: chkBackdrop,
      backdropBlur: chkBackdropBlur
    });

    if (confirmed) {
      toast.success('Welcome to Notiva Pro!');
    }
  };

  // Prompt Modal Dialog
  const triggerPromptDialog = async () => {
    const reason = await toast.prompt({
      title: 'Reason for Cancellation',
      text: 'Please provide feedback to help us improve our services:',
      placeholder: 'e.g. Switching to another service...',
      required: true,
      backdrop: chkBackdrop,
      backdropBlur: chkBackdropBlur
    });

    if (reason) {
      toast.success('Feedback Received', `"${reason}"`);
    }
  };

  // Custom VIP Studio Alert
  const triggerCustomAlertStudio = () => {
    toast.fire({
      title: 'VIP Exclusive Alert',
      text: 'This alert is styled with custom color overrides defined in the studio.',
      icon: 'success',
      iconColor: colorAccent,
      position: currentPosition,
      background: colorBg,
      color: '#f8fafc',
      borderColor: colorAccent,
      actionColor: colorAccent,
      backdrop: chkBackdrop,
      backdropBlur: chkBackdropBlur,
      duration: 5000,
      action: {
        label: 'Claim Reward',
        onClick: () => toast.success('Reward claimed!')
      }
    });
  };

  // Code Snippets Text
  const getCodeSnippet = () => {
    if (codeTab === 'react') {
      return `// React & Next.js (App Router / Pages Router)
'use client';
import { toast } from 'notiva';
import 'notiva/dist/notiva.css';

export default function MyComponent() {
  const showToast = () => {
    toast.success('Changes Saved!', 'Your profile is up to date.', {
      position: '${currentPosition}',
      duration: 4000
    });
  };

  const handleConfirm = async () => {
    const ok = await toast.confirm({
      title: 'Confirm Action?',
      text: 'This action cannot be undone.',
      confirmButtonColor: '#ef4444'
    });
    if (ok) toast.success('Confirmed!');
  };

  return (
    <div className="space-x-3">
      <button onClick={showToast}>Show Toast</button>
      <button onClick={handleConfirm}>Delete</button>
    </div>
  );
}`;
    } else if (codeTab === 'vue') {
      return `<!-- Vue 3 / Nuxt 3 Component -->
<script setup>
import { toast } from 'notiva';
import 'notiva/dist/notiva.css';

const notify = () => {
  toast.success('Data Synced!', 'All changes pushed to remote server.', {
    position: '${currentPosition}'
  });
};

const askDelete = async () => {
  const isConfirmed = await toast.confirm({
    title: 'Delete Record?',
    confirmButtonColor: '#ef4444'
  });
  if (isConfirmed) toast.success('Deleted!');
};
</script>

<template>
  <button @click="notify">Save</button>
  <button @click="askDelete">Delete</button>
</template>`;
    } else if (codeTab === 'svelte') {
      return `<!-- Svelte / SvelteKit Component -->
<script>
  import { toast } from 'notiva';
  import 'notiva/dist/notiva.css';

  function showNotification() {
    toast.info('Svelte Ready!', 'Ultra-fast reactivity with Notiva.', {
      position: '${currentPosition}'
    });
  }
</script>

<button on:click={showNotification}>Trigger Toast</button>`;
    } else if (codeTab === 'laravel') {
      return `// 1. In your Laravel Controller:
use Notiva\\Toast;

public function update(Request $request) {
    // ... update logic ...
    Toast::success('Profile Updated Successfully!');
    return redirect()->back();
}

// 2. In your Blade layout (resources/views/layouts/app.blade.php):
<head>
  <link rel="stylesheet" href="/dist/notiva.css">
</head>
<body>
  @yield('content')

  <script src="/dist/notiva.js"><\/script>
  {!! \\Notiva\\Toast::render() !!}
</body>`;
    } else if (codeTab === 'vanilla') {
      return `<!-- Vanilla HTML / PHP Native -->
<link rel="stylesheet" href="./dist/notiva.css">
<script src="./dist/notiva.js"><\/script>

<script>
  // Simple notification
  toast.success('Welcome Back!', 'Session initialized successfully.', {
    position: '${currentPosition}'
  });

  // Async Confirm Modal
  async function confirmAction() {
    const ok = await toast.confirm({
      title: 'Proceed with checkout?',
      icon: 'question'
    });
    if (ok) toast.success('Order placed!');
  }
<\/script>`;
    }
  };

  const copySnippet = () => {
    navigator.clipboard.writeText(getCodeSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const positions = [
    { id: 'top-left', label: '↖ Top Left' },
    { id: 'top-center', label: '↑ Top Center' },
    { id: 'top-right', label: '↗ Top Right' },
    { id: 'center-left', label: '← Center Left' },
    { id: 'center', label: '⦿ Center' },
    { id: 'center-right', label: '→ Center Right' },
    { id: 'bottom-left', label: '↙ Bottom Left' },
    { id: 'bottom-center', label: '↓ Bottom Center' },
    { id: 'bottom-right', label: '↘ Bottom Right' },
  ];

  return (
    <div className="relative min-h-screen">

      {/* Background Decorative Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] bg-pink-500/10 dark:bg-pink-600/15 rounded-full blur-3xl"></div>
      </div>

      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Brand */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('playground')}>
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/30">
                N
              </div>
              <div>
                <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
                  Notiva
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                    v1.0.0
                  </span>
                </span>
              </div>
            </div>

            {/* Center Nav Tabs */}
            <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/90 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
              <button 
                onClick={() => setActiveTab('playground')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'playground' 
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                ⚡ Interactive Demo
              </button>
              <button 
                onClick={() => setActiveTab('frameworks')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'frameworks' 
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                🌐 All Stacks
              </button>
              <button 
                onClick={() => setActiveTab('docs')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'docs' 
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                📖 Documentation
              </button>
              <button 
                onClick={() => setActiveTab('api')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'api' 
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                ⚙️ API & Types
              </button>
            </div>

            {/* Right Controls & Links */}
            <div className="flex items-center gap-2.5">
              {/* 3-Way Theme Switcher */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-0.5 rounded-xl">
                <button 
                  onClick={() => handleThemeChange('light')}
                  title="Light Mode"
                  className={`p-1.5 rounded-lg text-xs transition ${theme === 'light' ? 'bg-white dark:bg-slate-800 text-amber-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  ☀️
                </button>
                <button 
                  onClick={() => handleThemeChange('dark')}
                  title="Dark Mode"
                  className={`p-1.5 rounded-lg text-xs transition ${theme === 'dark' ? 'bg-white dark:bg-slate-800 text-indigo-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  🌙
                </button>
                <button 
                  onClick={() => handleThemeChange('system')}
                  title="System OS Mode"
                  className={`p-1.5 rounded-lg text-xs transition ${theme === 'system' ? 'bg-white dark:bg-slate-800 text-indigo-400 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  💻
                </button>
              </div>

              {/* GitHub Link */}
              <a 
                href="https://github.com/muhabibabd/notiva" 
                target="_blank" 
                rel="noreferrer"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500 transition shadow-sm"
                title="View GitHub Repository"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
              </a>
            </div>

          </div>
        </div>
      </nav>

      {/* Main Layout Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        
        {/* Hero Header Banner */}
        <header className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Works Everywhere — Pure DOM & Zero Dependencies
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Modern Toast & Modal for <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">All Web Stacks</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            A lightweight, versatile notification engine featuring <b>smooth 3D stacking physics</b>, <b>9 positions</b>, <b>backdrop blur</b>, and <b>async confirm dialogs</b>. Works seamlessly with React, Vue, Svelte, Next.js, Laravel, and Vanilla JS.
          </p>

          {/* Install CLI Box & Primary Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <div 
              onClick={copyNpmCommand}
              className="flex items-center gap-3 px-4 py-2.5 bg-slate-900 dark:bg-slate-900/90 text-slate-200 border border-slate-800 rounded-2xl shadow-xl cursor-pointer hover:border-indigo-500 transition group font-mono text-xs"
            >
              <span className="text-indigo-400 font-bold">$</span>
              <span>npm install notiva</span>
              <span className="ml-2 px-2 py-0.5 rounded-lg bg-slate-800 text-[10px] text-slate-400 group-hover:text-white transition">
                {npmCopied ? 'Copied! ✓' : 'Copy'}
              </span>
            </div>

            <a 
              href="https://notiva.habibabdillah.my.id"
              className="px-5 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>Official Homepage</span>
              <span>↗</span>
            </a>
          </div>
        </header>

        {/* Navigation Sub-Tabs for Mobile */}
        <div className="flex md:hidden items-center justify-center gap-1 mb-8 overflow-x-auto pb-2">
          <button onClick={() => setActiveTab('playground')} className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap ${activeTab === 'playground' ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>Demo</button>
          <button onClick={() => setActiveTab('frameworks')} className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap ${activeTab === 'frameworks' ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>All Stacks</button>
          <button onClick={() => setActiveTab('docs')} className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap ${activeTab === 'docs' ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>Docs</button>
          <button onClick={() => setActiveTab('api')} className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap ${activeTab === 'api' ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>API</button>
        </div>

        {/* TAB 1: INTERACTIVE PLAYGROUND */}
        {activeTab === 'playground' && (
          <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* 9 POSITIONS PAD */}
              <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-xl dark:shadow-2xl backdrop-blur-xl transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="flex h-3 w-3 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-indigo-500"></span>
                      </span>
                      9 Notification Positions
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Click any position to reposition the viewport container and trigger a test toast.</p>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-300 rounded-xl border border-indigo-500/30 font-semibold">
                    {currentPosition}
                  </span>
                </div>

                {/* 3x3 Grid */}
                <div className="grid grid-cols-3 gap-2.5 max-w-md mx-auto p-3 bg-slate-100/80 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800/50">
                  {positions.map(pos => (
                    <button
                      key={pos.id}
                      onClick={() => handlePositionChange(pos.id)}
                      className={`p-3 rounded-xl border text-xs font-medium transition text-center shadow-sm ${
                        currentPosition === pos.id
                          ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-600/20 text-indigo-600 dark:text-indigo-300 font-bold'
                          : 'border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900/80 hover:border-indigo-400 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <span className="block text-[10.5px] uppercase font-mono">{pos.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* TOAST VARIANTS & STACKING */}
              <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-xl dark:shadow-2xl backdrop-blur-xl transition-colors">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Toast Types & Stacking Physics</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Supports 3D depth cards, swipe-to-dismiss, and hover-to-expand.</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <button 
                    onClick={() => toast.success('Saved Successfully!', 'Your profile changes are now live.')}
                    className="p-3.5 bg-emerald-50 dark:bg-emerald-500/10 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 border border-emerald-300 dark:border-emerald-500/30 text-emerald-700 dark:text-emerald-400 rounded-2xl text-xs font-semibold text-left transition flex items-center gap-2.5 shadow-sm"
                  >
                    <span className="p-1.5 rounded-lg bg-emerald-500/20 font-bold">✓</span>
                    <span>Success Toast</span>
                  </button>

                  <button 
                    onClick={() => toast.error('Failed to Process', 'Database connection timed out.')}
                    className="p-3.5 bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 border border-rose-300 dark:border-rose-500/30 text-rose-700 dark:text-rose-400 rounded-2xl text-xs font-semibold text-left transition flex items-center gap-2.5 shadow-sm"
                  >
                    <span className="p-1.5 rounded-lg bg-rose-500/20 font-bold">✕</span>
                    <span>Error Toast</span>
                  </button>

                  <button 
                    onClick={() => toast.warning('Storage Warning', 'Disk usage exceeded 90% threshold.')}
                    className="p-3.5 bg-amber-50 dark:bg-amber-500/10 hover:bg-amber-100 dark:hover:bg-amber-500/20 border border-amber-300 dark:border-amber-500/30 text-amber-700 dark:text-amber-400 rounded-2xl text-xs font-semibold text-left transition flex items-center gap-2.5 shadow-sm"
                  >
                    <span className="p-1.5 rounded-lg bg-amber-500/20 font-bold">!</span>
                    <span>Warning Toast</span>
                  </button>

                  <button 
                    onClick={() => toast.info('System Update', 'New release v1.0.0 is available.')}
                    className="p-3.5 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-100 dark:hover:bg-blue-500/20 border border-blue-300 dark:border-blue-500/30 text-blue-700 dark:text-blue-400 rounded-2xl text-xs font-semibold text-left transition flex items-center gap-2.5 shadow-sm"
                  >
                    <span className="p-1.5 rounded-lg bg-blue-500/20 font-bold">ℹ</span>
                    <span>Info Toast</span>
                  </button>

                  <button 
                    onClick={triggerPromiseToast}
                    className="p-3.5 bg-indigo-50 dark:bg-indigo-500/10 hover:bg-indigo-100 dark:hover:bg-indigo-500/20 border border-indigo-300 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-400 rounded-2xl text-xs font-semibold text-left transition flex items-center gap-2.5 shadow-sm"
                  >
                    <span className="p-1.5 rounded-lg bg-indigo-500/20 font-bold">⚡</span>
                    <span>Promise Toast</span>
                  </button>

                  <button 
                    onClick={triggerStackingToast}
                    className="p-3.5 bg-purple-50 dark:bg-purple-500/10 hover:bg-purple-100 dark:hover:bg-purple-500/20 border border-purple-300 dark:border-purple-500/30 text-purple-700 dark:text-purple-400 rounded-2xl text-xs font-semibold text-left transition flex items-center gap-2.5 shadow-sm"
                  >
                    <span className="p-1.5 rounded-lg bg-purple-500/20 font-bold">📚</span>
                    <span>Spawn 3x Stacks</span>
                  </button>
                </div>

                {/* Secondary Actions */}
                <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800/80 flex flex-wrap gap-3">
                  <button 
                    onClick={triggerActionToast}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold transition"
                  >
                    Toast with Action & Cancel Buttons
                  </button>
                  <button 
                    onClick={triggerObjectToast}
                    className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-semibold transition"
                  >
                    Universal `toast.fire()` Format
                  </button>
                </div>
              </div>

              {/* CONFIRM & PROMPT MODALS */}
              <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-xl dark:shadow-2xl backdrop-blur-xl transition-colors">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Confirm Modals & Dialogs (Promise Async/Await)</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Built-in dialog replacements returning boolean or user input string via clean async/await.</p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button 
                    onClick={triggerConfirmDanger}
                    className="p-4 rounded-2xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-lg shadow-rose-600/30 dark:shadow-rose-900/30 transition flex flex-col items-center text-center gap-2"
                  >
                    <span className="text-lg">🗑</span>
                    <span>Confirm Delete (Danger)</span>
                  </button>

                  <button 
                    onClick={triggerConfirmCustom}
                    className="p-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-lg shadow-indigo-600/30 dark:shadow-indigo-900/30 transition flex flex-col items-center text-center gap-2"
                  >
                    <span className="text-lg">✨</span>
                    <span>Confirm Action (Indigo)</span>
                  </button>

                  <button 
                    onClick={triggerPromptDialog}
                    className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 font-semibold text-xs transition flex flex-col items-center text-center gap-2"
                  >
                    <span className="text-lg">📝</span>
                    <span>Prompt Text Input</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Right Column: Customizer & Code Generator (5 Cols) */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* LIVE CUSTOMIZER */}
              <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-xl dark:shadow-2xl backdrop-blur-xl transition-colors">
                <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-1">Customizer Studio</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Configure backdrop overlay, glassmorphism blur, and override per-alert colors.</p>

                <div className="space-y-4">
                  {/* Backdrop Toggle */}
                  <div className="flex items-center justify-between p-3 bg-slate-100/80 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">Backdrop Overlay</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">Darken background when modal is active</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={chkBackdrop} 
                      onChange={(e) => setChkBackdrop(e.target.checked)} 
                      className="w-5 h-5 rounded accent-indigo-600 cursor-pointer" 
                    />
                  </div>

                  {/* Backdrop Blur Toggle */}
                  <div className="flex items-center justify-between p-3 bg-slate-100/80 dark:bg-slate-950/60 rounded-2xl border border-slate-200 dark:border-slate-800">
                    <div>
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 block">Backdrop Blur (Glassmorphism)</span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">Frosted glass blur effect</span>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={chkBackdropBlur} 
                      onChange={(e) => setChkBackdropBlur(e.target.checked)} 
                      className="w-5 h-5 rounded accent-indigo-600 cursor-pointer" 
                    />
                  </div>

                  {/* Custom Colors */}
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-1.5">Card Background</label>
                      <div className="flex items-center gap-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2 shadow-sm">
                        <input 
                          type="color" 
                          value={colorBg} 
                          onChange={(e) => setColorBg(e.target.value)} 
                          className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent" 
                        />
                        <span className="text-xs font-mono text-slate-700 dark:text-slate-300">{colorBg}</span>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block mb-1.5">Accent Color</label>
                      <div className="flex items-center gap-2 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-2 shadow-sm">
                        <input 
                          type="color" 
                          value={colorAccent} 
                          onChange={(e) => setColorAccent(e.target.value)} 
                          className="w-6 h-6 rounded border-0 cursor-pointer bg-transparent" 
                        />
                        <span className="text-xs font-mono text-slate-700 dark:text-slate-300">{colorAccent}</span>
                      </div>
                    </div>
                  </div>

                  {/* Trigger Custom Button */}
                  <button 
                    onClick={triggerCustomAlertStudio}
                    className="w-full mt-3 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-2xl shadow-lg shadow-indigo-600/30 transition transform hover:-translate-y-0.5"
                  >
                    🔥 Trigger This Custom Alert Now!
                  </button>
                </div>
              </div>

              {/* CODE SNIPPET GENERATOR */}
              <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800/80 rounded-3xl p-6 shadow-xl dark:shadow-2xl backdrop-blur-xl transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white">Live Code Snippet</h2>
                  <button 
                    onClick={copySnippet}
                    className="text-xs px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-indigo-600 dark:text-indigo-300 rounded-lg transition font-medium border border-slate-200 dark:border-slate-700"
                  >
                    {copied ? 'Copied! ✓' : 'Copy Code'}
                  </button>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-3 border-b border-slate-200 dark:border-slate-800 pb-2 text-xs overflow-x-auto">
                  {['react', 'vue', 'svelte', 'laravel', 'vanilla'].map(tab => (
                    <button
                      key={tab}
                      onClick={() => setCodeTab(tab)}
                      className={`font-semibold pb-1 px-2 uppercase text-[11px] ${
                        codeTab === tab
                          ? 'text-indigo-600 dark:text-indigo-400 border-b-2 border-indigo-500'
                          : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <pre className="bg-slate-900 dark:bg-slate-950 p-4 rounded-2xl border border-slate-800 text-[11.5px] text-slate-200 overflow-x-auto leading-relaxed">
                  <code>{getCodeSnippet()}</code>
                </pre>
              </div>

            </div>

          </main>
        )}

        {/* TAB 2: FRAMEWORK GUIDES */}
        {activeTab === 'frameworks' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Support Across Every Web Stack</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Notiva operates directly via the DOM without Virtual DOM locking. Copy the starter snippet for your framework below.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* React / Next.js */}
              <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">⚛️</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">React & Next.js</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Works in Next.js App Router (client component), Pages Router, Remix, and Vite React.</p>
                <pre className="bg-slate-900 dark:bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-200 overflow-x-auto">
                  <code>{`'use client';
import { toast } from 'notiva';
import 'notiva/dist/notiva.css';

export default function Button() {
  return (
    <button onClick={() => toast.success('React Action!')}>
      Click Me
    </button>
  );
}`}</code>
                </pre>
              </div>

              {/* Vue / Nuxt */}
              <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">💚</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Vue 3 & Nuxt 3</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Clean Composition API integration with zero reactive wrappers needed.</p>
                <pre className="bg-slate-900 dark:bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-200 overflow-x-auto">
                  <code>{`<script setup>
import { toast } from 'notiva';
import 'notiva/dist/notiva.css';

const save = () => toast.success('Vue Synced!');
</script>

<template>
  <button @click="save">Save</button>
</template>`}</code>
                </pre>
              </div>

              {/* Svelte / SvelteKit */}
              <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🧡</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Svelte & SvelteKit</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Native performance in Svelte components and SvelteKit endpoints.</p>
                <pre className="bg-slate-900 dark:bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-200 overflow-x-auto">
                  <code>{`<script>
  import { toast } from 'notiva';
  import 'notiva/dist/notiva.css';
</script>

<button on:click={() => toast.info('Svelte Action!')}>
  Notify
</button>`}</code>
                </pre>
              </div>

              {/* Laravel Blade & PHP */}
              <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">🐘</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Laravel & PHP Native</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">Includes Session Flash helper class for Controllers and Blade render helper.</p>
                <pre className="bg-slate-900 dark:bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-200 overflow-x-auto">
                  <code>{`// In Controller:
\\Notiva\\Toast::success('Profile updated!');

// In Blade:
<link rel="stylesheet" href="/dist/notiva.css">
<script src="/dist/notiva.js"><\/script>
{!! \\Notiva\\Toast::render() !!}`}</code>
                </pre>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: DOCUMENTATION */}
        {activeTab === 'docs' && (
          <div className="space-y-8 max-w-4xl mx-auto bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl backdrop-blur-xl">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Getting Started with Notiva</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Everything you need to configure and master toast notifications and dialog modals.</p>
            </div>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Section 1: Installation */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">1. Installation</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Install via your favorite package manager or include static dist files:</p>
              <pre className="bg-slate-900 dark:bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs text-slate-200">
                <code>npm install notiva # or yarn add notiva / pnpm add notiva / bun add notiva</code>
              </pre>
            </div>

            {/* Section 2: Global Configuration */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">2. Global Configuration (`toast.config()`)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Set default parameters once during application bootstrap:</p>
              <pre className="bg-slate-900 dark:bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 overflow-x-auto">
                <code>{`toast.config({
  position: 'top-right',      // Default 9-position anchor
  duration: 4000,             // Auto dismiss timeout (ms)
  theme: 'system',            // 'light' | 'dark' | 'system'
  backdrop: false,            // Enable background overlay
  backdropBlur: true,         // Enable glassmorphism blur
  progressBar: true,          // Progress bar timer
  closeButton: true,          // 'X' button
  colors: {
    primary: '#6366f1',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  }
});`}</code>
              </pre>
            </div>

            {/* Section 3: Modals */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">3. Confirm & Prompt Modals (Async/Await)</h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">Modern Promise-based dialogs that integrate directly with async controller logic:</p>
              <pre className="bg-slate-900 dark:bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-200 overflow-x-auto">
                <code>{`// Boolean Confirm Dialog
const isConfirmed = await toast.confirm({
  title: 'Delete this file?',
  text: 'This action cannot be undone.',
  icon: 'warning',
  confirmButtonText: 'Yes, Delete',
  confirmButtonColor: '#ef4444'
});

if (isConfirmed) {
  // Execute deletion logic
}

// Text Input Prompt Dialog
const username = await toast.prompt({
  title: 'Enter Member Name',
  placeholder: 'Full Name...',
  required: true
});`}</code>
              </pre>
            </div>

          </div>
        )}

        {/* TAB 4: API REFERENCE */}
        {activeTab === 'api' && (
          <div className="space-y-8 max-w-4xl mx-auto bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl backdrop-blur-xl">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">API Reference & TypeScript Types</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Comprehensive parameters and TypeScript definitions for Notiva methods.</p>
            </div>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Table: Toast Methods */}
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">Methods</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold">
                      <th className="py-2.5 px-3">Method</th>
                      <th className="py-2.5 px-3">Parameters</th>
                      <th className="py-2.5 px-3">Return</th>
                      <th className="py-2.5 px-3">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-mono">
                    <tr>
                      <td className="py-2.5 px-3 text-indigo-500 font-bold">toast(title, text?, opts?)</td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">string, string, object</td>
                      <td className="py-2.5 px-3 text-emerald-500">string</td>
                      <td className="py-2.5 px-3 font-sans text-slate-600 dark:text-slate-300">Spawns a default toast notification.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-indigo-500 font-bold">toast.success / error / warning / info</td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">string, string, object</td>
                      <td className="py-2.5 px-3 text-emerald-500">string</td>
                      <td className="py-2.5 px-3 font-sans text-slate-600 dark:text-slate-300">Status toast with corresponding theme icon.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-indigo-500 font-bold">toast.promise(promise, opts)</td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">Promise, object</td>
                      <td className="py-2.5 px-3 text-emerald-500">Promise</td>
                      <td className="py-2.5 px-3 font-sans text-slate-600 dark:text-slate-300">Tracks async promise through loading, success, error.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-indigo-500 font-bold">toast.confirm(opts)</td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">ConfirmOptions</td>
                      <td className="py-2.5 px-3 text-emerald-500">Promise&lt;boolean&gt;</td>
                      <td className="py-2.5 px-3 font-sans text-slate-600 dark:text-slate-300">Modal dialog resolving true on confirm or false.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-indigo-500 font-bold">toast.prompt(opts)</td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">PromptOptions</td>
                      <td className="py-2.5 px-3 text-emerald-500">Promise&lt;string|null&gt;</td>
                      <td className="py-2.5 px-3 font-sans text-slate-600 dark:text-slate-300">Text input dialog resolving with string value.</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 text-indigo-500 font-bold">toast.setTheme(theme)</td>
                      <td className="py-2.5 px-3 text-slate-600 dark:text-slate-300">'light' | 'dark' | 'system'</td>
                      <td className="py-2.5 px-3 text-emerald-500">void</td>
                      <td className="py-2.5 px-3 font-sans text-slate-600 dark:text-slate-300">Switches theme mode dynamically.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Global Footer */}
        <footer className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-800/80 text-center text-xs text-slate-500 space-y-2">
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <a href="https://notiva.habibabdillah.my.id" className="hover:text-indigo-500 transition">Homepage</a>
            <span>•</span>
            <a href="https://github.com/muhabibabd/notiva" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition">GitHub Repo</a>
            <span>•</span>
            <a href="https://www.npmjs.com/package/notiva" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition">NPM Package</a>
          </div>
          <p>© 2026 Notiva — Crafted by <b>Habib Abdillah</b>. MIT Licensed.</p>
        </footer>

      </div>

    </div>
  );
}
