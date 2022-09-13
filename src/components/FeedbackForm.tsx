import React, { useContext, useEffect, useState } from 'react';
import { FeedbackContextType } from '../@types/feedback';
import FeedbackContext from '../context/FeedbackContext';
import RatingSelect from './RatingSelect';
import Button from './shared/Button';
import Card from './shared/Card';

// Set to 0 to not require written review
const MIN_LENGTH = 0;
const DEFAULT_RATING = 7;

const FeedbackForm = () => {
  const { addFeedback, editMode, updateFeedback } = useContext(
    FeedbackContext
  ) as FeedbackContextType;
  const [text, setText] = useState('');
  const [rating, setRating] = useState(DEFAULT_RATING);
  const [btnDisabled, setBtnDisabled] = useState(MIN_LENGTH > 0); //disable button by default if MIN_LENGTH is 0
  const [message, setMessage] = useState<string | null>('');

  useEffect(() => {
    if (editMode.isEditing) {
      setBtnDisabled(false);
      setText(editMode.item.text);
      setRating(editMode.item.rating);
    }
  }, [editMode]);

  const onChangeHandler = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
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

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const newFeedback = {
      rating: rating,
      text: text.trim() === '' ? 'User did not write a review.' : text,
    };

    if (editMode.isEditing) {
      updateFeedback(newFeedback);
    } else {
      addFeedback(newFeedback);
    }
    setText('');
    setRating(DEFAULT_RATING);
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
            {editMode.isEditing ? 'Update' : 'Send'}
          </Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  );
};

export default FeedbackForm;
