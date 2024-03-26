import { Add_Data, Add_Profile, Remove_Data } from "../Constant";
import { produce } from 'immer';

const initialState = {
  follows: [],
  username: ''
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Add_Data:
      return produce(state, (draft) => {
        draft.follows.push(action.payload);
      });
   case Remove_Data:
  // Assuming action.payload is the index of the item to be removed
  const index = action.payload;
  console.log('index to remove from reducer', index);
  console.log('current follows', state.follows);

  
    // Create a copy of the array before modifying it
    const updatedFollows = [...state.follows];
    // Remove the item at the specified index
    updatedFollows.splice(index, 1);

    console.log('updated follows after removal', updatedFollows);

    // Return the new state without the item
    return {
      ...state,
      follows: updatedFollows
    };
  
     
    case Add_Profile:
      return {
        ...state,
        username: action.payload
      };
    default:
      return state;
  }
};