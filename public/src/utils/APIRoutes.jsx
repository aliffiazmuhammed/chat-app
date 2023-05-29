
//routes for axios 

export const host = 'http://localhost:5000';
export const registerRoute = `${host}/api/auth/register`; 
export const loginRoute = `${host}/api/auth/login`;
export const avatarRoute = `${host}/api/auth/setavatar`;
export const getUsersRoute = `${host}/api/auth/getusers`;
export const postmsgRoute = `${host}/api/messages/pmsg`;
export const getmsgRoute = `${host}/api/messages/getallmessages`;
