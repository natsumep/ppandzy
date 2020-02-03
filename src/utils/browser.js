export function isChrome(){
    var userAgent = navigator.userAgent; 
    if (userAgent.indexOf("Firefox") > -1) { 
        return true;
    }
    return false;   
}