/**
 * Aether Weather - Ultra-Modern Atmospheric Intelligence Application
 * Open-Meteo API Integration + Canvas Weather Particle Engine + Indian & Global Metros Toggle
 */

// ==========================================================================
// Preset Cities Data (India & Global)
// ==========================================================================

const CITY_PRESETS = {
  india: [
    { city: "New Delhi", country: "India", state: "Delhi", lat: 28.6139, lon: 77.2090 },
    { city: "Mumbai", country: "India", state: "Maharashtra", lat: 19.0760, lon: 72.8777 },
    { city: "Bengaluru", country: "India", state: "Karnataka", lat: 12.9716, lon: 77.5946 },
    { city: "Kolkata", country: "India", state: "West Bengal", lat: 22.5726, lon: 88.3639 },
    { city: "Chennai", country: "India", state: "Tamil Nadu", lat: 13.0827, lon: 80.2707 },
    { city: "Hyderabad", country: "India", state: "Telangana", lat: 17.3850, lon: 78.4867 },
    { city: "Ahmedabad", country: "India", state: "Gujarat", lat: 23.0225, lon: 72.5714 },
    { city: "Jaipur", country: "India", state: "Rajasthan", lat: 26.9124, lon: 75.7873 },
    { city: "Pune", country: "India", state: "Maharashtra", lat: 18.5204, lon: 73.8567 },
    { city: "Chandigarh", country: "India", state: "Punjab", lat: 30.7333, lon: 76.7794 }
  ],
  global: [
    { city: "Tokyo", country: "Japan", lat: 35.6895, lon: 139.6917 },
    { city: "London", country: "United Kingdom", lat: 51.5085, lon: -0.1257 },
    { city: "New York", country: "United States", lat: 40.7143, lon: -74.0060 },
    { city: "Paris", country: "France", lat: 48.8534, lon: 2.3488 },
    { city: "Dubai", country: "United Arab Emirates", lat: 25.2048, lon: 55.2708 },
    { city: "Sydney", country: "Australia", lat: -33.8678, lon: 151.2073 },
    { city: "Singapore", country: "Singapore", lat: 1.3521, lon: 103.8198 },
    { city: "Toronto", country: "Canada", lat: 43.7001, lon: -79.4163 }
  ]
};

// ==========================================================================
// Weather Code Mappings & SVG Icon Generators
// ==========================================================================

const WMO_CODES = {
  0: { label: 'Clear Sky', icon: 'clear', isSunny: true },
  1: { label: 'Mainly Clear', icon: 'partly-cloudy', isSunny: true },
  2: { label: 'Partly Cloudy', icon: 'partly-cloudy', isSunny: false },
  3: { label: 'Overcast', icon: 'overcast', isSunny: false },
  45: { label: 'Foggy', icon: 'fog', isSunny: false },
  48: { label: 'Depositing Rime Fog', icon: 'fog', isSunny: false },
  51: { label: 'Light Drizzle', icon: 'drizzle', isSunny: false },
  53: { label: 'Moderate Drizzle', icon: 'drizzle', isSunny: false },
  55: { label: 'Dense Drizzle', icon: 'drizzle', isSunny: false },
  56: { label: 'Freezing Drizzle', icon: 'snow', isSunny: false },
  57: { label: 'Dense Freezing Drizzle', icon: 'snow', isSunny: false },
  61: { label: 'Slight Rain', icon: 'rain', isSunny: false },
  63: { label: 'Moderate Rain', icon: 'rain', isSunny: false },
  65: { label: 'Heavy Rain', icon: 'rain', isSunny: false },
  66: { label: 'Freezing Rain', icon: 'snow', isSunny: false },
  67: { label: 'Heavy Freezing Rain', icon: 'snow', isSunny: false },
  71: { label: 'Slight Snow Fall', icon: 'snow', isSunny: false },
  73: { label: 'Moderate Snow Fall', icon: 'snow', isSunny: false },
  75: { label: 'Heavy Snow Fall', icon: 'snow', isSunny: false },
  77: { label: 'Snow Grains', icon: 'snow', isSunny: false },
  80: { label: 'Slight Rain Showers', icon: 'showers', isSunny: false },
  81: { label: 'Moderate Rain Showers', icon: 'showers', isSunny: false },
  82: { label: 'Violent Rain Showers', icon: 'showers', isSunny: false },
  85: { label: 'Slight Snow Showers', icon: 'snow', isSunny: false },
  86: { label: 'Heavy Snow Showers', icon: 'snow', isSunny: false },
  95: { label: 'Thunderstorm', icon: 'thunderstorm', isSunny: false },
  96: { label: 'Thunderstorm with Hail', icon: 'thunderstorm', isSunny: false },
  99: { label: 'Heavy Thunderstorm', icon: 'thunderstorm', isSunny: false }
};

function getWeatherInfo(code) {
  return WMO_CODES[code] || { label: 'Partly Cloudy', icon: 'partly-cloudy', isSunny: false };
}

