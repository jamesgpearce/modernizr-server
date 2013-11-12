<?php

class Modernizr {

    static $modernizr_js = 'modernizr.js';
    static $key = 'Modernizr';

    static function boo() {
        $key = self::$key;
        if (session_start() && isset($_SESSION) && isset($_SESSION[$key])) {
            return $_SESSION[$key];
        } elseif (isset($_COOKIE) && isset($_COOKIE[$key])) {
            $modernizr = self::_ang($_COOKIE[$key]);
            if (isset($_SESSION)) {
                $_SESSION[$key] = $modernizr;
            }
            return $modernizr;
        } else {
            $f = __DIR__ . DIRECTORY_SEPARATOR . self::$modernizr_js;
            if (!file_exists($f)) {
                throw new Exception('Can not find file ' . $f);
            }
            print "<html><head><script type='text/javascript'>";
            readfile($f);
            print self::_mer() . "</script></head><body></body></html>";
            exit;
        }
    }

    static function _mer() {
        return <<<'JAVASCRIPT'

            navigator.standalone = navigator.standalone || (screen.height-document.documentElement.clientHeight<40); // Polyfill for nav.standalone

            var m = Modernizr,
                c = '';
            for (var f in m) {
                if (f[0] == '_') {
                    continue;
                }
                var t = typeof m[f];
                if (t == 'function') {
                    continue;
                }
                c += (c ? '|' : 'Modernizr=') + f + ':';
                if (t == 'object') {
                    for (var s in m[f]) {
                        c += '/' + s + ':' + (m[f][s] ? '1' : '0');
                    }
                } else {
                    c += m[f] ? '1' : '0';
                }
            }
            c += '|devicepixelratio:' + window.devicePixelRatio;
            c += '|screenheight:' + screen.height;
            c += '|screenwidth:' + screen.width;
            c += '|windowheight:' + window.innerHeight;
            c += '|windowwidth:' + window.innerWidth;
            c += '|standalone:' + ((window.navigator.standalone) ? '1' : '0');
            c += ';path=/';
            try {
                document.cookie = c;
                if (document.cookie == '') {
                    document.location = document.location.href + '?NO_COOKIES=1';
                } else {
                    document.location.reload();
                }
            } catch (e) {}

JAVASCRIPT;
    } // Sorry, previous line CAN NOT be indented :(

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

try {
    $modernizr = Modernizr::boo();
} catch(Exception $e) {
    echo $e->getMessage();
    die;
}
