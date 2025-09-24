import clsx from 'clsx';
import css from './ButtonIcon.module.css';

const ButtonIcon = ({
  type = 'button',
  variant = 'primary',
  size = 'md',
  onClick,
  isDisabled = false,
  isLoading = false,
  className,
  iconType,
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
      aria-label={iconType}
      aria-busy={isLoading ? 'true' : undefined}
    >
      {isLoading ? (
        <svg className={clsx(css.loader, css.icon)}>
          <use href="/images/icons.svg#icon-spinner" />
        </svg>
      ) : (
        <svg className={css.icon}>
          <use href={`/images/icons.svg#${iconType}`} />
        </svg>
      )}
    </button>
  );
};

export default ButtonIcon;
