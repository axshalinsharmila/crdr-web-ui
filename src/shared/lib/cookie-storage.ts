/**
* @param {string} key
* @param {string} value
* @param {number} expiresIn  
 */

const getCookie =(name: string)=>{
    const nameEQ =`${name}=`;
    const cookieArr = document.cookie.split('; ');
    for(let i=0; i < cookieArr.length; i++){
        let cookie = cookieArr[i];
        while(cookie.charAt(0)=== '') cookie = cookie.substring(1, cookie.length);
        if(cookie.indexOf(nameEQ) ===0 ) return cookie.substring(nameEQ.length, cookie.length)
    }
    return null;

}

const setCookie = (key: string, value:string = "", expiresIn:number)=>{
    const now = new Date();
    now.setTime(now.getTime() + (expiresIn + 1000));
    const expires = `expires = ${now.toUTCString}`;
    document.cookie = `${key} = ${value}; path=/; ${expires}; SameSite=Lax`;


}

const eraseCookie = (name: string) =>{
    document.cookie = `${name}=; Max-Age=-99999999;`;
}

export const cookieStorage ={
    setItem:(key:string, value: string, expiresIn: number = 1799)=>{
        setCookie(key, value, expiresIn)

    },
    getItem:(key: string)=> getCookie(key),
    removeItem: (key:string)=>{
        eraseCookie(key);

    },
    clear: ()=>{
    const cookies = document.cookie.split('; ');
    for(let i=0; i < cookies.length; i++){
        let cookie = cookies[i];
        const eqPos = cookie.indexOf('=')
        const name =eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
    document.cookie = `${name}=; Max-Age=-99999999; path=/`;
    }


    },
}