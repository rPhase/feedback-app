import React, { useContext } from 'react';
import FeedbackItem from './FeedbackItem';
import { motion, AnimatePresence } from 'framer-motion';
import FeedbackContext from '../context/FeedbackContext';
import Spinner from './shared/Spinner';
import { FeedbackContextType, IFeedback } from '../@types/feedback';

const FeedbackList = () => {
  const { feedback, isLoading } = useContext(
    FeedbackContext
  ) as FeedbackContextType;

  if (!feedback || feedback.length === 0) {
    return <p>No feedback yet.</p>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className='feedback-list'>
      <AnimatePresence>
        {feedback.map((item: IFeedback) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FeedbackItem item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FeedbackList;
