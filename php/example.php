<?php
  include('modernizr-server.php');

  print 'The server knows:';
  foreach($modernizr as $feature=>$value) {
      print "<br/> $feature: ";
      print_r($value);
  }
?>