$(document).ready(function() {
  $('#trigger').easyAudio({
    src: 'audio/kiss',
    onPlay: function() {
      console.log('playing');
    }
  });
});
