<?php
session_start();
require_once('conn.php');
//檢查是否有輸入帳密
if (empty($_POST['username']) || empty($_POST['password'])) {
  header('location: login.php?errCode=1');
} else {
  $username = $_POST['username'];
  $password = $_POST['password'];

  $sql = sprintf("SELECT * FROM Ian_users WHERE username='%s' and password='%s'", //注意要用 and 不能用 ,
  $username,
  $password);
  $result = $conn->query($sql);
  if (!$result) {
    die($conn->error);
  }
  //用 num->rows 檢查是否有註冊
  if ($result->num_rows) {
    $_SESSION['username'] = $username;
    header('Location: index.php');
  } else {
    header('location: login.php?errCode=2');
  }}
  
?>