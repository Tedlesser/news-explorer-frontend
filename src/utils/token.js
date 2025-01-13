const TOKEN_KY = "jwt"; 

export const getToken = () => localStorage.getItem(TOKEN_KY);

export const setToken = (token) => localStorage.setItem(TOKEN_KY, token);

export const removeToken = () => localStorage.removeToken(TOKEN_KY);



 
