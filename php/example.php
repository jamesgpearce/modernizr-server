r<?php
  include('modernizr-server.php');
?><!DOCTYPE html>
<!--[if IEMobile 7 ]><html class="no-js iem7"><![endif]-->
<!--[if (gt IEMobile 7)|!(IEMobile)]><!--><html class="no-js"><!--<![endif]-->
	<head>
		<meta charset="utf-8">
		<title>Modernizr Server</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- ATG: adding this script to add the <html> classes on DOM-Ready -->
		<script>
			(function(){
				function onReady(callback) {
					var addListener = document.addEventListener || document.attachEvent,
						removeListener =  document.removeEventListener || document.detachEvent,
						eventName = document.addEventListener ? 'DOMContentLoaded' : 'onreadystatechange';
					addListener.call(document, eventName, callback, false);
				}
				window.Modernizr = <?php echo json_encode($modernizr); ?>;
				onReady(function(){
					var c = document.documentElement.className.replace('no-js','');
					document.documentElement.className = '<?php echo $_COOKIE['ModernizrClasses']; ?> ' + c;
				});
			})();
		</script>
	</head>
	<body>
		<h1>Modernizr Server</h1>
<?php
  print 'The server knows:';
  foreach($modernizr as $feature=>$value) {
      print "<br/> $feature: ";
      print_r($value);
  }
?>
	</body>
</html>
