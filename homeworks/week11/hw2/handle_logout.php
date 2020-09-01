<?php
session_start();
session_destroy();
$address = $_SERVER['HTTP_REFERER'];
$address = mb_split("\/", $address);
$cnt = count($address);
$address = $address[$cnt-1];
//回到上一頁
if ($address === "blog.php") {
  header ("location: $address");
} else {
  header ("location: index.php");
};

/*
php裡，
單引號內的變數不會被執行，
雙引號內的變數會被執行，
雙引號內單引號裡面的變數會被執行，
但是雙引號內變數加上反斜槓就可以讓這個變數不被執行
*/
?>