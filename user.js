<script>
    // Fungsi untuk login biasa
    function loginNormal(emailOrPhone, password) {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                const pengguna = data.pengguna.find(user => 
                    (user.email === emailOrPhone || user.no_hp === emailOrPhone) && 
                    user.password === password
                );

                if (pengguna) {
                    alert(`Login berhasil! Selamat datang ${pengguna.nama_lengkap}`);
                    localStorage.setItem('pengguna', JSON.stringify(pengguna));
                    window.location.href = 'dashboard.html';
                } else {
                    alert('Email/HP atau password salah!');
                }
            });
    }

    // Fungsi untuk login dengan Google
    function loginWithGoogle(googleUser) {
        const profile = googleUser.getBasicProfile();
        const googleData = {
            email: profile.getEmail(),
            google_id: profile.getId(),
            nama_lengkap: profile.getName()
        };

        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                // Cek apakah pengguna sudah terdaftar
                let pengguna = data.pengguna.find(user => 
                    user.email === googleData.email && user.login_method === "google"
                );

                if (!pengguna) {
                    // Jika belum terdaftar, buat akun baru
                    pengguna = {
                        id: data.pengguna.length + 1,
                        nama_lengkap: googleData.nama_lengkap,
                        email: googleData.email,
                        google_id: googleData.google_id,
                        saldo: 0,
                        riwayat_transaksi: [],
                        login_method: "google"
                    };
                    // Di aplikasi nyata, di sini akan ada API call untuk menyimpan ke database
                }

                alert(`Login Google berhasil! Selamat datang ${pengguna.nama_lengkap}`);
                localStorage.setItem('pengguna', JSON.stringify(pengguna));
                window.location.href = 'dashboard.html';
            });
    }

    // Tambahkan button Google di HTML
    document.getElementById('googleLoginBtn').addEventListener('click', () => {
        // Ini contoh implementasi, di production gunakan Google OAuth SDK
        alert('Mengarahkan ke login Google...');
        // Implementasi aktual akan menggunakan:
        // google.accounts.id.initialize()
        // google.accounts.id.prompt()
    });
</script>
