/* Modernizr 2.6.2 (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-fontface-backgroundsize-borderimage-borderradius-boxshadow-flexbox-flexboxlegacy-hsla-multiplebgs-opacity-rgba-textshadow-cssanimations-csscolumns-generatedcontent-cssgradients-cssreflections-csstransforms-csstransforms3d-csstransitions-applicationcache-canvas-canvastext-draganddrop-hashchange-history-audio-video-indexeddb-input-inputtypes-localstorage-postmessage-sessionstorage-websockets-websqldatabase-webworkers-geolocation-inlinesvg-smil-svg-svgclippaths-touch-webgl-printshiv-mq-cssclasses-addtest-prefixed-teststyles-testprop-testallprops-hasevent-prefixes-domprefixes-a_download-audio_audiodata_api-audio_webaudio_api-battery_api-battery_level-blob_constructor-canvas_todataurl_type-contenteditable-contentsecuritypolicy-contextmenu-cookies-cors-css_backgroundposition_shorthand-css_backgroundposition_xy-css_backgroundrepeat-css_backgroundsizecover-css_boxsizing-css_calc-css_cubicbezierrange-css_displayrunin-css_displaytable-css_filters-css_hyphens-css_lastchild-css_mask-css_mediaqueries-css_objectfit-css_overflow_scrolling-css_pointerevents-css_positionsticky-css_remunit-css_regions-css_resize-css_scrollbars-css_subpixelfont-css_supports-css_userselect-css_vhunit-css_vmaxunit-css_vminunit-css_vwunit-custom_protocol_handler-dataview_api-dom_classlist-dom_createElement_attrs-dom_dataset-dom_microdata-elem_datalist-elem_details-elem_output-elem_progress_meter-elem_ruby-elem_time-elem_track-emoji-es5_strictmode-event_deviceorientation_motion-exif_orientation-file_api-forms_fileinput-forms_formattribute-file_filesystem-forms_placeholder-forms_speechinput-forms_validation-fullscreen_api-gamepad-getusermedia-ie8compat-iframe_sandbox-iframe_seamless-iframe_srcdoc-img_apng-img_webp-json-lists_reversed-mathml-network_connection-network_eventsource-network_xhr2-notification-performance-pointerlock_api-quota_management_api-requestanimationframe-script_async-script_defer-style_scoped-svg_filters-unicode-url_data_uri-userdata-vibration-web_intents-webgl_extensions-websockets_binary-window_framed-workers_blobworkers-workers_dataworkers-workers_sharedworkers-load
 */
;



