
var downloadEnabled = true;

var API_KEY = "76a4eeaa0b33a5169893adf856328a34";

var keyName = "session.key";

var filter = {
    include_adult: true,
    sort_by: 'popularity.desc',
    'primary_release_date.gte': '',
    'primary_release_date.lte': ''
};
if(localStorage.getItem('discover.filter')){
    filter = JSON.parse(localStorage.getItem('discover.filter'));
}
var filterRefreshCallback = function(){};

var protocol = "https://";
if(location.protocol === "http:"){
    protocol = "http://";
}

function getAPIConfig(){
    var getter = $.get(protocol + "api.themoviedb.org/3/configuration", {api_key: API_KEY});
    getter.done(function(json){
        json["default_base_url"] = (protocol === "https://" ? json.images.secure_base_url : json.images.base_url);
        localStorage.setItem("api_config", JSON.stringify(json));
        API_CONFIG = json;
    });
    getter.fail(function(){
        paper.toast(paper.lang.get("error-connection"));
    });
}

var API_CONFIG = localStorage.getItem("api_config");
if(API_CONFIG == null){
    getAPIConfig();
}else{
    API_CONFIG = JSON.parse(API_CONFIG);
}

paper.lang.setSupportedLanguages(["en", "nl"]);

var app = paper.app.create(false, "black", "paperwork_icon");

paper.app.errorHandlers.error = function(jqXHR, textStatus, errorThrown){
    paper.toast(paper.lang.get("error"));
};

paper.app.errorHandlers.connectionError = function(jqXHR, textStatus, errorThrown){
    paper.toast(paper.lang.get("error-connection"));
    return false;
};

paper.app.errorHandlers["401"] = function(jqXHR, textStatus, errorThrown){
    app.overlay("login");
};