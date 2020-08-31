<?php 
require_once('conn.php');
require_once('utils.php');
session_start();
//驗證登入
$username = null;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
}
//取得文章資料//
$page = 1;
if (!empty($_GET['page'])) {
  $page = intval($_GET['page']);
}
$article_per_page = 20;
$offset = ($page - 1) * $article_per_page;

$sql = "SELECT * From Ian_blog_content where is_deleted is Null order by id DESC limit ? offset ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param('ii', $article_per_page, $offset);
$result = $stmt->execute();
if(!$result) {
  die($conn->error);
}
$result = $stmt->get_result();
?>

<!DOCTYPE html>

<html>
<head>
  <meta charset="utf-8">

  <title>部落格</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="normalize.css" />
  <link rel="stylesheet" href="style.css" />
</head>

<body>
  <nav class="navbar">
    <div class="wrapper navbar__wrapper">
      <div class="navbar__site-name">
        <a href='index.php'>Who's Blog</a>
      </div>
      <!-- header -->
      <ul class="navbar__list">
        <div>
          <li><a href="list.php">文章列表</a></li>
          <!-- 暫時無功能 
          <li><a href="#">分類專區</a></li>
          <li><a href="#">關於我</a></li>
          -->
        </div>
        <div>
          <?php if(!empty($username)) { ?>
            <li><a href="handle_logout.php">登出</a></li>
            <li><a href="edit.php">新增文章</a></li>
          <?php } ?>
        </div>
      </ul>
    </div>
  </nav>
  <section class="banner">
    <div class="banner__wrapper">
      <h1>存放技術之地</h1>
      <div>Welcome to my blog</div>
    </div>
  </section>
  <!-- 文章預覽 -->
  <div class="container-wrapper">
    <div class="posts">
      <?php while ($row = $result->fetch_assoc()) { ?>
        <article class="post">
          <div class="post__header">
            <div><?php echo escape($row['title']) ?></div>
            <div class="post__actions">
              <a class="post__action" href="blog.php?id=<?php echo $row['id']; ?>">觀看文章</a>
              <a class="post__action" href="edit.php?id=<?php echo $row['id']; ?>">編輯</a>
              <a class="post__action" href="handle_delete.php?id=<?php echo $row['id']; ?>">刪除</a>
            </div>
          </div>
        </article>
      <?php } ?>
    </div>
  </div>
  <!-- 頁次 -->
  <div class="page-change">
    <?php
      //取得文章筆數
      $sql = "select count(id) as count from Ian_blog_content where is_deleted IS NULL";
      $stmt = $conn->prepare($sql);
      $result = $stmt->execute();
      if(!$result) {
        die($conn->error);
      }
      $result = $stmt->get_result();
      $row = $result->fetch_assoc();
      $count = $row['count'];
      if ($count > 0) {
        $total_page = ceil($count / $article_per_page);
      } else {
        $total_page = 1;
      }
      if ($page != 1) { 
        ?>
      <a href="manage.php?page=1">首頁</a>
      <a href="manage.php?page=<?php echo $page - 1; ?>">上頁</a>
    <?php } ?>
    <?php if ($page != $total_page) { ?>
      <a href="manage.php?page=<?php echo $page + 1; ?>">下頁</a>
      <a href="manage.php?page=<?php echo $total_page ?>">末頁</a>
    <?php } ?>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>