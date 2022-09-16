import React, { useContext } from 'react';
import Card from './shared/Card';
import { FaEdit, FaTimes } from 'react-icons/fa';
import FeedbackContext from '../context/FeedbackContext';
import { FeedbackContextType, IFeedback } from '../@types/feedback';

interface Props {
  item: IFeedback;
}

const FeedbackItem = ({ item }: Props) => {
  const { deleteFeedback, editFeedback } = useContext(
    FeedbackContext
  ) as FeedbackContextType;
  return (
    <Card reverse={false}>
      <div className='num-display'>{item.rating}</div>
      <button onClick={() => deleteFeedback(item.id!)} className='close'>
        <FaTimes color='purple' />
      </button>
      <button onClick={() => editFeedback(item)} className='edit'>
        <FaEdit color='purple' />
      </button>
      <div className='text-display'>{item.text}</div>
    </Card>
  );
};

export default FeedbackItem;
