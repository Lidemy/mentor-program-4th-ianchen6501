<?php
require_once('conn.php');
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
if (
  empty($_POST['nickname']) || 
  empty($_POST['site_key']) || 
  empty($_POST['message'])) {
  $json = array(
    "ok"=> false,
    "message" => "please input missing fields"
  );
  $response = json_encode($json);
  echo $response;
  die();
}

$nickname = $_POST['nickname'];
$site_key = $_POST['site_key'];
$message = $_POST['message'];

$sql = 'insert into ian_w12_message_board(nickname, site_key, message) values(?, ?, ?)';
$stmt = $conn->prepare($sql);
$stmt->bind_param('sss', $nickname, $site_key, $message);
$result = $stmt->execute();
if (!$result) {
  $json = array(
    "ok"=> false,
    "message"=> $conn->error
  );
  $response = json_encode($json);
  echo $response;
  die();
}

$json = array(
  "ok"=> true,
  "message"=> 'sucess!'
);

$response = json_encode($json);
echo $response;

?>