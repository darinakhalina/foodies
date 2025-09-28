import css from './Footer.module.css';
import { Link } from 'react-router-dom';
import icons from '/images/icons.svg';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={css.footerTop}>
        <Link to="/">Foodies</Link>
        <ul className={css.footerSocials}>
          <li>
            <Link to="https://www.facebook.com/goITclub/" target="_blank">
              <div className={css.footerSocialsItem}>
                <svg className={css.footerIcon} width="20" height="20">
                  <use href={`${icons}#icon-facebook`}></use>
                </svg>
              </div>
            </Link>
          </li>
          <li>
            <Link to="https://www.instagram.com/goitclub/" target="_blank">
              <div className={css.footerSocialsItem}>
                <svg className={css.footerIcon} width="20" height="20">
                  <use href={`${icons}#icon-instagram`}></use>
                </svg>
              </div>
            </Link>
          </li>
          <li>
            <Link to="https://www.youtube.com/c/GoIT/" target="_blank">
              <div className={css.footerSocialsItem}>
                <svg className={css.footerIcon} width="20" height="20">
                  <use href={`${icons}#icon-youtube`}></use>
                </svg>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <hr className={css.separator} />
      <div className={css.footerBottom}>
        <p>@2024, Foodies. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
