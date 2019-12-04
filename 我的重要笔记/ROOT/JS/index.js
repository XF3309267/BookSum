$(function() {
    window.inworkBgs = [];

    function changeBg() {
        var $workIndicator = $('#inwork-indicator');
        $(".J-inwork-item").hover(function() {
            var i = $(this).index();
            $workIndicator.removeClass().addClass('index' + (i + 1));

        });
    }

    function init() {
        changeBg();
        videoStoryInit();
        // h5InworkInit();
        // 
        $(function() {
            $('img.lazy').lazyload({
                effect: "fadeIn"
            });
        });
    }

    // video
    function videoStoryInit() {
        var videoStory = $('.video-item')[0];

        $('.video-link-wrap').on('click', function() {
            var vid = $(this).attr('vid');
            $('.video-mask[videoId="' + vid + '"]').show();
        });

        $('.close-video-mask').on('click', function() {
            $('.video-mask').hide();
            videoStory.pause();
        });
    }
    // var $outer = $('.outer');
    var $inner = $('.ourSearch-conten-bo .inner');
    var $inner2 = $('ourSearch-conten-bo .inner2');

    var length = 1200;
    var position = 0;
    var current = 0;
    var current2 = 0 - length;
    var step = 10;
    $inner.fadeIn();
    $inner2.fadeIn();
    interval();

    function interval() {
        var $inner = $('.ourSearch-conten-bo .inner');
        var $inner2 = $('ourSearch-conten-bo .inner2');
        if (current > length) {
            current = current - 2 * length;
        }
        if (current2 > length) {
            current2 = current2 - 2 * length;
        }
        if (position > length) {
            position = position - length;
        }
        $inner.css({
            'background-position': '-' + position + 'px 0',
            'transform': 'translate3d(' + current + 'px,0,0)'
                // 'left': current + 'px'
        });
        $inner2.css({
            'background-position': '-' + position + 'px 0',
            'transform': 'translate3d(' + current2 + 'px,0,0)'
                // 'left': current2 + 'px'
        });
        current += step;
        current2 += step;
        position += step;
        requestAnimationFrame(interval);
    }


    var speed = 20;
    var moveLength = $('.ourSearch-content-box1').width();
    var scrollContent = $('.ourSearch-content-box1').html();

    $('.ourSearch-conten-bo').append('<div class="ourSearch-content-box1">' + scrollContent + '</div>');
    var steps = 0;
    // var stap = 0;
    // var moveMod =0;
    function Marquee() {
        if (steps <= moveLength) {
            $('.ourSearch-conten-bo .ourSearch-content-box1').eq(0).animate({ marginLeft: -steps }, 1);
            steps += 1;
        } else {
            $('.ourSearch-conten-bo .ourSearch-content-box1').eq(0).remove();
            $('.ourSearch-conten-bo').append('<div class="ourSearch-content-box1">' + scrollContent + '</div>');
            steps = 1;
        }
    }
    var t = setInterval(Marquee, speed);
    $('.ourSearch-conten-bo').on('mouseover', '.hot-search', function() {
        clearInterval(t);
        $('.ourSearch-conten-bo .ourSearch-content-box1').eq(0).stop(true, true);
    });
    $('.ourSearch-conten-bo').on('mouseout', '.hot-search', function() {
        t = setInterval(Marquee, speed);
    });
    init();
});