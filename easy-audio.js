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

      $.fn.easyAudio.bindEvents();

      if ($.fn.easyAudio.options.showTime) {
        if ($.fn.easyAudio.options.countDirection === "up") {
          $.fn.easyAudio.countUp();
        } else {
          $.fn.easyAudio.countDown();
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
        $.fn.easyAudio.$audio = $audio;
        return true;
      }
    }

    return false;
  };

  $.fn.easyAudio.bindEvents = function() {
    $($.fn.easyAudio.audio).bind('timeupdate', function() {
      $.fn.easyAudio.formatSecondsToMinutes($.fn.easyAudio.audio.currentTime);
    });
  };

  $.fn.easyAudio.countUp = function() {
    $.fn.easyAudio.$audio.unbind('timeupdate');
    $.fn.easyAudio.$audio.bind('timeupdate', function() {
      var time = $.fn.easyAudio.formatSecondsToMinutes($.fn.easyAudio.audio.currentTime);
      $('#show-time').html(time.minutes + ":" + time.seconds);
    });
  };

  $.fn.easyAudio.countDown = function() {
    $.fn.easyAudio.$audio.unbind('timeupdate');
    $.fn.easyAudio.$audio.bind('timeupdate', function() {
      var time = $.fn.easyAudio.formatSecondsToMinutes($.fn.easyAudio.audio.duration - $.fn.easyAudio.audio.currentTime);
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
