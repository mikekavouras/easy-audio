(function() {
  $.fn.easyAudio = function(options) {

    return this.each(function() {
      var opts = $.extend({}, $.fn.easyAudio.defaults, options);
      opts.$elem = $(this);

      var configured = $.fn.easyAudio.configure(opts);

      if (!configured) {
        alert("Your browser doesn't support audio");
        return false;
      }

      $.fn.easyAudio.addAudio(opts);
      $.fn.easyAudio.bindEvents(opts);
    });

  };

  $.fn.easyAudio.defaults = {};

  $.fn.easyAudio.bindEvents = function(opts) {
    var audio = opts.audio;
    opts.$elem.bind('click', function() {
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
      }
    });
  }

  $.fn.easyAudio.addAudio = function(opts) {
    opts.$audio = $('<audio src="'+opts.src+'" preload="auto"></audio');
    opts.audio =  opts.$audio.get(0);
    $('body').append(opts.$audio);
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
