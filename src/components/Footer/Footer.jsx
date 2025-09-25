import css from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className="f-container">Content here</div>
      <hr className={css.separator} />
      <div className="f-container">Content here</div>
    </footer>
  );
};

export default Footer;