window.Modernizr = (function( window, document, undefined ) {

    var version = '2.6.2',

    Modernizr = {},

    enableClasses = true,

    docElement = document.documentElement,

    mod = 'modernizr',
    modElem = document.createElement(mod),
    mStyle = modElem.style,

    inputElem  = document.createElement('input')  ,

    smile = ':)',

    toString = {}.toString,

    prefixes = ' -webkit- -moz- -o- -ms- '.split(' '),



    omPrefixes = 'Webkit Moz O ms',

    cssomPrefixes = omPrefixes.split(' '),

    domPrefixes = omPrefixes.toLowerCase().split(' '),

    ns = {'svg': 'http://www.w3.org/2000/svg'},

    tests = {},
    inputs = {},
    attrs = {},

    classes = [],

    slice = classes.slice,

    featureName,


    injectElementWithStyles = function( rule, callback, nodes, testnames ) {

      var style, ret, node, docOverflow,
          div = document.createElement('div'),
                body = document.body,
                fakeBody = body || document.createElement('body');

      if ( parseInt(nodes, 10) ) {
                      while ( nodes-- ) {
              node = document.createElement('div');
              node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
              div.appendChild(node);
          }
      }

                style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
      div.id = mod;
          (body ? div : fakeBody).innerHTML += style;
      fakeBody.appendChild(div);
      if ( !body ) {
                fakeBody.style.background = '';
                fakeBody.style.overflow = 'hidden';
          docOverflow = docElement.style.overflow;
          docElement.style.overflow = 'hidden';
          docElement.appendChild(fakeBody);
      }

      ret = callback(div, rule);
        if ( !body ) {
          fakeBody.parentNode.removeChild(fakeBody);
          docElement.style.overflow = docOverflow;
      } else {
          div.parentNode.removeChild(div);
      }

      return !!ret;

    },

    testMediaQuery = function( mq ) {

      var matchMedia = window.matchMedia || window.msMatchMedia;
      if ( matchMedia ) {
        return matchMedia(mq).matches;
      }

      var bool;

      injectElementWithStyles('@media ' + mq + ' { #' + mod + ' { position: absolute; } }', function( node ) {
        bool = (window.getComputedStyle ?
                  getComputedStyle(node, null) :
                  node.currentStyle)['position'] == 'absolute';
      });

      return bool;

     },


    isEventSupported = (function() {

      var TAGNAMES = {
        'select': 'input', 'change': 'input',
        'submit': 'form', 'reset': 'form',
        'error': 'img', 'load': 'img', 'abort': 'img'
      };

      function isEventSupported( eventName, element ) {

        element = element || document.createElement(TAGNAMES[eventName] || 'div');
        eventName = 'on' + eventName;

            var isSupported = eventName in element;

        if ( !isSupported ) {
                if ( !element.setAttribute ) {
            element = document.createElement('div');
          }
          if ( element.setAttribute && element.removeAttribute ) {
            element.setAttribute(eventName, '');
            isSupported = is(element[eventName], 'function');

                    if ( !is(element[eventName], 'undefined') ) {
              element[eventName] = undefined;
            }
            element.removeAttribute(eventName);
          }
        }

        element = null;
        return isSupported;
      }
      return isEventSupported;
    })(),


    _hasOwnProperty = ({}).hasOwnProperty, hasOwnProp;

    if ( !is(_hasOwnProperty, 'undefined') && !is(_hasOwnProperty.call, 'undefined') ) {
      hasOwnProp = function (object, property) {
        return _hasOwnProperty.call(object, property);
      };
    }
    else {
      hasOwnProp = function (object, property) {
        return ((property in object) && is(object.constructor.prototype[property], 'undefined'));
      };
    }


    if (!Function.prototype.bind) {
      Function.prototype.bind = function bind(that) {

        var target = this;

        if (typeof target != "function") {
            throw new TypeError();
        }

        var args = slice.call(arguments, 1),
            bound = function () {

            if (this instanceof bound) {

              var F = function(){};
              F.prototype = target.prototype;
              var self = new F();

              var result = target.apply(
                  self,
                  args.concat(slice.call(arguments))
              );
              if (Object(result) === result) {
                  return result;
              }
              return self;

            } else {

              return target.apply(
                  that,
                  args.concat(slice.call(arguments))
              );

            }

        };

        return bound;
      };
    }

    function setCss( str ) {
        mStyle.cssText = str;
    }

    function setCssAll( str1, str2 ) {
        return setCss(prefixes.join(str1 + ';') + ( str2 || '' ));
    }

    function is( obj, type ) {
        return typeof obj === type;
    }

    function contains( str, substr ) {
        return !!~('' + str).indexOf(substr);
    }

    function testProps( props, prefixed ) {
        for ( var i in props ) {
            var prop = props[i];
            if ( !contains(prop, "-") && mStyle[prop] !== undefined ) {
                return prefixed == 'pfx' ? prop : true;
            }
        }
        return false;
    }

    function testDOMProps( props, obj, elem ) {
        for ( var i in props ) {
            var item = obj[props[i]];
            if ( item !== undefined) {

                            if (elem === false) return props[i];

                            if (is(item, 'function')){
                                return item.bind(elem || obj);
                }

                            return item;
            }
        }
        return false;
    }

    function testPropsAll( prop, prefixed, elem ) {

        var ucProp  = prop.charAt(0).toUpperCase() + prop.slice(1),
            props   = (prop + ' ' + cssomPrefixes.join(ucProp + ' ') + ucProp).split(' ');

            if(is(prefixed, "string") || is(prefixed, "undefined")) {
          return testProps(props, prefixed);

            } else {
          props = (prop + ' ' + (domPrefixes).join(ucProp + ' ') + ucProp).split(' ');
          return testDOMProps(props, prefixed, elem);
        }
    }    tests['flexbox'] = function() {
      return testPropsAll('flexWrap');
    };


    tests['flexboxlegacy'] = function() {
        return testPropsAll('boxDirection');
    };


    tests['canvas'] = function() {
        var elem = document.createElement('canvas');
        return !!(elem.getContext && elem.getContext('2d'));
    };

    tests['canvastext'] = function() {
        return !!(Modernizr['canvas'] && is(document.createElement('canvas').getContext('2d').fillText, 'function'));
    };



    tests['webgl'] = function() {
        return !!window.WebGLRenderingContext;
    };


    tests['touch'] = function() {
        var bool;

        if(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
          bool = true;
        } else {
          injectElementWithStyles(['@media (',prefixes.join('touch-enabled),('),mod,')','{#modernizr{top:9px;position:absolute}}'].join(''), function( node ) {
            bool = node.offsetTop === 9;
          });
        }

        return bool;
    };



    tests['geolocation'] = function() {
        return 'geolocation' in navigator;
    };


    tests['postmessage'] = function() {
      return !!window.postMessage;
    };


    tests['websqldatabase'] = function() {
      return !!window.openDatabase;
    };

    tests['indexedDB'] = function() {
      return !!testPropsAll("indexedDB", window);
    };

    tests['hashchange'] = function() {
      return isEventSupported('hashchange', window) && (document.documentMode === undefined || document.documentMode > 7);
    };

    tests['history'] = function() {
      return !!(window.history && history.pushState);
    };

    tests['draganddrop'] = function() {
        var div = document.createElement('div');
        return ('draggable' in div) || ('ondragstart' in div && 'ondrop' in div);
    };

    tests['websockets'] = function() {
        return 'WebSocket' in window || 'MozWebSocket' in window;
    };


    tests['rgba'] = function() {
        setCss('background-color:rgba(150,255,150,.5)');

        return contains(mStyle.backgroundColor, 'rgba');
    };

    tests['hsla'] = function() {
            setCss('background-color:hsla(120,40%,100%,.5)');

        return contains(mStyle.backgroundColor, 'rgba') || contains(mStyle.backgroundColor, 'hsla');
    };

    tests['multiplebgs'] = function() {
                setCss('background:url(https://),url(https://),red url(https://)');

            return (/(url\s*\(.*?){3}/).test(mStyle.background);
    };    tests['backgroundsize'] = function() {
        return testPropsAll('backgroundSize');
    };

    tests['borderimage'] = function() {
        return testPropsAll('borderImage');
    };



    tests['borderradius'] = function() {
        return testPropsAll('borderRadius');
    };

    tests['boxshadow'] = function() {
        return testPropsAll('boxShadow');
    };

    tests['textshadow'] = function() {
        return document.createElement('div').style.textShadow === '';
    };


    tests['opacity'] = function() {
                setCssAll('opacity:.55');

                    return (/^0.55$/).test(mStyle.opacity);
    };


    tests['cssanimations'] = function() {
        return testPropsAll('animationName');
    };


    tests['csscolumns'] = function() {
        return testPropsAll('columnCount');
    };


    tests['cssgradients'] = function() {
        var str1 = 'background-image:',
            str2 = 'gradient(linear,left top,right bottom,from(#9f9),to(white));',
            str3 = 'linear-gradient(left top,#9f9, white);';

        setCss(
                       (str1 + '-webkit- '.split(' ').join(str2 + str1) +
                       prefixes.join(str3 + str1)).slice(0, -str1.length)
        );

        return contains(mStyle.backgroundImage, 'gradient');
    };


    tests['cssreflections'] = function() {
        return testPropsAll('boxReflect');
    };


    tests['csstransforms'] = function() {
        return !!testPropsAll('transform');
    };


    tests['csstransforms3d'] = function() {

        var ret = !!testPropsAll('perspective');

                        if ( ret && 'webkitPerspective' in docElement.style ) {

                      injectElementWithStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
            ret = node.offsetLeft === 9 && node.offsetHeight === 3;
          });
        }
        return ret;
    };


    tests['csstransitions'] = function() {
        return testPropsAll('transition');
    };



    tests['fontface'] = function() {
        var bool;

        injectElementWithStyles('@font-face {font-family:"font";src:url("https://")}', function( node, rule ) {
          var style = document.getElementById('smodernizr'),
              sheet = style.sheet || style.styleSheet,
              cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : '';

          bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0;
        });

        return bool;
    };

    tests['generatedcontent'] = function() {
        var bool;

        injectElementWithStyles(['#',mod,'{font:0/0 a}#',mod,':after{content:"',smile,'";visibility:hidden;font:3px/1 a}'].join(''), function( node ) {
          bool = node.offsetHeight >= 3;
        });

        return bool;
    };
    tests['video'] = function() {
        var elem = document.createElement('video'),
            bool = false;

            try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('video/ogg; codecs="theora"')      .replace(/^no$/,'');

                            bool.h264 = elem.canPlayType('video/mp4; codecs="avc1.42E01E"') .replace(/^no$/,'');

                bool.webm = elem.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/,'');
            }

        } catch(e) { }

        return bool;
    };

    tests['audio'] = function() {
        var elem = document.createElement('audio'),
            bool = false;

        try {
            if ( bool = !!elem.canPlayType ) {
                bool      = new Boolean(bool);
                bool.ogg  = elem.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,'');
                bool.mp3  = elem.canPlayType('audio/mpeg;')               .replace(/^no$/,'');

                                                    bool.wav  = elem.canPlayType('audio/wav; codecs="1"')     .replace(/^no$/,'');
                bool.m4a  = ( elem.canPlayType('audio/x-m4a;')            ||
                              elem.canPlayType('audio/aac;'))             .replace(/^no$/,'');
            }
        } catch(e) { }

        return bool;
    };


    tests['localstorage'] = function() {
        try {
            localStorage.setItem(mod, mod);
            localStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };

    tests['sessionstorage'] = function() {
        try {
            sessionStorage.setItem(mod, mod);
            sessionStorage.removeItem(mod);
            return true;
        } catch(e) {
            return false;
        }
    };


    tests['webworkers'] = function() {
        return !!window.Worker;
    };


    tests['applicationcache'] = function() {
        return !!window.applicationCache;
    };


    tests['svg'] = function() {
        return !!document.createElementNS && !!document.createElementNS(ns.svg, 'svg').createSVGRect;
    };

    tests['inlinesvg'] = function() {
      var div = document.createElement('div');
      div.innerHTML = '<svg/>';
      return (div.firstChild && div.firstChild.namespaceURI) == ns.svg;
    };

    tests['smil'] = function() {
        return !!document.createElementNS && /SVGAnimate/.test(toString.call(document.createElementNS(ns.svg, 'animate')));
    };


    tests['svgclippaths'] = function() {
        return !!document.createElementNS && /SVGClipPath/.test(toString.call(document.createElementNS(ns.svg, 'clipPath')));
    };

    function webforms() {
                                            Modernizr['input'] = (function( props ) {
            for ( var i = 0, len = props.length; i < len; i++ ) {
                attrs[ props[i] ] = !!(props[i] in inputElem);
            }
            if (attrs.list){
                                  attrs.list = !!(document.createElement('datalist') && window.HTMLDataListElement);
            }
            return attrs;
        })('autocomplete autofocus list placeholder max min multiple pattern required step'.split(' '));
                            Modernizr['inputtypes'] = (function(props) {

            for ( var i = 0, bool, inputElemType, defaultView, len = props.length; i < len; i++ ) {

                inputElem.setAttribute('type', inputElemType = props[i]);
                bool = inputElem.type !== 'text';

                                                    if ( bool ) {

                    inputElem.value         = smile;
                    inputElem.style.cssText = 'position:absolute;visibility:hidden;';

                    if ( /^range$/.test(inputElemType) && inputElem.style.WebkitAppearance !== undefined ) {

                      docElement.appendChild(inputElem);
                      defaultView = document.defaultView;

                                        bool =  defaultView.getComputedStyle &&
                              defaultView.getComputedStyle(inputElem, null).WebkitAppearance !== 'textfield' &&
                                                                                  (inputElem.offsetHeight !== 0);

                      docElement.removeChild(inputElem);

                    } else if ( /^(search|tel)$/.test(inputElemType) ){
                                                                                    } else if ( /^(url|email)$/.test(inputElemType) ) {
                                        bool = inputElem.checkValidity && inputElem.checkValidity() === false;

                    } else {
                                        bool = inputElem.value != smile;
                    }
                }

                inputs[ props[i] ] = !!bool;
            }
            return inputs;
        })('search tel url email datetime date month week time datetime-local number range color'.split(' '));
        }
    for ( var feature in tests ) {
        if ( hasOwnProp(tests, feature) ) {
                                    featureName  = feature.toLowerCase();
            Modernizr[featureName] = tests[feature]();

            classes.push((Modernizr[featureName] ? '' : 'no-') + featureName);
        }
    }

    Modernizr.input || webforms();


     Modernizr.addTest = function ( feature, test ) {
       if ( typeof feature == 'object' ) {
         for ( var key in feature ) {
           if ( hasOwnProp( feature, key ) ) {
             Modernizr.addTest( key, feature[ key ] );
           }
         }
       } else {

         feature = feature.toLowerCase();

         if ( Modernizr[feature] !== undefined ) {
                                              return Modernizr;
         }

         test = typeof test == 'function' ? test() : test;

         if (typeof enableClasses !== "undefined" && enableClasses) {
           docElement.className += ' ' + (test ? '' : 'no-') + feature;
         }
         Modernizr[feature] = test;

       }

       return Modernizr;
     };


    setCss('');
    modElem = inputElem = null;


    Modernizr._version      = version;

    Modernizr._prefixes     = prefixes;
    Modernizr._domPrefixes  = domPrefixes;
    Modernizr._cssomPrefixes  = cssomPrefixes;

    Modernizr.mq            = testMediaQuery;

    Modernizr.hasEvent      = isEventSupported;

    Modernizr.testProp      = function(prop){
        return testProps([prop]);
    };

    Modernizr.testAllProps  = testPropsAll;


    Modernizr.testStyles    = injectElementWithStyles;
    Modernizr.prefixed      = function(prop, obj, elem){
      if(!obj) {
        return testPropsAll(prop, 'pfx');
      } else {
            return testPropsAll(prop, obj, elem);
      }
    };


    docElement.className = docElement.className.replace(/(^|\s)no-js(\s|$)/, '$1$2') +

                                                    (enableClasses ? ' js ' + classes.join(' ') : '');

    return Modernizr;

})(this, this.document);
/*! HTML5 Shiv v3.6 | @afarkas @jdalton @jon_neal @rem | MIT/GPL2 Licensed */
;(function(window, document) {
/*jshint evil:true */
  /** Preset options */
  var options = window.html5 || {};

  /** Used to skip problem elements */
  var reSkip = /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i;

  /** Not all elements can be cloned in IE (this list can be shortend) **/
  var saveClones = /^<|^(?:a|b|button|code|div|fieldset|form|h1|h2|h3|h4|h5|h6|i|iframe|img|input|label|li|link|ol|option|p|param|q|script|select|span|strong|style|table|tbody|td|textarea|tfoot|th|thead|tr|ul)$/i;

  /** Detect whether the browser supports default html5 styles */
  var supportsHtml5Styles;

  /** Name of the expando, to work with multiple documents or to re-shiv one document */
  var expando = '_html5shiv';

  /** The id for the the documents expando */
  var expanID = 0;

  /** Cached data for each document */
  var expandoData = {};

  /** Detect whether the browser supports unknown elements */
  var supportsUnknownElements;

  (function() {
    try {
        var a = document.createElement('a');
        a.innerHTML = '<xyz></xyz>';
        //if the hidden property is implemented we can assume, that the browser supports basic HTML5 Styles
        supportsHtml5Styles = ('hidden' in a);

        supportsUnknownElements = a.childNodes.length == 1 || (function() {
          // assign a false positive if unable to shiv
          (document.createElement)('a');
          var frag = document.createDocumentFragment();
          return (
            typeof frag.cloneNode == 'undefined' ||
            typeof frag.createDocumentFragment == 'undefined' ||
            typeof frag.createElement == 'undefined'
          );
        }());
    } catch(e) {
      supportsHtml5Styles = true;
      supportsUnknownElements = true;
    }

  }());

  /*--------------------------------------------------------------------------*/

  /**
   * Creates a style sheet with the given CSS text and adds it to the document.
   * @private
   * @param {Document} ownerDocument The document.
   * @param {String} cssText The CSS text.
   * @returns {StyleSheet} The style element.
   */
  function addStyleSheet(ownerDocument, cssText) {
    var p = ownerDocument.createElement('p'),
        parent = ownerDocument.getElementsByTagName('head')[0] || ownerDocument.documentElement;

    p.innerHTML = 'x<style>' + cssText + '</style>';
    return parent.insertBefore(p.lastChild, parent.firstChild);
  }

  /**
   * Returns the value of `html5.elements` as an array.
   * @private
   * @returns {Array} An array of shived element node names.
   */
  function getElements() {
    var elements = html5.elements;
    return typeof elements == 'string' ? elements.split(' ') : elements;
  }

    /**
   * Returns the data associated to the given document
   * @private
   * @param {Document} ownerDocument The document.
   * @returns {Object} An object of data.
   */
  function getExpandoData(ownerDocument) {
    var data = expandoData[ownerDocument[expando]];
    if (!data) {
        data = {};
        expanID++;
        ownerDocument[expando] = expanID;
        expandoData[expanID] = data;
    }
    return data;
  }

  /**
   * returns a shived element for the given nodeName and document
   * @memberOf html5
   * @param {String} nodeName name of the element
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived element.
   */
  function createElement(nodeName, ownerDocument, data){
    if (!ownerDocument) {
        ownerDocument = document;
    }
    if(supportsUnknownElements){
        return ownerDocument.createElement(nodeName);
    }
    if (!data) {
        data = getExpandoData(ownerDocument);
    }
    var node;

    if (data.cache[nodeName]) {
        node = data.cache[nodeName].cloneNode();
    } else if (saveClones.test(nodeName)) {
        node = (data.cache[nodeName] = data.createElem(nodeName)).cloneNode();
    } else {
        node = data.createElem(nodeName);
    }

    // Avoid adding some elements to fragments in IE < 9 because
    // * Attributes like `name` or `type` cannot be set/changed once an element
    //   is inserted into a document/fragment
    // * Link elements with `src` attributes that are inaccessible, as with
    //   a 403 response, will cause the tab/window to crash
    // * Script elements appended to fragments will execute when their `src`
    //   or `text` property is set
    return node.canHaveChildren && !reSkip.test(nodeName) ? data.frag.appendChild(node) : node;
  }

  /**
   * returns a shived DocumentFragment for the given document
   * @memberOf html5
   * @param {Document} ownerDocument The context document.
   * @returns {Object} The shived DocumentFragment.
   */
  function createDocumentFragment(ownerDocument, data){
    if (!ownerDocument) {
        ownerDocument = document;
    }
    if(supportsUnknownElements){
        return ownerDocument.createDocumentFragment();
    }
    data = data || getExpandoData(ownerDocument);
    var clone = data.frag.cloneNode(),
        i = 0,
        elems = getElements(),
        l = elems.length;
    for(;i<l;i++){
        clone.createElement(elems[i]);
    }
    return clone;
  }

  /**
   * Shivs the `createElement` and `createDocumentFragment` methods of the document.
   * @private
   * @param {Document|DocumentFragment} ownerDocument The document.
   * @param {Object} data of the document.
   */
  function shivMethods(ownerDocument, data) {
    if (!data.cache) {
        data.cache = {};
        data.createElem = ownerDocument.createElement;
        data.createFrag = ownerDocument.createDocumentFragment;
        data.frag = data.createFrag();
    }


    ownerDocument.createElement = function(nodeName) {
      //abort shiv
      if (!html5.shivMethods) {
          return data.createElem(nodeName);
      }
      return createElement(nodeName, ownerDocument, data);
    };

    ownerDocument.createDocumentFragment = Function('h,f', 'return function(){' +
      'var n=f.cloneNode(),c=n.createElement;' +
      'h.shivMethods&&(' +
        // unroll the `createElement` calls
        getElements().join().replace(/\w+/g, function(nodeName) {
          data.createElem(nodeName);
          data.frag.createElement(nodeName);
          return 'c("' + nodeName + '")';
        }) +
      ');return n}'
    )(html5, data.frag);
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Shivs the given document.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
  function shivDocument(ownerDocument) {
    if (!ownerDocument) {
        ownerDocument = document;
    }
    var data = getExpandoData(ownerDocument);

    if (html5.shivCSS && !supportsHtml5Styles && !data.hasCSS) {
      data.hasCSS = !!addStyleSheet(ownerDocument,
        // corrects block display not defined in IE6/7/8/9
        'article,aside,figcaption,figure,footer,header,hgroup,nav,section{display:block}' +
        // adds styling not present in IE6/7/8/9
        'mark{background:#FF0;color:#000}'
      );
    }
    if (!supportsUnknownElements) {
      shivMethods(ownerDocument, data);
    }
    return ownerDocument;
  }

  /*--------------------------------------------------------------------------*/

  /**
   * The `html5` object is exposed so that more elements can be shived and
   * existing shiving can be detected on iframes.
   * @type Object
   * @example
   *
   * // options can be changed before the script is included
   * html5 = { 'elements': 'mark section', 'shivCSS': false, 'shivMethods': false };
   */
  var html5 = {

    /**
     * An array or space separated string of node names of the elements to shiv.
     * @memberOf html5
     * @type Array|String
     */
    'elements': options.elements || 'abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video',

    /**
     * A flag to indicate that the HTML5 style sheet should be inserted.
     * @memberOf html5
     * @type Boolean
     */
    'shivCSS': (options.shivCSS !== false),

    /**
     * Is equal to true if a browser supports creating unknown/HTML5 elements
     * @memberOf html5
     * @type boolean
     */
    'supportsUnknownElements': supportsUnknownElements,

    /**
     * A flag to indicate that the document's `createElement` and `createDocumentFragment`
     * methods should be overwritten.
     * @memberOf html5
     * @type Boolean
     */
    'shivMethods': (options.shivMethods !== false),

    /**
     * A string to describe the type of `html5` object ("default" or "default print").
     * @memberOf html5
     * @type String
     */
    'type': 'default',

    // shivs the document according to the specified `html5` object options
    'shivDocument': shivDocument,

    //creates a shived element
    createElement: createElement,

    //creates a shived documentFragment
    createDocumentFragment: createDocumentFragment
  };

  /*--------------------------------------------------------------------------*/

  // expose html5
  window.html5 = html5;

  // shiv the document
  shivDocument(document);

  /*------------------------------- Print Shiv -------------------------------*/

  /** Used to filter media types */
  var reMedia = /^$|\b(?:all|print)\b/;

  /** Used to namespace printable elements */
  var shivNamespace = 'html5shiv';

  /** Detect whether the browser supports shivable style sheets */
  var supportsShivableSheets = !supportsUnknownElements && (function() {
    // assign a false negative if unable to shiv
    var docEl = document.documentElement;
    return !(
      typeof document.namespaces == 'undefined' ||
      typeof document.parentWindow == 'undefined' ||
      typeof docEl.applyElement == 'undefined' ||
      typeof docEl.removeNode == 'undefined' ||
      typeof window.attachEvent == 'undefined'
    );
  }());

  /*--------------------------------------------------------------------------*/

  /**
   * Wraps all HTML5 elements in the given document with printable elements.
   * (eg. the "header" element is wrapped with the "html5shiv:header" element)
   * @private
   * @param {Document} ownerDocument The document.
   * @returns {Array} An array wrappers added.
   */
  function addWrappers(ownerDocument) {
    var node,
        nodes = ownerDocument.getElementsByTagName('*'),
        index = nodes.length,
        reElements = RegExp('^(?:' + getElements().join('|') + ')$', 'i'),
        result = [];

    while (index--) {
      node = nodes[index];
      if (reElements.test(node.nodeName)) {
        result.push(node.applyElement(createWrapper(node)));
      }
    }
    return result;
  }

  /**
   * Creates a printable wrapper for the given element.
   * @private
   * @param {Element} element The element.
   * @returns {Element} The wrapper.
   */
  function createWrapper(element) {
    var node,
        nodes = element.attributes,
        index = nodes.length,
        wrapper = element.ownerDocument.createElement(shivNamespace + ':' + element.nodeName);

    // copy element attributes to the wrapper
    while (index--) {
      node = nodes[index];
      node.specified && wrapper.setAttribute(node.nodeName, node.nodeValue);
    }
    // copy element styles to the wrapper
    wrapper.style.cssText = element.style.cssText;
    return wrapper;
  }

  /**
   * Shivs the given CSS text.
   * (eg. header{} becomes html5shiv\:header{})
   * @private
   * @param {String} cssText The CSS text to shiv.
   * @returns {String} The shived CSS text.
   */
  function shivCssText(cssText) {
    var pair,
        parts = cssText.split('{'),
        index = parts.length,
        reElements = RegExp('(^|[\\s,>+~])(' + getElements().join('|') + ')(?=[[\\s,>+~#.:]|$)', 'gi'),
        replacement = '$1' + shivNamespace + '\\:$2';

    while (index--) {
      pair = parts[index] = parts[index].split('}');
      pair[pair.length - 1] = pair[pair.length - 1].replace(reElements, replacement);
      parts[index] = pair.join('}');
    }
    return parts.join('{');
  }

  /**
   * Removes the given wrappers, leaving the original elements.
   * @private
   * @params {Array} wrappers An array of printable wrappers.
   */
  function removeWrappers(wrappers) {
    var index = wrappers.length;
    while (index--) {
      wrappers[index].removeNode();
    }
  }

  /*--------------------------------------------------------------------------*/

  /**
   * Shivs the given document for print.
   * @memberOf html5
   * @param {Document} ownerDocument The document to shiv.
   * @returns {Document} The shived document.
   */
  function shivPrint(ownerDocument) {
    var shivedSheet,
        wrappers,
        data = getExpandoData(ownerDocument),
        namespaces = ownerDocument.namespaces,
        ownerWindow = ownerDocument.parentWindow;

    if (!supportsShivableSheets || ownerDocument.printShived) {
      return ownerDocument;
    }
    if (typeof namespaces[shivNamespace] == 'undefined') {
      namespaces.add(shivNamespace);
    }

    function removeSheet() {
      clearTimeout(data._removeSheetTimer);
      if (shivedSheet) {
          shivedSheet.removeNode(true);
      }
      shivedSheet= null;
    }

    ownerWindow.attachEvent('onbeforeprint', function() {

      removeSheet();

      var imports,
          length,
          sheet,
          collection = ownerDocument.styleSheets,
          cssText = [],
          index = collection.length,
          sheets = Array(index);

      // convert styleSheets collection to an array
      while (index--) {
        sheets[index] = collection[index];
      }
      // concat all style sheet CSS text
      while ((sheet = sheets.pop())) {
        // IE does not enforce a same origin policy for external style sheets...
        // but has trouble with some dynamically created stylesheets
        if (!sheet.disabled && reMedia.test(sheet.media)) {

          try {
            imports = sheet.imports;
            length = imports.length;
          } catch(er){
            length = 0;
          }

          for (index = 0; index < length; index++) {
            sheets.push(imports[index]);
          }

          try {
            cssText.push(sheet.cssText);
          } catch(er){}
        }
      }

      // wrap all HTML5 elements with printable elements and add the shived style sheet
      cssText = shivCssText(cssText.reverse().join(''));
      wrappers = addWrappers(ownerDocument);
      shivedSheet = addStyleSheet(ownerDocument, cssText);

    });

    ownerWindow.attachEvent('onafterprint', function() {
      // remove wrappers, leaving the original elements, and remove the shived style sheet
      removeWrappers(wrappers);
      clearTimeout(data._removeSheetTimer);
      data._removeSheetTimer = setTimeout(removeSheet, 500);
    });

    ownerDocument.printShived = true;
    return ownerDocument;
  }

  /*--------------------------------------------------------------------------*/

  // expose API
  html5.type += ' print';
  html5.shivPrint = shivPrint;

  // shiv for print
  shivPrint(document);

}(this, document));/*yepnope1.5.4|WTFPL*/
(function(a,b,c){function d(a){return"[object Function]"==o.call(a)}function e(a){return"string"==typeof a}function f(){}function g(a){return!a||"loaded"==a||"complete"==a||"uninitialized"==a}function h(){var a=p.shift();q=1,a?a.t?m(function(){("c"==a.t?B.injectCss:B.injectJs)(a.s,0,a.a,a.x,a.e,1)},0):(a(),h()):q=0}function i(a,c,d,e,f,i,j){function k(b){if(!o&&g(l.readyState)&&(u.r=o=1,!q&&h(),l.onload=l.onreadystatechange=null,b)){"img"!=a&&m(function(){t.removeChild(l)},50);for(var d in y[c])y[c].hasOwnProperty(d)&&y[c][d].onload()}}var j=j||B.errorTimeout,l=b.createElement(a),o=0,r=0,u={t:d,s:c,e:f,a:i,x:j};1===y[c]&&(r=1,y[c]=[]),"object"==a?l.data=c:(l.src=c,l.type=a),l.width=l.height="0",l.onerror=l.onload=l.onreadystatechange=function(){k.call(this,r)},p.splice(e,0,u),"img"!=a&&(r||2===y[c]?(t.insertBefore(l,s?null:n),m(k,j)):y[c].push(l))}function j(a,b,c,d,f){return q=0,b=b||"j",e(a)?i("c"==b?v:u,a,b,this.i++,c,d,f):(p.splice(this.i++,0,a),1==p.length&&h()),this}function k(){var a=B;return a.loader={load:j,i:0},a}var l=b.documentElement,m=a.setTimeout,n=b.getElementsByTagName("script")[0],o={}.toString,p=[],q=0,r="MozAppearance"in l.style,s=r&&!!b.createRange().compareNode,t=s?l:n.parentNode,l=a.opera&&"[object Opera]"==o.call(a.opera),l=!!b.attachEvent&&!l,u=r?"object":l?"script":"img",v=l?"script":u,w=Array.isArray||function(a){return"[object Array]"==o.call(a)},x=[],y={},z={timeout:function(a,b){return b.length&&(a.timeout=b[0]),a}},A,B;B=function(a){function b(a){var a=a.split("!"),b=x.length,c=a.pop(),d=a.length,c={url:c,origUrl:c,prefixes:a},e,f,g;for(f=0;f<d;f++)g=a[f].split("="),(e=z[g.shift()])&&(c=e(c,g));for(f=0;f<b;f++)c=x[f](c);return c}function g(a,e,f,g,h){var i=b(a),j=i.autoCallback;i.url.split(".").pop().split("?").shift(),i.bypass||(e&&(e=d(e)?e:e[a]||e[g]||e[a.split("/").pop().split("?")[0]]),i.instead?i.instead(a,e,f,g,h):(y[i.url]?i.noexec=!0:y[i.url]=1,f.load(i.url,i.forceCSS||!i.forceJS&&"css"==i.url.split(".").pop().split("?").shift()?"c":c,i.noexec,i.attrs,i.timeout),(d(e)||d(j))&&f.load(function(){k(),e&&e(i.origUrl,h,g),j&&j(i.origUrl,h,g),y[i.url]=2})))}function h(a,b){function c(a,c){if(a){if(e(a))c||(j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}),g(a,j,b,0,h);else if(Object(a)===a)for(n in m=function(){var b=0,c;for(c in a)a.hasOwnProperty(c)&&b++;return b}(),a)a.hasOwnProperty(n)&&(!c&&!--m&&(d(j)?j=function(){var a=[].slice.call(arguments);k.apply(this,a),l()}:j[n]=function(a){return function(){var b=[].slice.call(arguments);a&&a.apply(this,b),l()}}(k[n])),g(a[n],j,b,n,h))}else!c&&l()}var h=!!a.test,i=a.load||a.both,j=a.callback||f,k=j,l=a.complete||f,m,n;c(h?a.yep:a.nope,!!i),i&&c(i)}var i,j,l=this.yepnope.loader;if(e(a))g(a,0,l,0);else if(w(a))for(i=0;i<a.length;i++)j=a[i],e(j)?g(j,0,l,0):w(j)?B(j):Object(j)===j&&h(j,l);else Object(a)===a&&h(a,l)},B.addPrefix=function(a,b){z[a]=b},B.addFilter=function(a){x.push(a)},B.errorTimeout=1e4,null==b.readyState&&b.addEventListener&&(b.readyState="loading",b.addEventListener("DOMContentLoaded",A=function(){b.removeEventListener("DOMContentLoaded",A,0),b.readyState="complete"},0)),a.yepnope=k(),a.yepnope.executeStack=h,a.yepnope.injectJs=function(a,c,d,e,i,j){var k=b.createElement("script"),l,o,e=e||B.errorTimeout;k.src=a;for(o in d)k.setAttribute(o,d[o]);c=j?h:c||f,k.onreadystatechange=k.onload=function(){!l&&g(k.readyState)&&(l=1,c(),k.onload=k.onreadystatechange=null)},m(function(){l||(l=1,c(1))},e),i?k.onload():n.parentNode.insertBefore(k,n)},a.yepnope.injectCss=function(a,c,d,e,g,i){var e=b.createElement("link"),j,c=i?h:c||f;e.href=a,e.rel="stylesheet",e.type="text/css";for(j in d)e.setAttribute(j,d[j]);g||(n.parentNode.insertBefore(e,n),m(c,0))}})(this,document);
Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0));};

