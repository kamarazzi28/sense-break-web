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
🔗 [https://sense-break-2025.web.app](https://sense-break-2025.web.app)

---

## 📋 Funkcionalita

- 🧾 Registrace & přihlášení (Firebase Authentication, Google Login)
- 👁️ Zrakový trénink (Canvas nebo SVG animace)
- 📈 Přehled pokroku, streak systém
- 🌐 Detekce offline režimu
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
sense-break-kaj/
├── .firebase/                # Firebase konfigurace
├── public/
│   ├── images/
│   │   ├── figures/
│   │   ├── girl/
│   │   └── logo/
│   └── sb_logo.svg
├── src/
│   ├── components/           # Reuse komponenty
│   │   ├── AvatarPreview/
│   │   ├── Button/
│   │   ├── CustomSelect/
│   │   ├── DatePicker/
│   │   ├── FeatureRow/
│   │   ├── Header/
│   │   ├── IconButton/
│   │   ├── ImageCard/
│   │   ├── InputFields/
│   │   ├── Modal/
│   │   ├── PrivateRoute/
│   │   ├── Sidebar/
│   │   ├── StreakCard/
│   │   ├── Title/
│   │   ├── Toggle/
│   │   └── ... další UI komponenty
│   ├── pages/
│   │   ├── AccountSettings.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Hearing.jsx
│   │   ├── Layout.jsx
│   │   ├── Login.jsx
│   │   ├── Notifications.jsx
│   │   ├── Progress.jsx
│   │   └── Register.jsx
│   ├── App.jsx               # Kořenová komponenta
│   ├── firebase.js           # Firebase config
│   ├── firebaseHelpers.js    # Auth + Firestore helpers
│   ├── index.css             # Globální styly
│   ├── main.jsx              # Entry point
│   ├── Layout.jsx            # Rozvržení stránky
│   └── theme.js
├── dist/                     # Vygenerovaný build
├── package.json
└── README.md
```