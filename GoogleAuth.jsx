import { useEffect } from 'react';

export default function GoogleAuth() {
  useEffect(() => {
    // Load script Google
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleLogin = (response) => {
    // Kirim credential ke backend
    console.log('Google response:', response.credential);
  };

  return (
    <div>
      <div 
        id="googleSignInButton"
        style={{ width: '100%', marginTop: '20px' }}
      />
    </div>
  );
}
