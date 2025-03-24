"use client";

import { useEffect } from "react";

const LanguageSwitcher = () => {
  useEffect(() => {
    const addGoogleTranslate = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        "google_translate_element"
      );
    };

    if (window.google && window.google.translate) {
      addGoogleTranslate();
    } else {
      window.googleTranslateElementInit = addGoogleTranslate;
    }
  }, []);

  return <div id="google_translate_element"></div>;
};

export default LanguageSwitcher;