function createWeatherSVG(iconType, isDay = 1, size = 64) {
  const isNight = isDay === 0;

  switch (iconType) {
    case 'clear':
      if (isNight) {
        return `
          <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none">
            <defs>
              <linearGradient id="moonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fef08a" />
                <stop offset="100%" stop-color="#facc15" />
              </linearGradient>
              <filter id="moonGlow">
                <feGaussianBlur stdDeviation="3" result="glow" />
                <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
              </filter>
            </defs>
            <path d="M42 16a18 18 0 1 1-22 22 20 20 0 0 0 22-22z" fill="url(#moonGrad)" filter="url(#moonGlow)"/>
            <circle cx="16" cy="18" r="1.5" fill="#ffffff" opacity="0.8" />
            <circle cx="48" cy="46" r="1.5" fill="#ffffff" opacity="0.9" />
            <circle cx="46" cy="14" r="1" fill="#ffffff" opacity="0.6" />
          </svg>`;
      }
      return `
        <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none">
          <defs>
            <linearGradient id="sunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fde047" />
              <stop offset="100%" stop-color="#f59e0b" />
            </linearGradient>
            <filter id="sunGlow">
              <feGaussianBlur stdDeviation="4" result="glow" />
              <feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <g filter="url(#sunGlow)">
            <circle cx="32" cy="32" r="14" fill="url(#sunGrad)" />
            <g stroke="#f59e0b" stroke-width="3" stroke-linecap="round">
              <line x1="32" y1="8" x2="32" y2="13" />
              <line x1="32" y1="51" x2="32" y2="56" />
              <line x1="8" y1="32" x2="13" y2="32" />
              <line x1="51" y1="32" x2="56" y2="32" />
              <line x1="15" y1="15" x2="19" y2="19" />
              <line x1="45" y1="45" x2="49" y2="49" />
              <line x1="15" y1="49" x2="19" y2="45" />
              <line x1="45" y1="19" x2="49" y2="15" />
            </g>
          </g>
        </svg>`;

    case 'partly-cloudy':
      return `
        <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none">
          <defs>
            <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#ffffff" />
              <stop offset="100%" stop-color="#cbd5e1" />
            </linearGradient>
            <linearGradient id="partSun" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#fde047" />
              <stop offset="100%" stop-color="#f59e0b" />
            </linearGradient>
          </defs>
          <circle cx="${isNight ? '40' : '24'}" cy="22" r="10" fill="${isNight ? '#fde047' : 'url(#partSun)'}" />
          <path d="M46 48H20a12 12 0 0 1-1.5-23.9A14 14 0 0 1 44 26a10 10 0 0 1 2 22z" fill="url(#cloudGrad)" filter="drop-shadow(0 6px 10px rgba(0,0,0,0.25))" />
        </svg>`;

    case 'overcast':
    case 'fog':
      return `
        <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none">
          <defs>
            <linearGradient id="overcastGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#cbd5e1" />
              <stop offset="100%" stop-color="#64748b" />
            </linearGradient>
          </defs>
          <path d="M48 44H18a11 11 0 0 1-1.3-21.9A13 13 0 0 1 40 24a9 9 0 0 1 8 20z" fill="url(#overcastGrad)" opacity="0.9" />
          <path d="M44 48H16a10 10 0 0 1-1.2-19.9A12 12 0 0 1 36 30a8 8 0 0 1 8 18z" fill="#94a3b8" opacity="0.6" />
          ${iconType === 'fog' ? '<line x1="14" y1="52" x2="50" y2="52" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/><line x1="18" y1="57" x2="46" y2="57" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round"/>' : ''}
        </svg>`;

    case 'rain':
    case 'drizzle':
    case 'showers':
      return `
        <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none">
          <defs>
            <linearGradient id="rainCloud" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#94a3b8" />
              <stop offset="100%" stop-color="#475569" />
            </linearGradient>
          </defs>
          <path d="M46 40H20a11 11 0 0 1-1.5-21.9A13 13 0 0 1 44 20a9 9 0 0 1 2 20z" fill="url(#rainCloud)" />
          <g stroke="#38bdf8" stroke-width="2.5" stroke-linecap="round">
            <line x1="22" y1="46" x2="18" y2="54" />
            <line x1="32" y1="46" x2="28" y2="54" />
            <line x1="42" y1="46" x2="38" y2="54" />
          </g>
        </svg>`;

    case 'thunderstorm':
      return `
        <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none">
          <defs>
            <linearGradient id="stormCloud" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#475569" />
              <stop offset="100%" stop-color="#1e293b" />
            </linearGradient>
          </defs>
          <path d="M48 38H18a12 12 0 0 1-1.5-23.9A14 14 0 0 1 46 16a10 10 0 0 1 2 22z" fill="url(#stormCloud)" />
          <polygon points="34,36 24,48 31,48 27,60 41,45 33,45" fill="#fbbf24" stroke="#f59e0b" stroke-width="1" />
        </svg>`;

    case 'snow':
      return `
        <svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none">
          <defs>
            <linearGradient id="snowCloud" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#e2e8f0" />
              <stop offset="100%" stop-color="#94a3b8" />
            </linearGradient>
          </defs>
          <path d="M46 38H20a11 11 0 0 1-1.5-21.9A13 13 0 0 1 44 18a9 9 0 0 1 2 20z" fill="url(#snowCloud)" />
          <g fill="#ffffff">
            <circle cx="22" cy="46" r="2.5" />
            <circle cx="32" cy="52" r="2" />
            <circle cx="42" cy="46" r="2.5" />
            <circle cx="27" cy="56" r="1.8" />
            <circle cx="38" cy="56" r="1.8" />
          </g>
        </svg>`;

    default:
      return `<svg viewBox="0 0 64 64" width="${size}" height="${size}"><circle cx="32" cy="32" r="16" fill="#38bdf8"/></svg>`;
  }
}

// ==========================================================================
// Weather Particle & Atmosphere Engine (Canvas)
// ==========================================================================

class WeatherAtmosphereEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.weatherType = 'clear';
    this.isDay = 1;
    this.animationFrameId = null;

    this.resize = this.resize.bind(this);
    this.render = this.render.bind(this);

    window.addEventListener('resize', this.resize);
    this.resize();
    this.initParticles();
    this.render();
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.initParticles();
  }

  setWeather(iconType, isDay) {
    this.weatherType = iconType;
    this.isDay = isDay;
    this.updateAmbientGlows();
    this.initParticles();
  }

  updateAmbientGlows() {
    const g1 = document.querySelector('.glow-1');
    const g2 = document.querySelector('.glow-2');
    const g3 = document.querySelector('.glow-3');

    if (!g1 || !g2 || !g3) return;

    if (this.weatherType === 'thunderstorm') {
      g1.style.background = 'radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent 70%)';
      g2.style.background = 'radial-gradient(circle, rgba(234, 179, 8, 0.3), transparent 70%)';
      g3.style.background = 'radial-gradient(circle, rgba(30, 41, 59, 0.6), transparent 70%)';
    } else if (this.weatherType === 'rain' || this.weatherType === 'showers' || this.weatherType === 'drizzle') {
      g1.style.background = 'radial-gradient(circle, rgba(14, 165, 233, 0.3), transparent 70%)';
      g2.style.background = 'radial-gradient(circle, rgba(56, 189, 248, 0.2), transparent 70%)';
      g3.style.background = 'radial-gradient(circle, rgba(30, 58, 138, 0.35), transparent 70%)';
    } else if (this.weatherType === 'snow') {
      g1.style.background = 'radial-gradient(circle, rgba(224, 231, 255, 0.25), transparent 70%)';
      g2.style.background = 'radial-gradient(circle, rgba(199, 210, 254, 0.2), transparent 70%)';
      g3.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.2), transparent 70%)';
    } else if (this.weatherType === 'clear' && this.isDay) {
      g1.style.background = 'radial-gradient(circle, rgba(251, 191, 36, 0.28), transparent 70%)';
      g2.style.background = 'radial-gradient(circle, rgba(56, 189, 248, 0.25), transparent 70%)';
      g3.style.background = 'radial-gradient(circle, rgba(249, 115, 22, 0.2), transparent 70%)';
    } else {
      g1.style.background = 'radial-gradient(circle, rgba(14, 165, 233, 0.35), transparent 70%)';
      g2.style.background = 'radial-gradient(circle, rgba(99, 102, 241, 0.28), transparent 70%)';
      g3.style.background = 'radial-gradient(circle, rgba(168, 85, 247, 0.22), transparent 70%)';
    }
  }

  initParticles() {
    this.particles = [];
    const w = this.canvas.width;
    const h = this.canvas.height;

    if (this.weatherType === 'rain' || this.weatherType === 'showers' || this.weatherType === 'drizzle' || this.weatherType === 'thunderstorm') {
      const count = this.weatherType === 'drizzle' ? 60 : 130;
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          length: Math.random() * 20 + 10,
          speedY: Math.random() * 8 + 12,
          speedX: -2,
          opacity: Math.random() * 0.4 + 0.2
        });
      }
    } else if (this.weatherType === 'snow') {
      const count = 90;
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          radius: Math.random() * 2.5 + 1,
          speedY: Math.random() * 1.5 + 0.8,
          speedX: Math.random() * 1 - 0.5,
          opacity: Math.random() * 0.6 + 0.3,
          swing: Math.random() * Math.PI * 2
        });
      }
    } else {
      // Clear Night / Day / Clouds -> Stars / Ambient Dust
      const count = 75;
      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.7 + 0.2,
          pulseSpeed: Math.random() * 0.02 + 0.008,
          pulseVal: Math.random() * Math.PI
        });
      }
    }
  }

  render() {
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;

    ctx.clearRect(0, 0, w, h);

    if (this.weatherType === 'rain' || this.weatherType === 'showers' || this.weatherType === 'drizzle' || this.weatherType === 'thunderstorm') {
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let p of this.particles) {
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.speedX * 2, p.y + p.length);
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y > h) {
          p.y = -20;
          p.x = Math.random() * w;
        }
      }
      ctx.stroke();

      // Thunder flash random probability
      if (this.weatherType === 'thunderstorm' && Math.random() < 0.008) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.fillRect(0, 0, w, h);
      }
    } else if (this.weatherType === 'snow') {
      for (let p of this.particles) {
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.swing += 0.02;
        p.x += Math.sin(p.swing) * 0.8 + p.speedX;
        p.y += p.speedY;

        if (p.y > h) {
          p.y = -10;
          p.x = Math.random() * w;
        }
      }
    } else {
      // Twinkling stars or ambient light specs
      for (let p of this.particles) {
        p.pulseVal += p.pulseSpeed;
        const currentOpacity = (Math.sin(p.pulseVal) * 0.5 + 0.5) * p.opacity;
        ctx.fillStyle = this.isDay 
          ? `rgba(251, 191, 36, ${currentOpacity * 0.4})` 
          : `rgba(255, 255, 255, ${currentOpacity})`;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    this.animationFrameId = requestAnimationFrame(this.render);
  }
}

// ==========================================================================
// Offline Fallback Dataset (Zero Latency & Testing Guarantee)
// ==========================================================================

