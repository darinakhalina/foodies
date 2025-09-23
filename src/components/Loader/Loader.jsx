import { ColorRing } from 'react-loader-spinner';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <ColorRing
      visible={true}
      height="80"
      width="80"
      ariaLabel="color-ring-loading"
      wrapperStyle={{}}
      wrapperClass={css['loader']}
      colors={['#e44848', '#d84343', '#ffc531', '#d84343', '#e44848']}
    />
  );
};

export default Loader;