// a[download] attribute
// When used on an <a>, this attribute signifies that the resource it
// points to should be downloaded by the browser rather than navigating to it.
// http://developers.whatwg.org/links.html#downloading-resources
// By Addy Osmani

Modernizr.addTest('adownload', 'download' in document.createElement('a'));
// Mozilla Audio Data API
// https://wiki.mozilla.org/Audio_Data_API
// by Addy Osmani
Modernizr.addTest('audiodata', !!(window.Audio));
// Web Audio API
// https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html
// By Addy Osmani
Modernizr.addTest('webaudio', !!(window.webkitAudioContext || window.AudioContext));

// Battery API
// https://developer.mozilla.org/en/DOM/window.navigator.mozBattery
// By: Paul Sayre

Modernizr.addTest('battery',
	!!Modernizr.prefixed('battery', navigator)
);
// Low Battery Level
// Enable a developer to remove CPU intensive CSS/JS when battery is low
// developer.mozilla.org/en/DOM/window.navigator.mozBattery
// By: Paul Sayre

Modernizr.addTest('lowbattery', function () {
	var minLevel = 0.20,
		battery = Modernizr.prefixed('battery', navigator);
	return !!(battery && !battery.charging && battery.level <= minLevel);
});
// Blob constructor
// http://dev.w3.org/2006/webapi/FileAPI/#constructorBlob

