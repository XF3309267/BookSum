window.$$ = window.$$ || {};
$$.whichScreen = function() {
  var screenType;
  var w = $(window).width();
  if (w >= 1200) {
    return 4;
  } else if (w >= 992) {
    return 3;
  } else if (w >= 768) {
    return 2;
  } else {
    return 1;
  }
}



$(function() {
  var pageId;

  function navLineMove() {
    $(".bd-nav li").hover(function() {
      var nav_w = $(this).width();
      $(".sideline").stop(true);
      $(".sideline").animate({ left: $(this).position().left, width: nav_w }, 300);
    });
    $(".bd-nav").on('mouseleave', navLineInit);
  }

  if ($$.whichScreen() > 1) {
    navLineMove();
  }

  navLineInit();

  function navLineInit() {
    var nav_w = $(".bd-nav li").eq(0).width();
    $(".bd-nav li").siblings().removeClass('active');
    $(".bd-nav li").siblings().find('a').removeClass('pointer');
    pageId = $('body').attr('id');
    if (pageId == 'indexAdmin') {
      $('.bd-nav li').eq(0).addClass('active');
      $('.bd-nav li').eq(0).find('a').addClass('pointer');
    } else if (pageId == undefined || pageId == null) {
      $('.bd-nav li').eq(0).addClass('active');
    } else if (pageId == 'joinUs') {
      $('.bd-nav li').eq(2).addClass('active');
      $('.bd-nav li').eq(2).find('a').addClass('pointer');
    } else if (pageId == 'contactUs') {
      $('.bd-nav li').eq(3).addClass('active');
      $('.bd-nav li').eq(3).find('a').addClass('pointer');
    }
    $(".sideline").css({ width: nav_w }).stop(true).animate({ left: $('.active').position().left });
  }

  (function() {
    var before = document.body.scrollTop;
    var after;


    $(window).on('scroll', navHandler);


    function navHandler(e) {
      after = document.body.scrollTop;
      var inteval = after - before;

      if ($$.whichScreen() > 1) {
        // pc
        // $('.bd-content-nav').css('position', 'absolute').addClass('nav-show');
      } else {
        // 手机
        if (after > 200) {
          if (inteval < 0) {
            // 显示
            $('.bd-content-nav').addClass('nav-show');
          } else if (inteval > 0) {
            $('.bd-content-nav').removeClass('nav-show');
          }
        } else {
          $('.bd-content-nav').addClass('nav-show');
        }
      }
      before = after;
    }
  })();

  // mobile底部选项卡
  function mobileBottom() {
    $('.mobile-flex-box').click(function() {
      $(this).find('.mobile-bd-detail').toggle();
      $(this).siblings().find('.mobile-bd-detail').hide();
      $(this).find('.mobile-bd-bottom-content').toggleClass('mobile-color');
      $(this).siblings().find('.mobile-bd-bottom-content').removeClass('mobile-color');
      $(this).find('.mobile-arrow-up').toggle();
      $(this).find('.mobile-arrow-down').toggle();
      $(this).siblings().find('.mobile-arrow-up').show();
      $(this).siblings().find('.mobile-arrow-down').hide();
    });
  }

  $('.share-wechat').click(function() {
    $(this).siblings().find('.share-wechat-qrcode,.m-share-wechat-qrcode').removeClass('active');
    $(this).find('.share-wechat-qrcode,.m-share-wechat-qrcode').toggleClass('active');
  });

  mobileBottom();

  // h5  导航相关
  h5navInit();

  function h5navInit() {
    function SVG() {
      this.vg = Snap('#list');
      this.three = this.vg.paper.path('M0 2h44M0 42h44M0 22h44').attr({
        stroke: "#000",
        strokeWidth: 3
      });
      this.changeList = function(positive) {
        if (positive == 1) {
          this.three.animate({
            path: 'M0,44L44,0M0,0L44,44',
          }, 500, mina.easeinout);
        } else {
          this.three.animate({
            path: 'M0 2h44M0 42h44M0 22h44',
          }, 500, mina.easeinout);
        }
      }
    }
    var svg = new SVG();
    var $navList = $('.h5-nav-list');
    var $navMask = $('.h5-nav-mask');
    $('#list').on('click', function() {
      if ($navList.hasClass('h5-active')) {
        $navList.removeClass('h5-active');
        svg.changeList(2);
        $navMask.hide();
      } else {
        $navList.addClass('h5-active');
        svg.changeList(1);
        $navMask.show();
      }
    });
    $('.contact-list').on('click', function(){
      if(clickFlag){
        var listHref = $(this).attr('data-href');
        window.open(listHref);
      }
    });
    var x1,y1,x2,y2,d,clickFlag;
    $('.contact-list').mousedown(function(e){
      x1=e.pageX;
      y1=e.pageY;
    });
    $('.contact-list').mouseup(function(e){
      x2=e.pageX;
      y2=e.pageY;
      d = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
      if(d<=7){
        clickFlag = true;
      }else{
        clickFlag = false;
      }
    });
  }
  

});
