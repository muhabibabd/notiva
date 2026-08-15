# Laravel & PHP Integration Guide 🐘

Notiva dilengkapi class helper PHP bawaan untuk mempermudah flash notifications dari Controller ke Blade template.

---

## 1. Setup di Laravel

### Langkah 1: Registrasikan Helper
Letakkan file `Toast.php` di dalam namespace aplikasi Anda (misal `app/Helpers/Toast.php` atau `app/Services/Toast.php`).

```php
namespace App\Helpers;

use Notiva\Toast;
```

---

### Langkah 2: Panggil di Controller
Kirimkan flash message setelah proses simpan, edit, atau hapus:

```php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Notiva\Toast;

class UserController extends Controller
{
    public function store(Request $request)
    {
        // ... Validasi & Simpan User ...

        Toast::success('Akun Berhasil Dibuat!', 'Email aktivasi telah dikirimkan.');
        return redirect()->route('users.index');
    }

    public function destroy($id)
    {
        // ... Hapus User ...

        Toast::info('User Telah Dihapus');
        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        // Custom Alert / Modal Dialog Style
        Toast::fire([
            'title' => 'Perubahan Disimpan',
            'text' => 'Profil telah diperbarui.',
            'icon' => 'success',
            'position' => 'top-right'
        ]);

        return redirect()->back();
    }
}
```

---

### Langkah 3: Render di Master Layout Blade (`app.blade.php`)
Tambahkan baris render di bagian bawah file layout utama Anda:

```blade
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <title>{{ config('app.name') }}</title>

    <!-- CSS Notiva -->
    <link rel="stylesheet" href="{{ asset('dist/notiva.css') }}">
</head>
<body class="bg-gray-50 dark:bg-gray-900">

    @yield('content')

    <!-- JS Notiva -->
    <script src="{{ asset('dist/notiva.js') }}"></script>

    <!-- Auto-render flash notification dari Session Controller -->
    {!! \Notiva\Toast::render() !!}
</body>
</html>
```

---

## 2. Penggunaan di Native PHP (Tanpa Laravel)

Jika Anda memakai Native PHP atau CodeIgniter:

```php
<?php
require_once 'path/to/Toast.php';

use Notiva\Toast;

// Flash message
Toast::success('Login Berhasil', 'Selamat datang kembali!');
header('Location: dashboard.php');
exit;
?>
```

Dan di `dashboard.php`:
```php
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="dist/notiva.css">
</head>
<body>
    <h1>Dashboard</h1>

    <script src="dist/notiva.js"></script>
    <?= \Notiva\Toast::render(); ?>
</body>
</html>
```
