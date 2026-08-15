# Custom Colors & Themes 🎨

Notiva memberikan kontrol penuh terhadap styling, baik secara global untuk seluruh aplikasi maupun secara per-alert khusus.

---

## 1. Konfigurasi Global (`toast.config()`)

Atur preferensi tema aplikasi sekali di file inisialisasi JavaScript Anda:

```javascript
toast.config({
  position: 'top-right',      // Default posisi 
  duration: 4000,             // Durasi toast dalam ms (0 = tanpa timeout)
  theme: 'auto',              // 'light' | 'dark' | 'auto'
  backdrop: false,            // Default backdrop toast
  backdropBlur: true,         // Aktifkan blur glassmorphism
  closeButton: true,          // Tampilkan tombol 'X'
  progressBar: true,          // Tampilkan progress bar timer
  pauseOnHover: true,         // Pause timer saat kursor diarahkan
  draggable: true,            // Aktifkan swipe to dismiss
  colors: {
    primary: '#6366f1',       // Indigo
    primaryHover: '#4f46e5',
    success: '#10b981',       // Emerald
    error: '#ef4444',         // Rose
    warning: '#f59e0b',       // Amber
    info: '#3b82f6',          // Sky Blue
  }
});
```

---

## 2. Override Warna Khusus untuk 1 Alert Identik

Tiap toast atau modal dapat memiliki warna spesifik yang berbeda dari tema global:

```javascript
toast.fire({
  title: 'Penawaran Spesial VIP',
  text: 'Diskon 50% untuk transaksi pertama Anda!',
  position: 'bottom-right',
  background: '#1e1b4b',      // Background card gelap
  color: '#e0e7ff',           // Warna teks
  borderColor: '#818cf8',     // Border warna ungu muda
  icon: 'success',
  iconColor: '#a5b4fc',       // Warna icon
  actionColor: '#6366f1',     // Warna tombol aksi
  backdrop: true,
  backdropBlur: true,
  action: {
    label: 'Klaim Promo',
    onClick: () => console.log('Promo diklaim')
  }
});
```

---

## 3. Light Mode, Dark Mode & System Mode

Notiva mendukung 3 mode tema lengkap:

```javascript
// 1. Paksa Light Mode
toast.setTheme('light');

// 2. Paksa Dark Mode
toast.setTheme('dark');

// 3. System Mode (Mengikuti preferensi OS pengguna secara real-time)
toast.setTheme('system'); // atau toast.setTheme('auto');
```

* **System Mode**: Memanfaatkan listener `window.matchMedia('(prefers-color-scheme: dark)')` sehingga saat OS user beralih dari siang (light) ke malam (dark), tampilan toast dan modal langsung beradaptasi otomatis secara instan.
* **Integrasi Tailwind CSS**: Notiva otomatis sinkron dengan class `.dark` pada elemen root `<html>`.
