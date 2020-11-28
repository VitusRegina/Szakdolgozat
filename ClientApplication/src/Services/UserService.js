
export default function user() {
  if(typeof localStorage.getItem('user') === 'undefined')
  {
   return null;
  }
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (user) {
    return user;
   
  } else {
    return null;
  }
  }