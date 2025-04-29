// Fungsi untuk registrasi pengguna baru
async function registerUser(userData) {
  try {
    const response = await fetch('data.json');
    const data = await response.json();
    
    // Cek jika email sudah terdaftar
    const userExists = data.pengguna.some(user => user.email === userData.email);
    if (userExists) {
      throw new Error('Email sudah terdaftar');
    }

    // Generate ID baru
    const newUser = {
      id: 'user' + (data.pengguna.length + 1),
      nama: userData.nama,
      email: userData.email,
      no_hp: userData.no_hp,
      password: userData.password, // Seharusnya di-hash di production
      saldo: 0,
      login_method: "email",
      google_id: null,
      tanggal_daftar: new Date().toISOString().split('T')[0],
      terverifikasi: false
    };

    // Simpan ke localStorage (sementara)
    data.pengguna.push(newUser);
    localStorage.setItem('pengguna', JSON.stringify(newUser));
    localStorage.setItem('allUsers', JSON.stringify(data.pengguna));
    
    return newUser;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

// Fungsi untuk login dengan Google
async function handleGoogleLogin(googleUser) {
  const profile = googleUser.getBasicProfile();
  const googleData = {
    email: profile.getEmail(),
    google_id: googleUser.getId(),
    nama: profile.getName()
  };

  try {
    const response = await fetch('data.json');
    const data = await response.json();
    
    // Cek apakah pengguna sudah ada
    let user = data.pengguna.find(u => u.google_id === googleData.google_id || u.email === googleData.email);

    if (!user) {
      // Buat akun baru jika belum terdaftar
      user = {
        id: 'user' + (data.pengguna.length + 1),
        nama: googleData.nama,
        email: googleData.email,
        no_hp: null,
        password: null,
        saldo: 0,
        login_method: "google",
        google_id: googleData.google_id,
        tanggal_daftar: new Date().toISOString().split('T')[0],
        terverifikasi: true
      };

      // Simpan ke localStorage (sementara)
      data.pengguna.push(user);
      localStorage.setItem('allUsers', JSON.stringify(data.pengguna));
    }

    localStorage.setItem('pengguna', JSON.stringify(user));
    window.location.href = 'dashboard.html';
  } catch (error) {
    console.error('Google login error:', error);
    alert('Login dengan Google gagal');
  }
}

// Inisialisasi Google Sign-In
function initGoogleSignIn() {
  google.accounts.id.initialize({
    client_id: 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com',
    callback: handleGoogleLogin
  });
  
  google.accounts.id.renderButton(
    document.getElementById('googleSignInButton'),
    { theme: 'outline', size: 'large' }
  );
}

// Panggil inisialisasi saat halaman dimuat
window.onload = initGoogleSignIn;
