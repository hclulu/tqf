$(function() {
    // Header animation
    var $win = $(window),
        $doc = $(document),
        $footer = $('#footer'),
        $car1 = $('#header-pc .car1'),
        $car2 = $('#header-pc .car2'),
        $airBall = $('#header-pc .air-ball'),
        $qGirl = $('#header-pc .Q-gril'),
        $qGirlTalk = $('#header-pc .Q-gril-talk'),
        $good = $('#header-pc .good'),
        $goGame = $('#header-pc .go-game'),
        $qBoy = $('#header-pc .Q-boy')
   
    var tw1 = new TweenMax.to($car1, 15, { left: '+=100%', repeat: -1, yoyo: true, ease: Linear.easeNone });
    var tw2 = new TweenMax.to($car2, 13, { left: '-=100%', repeat: -1, yoyo: true, ease: Linear.easeNone });
    var tw3 = new TweenMax.to($airBall, 1.5, { top: '+=8', repeat: -1, yoyo: true, ease: Linear.easeNone });
    var tw4 = new TweenMax.to($qGirl, 1, { top: '+=30', left: '-=22', repeat: -1, yoyo: true, repeatDelay: 0.8, ease: Sine.easeIn });
    var tw5 = new TweenMax.to($good, 0.6, { rotation: -8, repeat: -1, yoyo: true, repeatDelay: 0.5, ease: Back.easeOut });
    var tw6 = new TweenMax.to($goGame, 0.8, { rotation: 8, repeat: -1, yoyo: true, repeatDelay: 0.1, ease: Sine.easeInOut });
    var tw7 = new TweenMax.to($qBoy, 1, { top: '-=15', repeat: -1, yoyo: true, repeatDelay: 1, ease: Linear.easeNone });
    
    var tl = new TimelineMax()
        tl.add([tw1,tw2,tw3,tw4,tw5,tw6,tw7]);
    
    var data = {
        position: 0,
        interval: 0,
        scrollTop: 0,
        isIE8: navigator.userAgent.match(/MSIE 8.0/i),
        contentsHeight: $('#header-pc').height(),
        documentHeight: $doc.height()
    };

    $win.on('scroll', function(){
        data.scrollTop = $win.scrollTop();
        if($win.innerWidth() > 600){ //pc
            if(data.scrollTop > data.contentsHeight / 2){
                tl.pause();
            }else{
                tl.play();
            }
            if(data.scrollTop > data.documentHeight - 100 ){
                $footer.show();
            }else{
                $footer.hide();
            }
        }
        // console.log(data);
    })

    // function checkWidth(){
    //     if($win.innerWidth() < 600){
    //         tl.pause();
    //     }else{
    //         tl.play();
    //     }
    // }
    // $win.on('resize', checkWidth);
    // checkWidth();

    // Header house parallax
    $('#header-pc').parallax({
        'elements': [
            {
                'selector': '.house-front',
                'properties': {
                    'x': {
                        'left': {
                            'initial': 50,
                            'multiplier': 0.006,
                            'unit': '%'
                        }
                    }
                }
            },
            {
                'selector': '.house-back',
                'properties': {
                    'x': {
                        'left': {
                            'initial': 50,
                            'multiplier': 0.003,
                            'unit': '%'
                        }
                    }
                }
            }
        ]
    });

    // Tab menu
    var $tabMenu = $('.tab-menu'),
        $tabMenuA = $tabMenu.find('a')

    $tabMenuA.hover(function() {
        $(this).parent().find('.hover-item img').stop().animate({ 'top': 0 }, 300)
    }, function() {
        $(this).parent().find('.hover-item img').stop().animate({ 'top': '100%' }, 300)
    })
    $tabMenuA.click(function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        var offsetTop = 30;
        $('body,html').animate({ scrollTop: $(target).offset().top - offsetTop }, 600);
    })

    // scroll to section
    $('.scroll-to').click(function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        // var offsetTop = -42;
        // var offsetTop = 36;
        var offsetTop = 0;
        $('body,html').animate({ scrollTop: $(target).offset().top - offsetTop }, 600);
    })

    // 留資料抽大獎按鈕
    $('.popup-form-info').click(function(e) {
        e.preventDefault();
        $(".btn-submit-info").show();
    });

    // 上傳照片抽大獎按鈕
    $('.popup-form-upload').click(function(e) {
        e.preventDefault();
        $(".btn-submit-info").hide();
    });
    
    // Popup form 上傳照片抽大獎按鈕
    $(".btn-show-upload").click(function(e) {
        e.preventDefault();
        $("#form-upload").show();
        $(".btn-submit-info").hide();
    });

    $('.popup-form-info').magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        fixedBgPos: true,
        preloader: false,
        focus: '#name',
        callbacks: {
            beforeOpen: function() {
                if ($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#name';
                }
                $("#form-upload").hide();
            }
        }
    });

    $('.popup-form-upload').magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        fixedBgPos: true,
        preloader: false,
        focus: '#name',
        callbacks: {
            beforeOpen: function() {
                if ($(window).width() < 700) {
                    this.st.focus = false;
                } else {
                    this.st.focus = '#name';
                }
                $("#form-upload").show();
            }
        }
    });

    // Dialog
    $('.popup-modal').magnificPopup({
        type: 'inline',
        fixedContentPos: true,
        fixedBgPos: true,
        preloader: false,
        focus: '#username',
        modal: true
    });
    // $('.popup-modal').css({'position':'fixed'})
    $(document).on('click', '.popup-modal-dismiss', function (e) {
        e.preventDefault();
        $.magnificPopup.close();
    });
})
