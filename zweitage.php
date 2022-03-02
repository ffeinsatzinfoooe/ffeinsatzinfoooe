<?php 
    $url = "http://cf-intranet.ooelfv.at/webext2/rss/json_2tage.txt";
    $json = file_get_contents($url);
    //$json_data = json_decode($json, true);
    echo $json;
?>