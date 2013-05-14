<?php

  class Modernizr {

    static $modernizr_js = 'modernizr.js/modernizr.js';
    static $key = 'Modernizr';
    // ATG: adding for <html> classes
    static $keyClasses = 'ModernizrClasses';
    static $modClasses = '';

    // begin boo _mer _ang...
    static function boo() {
      $key = self::$key;
      // ATG: adding for <html> classes
      $keyClasses = self::$keyClasses;
      $modClasses = self::$modClasses;
      // if we already have the values as $_SESSION variables, use them
      if (session_start() && isset($_SESSION) && isset($_SESSION[$key])) {
        // ATG: i was getting a PHP error when retrieving the $_SESSION variable value
        return unserialize($_SESSION[$key]);
        // ATG: adding for <html> classes
        if (isset($_SESSION[$keyClasses])) {
          $modClasses = $_SESSION[$keyClasses];
        }
      // if not, check for $_COOKIE values
      } elseif (isset($_COOKIE) && isset($_COOKIE[$key])) {
        $modernizr = self::_ang($_COOKIE[$key]);
        if (isset($_SESSION)) {
          // ATG: i was getting a PHP error when retrieving the $_SESSION variable value
          $_SESSION[$key] = serialize($modernizr);
        }
        // ATG: adding for <html> classes
        if (isset($_COOKIE[$keyClasses])) {
          $modClasses = self::_ang($_COOKIE[$keyClasses]);
          $_SESSION[$keyClasses] = $modClasses;
        }
        return $modernizr;
      // if still not, send Modernizr to the device to get the values
      } else {
        // ATG: had to move <script> into <body>, Modernizr hyphens test was breaking
        print "<html><head></head><body><script>";
        readfile(__DIR__ . '/' . self::$modernizr_js);
        print self::_mer() . "</script></body></html>";
        exit;
      }
    }

    static function _mer() {
      return "".
        // ATG: adding mc var to collect <html> classes
        "var m=Modernizr,c='".self::$key."=',mc='';".
        // ATG: switched to JSON parsing, rather than the manual process.  support is good, except for iOS 3.2... http://caniuse.com/#search=JSON
        //      if you need to support iOS <= 3.2, comment the next line, and uncomment the block immediately after it
        //      you'll also need to comment/uncomment similar sets of code in the PHP function _ang below
        "c+=JSON.stringify(m);".PHP_EOL.
        /*
        "for(var f in m){".
          "if(f[0]=='_'){continue;}".
          "var t=typeof m[f];".
          "if(t=='function'){continue;}".
          "c+=(c?'|':'".self::$key."=')+f+':';".
          "if(t=='object'){".
            "for(var s in m[f]){".
              "c+='/'+s+':'+(m[f][s]?'1':'0');".
            "}".
          "}else{".
            "c+=m[f]?'1':'0';".
          "}".
        "}".
        */
        "c+=';path=/';".PHP_EOL.
        "try{".PHP_EOL.
          // ATG: keep this one as a cookie so the server can access it also
          "document.cookie=c;".PHP_EOL.
          "mc=document.documentElement.className;".PHP_EOL.
          // ATG: try to push mc variable into localStorage, fallback to a cookie if necessary
          "if('localStorage' in window && window['localStorage']!==null){".PHP_EOL.
            // ATG: push <html> classes into localStorage
            "localStorage.setItem('ModernizrClasses',mc);".PHP_EOL.
          "}else{".PHP_EOL.
            // ATG: push <html> classes into mc variable
            "document.cookie='ModernizrClasses='+mc+';path=/';".PHP_EOL.
          "}".PHP_EOL.
          // TODO: maybe can test for successful storage, else append querystring to URL before reloading?  then index.php could also check for that to avoid redirect loop?
          "document.location.reload();".PHP_EOL.
       "}catch(e){}".PHP_EOL.
      "";
    }

    static function _ang($cookie) {
      // ATG: switched to JSON parsing, rather than the manual process.  support is good, except for iOS 3.2... http://caniuse.com/#search=JSON
      //      if you need to support iOS <= 3.2, comment the next line, and uncomment the block immediately after it
      //      you'll also need to comment/uncomment similar sets of code in the PHP function _ang below
      return json_decode($cookie);
      /*
      $modernizr = new Modernizr();
       foreach (explode('|', $cookie) as $feature) {
        list($name, $value) = explode(':', $feature, 2);
        if ($value[0]=='/') {
          $value_object = new stdClass();
          foreach (explode('/', substr($value, 1)) as $sub_feature) {
            list($sub_name, $sub_value) = explode(':', $sub_feature, 2);
            $value_object->$sub_name = $sub_value;
          }
          $modernizr->$name = $value_object;
        } else {
          $modernizr->$name = $value;
        }
      }
      return $modernizr;
      */
    }

  }

  $modernizr = Modernizr::boo();

?>
