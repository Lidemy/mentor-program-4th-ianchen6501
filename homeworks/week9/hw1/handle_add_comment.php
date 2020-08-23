<?php
session_start();
require_once('conn.php');
require_once('utils.php');
$comments = $_POST['content'];
//檢查留言是否為空
if (empty($comments)) {
  header('Location: index.php?errCode=1');
  exit();
}
//取得 nickname 以 insert 進去 db
$username = $_SESSION['username'];
$userdata = getUserdatafromUsername ($username);
$nickname = $userdata['nickname'];

$sql = "INSERT INTO Ian_comments(nickname, comments) VALUES ('$nickname', '$comments')";
$conn->query($sql);
header('location: index.php');
?>