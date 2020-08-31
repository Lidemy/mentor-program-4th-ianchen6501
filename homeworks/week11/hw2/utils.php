<?php
//XSS 防制//
function escape ($str) {
  return htmlspecialChars($str);
}


?>