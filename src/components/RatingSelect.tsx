import React from 'react';

const RATING = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

interface Props {
  onSelect: React.Dispatch<React.SetStateAction<number>>;
  selected: number;
}

const RatingSelect = ({ onSelect, selected }: Props) => {
  const onChangeHandler = (e: {
    currentTarget: { value: string | number };
  }) => {
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

export default RatingSelect;
