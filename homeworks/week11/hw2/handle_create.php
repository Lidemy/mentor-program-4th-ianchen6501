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
  //新增文章
  $sql = "insert into Ian_blog_content(title, content) values(?, ?)";
  $stmt = $conn->prepare($sql);
  $stmt->bind_param('ss', $title, $content);
  $result = $stmt->execute();
  if (!$result) {
    die($conn->error);
  }

  header("Location: index.php");
?>