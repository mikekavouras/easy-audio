(function() {
  $.fn.easyAudio = function(options) {

    var opts = $.extend({}, $.fn.easyAudio.defaults, options);

    return this.each(function() {
      var isConfigured = $.fn.easyAudio.configureAudio(opts);

      if (!isConfigured) {
        alert("Your browser doesn't support audio");
        return false;
      }

      opts.$audio = $('<audio src="'+opts.src+'" preload="auto"></audio');
      opts.audio =  opts.$audio.get(0);

      $('body').append(opts.$audio);

      $(this).bind('click', function() {
        if (opts.audio.paused) {
          console.log('here');
          opts.audio.play();
        } else {
          opts.audio.pause();
        }
      });

    });

  };

  $.fn.easyAudio.audio = null;

  $.fn.easyAudio.defaults = {
  };

  $.fn.easyAudio.configureAudio = function(opts) {
    var audio = document.createElement('audio');
    if (!!!audio.canPlayType) return false;

    var types = ['audio/mpeg', 'audio/ogg', 'audio/wav'];

    for (var i = 0; i < types.length; i++) {
      if (!!audio.canPlayType(types[i])) {
        var src = opts[types[i].replace('audio/','')];
        opts.src = src;
        return true;
      }
    }

    return false;
  };

}(jQuery));