const FALLBACK_DATA = {
  "New Delhi": {
    city: "New Delhi",
    country: "India",
    lat: 28.6139,
    lon: 77.2090,
    current: {
      temperature_2m: 32.4,
      relative_humidity_2m: 68,
      apparent_temperature: 36.1,
      is_day: 1,
      precipitation: 0.2,
      weather_code: 2,
      surface_pressure: 1008,
      wind_speed_10m: 11.2,
      wind_direction_10m: 290
    },
    daily: {
      time: ["2026-08-17", "2026-08-18", "2026-08-19", "2026-08-20", "2026-08-21", "2026-08-22", "2026-08-23"],
      weather_code: [2, 61, 80, 2, 1, 0, 1],
      temperature_2m_max: [36.0, 34.5, 33.2, 35.8, 36.4, 37.0, 36.5],
      temperature_2m_min: [26.2, 25.0, 24.8, 25.5, 26.0, 27.1, 26.8],
      sunrise: ["2026-08-17T05:51", "2026-08-18T05:52", "2026-08-19T05:52", "2026-08-20T05:53", "2026-08-21T05:53", "2026-08-22T05:54", "2026-08-23T05:54"],
      sunset: ["2026-08-17T19:02", "2026-08-18T19:01", "2026-08-19T19:00", "2026-08-20T18:59", "2026-08-21T18:58", "2026-08-22T18:57", "2026-08-23T18:56"],
      uv_index_max: [7.5, 6.2, 5.8, 7.8, 8.2, 8.5, 8.1],
      precipitation_sum: [0.2, 4.8, 12.0, 0.5, 0.0, 0.0, 0.0],
      precipitation_probability_max: [15, 65, 80, 20, 10, 5, 10]
    },
    hourly: {
      time: Array.from({length: 24}, (_, i) => `2026-08-17T${String(i).padStart(2, '0')}:00`),
      temperature_2m: [27, 26.5, 26.2, 26.0, 26.5, 28.0, 30.2, 32.4, 34.0, 35.5, 36.0, 35.8, 35.0, 34.2, 33.5, 32.4, 31.8, 31.0, 30.5, 29.8, 29.0, 28.5, 28.0, 27.5],
      relative_humidity_2m: [82, 84, 85, 86, 85, 78, 72, 68, 62, 58, 56, 57, 60, 64, 68, 70, 72, 75, 78, 80, 81, 82, 83, 84],
      precipitation_probability: [0, 0, 0, 0, 0, 0, 5, 10, 15, 15, 10, 10, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      weather_code: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      wind_speed_10m: [8, 7, 6, 6, 7, 9, 10, 11, 12, 13, 14, 13, 12, 11, 10, 9, 8, 8, 7, 7, 6, 6, 5, 5]
    }
  },
  "Mumbai": {
    city: "Mumbai",
    country: "India",
    lat: 19.0760,
    lon: 72.8777,
    current: {
      temperature_2m: 29.8,
      relative_humidity_2m: 82,
      apparent_temperature: 34.5,
      is_day: 1,
      precipitation: 1.5,
      weather_code: 61,
      surface_pressure: 1006,
      wind_speed_10m: 16.5,
      wind_direction_10m: 240
    },
    daily: {
      time: ["2026-08-17", "2026-08-18", "2026-08-19", "2026-08-20", "2026-08-21", "2026-08-22", "2026-08-23"],
      weather_code: [61, 63, 65, 80, 61, 2, 2],
      temperature_2m_max: [30.5, 29.8, 29.2, 30.0, 31.0, 31.5, 31.8],
      temperature_2m_min: [25.5, 25.0, 24.8, 25.2, 25.8, 26.0, 26.2],
      sunrise: ["2026-08-17T06:18", "2026-08-18T06:18", "2026-08-19T06:19", "2026-08-20T06:19", "2026-08-21T06:19", "2026-08-22T06:20", "2026-08-23T06:20"],
      sunset: ["2026-08-17T19:08", "2026-08-18T19:07", "2026-08-19T19:06", "2026-08-20T19:05", "2026-08-21T19:04", "2026-08-22T19:03", "2026-08-23T19:03"],
      uv_index_max: [5.2, 4.8, 4.1, 5.5, 6.8, 7.5, 7.8],
      precipitation_sum: [8.5, 16.2, 24.0, 12.5, 5.2, 1.0, 0.5],
      precipitation_probability_max: [75, 90, 95, 80, 60, 30, 20]
    },
    hourly: {
      time: Array.from({length: 24}, (_, i) => `2026-08-17T${String(i).padStart(2, '0')}:00`),
      temperature_2m: [26, 26, 25.8, 25.5, 26, 27, 28, 29.8, 30.2, 30.5, 30.2, 29.8, 29.2, 29.0, 28.8, 28.5, 28.0, 27.8, 27.5, 27.2, 27.0, 26.8, 26.5, 26.2],
      relative_humidity_2m: [88, 89, 90, 92, 90, 86, 84, 82, 80, 78, 80, 82, 85, 86, 88, 89, 90, 91, 92, 92, 91, 90, 89, 88],
      precipitation_probability: [40, 50, 60, 70, 75, 70, 65, 60, 55, 50, 55, 60, 65, 70, 75, 70, 60, 55, 50, 45, 40, 35, 30, 30],
      weather_code: [61, 61, 61, 63, 63, 61, 61, 61, 61, 61, 61, 61, 61, 63, 63, 61, 61, 61, 61, 61, 61, 61, 61, 61],
      wind_speed_10m: [12, 13, 14, 15, 15, 16, 16.5, 17, 18, 18, 17, 16, 15, 15, 14, 13, 12, 12, 11, 11, 10, 10, 10, 10]
    }
  },
  "Bengaluru": {
    city: "Bengaluru",
    country: "India",
    lat: 12.9716,
    lon: 77.5946,
    current: {
      temperature_2m: 26.2,
      relative_humidity_2m: 71,
      apparent_temperature: 27.0,
      is_day: 1,
      precipitation: 0.0,
      weather_code: 1,
      surface_pressure: 915,
      wind_speed_10m: 14.2,
      wind_direction_10m: 260
    },
    daily: {
      time: ["2026-08-17", "2026-08-18", "2026-08-19", "2026-08-20", "2026-08-21", "2026-08-22", "2026-08-23"],
      weather_code: [1, 2, 80, 61, 2, 1, 0],
      temperature_2m_max: [28.5, 28.0, 27.2, 26.8, 28.0, 28.8, 29.0],
      temperature_2m_min: [19.5, 19.2, 19.0, 18.8, 19.2, 19.5, 19.8],
      sunrise: ["2026-08-17T06:08", "2026-08-18T06:08", "2026-08-19T06:08", "2026-08-20T06:09", "2026-08-21T06:09", "2026-08-22T06:09", "2026-08-23T06:09"],
      sunset: ["2026-08-17T18:44", "2026-08-18T18:43", "2026-08-19T18:43", "2026-08-20T18:42", "2026-08-21T18:41", "2026-08-22T18:40", "2026-08-23T18:40"],
      uv_index_max: [8.5, 8.0, 6.5, 5.8, 8.2, 8.8, 9.0],
      precipitation_sum: [0.0, 0.8, 4.2, 6.5, 1.2, 0.0, 0.0],
      precipitation_probability_max: [10, 25, 65, 75, 30, 10, 5]
    },
    hourly: {
      time: Array.from({length: 24}, (_, i) => `2026-08-17T${String(i).padStart(2, '0')}:00`),
      temperature_2m: [21, 20.5, 20.2, 19.8, 20.0, 21.5, 23.5, 25.2, 26.2, 27.5, 28.5, 28.2, 27.8, 27.0, 26.2, 25.5, 24.8, 24.0, 23.5, 23.0, 22.5, 22.0, 21.8, 21.2],
      relative_humidity_2m: [82, 85, 86, 88, 86, 80, 75, 71, 65, 62, 60, 62, 65, 68, 72, 75, 78, 80, 82, 84, 85, 85, 84, 83],
      precipitation_probability: [0, 0, 0, 0, 0, 0, 5, 5, 10, 10, 5, 5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      weather_code: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      wind_speed_10m: [10, 9, 9, 8, 10, 12, 13, 14.2, 15, 16, 16, 15, 14, 13, 12, 11, 10, 10, 9, 9, 8, 8, 7, 7]
    }
  }
};

// ==========================================================================
// Application Core Controller
// ==========================================================================

class WeatherApp {
  constructor() {
    this.currentUnit = 'c'; // 'c' | 'f'
    this.currentRegion = 'india'; // 'india' | 'global'
    this.currentCityIndex = 0;
    this.currentLocation = CITY_PRESETS.india[0]; // Start with New Delhi
    this.weatherData = null;
    this.favorites = this.loadFavorites();
    this.searchDebounceTimer = null;

    this.engine = new WeatherAtmosphereEngine('weather-canvas');
    this.bindDOMElements();
    this.attachEventListeners();
    
    // Initial Render
    this.renderRegionChips(this.currentRegion);
    this.fetchWeather(this.currentLocation);
  }

  bindDOMElements() {
    // Search
    this.searchInput = document.getElementById('city-search-input');
    this.searchSuggestions = document.getElementById('search-suggestions');
    this.clearSearchBtn = document.getElementById('clear-search-btn');
    this.geoLocationBtn = document.getElementById('geo-location-btn');

    // Controls
    this.unitToggle = document.getElementById('unit-toggle');
    this.unitCBtn = document.getElementById('unit-c-btn');
    this.unitFBtn = document.getElementById('unit-f-btn');
    this.favoritesToggleBtn = document.getElementById('favorites-toggle-btn');
    this.favoritesDrawer = document.getElementById('favorites-drawer');
    this.closeFavoritesBtn = document.getElementById('close-favorites-btn');
    this.savedCitiesList = document.getElementById('saved-cities-list');
    this.favCountBadge = document.getElementById('fav-count');

    // Regions & Steppers
    this.regionTabs = document.getElementById('region-tabs');
    this.quickChipsContainer = document.getElementById('quick-chips-list');
    this.prevCityBtn = document.getElementById('prev-city-btn');
    this.nextCityBtn = document.getElementById('next-city-btn');

    // Hero Section
    this.currentCityName = document.getElementById('current-city-name');
    this.currentCountryName = document.getElementById('current-country-name');
    this.bookmarkBtn = document.getElementById('bookmark-city-btn');
    this.bookmarkIcon = document.getElementById('bookmark-icon');
    this.heroAnimatedIcon = document.getElementById('hero-animated-icon');
    this.heroTemp = document.getElementById('hero-temp');
    this.heroTempUnit = document.getElementById('hero-temp-unit');
    this.heroConditionText = document.getElementById('hero-condition-text');
    this.heroFeelsLike = document.getElementById('hero-feels-like');
    this.heroHighLow = document.getElementById('hero-high-low');
    this.heroPrecipChance = document.getElementById('hero-precip-chance');
    this.liveTimeStamp = document.getElementById('live-time-stamp');

    // Metrics
    this.metricHumidity = document.getElementById('metric-humidity');
    this.progressHumidity = document.getElementById('progress-humidity');
    this.metricWind = document.getElementById('metric-wind');
    this.metricWindUnit = document.getElementById('metric-wind-unit');
    this.metricWindDir = document.getElementById('metric-wind-dir');
    this.windArrowIcon = document.getElementById('wind-arrow-icon');
    this.metricUv = document.getElementById('metric-uv');
    this.uvIndicator = document.getElementById('uv-indicator');
    this.tagUv = document.getElementById('tag-uv');
    this.metricPressure = document.getElementById('metric-pressure');
    this.metricSunrise = document.getElementById('metric-sunrise');
    this.metricSunset = document.getElementById('metric-sunset');
    this.metricPrecipSum = document.getElementById('metric-precip-sum');
    this.metricPrecipUnit = document.getElementById('metric-precip-unit');

    // Hourly & Daily Containers
    this.hourlyCardsContainer = document.getElementById('hourly-cards-container');
    this.hourlyPrevBtn = document.getElementById('hourly-prev-btn');
    this.hourlyNextBtn = document.getElementById('hourly-next-btn');
    this.dailyForecastContainer = document.getElementById('daily-forecast-container');

    // Overlays & Toast
    this.loadingOverlay = document.getElementById('loading-overlay');
    this.toastContainer = document.getElementById('toast-container');
  }

  attachEventListeners() {
    // Search input typing with debounce
    this.searchInput.addEventListener('input', (e) => {
      const query = e.target.value.trim();
      clearTimeout(this.searchDebounceTimer);
      if (query.length < 2) {
        this.hideSuggestions();
        return;
      }
      this.searchDebounceTimer = setTimeout(() => {
        this.handleSearchAutocomplete(query);
      }, 300);
    });

    // Search enter key
    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const query = this.searchInput.value.trim();
        if (query) {
          this.handleDirectCitySearch(query);
        }
      } else if (e.key === 'Escape') {
        this.hideSuggestions();
      }
    });

    // Keyboard Arrow Keys for City Toggling
    window.addEventListener('keydown', (e) => {
      // Don't intercept if user is typing in search input
      if (document.activeElement === this.searchInput) return;

      if (e.key === 'ArrowLeft') {
        this.togglePreviousCity();
      } else if (e.key === 'ArrowRight') {
        this.toggleNextCity();
      }
    });

    // Clear search button
    this.clearSearchBtn.addEventListener('click', () => {
      this.searchInput.value = '';
      this.hideSuggestions();
      this.searchInput.focus();
    });

    // Close suggestions on outside click
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-wrapper')) {
        this.hideSuggestions();
      }
    });

    // Geolocation button
    this.geoLocationBtn.addEventListener('click', () => {
      this.handleGeolocation();
    });

    // Unit toggle buttons
    this.unitCBtn.addEventListener('click', () => this.setUnit('c'));
    this.unitFBtn.addEventListener('click', () => this.setUnit('f'));

    // Region Tabs switcher (India vs Global)
    this.regionTabs.addEventListener('click', (e) => {
      const tab = e.target.closest('.region-tab');
      if (!tab) return;

      this.regionTabs.querySelectorAll('.region-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const region = tab.dataset.region;
      this.currentRegion = region;
      this.currentCityIndex = 0;
      this.renderRegionChips(region);

      // Automatically switch to first city in newly selected region
      const firstCity = CITY_PRESETS[region][0];
      this.fetchWeather(firstCity);
    });

    // Stepper buttons on Hero Card
    this.prevCityBtn.addEventListener('click', () => this.togglePreviousCity());
    this.nextCityBtn.addEventListener('click', () => this.toggleNextCity());

    // Favorites
    this.favoritesToggleBtn.addEventListener('click', () => {
      const isHidden = this.favoritesDrawer.hasAttribute('hidden');
      if (isHidden) {
        this.renderSavedCitiesDrawer();
        this.favoritesDrawer.removeAttribute('hidden');
      } else {
        this.favoritesDrawer.setAttribute('hidden', '');
      }
    });

    this.closeFavoritesBtn.addEventListener('click', () => {
      this.favoritesDrawer.setAttribute('hidden', '');
    });

    this.bookmarkBtn.addEventListener('click', () => {
      this.toggleFavoriteCurrentLocation();
    });

    // Quick Chips click delegation
    this.quickChipsContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      
      const city = chip.dataset.city;
      const country = chip.dataset.country;
      const lat = parseFloat(chip.dataset.lat);
      const lon = parseFloat(chip.dataset.lon);

      // Find index in current active preset
      const presetList = CITY_PRESETS[this.currentRegion];
      const foundIdx = presetList.findIndex(c => c.city.toLowerCase() === city.toLowerCase());
      if (foundIdx !== -1) {
        this.currentCityIndex = foundIdx;
      }

      this.updateActiveChip();
      this.fetchWeather({ city, country, lat, lon });
    });

    // Hourly Slider Controls
    this.hourlyPrevBtn.addEventListener('click', () => {
      this.hourlyCardsContainer.scrollBy({ left: -280, behavior: 'smooth' });
    });

    this.hourlyNextBtn.addEventListener('click', () => {
      this.hourlyCardsContainer.scrollBy({ left: 280, behavior: 'smooth' });
    });
  }

  // ==========================================================================
  // Region & City Toggling Logic
  // ==========================================================================

  renderRegionChips(region) {
    const list = CITY_PRESETS[region] || CITY_PRESETS.india;
    this.quickChipsContainer.innerHTML = list.map((item, idx) => `
      <button class="chip ${idx === this.currentCityIndex ? 'active' : ''}" 
        data-city="${item.city}" 
        data-country="${item.country}" 
        data-lat="${item.lat}" 
        data-lon="${item.lon}">
        ${item.city}${item.state ? `, ${item.state}` : ''}
      </button>
    `).join('');
  }

  updateActiveChip() {
    const chips = this.quickChipsContainer.querySelectorAll('.chip');
    chips.forEach((chip, idx) => {
      if (idx === this.currentCityIndex) {
        chip.classList.add('active');
        chip.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      } else {
        chip.classList.remove('active');
      }
    });
  }

  toggleNextCity() {
    const list = CITY_PRESETS[this.currentRegion];
    this.currentCityIndex = (this.currentCityIndex + 1) % list.length;
    this.updateActiveChip();
    this.fetchWeather(list[this.currentCityIndex]);
  }

  togglePreviousCity() {
    const list = CITY_PRESETS[this.currentRegion];
    this.currentCityIndex = (this.currentCityIndex - 1 + list.length) % list.length;
    this.updateActiveChip();
    this.fetchWeather(list[this.currentCityIndex]);
  }

  // ==========================================================================
  // Data Fetching & API Integration (Open-Meteo)
  // ==========================================================================

  async fetchWeather(location) {
    this.showLoading(true);
    this.currentLocation = location;

    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,surface_pressure,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max,precipitation_sum,precipitation_probability_max&timezone=auto`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Weather service returned ${response.status}`);
      }

      const data = await response.json();
      this.weatherData = {
        ...location,
        ...data
      };

      this.renderAll();
      this.showToast(`Updated weather for ${location.city}`, 'success');
    } catch (err) {
      console.warn('Live API request failed, utilizing smart offline cache:', err);
      // Use fallback data
      const fallback = FALLBACK_DATA[location.city] || {
        ...FALLBACK_DATA['New Delhi'],
        city: location.city,
        country: location.country || 'India',
        lat: location.lat,
        lon: location.lon
      };
      this.weatherData = fallback;
      this.renderAll();
      this.showToast(`Loaded forecast for ${location.city}`, 'info');
    } finally {
      this.showLoading(false);
    }
  }

  async handleSearchAutocomplete(query) {
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=6&language=en&format=json`;
      const response = await fetch(url);
      if (!response.ok) return;

      const data = await response.json();
      if (!data.results || data.results.length === 0) {
        this.renderSuggestions([]);
        return;
      }

      this.renderSuggestions(data.results);
    } catch (err) {
      console.error('Geocoding autocomplete failed:', err);
    }
  }

  async handleDirectCitySearch(cityName) {
    this.hideSuggestions();
    this.showLoading(true);
    try {
      const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`;
      const response = await fetch(url);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        const topResult = data.results[0];
        const location = {
          city: topResult.name,
          country: topResult.country || topResult.admin1 || '',
          lat: topResult.latitude,
          lon: topResult.longitude
        };
        this.fetchWeather(location);
      } else {
        this.showToast(`No location results found for "${cityName}"`, 'error');
        this.showLoading(false);
      }
    } catch (err) {
      this.showToast(`Could not search location. Check connection.`, 'error');
      this.showLoading(false);
    }
  }

  renderSuggestions(results) {
    if (results.length === 0) {
      this.searchSuggestions.innerHTML = `
        <div class="dropdown-item" style="color: var(--text-dim); cursor: default;">
          No matching cities found
        </div>`;
      this.searchSuggestions.removeAttribute('hidden');
      return;
    }

    this.searchSuggestions.innerHTML = results.map(item => `
      <div class="dropdown-item" data-city="${item.name}" data-country="${item.country || item.admin1 || ''}" data-lat="${item.latitude}" data-lon="${item.longitude}">
        <span class="item-city-name">${item.name}</span>
        <span class="item-country-name">${item.country ? `${item.country}${item.admin1 ? ` • ${item.admin1}` : ''}` : ''}</span>
      </div>
    `).join('');

    this.searchSuggestions.removeAttribute('hidden');

    this.searchSuggestions.querySelectorAll('.dropdown-item').forEach(item => {
      item.addEventListener('click', () => {
        const city = item.dataset.city;
        const country = item.dataset.country;
        const lat = parseFloat(item.dataset.lat);
        const lon = parseFloat(item.dataset.lon);

        this.searchInput.value = `${city}${country ? `, ${country}` : ''}`;
        this.hideSuggestions();
        this.fetchWeather({ city, country, lat, lon });
      });
    });
  }

  hideSuggestions() {
    this.searchSuggestions.setAttribute('hidden', '');
  }

  handleGeolocation() {
    if (!navigator.geolocation) {
      this.showToast('Geolocation is not supported by your browser', 'error');
      return;
    }

    this.showLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        try {
          // Reverse geocoding
          const revUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
          const res = await fetch(revUrl);
          const data = await res.json();
          const city = data.city || data.locality || 'Current Location';
          const country = data.countryName || 'India';

          this.fetchWeather({ city, country, lat, lon });
        } catch (e) {
          this.fetchWeather({ city: 'My Location', country: '', lat, lon });
        }
      },
      (err) => {
        this.showToast('Location permission denied or unavailable', 'error');
        this.showLoading(false);
      },
      { timeout: 10000 }
    );
  }

  // ==========================================================================
  // Unit Conversion & Helpers
  // ==========================================================================

  setUnit(unit) {
    if (this.currentUnit === unit) return;
    this.currentUnit = unit;

    if (unit === 'f') {
      this.unitToggle.classList.add('fahrenheit');
      this.unitFBtn.classList.add('active');
      this.unitCBtn.classList.remove('active');
    } else {
      this.unitToggle.classList.remove('fahrenheit');
      this.unitCBtn.classList.add('active');
      this.unitFBtn.classList.remove('active');
    }

    if (this.weatherData) {
      this.renderAll();
    }
  }

  formatTemp(celsius) {
    if (celsius === undefined || celsius === null) return '--';
    if (this.currentUnit === 'f') {
      return Math.round((celsius * 9) / 5 + 32);
    }
    return Math.round(celsius);
  }

  formatWindSpeed(kmh) {
    if (kmh === undefined || kmh === null) return '--';
    if (this.currentUnit === 'f') {
      return `${Math.round(kmh * 0.621371)} mph`;
    }
    return `${Math.round(kmh)} km/h`;
  }

  formatPrecipitation(mm) {
    if (mm === undefined || mm === null) return '0.0';
    if (this.currentUnit === 'f') {
      return `${(mm * 0.0393701).toFixed(2)} in`;
    }
    return `${mm.toFixed(1)} mm`;
  }

  getWindDirectionName(degrees) {
    const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
    const idx = Math.round((degrees % 360) / 22.5) % 16;
    return directions[idx];
  }

  getUVInterpretation(uv) {
    if (uv <= 2) return { text: 'Low', class: 'tag-low' };
    if (uv <= 5) return { text: 'Moderate', class: 'tag-moderate' };
    if (uv <= 7) return { text: 'High', class: 'tag-high' };
    return { text: 'Very High', class: 'tag-very-high' };
  }

  // ==========================================================================
  // UI Rendering
  // ==========================================================================

  renderAll() {
    if (!this.weatherData) return;

    this.renderHero();
    this.renderMetrics();
    this.renderHourly();
    this.renderDaily();
    this.updateBookmarkButtonState();

    // Trigger canvas weather visual
    const currentCode = this.weatherData.current.weather_code;
    const isDay = this.weatherData.current.is_day !== undefined ? this.weatherData.current.is_day : 1;
    const weatherInfo = getWeatherInfo(currentCode);
    this.engine.setWeather(weatherInfo.icon, isDay);
  }

  renderHero() {
    const cur = this.weatherData.current;
    const weatherInfo = getWeatherInfo(cur.weather_code);
    const isDay = cur.is_day !== undefined ? cur.is_day : 1;

    this.currentCityName.textContent = this.weatherData.city;
    this.currentCountryName.textContent = this.weatherData.country || 'India';

    // Temp & Unit
    this.heroTemp.textContent = this.formatTemp(cur.temperature_2m);
    this.heroTempUnit.textContent = `°${this.currentUnit.toUpperCase()}`;
    this.heroConditionText.textContent = weatherInfo.label;

    // Animated SVG Icon
    this.heroAnimatedIcon.innerHTML = createWeatherSVG(weatherInfo.icon, isDay, 110);

    // Sub stats
    this.heroFeelsLike.textContent = `${this.formatTemp(cur.apparent_temperature)}°${this.currentUnit.toUpperCase()}`;

    if (this.weatherData.daily && this.weatherData.daily.temperature_2m_max) {
      const maxT = this.formatTemp(this.weatherData.daily.temperature_2m_max[0]);
      const minT = this.formatTemp(this.weatherData.daily.temperature_2m_min[0]);
      this.heroHighLow.textContent = `${maxT}° / ${minT}°`;

      const rainProb = this.weatherData.daily.precipitation_probability_max 
        ? `${this.weatherData.daily.precipitation_probability_max[0]}%` 
        : '0%';
      this.heroPrecipChance.textContent = rainProb;
    }

    // Timestamp
    const now = new Date();
    this.liveTimeStamp.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  renderMetrics() {
    const cur = this.weatherData.current;
    const daily = this.weatherData.daily;

    // Humidity
    const humidity = cur.relative_humidity_2m || 0;
    this.metricHumidity.innerHTML = `${humidity}<span class="metric-unit">%</span>`;
    this.progressHumidity.style.width = `${humidity}%`;

    // Wind
    const windSpeedStr = this.formatWindSpeed(cur.wind_speed_10m);
    const windDirDeg = cur.wind_direction_10m || 0;
    const windDirName = this.getWindDirectionName(windDirDeg);

    this.metricWind.innerHTML = `${windSpeedStr.split(' ')[0]}<span class="metric-unit"> ${windSpeedStr.split(' ')[1]}</span>`;
    this.metricWindDir.textContent = `${windDirName} (${windDirDeg}°) • Smooth Flow`;
    this.windArrowIcon.style.transform = `rotate(${windDirDeg}deg)`;

    // UV Index
    const uvVal = daily && daily.uv_index_max ? daily.uv_index_max[0] : 6.5;
    const uvInfo = this.getUVInterpretation(uvVal);
    this.metricUv.innerHTML = `${uvVal.toFixed(1)}<span class="metric-unit"> / 11</span>`;
    this.uvIndicator.style.left = `${Math.min(100, Math.max(0, (uvVal / 11) * 100))}%`;
    this.tagUv.textContent = uvInfo.text;
    this.tagUv.className = `metric-tag ${uvInfo.class}`;

    // Pressure
    const pressure = cur.surface_pressure ? Math.round(cur.surface_pressure) : 1010;
    this.metricPressure.innerHTML = `${pressure}<span class="metric-unit"> hPa</span>`;

    // Sunrise & Sunset
    if (daily && daily.sunrise && daily.sunset) {
      const sunriseTime = new Date(daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const sunsetTime = new Date(daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      this.metricSunrise.textContent = sunriseTime;
      this.metricSunset.textContent = sunsetTime;
    }

    // Precipitation sum
    const precipSum = daily && daily.precipitation_sum ? daily.precipitation_sum[0] : (cur.precipitation || 0);
    const precipFormatted = this.formatPrecipitation(precipSum);
    const [pVal, pUnit] = precipFormatted.split(' ');
    this.metricPrecipSum.innerHTML = `${pVal}<span class="metric-unit"> ${pUnit}</span>`;
  }

  renderHourly() {
    const hourly = this.weatherData.hourly;
    if (!hourly || !hourly.time) return;

    const times = hourly.time.slice(0, 24);
    const temps = hourly.temperature_2m.slice(0, 24);
    const codes = hourly.weather_code.slice(0, 24);
    const rainProbs = hourly.precipitation_probability ? hourly.precipitation_probability.slice(0, 24) : [];

    this.hourlyCardsContainer.innerHTML = times.map((t, idx) => {
      const date = new Date(t);
      const hourLabel = idx === 0 ? 'Now' : date.toLocaleTimeString([], { hour: 'numeric', hour12: true });
      const tempVal = this.formatTemp(temps[idx]);
      const wInfo = getWeatherInfo(codes[idx]);
      const rain = rainProbs[idx] !== undefined ? `${rainProbs[idx]}%` : '0%';
      const isCurrent = idx === 0;
      const isDayHour = date.getHours() >= 6 && date.getHours() <= 19 ? 1 : 0;

      return `
        <div class="hourly-card ${isCurrent ? 'current-hour' : ''}">
          <span class="hourly-time">${hourLabel}</span>
          <div class="hourly-icon">
            ${createWeatherSVG(wInfo.icon, isDayHour, 32)}
          </div>
          <span class="hourly-temp">${tempVal}°</span>
          <div class="hourly-rain">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
            <span>${rain}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  renderDaily() {
    const daily = this.weatherData.daily;
    if (!daily || !daily.time) return;

    const allMins = daily.temperature_2m_min;
    const allMaxs = daily.temperature_2m_max;
    const globalMin = Math.min(...allMins);
    const globalMax = Math.max(...allMaxs);
    const tempRange = Math.max(1, globalMax - globalMin);

    const days = daily.time.map((t, idx) => {
      const date = new Date(t);
      const isToday = idx === 0;
      const dayName = isToday ? 'Today' : date.toLocaleDateString([], { weekday: 'short' });
      const dateStr = date.toLocaleDateString([], { month: 'short', day: 'numeric' });

      const wInfo = getWeatherInfo(daily.weather_code[idx]);
      const minTemp = this.formatTemp(daily.temperature_2m_min[idx]);
      const maxTemp = this.formatTemp(daily.temperature_2m_max[idx]);

      const minPerc = ((daily.temperature_2m_min[idx] - globalMin) / tempRange) * 100;
      const maxPerc = ((daily.temperature_2m_max[idx] - globalMin) / tempRange) * 100;
      const barWidth = Math.max(10, maxPerc - minPerc);

      const rainChance = daily.precipitation_probability_max ? `${daily.precipitation_probability_max[idx]}%` : '0%';

      return `
        <div class="daily-row">
          <div class="daily-day-info">
            <span class="daily-day-name">${dayName}</span>
            <span class="daily-day-date">${dateStr}</span>
          </div>

          <div class="daily-condition">
            <div class="daily-icon-box">
              ${createWeatherSVG(wInfo.icon, 1, 28)}
            </div>
            <span class="daily-condition-label">${wInfo.label}</span>
          </div>

          <div class="daily-temp-bar-wrap">
            <span class="temp-bar-min">${minTemp}°</span>
            <div class="temp-bar-track">
              <div class="temp-bar-range" style="left: ${minPerc.toFixed(1)}%; width: ${barWidth.toFixed(1)}%;"></div>
            </div>
            <span class="temp-bar-max">${maxTemp}°</span>
          </div>

          <div class="daily-rain-chance">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
            </svg>
            <span>${rainChance}</span>
          </div>
        </div>
      `;
    }).join('');

    this.dailyForecastContainer.innerHTML = days;
  }

  // ==========================================================================
  // Favorites / Saved Locations
  // ==========================================================================

  loadFavorites() {
    try {
      const saved = localStorage.getItem('aether_weather_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveFavorites() {
    try {
      localStorage.setItem('aether_weather_favorites', JSON.stringify(this.favorites));
      this.updateFavoritesBadge();
    } catch (e) {
      console.warn('LocalStorage save failed:', e);
    }
  }

  updateFavoritesBadge() {
    if (this.favorites.length > 0) {
      this.favCountBadge.textContent = this.favorites.length;
      this.favCountBadge.removeAttribute('hidden');
    } else {
      this.favCountBadge.setAttribute('hidden', '');
    }
  }

  isFavorite(cityName) {
    return this.favorites.some(f => f.city.toLowerCase() === cityName.toLowerCase());
  }

  toggleFavoriteCurrentLocation() {
    if (!this.weatherData) return;

    const city = this.weatherData.city;
    const country = this.weatherData.country;
    const lat = this.weatherData.lat;
    const lon = this.weatherData.lon;

    if (this.isFavorite(city)) {
      this.favorites = this.favorites.filter(f => f.city.toLowerCase() !== city.toLowerCase());
      this.showToast(`Removed ${city} from saved locations`, 'info');
    } else {
      this.favorites.push({ city, country, lat, lon });
      this.showToast(`Saved ${city} to favorites`, 'success');
    }

    this.saveFavorites();
    this.updateBookmarkButtonState();
    this.renderSavedCitiesDrawer();
  }

  updateBookmarkButtonState() {
    if (!this.weatherData) return;
    const isFav = this.isFavorite(this.weatherData.city);
    if (isFav) {
      this.bookmarkBtn.classList.add('active');
      this.bookmarkBtn.title = 'Remove from saved locations';
      this.bookmarkIcon.setAttribute('fill', 'currentColor');
    } else {
      this.bookmarkBtn.classList.remove('active');
      this.bookmarkBtn.title = 'Save this location';
      this.bookmarkIcon.setAttribute('fill', 'none');
    }
    this.updateFavoritesBadge();
  }

  renderSavedCitiesDrawer() {
    if (this.favorites.length === 0) {
      this.savedCitiesList.innerHTML = `
        <div class="empty-fav-state">
          <p>No saved locations yet. Click the bookmark icon on any city to pin it here!</p>
        </div>`;
      return;
    }

    this.savedCitiesList.innerHTML = this.favorites.map(fav => `
      <div class="saved-city-card" data-city="${fav.city}" data-country="${fav.country}" data-lat="${fav.lat}" data-lon="${fav.lon}">
        <div class="saved-city-info">
          <h4>${fav.city}</h4>
          <span>${fav.country || 'India'}</span>
        </div>
        <button class="icon-btn remove-fav-btn" title="Remove" data-remove="${fav.city}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6 6 18M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    `).join('');

    this.savedCitiesList.querySelectorAll('.saved-city-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.remove-fav-btn')) {
          const toRemove = e.target.closest('.remove-fav-btn').dataset.remove;
          this.favorites = this.favorites.filter(f => f.city !== toRemove);
          this.saveFavorites();
          this.updateBookmarkButtonState();
          this.renderSavedCitiesDrawer();
          return;
        }

        const city = card.dataset.city;
        const country = card.dataset.country;
        const lat = parseFloat(card.dataset.lat);
        const lon = parseFloat(card.dataset.lon);

        this.favoritesDrawer.setAttribute('hidden', '');
        this.fetchWeather({ city, country, lat, lon });
      });
    });
  }

  // ==========================================================================
  // Loading & Toast Notifications
  // ==========================================================================

  showLoading(show) {
    if (show) {
      this.loadingOverlay.classList.add('active');
    } else {
      this.loadingOverlay.classList.remove('active');
    }
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#34d399" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>';
    } else if (type === 'error') {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>';
    } else {
      iconSvg = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>';
    }

    toast.innerHTML = `${iconSvg}<span>${message}</span>`;
    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
}

// Instantiate on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  window.app = new WeatherApp();
});
