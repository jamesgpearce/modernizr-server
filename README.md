# Modernizr-Server and -Client

[James Pearce](https://github.com/jamesgpearce) did a great job developing his "first
cut" of [Modernizr-Server](https://github.com/jamesgpearce/modernizr-server).  The first
thing you should do if you decide to try-out this project is check-out his work, get to know
what he's doing, and how it works.  This project definitely builds on top of James' work.

`tl;dr`: James' version sends a minimal page to the client browser, runs all the Modernizr
tests you ask it to run, stores the test results in a `cookie`, and refreshes the page.  When
the refreshed page sees the `cookie`, it pushes those values into a server variable that can
be used to decide what mark-up to deliver back to the client for the user to view and use.

This project adds to James' work in the following ways:

1. There are a series of tests that now run to make sure the Modernizr tests _can_
run successfully (make sure the Modernizr JS file is available, whether `cookies` are
available, etc.).  If this process cannot complete successfully, it just delivers the intended
page to the user, avoiding the possible infinite loop that was an issue previously.
1. The Modernizr test results are retained in the client browser (including the
`<html>` classes) so the tests don't have to be run again in the client browser.  This
allows you to also using them as initially intended, to make client-side decisions.
1. An attempt is made to use `localStorage` to store those Modernizr test results, in order
to reduce the `cookie` overhead, falling-back to `cookies` if `localStorage` is _not_ available.

# Demos:

* [Working Demo](http://aarontgrogg.com/testing/modernizr-server/index.php)
* [With `localStorage` forced to __not__ work](http://aarontgrogg.com/testing/modernizr-server/no-localstorage.php)
* [With `cookies` forced to __not__ work](http://aarontgrogg.com/testing/modernizr-server/no-cookies.php)
* [With `localStorage` and `cookies` forced to __not__ work](http://aarontgrogg.com/testing/modernizr-server/no-nuthin.php)


# TODOs:

- should the Modernizr cookie be pushed to a server variable & localStorage,
  to avoid cookies completely??  can that work and stsill avoid infinite looping?
- test if !localStorage
- test if !cookies
- test if !localStorage && !cookies
- test in all worthwhile browsers
- document all results...
