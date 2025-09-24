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
  iconName,
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
      aria-label={iconName}
      aria-busy={isLoading ? 'true' : undefined}
    >
      {isLoading ? (
        <svg className={clsx(css.loader, css.icon)}>
          <use href="/images/icons.svg#icon-spinner" />
        </svg>
      ) : (
        <svg className={css.icon}>
          <use href={`/images/icons.svg#${iconName}`} />
        </svg>
      )}
    </button>
  );
};

export default ButtonIcon;
