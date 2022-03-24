function loadPage(){
    $("#loading").show();
    $("#heading").hide();
    $("#mapheading").hide();
    $("#settings").hide();
    $("#charts").hide();
    $("#map").hide();
    $("#alarms").show();
    $('#alarmsfooter').css( "filter", "invert(60%) sepia(32%) saturate(2934%) hue-rotate(186deg) brightness(97%) contrast(95%)")
    loadJSON("now");
    $("#loading").hide();
}

//Set VAR to initialize map only once
var maploaded = false;
function SectionSwitch(selectObject) {
    if(selectObject == "alarmsfooter"){
        $(".markup").empty();
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
        loadJSON("now");
        $(".chart").empty();
    } 

    if(selectObject == "chartsfooter"){
        $(".chart").empty();
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
        loadJSON("twodays");
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
        loadJSON("now");
        if (maploaded == false){
            loadMap();
            maploaded = true;
        }
        populate();
        $(".chart").empty();
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
    $(".markup").append("<div class='animwavecontainer'><div class='sp sp-wave'></div></div>");
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
                $(".markup").empty();
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

function drawchart(){

}


function buildList(){
    try{
        $(".markup").empty();

        //Charts
        var ec1 = 0;
        var ec2 = 0;
        var ec3 = 0; 
        var ec4 = 0; 
        var ec5 = 0; 

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


            //Chart
            var str = json.einsaetze[i].einsatz.einsatzart;
            //console.log(str)
            if(str.includes('TEE')){
                console.log(str)
                ec3++;
            }

            if(str.includes('BRAND')){
                //console.log(str)
                ec1++;
            }
            if(str.includes('UNWETTER')){
                //console.log(str)
                ec4++;
            }

            if(str.includes('PERSON')){
                //console.log(str)
                ec2++;
            }

            if(str.includes('SONSTIGE')){
                //console.log(str)
                ec5++;
            }



        }
        populate()
        }
        catch(err){
            $(".markup").append("<p style='line-height:30px;color:white; width:100%; text-align:center; margin-top: 200px;'>Aktuell wird die Feuerwehr nicht gebraucht</p><div class='head'><div class='face face__happy'><div class='eye-left'></div><div class='eye-right'></div><div class='mouth'></div></div></div>")
        }
        finally{
            console.log("###    List Built")

            //append Chart
            $(".chart").empty();
            $(".charteinsätzegesamt").empty();
            var eges = ec1+ec2+ec3+ec4+ec5;
            var ec1p = ec1 / eges * 100;
            var ec2p = ec2 / eges * 100;
            var ec3p = ec3 / eges * 100;
            var ec4p = ec4 / eges * 100;
            var ec5p = ec5 / eges * 100;
            $( ".charteinsätzegesamt" ).append("<p>Gesamt: "+eges+"</p>");
            $( ".chart" ).append("<div id='e1' class='chartentry' style='height:"+ec1p+"%; background-color:red';'><p>"+ec1+"</p></div>");
            $( ".chart" ).append("<div id='e2' class='chartentry' style='height:"+ec2p+"%; background-color:yellow';'><p>"+ec2+"</p></div>");
            $( ".chart" ).append("<div id='e2' class='chartentry' style='height:"+ec3p+"%; background-color:blue';'><p>"+ec3+"</p></div>");
            $( ".chart" ).append("<div id='e2' class='chartentry' style='height:"+ec4p+"%; background-color:green';'><p>"+ec4+"</p></div>");
            $( ".chart" ).append("<div id='e2' class='chartentry' style='height:"+ec5p+"%; background-color:black';'><p>"+ec5+"</p></div>");
            console.log("Brand " + ec1)  
            console.log("PERSON " + ec2)
            console.log("TEE " + ec3)
            console.log("Unwetter " + ec4)
            console.log("SONSTIGE " + ec5)
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
    
                var lonmap = json.einsaetze[i].einsatz.wgs84.lng
                var latmap = json.einsaetze[i].einsatz.wgs84.lat
                var marker = L.marker([latmap, lonmap], {icon: markerred}).addTo(map);
                //console.log("Punkt" + i)
                
                const popup1 = L.popup({
                    className: 'custom-popup'
                  }).setContent("<div class='entryMAP' id = 'entry"+i+"'><div class='entrywrapMAP'><div class='flexwrapMAP'><div class='flex1'><h3 class='h3title'>" + json.einsaetze[i].einsatz.einsatzort + 
                  "</h3><div class='overview'>" + json.einsaetze[i].einsatz.einsatzsubtyp.text + "</br>"+ date + "</div></div><div class='flexwrapsideMAP'><div class='flex2'>"+ starttime +"</div><div class='flex3'><div class='strich'></div></div><div class='flex4'>"+ endtime +"</div></div></div></br>" + "<div class=infowrap><div id='infos"+ i + 
                  "' class='infos'><div class='unnecessaryinfowrap'><div class='unnecessary'>" + defaulttext + "</br>" + earea + "</br>" + emun + "</br>" + efeanme + "</br>" + estnum + "</br>" +  ecompl + "</div></div></br>" +
                  "Feuerwehren: " + json.einsaetze[i].einsatz.cntfeuerwehren + "</br><div class='feuerwehren"+i+"'></div></br>" +
                  "</div></div></div></div>");
                  marker.bindPopup(popup1);
                
                map.on('popupopen', function(e) {
                    var px = map.project(e.target._popup._latlng); // find the pixel location on the map where the popup anchor is
                    px.y -= e.target._popup._container.clientHeight/2; // find the height of the popup container, divide by 2, subtract from the Y axis of marker location
                    map.panTo(map.unproject(px),{animate: true}); // pan to new center
                });


            }
        }
        catch(err){
            console.log("Keine Punkte verfügbar");
        }
        finally{
            console.log("###    Punkte zur Karte hinzugefügt")
        }
}