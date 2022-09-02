import { createContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const FeedbackContext = createContext();
const defaultEditState = {
  item: {},
  isEditing: false,
};

export const FeedbackProvider = ({ children }) => {
  const [feedback, setFeedback] = useState([]);
  const [editMode, setEditMode] = useState(defaultEditState);

  // Delete feedback
  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  // Add feedback
  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  // Set item to be updated
  const editFeedback = (item) => {
    setEditMode({
      item,
      isEditing: true,
    });
  };

  // Update existing feedback
  const updateFeedback = (updatedItem) => {
    setFeedback(
      feedback.map((item) =>
        item.id === editMode.item.id ? { ...item, ...updatedItem } : item
      )
    );

    // Reset edit mode
    setEditMode(defaultEditState);
  };

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        setFeedback,
        deleteFeedback,
        addFeedback,
        editFeedback,
        editMode,
        updateFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export default FeedbackContext;
