//URL
var url = 'http://cf-intranet.ooelfv.at/webext2/rss/json_taeglich.txt'

function loadPage(){
    $("#alarms").show();
    $("#settings").hide();
    $("#charts").hide();
    $("#map").hide();

    loadJSON( function() {
        buildList();
      });
}


function refresh(){
    $(".markup").empty();
    loadJSON( function() {
        buildList();
      });
}

function filter(selectObject) {
    $(".markup").empty();
    var value = selectObject.value;  
    console.log(value);
    filterList(value)
}

function timerange(selectObject) {
    //$(".markup").empty();
    var value = selectObject.value
    if(value == "Laufend"){
        url = 'http://cf-intranet.ooelfv.at/webext2/rss/json_laufend.txt'
    }  
    if(value == "6Stunden"){
        url = 'http://intranet.ooelfv.at/webext2/rss/json_6stunden.txt'
    }
    if(value == "Tag"){
        url = 'http://intranet.ooelfv.at/webext2/rss/json_taeglich.txt'
    }
    if(value == "2Tage"){
        url = 'http://intranet.ooelfv.at/webext2/rss/json_2tage.txt'
    }

    refresh();
    $('#bezirksselector').prop('value', "");
    console.log("Time filter applied");
}

function expand(number){
    $("#infos" + number).slideToggle(500);
   // $("#close" + number).html("Schließen")
    $("#close" + number).text( $("#close" + number).text() == 'Info' ? "Schließen" : "Info");
};


var json = '';

function loadJSON(callback){
    $.getJSON('https://www.whateverorigin.org/get?url=' + encodeURIComponent(url) + '&callback=?', function(data){   
        json = JSON.parse(data.contents);
        //console.log(data);
        //get length of JSON.einsätze
        var count = Object.keys(json.einsaetze).length;
        console.log("JSON loaded")
        console.log("Einsatzzahl: " + count)
        callback();
    });
}


