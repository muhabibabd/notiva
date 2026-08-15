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

## 2. Prompt Dialog (Input Teks)

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

## 3. Simple Alert Modal

Untuk pemberitahuan penting satu tombol (mirip `alert()` browser tetapi dengan desain modern):

```javascript
await toast.alert({
  title: 'Pemberitahuan Sistem',
  text: 'Server akan mengalami pemeliharaan rutin pada pukul 00:00 WIB.',
  icon: 'info'
});
```

---

## 4. Opsi Konfigurasi Modal

| Parameter | Tipe | Default | Deskripsi |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `'Apakah Anda yakin?'` | Judul utama modal |
| `text` / `description` | `string` | `''` | Penjelasan atau deskripsi detail |
| `icon` | `string` | `'warning'` | Icon: `'warning'`, `'danger'`, `'error'`, `'info'`, `'question'`, `'success'` |
| `position` | `string` | `'center'` | Salah satu dari 9 posisi |
| `confirmButtonText` | `string` | `'Ya, Lanjutkan'` | Label tombol konfirmasi |
| `cancelButtonText` | `string` | `'Batal'` | Label tombol batal (kosongkan jika hanya 1 tombol) |
| `confirmButtonColor` | `string` | `Primary / Danger` | Warna background tombol konfirmasi |
| `cancelButtonColor` | `string` | Default Gray | Warna background tombol batal |
| `backdrop` | `boolean` | `true` | Menampilkan overlay di belakang modal |
| `backdropBlur` | `boolean` | `true` | Menampilkan efek blur kaca |
| `allowOutsideClick` | `boolean` | `true` | Tutup modal jika klik di luar area modal |
