<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (
    empty($_POST['comments'])
  ) {
    header('Location: update_comments.php?errCode=1&id='.$_POST['id']);
    die('資料不齊全');
  }

  $username = $_SESSION['username'];
  $authority = $_SESSION['authority'];
  $id = $_POST['id'];
  $comments = $_POST['comments'];
  //增加驗證 $_SESSION['authority'] 來判斷權限
  $sql = "update Ian_comments set comments=? where id=? and (username =? OR authority =?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('siss', $comments, $id, $username, $authority);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>