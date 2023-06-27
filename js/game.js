$(function() {
    var $gAirBall = $('#obj-group .air-ball'),
        $gDoctor = $('#obj-group .doctor')

    TweenMax.to($gAirBall, 1.5, { top: '+=8', repeat: -1, yoyo: true, ease: Linear.easeNone });
    TweenMax.to($gDoctor, 1.5, { top: '+=5', repeat: -1, yoyo: true, ease: Linear.easeNone });
    
    // Opening
    var $s1_text = $('#scene1 .text'),
        $s1_tree = $('#scene1 .tree'),
        $s1_Qback = $('#scene1 .q-back'),
        $s1_Qfrond = $('#scene1 .q-front'),
        $s2_text = $('#scene2 .text'),
        $s2_factory = $('#scene2 .factory'),
        $s2_Qback = $('#scene2 .q-back'),
        $s2_Qfrond = $('#scene2 .q-front'),
        $s3_text = $('#scene3 .text'),
        $s3_deco = $('#scene3 .deco'),
        $s3_Qback = $('#scene3 .q-back')

    var tl = new TimelineLite();
    tl.pause();

    // Scene1
    tl
    .fromTo($s1_tree, 2, { x: '-=150%' }, { x: '+=150%', delay: 0, ease: Back.easeOut })
    .to($s1_Qback, 1.5, { y: '-=26', x: '-=45', scale: 0, delay: -0.3, ease: Linear.easeNone })
    .fromTo($s1_text, 1, { scale: 0 }, { scale: 1, delay: -0.4, ease: Back.easeOut })
    .fromTo($s1_Qfrond, 1, { y: '+=150%' }, { y: '-=150%', delay: -1, ease: Back.easeOut })
    .to($s1_text, 1, { scale: 0, delay: 4, ease: Back.easeOut })
    .to($s1_Qfrond, 1, { y: '+=150%', delay: -1, ease: Back.easeOut })
    .to($s1_tree, 2, { x: '+=250%', delay: -1, ease: Back.easeOut, 
        onStart:function(){
            // $('#scene1').hide();
            $('#scene2').show();
        } 
    })
    // Scene2
    .fromTo($s2_factory, 2, { x: '-=150%' }, { x: '+=150%', delay: -2, ease: Back.easeOut })
    .to($s2_Qback, 1.5, { y: '-=15', scale: 0, delay: 0, ease: Linear.easeNone })
    .fromTo($s2_text, 1, { scale: 0 }, { scale: 1, delay: -0.4, ease: Back.easeOut })
    .fromTo($s2_Qfrond, 1, { y: '+=150%' }, { y: '-=150%', delay: -1, ease: Back.easeOut })
    .to($s2_text, 1, { scale: 0, delay: 4, ease: Back.easeOut })
    .to($s2_Qfrond, 1, { y: '+=150%', delay: -1, ease: Back.easeOut })
    .to($s2_factory, 2, { x: '+=250%', delay: -1, ease: Back.easeOut,
        onStart:function(){
            // $('#scene2').hide();
            $('#scene3').show();
        } 
    })
    // Scene3
    .fromTo($s3_deco, 2, { x: '-=150%' }, { x: '+=150%', delay: -2, ease: Back.easeOut })
    .fromTo($s3_Qback, 2, { x: '-=300%' }, { x: '+=300%', delay: -2, ease: Back.easeOut })
    .fromTo($s3_text, 2, { left: '-=100%' }, { left: '+=100%', delay: -2, ease: Back.easeOut })
    
    // Start game
    $('#start-game').click(function(e) {
        e.preventDefault();
        $('#scene-start').hide();
        $('#scene1').show();
        tl.play(0);
        // document.getElementById('soundBg').volume = 0.1;
        document.getElementById('soundBg').play();
    });

    // Question
    // 選擇答案
    var $selectAnswer = $('.select-answer'),
        $question = $('.question'),
        $bingo = $('#bingo'),
        $wrong = $('#wrong'),
        $s6_Qboy = $('#scene6 .q-boy')
    
    $selectAnswer.click(function(e) {
        e.preventDefault();
        var result = $(this).attr('data-answer'),
            id = $(this).attr('data-id')

        answer(result, id);
    })
    
    function answer(result, id) {
        var $talk = $('#talk' + id),
            $next = $('#next' + id)

        if (result == 'true') {
            $question.hide();
            $next.show();
            $talk.show();
            $wrong.hide();
            $bingo.show();
            document.getElementById('soundBingo'+id).play();
            TweenMax.fromTo($bingo, 0.8, { y: 150 }, { y: 0, ease: Back.easeOut });
            TweenMax.fromTo($talk, 0.8, { y: 37 }, { y: 0, ease: Back.easeOut });
            TweenMax.fromTo($nextBtn, 0.8, { scale: 0 }, { scale: 1, ease: Back.easeOut });
            if(id == 2){
                $('.q-dot').hide();
            }else if (id == 3) {
                $('.q-girl-dot').hide();
            }else if(id == 4){
                $gDoctor.show();
                $('.q-boy-doctor').hide();
                $('.q-boy-juice').show();
                $('.q-boy-photo').show();
                $('#s6-Q-boy').addClass('photo');
                $('#s6-Q-juice').addClass('photo');
                $('#s6-text').attr('src', 'images/game/s6_text_result.png?v=1');
                TweenMax.fromTo($s6_Qboy, 1, { y: '+=100%' }, { y: '-=100%', delay: 0, ease: Back.easeOut })
                document.getElementById('soundSuccess').play();
                // setTimeout(function(){
                //     document.getElementById('soundSuccess').pause();
                // }, 3000)
                document.getElementById('soundSuccess').volume = 0.5;
                document.getElementById('soundBg').pause();
            }
        } else if (result == 'false') {
            $talk.hide();
            $wrong.show();
            $bingo.hide();
            document.getElementById('soundWrong'+id).play();
            TweenMax.fromTo($wrong, 0.8, { y: 150 }, { y: 0, ease: Back.easeOut });
            if (id == 4) {
                $('.q-boy-doctor').hide();
                $('.q-boy-juice').show();
            }
        }
    }

    // 下一題
    var $nextBtn = $('.next > .btn-next'),
        $scene = $('.scene'),
        $s4_deco = $('#scene4 .deco'),
        $s4_Qback = $('#scene4 .q-back'),
        $s5_Qboy = $('#scene5 .q-boy'),
        $s6_Qboy = $('#scene6 .q-boy')

    $nextBtn.click(function(e) {
        e.preventDefault();
        var target = $(this).attr('href'),
            id = $(this).attr('data-id'),
            prevSenceId = parseInt(id) + 2,
            $talk = $('#talk' + id),
            $next = $('#next' + id)

        if(id == 1){
            TweenMax.to($s3_deco, 2, { x: '+=200%', delay: 0, ease: Back.easeOut })
            TweenMax.to($s3_Qback, 2, { x: '+=500%', delay: 0, ease: Back.easeOut, 
                onStart:function(){
                    $bingo.hide();
                    $talk.hide();
                    $next.hide();
                    $(target).show();
                    $(target).find($question).show();
                    TweenMax.fromTo($s4_deco, 2, { x: '-=200%' }, { x: '+=200%', delay: 0, ease: Back.easeOut })
                    TweenMax.fromTo($s4_Qback, 2, { x: '-=200%' }, { x: '+=200%', delay: 0, ease: Back.easeOut })
                },
                onComplete: function(){
                    $('#scene' + prevSenceId).hide();
                    $(target).show();
                }
            })
        }else if(id == 2){
            TweenMax.to($s4_deco, 2, { x: '+=300%', delay: 0, ease: Back.easeOut })
            TweenMax.to($s4_Qback, 2, { x: '+=500%', delay: 0, ease: Back.easeOut, 
                onStart:function(){
                    $bingo.hide();
                    $talk.hide();
                    $next.hide();
                    $(target).show();
                    $(target).find($question).show();
                    TweenMax.fromTo($s5_Qboy, 2, { x: '-=150%' }, { x: '+=150%', delay: 0, ease: Back.easeOut })
                },
                onComplete: function(){
                    $('#scene' + prevSenceId).hide();
                    $(target).show();
                }
            })
        }else if(id == 3){
            TweenMax.to($s5_Qboy, 2, { x: '+=300%', delay: 0, ease: Back.easeOut, 
                onStart:function(){
                    $gDoctor.hide();
                    $bingo.hide();
                    $talk.hide();
                    $next.hide();
                    $(target).show();
                    $(target).find($question).show();
                    TweenMax.fromTo($s6_Qboy, 1, { y: '+=100%' }, { y: '-=100%', delay: 0, ease: Back.easeOut })
                },
                onComplete: function(){
                    $('#scene' + prevSenceId).hide();
                    $(target).show();
                }
            })
        }
    })

    $nextBtn.hover(function() {
        TweenMax.to($(this), 0.6, { scale: 1.15, ease: Back.easeOut });
    }, function() {
        TweenMax.to($(this), 0.4, { scale: 1, ease: Back.easeOut });
    })

    // 完成遊戲, 留資料抽大獎
    $('#btn-complete').click(function(e) {
        e.preventDefault();
        // document.getElementById('soundBg').pause();
    });

    var $iconSound = $('.icon-sound');
    
    if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))){
        $iconSound.hide();
    }else{
        $iconSound.show();
    }

    // 音效開關
    $iconSound.click(function(e) {
        e.preventDefault();

        if($(this).hasClass('on')){
            $(this).attr('class', 'icon-sound obj off');
            $(this).children('img').attr('src', 'images/game/icon_sound_off.png');
            document.getElementById('soundBg').muted=true;
            document.getElementById('soundBingo1').muted=true;
            document.getElementById('soundBingo2').muted=true;
            document.getElementById('soundBingo3').muted=true;
            document.getElementById('soundBingo4').muted=true;
            document.getElementById('soundWrong1').muted=true;
            document.getElementById('soundWrong2').muted=true;
            document.getElementById('soundWrong3').muted=true;
            document.getElementById('soundWrong4').muted=true;
            document.getElementById('soundSuccess').muted=true;
        }else{
            $(this).attr('class', 'icon-sound obj on');
            $(this).children('img').attr('src', 'images/game/icon_sound_on.png');
            document.getElementById('soundBg').muted=false;
            document.getElementById('soundBingo1').muted=false;
            document.getElementById('soundBingo2').muted=false;
            document.getElementById('soundBingo3').muted=false;
            document.getElementById('soundBingo4').muted=false;
            document.getElementById('soundWrong1').muted=false;
            document.getElementById('soundWrong2').muted=false;
            document.getElementById('soundWrong3').muted=false;
            document.getElementById('soundWrong4').muted=false;
            document.getElementById('soundSuccess').muted=false;
        }
    });

    // 音效
    var soundHTML = 
    '<audio id="soundBg" preload="metadata">\
    <source src="sound/Old_MacDonald_Instrumental.mp3">\
    </audio>\
    <audio id="soundBingo1" preload="metadata">\
    <source src="sound/Q1_bingo.mp3">\
    </audio>\
    <audio id="soundBingo2" preload="metadata">\
    <source src="sound/Q2_bingo.mp3">\
    </audio>\
    <audio id="soundBingo3" preload="metadata">\
    <source src="sound/Q3_bingo.mp3">\
    </audio>\
    <audio id="soundBingo4" preload="metadata">\
    <source src="sound/Q4_bingo.mp3">\
    </audio>\
    <audio id="soundWrong1" preload="metadata">\
    <source src="sound/Q1_wrong.mp3">\
    </audio>\
    <audio id="soundWrong2" preload="metadata">\
    <source src="sound/Q2_wrong.mp3">\
    </audio>\
    <audio id="soundWrong3" preload="metadata">\
    <source src="sound/Q3_wrong.mp3">\
    </audio>\
    <audio id="soundWrong4" preload="metadata">\
    <source src="sound/Q4_wrong.mp3">\
    </audio>\
    <audio id="soundSuccess" preload="metadata">\
    <source src="sound/clapping_bravo.mp3">\
    </audio>'

    $('body').append(soundHTML);
})