Modernizr.addTest('blobconstructor', function () {
    try {
        return !!new Blob();
    } catch (e) {
        return false;
    }
});
// canvas.toDataURL type support
// http://www.w3.org/TR/html5/the-canvas-element.html#dom-canvas-todataurl

// This test is asynchronous. Watch out.

(function () {

    if (!Modernizr.canvas) {
        return false;
    }

    var image = new Image(),
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');

    image.onload = function() {
        ctx.drawImage(image, 0, 0);

        Modernizr.addTest('todataurljpeg', function() {
            return canvas.toDataURL('image/jpeg').indexOf('data:image/jpeg') === 0;
        });
        Modernizr.addTest('todataurlwebp', function() {
            return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        });
    };

    image.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==';
}());
// contentEditable
// http://www.whatwg.org/specs/web-apps/current-work/multipage/editing.html#contenteditable

// this is known to false positive in some mobile browsers
// here is a whitelist of verified working browsers:
// https://github.com/NielsLeenheer/html5test/blob/549f6eac866aa861d9649a0707ff2c0157895706/scripts/engine.js#L2083

Modernizr.addTest('contenteditable',
        'contentEditable' in document.documentElement);
// http://www.w3.org/TR/html5/interactive-elements.html#context-menus
// Demo at http://thewebrocks.com/demos/context-menu/
Modernizr.addTest(
  'contextmenu',
  ('contextMenu' in document.documentElement && 'HTMLMenuItemElement' in window)
);





// Test for (experimental) Content Security Policy 1.1 support.
//
// This feature is still quite experimental, but is available now in Chrome 22.
// If the `SecurityPolicy` property is available, you can be sure the browser
// supports CSP. If it's not available, the browser still might support an
// earlier version of the CSP spec.
//
// Editor's Draft: https://dvcs.w3.org/hg/content-security-policy/raw-file/tip/csp-specification.dev.html

Modernizr.addTest('contentsecuritypolicy', 'SecurityPolicy' in document);

// by tauren
// https://github.com/Modernizr/Modernizr/issues/191

Modernizr.addTest('cookies', function () {
  // Quick test if browser has cookieEnabled host property
  if (navigator.cookieEnabled) return true;
  // Create cookie
  document.cookie = "cookietest=1";
  var ret = document.cookie.indexOf("cookietest=") != -1;
  // Delete cookie
  document.cookie = "cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT";
  return ret;
});

// cors
// By Theodoor van Donge
Modernizr.addTest('cors', !!(window.XMLHttpRequest && 'withCredentials' in new XMLHttpRequest()));/*
    https://developer.mozilla.org/en/CSS/background-position
    http://www.w3.org/TR/css3-background/#background-position

    Example: http://jsfiddle.net/Blink/bBXvt/
*/

(function() {

    var elem = document.createElement('a'),
        eStyle = elem.style,
        val = "right 10px bottom 10px";

    Modernizr.addTest('bgpositionshorthand', function(){
        eStyle.cssText = "background-position: " + val + ";";
        return (eStyle.backgroundPosition === val);
    });

}());
/*
	Allan Lei https://github.com/allanlei

	Check adapted from https://github.com/brandonaaron/jquery-cssHooks/blob/master/bgpos.js

	Test: http://jsfiddle.net/allanlei/R8AYS/
*/
Modernizr.addTest('bgpositionxy', function() {
    return Modernizr.testStyles('#modernizr {background-position: 3px 5px;}', function(elem) {
        var cssStyleDeclaration = window.getComputedStyle ? getComputedStyle(elem, null) : elem.currentStyle;
        var xSupport = (cssStyleDeclaration.backgroundPositionX == '3px') || (cssStyleDeclaration['background-position-x'] == '3px');
        var ySupport = (cssStyleDeclaration.backgroundPositionY == '5px') || (cssStyleDeclaration['background-position-y'] == '5px');
        return xSupport && ySupport;
    });
});// developer.mozilla.org/en/CSS/background-repeat

// test page: jsbin.com/uzesun/
// http://jsfiddle.net/ryanseddon/yMLTQ/6/

(function(){


function getBgRepeatValue(elem){
    return (window.getComputedStyle ?
             getComputedStyle(elem, null).getPropertyValue('background') :
             elem.currentStyle['background']);
}


Modernizr.testStyles(' #modernizr { background-repeat: round; } ', function(elem, rule){

  Modernizr.addTest('bgrepeatround', getBgRepeatValue(elem) == 'round');

});



Modernizr.testStyles(' #modernizr { background-repeat: space; } ', function(elem, rule){

  Modernizr.addTest('bgrepeatspace', getBgRepeatValue(elem) == 'space');

});


})();

// developer.mozilla.org/en/CSS/background-size

Modernizr.testStyles( '#modernizr{background-size:cover}', function( elem ) {
	var style = window.getComputedStyle ?
		window.getComputedStyle( elem, null )
		: elem.currentStyle;

	Modernizr.addTest( 'bgsizecover', style.backgroundSize == 'cover' );
});
// developer.mozilla.org/en/CSS/box-sizing
// github.com/Modernizr/Modernizr/issues/248

Modernizr.addTest("boxsizing",function(){
    return Modernizr.testAllProps("boxSizing") && (document.documentMode === undefined || document.documentMode > 7);
});


// Method of allowing calculated values for length units, i.e. width: calc(100%-3em) http://caniuse.com/#search=calc
// By @calvein

Modernizr.addTest('csscalc', function() {
    var prop = 'width:';
    var value = 'calc(10px);';
    var el = document.createElement('div');

    el.style.cssText = prop + Modernizr._prefixes.join(value + prop);

    return !!el.style.length;
});

// by alanhogan

// https://github.com/Modernizr/Modernizr/issues/198
// http://css-tricks.com/596-run-in/



Modernizr.testStyles(' #modernizr { display: run-in; } ', function(elem, rule){

  var ret = (window.getComputedStyle ?
         getComputedStyle(elem, null).getPropertyValue('display') :
         elem.currentStyle['display']);

  Modernizr.addTest('display-runin', ret == 'run-in');

});

// display: table and table-cell test. (both are tested under one name "table-cell" )
// By @scottjehl

// all additional table display values are here: http://pastebin.com/Gk9PeVaQ though Scott has seen some IE false positives with that sort of weak detection.
// more testing neccessary perhaps.

Modernizr.addTest( "display-table",function(){

  var doc   = window.document,
      docElem = doc.documentElement,
      parent  = doc.createElement( "div" ),
      child = doc.createElement( "div" ),
      childb  = doc.createElement( "div" ),
      ret;

  parent.style.cssText = "display: table";
  child.style.cssText = childb.style.cssText = "display: table-cell; padding: 10px";

  parent.appendChild( child );
  parent.appendChild( childb );
  docElem.insertBefore( parent, docElem.firstChild );

  ret = child.offsetLeft < childb.offsetLeft;
  docElem.removeChild(parent);
  return ret;
});

// https://github.com/Modernizr/Modernizr/issues/615
// documentMode is needed for false positives in oldIE, please see issue above
Modernizr.addTest('cssfilters', function() {
    var el = document.createElement('div');
    el.style.cssText = Modernizr._prefixes.join('filter' + ':blur(2px); ');
    return !!el.style.length && ((document.documentMode === undefined || document.documentMode > 9));
});/* see http://davidnewton.ca/the-current-state-of-hyphenation-on-the-web
   http://davidnewton.ca/demos/hyphenation/test.html


There are three tests:
   1. csshyphens      - tests hyphens:auto actually adds hyphens to text
   2. softhyphens     - tests that &shy; does its job
   3. softhyphensfind - tests that in-browser Find functionality still works correctly with &shy;

These tests currently require document.body to be present

Hyphenation is language specific, sometimes.
  See for more details: http://code.google.com/p/hyphenator/source/diff?spec=svn975&r=975&format=side&path=/trunk/Hyphenator.js#sc_svn975_313

If loading Hyphenator.js via Modernizr.load, be cautious of issue 158: http://code.google.com/p/hyphenator/issues/detail?id=158

More details at https://github.com/Modernizr/Modernizr/issues/312

*/

