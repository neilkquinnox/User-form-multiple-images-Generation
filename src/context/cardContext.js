import { createContext } from 'react';

export const initialState = {
  showCard: false,
  firstName: '',
  lastName: '',
  selectedImage: [],
  imageView: false,
  selectedTopic: '',
  imagesList: [],
};
const CardContext = createContext(null);

export default CardContext;
