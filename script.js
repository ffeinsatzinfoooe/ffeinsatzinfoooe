function loadPage(){
    $("#alarms").show();
    $("#settings").hide();
    $("#charts").hide();
    $("#map").hide();
    $("#heading").hide();
    $("#mapheading").hide();
    $('#alarmsfooter').css( "filter", "invert(60%) sepia(32%) saturate(2934%) hue-rotate(186deg) brightness(97%) contrast(95%)")

    loadJSON("now");
}

//Set VAR to initialize map only once
var maploaded = false;
function SectionSwitch(selectObject) {
    if(selectObject == "alarmsfooter"){
        $("#alarms").show();
        $("#settings").hide();
        $("#charts").hide();
        $("#map").hide();
        $('#alarmsfooter').css( "filter", "invert(60%) sepia(32%) saturate(2934%) hue-rotate(186deg) brightness(97%) contrast(95%)")
        $('#chartsfooter').css( "filter", "none")
        $('#mapfooter').css( "filter", "none")
        $('#settingsfooter').css( "filter", "none")
        $("#bezirksselector").show();
        $("#timedropdown").show();
        $("#heading").hide();
        $("#mapheading").hide();
    } 

    if(selectObject == "chartsfooter"){
        $("#alarms").hide();
        $("#settings").hide();
        $("#charts").show();
        $("#map").hide();
        $('#alarmsfooter').css( "filter", "none")
        $('#chartsfooter').css( "filter", "invert(60%) sepia(32%) saturate(2934%) hue-rotate(186deg) brightness(97%) contrast(95%)")
        $('#mapfooter').css( "filter", "none")
        $('#settingsfooter').css( "filter", "none")
        $("#bezirksselector").hide();
        $("#timedropdown").hide();
        $("#heading").html("Statistik");
        $("#heading").show();
        $("#mapheading").hide();
    }  

    if(selectObject == "mapfooter"){
        $("#alarms").hide();
        $("#settings").hide();
        $("#charts").hide();
        $("#map").show();
        $('#alarmsfooter').css( "filter", "none")
        $('#chartsfooter').css( "filter", "none")
        $('#mapfooter').css( "filter", "invert(60%) sepia(32%) saturate(2934%) hue-rotate(186deg) brightness(97%) contrast(95%)")
        $('#settingsfooter').css( "filter", "none")
        $("#bezirksselector").hide();
        $("#timedropdown").hide();
        $("#mapheading").show();
        $("#heading").hide();
        if (maploaded == false){
            loadMap();
            maploaded = true;
        }
        populate();
    } 

    if(selectObject == "settingsfooter"){
        $("#alarms").hide();
        $("#settings").show();
        $("#charts").hide();
        $("#map").hide();
        $('#alarmsfooter').css( "filter", "none")
        $('#chartsfooter').css( "filter", "none")
        $('#mapfooter').css( "filter", "none")
        $('#settingsfooter').css( "filter", "invert(60%) sepia(32%) saturate(2934%) hue-rotate(186deg) brightness(97%) contrast(95%)")
        $("#bezirksselector").hide();
        $("#timedropdown").hide();
        $("#heading").html("Einstellungen");
        $("#heading").show();
        $("#mapheading").hide();
    }  
}

function filter(selectObject) {
    $(".markup").empty();
    var value = selectObject.value;  
    console.log(value);
    filterList(value)
}

function timerange(selectObject) {
    $(".markup").empty();
    var value = selectObject.value;
    if(value == "Laufend"){
        $.ajax({
            url:loadJSON("now"),
            success:function(){
                //populate();
            }
         })
    }  
    if(value == "6Stunden"){
        $.ajax({
            url:loadJSON("hour"),
            success:function(){
                //populate();
            }
         })
    }
    if(value == "Tag"){
        $.ajax({
            url:loadJSON("day"),
            success:function(){
                //populate();
            }
         })
    }
    if(value == "2Tage"){
        $.ajax({
            url:loadJSON("twodays"),
            success:function(){
                //populate();
            }
         })
    }
    $('#bezirksselector').prop('value', "");
    console.log("##         Time filter applied");
}

