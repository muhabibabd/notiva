# Installation & Setup 📦

Notiva dapat dipasang dan digunakan melalui berbagai cara sesuai arsitektur project Anda.

---

## 1. NPM / Vite / Laravel Vite / Modern JS

Install via package manager favorit Anda:

```bash
npm install notiva
# atau
yarn add notiva
# atau
pnpm add notiva
# atau
bun add notiva
```

Import di file JavaScript utama Anda (misal `resources/js/app.js` atau `main.js`):

```javascript
import { toast } from 'notiva';
import 'notiva/dist/notiva.css';

// Opsional: bind ke window agar bisa dipanggil dari inline HTML/Blade
window.toast = toast;
```

---

## 2. CDN / Script Tag (HTML & Native PHP)

Sertakan file CSS dan JS langsung di template HTML Anda:

```html
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Aplikasi Saya</title>
  
  <!-- Notiva CSS -->
  <link rel="stylesheet" href="https://your-domain.pages.dev/dist/notiva.css">
</head>
<body>

  <!-- Konten Web -->

  <!-- Notiva JS -->
  <script src="https://your-domain.pages.dev/dist/notiva.js"></script>
  <script>
    toast.success('Selamat Datang!');
  </script>
</body>
</html>
```

---

## 3. Laravel Framework

### Langkah 1: Include Asset
Di file layout utama (`resources/views/layouts/app.blade.php`):

```blade
<head>
  <!-- Jika menggunakan Vite -->
  @vite(['resources/css/app.css', 'resources/js/app.js'])

  <!-- Atau jika menggunakan static file -->
  <link rel="stylesheet" href="{{ asset('dist/notiva.css') }}">
</head>
<body>
  @yield('content')

  <script src="{{ asset('dist/notiva.js') }}"></script>
  {!! \Notiva\Toast::render() !!}
</body>
```

### Langkah 2: Copy Helper PHP
Copy file `laravel/Toast.php` ke folder `app/Helpers/Toast.php` atau namespace yang Anda inginkan.
