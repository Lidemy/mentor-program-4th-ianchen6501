<?php
require_once('conn.php');
require_once('utils.php');
session_start();
if (empty($_POST['username'] || $_POST['password'])) {
  header("location: login.php?errCode=1");
  exit();
}

$username = $_POST['username'];
$password = $_POST['password'];

//取得文章資料//
$sql = "SELECT * From Ian_blog_users";
$stmt = $conn->prepare($sql);
$result = $stmt->execute();
//檢查連線及資料//
if(!$result) {
  die($conn->error);
}
$result = $stmt->get_result();
if ($result->num_rows === 0) {
  header("location: login.php");
}
$row = $result->fetch_assoc();
//密碼驗證//
if ($password === $row['password']) {
  //登入成功
  $_SESSION['username'] = $username;
  header("location: index.php");
} 





?>