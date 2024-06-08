const RemoveCookie = (cookieName:string) =>{
    // Set the expiration date in the past
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
export default RemoveCookie