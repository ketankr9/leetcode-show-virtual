var q = [];
var x = document.querySelector('ul.list-group:nth-child(1)');
for(var i =1; i<=4; i++){
    var tmp = x.children[i].children[0].attributes['href'].nodeValue.split('/')[4]
    q.push(tmp);
}

var xmlhttp = XPCNativeWrapper(new window.wrappedJSObject.XMLHttpRequest());
xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        callme(JSON.parse(this.responseText)["stat_status_pairs"]);
    }
};

xmlhttp.open("GET", "https://leetcode.com/api/problems/all/", true);
xmlhttp.send();

function callme(arr){
    for(var i=0; i<arr.length; i++){
        var slug = arr[i]['stat']["question__title_slug"];
        var acc = arr[i]["status"];
        if(acc == "ac" && q.includes(slug)){
            console.log("solved", slug);
            x.children[q.indexOf(slug)+1].style["background-color"]="rgb(51, 255, 255)";
        }
    }
};