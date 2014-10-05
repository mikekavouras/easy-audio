$(document).ready(function() {
  $('#trigger').easyAudio({
    src: 'audio/tick',
    event: 'click'
  });
  $('#trigger').easyAudio({
    src: 'audio/knock',
    event: 'mouseenter',
    conditions: [ function() { return 1 === 1; } ]
  });
});
