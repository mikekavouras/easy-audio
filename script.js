$(document).ready(function() {
  $('#trigger').easyAudio({
    src: 'audio/tick',
    event: 'click'
  });
  $('#trigger').easyAudio({
    src: 'audio/knock',
    event: 'mouseenter'
  });
});
