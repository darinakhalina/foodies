import MenuNavigation from '../MenuNavigation/MenuNavigation.jsx';
import css from './MenuSidePanelContent.module.css';

const MenuSidePanelContent = ({ onClose }) => {
  return (
    <div className={css['menu-content-holder']}>
      <div className={css['menu-content']}>
        <MenuNavigation onClick={onClose} isInverted direction="column" />
      </div>
      <div className={css['menu-content-images']}>
        <img
          srcSet="
              /images/menu/menu-dish2-1x.png 1x,
              /images/menu/menu-dish2-2x.png 2x"
          src="/images/menu/menu-dish2-1x.png"
          alt="Meat pie"
          className={css['menu-img-sm']}
        />
        <img
          srcSet="
              /images/menu/menu-dish1-1x.png 1x,
              /images/menu/menu-dish1-2x.png 2x"
          src="/images/menu/menu-dish1-1x.png"
          alt="Chocolate pudding"
          className={css['menu-img-lg']}
        />
      </div>
    </div>
  );
};

export default MenuSidePanelContent;
