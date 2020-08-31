<?php 
require_once('conn.php');
require_once('utils.php');
session_start();
//驗證登入
$username = null;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
}
//取得文章id
$id = null;
if (!empty($_GET['id'])) {
  $id = $_GET['id'];
}
//取得文章資料
$sql = "SELECT * FROM Ian_blog_content WHERE id=? ";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);
$result = $stmt->execute();
if (!$result) {
  die($conn->error);
}
$result = $stmt->get_result();
$row = $result->fetch_assoc();
$title = escape($row['title']);
$content = escape($row['content']);
$created_at = escape($row['created_at']);
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
  <div class="container-wrapper">
    <div class="posts">
      <article class="post">
        <div class="post__header">
          <div><?php echo $title ?></div>
          <div class="post__actions">
            <a class="post__action" href="index.php">返回首頁</a>
            <?php if (!empty($username)) { ?>
              <a class="post__action" href="edit.php?id=<?php echo $id; ?>">編輯</a>
            <?php } ?>
          </div>
        </div>
        <div class="post__info">
          <?php echo $created_at ?>
        </div>
        <div class="post__content">
          <?php echo $content ?>
        </div>
      </article>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>