import { useState, useEffect } from "react";

const Partners = (props) => {
  const partners = [
    {
      name: "ZAIKS",
      logo: "/assets/partners/08_zaiks_logo_claim_kontra_RGB (1).png",
    },
    {
      name: "ASP",
      logo: "/assets/partners/ASP_pl_RGB_białe (2).png",
    },
    {
      name: "Galeria EL",
      logo: "/assets/partners/Galeria-EL-dane-PNG-300x135 (2).png",
    },
    {
      name: "Partnership Logo",
      logo: "/assets/partners/logo gotowe_na ciemne tło (1).png",
    },
    {
      name: "Pawilon",
      logo: "/assets/partners/Pawilon_logo (1) (2).png",
    },
  ];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener(
      "resize",
      handleResize
    );

    // Cleanup
    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );
  }, []);

  // Only duplicate the partners array for seamless carousel on mobile
  const displayPartners = isMobile
    ? [...partners, ...partners]
    : partners;

  return (
    <div
      className="partners__container"
      {...props}
    >
      <div className="partners__content">
        {displayPartners.map((partner, index) => (
          <img
            key={index}
            src={partner.logo}
            alt={partner.name}
            className="partners__logo"
          />
        ))}
      </div>
    </div>
  );
};

export default Partners;
