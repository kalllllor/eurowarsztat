import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import Experience from "./Experience";
import useFetchGalleryData from "./hooks/useFetchGalleryData";

const TARGET_URL = "https://euroworkshop.net/";

/**
 * Sterowanie kamerą Three.js
 */
const CameraController = ({ camX, camY, camZ }) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(camX, camY, camZ);
  }, [camX, camY, camZ, camera]);

  return null;
};

/**
 * Otwieranie strony w zewnętrznej przeglądarce
 */
function openExternally() {
  const ua = navigator.userAgent || "";
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);

  if (isAndroid) {
    const intent =
      "intent://euroworkshop.net/#Intent;scheme=https;package=com.android.chrome;" +
      "S.browser_fallback_url=" +
      encodeURIComponent(TARGET_URL) +
      ";end";

    window.location.href = intent;
    return;
  }

  if (isIOS) {
    window.open(TARGET_URL, "_blank", "noopener,noreferrer");
    return;
  }

  // Desktop / inne systemy
  window.open(TARGET_URL, "_blank", "noopener,noreferrer");
}

/**
 * Kopiowanie linku do schowka
 */
async function copyLink() {
  try {
    await navigator.clipboard.writeText(TARGET_URL);
    alert("Skopiowano link. Otwórz Safari/Chrome i wklej adres.");
  } catch {
    alert("Skopiuj ręcznie: euroworkshop.net");
  }
}