(function() {

	if (!document.body){
		window.console && console.warn('document.body doesn\'t exist. Modernizr hyphens test needs it.');
		return;
	}

	// functional test of adding hyphens:auto
	function test_hyphens_css() {
		try {
			/* create a div container and a span within that
			 * these have to be appended to document.body, otherwise some browsers can give false negative */
			var div = document.createElement('div'),
				span = document.createElement('span'),
				divStyle = div.style,
				spanHeight = 0,
				spanWidth = 0,
				result = false,
				firstChild = document.body.firstElementChild || document.body.firstChild;

			div.appendChild(span);
			span.innerHTML = 'Bacon ipsum dolor sit amet jerky velit in culpa hamburger et. Laborum dolor proident, enim dolore duis commodo et strip steak. Salami anim et, veniam consectetur dolore qui tenderloin jowl velit sirloin. Et ad culpa, fatback cillum jowl ball tip ham hock nulla short ribs pariatur aute. Pig pancetta ham bresaola, ut boudin nostrud commodo flank esse cow tongue culpa. Pork belly bresaola enim pig, ea consectetur nisi. Fugiat officia turkey, ea cow jowl pariatur ullamco proident do laborum velit sausage. Magna biltong sint tri-tip commodo sed bacon, esse proident aliquip. Ullamco ham sint fugiat, velit in enim sed mollit nulla cow ut adipisicing nostrud consectetur. Proident dolore beef ribs, laborum nostrud meatball ea laboris rump cupidatat labore culpa. Shankle minim beef, velit sint cupidatat fugiat tenderloin pig et ball tip. Ut cow fatback salami, bacon ball tip et in shank strip steak bresaola. In ut pork belly sed mollit tri-tip magna culpa veniam, short ribs qui in andouille ham consequat. Dolore bacon t-bone, velit short ribs enim strip steak nulla. Voluptate labore ut, biltong swine irure jerky. Cupidatat excepteur aliquip salami dolore. Ball tip strip steak in pork dolor. Ad in esse biltong. Dolore tenderloin exercitation ad pork loin t-bone, dolore in chicken ball tip qui pig. Ut culpa tongue, sint ribeye dolore ex shank voluptate hamburger. Jowl et tempor, boudin pork chop labore ham hock drumstick consectetur tri-tip elit swine meatball chicken ground round. Proident shankle mollit dolore. Shoulder ut duis t-bone quis reprehenderit. Meatloaf dolore minim strip steak, laboris ea aute bacon beef ribs elit shank in veniam drumstick qui. Ex laboris meatball cow tongue pork belly. Ea ball tip reprehenderit pig, sed fatback boudin dolore flank aliquip laboris eu quis. Beef ribs duis beef, cow corned beef adipisicing commodo nisi deserunt exercitation. Cillum dolor t-bone spare ribs, ham hock est sirloin. Brisket irure meatloaf in, boudin pork belly sirloin ball tip. Sirloin sint irure nisi nostrud aliqua. Nostrud nulla aute, enim officia culpa ham hock. Aliqua reprehenderit dolore sunt nostrud sausage, ea boudin pork loin ut t-bone ham tempor. Tri-tip et pancetta drumstick laborum. Ham hock magna do nostrud in proident. Ex ground round fatback, venison non ribeye in.';

			document.body.insertBefore(div, firstChild);

			/* get size of unhyphenated text */
			divStyle.cssText = 'position:absolute;top:0;left:0;width:5em;text-align:justify;text-justification:newspaper;';
			spanHeight = span.offsetHeight;
			spanWidth = span.offsetWidth;

			/* compare size with hyphenated text */
			divStyle.cssText = 'position:absolute;top:0;left:0;width:5em;text-align:justify;'+
												 'text-justification:newspaper;'+
												 Modernizr._prefixes.join('hyphens:auto; ');

			result = (span.offsetHeight != spanHeight || span.offsetWidth != spanWidth);

			/* results and cleanup */
			document.body.removeChild(div);
			div.removeChild(span);

			return result;
		} catch(e) {
			return false;
		}
	}

	// for the softhyphens test
	function test_hyphens(delimiter, testWidth) {
		try {
			/* create a div container and a span within that
			 * these have to be appended to document.body, otherwise some browsers can give false negative */
			var div = document.createElement('div'),
				span = document.createElement('span'),
				divStyle = div.style,
				spanSize = 0,
				result = false,
				result1 = false,
				result2 = false,
				firstChild = document.body.firstElementChild || document.body.firstChild;

			divStyle.cssText = 'position:absolute;top:0;left:0;overflow:visible;width:1.25em;';
			div.appendChild(span);
			document.body.insertBefore(div, firstChild);


			/* get height of unwrapped text */
			span.innerHTML = 'mm';
			spanSize = span.offsetHeight;

			/* compare height w/ delimiter, to see if it wraps to new line */
			span.innerHTML = 'm' + delimiter + 'm';
			result1 = (span.offsetHeight > spanSize);

			/* if we're testing the width too (i.e. for soft-hyphen, not zws),
			 * this is because tested Blackberry devices will wrap the text but not display the hyphen */
			if (testWidth) {
				/* get width of wrapped, non-hyphenated text */
				span.innerHTML = 'm<br />m';
				spanSize = span.offsetWidth;

				/* compare width w/ wrapped w/ delimiter to see if hyphen is present */
				span.innerHTML = 'm' + delimiter + 'm';
				result2 = (span.offsetWidth > spanSize);
			} else {
				result2 = true;
			}

			/* results and cleanup */
			if (result1 === true && result2 === true) { result = true; }
			document.body.removeChild(div);
			div.removeChild(span);

			return result;
		} catch(e) {
			return false;
		}
	}

	// testing if in-browser Find functionality will work on hyphenated text
	function test_hyphens_find(delimiter) {
		try {
			/* create a dummy input for resetting selection location, and a div container
			 * these have to be appended to document.body, otherwise some browsers can give false negative
			 * div container gets the doubled testword, separated by the delimiter
			 * Note: giving a width to div gives false positive in iOS Safari */
			var dummy = document.createElement('input'),
				div = document.createElement('div'),
				testword = 'lebowski',
				result = false,
				textrange,
				firstChild = document.body.firstElementChild || document.body.firstChild;

			div.innerHTML = testword + delimiter + testword;

			document.body.insertBefore(div, firstChild);
			document.body.insertBefore(dummy, div);


			/* reset the selection to the dummy input element, i.e. BEFORE the div container
			 *   stackoverflow.com/questions/499126/jquery-set-cursor-position-in-text-area */
			if (dummy.setSelectionRange) {
				dummy.focus();
				dummy.setSelectionRange(0,0);
			} else if (dummy.createTextRange) {
				textrange = dummy.createTextRange();
				textrange.collapse(true);
				textrange.moveEnd('character', 0);
				textrange.moveStart('character', 0);
				textrange.select();
			}

			/* try to find the doubled testword, without the delimiter */
			if (window.find) {
				result = window.find(testword + testword);
			} else {
				try {
					textrange = window.self.document.body.createTextRange();
					result = textrange.findText(testword + testword);
				} catch(e) {
					result = false;
				}
			}

			document.body.removeChild(div);
			document.body.removeChild(dummy);

			return result;
		} catch(e) {
			return false;
		}
	}

	Modernizr.addTest("csshyphens", function() {

		if (!Modernizr.testAllProps('hyphens')) return false;

		/* Chrome lies about its hyphens support so we need a more robust test
				crbug.com/107111
		*/
		try {
			return test_hyphens_css();
		} catch(e) {
			return false;
		}
	});

	Modernizr.addTest("softhyphens", function() {
		try {
			// use numeric entity instead of &shy; in case it's XHTML
			return test_hyphens('&#173;', true) && test_hyphens('&#8203;', false);
		} catch(e) {
			return false;
		}
	});

	Modernizr.addTest("softhyphensfind", function() {
		try {
			return test_hyphens_find('&#173;') && test_hyphens_find('&#8203;');
		} catch(e) {
			return false;
		}
	});

})();
// last-child pseudo selector
// https://github.com/Modernizr/Modernizr/pull/304


Modernizr.addTest('lastchild', function(){

  return Modernizr.testStyles("#modernizr div {width:100px} #modernizr :last-child{width:200px;display:block}", function (elem) {
    return elem.lastChild.offsetWidth > elem.firstChild.offsetWidth;
  }, 2);

});

// this tests passes for webkit's proprietary `-webkit-mask` feature
//   www.webkit.org/blog/181/css-masks/
//   developer.apple.com/library/safari/#documentation/InternetWeb/Conceptual/SafariVisualEffectsProgGuide/Masks/Masks.html

// it does not pass mozilla's implementation of `mask` for SVG

//   developer.mozilla.org/en/CSS/mask
//   developer.mozilla.org/En/Applying_SVG_effects_to_HTML_content

// Can combine with clippaths for awesomeness: http://generic.cx/for/webkit/test.html

Modernizr.addTest('cssmask', Modernizr.testAllProps('mask-repeat'));


Modernizr.addTest('mediaqueries', Modernizr.mq('only all'));
// dev.opera.com/articles/view/css3-object-fit-object-position/

Modernizr.addTest('object-fit',
	!!Modernizr.prefixed('objectFit')
);
// johanbrook.com/browsers/native-momentum-scrolling-ios-5/
// introduced in iOS5b2. Possible API may change...

Modernizr.addTest("overflowscrolling",function(){
    return Modernizr.testAllProps("overflowScrolling");
});



// developer.mozilla.org/en/CSS/pointer-events

// Test and project pages:
// ausi.github.com/Feature-detection-technique-for-pointer-events/
// github.com/ausi/Feature-detection-technique-for-pointer-events/wiki
// github.com/Modernizr/Modernizr/issues/80


Modernizr.addTest('pointerevents', function(){
    var element = document.createElement('x'),
        documentElement = document.documentElement,
        getComputedStyle = window.getComputedStyle,
        supports;
    if(!('pointerEvents' in element.style)){
        return false;
    }
    element.style.pointerEvents = 'auto';
    element.style.pointerEvents = 'x';
    documentElement.appendChild(element);
    supports = getComputedStyle &&
        getComputedStyle(element, '').pointerEvents === 'auto';
    documentElement.removeChild(element);
    return !!supports;
});
// Sticky positioning - constrains an element to be positioned inside the
// intersection of its container box, and the viewport.
Modernizr.addTest('csspositionsticky', function () {

    var prop = 'position:';
    var value = 'sticky';
    var el = document.createElement('modernizr');
    var mStyle = el.style;

    mStyle.cssText = prop + Modernizr._prefixes.join(value + ';' + prop).slice(0, -prop.length);

    return mStyle.position.indexOf(value) !== -1;
});

// test by github.com/nsfmc

// "The 'rem' unit ('root em') is relative to the computed
// value of the 'font-size' value of the root element."
// http://www.w3.org/TR/css3-values/#relative0
// you can test by checking if the prop was ditched

// http://snook.ca/archives/html_and_css/font-size-with-rem

Modernizr.addTest('cssremunit', function(){

  var div = document.createElement('div');
  try {
    div.style.fontSize = '3rem';
  } catch(er){}
  return (/rem/).test(div.style.fontSize);

});
// CSS Regions
// http://www.w3.org/TR/css3-regions/
// By: Mihai Balan

