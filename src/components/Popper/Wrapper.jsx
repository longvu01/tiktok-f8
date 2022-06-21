import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

Wrapper.prototype = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

function Wrapper({ children, className }) {
  return <div className={cx('wrapper', className)}>{children}</div>;
}

export default Wrapper;
