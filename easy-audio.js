(function() {
  $.fn.easyAudio = function(options) {

    var opts = $.extend({}, $.fn.easyAudio.defaults, options);

    return this.each(function() {
      opts.$audio = $.fn.easyAudio.setupAudio(opts);
      if (!opts.$audio) {
        alert("Your browser doesn't support audio");
        return false;
      }

      opts.audio =  opts.$audio.get(0);

      $(this).bind('click', function() {
        var audio = opts.audio;

        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }
      });

      $.fn.easyAudio.bindEvents();

      if (opts.showTime) {
        if (opts.countDirection === "up") {
          $.fn.easyAudio.countUp(opts);
        } else {
          $.fn.easyAudio.countDown(opts);
        }
      }
    });

  };

  $.fn.easyAudio.audio = null;

  $.fn.easyAudio.defaults = {
    showTime: false,
    countDirection: 'up',
    $time: null
  };

  $.fn.easyAudio.setupAudio = function(opts) {
    var audio = document.createElement('audio');
    if (!!!audio.canPlayType) return false;

    var types = ['audio/mpeg', 'audio/ogg', 'audio/wav'];

    for (var i = 0; i < types.length; i++) {
      if (!!audio.canPlayType(types[i])) {
        var src = opts[types[i].replace('audio/','')];
        var $audio = $('<audio src="'+src+'"></audio>');
        $('body').append($audio);
        return $audio;
      }
    }

    return false;
  };

  $.fn.easyAudio.bindEvents = function() {
    $($.fn.easyAudio.audio).bind('timeupdate', function() {
      $.fn.easyAudio.formatSecondsToMinutes($.fn.easyAudio.audio.currentTime);
    });
  };

  $.fn.easyAudio.countUp = function(opts) {
    opts.$audio.unbind('timeupdate');
    opts.$audio.bind('timeupdate', function() {
      var time = $.fn.easyAudio.formatSecondsToMinutes(opts.audio.currentTime);
      $('#show-time').html(time.minutes + ":" + time.seconds);
    });
  };

  $.fn.easyAudio.countDown = function(opts) {
    opts.$audio.unbind('timeupdate');
    opts.$audio.bind('timeupdate', function() {
      var time = $.fn.easyAudio.formatSecondsToMinutes(opts.audio.duration - opts.audio.currentTime);
      $('#show-time').html(time.minutes + ":" + time.seconds);
    });
  };

  $.fn.easyAudio.formatSecondsToMinutes = function(seconds) {
    var minutes = Math.floor(seconds / 60);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var seconds = Math.floor((seconds - (60 * minutes)));
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return {
      minutes: minutes,
      seconds: seconds
    };
  };
}(jQuery));