// We start with a CSS parser test then we check page geometry to see if it's affected by regions
// Later we might be able to retire the second part, as WebKit builds with the false positives die out

Modernizr.addTest('regions', function() {

	/* Get the 'flowFrom' property name available in the browser. Either default or vendor prefixed.
	If the property name can't be found we'll get Boolean 'false' and fail quickly */
	var flowFromProperty = Modernizr.prefixed("flowFrom"),
		flowIntoProperty = Modernizr.prefixed("flowInto");

	if (!flowFromProperty || !flowIntoProperty){
		return false;
	}

	/* If CSS parsing is there, try to determine if regions actually work. */
	var container		= document.createElement('div'),
		content			= document.createElement('div'),
		region			= document.createElement('div'),

	/* we create a random, unlikely to be generated flow number to make sure we don't
	clash with anything more vanilla, like 'flow', or 'article', or 'f1' */
	flowName = 'modernizr_flow_for_regions_check';

	/* First create a div with two adjacent divs inside it. The first will be the
	content, the second will be the region. To be able to distinguish between the two,
	we'll give the region a particular padding */
	content.innerText		= 'M';
	container.style.cssText	= 'top: 150px; left: 150px; padding: 0px;';
	region.style.cssText	= 'width: 50px; height: 50px; padding: 42px;';

	region.style[flowFromProperty] = flowName;
	container.appendChild(content);
	container.appendChild(region);
	document.documentElement.appendChild(container);

	/* Now compute the bounding client rect, before and after attempting to flow the
	content div in the region div. If regions are enabled, the after bounding rect
	should reflect the padding of the region div.*/
	var flowedRect, delta,
		plainRect = content.getBoundingClientRect();


	content.style[flowIntoProperty] = flowName;
	flowedRect = content.getBoundingClientRect();

	delta = flowedRect.left - plainRect.left;
	document.documentElement.removeChild(container);
	content = region = container = undefined;

	return (delta == 42);
});

// Test for CSS 3 UI "resize" property
// http://www.w3.org/TR/css3-ui/#resize
// https://developer.mozilla.org/en/CSS/resize

Modernizr.addTest('cssresize', Modernizr.testAllProps('resize'));


// Stylable scrollbars detection
Modernizr.addTest('cssscrollbar', function() {

	var bool,

		styles = "#modernizr{overflow: scroll; width: 40px }#" +
			Modernizr._prefixes
				.join("scrollbar{width:0px}"+' #modernizr::')
				.split('#')
				.slice(1)
				.join('#') + "scrollbar{width:0px}";

	Modernizr.testStyles(styles, function(node) {
		bool = 'scrollWidth' in node && node.scrollWidth == 40;
	});

	return bool;

});
/*
 * Test for SubPixel Font Rendering
 * (to infer if GDI or DirectWrite is used on Windows)
 * Authors: @derSchepp, @gerritvanaaken, @rodneyrehm, @yatil, @ryanseddon
 * Web: https://github.com/gerritvanaaken/subpixeldetect
 */
Modernizr.addTest('subpixelfont', function() {
    var bool,
        styles = "#modernizr{position: absolute; top: -10em; visibility:hidden; font: normal 10px arial;}#subpixel{float: left; font-size: 33.3333%;}";

    // see https://github.com/Modernizr/Modernizr/blob/master/modernizr.js#L97
    Modernizr.testStyles(styles, function(elem) {
        var subpixel = elem.firstChild;

        subpixel.innerHTML = 'This is a text written in Arial';

        bool = window.getComputedStyle ?
            window.getComputedStyle(subpixel, null).getPropertyValue("width") !== '44px'
            : false;
    }, 1, ['subpixel']);

    return bool;
});
// http://dev.w3.org/csswg/css3-conditional/#at-supports
// github.com/Modernizr/Modernizr/issues/648
// Relies on the fact that a browser vendor should expose the CSSSupportsRule interface
// http://dev.w3.org/csswg/css3-conditional/#the-csssupportsrule-interface

Modernizr.addTest("supports","CSSSupportsRule" in window);// -moz-user-select:none test.

// by ryan seddon
//https://github.com/Modernizr/Modernizr/issues/250


Modernizr.addTest("userselect",function(){
    return Modernizr.testAllProps("user-select");
});

// https://github.com/Modernizr/Modernizr/issues/572
// Similar to http://jsfiddle.net/FWeinb/etnYC/
Modernizr.addTest('cssvhunit', function() {
    var bool;
    Modernizr.testStyles("#modernizr { height: 50vh; }", function(elem, rule) {
        var height = parseInt(window.innerHeight/2,10),
            compStyle = parseInt((window.getComputedStyle ?
                      getComputedStyle(elem, null) :
                      elem.currentStyle)["height"],10);

        bool= (compStyle == height);
    });
    return bool;
});// https://github.com/Modernizr/Modernizr/issues/572
// http://jsfiddle.net/glsee/JDsWQ/4/
Modernizr.addTest('cssvmaxunit', function(){
    var bool;
    Modernizr.testStyles("#modernizr { width: 50vmax; }", function(elem, rule) {
        var one_vw = window.innerWidth/100,
            one_vh = window.innerHeight/100,
            compWidth = parseInt((window.getComputedStyle ?
                                  getComputedStyle(elem, null) :
                                  elem.currentStyle)['width'],10);
        bool = ( parseInt(Math.max(one_vw, one_vh)*50,10) == compWidth );
    });
    return bool;
});// https://github.com/Modernizr/Modernizr/issues/572
// http://jsfiddle.net/glsee/JRmdq/8/
Modernizr.addTest('cssvminunit', function(){
    var bool;
    Modernizr.testStyles("#modernizr { width: 50vmin; }", function(elem, rule) {
        var one_vw = window.innerWidth/100,
            one_vh = window.innerHeight/100,
            compWidth = parseInt((window.getComputedStyle ?
                                  getComputedStyle(elem, null) :
                                  elem.currentStyle)['width'],10);
        bool = ( parseInt(Math.min(one_vw, one_vh)*50,10) == compWidth );
    });
    return bool;
});
// https://github.com/Modernizr/Modernizr/issues/572
// http://jsfiddle.net/FWeinb/etnYC/
Modernizr.addTest('cssvwunit', function(){
    var bool;
    Modernizr.testStyles("#modernizr { width: 50vw; }", function(elem, rule) {
        var width = parseInt(window.innerWidth/2,10),
            compStyle = parseInt((window.getComputedStyle ?
                      getComputedStyle(elem, null) :
                      elem.currentStyle)["width"],10);

        bool= (compStyle == width);
    });
    return bool;
});
/*
	Custom protocol handler support
	http://developers.whatwg.org/timers.html#custom-handlers

	Added by @benschwarz
*/

Modernizr.addTest('customprotocolhandler', function () {
    return !!navigator.registerProtocolHandler;
});
// DataView
// https://developer.mozilla.org/en/JavaScript_typed_arrays/DataView
// By Addy Osmani
Modernizr.addTest('dataview', (typeof DataView !== 'undefined' && 'getFloat64' in DataView.prototype));// classList
// https://developer.mozilla.org/en/DOM/element.classList
// By Addy Osmani
Modernizr.addTest('classlist', 'classList' in document.documentElement);
// by james a rosen.
// https://github.com/Modernizr/Modernizr/issues/258

Modernizr.addTest('createelement-attrs', function() {
  try {
    return document.createElement("<input name='test' />").getAttribute('name') == 'test';
  } catch(e) {
    return false;
  }
});


// dataset API for data-* attributes
// test by @phiggins42

Modernizr.addTest('dataset', function(){
  var n = document.createElement("div");
  n.setAttribute("data-a-b", "c");
  return !!(n.dataset && n.dataset.aB === "c");
});
// Microdata support
// http://www.w3.org/TR/html5/microdata.html
// By Addy Osmani
Modernizr.addTest('microdata', !!(document['getItems']));

// lol. we already have a test for datalist built in! silly you.


// Helpful links while you're here, though..

// http://css-tricks.com/15346-relevant-dropdowns-polyfill-for-datalist/
// http://miketaylr.com/test/datalist.html
// http://miketaylr.com/code/datalist.html

Modernizr.addTest('datalistelem', Modernizr.input.list );
// By @mathias, based on http://mths.be/axh
Modernizr.addTest('details', function() {
    var doc = document,
        el = doc.createElement('details'),
        fake,
        root,
        diff;
    if (!('open' in el)) { // return early if possible; thanks @aFarkas!
        return false;
    }
    root = doc.body || (function() {
        var de = doc.documentElement;
        fake = true;
        return de.insertBefore(doc.createElement('body'), de.firstElementChild || de.firstChild);
    }());
    el.innerHTML = '<summary>a</summary>b';
    el.style.display = 'block';
    root.appendChild(el);
    diff = el.offsetHeight;
    el.open = true;
    diff = diff != el.offsetHeight;
    root.removeChild(el);
    fake && root.parentNode.removeChild(root);
    return diff;
});// <output>
// http://www.whatwg.org/specs/web-apps/current-work/multipage/the-button-element.html#the-output-element
// by Addy Osmani
Modernizr.addTest('outputelem', 'value' in document.createElement('output'));
//By Stefan Wallin

//tests for progressbar-support. All browsers that don't support progressbar returns undefined =)
Modernizr.addTest("progressbar",function(){
    return document.createElement('progress').max !== undefined;
});

//tests for meter-support. All browsers that don't support meters returns undefined =)
Modernizr.addTest("meter",function(){
    return document.createElement('meter').max !== undefined;
});
// Browser support test for the HTML5 <ruby>, <rt> and <rp> elements
// http://www.whatwg.org/specs/web-apps/current-work/multipage/text-level-semantics.html#the-ruby-element
//
// by @alrra

Modernizr.addTest('ruby', function () {

    var ruby = document.createElement('ruby'),
        rt = document.createElement('rt'),
        rp = document.createElement('rp'),
        docElement = document.documentElement,
        displayStyleProperty = 'display',
        fontSizeStyleProperty = 'fontSize'; // 'fontSize' - because it`s only used for IE6 and IE7

    ruby.appendChild(rp);
    ruby.appendChild(rt);
    docElement.appendChild(ruby);

    // browsers that support <ruby> hide the <rp> via "display:none"
    if ( getStyle(rp, displayStyleProperty) == 'none' ||                                                       // for non-IE browsers
    // but in IE browsers <rp> has "display:inline" so, the test needs other conditions:
        getStyle(ruby, displayStyleProperty) == 'ruby' && getStyle(rt, displayStyleProperty) == 'ruby-text' || // for IE8 & IE9
        getStyle(rp, fontSizeStyleProperty) == '6pt' && getStyle(rt, fontSizeStyleProperty) == '6pt' ) {       // for IE6 & IE7

        cleanUp();
        return true;

    } else {
        cleanUp();
        return false;
    }

    function getStyle( element, styleProperty ) {
        var result;

        if ( window.getComputedStyle ) {     // for non-IE browsers
            result = document.defaultView.getComputedStyle(element,null).getPropertyValue(styleProperty);
        } else if ( element.currentStyle ) { // for IE
            result = element.currentStyle[styleProperty];
        }

        return result;
    }

    function cleanUp() {
        docElement.removeChild(ruby);
        // the removed child node still exists in memory, so ...
        ruby = null;
        rt = null;
        rp = null;
    }

});
// <time> element
// http://www.whatwg.org/specs/web-apps/current-work/multipage/rendering.html#the-time-element-0
// by Addy Osmani
Modernizr.addTest('time', 'valueAsDate' in document.createElement('time'));
// Track element + Timed Text Track API
// http://www.w3.org/TR/html5/video.html#the-track-element
// http://www.w3.org/TR/html5/media-elements.html#text-track-api
//
// While IE10 has implemented the track element, IE10 does not expose the underlying APIs to create timed text tracks by JS (really sad)
// By Addy Osmani
Modernizr.addTest({
	texttrackapi: (typeof (document.createElement('video').addTextTrack) === 'function'),
	// a more strict test for track including UI support: document.createElement('track').kind === 'subtitles'
	track: ('kind' in document.createElement('track'))
});
// Requires a Modernizr build with `canvastext` included
// http://www.modernizr.com/download/#-canvas-canvastext
Modernizr.addTest('emoji', function() {
  if (!Modernizr.canvastext) return false;
  var node = document.createElement('canvas'),
      ctx = node.getContext('2d');
  ctx.textBaseline = 'top';
  ctx.font = '32px Arial';
  ctx.fillText('\ud83d\ude03', 0, 0); // "smiling face with open mouth" emoji
  return ctx.getImageData(16, 16, 1, 1).data[0] !== 0;
});// strict mode

