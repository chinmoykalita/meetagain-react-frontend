import axios from "axios";
// storing the token when signup or login 
export const storeToken = (token)=> {
    document.cookie="authtoken=" + token;
    return "success" 
}

// returning the token 
export const getToken = ()=>{
    const value = `; ${document.cookie}`;
    const parts = value.split(`; authtoken=`);
    if (parts.length === 2){
        var token =  parts.pop().split(';').shift();
        return token
    }
};

export const getCurrentUser = async ()=>{
    const token = getToken();
    const res = await axios('http://localhost:8000/api/auth/current_user/',{
      method: 'POST',
      headers: {
          "Content-type": "application/json", "Accept": "application/json",
          "Authorization": `Token ${token}`}});
    return res.data      
  };
export const logOut = () => {
    var allCookies = document.cookie.split(';');
    
    // The "expire" attribute of every cookie is 
    // Set to "Thu, 01 Jan 1970 00:00:00 GMT"
    for (var i = 0; i < allCookies.length; i++)
        document.cookie = allCookies[i] + "=;expires="
        + new Date(0).toUTCString();
    window.location.replace('/feeds');
    

}

