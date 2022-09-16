import React from 'react';
import { Link } from 'react-router-dom';
import AboutIconLink from './AboutIconLink';

type Props = {
  text?: string;
  bgColor?: string;
  textColor?: string;
};

const Header = ({ text, bgColor, textColor }: Props) => {
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

export default Header;
