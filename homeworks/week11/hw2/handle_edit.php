<?php
  session_start();
  require_once('conn.php');
  require_once('utils.php');

  if (
    empty($_POST['title'] || $_POST['content'])
  ) { 
    header('Location: edit.php?errCode=1&id='.$_POST['id']);
    exit();
  }

  $username = $_SESSION['username'];
  $id = $_POST['id'];
  $title = $_POST['title'];
  $content = $_POST['content'];
  //增加驗證 $username 來判斷權限
  $sql = "update Ian_blog_content set title=?, content=? where id=? and username=?";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ssis', $title, $content, $id, $username);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>