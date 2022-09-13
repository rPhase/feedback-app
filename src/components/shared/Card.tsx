import React from 'react';

type Props = {
  children: React.ReactNode;
  reverse?: boolean;
};

const Card = ({ children, reverse }: Props) => {
  return <div className={`card ${reverse && 'reverse'}`}>{children}</div>;
};

Card.defaultProps = {
  reverse: false,
};

export default Card;
