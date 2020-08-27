<?php
session_start();
require_once('conn.php');
require_once('utils.php');
$username = null;
if (!empty($_SESSION['username'])) {
  $username = $_SESSION['username'];
  $userdata = getUserdatafromUsername($username);
  $nickname = $userdata['nickname'];
  $created_at = $userdata['created_at'];
}
//錯誤訊息
$errCode = null;
if (!empty($_GET['errCode'])) {
  $errCode = $_GET['errCode'];
}
?>

<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>留言板</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel='stylesheet' href='style.css'> 
</head>
<body>
  <header class='warning'>
    <strong>注意!本站為練習用網站，因教學用途刻意忽略資安的實作，註冊時請勿使用任何真實的帳號或密碼。</strong>
  </header>
  <main class='board'>
  <?php if(!empty($username)) { ?>
    <a href='handle_logout.php' class='board__btn'>登出</a>
    <h3>你好!<?php echo $nickname ?></h3>
  <?php } else { ?>
    <a href='register.php' class='board__btn'>註冊</a>
    <a href='login.php' class='board__btn'>登入</a>
  <?php } ?>
    <h1 class='board__title'>Comments</h1>
    <form class='board__new-comment-form' method='POST' action='handle_add_comment.php'>
      <div><textarea name='content' rows='5'></textarea>
      <?php if(!empty($username)) { ?>
        <input class='board__submit-btn' type="submit">
      <?php } ?>
      <?php if(empty($username)) { ?>
        <h3 class='error'> 請登入發布留言 </h3>
      <?php } ?>
      <?php
        if ($errCode === '1') {
      ?>
        <h3 class='error'> 請輸入留言內容 </h3>
      <?php } ?>
      </div>
    </form>
    <div class='board__hr'></div>
    <section>
      <?php 
        //拿到所有 comments 資料
        $sql = "SELECT * from Ian_comments order by id DESC";
        $result = $conn->query($sql);
        if ($result->num_rows !== 0) {
          while ($row = $result->fetch_assoc()) { ?>
            <div class='card'>
              <div class='card__avatar'>
              </div>
                <div class='card__body'>
                  <div class='card__info'>
                    <span class='card__author'><?php echo $row['nickname']; ?></span>
                    <span class='card__time'><?php echo $row['created_at']; ?></span>
                    <p class='card__content'><?php echo $row['comments']; ?></p>   
                  </div>
                </div>
              </div>
        <?php }} ?>
    </section>
  </main>
  <script>
  </script>
</body>
</html>

