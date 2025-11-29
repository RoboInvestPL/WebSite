// ============================
//  COOKIE LOGIC – RoboInvest
// ============================

document.addEventListener('DOMContentLoaded', function () {
  var banner = document.getElementById('cookie-banner');
  if (!banner) return;

  var acceptBtn = document.getElementById('cookie-accept');
  var rejectBtn = document.getElementById('cookie-reject');
  var storedConsent = null;

  try {
    storedConsent = localStorage.getItem('cookieConsent');
  } catch (e) {
    storedConsent = null;
  }

  // Jeśli użytkownik wcześniej podjął decyzję
  if (storedConsent === 'accepted') {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', { analytics_storage: 'granted' });
      gtag('config', 'G-E793XT6R8P');
    }
    return;
  }
  if (storedConsent === 'rejected') {
    if (typeof gtag === 'function') {
      gtag('consent', 'update', { analytics_storage: 'denied' });
    }
    return;
  }

  // Brak decyzji pokaż baner
  banner.style.display = 'block';


  var autoAcceptTimer = setTimeout(function () {
    try { localStorage.setItem('cookieConsent', 'accepted'); } catch (e) {}

    if (typeof gtag === 'function') {
      gtag('consent', 'update', { analytics_storage: 'granted' });
      gtag('config', 'G-E793XT6R8P');
    }

    // Baner ma pozostać widoczny
  }, 5000);

  // Klik "Akceptuję"
  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      clearTimeout(autoAcceptTimer);

      try { localStorage.setItem('cookieConsent', 'accepted'); } catch (e) {}

      if (typeof gtag === 'function') {
        gtag('consent', 'update', { analytics_storage: 'granted' });
        gtag('config', 'G-E793XT6R8P');
      }

      banner.style.display = 'none';
    });
  }

  // Klik "Odrzuć"
  if (rejectBtn) {
    rejectBtn.addEventListener('click', function () {
      clearTimeout(autoAcceptTimer);

      try { localStorage.setItem('cookieConsent', 'accepted'); } catch (e) {}

       if (typeof gtag === 'function') {
        gtag('consent', 'update', { analytics_storage: 'granted' });
        gtag('config', 'G-E793XT6R8P');
      }

      banner.style.display = 'none';
    });
  }
});
