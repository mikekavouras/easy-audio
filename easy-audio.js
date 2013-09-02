(function() {
  $.fn.easyAudio = function(options) {

    $.fn.easyAudio.options = $.extend({}, $.fn.easyAudio.defaults, options);

    return this.each(function() {
      if(!$.fn.easyAudio.setupAudio()) {
        alert("Your browser doesn't support audio");
        return false;
      }

      $(this).bind('click', function() {
        var audio = $.fn.easyAudio.audio;

        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }

        $(this).toggleClass('playing');
      });
    });

  };

  $.fn.easyAudio.audio = null;

  $.fn.easyAudio.defaults = {

  };

  $.fn.easyAudio.setupAudio = function() {
    var audio = document.createElement('audio');
    if (!!!audio.canPlayType) return false;

    var types = ['audio/mpeg', 'audio/ogg', 'audio/wav'];

    for (var i = 0; i < types.length; i++) {
      if (!!audio.canPlayType(types[i])) {
        var src = $.fn.easyAudio.options[types[i].replace('audio/','')];
        var $audio = $('<audio src="'+src+'"></audio>');
        $('body').append($audio);
        $.fn.easyAudio.audio = $audio.get(0);
        return true;
      }
    }

    return false;
  };

}(jQuery));
