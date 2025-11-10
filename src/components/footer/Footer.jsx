import { Instagram } from "../icons/Instagram";
import { Facebook } from "../icons/Facebook";
import Partners from "../partners/Partners";

const Footer = (props) => {
  return (
    <div className="footer__container" {...props}>
      <div className="footer__content">
        <span>Marta Romankiv</span>

        <span>
          Akademia Sztuk Pięknych w Gdańsku
        </span>
        <a href="mailto:Marta.romankiv@gmail.com">
          marta.romankiv@gmail.com
        </a>
        <div className="footer__socials">
          <a href="https://www.instagram.com/marta.romankiv/">
            <Instagram />
          </a>
          <a href="https://www.facebook.com/profile.php?id=100006219074964">
            <Facebook />
          </a>
        </div>
        <Partners />
      </div>
    </div>
  );
};

export default Footer;
