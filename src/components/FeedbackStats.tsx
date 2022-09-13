import React, { useContext } from 'react';
import { FeedbackContextType } from '../@types/feedback';
import FeedbackContext from '../context/FeedbackContext';

const FeedbackStats = () => {
  const { feedback } = useContext(FeedbackContext) as FeedbackContextType;
  // Calculate average review score
  let average: number | string =
    feedback.reduce((acc: number, cur: { rating: number }) => {
      return acc + cur.rating;
    }, 0) / feedback.length;

  average = average.toFixed(1).replace(/[.,]0$/, '');

  return (
    <div className='feedback-stats'>
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(+average) ? 0 : average}</h4>
    </div>
  );
};

export default FeedbackStats;
