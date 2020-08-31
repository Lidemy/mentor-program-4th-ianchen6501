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
$sql = "SELECT * From Ian_blog_content where is_deleted is Null order by id DESC";
$stmt = $conn->prepare($sql);
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
          <?php if(empty($username)) { ?>
            <li><a href="login.php">登入</a></li>
          <?php } ?>
          <?php if(!empty($username)) { ?>
            <li><a href="handle_logout.php">登出</a></li>
            <li><a href="manage.php">管理後台</a></li>
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
          </div>
        </div>
      </article>
      <?php } ?>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>