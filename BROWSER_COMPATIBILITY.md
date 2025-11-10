# Browser Compatibility Issues and Solutions

## Problem

Strona nie ładuje się w niektórych przeglądarkach, szczególnie w przeglądarce Messengera, pokazując biały ekran.

## Główne przyczyny

### 1. **WebGL/Three.js Support**

- Przeglądarka Messengera może nie obsługiwać WebGL
- Niektóre starsze przeglądarki mają ograniczoną obsługę WebGL

### 2. **ES Modules**

- Projekt używa ES Modules (`type: "module"`)
- Starsze przeglądarki mogą nie obsługiwać tej funkcjonalności

### 3. **Nowoczesny CSS**

- Używanie `svh` (Screen Viewport Height) jednostek
- CSS Grid bez fallbacków
- Modern CSS funkcje

### 4. **Zewnętrzne zasoby**

- Google Fonts mogą być blokowane
- Adobe Fonts (Typekit) mogą być blokowane
- API WordPress może być niedostępne

## Implementowane rozwiązania

### ✅ **Już zaimplementowane:**

1. **WebGL Detection** - sprawdzanie obsługi WebGL z odpowiednim komunikatem błędu
2. **CSS Fallbacks** - dodanie fallbacków dla `svh` jednostek
3. **Error Handling** - lepsze obsługiwanie błędów ładowania danych
4. **Font Loading** - optymalizacja ładowania fontów
5. **Browser Target** - ustawienie kompatybilności dla starszych przeglądarek
6. **Timeout dla API** - timeout 10 sekund dla zapytań do API

### 🔄 **Dodatkowe rozwiązania do rozważenia:**

#### A. Dodanie polyfilli

```bash
npm install --save core-js regenerator-runtime
```

#### B. Service Worker dla cachowania

```javascript
// Cachowanie statycznych zasobów
```

#### C. Progressive Enhancement

```javascript
// Graceful degradation dla starszych przeglądarek
```

## Testowanie

### Zarekomendowane przeglądarki do testowania:

- Chrome (desktop/mobile)
- Firefox (desktop/mobile)
- Safari (desktop/mobile)
- Edge
- Samsung Internet
- Facebook/Messenger in-app browser
- Instagram in-app browser

### Narzędzia do testowania:

- BrowserStack
- CrossBrowserTesting
- Device simulators w Chrome DevTools

## Monitorowanie

Możesz dodać analytics aby śledzić błędy:

```javascript
// Google Analytics lub Sentry dla monitorowania błędów
window.addEventListener("error", (e) => {
  // Log error to analytics service
});
```

## Szybkie rozwiązanie problemu

Jeśli problem nadal występuje, zalecane jest:

1. **Sprawdzenie w Chrome DevTools** - czy są błędy w konsoli
2. **Test w różnych przeglądarkach**
3. **Dodanie prostego fallback'u** - statyczna wersja strony dla nieobsługiwanych przeglądarek
4. **Redirect** - przekierowanie z in-app browsers na zewnętrzną przeglądarkę

```javascript
// Detekcja in-app browser i przekierowanie
if (
  navigator.userAgent.includes("FBAN") ||
  navigator.userAgent.includes("FBAV")
) {
  // Facebook/Messenger browser detected
  window.location.href =
    "googlechrome://euroworkshop.net" ||
    window.location.href;
}
```
