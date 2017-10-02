// Add zero in front of numbers < 10
export function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}


// Debug tool for getting an object's properties
export function keysToStr(obj){
  let keyStr = "";
  for(var key in obj){
    keyStr = keyStr + key + ", "
  }
  if (keyStr.length > 2) keyStr = keyStr.slice(0, -2);
  return keyStr;
}