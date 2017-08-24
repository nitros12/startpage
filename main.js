VERSION = "v2.1.0";

 cfg = [
     "ubuntu",
     "ubuntu",
     "30px",
     "12px",
     "#CDCDCD",
      "#DCDCDC",
     "#007777",
     "#999999",
      "#DCDCDC",
     "5px",
     "#000",
     "rgba(100,100,100,0.3)",
     [],
     "0",
     "0",
     "500px",
     "400px",
     ".2"
 ];
 cfg_bool = [
     false,
     false,
     false,
     false
 ];
 var span = $("span");
 var a = $("a");
 var sqr = $(".sqr");
 span.css("fontFamily", cfg[0]);
 a.css("fontFamily", cfg[1]);
 span.css("fontSize", cfg[2]);
 a.css("fontSize", cfg[3]);
 $("body").css("backgroundColor", cfg[4]);
 sqr.css("backgroundColor", cfg[5]);
 span.css("color", "#077");
 a.css("color", cfg[7]);
 sqr.css("borderTop", "0 solid " + cfg[8]);
 sqr.css("borderBottom", "0 solid " + cfg[8]);
 var searchinput = $("#searchinput");
 if(searchinput.length){
     searchinput.css("color", cfg[10]);
     searchinput.css("backgroundColor", cfg[11]);
 }
 var gotosub = $("#gotosub");
 if(gotosub.length){
     gotosub.css("backgroundColor", cfg[11]);
	gotosub.css("height", "40px")
 }
 var bgimg = $("#bgimg");
 if(cfg_bool[2]){
     bgimg.css("backgroundImage", "url('" +  cfg[12][Math.floor(Math.random()*cfg[12].length)] + "')");
     bgimg.css("bottom", cfg[13]);
     bgimg.css("right", cfg[14]);
     bgimg.css("height", cfg[15]);
     bgimg.css("width", cfg[16]);
     bgimg.css("opacity", cfg[17]);
 }else{
     bgimg.css("backgroundImage", "");
 }


function fixJitter(container){
    container.style.height = window.innerHeight - 0.5 + "px";
}



Object.prototype.anchorCount = function(){
    return this.getElementsByTagName("a").length;
}


// expanding and contracting squares
function expand(){
    if(this.acount > 0){
        this.style.height = 300 + 25*this.acount + "px";
    }else{
        this.style.height = "337px";
    }
    if(cfg_bool[0]){
        this.style.borderTop = cfg[9] + " solid " + cfg[8];
        this.style.borderBottom = cfg[9] + " solid " + cfg[8];
    }
}


function contract(){
    this.style.height = "150px";
    this.style.borderTop = "0 solid" + cfg[8];
    this.style.borderBottom = "0 solid" + cfg[8];
}

function subgoto(query){
	window.location = "https://www.reddit.com/r/" + query;
}

window.onresize = function(){
    fixJitter(container);
}


window.onload = function(){
    HelpText = "-h Shows this list<br>-g Google (default)<br>-a DuckDuckGo\
                <br>-d Danbooru<br>-y YouTube<br>-n niconico<br>-p pixiv";
    visibility = false;
    container = document.getElementById("container");
    fixJitter(container);
    // search
	subredditsearch = document.getElementById("gotosub");
	if(!!subredditsearch){
        subredditsearch.addEventListener("keypress", function(a){
            var key = a.keyCode;
            if(key == 13){
                var query = this.value;
                subgoto(query);
            }
        });
    }

    // adding event listeners to squares or expanding them onload
    var sqr = document.querySelectorAll(".sqr");
	 for(var i = 0; i < sqr.length; ++i)
	 	{
            sqr[i].acount = sqr[i].anchorCount();
            sqr[i].addEventListener("mouseover", expand, false);
            sqr[i].addEventListener("mouseout", contract, false);
   	}

}
