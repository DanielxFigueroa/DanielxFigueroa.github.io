window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}

function setConsent(consent) {
  const consentMode = {
    functionality_storage: consent.necessary ? "granted" : "denied",
    security_storage: consent.necessary ? "granted" : "denied",
    ad_storage: consent.marketing ? "granted" : "denied",
    analytics_storage: consent.analytics ? "granted" : "denied",
    personalization_storage: consent.preferences ? "granted" : "denied",
  };
  gtag("consent", "update", consentMode);
  localStorage.setItem("ga4_consent", JSON.stringify(consentMode));
}

if (localStorage.getItem("ga4_consent") === null) {
  gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    personalization_storage: "denied",
    functionality_storage: "denied",
    security_storage: "denied",
  });
} else {
  gtag("consent", "default", JSON.parse(localStorage.getItem("ga4_consent")));
}

document.addEventListener("DOMContentLoaded", function () {
  const consentBanner = document.getElementById("pc-banner");
  if (consentBanner) {
    if (localStorage.getItem("ga4_consent") === null) {
      // Consent Banner Accept Button
      document
        .getElementById("pc-banner-btn-accept")
        .addEventListener("click", function () {
          setConsent({
            necessary: true,
            analytics: true,
            preferences: true,
            marketing: true,
          });
          consentBanner.classList.add("hide");
        });

      // Manage Preferences Button
      document
        .getElementById("pc-banner-btn-manage-prefs")
        .addEventListener("click", function () {
          // Cookie Settings Accept Button
          document
            .getElementById("pc-prefs-btn-accept")
            .addEventListener("click", function () {
              setConsent({
                necessary: true,
                analytics: true,
                preferences: true,
                marketing: true,
              });
              consentBanner.classList.add("hide");
            });

          // Cookie Settings Decline Button
          document
            .getElementById("pc-prefs-btn-decline")
            .addEventListener("click", function () {
              setConsent({
                necessary: false,
                analytics: false,
                preferences: false,
                marketing: false,
              });
              consentBanner.classList.add("hide");
            });

          // Preferences Selection Accept Button
          document
            .getElementById("pc-prefs-btn-save")
            .addEventListener("click", function () {
              setConsent({
                necessary: document.getElementById("pc-prefs-essential-input")
                  .checked,
                analytics: document.getElementById("pc-prefs-analytics-input")
                  .checked,
                preferences: document.getElementById(
                  "pc-prefs-preferences-input"
                ).checked,
                marketing: document.getElementById("pc-prefs-marketing-input")
                  .checked,
              });
              consentBanner.classList.add("hide");
            });
        });

      // Consent Banner Decline Button
      document
        .getElementById("pc-banner-btn-decline")
        .addEventListener("click", function () {
          setConsent({
            necessary: false,
            analytics: false,
            preferences: false,
            marketing: false,
          });
          consentBanner.classList.add("hide");
        });
    }
  }
});
