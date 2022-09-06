import { createContext, useEffect, useState } from 'react';

const FeedbackContext = createContext();

const defaultEditState = {
  item: {},
  isEditing: false,
};

export const FeedbackProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [editMode, setEditMode] = useState(defaultEditState);

  useEffect(() => {
    fetchFeedback();
  }, []);

  // Fetch feedback from server
  const fetchFeedback = async () => {
    try {
      const res = await fetch('/feedback?_sort=id&_order=desc');
      const data = await res.json();
      setFeedback(data);
      // Simulate timeout for loading
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error(error);
    }
  };

  // Delete feedback
  const deleteFeedback = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      try {
        await fetch(`/feedback/${id}`, {
          method: 'DELETE',
        });
        setFeedback(feedback.filter((item) => item.id !== id));
      } catch (error) {
        console.error(error);
      }
    }
  };

  // Add feedback
  const addFeedback = async (newFeedback) => {
    try {
      // newFeedback.id = uuidv4();
      const res = await fetch('/feedback', {
        method: 'POST',
        body: JSON.stringify(newFeedback),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      setFeedback([data, ...feedback]);
    } catch (error) {
      console.error(error);
    }
  };

  // Set item to be updated
  const editFeedback = (item) => {
    setEditMode({
      item,
      isEditing: true,
    });
  };

  // Update existing feedback
  const updateFeedback = async (updatedItem) => {
    try {
      const res = await fetch(`/feedback/${editMode.item.id}`, {
        method: 'PUT',
        body: JSON.stringify(updatedItem),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();

      setFeedback(
        feedback.map((item) =>
          item.id === editMode.item.id ? { ...item, ...data } : item
        )
      );

      // Reset edit mode
      setEditMode(defaultEditState);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FeedbackContext.Provider
      value={{
        isLoading,
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