function expand(number){
    $("#infos" + number).slideToggle(500);
   // $("#close" + number).html("Schließen")
    $("#close" + number).text( $("#close" + number).text() == 'Info' ? "Schließen" : "Info");
};

//Decline global JSON variable
var json = "";

function loadJSON(range){
    var url1 = "";
    if (range == "now"){
        var url1 = "laufend.php";
        $.ajax({
            type : "POST",
            url: url1,
            dataType: 'html',
            success: function(data) {
                //console.log(data);
                json = JSON.parse(data);
                //console.log(json);
                console.log("JSON loaded")
                buildList();
            }
        });
    }
    if (range == "day"){
        var url1 = "taeglich.php";
        $.ajax({
            type : "POST",
            url: url1,
            dataType: 'html',
            success: function(data) {
                //console.log(data);
                json = JSON.parse(data);
                //console.log(json);
                console.log("JSON loaded")
                buildList();
            }
        });
    }
    if (range == "hour"){
        var url1 = "sechsstunden.php";
        $.ajax({
            type : "POST",
            url: url1,
            dataType: 'html',
            success: function(data) {
                //console.log(data);
                json = JSON.parse(data);
                //console.log(json);
                console.log("JSON loaded")
                buildList();
            }
        });
    }
    if (range == "twodays"){
        var url1 = "zweitage.php";
        $.ajax({
            type : "POST",
            url: url1,
            dataType: 'html',
            success: function(data) {
                //console.log(data);
                json = JSON.parse(data);
                //console.log(json);
                console.log("JSON loaded")
                buildList();
            }
        });
    }
}


function buildList(){
    try{
        $(".markup").empty();
        var length = Object.keys(json.einsaetze).length;
        for (var i = 0; i < length; i++){
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
                    "'  onclick=expand("+i+")>Info</div><div class='mapbutton' id='mapbutton'><a href='https://maps.google.com/?q=" + lat + "," + lon + "' target='_blank'" + " >Einsatzort</a></div></div></div></div></div>"
            );
            

            for (var a = 0; a < Object.keys(json.einsaetze[i].einsatz.feuerwehrenarray).length; a++){
                $( ".feuerwehren"+i ).append(
                    "<div id='feuerwehraktiv'>" + json.einsaetze[i].einsatz.feuerwehrenarray[a].fwname +"</div>"
                );
            }
            
            
        }
        populate()
        }
        catch(err){
            $(".markup").append("<p style='line-height:30px;color:white; width:100%; text-align:center; margin-top: 300px;'>Aktuell wird die Feuerwehr nicht gebraucht</p><div class='head'><div class='face face__happy'><div class='eye-left'></div><div class='eye-right'></div><div class='mouth'></div></div></div>")
        }
        finally{
            console.log("###    List Built")
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
                "'  onclick=expand("+i+")>Info</div><div class='mapbutton' id='mapbutton'><a href='https://maps.google.com/?q=" + lat + "," + lon + "' target='_blank'" + " >Einsatzort</a></div></div></div></div></div>"
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
                    "'  onclick=expand("+i+")>Info</div><div class='mapbutton' id='mapbutton'><a href='https://maps.google.com/?q=" + lat + "," + lon + "' target='_blank'" + " >Einsatzort</a></div></div></div></div></div>"
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

var map;
function loadMap(){
    map = L.map('mapid',{
        center: [48.2, 14.2],
        zoom: 9,
        zoomControl: false,
        tap: false,
        });
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attributions: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
        }).addTo(map);
}

function populate(){
   
        $(".leaflet-marker-icon").remove();
        $(".leaflet-marker-shadow").remove();
        $(".leaflet-popup").remove();
        console.log("###     Punkte entfernt");
        var markerred = L.divIcon({className: 'markerred'}); 
        try{
            for (var i = 0; i < Object.keys(json.einsaetze).length; i++){
                //Variables
                var lonmap = json.einsaetze[i].einsatz.wgs84.lng
                var latmap = json.einsaetze[i].einsatz.wgs84.lat
                L.marker([latmap, lonmap], {icon: markerred}).addTo(map);
                console.log("Punkt" + i)
            }
        }
        catch(err){
            console.log("Keine Punkte verfügbar");
        }
        finally{
            console.log("###    Punkte zur Karte hinzugefügt")
        }
}