const App = () => {
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);

  const { galleryData, carouselData, eventsData, error, loading } =
    useFetchGalleryData(
      "https://lightgray-lapwing-857049.hostingersite.com/index.php/wp-json/wp/v2/posts?_fields=acf&acf_format=standard&per_page=100"
    );

  const camX = 0;
  const camY = 0;
  const camZ = 3;

  /**
   * Detekcja in-app browserów (Instagram / Messenger / Facebook)
   * + próba otwarcia w zewnętrznej przeglądarce
   */
  useEffect(() => {
    const ua = navigator.userAgent || "";
    const ref = document.referrer || "";

    const hostnameFrom = (url) => {
      try {
        return new URL(url).hostname;
      } catch {
        return "";
      }
    };

    const refHost = hostnameFrom(ref);

    const isMetaInApp =
      /Instagram|FBAN|FBAV|Messenger/i.test(ua) ||
      /(^|\.)instagram\.com$/i.test(refHost) ||
      /(^|\.)l\.instagram\.com$/i.test(refHost) ||
      /(^|\.)m\.facebook\.com$/i.test(refHost);

    if (isMetaInApp) {
      setIsInAppBrowser(true);

      // Opcjonalna automatyczna próba otwarcia w zewnętrznej przeglądarce
      // (mały delay, żeby zdążyć wyrenderować fallback)
      setTimeout(() => {
        try {
          openExternally();
        } catch {
          // Ignorujemy – użytkownik ma przyciski i link jako fallback
        }
      }, 300);
    }
  }, []);

  /**
   * Detekcja wsparcia WebGL
   */
  const webglSupported = useMemo(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl =
        canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

      return !!(gl && gl.getParameter && gl.getParameter(gl.VERSION));
    } catch (_) {
      return false;
    }
  }, []);

  const isAndroid = useMemo(
    () => /Android/i.test(navigator.userAgent || ""),
    []
  );

  /**
   * Widok dla in-app browserów (Instagram / Messenger / Facebook)
   */
  if (isInAppBrowser) {
    const ua = navigator.userAgent || "";
    const isMessenger = /Messenger/i.test(ua);

    if (isMessenger) {
      return (
        <div className="loading__screen" style={{ padding: 24 }}>
          <div
            style={{
              color: "#333",
              textAlign: "center",
              fontSize: 16,
              padding: 20,
              maxWidth: 420,
              margin: "0 auto",
              lineHeight: 1.5,
            }}
          >
            <h2
              style={{
                color: "#333",
                marginBottom: 20,
                fontSize: 24,
                fontWeight: 500,
              }}
            >
              Eurowarsztat
            </h2>

            <p style={{ marginBottom: 12 }}>
              Otworzyłeś stronę w przeglądarce Messengera. Ten tryb blokuje
              przejście do Safari/Chrome. Otwórz stronę w natywnej przeglądarce.
            </p>

            <div
              style={{
                border: "1px solid #ccc",
                color: "#333",
                padding: 14,
                borderRadius: 8,
                margin: "14px 0 18px",
                fontFamily: "monospace",
                fontSize: 14,
                overflowWrap: "anywhere",
              }}
            >
              <strong>{TARGET_URL}</strong>
            </div>

            <div style={{ display: "grid", gap: 10 }}>
              <button
                style={{
                  background: "#333",
                  color: "#ccc",
                  border: "none",
                  padding: "14px 18px",
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: "pointer",
                  width: "100%",
                }}
                onClick={openExternally}
              >
                Otwórz w przeglądarce
              </button>
              <button
                style={{
                  background: "#333",
                  color: "#ccc",
                  border: "1px solid #444",
                  padding: "12px 16px",
                  borderRadius: 8,
                  fontSize: 14,
                  cursor: "pointer",
                  width: "100%",
                }}
                onClick={copyLink}
              >
                Kopiuj link
              </button>
            </div>

            <p
              style={{
                fontSize: 12,
                opacity: 0.8,
                marginTop: 14,
                color: "#9aa",
              }}
            >
              Messenger: stuknij <strong>⋯</strong> w prawym górnym rogu →{" "}
              <em>Otwórz w przeglądarce</em>.
            </p>
          </div>
        </div>
      );
    }

    // Ogólny in-app (Instagram / Facebook itp.)
    return (
      <div className="loading__screen" style={{ padding: 24 }}>
        <div
          style={{
            color: "#333",
            textAlign: "center",
            fontSize: 16,
            padding: 20,
            maxWidth: 420,
            margin: "0 auto",
            lineHeight: 1.5,
          }}
        >
          <h2
            style={{
              color: "#333",
              marginBottom: 20,
              fontSize: 24,
              fontWeight: 500,
            }}
          >
            Eurowarsztat
          </h2>

          <p style={{ marginBottom: 12 }}>
            Otworzyłeś stronę w przeglądarce aplikacji (Instagram/Messenger/
            Facebook). Aby działała poprawnie, otwórz ją w domyślnej
            przeglądarce systemowej.
          </p>

          <div
            style={{
              border: "1px solid #ccc",
              color: "#333",
              padding: 14,
              borderRadius: 8,
              margin: "14px 0 18px",
              fontFamily: "monospace",
              fontSize: 14,
              overflowWrap: "anywhere",
            }}
          >
            <strong>{TARGET_URL}</strong>
          </div>

          <div style={{ display: "grid", gap: 10 }}>
            <button
              style={{
                background: "#333",
                color: "#ccc",
                border: "none",
                padding: "14px 18px",
                borderRadius: 8,
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                width: "100%",
                boxShadow: isAndroid
                  ? "0 4px 12px rgba(74, 144, 226, 0.3)"
                  : "none",
              }}
              onClick={openExternally}
            >
              Otwórz w przeglądarce
            </button>
            <button
              style={{
                background: "#333",
                color: "#ccc",
                border: "1px solid #444",
                padding: "12px 16px",
                borderRadius: 8,
                fontSize: 14,
                cursor: "pointer",
                width: "100%",
              }}
              onClick={copyLink}
            >
              Kopiuj link
            </button>
          </div>

          <p
            style={{
              fontSize: 12,
              opacity: 0.8,
              marginTop: 14,
              color: "#9aa",
            }}
          >
            Instagram: stuknij <strong>⋯</strong> w prawym górnym rogu →{" "}
            <em>Otwórz w przeglądarce</em>.
          </p>
        </div>
      </div>
    );
  }

  if (loading) {
    return <div className="loading__screen">Loading...</div>;
  }

  if (error) {
    return (
      <div className="loading__screen">
        <div
          style={{
            color: "#d4d8d8",
            textAlign: "center",
            fontSize: 18,
          }}
        >
          <p>Unable to load content.</p>
          <p>
            Please try refreshing the page or opening in a different browser.
          </p>
        </div>
      </div>
    );
  }

  if (!webglSupported) {
    return (
      <div className="loading__screen">
        <div
          style={{
            color: "#d4d8d8",
            textAlign: "center",
            fontSize: 18,
          }}
        >
          <p>Your browser doesn't support WebGL.</p>
          <p>
            Please try opening this page in a modern browser like Chrome,
            Firefox, or Safari.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="app"
      style={{
        animation: "fadeIn 0.5s ease-in-out",
      }}
    >
      <Suspense fallback={<div className="loading__screen">Loading...</div>}>
        <Canvas
          camera={{
            fov: 75,
            position: [camX, camY, camZ],
          }}
        >
          <CameraController camX={camX} camY={camY} camZ={camZ} />
          <Experience
            galleryData={galleryData}
            carouselData={carouselData}
            eventsData={eventsData}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default App;
