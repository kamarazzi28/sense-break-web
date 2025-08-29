# Sense Break (Web Trainer for Vision & Hearing) (EN)

## Project Overview
Sense Break is a web application designed for daily vision and hearing training through short interactive exercises.  
It is especially useful for users who spend long hours at the computer. The app provides a gamified training experience, progress overview, a streak system, and notifications.  

The project is a web counterpart of the desktop version, built with **React** and custom UI components designed based on a Figma prototype.

## Author
- Kamilla Ishmukhammedova (@kamarazzi28)

## Live Demo
The application is deployed via Firebase Hosting:  
🔗 [https://sense-break-2025.web.app](https://sense-break-2025.web.app)

## Features
- User registration & login (Firebase Authentication, Google Login)  
- Vision training (Canvas or SVG animations)  
- Hearing training (Audio API)  
- Progress overview and streak system  
- Offline mode detection  
- Avatar upload and management (Firebase Storage)  
- Account settings (username, avatar, gender)  

## Technologies
- **React + Vite**  
- **React Router (SPA)**  
- **Material UI (MUI)** – components and icons  
- **Firebase**  
  - Authentication (email + Google login)  
  - Firestore – user data storage (streaks, profile info)  
  - Storage – avatars  
  - Hosting – deployment  
- **Canvas / SVG** – rendering training exercises  
- **Audio API** – sound playback  
- **HTML5, CSS3, JavaScript (OOP)**  
- **Service Worker / `navigator.onLine`** – offline detection  

## Project Structure
```plaintext
sense-break-web/
├── .firebase/                # Firebase configuration
├── public/
│   ├── images/
│   │   ├── figures/
│   │   ├── girl/
│   │   └── logo/
│   └── sb_logo.svg
├── src/
│   ├── components/           # Reusable UI components
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
│   │   └── ... more UI components
│   ├── pages/
│   │   ├── AccountSettings.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Hearing.jsx
│   │   ├── Layout.jsx
│   │   ├── Login.jsx
│   │   ├── Notifications.jsx
│   │   ├── Progress.jsx
│   │   └── Register.jsx
│   ├── App.jsx               # Root component
│   ├── firebase.js           # Firebase config
│   ├── firebaseHelpers.js    # Auth + Firestore helpers
│   ├── index.css             # Global styles
│   ├── main.jsx              # Entry point
│   ├── Layout.jsx            # Page layout
│   └── theme.js
├── dist/                     # Production build
├── package.json
└── README.md

```
## Licence 

This project is intended for educational purposes only.

--------------------------------------------------------------------------

# Sense Break (Web Trainer for Vision & Hearing) (CZ)

## Přehled projektu
Sense Break je webová aplikace určená pro každodenní trénink zraku a sluchu formou krátkých interaktivních cvičení.  
Je vhodná zejména pro uživatele, kteří tráví dlouhý čas u počítače. Aplikace nabízí gamifikovaný přístup k tréninku, přehled výsledků, streak systém a notifikace.  

Projekt je webovým protějškem desktopové verze, postavený na **Reactu** a vlastních UI komponentách vytvořených podle prototypu ve Figmě.

## Autorka
- Kamilla Ishmukhammedova (@kamarazzi28)

## Nasazení aplikace
Aplikace je nasazena pomocí Firebase Hosting:  
🔗 [https://sense-break-2025.web.app](https://sense-break-2025.web.app)

## Funkcionality
- Registrace a přihlášení uživatele (Firebase Authentication, Google Login)  
- Zrakový trénink (Canvas nebo SVG animace)  
- Sluchový trénink (Audio API)  
- Přehled pokroku a streak systém  
- Detekce offline režimu  
- Nahrání a správa avatara (Firebase Storage)  
- Nastavení účtu (uživatelské jméno, avatar, pohlaví)  

## Použité technologie
- **React + Vite**  
- **React Router (SPA)**  
- **Material UI (MUI)** – komponenty a ikony  
- **Firebase**  
  - Authentication (email + Google login)  
  - Firestore – ukládání uživatelských dat (streaky, profilové údaje)  
  - Storage – avatary  
  - Hosting – nasazení aplikace  
- **Canvas / SVG** – vykreslování tréninků  
- **Audio API** – přehrávání tónů  
- **HTML5, CSS3, JavaScript (OOP)**  
- **Service Worker / `navigator.onLine`** – podpora offline režimu  

## Struktura projektu
```plaintext
sense-break-web/
├── .firebase/                # Firebase konfigurace
├── public/
│   ├── images/
│   │   ├── figures/
│   │   ├── girl/
│   │   └── logo/
│   └── sb_logo.svg
├── src/
│   ├── components/           # Znovupoužitelné UI komponenty
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
│   │   └── ... další komponenty
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
│   ├── firebase.js           # Firebase konfigurace
│   ├── firebaseHelpers.js    # Auth + Firestore helpery
│   ├── index.css             # Globální styly
│   ├── main.jsx              # Vstupní bod
│   ├── Layout.jsx            # Rozvržení stránky
│   └── theme.js
├── dist/                     # Produkční build
├── package.json
└── README.md

```
## Licence 

Projekt je určen pouze pro studijní účely.
