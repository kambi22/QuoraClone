import { Add_Data, Add_Profile, Remove_Data } from "../Constant";


export const AddItem = (items) => ({
    type: Add_Data,
    payload: items
  });
  
  export const RemoveItem = (key) => ({
    type: Remove_Data,
    payload: key,
    
  });
export const AddProfile = (userName) => {
    console.log('action remove',userName)
    return {
        
        type:Add_Profile,
        payload:userName
    }
};
