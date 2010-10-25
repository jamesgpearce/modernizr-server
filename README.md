# modernizr-server

[Modernizr](http://modernizr.com) is a great way to find out about your user's
browser capabilities. However, you can only access its API on the browser
itself, which means you can't easily benefit from knowing about browser
capabilities in your server logic.

Progressive enhancement, media queries and body classes are fine for tweaking
sites and their appearance. But for structural changes to sites and pages,
sometimes it's much simpler to just emit the right markup from the server in the
first place.

The modernizr-server library is a way to bring Modernizr browser data to your
server scripting environment. For example, in PHP:

    <?php

        include('modernizr-server.php');
    
        print 'The server knows:';
        foreach($modernizr as $feature=>$value) {
            print "<br/> $feature: "; print_r($value);
        }

    ?>

    The server knows:
    canvas: 1
    canvastext: 1
    geolocation: 1
    crosswindowmessaging: 1
    websqldatabase: 1
    indexeddb: 0
    hashchange: 1
    ...

Exactly the same feature detection is available through this (PHP) API on the
server as is available through the (Javascript) API on the client.

Currently, there is only a PHP implementation of the server-side API, but other
languages would be a breeze. Stay tuned to the project for more.

Also: this is a young project, so please use in high-traffic production
environments with due caution :-)


## How to use it (with PHP)

Download the latest Modernizr script from
[http://modernizr.com](http://modernizr.com) and place it in the `modernizr.js`
directory. Within that directory, the file should also be called `modernizr.js`,
but it can be either the compressed or uncompressed version of the file. (If you
want to put it in a different place, see the note at the bottom of this
section.)

Ideally, the `modernizr-server.php` library should be included at the very start of
your PHP script - or at the very least before any HTML is emitted:

    <?php
        include('modernizr-server.php');
        ...

In any subsequent point of your script, you can use the `$modernizr` object in the
same way that you would have used the `Modernizr` object on the client:

    if ($modernizr->svg) {
        ...
    } elseif ($modernizr->canvas) {
        ...
    }
        
See the Modernizr [documents](www.modernizr.com/docs/) for all of the features
that are tested and available through the API.
        
Some features, (in particular `video`, `audio`, `input`, and `inputtypes`)
have sub-features, so these are available as nested PHP objects:
 
    if ($modernizr->inputtypes->search) {
        print "<input type='search' ...";
    } else {
        print "<input type='text' ...";
    }
    
All features and sub-features are returned as integer `1` or `0` for `true` or
`false`, so they can be used in logical evaluations in PHP.


## Relocating modernizr.js

If you want to place the Modernizr script in a specific place on your server,
you can alter its (relative) path at the top of the `modernizr-server.php` library.
By default this is in a peer folder to the library file:

    static $modernizr_js = '../modernizr.js/modernizr.js';

The Javascript file does *not* have to be in a folder that's directly visible to
a web browser - just one that the `modernizr-server.php` library can read.
Nevertheless, if you are also using Modernizr on the client, you might have a
copy of the script on your web server already, and you can use that.


## How it works

The first time the user accesses a page which includes the modernizr-server.php
library, the library sends the Modernizr script to the client, with a small
script added to the end. Modernizr runs as usual and populates the feature test
results.

The small suffix script then serializes the results into a concise cookie, which
is set on the client using Javascript. It then refreshes the page immediately.

This second time the PHP script is executed, the modernizr-server.php takes the
cookie and instantiates the server-side `$modernizr` object with its contents. If
possible, this is placed in the PHP `$_SESSION` so that it can be quickly accessed
in subsequent requests.

While either of the cookie or session remain active, no further execution of the
Modernizr script will take place. If they both expire, the next request to a
page containing `modernizr-server.php` will cause the browser to rerun the
Modernizr tests again.


## Caveats

This library relies on the browser reloading the page it just visited - to
re-request it with the Modernizr data in a cookie. In theory, if the cookie does
not get set on the client correctly, the refresh could loop indefinitely. I'll
think of some ways to mitigate this.

You are advised to first use modernizr-server.php on a page that is accessed by
the user with a `GET` method. If the first request made is a `POST` (from a form,
for example), the refresh of the page will cause the browser to ask the user if
they want to immediately resubmit the form, which may confuse them.