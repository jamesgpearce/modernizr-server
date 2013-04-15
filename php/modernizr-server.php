<?php

class Modernizr {
  
  static $modernizr_js = '../modernizr.js/modernizr.js';
  static $key = 'Modernizr';
  // ATG: adding for <html> classes
  static $keyClasses = 'ModernizrClasses';
  static $modClasses = '';
  
  static function boo() {
    $key = self::$key;
    // ATG: adding for <html> classes
    $keyClasses = self::$keyClasses;
    $modClasses = self::$modClasses;
    if (session_start() && isset($_SESSION) && isset($_SESSION[$key])) {
      // ATG: i was getting a PHP error when retrieving the $_SESSION variable value
      return unserialize($_SESSION[$key]);
      // ATG: adding for <html> classes
      if (isset($_SESSION[$keyClasses])) {
        $modClasses = $_SESSION[$keyClasses];
      }
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
    } else {
      // ATG: had to move <script> into <body>, Modernizr hyphens test was breaking
      print "<html><head></head><body><script type='text/javascript'>";
      readfile(__DIR__ . '/' . self::$modernizr_js);
      print self::_mer() . "</script></body></html>";
      exit;
    }
  }

  static function _mer() {
    return "".
      // ATG: adding mc var to collect <html> classes
      "var m=Modernizr,c='',mc='';".
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
      "c+=';path=/';".
      "try{".
        "document.cookie=c;".
        // ATG: push <html> classes into mc variable
        "mc='ModernizrClasses='+document.documentElement.className+';path=/';".
        // ATG: push mc variable into cookie for later; cookies are yummy...
        "document.cookie=mc;".
        "document.location.reload();".
      "}catch(e){}".
    "";
  }
  
  static function _ang($cookie) {
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
  }
  
}

$modernizr = Modernizr::boo();

?>
