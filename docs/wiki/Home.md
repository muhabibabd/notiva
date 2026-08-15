# Welcome to Notiva Wiki 🌟

**Notiva** adalah library notifikasi Toast dan Confirm Modal modern yang dirancang untuk **HTML, PHP, Laravel, Tailwind CSS, dan NPM / Vite / Modern JS**.

Library ini memadukan **keindahan animasi stacking 3D & gestur swipe modern** dengan **kesederhanaan API modern** dalam **1 library terpadu tanpa dependencies (Zero Dependency, < 10KB)**.

---

## 📑 Daftar Halaman Wiki

* [[Installation & Setup|Installation-&-Setup]] — Panduan instalasi via NPM, CDN, Vanilla HTML, dan Laravel.
* [[Toast API & 9 Positions|Toast-API-&-9-Positions]] — Semua method toast (`fire`, `success`, `promise`, dll), gestur swipe, dan 9 posisi.
* [[Confirm & Prompt Modals|Confirm-&-Prompt-Modals]] — Panduan dialog konfirmasi berbasis `async/await`, prompt input, dan backdrop blur.
* [[Custom Colors & Themes|Custom-Colors-&-Themes]] — Kustomisasi tema global, per-alert warna identik, dan Dark Mode.
* [[Laravel & PHP Guide|Laravel-&-PHP-Guide]] — Panduan integrasi Session Flash Controller & Blade template di Laravel.

---

## ⚡ Quick Snippet

```javascript
// 1. Toast Notification
toast.success('Profil Diperbarui', 'Perubahan telah disimpan.');

// 2. Confirm Modal (Promise Async/Await)
const isConfirmed = await toast.confirm({
  title: 'Hapus Data?',
  text: 'Tindakan ini tidak bisa dibatalkan.',
  confirmButtonColor: '#ef4444',
  backdropBlur: true,
});

if (isConfirmed) {
  toast.success('Data berhasil dihapus!');
}
```

---

## 🌐 Live Demo & Playground
Kunjungi landing page interaktif Notiva untuk mencoba semua fitur secara visual.
