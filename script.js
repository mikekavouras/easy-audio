$(document).ready(function() {
  $('#trigger').easyAudio({
    src: 'audio/sub',
    onPlay: function() {
      console.log('playing');
    }
  });
});
