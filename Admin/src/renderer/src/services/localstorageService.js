// src/utils/localStorageUtils.js

// Function to get the token from local storage
const getToken = () => {
  const userData = localStorage.getItem('user');
  if (userData) {
    try {
      const parsedData = JSON.parse(userData);
      console.log("Token:", parsedData.token);
      return parsedData.token || null;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
  }
  return null; 
};


const saveLoginResponse = (response) => {
  if (response && typeof response === 'object') {
    try {
      localStorage.setItem('user', JSON.stringify(response));
     
    } catch (error) {
      console.error('Error saving login response to localStorage:', error);
    }
  } else {
    console.error('Invalid response format. Expected an object:', response);
  }
};

// Function to get the role of the user
const getRole = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.role === 'admin') {

    return user.role;
  } else {
    console.log("ROLE:", user ? user.role : 'No user found');
    return false;
  }
};

// Function to get the user object from local storage
const getUser = () => {
  const userData = localStorage.getItem('user');
  if (userData) {
    try {
      const parsedData = JSON.parse(userData);
      return parsedData || null;
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
      return null;
    }
  }
  return null; 
};

// Function to get the name of the user
const getName = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    return user.name;
  } else {
    console.log("ROLE:", user ? user.role : 'No user found');
    return false;
  }
};

// Function to save the theme mode (dark/light) to local storage
const saveThemeToLocalStorage = (isDarkMode) => {
  localStorage.setItem('isDarkMode', JSON.stringify(isDarkMode));
};

// Function to get the theme mode from local storage
const getThemeFromLocalStorage = () => {
  const theme = localStorage.getItem('isDarkMode');
  return theme ? JSON.parse(theme) : false; // Default to light mode if not set
};

// Function to clear the theme from local storage
const clearThemeFromLocalStorage = () => {
  localStorage.removeItem('isDarkMode');
};

// Function to remove user data from local storage
const removeUserFromLocalStorage = () => {
  localStorage.removeItem("user");
};

// Export all functions explicitly
export {
  getToken,
  saveLoginResponse,
  getRole,
  getUser,
  getName,
  saveThemeToLocalStorage,
  getThemeFromLocalStorage,
  clearThemeFromLocalStorage,
  removeUserFromLocalStorage,
};