function buildList(){
        for (var i = 0; i < Object.keys(json.einsaetze).length; i++){
            //Variables
            var ortlong = JSON.stringify(json.einsaetze[i].einsatz.einsatzort)
            var ort = ortlong.slice(5,ortlong.length - 1)
            var datelong = JSON.stringify(json.einsaetze[i].einsatz.startzeit)
            var date = datelong.slice(6,17)
            var starttime = datelong.slice(18,23)
            var enddatelong = JSON.stringify(json.einsaetze[i].einsatz.inzeit)
            var enddate = enddatelong.slice(6,17)
            var endtime = enddatelong.slice(18,23)
            var status = json.einsaetze[i].einsatz.status
            //position
            var lon = json.einsaetze[i].einsatz.wgs84.lng
            var lat = json.einsaetze[i].einsatz.wgs84.lat
            //Info Variables
            var defaulttext = json.einsaetze[i].einsatz.adresse.default
            var earea = json.einsaetze[i].einsatz.adresse.earea
            var emun = json.einsaetze[i].einsatz.adresse.emun
            var efeanme = json.einsaetze[i].einsatz.adresse.efeanme
            var estnum = json.einsaetze[i].einsatz.adresse.estnum
            var ecompl = json.einsaetze[i].einsatz.adresse.ecompl

            //append general info
            $( ".markup" ).append( 
                    "<div class='entry' id = 'entry"+i+"'><div class='entrywrap'><div class='flexwrap'><div class='flex1'><h3 class='h3title'>" + json.einsaetze[i].einsatz.einsatzort + 
                    "</h3><div class='overview'>" + json.einsaetze[i].einsatz.einsatzsubtyp.text + "</br>"+ date + "</div></div><div class='flexwrapside'><div class='flex2'>"+ starttime +"</div><div class='flex3'><div class='strich'></div></div><div class='flex4'>"+ endtime +"</div></div></div></br>" + "<div class=infowrap><div id='infos"+ i + 
                    "' class='infos'><div class='unnecessaryinfowrap'><div class='unnecessary'>" + defaulttext + "</br>" + earea + "</br>" + emun + "</br>" + efeanme + "</br>" + estnum + "</br>" +  ecompl + "</div></div></br>" +
                    "Feuerwehren: " + json.einsaetze[i].einsatz.cntfeuerwehren + "</br><div class='feuerwehren"+i+"'></div></br>" +
                    "</div><div class='buttons'><div class='close' id='close"+i+
                    "'  onclick=expand("+i+")>Info</div><div class='map' id='map'><a href='https://maps.google.com/?q=" + lat + "," + lon + "' target='_blank'" + " >Einsatzort</a></div></div></div></div></div>"
            );
            

            for (var a = 0; a < Object.keys(json.einsaetze[i].einsatz.feuerwehrenarray).length; a++){
                $( ".feuerwehren"+i ).append(
                    "<div id='feuerwehraktiv'>" + json.einsaetze[i].einsatz.feuerwehrenarray[a].fwname +"</div>"
                );
            }
            
        }
    };

    function filterList(filter){
        for (var i = 0; i < Object.keys(json.einsaetze).length; i++){
            //Variables
            var ortlong = JSON.stringify(json.einsaetze[i].einsatz.einsatzort)
            var ort = ortlong.slice(5,ortlong.length - 1)
            var datelong = JSON.stringify(json.einsaetze[i].einsatz.startzeit)
            var date = datelong.slice(6,17)
            var starttime = datelong.slice(18,23)
            var enddatelong = JSON.stringify(json.einsaetze[i].einsatz.inzeit)
            var enddate = enddatelong.slice(6,17)
            var endtime = enddatelong.slice(18,23)
            var status = json.einsaetze[i].einsatz.status
            //position
            var lon = json.einsaetze[i].einsatz.wgs84.lng
            var lat = json.einsaetze[i].einsatz.wgs84.lat
            //Info Variables
            var defaulttext = json.einsaetze[i].einsatz.adresse.default
            var earea = json.einsaetze[i].einsatz.adresse.earea
            var emun = json.einsaetze[i].einsatz.adresse.emun
            var efeanme = json.einsaetze[i].einsatz.adresse.efeanme
            var estnum = json.einsaetze[i].einsatz.adresse.estnum
            var ecompl = json.einsaetze[i].einsatz.adresse.ecompl

            if (json.einsaetze[i].einsatz.bezirk.text == filter){
                            //append general info
            $( ".markup" ).append( 
                "<div class='entry' id = 'entry"+i+"'><div class='entrywrap'><div class='flexwrap'><div class='flex1'><h3 class='h3title'>" + json.einsaetze[i].einsatz.einsatzort + 
                "</h3><div class='overview'>" + json.einsaetze[i].einsatz.einsatzsubtyp.text + "</br>"+ date + "</div></div><div class='flexwrapside'><div class='flex2'>"+ starttime +"</div><div class='flex3'><div class='strich'></div></div><div class='flex4'>"+ endtime +"</div></div></div></br>" + "<div class=infowrap><div id='infos"+ i + 
                "' class='infos'><div class='unnecessaryinfowrap'><div class='unnecessary'>" + defaulttext + "</br>" + earea + "</br>" + emun + "</br>" + efeanme + "</br>" + estnum + "</br>" +  ecompl + "</div></div></br>" +
                "Feuerwehren: " + json.einsaetze[i].einsatz.cntfeuerwehren + "</br><div class='feuerwehren"+i+"'></div></br>" +
                "</div><div class='buttons'><div class='close' id='close"+i+
                "'  onclick=expand("+i+")>Info</div><div class='map' id='map'><a href='https://maps.google.com/?q=" + lat + "," + lon + "' target='_blank'" + " >Einsatzort</a></div></div></div></div></div>"
                );
        

                for (var a = 0; a < Object.keys(json.einsaetze[i].einsatz.feuerwehrenarray).length; a++){
                    $( ".feuerwehren"+i ).append(
                        "<div id='feuerwehraktiv'>" + json.einsaetze[i].einsatz.feuerwehrenarray[a].fwname +"</div>"
                    );
                }
            }

            if (filter == "all"){
               
                $( ".markup" ).append( 
                    "<div class='entry' id = 'entry"+i+"'><div class='entrywrap'><div class='flexwrap'><div class='flex1'><h3 class='h3title'>" + json.einsaetze[i].einsatz.einsatzort + 
                    "</h3><div class='overview'>" + json.einsaetze[i].einsatz.einsatzsubtyp.text + "</br>"+ date + "</div></div><div class='flexwrapside'><div class='flex2'>"+ starttime +"</div><div class='flex3'><div class='strich'></div></div><div class='flex4'>"+ endtime +"</div></div></div></br>" + "<div class=infowrap><div id='infos"+ i + 
                    "' class='infos'><div class='unnecessaryinfowrap'><div class='unnecessary'>" + defaulttext + "</br>" + earea + "</br>" + emun + "</br>" + efeanme + "</br>" + estnum + "</br>" +  ecompl + "</div></div></br>" +
                    "Feuerwehren: " + json.einsaetze[i].einsatz.cntfeuerwehren + "</br><div class='feuerwehren"+i+"'></div></br>" +
                    "</div><div class='buttons'><div class='close' id='close"+i+
                    "'  onclick=expand("+i+")>Info</div><div class='map' id='map'><a href='https://maps.google.com/?q=" + lat + "," + lon + "' target='_blank'" + " >Einsatzort</a></div></div></div></div></div>"
                );
            
    
                for (var a = 0; a < Object.keys(json.einsaetze[i].einsatz.feuerwehrenarray).length; a++){
                    $( ".feuerwehren"+i ).append(
                        "<div id='feuerwehraktiv'>" + json.einsaetze[i].einsatz.feuerwehrenarray[a].fwname +"</div>"
                    );
                }

                $('#bezirksselector').prop('value', "");
            }
  
        }
        console.log("List filtered")
    };