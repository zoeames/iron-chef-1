(function(){
  'use strict';

  $(document).ready(function(){
    $('#hide').click(hide);
    $('#show').click(show);
    $('form').submit(addRecipe);
  });

  function hide(){
    $('form').fadeOut();
  }


  function show(){
    $('form').fadeIn();
  }

  function addRecipe(e){
    var data = $('form').serialize(),
        type = $('form').attr('method'),
        url  = $('form').attr('action');

    $.ajax({url:url, type:type, data:data, dataType:'html', success:function(html){
      $('#recipes').prepend(html);
    }});

    e.preventDefault();
  }

})();

