import React, { Suspense, useEffect, useMemo, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import Experience from "./Experience";
import useFetchGalleryData from "./hooks/useFetchGalleryData";

const TARGET_URL = "https://euroworkshop.net/";

const App = () => {
  const [isInAppBrowser, setIsInAppBrowser] = useState(false);
  const [glCrashed, setGlCrashed] = useState(false);

  const { galleryData, carouselData, eventsData, error, loading } =
    useFetchGalleryData(
      "https://lightgray-lapwing-857049.hostingersite.com/index.php/wp-json/wp/v2/posts?_fields=acf&acf_format=standard&per_page=100"
    );

  const camX = 0;
  const camY = 0;
  const camZ = 3;
  useEffect(() => {
    const ua = navigator.userAgent || "";
    const ref = document.referrer || "";

    // Check if this is Safari or Chrome (exclude from in-app detection)
    const isSafari =
      /Safari/i.test(ua) && !/Chrome/i.test(ua) && !/Chromium/i.test(ua);

    const isChrome =
      /Chrome/i.test(ua) &&
      !/Instagram/i.test(ua) &&
      !/Facebook/i.test(ua) &&
      !/FBAN/i.test(ua) &&
      !/FBAV/i.test(ua) &&
      !/FB_IAB/i.test(ua);

    // If it's Safari or regular Chrome, don't show in-app browser message
    if (isSafari || isChrome) {
      return;
    }

    const hostnameFrom = (url) => {
      try {
        return new URL(url).hostname;
      } catch {
        return "";
      }
    };

    const hasIGParams = (() => {
      const qs = new URLSearchParams(window.location.search);
      if (qs.has("igshid") || qs.has("ig_rid")) return true;
      const utm = qs.get("utm_source") || "";
      return /^ig/i.test(utm);
    })();

    const isInstagramUA = /Instagram/i.test(ua);
    const refHost = hostnameFrom(ref);
    const isInstagramRef =
      /(^|\.)instagram\.com$/i.test(refHost) ||
      /(^|\.)l\.instagram\.com$/i.test(refHost);

    const isFacebookIAB = /(FBAN|FBAV|FB_IAB)/i.test(ua); // Messenger / Facebook in-app
    const isMessenger = /Messenger/i.test(ua);

    const isInApp =
      isInstagramUA || isInstagramRef || hasIGParams || isFacebookIAB;
    const isInstagramContext = isInstagramUA || isInstagramRef || hasIGParams;

    if (isInApp) {
      setIsInAppBrowser(true);

      // Auto‑redirect tylko dla Instagrama (nie dla Facebook/Messenger) – jednorazowo na iOS
      const uaIsIOS = /iPhone|iPad|iPod/i.test(ua);
      if (uaIsIOS && isInstagramContext) {
        const FLAG = "native_redirect_done";
        try {
          const already = sessionStorage.getItem(FLAG);
          if (!already) {
            sessionStorage.setItem(FLAG, "1");
            try {
              window.location.href = "googlechrome://euroworkshop.net/";
              setTimeout(() => {
                if (!document.hidden) {
                  window.location.replace(TARGET_URL);
                }
              }, 650);
            } catch (_) {
              window.location.replace(TARGET_URL);
            }
          }
        } catch (_) {
          try {
            window.location.replace(TARGET_URL);
          } catch {}
        }
      }
    }
  }, []);

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

  const CameraController = ({ camX, camY, camZ }) => {
    const { camera } = useThree();
    useEffect(() => {
      camera.position.set(camX, camY, camZ);
    }, [camX, camY, camZ, camera]);
    return null;
  };
  const isAndroid = /Android/i.test(navigator.userAgent || "");
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent || "");
  // --- Handlers for opening externally / copying link ---
  const openExternally = () => {
    const uaNow = navigator.userAgent || "";
    const isIOS = /iPhone|iPad|iPod/i.test(uaNow);

    if (isAndroid) {
      const intent =
        "intent://euroworkshop.net/#Intent;scheme=https;package=com.android.chrome;" +
        "S.browser_fallback_url=" +
        encodeURIComponent(TARGET_URL) +
        ";end";
      // Spróbuj otworzyć Chrome
      window.location.href = intent;
      // Fallback do zwykłego https (jeśli intent zostanie zignorowany)
      setTimeout(() => {
        window.location.href = TARGET_URL;
      }, 800);
      return;
    }

    if (isIOS) {
      // iOS: IG/Facebook IAB blokują custom schemy, więc nie używamy googlechrome://.
      // Spróbujemy otworzyć w nowej karcie (często nadal w IAB),
      // a użytkownik dostaje jasne instrukcje poniżej jak ręcznie otworzyć w Safari.
      window.open(TARGET_URL, "_blank", "noopener,noreferrer");
      return;
    }

    // Desktop / inne: standardowo otwieramy w nowej karcie
    window.open(TARGET_URL, "_blank", "noopener,noreferrer");
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(TARGET_URL);
      alert("Skopiowano link. Otwórz Safari/Chrome i wklej adres.");
    } catch {
      alert("Skopiuj ręcznie: euroworkshop.net");
    }
  };

  // --- In-app browser banner ---
  if (isInAppBrowser) {
    // Dla Messengera: pokaż super-lekki fallback bez Three.js, tylko opcje otwarcia/kopiowania.
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
                onClick={() =>
                  window.open(TARGET_URL, "_blank", "noopener,noreferrer")
                }
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
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(TARGET_URL);
                    alert(
                      "Skopiowano link. Otwórz Safari/Chrome i wklej adres."
                    );
                  } catch {
                    alert("Skopiuj ręcznie: euroworkshop.net");
                  }
                }}
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
            Otworzyłeś stronę w przeglądarce aplikacji (Instagram/Facebook). Dla
            najlepszego działania otwórz ją w domyślnej przeglądarce systemowej.
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
            {isAndroid ? (
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
                  boxShadow: "0 4px 12px rgba(74, 144, 226, 0.3)",
                }}
                onClick={openExternally}
              >
                Otwórz w przeglądarce
              </button>
            ) : null}

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
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
      <Suspense fallback={<div className="loading__screen">Loading...</div>}>
        {glCrashed ? (
          <div className="loading__screen">
            <div
              style={{ color: "#d4d8d8", textAlign: "center", fontSize: 16 }}
            >
              <p>Wystąpił problem z akceleratorem grafiki.</p>
              <p>
                Odśwież stronę lub otwórz w Safari/Chrome. Jeśli błąd wraca,
                spróbujemy lżejszej wersji.
              </p>
            </div>
          </div>
        ) : (
          <Canvas
            shadows={!isIOS}
            dpr={isIOS ? 1 : [1, 1.5]}
            gl={{
              antialias: false,
              alpha: true,
              preserveDrawingBuffer: false,
              failIfMajorPerformanceCaveat: false,
              powerPreference: isIOS ? "low-power" : "high-performance",
              stencil: false,
            }}
            camera={{
              fov: 75,
              position: [camX, camY, camZ],
            }}
            onCreated={({ gl }) => {
              // suppress shader error spam in some IABs
              if (gl?.debug) gl.debug.checkShaderErrors = false;

              const canvas = gl.getContext()?.canvas || gl.domElement;
              if (canvas && canvas.addEventListener) {
                const onLost = (e) => {
                  e.preventDefault();
                  setGlCrashed(true);
                };
                const onRestored = () => setGlCrashed(false);
                canvas.addEventListener("webglcontextlost", onLost, false);
                canvas.addEventListener(
                  "webglcontextrestored",
                  onRestored,
                  false
                );
              }
            }}
          >
            <CameraController camX={camX} camY={camY} camZ={camZ} />
            <Experience
              galleryData={galleryData}
              carouselData={carouselData}
              eventsData={eventsData}
            />
          </Canvas>
        )}
      </Suspense>
    </div>
  );
};

export default App;
