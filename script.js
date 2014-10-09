$(document).ready(function() {
  $('#trigger').easyAudio({
    sound: 'audio/tick',
    event: 'click'
  });
  $('#trigger').easyAudio({
    sound: ['audio/knock','audio/pop'],
    event: 'mouseenter'
  });
});
