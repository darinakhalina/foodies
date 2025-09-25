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
      colors={['#1a1a1a', '#e8e8e8', '#bfbebe', '#e8e8e8', '#050505']}
    />
  );
};

export default Loader;
