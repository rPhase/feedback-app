import React from 'react';
import PropTypes from 'prop-types';

const RATING = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const RatingSelect = ({ onSelect, selected }) => {
  const onChangeHandler = (e) => {
    onSelect(+e.currentTarget.value);
  };

  return (
    <ul className='rating'>
      {RATING.map((i) => (
        <li key={`rating-${i}`}>
          <input
            type='radio'
            id={`num${i}`}
            name='rating'
            value={i}
            onChange={onChangeHandler}
            checked={selected === i}
          />
          <label htmlFor={`num${i}`}>{i}</label>
        </li>
      ))}
    </ul>
  );
};

RatingSelect.propTypes = {
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.number.isRequired,
};

export default RatingSelect;
