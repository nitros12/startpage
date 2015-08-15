function ConfigObject(items){
    for(var i in items){
        this[i] = {name: items[i]};
    }
}

var bi = {
    borders: "Borders",
    alwaysopen: "keep all squares open",
    allow_version_check: "allow checking for new versions"
}
var bool = new ConfigObject(bi);

var si = {
    heading_font: "Heading Font",
    link_font: "Link Font",
    heading_font_size: "Heading Font Size",
    link_font_size: "Link Font Size",
    background: "Background",
    foreground: "Foreground",
    heading_color: "Heading Color",
    link_color: "Link Color",
    border_color: "Border Color",
    border_width: "Border Width",
    search_color: "Search Color",
    search_bg_color: "Search Background Color"
};
var style = new ConfigObject(si);

var ei = {
    images: "Images",
    bottom: "Bottom",
    right: "Right",
    height: "Height",
    width: "Width",
    opacity: "Opacity"
};
var ext = new ConfigObject(ei);



function configmenuInit(callback){
	var configmenuContainer = document.getElementById("configmenu_container");
    
    if(localStorage.config == undefined || callback == undefined){
        configmenuContainer.style.display = "block";
        createMenu();
    }else{
        $.getJSON("config.json", function(data){loadConfig(data, callback)});
	}
}


function createMenu(){
    var boolwrapper = document.getElementById("boolwrapper");
    var stylewrapper = document.getElementById("stylewrapper");
    var extwrapper = document.getElementById("extwrapper");
    for(var key in bool){
        appendOption(boolwrapper, bool[key], key, 0);
    }
    for(var key in style){
        appendOption(stylewrapper, style[key], key, 1);
    }
    for(var key in ext){
        appendOption(extwrapper, ext[key], key, 1);
    }

	mascotCheckbox = document.getElementById("mcb");
    checkboxHandler();
    mascotCheckbox.addEventListener("click", checkboxHandler);

    var doneButton = document.getElementById("done");
    doneButton.addEventListener("click", function(){
        saveConfig(callback);
        document.body.removeChild(configmenuContainer);
    });
}


// type == 0: checkbox, else: text
function appendOption(parentElement, obj, key, type){
    var div = document.createElement("div");
    var label = document.createElement("label");
    var text = document.createTextNode(obj.name);
    var input = document.createElement("input");

    div.setAttribute("class", "option");
    input.setAttribute("name", key);

    if(type == 0){
        input.setAttribute("type", "checkbox");
    }else{
        input.setAttribute("type", "text");
    }

    label.appendChild(text);
    label.appendChild(input);
    div.appendChild(label);
    parentElement.appendChild(div);
}


function checkboxHandler(){
    if(mascotCheckbox.checked == true){
        var visibility = "block";
    }else{
        var visibility = "none";
    }
    var options = document.querySelectorAll("#extwrapper .option");
    for(var i=0; i < options.length; i++){
        options[i].style.display = visibility;
    }
}


function saveConfig(callback){
    json = {bool:{}, style:{}, ext:{}};
    // because mascot is not an attribute of bi, create a local obj w/ mascot:
    var bool = new ConfigObject(bi);
    bool.mascot = {};
    for(var key in bool){
        var elem = document.querySelector("input[name='" + key + "'");
        bool[key].value = elem.checked;
        json.bool[key] = elem.checked;
    }
    for(var key in style){
        var elem = document.querySelector(
                "#stylewrapper input[name='" + key + "'");
        style[key].value = elem.value;
        json.style[key] = String(elem.value);
    }
    for(var key in ext){
        var elem = document.querySelector(
                "#extwrapper input[name='" + key + "'");
        ext[key].value = elem.value;
        json.ext[key] = String(elem.value);
    }

    // to json for import/export + backwards compatibility
    json = JSON.stringify(json, undefined, 4);

    localStorage.config = json;
    loadConfig(JSON.parse(json), callback);
}


function loadConfig(data, callback){
    cfg = [
        data.style.heading_font,
        data.style.link_font,
        data.style.heading_font_size,
        data.style.link_font_size,
        data.style.background,
        data.style.foreground,
        data.style.heading_color,
        data.style.link_color,
        data.style.border_color,
        data.style.border_width,
        data.style.search_color,
        data.style.search_bg_color,
        data.ext.images,
        data.ext.bottom,
        data.ext.right,
        data.ext.height,
        data.ext.width,
        data.ext.opacity
    ];
	// data.bool are strings because of json, want actual boolean
    cfg_bool = [
        data.bool.borders,
        data.bool.alwaysopen,
        data.bool.mascot,
        data.bool.allow_version_check
    ];
	localStorage.cfg = cfg, localStorage.cfg_bool = cfg_bool;
    var span = $("span");
    var a = $("a");
    var popup = $("#popup");
    var sqr = $(".sqr");
    span.css("fontFamily", cfg[0]);
    a.css("fontFamily", cfg[1]);
    popup.css("fontFamily", cfg[1]);
    span.css("fontSize", cfg[2]);
    a.css("fontSize", cfg[3]);
    popup.css("fontSize", cfg[3]);
    $("body").css("backgroundColor", cfg[4]);
    sqr.css("backgroundColor", cfg[5]);
    popup.css("backgroundColor", cfg[5]);
    span.css("color", cfg[6]);
    a.css("color", cfg[7]);
    popup.css("color", cfg[7]);
    sqr.css("borderTop", "0 solid " + cfg[8]);
    sqr.css("borderBottom", "0 solid " + cfg[8]);
    popup.css("borderTop", cfg[9] + " solid " + cfg[8]);
    var searchinput = $("#searchinput");
    if(searchinput.length){
        searchinput.css("color", cfg[10]);
        searchinput.css("backgroundColor", cfg[11]);
    }
    var bgimg = $("#bgimg");
    if(cfg_bool[2]){
        bgimg.css("backgroundImage", "url('" +
                cfg[12][Math.floor(Math.random()*cfg[12].length)] + "')");
        bgimg.css("bottom", cfg[13]);
        bgimg.css("right", cfg[14]);
        bgimg.css("height", cfg[15]);
        bgimg.css("width", cfg[16]);
        bgimg.css("opacity", cfg[17]);
    }else{
        bgimg.css("backgroundImage", "");
    }

    if(callback){
        callback();
    }
}

