# Confirm & Prompt Modals 🪟

Notiva menyertakan sistem modal dialog bawaan berbasis **Promise (`async/await`)** yang elegan dengan efek glassmorphism backdrop blur.

---

## 1. Confirm Modal (Dialog Konfirmasi)

Mengembalikan `Promise<boolean>` (`true` jika user menekan tombol konfirmasi, `false` jika batal atau klik luar).

```javascript
async function handleDeleteAccount() {
  const isConfirmed = await toast.confirm({
    title: 'Hapus Akun Pengguna?',
    text: 'Seluruh riwayat transaksi pelanggan ini akan terhapus permanen.',
    icon: 'warning', // 'warning' | 'danger' | 'info' | 'question' | 'success'
    position: 'center', // Mendukung 9 posisi
    confirmButtonText: 'Ya, Hapus Permanen',
    cancelButtonText: 'Batal',
    confirmButtonColor: '#ef4444',
    backdrop: true,       // On/off overlay gelap
    backdropBlur: true,   // On/off efek glassmorphism blur
  });

  if (isConfirmed) {
    // Jalankan AJAX delete
    toast.success('Akun berhasil dihapus');
  } else {
    toast.info('Penghapusan dibatalkan');
  }
}
```

### Format Shorthand
```javascript
const ok = await toast.confirm('Yakin ingin logout?', 'Sesi Anda akan diakhiri.');
if (ok) {
  window.location.href = '/logout';
}
```

---

## 2. Rich HTML Content & Custom Width (v1.1.0) 🎨

Gunakan opsi `html` untuk menampilkan daftar error, styling warna, tabel, atau badge:

```javascript
await toast.confirm({
  title: 'Laporan Sinkronisasi Data',
  icon: 'info',
  width: '580px',
  html: `
    <div style="text-align: left; background: rgba(99, 102, 241, 0.08); padding: 12px; border-radius: 8px; font-size: 0.9rem;">
      <p style="margin: 0 0 6px 0; font-weight: 600;"><b>3 siswa</b> belum lengkap formulirnya:</p>
      <ul style="margin: 0; padding-left: 20px;">
        <li>Ahmad — <em>Akta kelahiran belum diunggah</em></li>
        <li>Budi — <em>Format NISN salah</em></li>
        <li>Citra — <em>Nomor KK belum diisi</em></li>
      </ul>
    </div>
  `,
  confirmButtonText: 'Download Log',
  cancelButtonText: 'Tutup'
});
```

> [!TIP]
> **Keamanan XSS**: Selalu gunakan `Notiva.escape(userInput)` jika menyisipkan data dinamis dari pengguna ke dalam opsi `html`:
> ```javascript
> const safeName = Notiva.escape(userName);
> toast.confirm({ html: `Hapus data siswa <b>${safeName}</b>?` });
> ```

---

## 3. Auto-close Modal dengan Timer & Progress Bar (v1.1.0) ⏱️

Modal dapat menutup otomatis setelah durasi tertentu tanpa perlu klik tombol:

```javascript
toast.alert({
  title: 'Tersimpan Otomatis!',
  text: 'Modal akan tertutup otomatis dalam 2 detik.',
  icon: 'success',
  timer: 2000,
  timerProgressBar: true,
  showConfirmButton: false // Sembunyikan tombol konfirmasi
});
```

---

## 4. Prompt Dialog (Input Teks)

Mengembalikan `Promise<string | null>` (berisi teks input user atau `null` jika dibatalkan).

```javascript
const reason = await toast.prompt({
  title: 'Alasan Pembatalan Pesanan',
  text: 'Mohon berikan alasan Anda membatalkan pesanan ini:',
  placeholder: 'Tuliskan alasan di sini...',
  inputType: 'text', // 'text' | 'password' | 'email' | 'number'
  required: true,    // Validasi wajib isi
  confirmButtonText: 'Kirim Alasan',
  cancelButtonText: 'Batal',
  backdropBlur: true,
});

if (reason) {
  toast.success('Alasan Diterima', `"${reason}"`);
}
```

---

## 5. Simple Alert Modal

Untuk pemberitahuan penting satu tombol (mirip `alert()` browser tetapi dengan desain modern):

```javascript
await toast.alert({
  title: 'Pemberitahuan Sistem',
  text: 'Server akan mengalami pemeliharaan rutin pada pukul 00:00 WIB.',
  icon: 'info'
});
```

---

## 6. Opsi Lengkap Konfigurasi Modal

| Parameter | Tipe | Default | Deskripsi |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `'Apakah Anda yakin?'` | Judul utama modal dialog |
| `text` | `string` | `''` | Deskripsi teks polos (otomatis di-escape aman) |
| `html` | `string` | `undefined` | String HTML untuk konten kaya (*v1.1.0*) |
| `render` | `function(el)` | `undefined` | Callback DOM kustom menerima kontainer konten (*v1.1.0*) |
| `icon` | `string` | `'warning'` | Icon: `'warning'`, `'danger'`, `'error'`, `'info'`, `'question'`, `'success'` |
| `position` | `string` | `'center'` | Salah satu dari 9 posisi (`center`, `top-right`, dll) |
| `width` | `string \| number` | `undefined` | Lebar kustom modal (misal `'600px'` atau `700`) (*v1.1.0*) |
| `confirmButtonText` | `string` | `'Ya, Lanjutkan'` | Label tombol konfirmasi |
| `cancelButtonText` | `string` | `'Batal'` | Label tombol batal |
| `confirmButtonColor` | `string` | `Primary / Danger` | Warna background tombol konfirmasi |
| `cancelButtonColor` | `string` | Default Gray | Warna background tombol batal |
| `showConfirmButton` | `boolean` | `true` | Tampilkan atau sembunyikan tombol konfirmasi (*v1.1.0*) |
| `showCancelButton` | `boolean` | `true` | Tampilkan tombol batal (`true` utk confirm, `false` utk alert) (*v1.1.0*) |
| `reverseButtons` | `boolean` | `false` | Tukar posisi tombol confirm & cancel (*v1.1.0*) |
| `timer` | `number (ms)` | `undefined` | Durasi auto-close modal dalam milidetik (*v1.1.0*) |
| `timerProgressBar` | `boolean` | `false` | Tampilkan countdown progress bar (*v1.1.0*) |
| `allowEscapeKey` | `boolean` | `true` | Izinkan tutup modal dengan tombol ESC (*v1.1.0*) |
| `allowOutsideClick` | `boolean` | `true` | Tutup modal jika klik di luar area dialog |
| `customClass` | `object` | `{}` | Kustom class `{ popup, confirmButton, cancelButton, title, htmlContainer }` (*v1.1.0*) |
| `backdrop` | `boolean` | `true` | Menampilkan overlay di belakang modal |
| `backdropBlur` | `boolean` | `true` | Menampilkan efek blur kaca |
