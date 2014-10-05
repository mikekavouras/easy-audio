(function() {
  $.fn.easyAudio = function(options) {

    return this.each(function() {
      var opts = $.extend({}, $.fn.easyAudio.defaults, options);
      opts.$elem = $(this);

      var configured = $.fn.easyAudio.configure(opts);

      if ( ! configured) {
        alert("Your browser doesn't support audio");
        return false;
      }

      // $.fn.easyAudio.addAudio(opts);
      $.fn.easyAudio.bindEvents(opts);
    });

  };

  $.fn.easyAudio.defaults = {};

  $.fn.easyAudio.bindEvents = function(opts) {
    var ev = opts.event + '.easyaudio';
    opts.$elem.bind(ev, function() {
      var audio = $.fn.easyAudio.addAudio(opts);

      if (opts.conditions) {
        if (Object.prototype.toString.call(opts.conditions) === "[object Array]") {
          var play = true;
          for (var i = 0; i < opts.conditions.length; i++) {
            if ( ! opts.conditions[i]()) {
              play = false;
              break;
            }
          }
          if (play) {
            audio.play();
          }
        } else if (Object.prototype.toString.call(opts.conditions) === "[object Function]") {
          if (opts.conditions()) {
            audio.play();
          }
        }
      } else {
        audio.play();
      }

      opts.$elem.unbind(ev);
      $.fn.easyAudio.bindEvents(opts);

      if (opts.onPlay) {
        opts.onPlay();
      }
    });
  }

  $.fn.easyAudio.addAudio = function(opts) {
    var $audio = $('<audio src="' + opts.src + '" preload="auto"></audio');
    $audio.bind('ended', function() {
      $(this).remove();
      if (opts.onEnd) {
        opts.onEnd();
      }
    });
    return $audio[0]
  }

  $.fn.easyAudio.configure = function(opts) {
    var audio = document.createElement('audio');
    if (!!!audio.canPlayType) return false;

    var types = {
      'audio/mpeg' : 'mp3',
      'audio/wav' : 'wav',
      'audio/ogg' : 'ogg'
    };

    var keys = Object.keys(types);
    for (var i = 0; i < keys.length; i++) {
      if (!!audio.canPlayType(keys[i])) {
        opts.src = opts.src + '.' + types[keys[i]];
        return true;
      }
    }

    return false;
  };

}(jQuery));
