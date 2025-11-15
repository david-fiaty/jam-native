const onPress = () => {
  if (onClick) {
    onClick();
  }

  //const redirectUri = "http://localhost:3000/login"; // process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID; //'http://localhost:3000/login'; // Must match the one registered in Google Console
  const redirectUri = process.env.NEXT_PUBLIC_SSO_REDIRECT_URL || "";
  
  if (type == "google") {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
    const scope = "openid email profile";
    const state = Math.random().toString(36).substring(2);
    const authUrl =
      `https://accounts.google.com/o/oauth2/v2/auth` +
      `?response_type=code` +
      `&client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}` +
      `&state=${state}` +
      `&prompt=select_account`; // 👈 Forces account chooser every time
    window.location.href = authUrl;
  } 
  else if (type == "facebook") {
    const clientId = process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID;
    const authUrl = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  } 
  else if (type === "instagram") {
    const clientId = process.env.NEXT_PUBLIC_INSTAGRAM_CLIENT_ID;
    //const scope = "user_profile,user_media"; // Basic permissions, adjust as needed
    const scope = "instagram_business_basic";
    const state = Math.random().toString(36).substring(2);
    const authUrlOld =
      `https://api.instagram.com/oauth/authorize` +
      `?client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&scope=${encodeURIComponent(scope)}` +
      `&response_type=code` +
      `&state=${state}`;

    const authUrl = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}`;
    window.location.href = authUrl;
  }
};