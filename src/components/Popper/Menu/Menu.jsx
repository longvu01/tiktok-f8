import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import Header from './Header';
import styles from './Menu.module.scss';
import MenuItem from './MenuItem';

const cx = classNames.bind(styles);

Menu.propTypes = {
  children: PropTypes.node.isRequired,
  items: PropTypes.array,
  hideOnClick: PropTypes.bool,
  onChange: PropTypes.func,
};

function Menu({ children, items = [], hideOnClick = false, onChange }) {
  const [historyData, setHistoryData] = useState([
    {
      data: items,
    },
  ]);

  const currentMenu = historyData.at(-1);

  const renderItems = () =>
    currentMenu.data.map((item, index) => {
      const isParent = Boolean(item.children);

      return (
        <MenuItem
          key={index}
          data={item}
          onClick={() => {
            if (isParent) setHistoryData((prev) => [...prev, item.children]);
            else onChange?.(item);
          }}
        />
      );
    });

  const handleBack = () => {
    setHistoryData((prev) => prev.slice(0, -1));
  };

  const renderResults = (attrs) => (
    <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
      <PopperWrapper className={cx('menu-popper')}>
        {historyData.length > 1 && (
          <Header title={currentMenu.title} onBack={handleBack} />
        )}

        <div className={cx('menu-body')}>{renderItems()}</div>
      </PopperWrapper>
    </div>
  );

  // Reset to first page
  const handleResetMenu = () => {
    setHistoryData((prev) => prev.slice(0, 1));
  };

  return (
    <Tippy
      interactive
      delay={[0, 500]}
      offset={[12, 8]}
      hideOnClick={hideOnClick}
      placement="bottom-end"
      render={renderResults}
      onHide={handleResetMenu}
    >
      {children}
    </Tippy>
  );
}

export default Menu;
