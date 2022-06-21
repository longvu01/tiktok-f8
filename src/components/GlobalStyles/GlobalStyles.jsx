import PropTypes from 'prop-types';
import './GlobalStyles.scss';

GlobalStyles.prototype = {
  children: PropTypes.node.isRequired,
};

function GlobalStyles({ children }) {
  return children;
}

export default GlobalStyles;
