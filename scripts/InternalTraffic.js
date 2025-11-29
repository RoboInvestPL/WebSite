// ============================
//  INTERNAL TRAFFIC Filtr
// ============================

document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);

  // jeśli odwiedzasz ?exclude=1 → ustawiamy ciasteczko
  if (params.has('exclude')) {
    document.cookie = "exclude_me=true; path=/; max-age=31536000"; // ważne 1 rok
    console.log("Ciasteczko exclude_me ustawione.");
  }

  // jeśli ciasteczko istnieje → oznacz ruch jako internal
  if (document.cookie.includes("exclude_me=true")) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'traffic_type': 'internal'
    });
    console.log("Ruch oznaczony jako internal.");
  }
});
