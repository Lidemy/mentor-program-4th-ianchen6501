<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (empty($_GET['id'])) { 
    header('Location: index.php');
    exit();
  }

  $username = $_SESSION['username'];
  $id = $_GET['id'];
  $is_deleted = 1;
  //增加驗證 $_SESSION['authority'] 來判斷權限
  $sql = "update Ian_blog_content set is_deleted=? where id=? and username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('iis', $is_deleted, $id, $username);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: manage.php");
?>