import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import 'tippy.js/dist/tippy.css';
import image from '~/assets/images';
import config from '~/config/';
import Actions from '../Actions';
import Search from '../Search';
import styles from './Header.module.scss';

const cx = classNames.bind(styles);

function Header() {
  const currentUser = true;

  return (
    <header className={cx('wrapper')}>
      <div className={cx('inner')}>
        <Link to={config.routes.root} className={cx('logo-link')}>
          <img src={image.logo} alt="TikTok" />
        </Link>

        <Search />

        <Actions currentUser={currentUser} />
      </div>
    </header>
  );
}

export default Header;
