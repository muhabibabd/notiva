import React, { useState, useEffect } from 'react';
import { toast } from '../dist/notiva.esm.js';

export default function App() {
  const [activeTab, setActiveTab] = useState('examples'); // 'examples' | 'positions' | 'frameworks' | 'params' | 'api'
  const [currentPosition, setCurrentPosition] = useState('top-right');
  const [theme, setTheme] = useState('system');
  const [npmCopied, setNpmCopied] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState(null);
  const [paramFilter, setParamFilter] = useState('all');
  const [searchParam, setSearchParam] = useState('');

  // Synchronize HTML dark/light class with Theme state and OS scheme
  useEffect(() => {
    const updateTheme = () => {
      const isSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (theme === 'system') {
        if (isSystemDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    updateTheme();

    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleOsChange = () => {
        if (theme === 'system') updateTheme();
      };
      mediaQuery.addEventListener('change', handleOsChange);
      return () => mediaQuery.removeEventListener('change', handleOsChange);
    }
  }, [theme]);

  // Switch Theme
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    toast.setTheme(newTheme);
    toast.info('Theme Changed', `Active theme: ${newTheme.toUpperCase()}`, { duration: 2000 });
  };

  // Copy NPM command
  const copyNpm = () => {
    navigator.clipboard.writeText('npm install notiva');
    setNpmCopied(true);
    toast.success('Copied to clipboard!', 'npm install notiva', { duration: 2000 });
    setTimeout(() => setNpmCopied(false), 2000);
  };

  // Copy individual snippet
  const copySnippet = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    toast.success('Code copied to clipboard!');
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // 9 Positions array
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

  // SweetAlert2-Style Examples List
  const examples = [
    {
      id: 'basic',
      title: 'A basic message',
      desc: 'Simple, clean notification with default timing and physics.',
      code: `toast('Hello world!');`,
      action: () => {
        toast('Hello world!', { position: currentPosition });
      }
    },
    {
      id: 'title-text',
      title: 'A title with a text under',
      desc: 'Title plus descriptive message body for rich notifications.',
      code: `toast('The Internet?', 'That thing is still around?');`,
      action: () => {
        toast('The Internet?', 'That thing is still around?', { position: currentPosition });
      }
    },
    {
      id: 'status-error',
      title: 'An error status notification',
      desc: 'Displays an animated error icon with high-contrast alert styling.',
      code: `toast.error('Oops...', 'Something went wrong!');`,
      action: () => {
        toast.error('Oops...', 'Something went wrong!', { position: currentPosition });
      }
    },
    {
      id: 'status-success',
      title: 'A success message with progress timer',
      desc: 'Displays a success badge and an animated auto-dismiss countdown bar.',
      code: `toast.success('Signed in successfully', 'Redirecting to your dashboard...', {
  duration: 3500,
  progressBar: true
});`,
      action: () => {
        toast.success('Signed in successfully', 'Redirecting to your dashboard...', {
          position: currentPosition,
          duration: 3500,
          progressBar: true
        });
      }
    },
    {
      id: 'promise',
      title: 'A Promise state handler (Async Request)',
      desc: 'Automatically transitions from loading spinner to success or error upon Promise resolution.',
      code: `const fetchUserData = new Promise((resolve) => 
  setTimeout(() => resolve({ name: 'Alex Morgan' }), 2000)
);

toast.promise(fetchUserData, {
  loading: 'Fetching user profile...',
  success: (data) => \`Welcome back, \${data.name}!\`,
  error: 'Failed to load profile'
});`,
      action: () => {
        const fetchUserData = new Promise((resolve, reject) => {
          setTimeout(() => {
            Math.random() > 0.2 ? resolve({ name: 'Alex Morgan' }) : reject('Network timeout');
          }, 2000);
        });

        toast.promise(fetchUserData, {
          position: currentPosition,
          loading: 'Fetching user profile from server...',
          success: (data) => `Welcome back, ${data.name}!`,
          error: (err) => `Failed: ${err}`
        });
      }
    },
    {
      id: 'confirm',
      title: 'A confirm dialog with async action handler',
      desc: 'Promise-based modal replacement for native confirm() that returns boolean true or false.',
      code: `const isConfirmed = await toast.confirm({
  title: 'Are you sure?',
  text: "You won't be able to revert this!",
  icon: 'warning',
  position: 'center',
  confirmButtonText: 'Yes, delete it!',
  cancelButtonText: 'Cancel',
  confirmButtonColor: '#ef4444'
});

if (isConfirmed) {
  toast.success('Deleted!', 'Your file has been deleted.');
}`,
      action: async () => {
        const isConfirmed = await toast.confirm({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          position: 'center',
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'Cancel',
          confirmButtonColor: '#ef4444',
          backdrop: true,
          backdropBlur: true
        });

        if (isConfirmed) {
          toast.success('Deleted!', 'Your file has been deleted.');
        } else {
          toast.info('Cancelled', 'Your file is safe.');
        }
      }
    },
    {
      id: 'prompt',
      title: 'A prompt dialog asking for text input',
      desc: 'Modal dialog returning the user input string or null if cancelled.',
      code: `const name = await toast.prompt({
  title: 'What is your name?',
  placeholder: 'Enter your full name',
  required: true
});

if (name) {
  toast.success(\`Hello, \${name}!\`);
}`,
      action: async () => {
        const name = await toast.prompt({
          title: 'What is your name?',
          placeholder: 'Enter your full name...',
          required: true,
          backdrop: true,
          backdropBlur: true
        });

        if (name) {
          toast.success(`Hello, ${name}!`, 'Welcome to Notiva.');
        }
      }
    },
    {
      id: 'backdrop-blur',
      title: 'Custom backdrop overlay & glassmorphism blur',
      desc: 'Darkens the page background with an aesthetic frosted-glass blur filter.',
      code: `toast.fire({
  title: 'Glassmorphism Backdrop',
  text: 'Background is blurred with frosted glass styling.',
  icon: 'info',
  backdrop: true,
  backdropBlur: true,
  duration: 4000
});`,
      action: () => {
        toast.fire({
          title: 'Glassmorphism Backdrop',
          text: 'Background is blurred with frosted glass styling.',
          icon: 'info',
          position: currentPosition,
          backdrop: true,
          backdropBlur: true,
          duration: 4000
        });
      }
    },
    {
      id: 'action-button',
      title: 'Toast with Action & Cancel buttons',
      desc: 'Embed inline interactive buttons directly inside the notification body.',
      code: `toast('Order #9482 Placed', 'Payment pending verification.', {
  action: {
    label: 'Pay Now',
    onClick: () => toast.success('Redirecting to checkout...')
  },
  cancel: {
    label: 'Later',
    onClick: () => {}
  }
});`,
      action: () => {
        toast('Order #9482 Placed', 'Payment pending verification.', {
          position: currentPosition,
          icon: 'info',
          action: {
            label: 'Pay Now',
            onClick: () => toast.success('Redirecting to checkout...')
          },
          cancel: {
            label: 'Later',
            onClick: () => {}
          }
        });
      }
    },
    {
      id: 'stacking',
      title: '3D Stacking Physics (Multiple active toasts)',
      desc: 'Spawns 3 toasts that stack gracefully with depth. Hover over them to expand the list!',
      code: `toast.info('Step 1/3: Reading configuration...');
toast.warning('Step 2/3: Authorization required.');
toast.success('Step 3/3: Database synchronized!');`,
      action: () => {
        toast.info('Step 1/3: Reading configuration...', { position: currentPosition });
        setTimeout(() => {
          toast.warning('Step 2/3: Authorization required.', { position: currentPosition });
        }, 250);
        setTimeout(() => {
          toast.success('Step 3/3: Database synchronized!', { position: currentPosition });
        }, 500);
      }
    }
  ];

  // Comprehensive Configuration Parameters Dictionary
  const configParams = [
    // Toast Options
    { category: 'toast', name: 'title', type: 'string', default: 'undefined', desc: 'Main heading text displayed prominently at the top of the toast.' },
    { category: 'toast', name: 'text', type: 'string', default: 'undefined', desc: 'Secondary descriptive message body or explanation text.' },
    { category: 'toast', name: 'icon', type: "'success' | 'error' | 'warning' | 'info' | 'question' | false", default: 'undefined', desc: 'Status icon badge displayed on the left side of the toast.' },
    { category: 'toast', name: 'position', type: "'top-left' | 'top-center' | 'top-right' | 'center-left' | 'center' | 'center-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'", default: "'top-right'", desc: 'Viewport anchor position where notifications spawn and stack.' },
    { category: 'toast', name: 'duration', type: 'number', default: '4000', desc: 'Auto-dismiss timer in milliseconds. Set to 0 to keep notification persistent until closed manually.' },
    { category: 'toast', name: 'theme', type: "'light' | 'dark' | 'system'", default: "'system'", desc: 'Color scheme appearance mode. System mode dynamically responds to OS changes.' },
    { category: 'toast', name: 'progressBar', type: 'boolean', default: 'true', desc: 'Shows animated countdown progress bar at the bottom edge of the toast.' },
    { category: 'toast', name: 'closeButton', type: 'boolean', default: 'true', desc: 'Displays an interactive "X" dismissal button in the top right corner.' },
    { category: 'toast', name: 'draggable', type: 'boolean', default: 'true', desc: 'Enables mouse drag and touch swipe gesture physics to dismiss the toast.' },
    { category: 'toast', name: 'pauseOnHover', type: 'boolean', default: 'true', desc: 'Pauses the auto-dismiss timer whenever the mouse cursor hovers over the toast.' },
    { category: 'toast', name: 'backdrop', type: 'boolean | string', default: 'false', desc: 'Adds a full-screen dimmed overlay behind the toast. Can be a boolean or custom color string.' },
    { category: 'toast', name: 'backdropBlur', type: 'boolean', default: 'true', desc: 'Applies frosted-glass blur (glassmorphism) behind the backdrop overlay.' },
    { category: 'toast', name: 'background', type: 'string (CSS Color)', default: 'undefined', desc: 'Custom card background color override (e.g. "#1e1b4b").' },
    { category: 'toast', name: 'color', type: 'string (CSS Color)', default: 'undefined', desc: 'Custom text color override for title and description.' },
    { category: 'toast', name: 'borderColor', type: 'string (CSS Color)', default: 'undefined', desc: 'Custom border stroke color override.' },
    { category: 'toast', name: 'iconColor', type: 'string (CSS Color)', default: 'undefined', desc: 'Custom color override for the icon badge.' },
    { category: 'toast', name: 'action', type: '{ label: string, onClick: function, dismiss?: boolean }', default: 'undefined', desc: 'Primary action button embedded inside the toast body.' },
    { category: 'toast', name: 'cancel', type: '{ label: string, onClick: function }', default: 'undefined', desc: 'Secondary cancel or dismiss button embedded inside the toast body.' },
    { category: 'toast', name: 'actionColor', type: 'string (CSS Color)', default: 'undefined', desc: 'Custom background color for the primary action button.' },

    // Confirm Modal Options
    { category: 'confirm', name: 'title', type: 'string', default: "'Confirm'", desc: 'Main headline title for the modal dialog.' },
    { category: 'confirm', name: 'text', type: 'string', default: "''", desc: 'Explanatory description text for the confirmation action.' },
    { category: 'confirm', name: 'icon', type: "'warning' | 'question' | 'info' | 'error' | 'success'", default: "'warning'", desc: 'Large animated icon badge centered above the modal dialog text.' },
    { category: 'confirm', name: 'confirmButtonText', type: 'string', default: "'Confirm'", desc: 'Label text displayed inside the primary confirmation button.' },
    { category: 'confirm', name: 'cancelButtonText', type: 'string', default: "'Cancel'", desc: 'Label text displayed inside the secondary cancellation button.' },
    { category: 'confirm', name: 'confirmButtonColor', type: 'string (CSS Color)', default: "'#6366f1'", desc: 'Background color of confirm button (e.g. "#ef4444" for dangerous delete actions).' },
    { category: 'confirm', name: 'cancelButtonColor', type: 'string (CSS Color)', default: "'#94a3b8'", desc: 'Background color of cancel button.' },
    { category: 'confirm', name: 'backdrop', type: 'boolean', default: 'true', desc: 'Displays dark overlay behind modal dialog.' },
    { category: 'confirm', name: 'backdropBlur', type: 'boolean', default: 'true', desc: 'Applies frosted-glass blur filter to the page behind the modal.' },

    // Prompt Modal Options
    { category: 'prompt', name: 'title', type: 'string', default: "''", desc: 'Headline title for the prompt modal dialog.' },
    { category: 'prompt', name: 'placeholder', type: 'string', default: "'Type here...'", desc: 'Placeholder text shown inside the modal input field.' },
    { category: 'prompt', name: 'inputValue', type: 'string', default: "''", desc: 'Initial prefilled value inside the text input field.' },
    { category: 'prompt', name: 'inputType', type: "'text' | 'email' | 'password' | 'number'", default: "'text'", desc: 'HTML input field type for validation and formatting.' },
    { category: 'prompt', name: 'required', type: 'boolean', default: 'false', desc: 'Prevents form submission if user input is empty.' },
    { category: 'prompt', name: 'confirmButtonText', type: 'string', default: "'Submit'", desc: 'Label text for submit button.' },
    { category: 'prompt', name: 'cancelButtonText', type: 'string', default: "'Cancel'", desc: 'Label text for cancel button.' },

    // Promise Options
    { category: 'promise', name: 'loading', type: 'string', default: "'Loading...'", desc: 'Message displayed alongside spinning loader during pending Promise state.' },
    { category: 'promise', name: 'success', type: 'string | function(data)', default: "'Success!'", desc: 'Message string or dynamic formatter function called when Promise resolves.' },
    { category: 'promise', name: 'error', type: 'string | function(err)', default: "'Error!'", desc: 'Message string or dynamic formatter function called when Promise rejects.' },

    // Global Config Options
    { category: 'config', name: 'toast.config(options)', type: 'object', default: '{}', desc: 'Sets default properties globally across all subsequent toast invocations in the application.' }
  ];

  // Filter parameters by category and search keyword
  const filteredParams = configParams.filter(p => {
    const matchesCategory = paramFilter === 'all' || p.category === paramFilter;
    const matchesSearch = p.name.toLowerCase().includes(searchParam.toLowerCase()) || 
                          p.desc.toLowerCase().includes(searchParam.toLowerCase()) ||
                          p.type.toLowerCase().includes(searchParam.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative min-h-screen">
      
      {/* Background Decorative Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-[550px] h-[550px] bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-[550px] h-[550px] bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-[550px] h-[550px] bg-pink-500/10 dark:bg-pink-600/15 rounded-full blur-3xl"></div>
      </div>

      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('examples')}>
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

            {/* Nav Tabs */}
            <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-900/90 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
              <button 
                onClick={() => setActiveTab('examples')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'examples' 
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                ✨ Live Examples
              </button>
              <button 
                onClick={() => setActiveTab('params')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'params' 
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                📋 Configuration Params
              </button>
              <button 
                onClick={() => setActiveTab('positions')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'positions' 
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                🧭 9 Positions
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
                onClick={() => setActiveTab('api')}
                className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'api' 
                    ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                ⚙️ API
              </button>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2.5">
              {/* Theme Switcher */}
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

              {/* GitHub Star Button */}
              <a 
                href="https://github.com/muhabibabd/notiva" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500 transition text-xs font-semibold shadow-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"></path></svg>
                <span>GitHub</span>
              </a>
            </div>

          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        
        {/* Hero Header */}
        <header className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
            Zero Dependencies • Pure DOM • Under 10KB
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            A beautiful, responsive, customizable <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">popup & toast engine</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            The versatile replacement for JavaScript's popup boxes with smooth 3D stacking, 9 viewport positions, frosted glass blur, and async confirm dialogs.
          </p>

          {/* Quick Install CLI */}
          <div className="mt-8 flex items-center justify-center">
            <div 
              onClick={copyNpm}
              className="flex items-center gap-3 px-5 py-3 bg-slate-900 dark:bg-slate-900/90 text-slate-200 border border-slate-800 rounded-2xl shadow-2xl cursor-pointer hover:border-indigo-500 transition group font-mono text-sm"
            >
              <span className="text-indigo-400 font-bold">$</span>
              <span>npm install notiva</span>
              <span className="ml-3 px-2.5 py-1 rounded-lg bg-slate-800 text-xs text-slate-400 group-hover:text-white transition">
                {npmCopied ? 'Copied! ✓' : 'Copy'}
              </span>
            </div>
          </div>
        </header>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden items-center justify-center gap-1 mb-8 overflow-x-auto pb-2">
          <button onClick={() => setActiveTab('examples')} className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap ${activeTab === 'examples' ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>Examples</button>
          <button onClick={() => setActiveTab('params')} className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap ${activeTab === 'params' ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>Params</button>
          <button onClick={() => setActiveTab('positions')} className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap ${activeTab === 'positions' ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>9 Positions</button>
          <button onClick={() => setActiveTab('frameworks')} className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap ${activeTab === 'frameworks' ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>All Stacks</button>
          <button onClick={() => setActiveTab('api')} className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap ${activeTab === 'api' ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'}`}>API</button>
        </div>

        {/* =================================================================== */}
        {/* TAB 1: SWEETALERT2-STYLE LIVE EXAMPLES                              */}
        {/* =================================================================== */}
        {activeTab === 'examples' && (
          <div className="space-y-10 max-w-4xl mx-auto">
            
            {/* Global Position Pill for Examples */}
            <div className="flex items-center justify-between p-4 bg-white/80 dark:bg-slate-900/80 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">Active Anchor Position:</span>
                <span className="text-xs font-mono font-semibold px-2.5 py-1 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg border border-indigo-500/30">
                  {currentPosition}
                </span>
              </div>
              <button 
                onClick={() => setActiveTab('positions')}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
              >
                <span>Change Position</span>
                <span>→</span>
              </button>
            </div>

            {/* Examples List */}
            <div className="space-y-6">
              {examples.map((item, idx) => (
                <div 
                  key={item.id}
                  className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-xl dark:shadow-2xl backdrop-blur-xl transition hover:border-indigo-500/50"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
                    <div>
                      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs flex items-center justify-center font-mono">
                          {idx + 1}
                        </span>
                        {item.title}
                      </h2>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                    </div>

                    {/* Interactive Trigger Button */}
                    <button
                      onClick={item.action}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white font-bold text-xs rounded-xl shadow-md shadow-indigo-600/30 transition flex items-center justify-center gap-2 whitespace-nowrap self-start sm:self-auto"
                    >
                      <span>Try me!</span>
                      <span>▶</span>
                    </button>
                  </div>

                  {/* Code Snippet Box with Copy Button */}
                  <div className="relative group">
                    <button
                      onClick={() => copySnippet(item.code, item.id)}
                      className="absolute top-2.5 right-2.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-[11px] font-medium transition opacity-80 group-hover:opacity-100 border border-slate-700"
                    >
                      {copiedCodeId === item.id ? 'Copied! ✓' : 'Copy'}
                    </button>
                    <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800/80 text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed">
                      <code>{item.code}</code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 2: CONFIGURATION PARAMS (SWEETALERT2-STYLE TABLE)              */}
        {/* =================================================================== */}
        {activeTab === 'params' && (
          <div className="space-y-8 max-w-5xl mx-auto bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl backdrop-blur-xl">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500 text-lg">📋</span>
                  Configuration Parameters
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Full dictionary of options accepted by <code className="text-indigo-500 font-mono">toast()</code>, <code className="text-indigo-500 font-mono">toast.confirm()</code>, <code className="text-indigo-500 font-mono">toast.prompt()</code>, and <code className="text-indigo-500 font-mono">toast.config()</code>.
                </p>
              </div>

              {/* Search Filter Input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search param or description..."
                  value={searchParam}
                  onChange={(e) => setSearchParam(e.target.value)}
                  className="w-full sm:w-64 px-3.5 py-2 pl-9 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
                />
                <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
              </div>
            </div>

            {/* Filter Tabs by Category */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 text-xs">
              {[
                { id: 'all', label: 'All Parameters' },
                { id: 'toast', label: '🔔 Toast Options' },
                { id: 'confirm', label: '⚠️ Confirm Modal' },
                { id: 'prompt', label: '📝 Prompt Modal' },
                { id: 'promise', label: '⚡ Promise Toast' },
                { id: 'config', label: '⚙️ Global Config' }
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setParamFilter(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-semibold whitespace-nowrap transition ${
                    paramFilter === cat.id
                      ? 'bg-indigo-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100/80 dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                    <th className="py-3 px-4">Parameter</th>
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Default</th>
                    <th className="py-3 px-4">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white/50 dark:bg-slate-900/50">
                  {filteredParams.length > 0 ? (
                    filteredParams.map((p, idx) => (
                      <tr key={idx} className="hover:bg-indigo-50/40 dark:hover:bg-slate-800/40 transition">
                        {/* Param Name & Category Badge */}
                        <td className="py-3 px-4 font-mono font-bold text-indigo-600 dark:text-indigo-400 align-top whitespace-nowrap">
                          {p.name}
                          <span className="ml-2 text-[10px] font-sans font-semibold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase">
                            {p.category}
                          </span>
                        </td>

                        {/* Type */}
                        <td className="py-3 px-4 font-mono text-purple-600 dark:text-purple-400 align-top text-[11.5px] max-w-xs break-words">
                          {p.type}
                        </td>

                        {/* Default Value */}
                        <td className="py-3 px-4 font-mono text-emerald-600 dark:text-emerald-400 align-top text-[11.5px] whitespace-nowrap">
                          {p.default}
                        </td>

                        {/* Description */}
                        <td className="py-3 px-4 text-slate-600 dark:text-slate-300 align-top leading-relaxed text-[12px]">
                          {p.desc}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-slate-400 text-xs">
                        No parameters match your search query "{searchParam}".
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Quick Example Snippet Box */}
            <div className="mt-6 p-5 rounded-2xl bg-slate-950 border border-slate-800">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Example with Custom Parameters:</h3>
              <pre className="text-slate-200 font-mono text-xs overflow-x-auto leading-relaxed">
                <code>{`toast.fire({
  title: 'Order Completed',
  text: 'Your package will be delivered tomorrow by 5:00 PM.',
  icon: 'success',
  position: 'top-right',
  duration: 5000,
  theme: 'system',
  progressBar: true,
  closeButton: true,
  draggable: true,
  pauseOnHover: true,
  action: {
    label: 'Track Package',
    onClick: () => window.open('/tracking/9482', '_blank')
  }
});`}</code>
              </pre>
            </div>

          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 3: 9 POSITIONS INTERACTIVE STUDIO                               */}
        {/* =================================================================== */}
        {activeTab === 'positions' && (
          <div className="space-y-8 max-w-4xl mx-auto bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl backdrop-blur-xl">
            <div className="text-center max-w-xl mx-auto mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">9 Viewport Anchor Positions</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Click any grid cell to anchor the viewport and immediately spawn a live notification at that exact position.</p>
            </div>

            {/* 3x3 Grid */}
            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto p-4 bg-slate-100/80 dark:bg-slate-950/60 rounded-3xl border border-slate-200 dark:border-slate-800/60 shadow-inner">
              {positions.map(pos => (
                <button
                  key={pos.id}
                  onClick={() => {
                    setCurrentPosition(pos.id);
                    toast.success(`Position: ${pos.id}`, `Triggered at ${pos.id}`, { position: pos.id });
                  }}
                  className={`p-4 rounded-2xl border text-xs font-semibold transition text-center shadow-sm flex flex-col items-center justify-center gap-1.5 ${
                    currentPosition === pos.id
                      ? 'border-indigo-500 bg-indigo-600 text-white shadow-indigo-500/30'
                      : 'border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-indigo-400'
                  }`}
                >
                  <span className="text-sm">{pos.label.split(' ')[0]}</span>
                  <span className="text-[10px] uppercase font-mono tracking-wider">{pos.id}</span>
                </button>
              ))}
            </div>

            {/* Code example */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Usage in JavaScript:</h3>
              <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-slate-200 font-mono text-xs overflow-x-auto">
                <code>{`// Set position per-alert:
toast.success('Your message', { position: '${currentPosition}' });

// Or set default position globally:
toast.config({ position: '${currentPosition}' });`}</code>
              </pre>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 4: FRAMEWORKS (ALL STACKS)                                      */}
        {/* =================================================================== */}
        {activeTab === 'frameworks' && (
          <div className="space-y-8 max-w-5xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Works Everywhere Across All Web Stacks</h2>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Notiva operates directly through the DOM with zero Virtual DOM lock-in. Copy starter code for your stack below:</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* React / Next.js */}
              <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">⚛️</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">React & Next.js (App / Pages)</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Works in client components (`'use client'`), Vite React, Remix, and Gatsby.</p>
                <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-200 overflow-x-auto">
                  <code>{`'use client';
import { toast } from 'notiva';
import 'notiva/dist/notiva.css';

export default function DeleteBtn() {
  const handleDelete = async () => {
    const ok = await toast.confirm({
      title: 'Delete account?',
      confirmButtonColor: '#ef4444'
    });
    if (ok) toast.success('Deleted!');
  };

  return <button onClick={handleDelete}>Delete</button>;
}`}</code>
                </pre>
              </div>

              {/* Vue / Nuxt */}
              <div className="bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">💚</span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">Vue 3 & Nuxt 3</h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Composition API friendly with zero reactive wrapping required.</p>
                <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-200 overflow-x-auto">
                  <code>{`<script setup>
import { toast } from 'notiva';
import 'notiva/dist/notiva.css';

function save() {
  toast.success('Data Saved!', 'Changes synced to remote.');
}
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
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Ultra lightweight and reactive within Svelte components.</p>
                <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-200 overflow-x-auto">
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
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">Includes Controller Session Flash helper and Blade renderer.</p>
                <pre className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-200 overflow-x-auto">
                  <code>{`// In Controller:
\\Notiva\\Toast::success('Profile updated!');

// In Blade layout:
<link rel="stylesheet" href="/dist/notiva.css">
<script src="/dist/notiva.js"><\/script>
{!! \\Notiva\\Toast::render() !!}`}</code>
                </pre>
              </div>

            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* TAB 5: API REFERENCE & METHODS                                      */}
        {/* =================================================================== */}
        {activeTab === 'api' && (
          <div className="space-y-8 max-w-4xl mx-auto bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl backdrop-blur-xl">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">API Methods & TypeScript Signatures</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">Comprehensive method declarations and return types.</p>
            </div>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* Methods Table */}
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
                      <td className="py-2.5 px-3 font-sans text-slate-600 dark:text-slate-300">Status toast with corresponding animated icon.</td>
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
                      <td className="py-2.5 px-3 font-sans text-slate-600 dark:text-slate-300">Text input dialog resolving with user input string.</td>
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

            {/* Global Config Example */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">Global Defaults (`toast.config()`)</h3>
              <pre className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-xs text-slate-200 overflow-x-auto font-mono">
                <code>{`toast.config({
  position: 'top-right',      // Default 9-position anchor
  duration: 4000,             // Auto dismiss timeout in ms
  theme: 'system',            // 'light' | 'dark' | 'system'
  backdrop: false,            // Background dark overlay
  backdropBlur: true,         // Frosted glass blur effect
  progressBar: true,          // Progress timer countdown bar
  closeButton: true,          // 'X' close button
  draggable: true,            // Mouse drag & touch swipe dismiss
  pauseOnHover: true          // Pause countdown timer on hover
});`}</code>
              </pre>
            </div>

          </div>
        )}

        {/* Global Footer */}
        <footer className="mt-20 pt-8 border-t border-slate-200 dark:border-slate-800/80 text-center text-xs text-slate-500 space-y-2">
          <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <a href="https://github.com/muhabibabd/notiva" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition">GitHub Repository</a>
            <span>•</span>
            <a href="https://www.npmjs.com/package/notiva" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition">NPM Registry</a>
            <span>•</span>
            <a href="https://github.com/muhabibabd/notiva/issues" target="_blank" rel="noreferrer" className="hover:text-indigo-500 transition">Report Issue</a>
          </div>
          <p>© 2026 Notiva — Crafted by <b>Habib Abdillah</b>. MIT Licensed.</p>
        </footer>

      </div>
    </div>
  );
}
