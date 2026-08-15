# Toast API & 9 Positions 🍞

Notiva menyediakan berbagai method notifikasi toast yang sangat mudah dipanggil dan fleksibel.

---

## 1. Quick Toast Methods

```javascript
// 1. Success
toast.success('Profil Diperbarui!');
toast.success('Berhasil!', 'Data tersimpan ke database.');

// 2. Error / Danger
toast.error('Gagal Menyimpan', 'Periksa koneksi internet Anda.');

// 3. Warning
toast.warning('Peringatan Kuota', 'Sisa kuota kurang dari 10%.');

// 4. Info
toast.info('Pembaruan Tersedia', 'Versi 2.0 telah dirilis.');

// 5. Loading (Infinite sampai ditutup atau diganti)
const loadingId = toast.loading('Sedang mengunggah berkas...');
// untuk menutupnya: toast.dismiss(loadingId);
```

---

## 2. Universal Object-Style `fire`

Bagi yang terbiasa dengan Notiva, Anda bisa menggunakan format objek `toast.fire()`:

```javascript
toast.fire({
  title: 'Transaksi Sukses',
  text: 'Faktur nomor #9842 telah dikirim ke email.',
  icon: 'success',
  position: 'top-right',
  duration: 4000,
  progressBar: true,
  closeButton: true
});
```

---

## 3. Promise Toast (AJAX / Fetch)

Sangat cocok untuk proses asynchronous seperti memanggil API:

```javascript
toast.promise(fetch('/api/user/save', { method: 'POST' }), {
  position: 'top-right',
  loading: 'Menyimpan data...',
  success: (res) => 'Data berhasil disimpan!',
  error: (err) => `Gagal: ${err.message || err}`
});
```

---

## 4. Toast dengan Action & Cancel Button

```javascript
toast('Ada pesanan baru masuk', {
  icon: 'info',
  action: {
    label: 'Buka Pesanan',
    onClick: () => window.location.href = '/orders/102'
  },
  cancel: {
    label: 'Tutup',
    onClick: () => {}
  }
});
```

---

## 5. Pilihan 9 Posisi Toast

Anda dapat mengatur posisi toast ke salah satu dari 9 posisi di layar:

```javascript
toast.success('Kiri Atas', { position: 'top-left' });
toast.success('Tengah Atas', { position: 'top-center' });
toast.success('Kanan Atas', { position: 'top-right' }); // Default

toast.info('Kiri Tengah', { position: 'center-left' });
toast.info('Tengah Layar', { position: 'center' });
toast.info('Kanan Tengah', { position: 'center-right' });

toast.warning('Kiri Bawah', { position: 'bottom-left' });
toast.warning('Tengah Bawah', { position: 'bottom-center' });
toast.warning('Kanan Bawah', { position: 'bottom-right' });
```

---

## 6. Fitur 3D Stacking & Swipe

* **Stacking Cards**: Hingga 3-4 toast bertumpuk dengan kedalaman 3D scale & translateY.
* **Expand on Hover**: Saat kursor diarahkan ke area toast, tumpukan otomatis melebar secara natural dengan jarak rapi.
* **Drag & Swipe**: Klik dan geser toast ke kanan atau kiri (mouse / sentuhan layar hp) untuk menghapusnya langsung.