// test by @kangax

Modernizr.addTest('strictmode', function(){
	return (function(){ "use strict"; return !this; })();
});//By Shi Chuan
//Part of Device Access aspect of HTML5, same category as geolocation
//W3C Editor's Draft at http://dev.w3.org/geo/api/spec-source-orientation.html
//Implementation by iOS Safari at http://goo.gl/fhce3 and http://goo.gl/rLKz8


//test for Device Motion Event support, returns boolean value true/false
Modernizr.addTest('devicemotion', ('DeviceMotionEvent' in window) );

//test for Device Orientation Event support, returns boolean value true/false
Modernizr.addTest('deviceorientation', ('DeviceOrientationEvent' in window) );
// EXIF Orientation test

// iOS looks at the EXIF Orientation flag in jpgs and rotates the image
// accordingly. Looks like most desktop browsers just ignore this data.

// description: www.impulseadventure.com/photo/exif-orientation.html

// Bug trackers:
//    bugzil.la/298619 (unimplemented)
//    crbug.com/56845 (looks incomplete)
//    webk.it/19688 (available upstream but its up all ports to turn on individually)
//

// detect by Paul Sayre


(function(){

  var img = new Image();

  img.onerror = function() {
      Modernizr.addTest('exif-orientation', function () { return false; });
  };

  img.onload = function() {
      Modernizr.addTest('exif-orientation', function () { return img.width !== 2; });
  };

  // There may be a way to shrink this more, it's a 1x2 white jpg with the orientation flag set to 6
  img.src = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAYABgAAD/4QAiRXhpZgAASUkqAAgAAAABABIBAwABAAAABgASAAAAAAD/2wBDAAEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/2wBDAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQH/wAARCAABAAIDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD+/iiiigD/2Q==";

})();
/**
 * file tests for the File API specification
 *   Tests for objects specific to the File API W3C specification without
 *   being redundant (don't bother testing for Blob since it is assumed
 *   to be the File object's prototype.
 *
 *   Will fail in Safari 5 due to its lack of support for the standards
 *   defined FileReader object
 */
Modernizr.addTest('filereader', function () {
    return !!(window.File && window.FileList && window.FileReader);
});


// Detects whether input type="file" is available on the platform
// E.g. iOS < 6 and some android version don't support this

//  It's useful if you want to hide the upload feature of your app on devices that
//  don't support it (iphone, ipad, etc).

Modernizr.addTest('fileinput', function() {
    var elem = document.createElement('input');
    elem.type = 'file';
    return !elem.disabled;
});
// Detects whether input form="form_id" is available on the platform
// E.g. IE 10 (and below), don't support this
Modernizr.addTest("formattribute", function() {
	var form = document.createElement("form"),
		input = document.createElement("input"),
		div = document.createElement("div"),
		id = "formtest"+(new Date().getTime()),
		attr,
		bool = false;

		form.id = id;

	//IE6/7 confuses the form idl attribute and the form content attribute
	if(document.createAttribute){
		attr = document.createAttribute("form");
		attr.nodeValue = id;
		input.setAttributeNode(attr);
		div.appendChild(form);
		div.appendChild(input);

		document.documentElement.appendChild(div);

		bool = form.elements.length === 1 && input.form == form;

		div.parentNode.removeChild(div);
	}

	return bool;
});// testing for placeholder attribute in inputs and textareas
// re-using Modernizr.input if available

Modernizr.addTest('placeholder', function(){

  return !!( 'placeholder' in ( Modernizr.input    || document.createElement('input')    ) &&
             'placeholder' in ( Modernizr.textarea || document.createElement('textarea') )
           );

});
// speech input for inputs
// by @alrra


// `webkitSpeech` in elem
// doesn`t work correctly in all versions of Chromium based browsers.
//   It can return false even if they have support for speech i.imgur.com/2Y40n.png
//  Testing with 'onwebkitspeechchange' seems to fix this problem

// this detect only checks the webkit version because
// the speech attribute is likely to be deprecated in favor of a JavaScript API.
// http://lists.w3.org/Archives/Public/public-webapps/2011OctDec/att-1696/speechapi.html

// FIXME: add support for detecting the new spec'd behavior

Modernizr.addTest('speechinput', function(){
    var elem = document.createElement('input');
    return 'speech' in elem || 'onwebkitspeechchange' in elem;
});// Filesystem API
// dev.w3.org/2009/dap/file-system/file-dir-sys.html

// The API will be present in Chrome incognito, but will throw an exception.
// See crbug.com/93417
//
// By Eric Bidelman (@ebidel)

Modernizr.addTest('filesystem', !!Modernizr.prefixed('requestFileSystem', window));// This implementation only tests support for interactive form validation.
// To check validation for a specific type or a specific other constraint,
// the test can be combined:
//    - Modernizr.inputtypes.numer && Modernizr.formvalidation (browser supports rangeOverflow, typeMismatch etc. for type=number)
//    - Modernizr.input.required && Modernizr.formvalidation (browser supports valueMissing)
//
(function(document, Modernizr){


Modernizr.formvalidationapi = false;
Modernizr.formvalidationmessage = false;

Modernizr.addTest('formvalidation', function(){
    var form = document.createElement('form');
    if ( !('checkValidity' in form) ) {
        return false;
    }
    var body = document.body,

    html = document.documentElement,

    bodyFaked = false,

    invaildFired = false,

    input;

    Modernizr.formvalidationapi = true;

    // Prevent form from being submitted
    form.onsubmit = function(e) {
        //Opera does not validate form, if submit is prevented
        if ( !window.opera ) {
            e.preventDefault();
        }
        e.stopPropagation();
    };

    // Calling form.submit() doesn't trigger interactive validation,
    // use a submit button instead
    //older opera browsers need a name attribute
    form.innerHTML = '<input name="modTest" required><button></button>';

    // FF4 doesn't trigger "invalid" event if form is not in the DOM tree
    // Chrome throws error if invalid input is not visible when submitting
    form.style.position = 'absolute';
    form.style.top = '-99999em';

    // We might in <head> in which case we need to create body manually
    if ( !body ) {
        bodyFaked = true;
        body = document.createElement('body');
        //avoid crashing IE8, if background image is used
        body.style.background = "";
        html.appendChild(body);
    }

    body.appendChild(form);

    input = form.getElementsByTagName('input')[0];

    // Record whether "invalid" event is fired
    input.oninvalid = function(e) {
        invaildFired = true;
        e.preventDefault();
        e.stopPropagation();
    };

    //Opera does not fully support the validationMessage property
    Modernizr.formvalidationmessage = !!input.validationMessage;

    // Submit form by clicking submit button
    form.getElementsByTagName('button')[0].click();

    // Don't forget to clean up
    body.removeChild(form);
    bodyFaked && html.removeChild(body);

    return invaildFired;
});


})(document, window.Modernizr);Modernizr.addTest('fullscreen',function(){
     for(var i = 0; i < Modernizr._domPrefixes.length; i++) {
        if( document[Modernizr._domPrefixes[i].toLowerCase() + 'CancelFullScreen'])
            return true;
     }
     return !!document['cancelFullScreen'] || false;
});

// http://developer.apple.com/library/safari/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/ControllingMediaWithJavaScript/ControllingMediaWithJavaScript.html#//apple_ref/doc/uid/TP40009523-CH3-SW20
// https://developer.mozilla.org/en/API/Fullscreen
// GamePad API
// https://dvcs.w3.org/hg/gamepad/raw-file/default/gamepad.html
// By Eric Bidelman

// FF has Gamepad API support only in special builds, but not in any release (even behind a flag)
// Their current implementation has no way to feature detect, only events to bind to.
//   http://www.html5rocks.com/en/tutorials/doodles/gamepad/#toc-featuredetect

// but a patch will bring them up to date with the spec when it lands (and they'll pass this test)
//   https://bugzilla.mozilla.org/show_bug.cgi?id=690935

Modernizr.addTest('gamepads', !!Modernizr.prefixed('getGamepads', navigator));
// Test for `sandbox` attribute in iframes.
//
// Spec: http://www.whatwg.org/specs/web-apps/current-work/multipage/the-iframe-element.html#attr-iframe-sandbox

Modernizr.addTest('sandbox', 'sandbox' in document.createElement('iframe'));
// Animated PNG
// http://en.wikipedia.org/wiki/APNG
// By Addy Osmani
(function () {

    if (!Modernizr.canvas) return false;

    var image = new Image(),
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d');


    image.onload = function () {
        Modernizr.addTest('apng', function () {
            if (typeof canvas.getContext == 'undefined') {
                return false;
            } else {
                ctx.drawImage(image, 0, 0);
                return ctx.getImageData(0, 0, 1, 1).data[3] === 0;
            }
        });
    };

    image.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACGFjVEwAAAABAAAAAcMq2TYAAAANSURBVAiZY2BgYPgPAAEEAQB9ssjfAAAAGmZjVEwAAAAAAAAAAQAAAAEAAAAAAAAAAAD6A+gBAbNU+2sAAAARZmRBVAAAAAEImWNgYGBgAAAABQAB6MzFdgAAAABJRU5ErkJggg==";

}());
// getUserMedia
// http://www.whatwg.org/specs/web-apps/current-work/multipage/video-conferencing-and-peer-to-peer-communication.html
// By Eric Bidelman

Modernizr.addTest('getusermedia', !!Modernizr.prefixed('getUserMedia', navigator));
// IE8 compat mode aka Fake IE7
// by Erich Ocean

// In this case, IE8 will be acting as IE7. You may choose to remove features in this case.

// related:
// james.padolsey.com/javascript/detect-ie-in-js-using-conditional-comments/

Modernizr.addTest('ie8compat',function(){
    return (!window.addEventListener && document.documentMode && document.documentMode === 7);
});
// Test for `srcdoc` attribute in iframes.
//
// Spec: http://www.whatwg.org/specs/web-apps/current-work/multipage/the-iframe-element.html#attr-iframe-srcdoc

Modernizr.addTest('srcdoc', 'srcdoc' in document.createElement('iframe'));
// Test for `seamless` attribute in iframes.
//
// Spec: http://www.whatwg.org/specs/web-apps/current-work/multipage/the-iframe-element.html#attr-iframe-seamless

Modernizr.addTest('seamless', 'seamless' in document.createElement('iframe'));
// code.google.com/speed/webp/
// by rich bradshaw, ryan seddon, and paul irish


// This test is asynchronous. Watch out.

(function(){

  var image = new Image();

  image.onerror = function() {
      Modernizr.addTest('webp', false);
  };
  image.onload = function() {
      Modernizr.addTest('webp', function() { return image.width == 1; });
  };

  image.src = 'data:image/webp;base64,UklGRiwAAABXRUJQVlA4ICAAAAAUAgCdASoBAAEAL/3+/3+CAB/AAAFzrNsAAP5QAAAAAA==';

}());// native JSON support.
// developer.mozilla.org/en/JSON

