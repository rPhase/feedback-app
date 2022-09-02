import React, { useState } from 'react';
import RatingSelect from './RatingSelect';
import Button from './shared/Button';
import Card from './shared/Card';

// Set to 0 to not require written review
const MIN_LENGTH = 0;

const FeedbackForm = ({ addFeedback }) => {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(7);
  const [btnDisabled, setBtnDisabled] = useState(MIN_LENGTH > 0); //disable button by default if MIN_LENGTH is 0
  const [message, setMessage] = useState('');

  const onChangeHandler = ({ target: { value } }) => {
    const len = value.trim().length;
    if (value.trim() === '' && MIN_LENGTH !== 0) {
      setBtnDisabled(true);
      setMessage(null);
    } else if (len < MIN_LENGTH) {
      setMessage(
        `Text must be at least ${MIN_LENGTH} characters. (${
          MIN_LENGTH - len
        } remaining)`
      );
      setBtnDisabled(true);
    } else {
      setMessage(null);
      setBtnDisabled(false);
    }
    setText(value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    addFeedback({
      rating: rating,
      text: text.trim() === '' ? 'User did not write a review.' : text,
    });
    setText('');
  };
  return (
    <Card>
      <form onSubmit={onSubmitHandler}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect onSelect={setRating} selected={rating} />
        <div className='input-group'>
          <input
            onChange={onChangeHandler}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  );
};

export default FeedbackForm;
