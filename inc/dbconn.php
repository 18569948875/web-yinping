<?php
    header("content-type:text/html;charset=utf-8");   // 设置编码, 针对查询结果中的中文
    date_default_timezone_set('PRC'); //设置中国时区 
    $mysqli = new mysqli("localhost", "root", "root", "ingping");
    $mysqli->set_charset("utf8");
    if( $mysqli->connect_errno ){
        die( "连接失败".$mysqli->connect_error );
    }
?>