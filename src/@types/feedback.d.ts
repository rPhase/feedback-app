// @types.feedback.ts

export interface IFeedback {
  rating: number;
  id?: number;
  text: string;
}

export type FeedbackContextType = {
  isLoading: boolean;
  feedback: IFeedback[];
  setFeedback: React.Dispatch<React.SetStateAction<IFeedback[]>>;
  deleteFeedback: (id: number) => void;
  addFeedback: (newFeedback: IFeedback) => void;
  editFeedback: (item: IFeedback) => void;
  editMode: IEditState;
  updateFeedback: (updatedItem: IFeedback) => void;
};