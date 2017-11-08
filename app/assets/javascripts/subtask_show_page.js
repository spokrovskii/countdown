$(function() {
  $('a.show-form').click(function(event) {
    event.preventDefault();
    $('div#origin-form').show();
    $('div#travel-options').hide();
    $('div#save-origin').hide();
  });
});
