import React from 'react';
import { Link } from 'react-router-dom';
import AboutIconLink from './AboutIconLink';
import PropTypes from 'prop-types';

const Header = ({ text, bgColor, textColor }) => {
  const headerStyle = {
    backgroundColor: bgColor,
    color: textColor,
  };
  return (
    <header style={headerStyle}>
      <div className='container'>
        <Link to='/' style={{ textDecoration: 'none', color: textColor }}>
          <h2>{text}</h2>
        </Link>
      </div>
      <AboutIconLink />
    </header>
  );
};

Header.defaultProps = {
  text: 'Feedback UI',
  bgColor: 'rgba(0,0,0,0.4)',
  textColor: '#ff6a95',
};

Header.propTypes = {
  text: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
};

export default Header;
