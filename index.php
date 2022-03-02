
<head>
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="apple-mobile-web-app-status-bar-style"content="black-translucent">
    <title>FF Info</title>
    <script src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <link rel="stylesheet" href="style.css">
    <!--<link rel="manifest" href="resources/manifest.webmanifest">-->
    <script src="script.js"></script>
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
    crossorigin=""/>
        <!-- Make sure you put this AFTER Leaflet's CSS -->
    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
    crossorigin=""></script>
    </head>
 
 <body onload="loadPage()" style="background-color:182431;">
        <div id="statusbar"></div>
        <div id="header">
            <h2 id="heading"></h2>
            <div id="selectleft">
                <select id="bezirksselector" name="Bezirk" onchange="filter(this)">
                    <option value="" disabled selected>Bezirk</option>
                    <option value="all">Alle</option>‚
                    <option value="Urfahr-Umgebung">Urfahr-Umgebung</option>
                    <option value="Rohrbach">Rohrbach</option>
                    <option value="Braunau">Braunau</option>
                    <option value="Eferding">Eferding</option>
                    <option value="Freistadt">Freistadt</option>
                    <option value="Gmunden">Gmunden</option>
                    <option value="Grieskirchen">Grieskirchen</option>
                    <option value="Kirchdorf">Kirchdorf</option>
                    <option value="Linz-Land">Linz-Land</option>
                    <option value="Perg">Perg</option>
                    <option value="Ried im Innkreis">Ried</option>
                    <option value="Schärding">Schärding</option>
                    <option value="Steyr-Land">Steyr-Land</option>
                    <option value="Vöcklabruck">Vöcklabruck</option>
                    <option value="Wels-Land">Wels-Land</option>
                </select>
            </div>
            <div id="selectright">
                <select id="timedropdown" name="time" onchange="timerange(this)">
                <option value="" disabled selected>Zeitspanne</option>
                <option value="Laufend">Laufend</option>
                <option value="6Stunden">6 Stunden</option>
                <option value="Tag">Tag</option>
                <option value="2Tage">2 Tage</option>
            </select>
        </div>      
    </div>
    <div id="mapheading">
        <h2>Einsatzkarte</h2>
        <div id="selectrightmap">
            <select id="timedropdown" name="time" onchange="timerange(this)">
            <option value="" disabled selected>Zeitspanne</option>
            <option value="Laufend">Laufend</option>
            <option value="6Stunden">6 Stunden</option>
            <option value="Tag">Tag</option>
            <option value="2Tage">2 Tage</option>
        </select>
    </div>
    </div>
    <section id="alarms">
        <div class="spacer_top"></div>
        <div id="markup" class="markup"></div>
        
        <div class="spacer_bottom"></div>
    </section>
    <section id="charts">
        <div class="spacer_top"></div>
        <img src="http://intranet.ooelfv.at/webext2/img/statistik_arten_woche.jpg">
        <img src="http://intranet.ooelfv.at/webext2/img/statistik_arten_monat.jpg">
        <div class="spacer_bottom"></div>
    </section>
    <section id="map">
        <div class="spacer_top"></div>
        <div id="mapid" style="position: absolute; top: 0; left: 0; bottom: 0; right: 0;"></div>
        <div class="spacer_bottom"></div>
    </section>
    <section id="settings">
        <div class="spacer_top"></div>
        <span style="color: white; width: 100%;">coming soon</span>
        <div class="spacer_bottom"></div>
    </section>
    <div id="footer">
            <div class="footerfourth" id="alarmsfooter" onclick="SectionSwitch('alarmsfooter')">
                <div class="icon"><img id="iconalarms" src="resources/iconalarm.svg"></div>
                <div class="icontext">Einsätze</div>
            </div>
            <div class="footerfourth" id="chartsfooter" onclick="SectionSwitch('chartsfooter')">
                <div class="icon"><img id="iconcharts" src="resources/iconchart.svg"></div>
                <div class="icontext">Statistik</div>
            </div>
            <div class="footerfourth" id="mapfooter" onclick="SectionSwitch('mapfooter')">
                <div class="icon"><img id="iconmap" src="resources/iconmap.svg"></div>
                <div class="icontext">Karte</div>
            </div>
            <div class="footerfourth" id="settingsfooter" onclick="SectionSwitch('settingsfooter')">
                <div class="icon"><img id="iconsettings" src="resources/iconsettings.svg"></div>
                <div class="icontext">Einstellungen</div>
            </div>
    </div>
    <script>
        function test123(){
            $.ajax({
            url: 'test.php',
            success: function(data) {
                console.log(data)
            }
            });
        }


    </script>
 </body>