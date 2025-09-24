import clsx from 'clsx';
import css from './Button.module.css';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  onClick,
  isDisabled = false,
  isLoading = false,
  className,
}) => {
  return (
    <button
      disabled={isDisabled || isLoading}
      type={type}
      className={clsx(css.button, css[variant], css[size], className, {
        [css['is-loading']]: isLoading,
        [css['is-disabled']]: isDisabled,
      })}
      onClick={onClick}
    >
      {isLoading && (
        <svg className={css.loader}>
          <use href="/images/icons.svg#icon-spinner" />
        </svg>
      )}
      <span>{children}</span>
    </button>
  );
};

export default Button;
