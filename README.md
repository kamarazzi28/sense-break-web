# Sense Break (Web Trainer for Vision & Hearing)

## 🎓 Semestrální projekt pro předmět KAJ – Tvorba klientských aplikací v JavaScriptu (B0B39KAJ)

---

## 🎯 Cíl projektu

Webová aplikace pro každodenní trénink zraku a sluchu formou krátkých interaktivních cvičení. Vhodná zejména pro uživatele, kteří tráví hodně času u počítače. Aplikace nabízí gamifikovaný přístup k tréninku, přehled výsledků, streak systém a notifikace.

---

## 👩‍💻 Autorka

- Kamilla Ishmukhammedova (@ishmukam)

---

## 🌐 Nasazení aplikace

Aplikace je nasazena pomocí Firebase Hosting:  
🔗 [https://sense-break-2025.web.app/login](https://sense-break-2025.web.app/login)

---

## 📋 Funkcionalita

- 🧾 Registrace & přihlášení (Firebase Authentication, Google Login)
- 👁️ Zrakový trénink (Canvas nebo SVG animace)
- 🔊 Sluchový trénink (Audio API, rozpoznávání tónů)
- 📈 Přehled pokroku, streak systém
- 🔔 Notifikace – připomenutí tréninku
- 🌐 Detekce offline režimu
- 🎨 Responzivní design (desktop, tablet, mobil)
- 🖼️ Nahrání a správa avatara (Firebase Storage)
- 🛠️ Nastavení účtu (username, avatar, gender)

---

## 🛠️ Použité technologie

- **React + Vite**
- **React Router (SPA)**
- **Material UI (MUI)** – komponenty a ikony
- **Firebase**
  - 🔐 Authentication (email + Google login)
  - 🧠 Firestore – ukládání údajů o uživateli (např. streak, jméno)
  - 🚀 Hosting – nasazení aplikace
- **Canvas / SVG** – vykreslení tréninků
- **Audio API** – přehrávání tónů
- **HTML5, CSS3, JS (OOP)**
- **Service Worker / `navigator.onLine`**


## 🧱 Struktura projektu

```plaintext
sense-break/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AvatarPreview/
│   │   ├── Button/
│   │   ├── Header/
│   │   ├── Sidebar/
│   │   └── ... další UI komponenty
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Vision.jsx
│   │   ├── Hearing.jsx
│   │   ├── Login.jsx / Register.jsx
│   │   └── Settings.jsx
│   ├── firebase.js           # Firebase config
│   ├── firebaseHelpers.js    # Auth + Firestore helpers
│   ├── App.jsx               # Kořenová komponenta
│   ├── Layout.jsx            # Rozvržení stránky
│   ├── index.css             # Globální styly
│   └── main.jsx              # Entry point
├── README.md
└── package.json
```