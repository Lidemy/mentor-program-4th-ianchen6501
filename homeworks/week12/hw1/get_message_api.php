<?php
  require_once('conn.php');
  header('Content-Type: application/json; charset=utf-8');
  header('Access-Control-Allow-Origin: *');
  if (
    empty($_GET['site_key'])) {
    $json = array(
      "ok"=> false,
      "message" => "please input missing fields"
    );
    $response = json_encode($json);
    echo $response;
    die();
  }
  //拿取最新留言 id 並作為 cursor 使用
  $site_key = $_GET['site_key'];
  $sql = 'select max(id) from ian_w12_message_board where site_key=?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('s', $site_key);
  $result = $stmt->execute();
  if (!$result) {
    alert($conn->error);
  }
  $result = $stmt->get_result();
  $row = $result->fetch_assoc();
  $cursor = intval($row['max(id)']);
  //loadmore 監聽
  //先檢查有無新增留言
  if(!empty($_GET['cursor'])) {
    $cursor = $_GET['cursor'];
  }
  if(!empty($_GET['loadmore_times'])) {
    $loadmore_times = $_GET['loadmore_times'];
    $cursor = $cursor - (5 * intval($loadmore_times));
  }
  //拿取新的五筆資料
  $site_key = $_GET['site_key'];
  $limit = 5;
  $sql = 'select nickname, message, created_at from ian_w12_message_board where site_key=? and id <= ? order by id desc limit ?';
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('sii', $site_key, $cursor, $limit);
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
  $discussion= array();
  while ($row = $result->fetch_assoc()) {
    array_push($discussion, array(
      'nickname' => $row['nickname'],
      'message' => $row['message'],
      'created_at' => $row['created_at']
    ));
  }
  $json = array(
    "ok"=> true,
    "discussion"=> $discussion,
    "cursor"=> $cursor
  );
  $response = json_encode($json);
  echo $response;

?>