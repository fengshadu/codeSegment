(function() {
    var $nav = $('.nav');
    var $aIndex = null;
    $nav.on('click','a', function() {
        
       /* if ( !$(this).hasClass('show') ){
            $(this).addClass('show');
            $aIndex = $(this).index();
            $('.content-r').find('blockquote').hide().eq($aIndex).show();
        } else {
            $(this).removeClass('show');
            $('.content-r').find('blockquote').eq($aIndex).hide();
        }*/
        
    });

})();