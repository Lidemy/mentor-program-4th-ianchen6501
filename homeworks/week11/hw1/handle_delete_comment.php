<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (
    empty($_GET['id'])
  ) {
    header('Location: index.php?errCode=1');
    die('資料不齊全');
  }

  $id = $_GET['id'];
  $username = $_SESSION['username'];
  $authority = $_SESSION['authority'];
  //soft deleted ，並增加驗證 $_SESSION['authority'] 來判斷權限
  $sql = "update Ian_comments set is_deleted=1 where id=? and (username =? OR authority =?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('iss', $id, $username, $authority);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>