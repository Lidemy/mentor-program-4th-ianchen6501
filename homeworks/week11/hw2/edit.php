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
//取得錯誤代碼
$errCode = null;
$msg = '';
if (!empty($_GET['errCode'])) {
  $errCode = $_GET['errCode'];
}
if ($errCode === '1') {
  $msg ='還有資料未填寫喔!';
}
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
  <!-- 文章編輯區 -->
  <div class="container-wrapper">
    <div class="container">
      <div class="edit-post">
        <?php if (empty($id)) { ?>
          <form action="handle_create.php" method="POST">
        <?php } ?>
        <?php if (!empty($id)) { ?>
          <form action="handle_edit.php" method="POST">
        <?php } ?>
            <div class="edit-post__header">
              <div class="edit-post__title">
                發表文章：
              </div>
              <a href="index.php" class="edit-post__btn">返回</a>
            </div>
            <div class="edit-post__input-wrapper">
              <?php if (empty($id)) { ?>
                <input class="edit-post__input" placeholder="請輸入文章標題" name="title"/>
              <?php } ?>
              <?php if (!empty($id)) { ?>
                <input class="edit-post__input" value="<?php echo $title; ?>" name="title"/>
              <?php } ?>  
            </div>
            <div class="edit-post__input-wrapper">
              <?php if (empty($id)) { ?><textarea rows="20" class="edit-post__content" name="content"></textarea><?php } ?>
              <?php if (!empty($id)) { ?><textarea rows="20" class="edit-post__content" name="content"><?php echo $content; ?></textarea><?php } ?>
            </div>
            <?php if (!empty($errCode) && $errCode === '1') { ?>
              <div class='error'><?php echo $msg; ?></div>
            <?php } ?>
            <input type='submit' class="edit-post__btn" value="送出"></input>
            <?php if (!empty($id)) { ?>
              <input type='hidden' name="id" value='<?php echo $id ?>'/>
            <?php } ?>
          </form>
      </div>
    </div>
  </div>
  <footer>Copyright © 2020 Who's Blog All Rights Reserved.</footer>
</body>
</html>