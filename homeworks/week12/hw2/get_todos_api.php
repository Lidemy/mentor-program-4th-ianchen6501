<?php
  require_once('conn.php');
  header('Content-Type: application/json; charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  session_start();
  if (
    empty($_GET['id'])) {
    $json = array(
      "ok"=> false,
      "message" => "there is no remained data, please create a new list."
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  //拿取 todos 資料
  $id = $_GET['id'];
  $sql = 'select content from ian_w12_hw2_todolist where id=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('i', $id);
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
  //回傳資料
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $content= $row['content'];

  $json = array(
    "ok"=> true,
    "message"=> "success!",
    "content"=> $content
  );
  $response = json_encode($json);
  echo $response;

?>