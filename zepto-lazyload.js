/**
 * picLazyLoad
 * 枪枪
 * 2016-02-17
 */
;(function($){
    $.fn.picLazyLoad = function(settings){
        var $this = $(this),
            _winScrollTop = 0,
            _winHeight = $(window).height();
        settings = $.extend({
            threshold: 0,
            placeholder: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC'
        }, settings||{});
        lazyloadqq();
        $(window).on('scroll',function(){
            _winScrollTop = $(window).scrollTop();
            lazyloadqq();
        });
        function lazyloadqq(){
            $this.each(function(){
                var $self = $(this);
                if($self.is('img')){
                    if($self.attr('data-original')){
                        var _offsetTop = $self.offset().top;
                        if((_offsetTop - settings.threshold) <= (_winHeight + _winScrollTop)){
                            $self.attr('src',$self.attr('data-original'));
                            $self.removeAttr('data-original');
                        }
                    }
                }else{
                    if($self.attr('data-original')){
                        if($self.css('background-image') == 'none'){
                            console.log($self.css('background-image'));
                            $self.css('background-image','url('+settings.placeholder+')');
                        }
                        var _offsetTop = $self.offset().top;
                        if((_offsetTop - settings.threshold) <= (_winHeight + _winScrollTop)){
                            $self.css('background-image','url('+$self.attr('data-original')+')');
                            $self.removeAttr('data-original');
                        }
                    }
                }
            });
        }
    }
})(Zepto);

$('.lazyloadimg').picLazyLoad({
    threshold: -100,
    placeholder: 'http://7xnjgr.com5.z0.glb.qiniucdn.com/load-bg.png'
});


<img class="lazyloadimg" src="blank.png" data-original="original.jpg">
<div class="lazyloadimg" data-original="original.jpg"></div>