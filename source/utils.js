//Random string generator
export function makeid(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

//shortcut caller
export function GE(el) {
  return document.getElementById(el);
}

//add param to url
export function SetSearchParam(param, value) {
    var url = new URL(window.location.href);
    var query_string = url.search;
    var search_params = new URLSearchParams(query_string); 
    
    var old_value = search_params.get(param);
    
    if (old_value != value) {
        if (value != null)
            search_params.set(param, value);
        else
            search_params.delete(param)
    
        url.search = search_params.toString();
        window.history.pushState("", document.title, url);
    }
}

//get param from url
export function GetSearchParam(param) {
    var url = new URL(window.location.href);
    var query_string = url.search;
    var search_params = new URLSearchParams(query_string); 
    
    return search_params.get(param);
}