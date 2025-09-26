import css from './CategoryHeader.module.css';

const CategoryHeader = ({ title, description, onBack }) => (
  <div className={css.container}>
    <button className={css.back} onClick={onBack}>← Back</button>
    <h1 className={css.title}>{title}</h1>
    <p className={css.desc}>{description}</p>
  </div>
);

export default CategoryHeader;
