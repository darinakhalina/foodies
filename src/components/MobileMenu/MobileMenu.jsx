import { useLocation, useMatch } from 'react-router-dom';
import ButtonIcon from '../ButtonIcon/ButtonIcon.jsx';
import css from './MobileMenu.module.css';
import MenuSidePanelContent from '../MenuSidePanelContent/MenuSidePanelContent.jsx';
import { useEffect, useState } from 'react';
import MenuSidePanel from '../MenuSidePanel/MenuSidePanel.jsx';

const MobileMenu = () => {
  const homePagePath = useMatch('/');
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return (
    <>
      <ButtonIcon
        className={css['menu-button']}
        iconName="icon-burger-menu"
        variant={homePagePath ? 'ghost' : 'secondary'}
        onClick={open}
      />
      <MenuSidePanel isOpen={isOpen} onClose={close} panelId="mobile-menu-panel">
        <MenuSidePanelContent onClose={close} />
      </MenuSidePanel>
    </>
  );
};

export default MobileMenu;