// this will also succeed if you've loaded the JSON2.js polyfill ahead of time
//   ... but that should be obvious. :)

Modernizr.addTest('json', !!window.JSON && !!JSON.parse);

// impressivewebs.com/reverse-ordered-lists-html5
// polyfill: github.com/impressivewebs/HTML5-Reverse-Ordered-Lists


Modernizr.addTest('olreversed', 'reversed' in document.createElement('ol'));
// MathML
// http://www.w3.org/Math/
// By Addy Osmani
// Based on work by Davide (@dpvc) and David (@davidcarlisle)
// in https://github.com/mathjax/MathJax/issues/182

Modernizr.addTest('mathml', function(){
	var hasMathML = false;
	if ( document.createElementNS ) {
	var ns = "http://www.w3.org/1998/Math/MathML",
	    div = document.createElement("div");
	    div.style.position = "absolute";
	var mfrac = div.appendChild(document.createElementNS(ns,"math"))
	               .appendChild(document.createElementNS(ns,"mfrac"));
	mfrac.appendChild(document.createElementNS(ns,"mi"))
	     .appendChild(document.createTextNode("xx"));
	mfrac.appendChild(document.createElementNS(ns,"mi"))
	     .appendChild(document.createTextNode("yy"));
	document.body.appendChild(div);
	hasMathML = div.offsetHeight > div.offsetWidth;
	}
	return hasMathML;
});// determining low-bandwidth via navigator.connection

// There are two iterations of the navigator.connection interface:

// The first is present in Android 2.2+ and only in the Browser (not WebView)
// : docs.phonegap.com/en/1.2.0/phonegap_connection_connection.md.html#connection.type
// : davidbcalhoun.com/2010/using-navigator-connection-android

// The second is specced at dev.w3.org/2009/dap/netinfo/ and perhaps landing in WebKit
// : bugs.webkit.org/show_bug.cgi?id=73528

// unknown devices are assumed as fast
// for more rigorous network testing, consider boomerang.js: github.com/bluesmoon/boomerang/

Modernizr.addTest('lowbandwidth', function() {

  var connection = navigator.connection || { type: 0 }; // polyfill

  return connection.type == 3 || // connection.CELL_2G
      connection.type == 4 || // connection.CELL_3G
      /^[23]g$/.test(connection.type); // string value in new spec
});

// server sent events aka eventsource
// dev.w3.org/html5/eventsource/

Modernizr.addTest('eventsource', !!window.EventSource);


// XML HTTP Request Level 2
// www.w3.org/TR/XMLHttpRequest2/

// Much more details at github.com/Modernizr/Modernizr/issues/385

// all three of these details report consistently across all target browsers:
//   !!(window.ProgressEvent);
//   !!(window.FormData);
//   window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest;

Modernizr.addTest('xhr2', 'FormData' in window);
// Notifications
// By Theodoor van Donge

// window.webkitNotifications is only used by Chrome
//	http://www.html5rocks.com/en/tutorials/notifications/quick/

// window.Notification only exist in the draft specs
//	http://dev.w3.org/2006/webapi/WebNotifications/publish/Notifications.html#idl-if-Notification

Modernizr.addTest('notification', !!Modernizr.prefixed('Notifications', window));// Navigation Timing (Performance)
// https://dvcs.w3.org/hg/webperf/raw-file/tip/specs/NavigationTiming/
// http://www.html5rocks.com/en/tutorials/webperformance/basics/
// By Scott Murphy (uxder)
Modernizr.addTest('performance', !!Modernizr.prefixed('performance', window));// https://developer.mozilla.org/en-US/docs/API/Pointer_Lock_API

Modernizr.addTest('pointerlock',!!Modernizr.prefixed('pointerLockElement', document));

// Quota Storage Management API
// This API can be used to check how much quota an origin is using and request more

// Currently only implemented in Chrome.
// https://developers.google.com/chrome/whitepapers/storage
// By Addy Osmani

Modernizr.addTest('quotamanagement', function(){
  var storage = Modernizr.prefixed('StorageInfo', window);
  return !!(storage && 'TEMPORARY' in storage && 'PERSISTENT' in storage);
});

// requestAnimationFrame
// Offload animation repainting to browser for optimized performance.
// http://dvcs.w3.org/hg/webperf/raw-file/tip/specs/RequestAnimationFrame/Overview.html
// By Addy Osmani

Modernizr.addTest('raf', !!Modernizr.prefixed('requestAnimationFrame', window));// async script
// By Theodoor van Donge
Modernizr.addTest('scriptasync', 'async' in document.createElement('script'));// defer script
// By Theodoor van Donge
Modernizr.addTest('scriptdefer', 'defer' in document.createElement('script'));// Browser support test for <style scoped>
// http://www.w3.org/TR/html5/the-style-element.html#attr-style-scoped
//
// by @alrra

Modernizr.addTest( 'stylescoped', 'scoped' in document.createElement('style') );
// Detect support for svg filters - http://www.w3.org/TR/SVG11/filters.html.
// Should fail in Safari: http://stackoverflow.com/questions/9739955/feature-detecting-support-for-svg-filters.
// detect by erik dahlstrom

Modernizr.addTest('svgfilters', function(){
	var result = false;
    try {
      result = typeof SVGFEColorMatrixElement !== undefined &&
               SVGFEColorMatrixElement.SVG_FECOLORMATRIX_TYPE_SATURATE == 2;
    }
    catch(e) {}
    return result;
});
/**
 * Unicode special character support
 *
 * Detection is made by testing missing glyph box rendering against star character
 * If widths are the same, this "probably" means the browser didn't support the star character and rendered a glyph box instead
 * Just need to ensure the font characters have different widths
 *
 * Warning : positive Unicode support doesn't mean you can use it inside <title>, this seams more related to OS & Language packs
 */
Modernizr.addTest('unicode', function() {


	var bool,

		missingGlyph = document.createElement('span'),

		star = document.createElement('span');

	Modernizr.testStyles('#modernizr{font-family:Arial,sans;font-size:300em;}', function(node) {

		missingGlyph.innerHTML = '&#5987';
		star.innerHTML = '&#9734';

		node.appendChild(missingGlyph);
		node.appendChild(star);

		bool = 'offsetWidth' in missingGlyph && missingGlyph.offsetWidth !== star.offsetWidth;
	});

	return bool;

});// data uri test.
// https://github.com/Modernizr/Modernizr/issues/14

// This test is asynchronous. Watch out.


// in IE7 in HTTPS this can cause a Mixed Content security popup.
//  github.com/Modernizr/Modernizr/issues/362
// To avoid that you can create a new iframe and inject this.. perhaps..


(function(){

  var datauri = new Image();


  datauri.onerror = function() {
      Modernizr.addTest('datauri', function () { return false; });
  };
  datauri.onload = function() {
      Modernizr.addTest('datauri', function () { return (datauri.width == 1 && datauri.height == 1); });
  };

  datauri.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

})();
// test if IE userdata supported
// msdn.microsoft.com/en-us/library/ms531424(v=vs.85).aspx
// test by @stereobooster

Modernizr.addTest('userdata', function(){
  return !!document.createElement('div').addBehavior;
});
// Vibration API
// http://www.w3.org/TR/vibration/
// https://developer.mozilla.org/en/DOM/window.navigator.mozVibrate
Modernizr.addTest('vibrate', !!Modernizr.prefixed('vibrate', navigator));// Tests for the ability to use Web Intents (http://webintents.org).
// By Eric Bidelman

Modernizr.addTest('webintents', function() {
  return !!Modernizr.prefixed('startActivity', navigator);
});

// Grab the WebGL extensions currently supported and add to the Modernizr.webgl object
// spec: www.khronos.org/registry/webgl/specs/latest/#5.13.14

// based on code from ilmari heikkinen
// code.google.com/p/graphics-detect/source/browse/js/detect.js


(function(){

    if (!Modernizr.webgl) return;

    var canvas, ctx, exts;

    try {
        canvas  = document.createElement('canvas');
        ctx     = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        exts    = ctx.getSupportedExtensions();
    }
    catch (e) {
        return;
    }

    if (ctx === undefined) {
        Modernizr.webgl = new Boolean(false);
    }
    else {
        Modernizr.webgl = new Boolean(true);
    }


    for (var i = -1, len = exts.length; ++i < len; ){
        Modernizr.webgl[exts[i]] = true;
    }

    // hack for addressing modernizr testsuite failures. sorry.
    if (window.TEST && TEST.audvid){
        TEST.audvid.push('webgl');
    }

    canvas = undefined;
})();
// binaryType is truthy if there is support.. returns "blob" in new-ish chrome.
// plus.google.com/115535723976198353696/posts/ERN6zYozENV

Modernizr.addTest('websocketsbinary',
  !!(window.WebSocket && (new WebSocket('ws://.')).binaryType)
);

// tests if page is iframed

// github.com/Modernizr/Modernizr/issues/242

Modernizr.addTest('framed', function(){
  return window.location != top.location;
});
// by jussi-kalliokoski


// This test is asynchronous. Watch out.

// The test will potentially add garbage to console.

(function(){
  try {

    // we're avoiding using Modernizr._domPrefixes as the prefix capitalization on
    // these guys are notoriously peculiar.
    var BlobBuilder = window.MozBlobBuilder || window.WebKitBlobBuilder || window.MSBlobBuilder || window.OBlobBuilder || window.BlobBuilder,
        URL         = window.MozURL || window.webkitURL || window.MSURL || window.OURL || window.URL;

    var data    = 'Modernizr',
        bb      = new BlobBuilder();

    bb.append('this.onmessage=function(e){postMessage(e.data)}');

    var url     = URL.createObjectURL(bb.getBlob()),
        worker  = new Worker(url);

    bb = null;

    worker.onmessage = function(e) {
      worker.terminate();
      URL.revokeObjectURL(url);
      Modernizr.addTest('blobworkers', data === e.data);
      worker = null;
    };

    // Just in case...
    worker.onerror = function() {
      Modernizr.addTest('blobworkers', false);
      worker = null;
    };

    setTimeout(function() {
        Modernizr.addTest('blobworkers', false);
    }, 200);

    worker.postMessage(data);

  } catch (e) {
    Modernizr.addTest('blobworkers', false);
  }
}());
// by jussi-kalliokoski


// This test is asynchronous. Watch out.

// The test will potentially add garbage to console.

(function(){
  try {
    var data    = 'Modernizr',
        worker  = new Worker('data:text/javascript;base64,dGhpcy5vbm1lc3NhZ2U9ZnVuY3Rpb24oZSl7cG9zdE1lc3NhZ2UoZS5kYXRhKX0=');

    worker.onmessage = function(e) {
      worker.terminate();
      Modernizr.addTest('dataworkers', data === e.data);
      worker = null;
    };

    // Just in case...
    worker.onerror = function() {
      Modernizr.addTest('dataworkers', false);
      worker = null;
    };

    setTimeout(function() {
        Modernizr.addTest('dataworkers', false);
    }, 200);

    worker.postMessage(data);

  } catch (e) {
    Modernizr.addTest('dataworkers', false);
  }
}());
Modernizr.addTest('sharedworkers', function(){
  return !!window.SharedWorker;
});// cubic-bezier values can't be > 1 for Webkit until bug #45761 (https://bugs.webkit.org/show_bug.cgi?id=45761) is fixed
// By @calvein

Modernizr.addTest('cubicbezierrange', function() {
    var el = document.createElement('div');
    el.style.cssText = Modernizr._prefixes.join('transition-timing-function' + ':cubic-bezier(1,0,0,1.1); ');
    return !!el.style.length;
});
;
