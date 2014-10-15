(function() {
  $.fn.easyAudio = function(options) {

    return this.each(function() {
      var opts = $.extend({}, $.fn.easyAudio.defaults, options);
      opts.$elem = $(this);

      var configured = $.fn.easyAudio.configure(opts);

      if ( ! configured) {
        window.alert("Your browser doesn't support audio");
        return false;
      }

      $.fn.easyAudio.bindEvents(opts);
    });

  };

  $.fn.easyAudio.defaults = {
    event: 'click'
  };

  $.fn.easyAudio.bindEvents = function(opts) {
    var ev = opts.event + '.easyaudio';
    opts.$elem.bind(ev, function() {
      var audio = $.fn.easyAudio.addAudio(opts);
      audio.play();

      opts.$elem.unbind(ev);
      $.fn.easyAudio.bindEvents(opts);

      if (opts.onPlay) {
        opts.onPlay();
      }
    });
  };

  $.fn.easyAudio.addAudio = function(opts) {
    var $audio = $('<audio src="' + $.fn.easyAudio.getSound(opts) + '" preload="auto"></audio');
    $audio.bind('ended', function() {
      $(this).remove();
      if (opts.onEnd) {
        opts.onEnd();
      }
    });
    return $audio[0];
  };

  $.fn.easyAudio.getSound = function(opts) {
    var sounds = opts.sound;
    if (Object.prototype.toString.call(sounds) === "[object Array]") {
      return sounds[Math.floor(Math.random() * sounds.length)] + '.' + opts.extension;
    } else {
      return sounds + '.' + opts.extension;
    }
  },

  $.fn.easyAudio.configure = function(opts) {
    var audio = document.createElement('audio');
    if (!!!audio.canPlayType) {
      return false;
    }

    var types = { 'audio/mpeg' : 'mp3', 'audio/wav' : 'wav', 'audio/ogg' : 'ogg' };
    var keys = Object.keys(types);

    for (var i = 0; i < keys.length; i++) {
      if (!!audio.canPlayType(keys[i])) {
        opts.extension = types[keys[i]];
        $.fn.easyAudio.preloadAudio(opts);
        return true;
      }
    }

    return false;
  };

  $.fn.easyAudio.preloadAudio = function(opts) {
    var audio = new Audio();
    audio.preload = "preload";
    audio.src = $.fn.easyAudio.getSound(opts);
  }

}(jQuery));
