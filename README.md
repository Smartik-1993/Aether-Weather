# ⚡ Aether Weather

An ultra-modern, dark-mode weather web application with real-time meteorological intelligence powered by the [Open-Meteo API](https://open-meteo.com/). Built with semantic HTML5, modern Vanilla CSS, and JavaScript.

![Aether Weather](https://img.shields.io/badge/Theme-Obsidian%20Dark-0a0f1d?style=for-the-badge&logo=appveyor)
![Open-Meteo API](https://img.shields.io/badge/API-Open--Meteo-38bdf8?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)

---

## ✨ Features

- 🌌 **Atmospheric Dark-Mode Glassmorphism**: Tailored Obsidian palette (`#060911`), layered glassmorphism cards, glowing ambient lighting orbs, and neon cyan accents.
- 🇮🇳 **Indian Metros & Global Hubs**: Quick toggle for major Indian cities (*New Delhi, Mumbai, Bengaluru, Kolkata, Chennai, Hyderabad, Ahmedabad, Jaipur, Pune, Chandigarh*) and global hubs (*Tokyo, London, New York, Paris, Dubai, Sydney*).
- 🔀 **Multi-City Toggling Options**:
  - Region category tabs.
  - 1-Click `< Prev` and `Next >` stepper buttons on the main card.
  - Keyboard arrow key navigation (<kbd>←</kbd> and <kbd>→</kbd>).
- 🎨 **Dynamic Live Canvas Atmosphere**: HTML5 Canvas particle system rendering rainfall, snowfall, twinkling night stars, and sunny flare animations matching the active weather condition.
- 📊 **Comprehensive Atmospheric Telemetry**:
  - Current Temperature & "Feels Like"
  - Humidity level with progress bar
  - Wind Speed & Direction with rotating compass dial
  - UV Index danger scale
  - Surface Pressure (hPa)
  - Sun cycle (Sunrise & Sunset)
  - 24-hour Precipitation sum
- ⏱️ **24-Hour Hourly & 7-Day Extended Forecasts**:
  - Horizontally scrollable 24-hour forecast with rain probabilities.
  - 7-day outlook with gradient temperature range bars.
- 🔄 **Unit Converter**: Seamless `°C` ⟷ `°F` toggle with instant metric recalculation.
- 🔖 **Saved Locations / Favorites**: Pin any city to a persistent glass drawer with `localStorage`.
- 🔍 **Search & Geolocation**: Live debounced autocomplete search and browser GPS auto-detection.

---

## 🚀 Getting Started

### Local Setup
No build tools or installations required!

1. Clone or download this repository:
   ```bash
   git clone https://github.com/your-username/aether-weather.git
   cd aether-weather
   ```
2. Open `index.html` in any modern web browser, or serve it with Python:
   ```bash
   python -m http.server 8080
   ```
3. Open `http://localhost:8080` in your browser.

---

## 🌐 Deploy to GitHub Pages (Free Hosting)

1. Push this repository to GitHub.
2. In your GitHub repository, go to **Settings** > **Pages**.
3. Under **Branch**, select `main` and root `/` folder, then click **Save**.
4. Your weather app will be live at `https://<your-username>.github.io/<repo-name>/`!

---

## 📁 Project Structure

```
├── index.html       # Application markup and semantic layout
├── style.css        # Obsidian dark mode design system & animations
├── app.js           # Open-Meteo API integration & Canvas particle engine
├── README.md        # Documentation and setup instructions
└── .gitignore       # Git ignore rules
```

---

## 📄 License
MIT License. Free for personal and commercial use.
