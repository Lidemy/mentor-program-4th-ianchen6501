<?php
  require_once('conn.php');
  header('Content-Type: application/json; charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  session_start();

  if (
    empty($_POST['content'])
  ) {
    $json = array(
      "ok" => false,
      "message" => "please try again!"
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  // insert content //
  $content = $_POST['content'];
  $sql = '
    insert into ian_w12_hw2_todolist(content) values(?);
    ';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $content);
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
  //拿取最新 id//
  $sql = '
  SELECT MAX(id) from ian_w12_hw2_todolist
  ';
  $stmt = $conn->prepare($sql);
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
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $id = $row['MAX(id)'];
  $json = array(
    "ok" => true,
    "message" => "success!",
  );
  setcookie('id', '', time() - 3600);
  setcookie('id', $id, time() + 24*60*60);
  

  $response = json_encode($json);
  echo $response;
?>