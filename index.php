<?php
  // ATG: adding test to make sure Modernizr Server should run, else page should simply render
  $modernizr_js = 'modernizr.js/modernizr.js';
  if (file_exists($modernizr_js)) {
	include('modernizr-server.php');
  }
?><!DOCTYPE html>
<!--[if IEMobile 7 ]><html class="no-js iem7"><![endif]-->
<!--[if (gt IEMobile 7)|!(IEMobile)]><!--><html class="no-js"><!--<![endif]-->
	<head>
		<meta charset="utf-8">
		<title>Modernizr-Server and -Client</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script>
			// ATG: try to replicate the condition Modernizr normally creates in the client browser
			(function(elem, cookie){
				// ATG: grabbing Modernizr object from the cookie
				window.Modernizr = JSON.parse(cookie.split('Modernizr=')[1].split(';')[0]);
				// ATG: remove the 'no-js' class from the <html> element (but don't add 'js', that will be added below)
				var c = elem.className.replace('no-js',''),
					mc = '';
				// ATG: if we have localStorage, get the Modernizr <html> classes from there; if not, from the cookie
				if ('localStorage' in window && window['localStorage']!==null) {
				  mc = localStorage.getItem('ModernizrClasses');
				} else {
				  mc = cookie.split('ModernizrClasses=')[1].split(';')[0];
				}
				// ATG: add the Modernizr classes to the <html> element (will already include 'js' class)
				elem.className = mc + ' ' + c;
			})(document.documentElement, document.cookie);
		</script>
	</head>
	<body>
		<h1>Modernizr-Server and -Client</h1>
<?php
		  // ATG: this is just to show the values collected using Modernizr on the server
		  if ($modernizr) {
			print '		<p>The server knows:</p>'.PHP_EOL;
			print '		<pre>'.PHP_EOL;
			print_r($modernizr);
			print '		</pre>'.PHP_EOL;
			print '		<p>And you can access individual test result values on the server like this:</p>'.PHP_EOL;
			print '		<pre>'.PHP_EOL;
			print 'if ($modernizr->flexbox) {'.PHP_EOL;
			print '	// do something with flexbox'.PHP_EOL;
			print '} else {'.PHP_EOL;
			print '	// do something else'.PHP_EOL;
			print '}'.PHP_EOL;
			print '		</pre>'.PHP_EOL;
		  } else {
			print '		<p>Modernizr is not available...</p>';
		  }
?>
	</body>
</html>
