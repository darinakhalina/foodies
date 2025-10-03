import css from './InputContainer.module.css';
const InputContainer = ({ children, lable, id }) => {
  return (
    <div className={css.container}>
      <label htmlFor={id}>{lable}</label>
      {children}
    </div>
  );
};
export default InputContainer;
