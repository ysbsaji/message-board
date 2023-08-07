export const saveToLocalStorage = (key, value) => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(`message-board-${key}`, JSON.stringify(value));
    }
  }
  
  export const readFromLocalStorage = key => {
    if (typeof localStorage !== 'undefined') {
      const result =  localStorage.getItem(`message-board-${key}`);
      return JSON.parse(result);
    } else return null
  }
  
  export const removeFromLocalStorage = key => {
    if (typeof localStorage !== 'undefined') {
      return localStorage.removeItem(`message-board-${key}`);
    }
  }