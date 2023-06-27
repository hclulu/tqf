$(function () {


  /*
   * IE detect
   *
   */
  var isIE = false;

  if (navigator.userAgent.indexOf ('MSIE') !== -1 || navigator.appVersion.indexOf ('Trident/') > 0)
    isIE = true;


  /*
   * Use jquery plugin: [twzipcode](https://code.essoduke.org/twzipcode/)
   *
   */
  $('.twzipcode').twzipcode ();


  /*
   * 對照片透過背景載入時做 loading envet 的處理（非 IE 瀏覽器移除 loading 效果）
   *
   */
  $('.background-loading').each (function () {

    var $this = $(this);

    if (isIE)
      $this.find ('span.loading').remove ();

    else {

      $('<img />').on ('load', function () {

        $this.find ('span.loading').fadeOut (1000);

      }).each (function () {

        if (this.complete)
          $(this).trigger ('load');

      }).attr ('src', $(this).css ('background-image'));
    }

  });


  var fileInputBuilt = false
    , previewReader  = new FileReader ()
    ;


  /*
   * 展開 modal 時延遲 500ms 產生 file input
   *
   */
  $('.popup-form-upload').click (function () {

    if (! fileInputBuilt) {

      fileInputBuilt = true;

      setTimeout (function () {

        $('.upload-view, .btn-upload').not ('.popup-form-upload').each (function () {

          var $this   = $(this)
            , $parent = $this.parent ()
            , $file   = $('<input type="file" name="photo-upload[]" />')
            ;

          thisPos = $this.offset ();
          parentPost = $parent.offset ();

          $file.css ({

            position: 'absolute',
            top:    thisPos.top - parentPost.top,
            left:   thisPos.left - parentPost.left,
            width:  $this.outerWidth (),
            height: $this.outerHeight (),
            cursor: 'pointer',
            zIndex:  999,
            opacity: 0

          });

          $this.parent ().css ('position', 'relative')
            .prepend ($file);

        });

      }, 500);
    }
  });


  /*
   * 選取檔案時清空另一個 file input，以免同時上傳兩份檔案
   *
   */
  $(document).on ('change', 'input[type="file"]', function (e) {

    if ($('input[type="file"]').eq (0).val () == '' && $('input[type="file"]').eq (1).val () == '')
      $('.upload-view').css ('background-image', "url('images/upload_view_default.gif')").find ('.loading').remove ();

    else if ($('input[type="file"]').not ($(this)).val () != '')
      $('input[type="file"]').not ($(this)).val ('');

    previewReader.readAsDataURL ($(this)[0].files[0]);
  });


  /*
   * 經由 FileReader 讀給 div.upload-view 的 background
   *
   */
  previewReader.onload = function (e) {
    $('.upload-view').css ({'background-image': 'url(' + e.target.result + ')', 'background-size': 'cover'});
  };


  /*
   * 送出資料
   *
   */
  $('.btn-submit-info, .btn-submit-upload').click (function (e) {
    return formSubmit (e);
  });

  $('#popup-form-info, #popup-form-upload').submit (function (e) {
    return formSubmit (e);
  });

  function formSubmit (e) {

    var $form, $button, _mode, _nick;

    if ($('#popup-form-info:visible').size () > 0) {
      $form   = $('#popup-form-info');
      $button = $('.btn-submit-info');
      _mode = 'signup';
    }

    else if ($('#popup-form-upload:visible').size () > 0) {
      $form   = $('#popup-form-upload');
      $button = $('.btn-submit-upload');
      _mode = 'upload';
    }

    else
      return false;

    e.stopPropagation ();
    e.stopImmediatePropagation ();
    e.preventDefault ();

    if ($form.data ('uploading') == true)
      return false;

    if ($form.find ('input[name="name"]').val () == '')
      return alert ('您尚未填寫姓名，請再確認。') || $form.find ('input[name="name"]').focus () == false;

    if ($form.find ('input[name="phone"]').val () == '')
      return alert ('您尚未填寫電話，請再確認。') || $form.find ('input[name="phone"]').focus () == false;

    else if (! $form.find ('input[name="phone"]').val ().match (/^[-()#*0-9]{7,}/))
      return alert ('您的電話資料格式有誤，請再確認。') || $form.find ('input[name="phone"]').focus () == false;

    if ($form.find ('select[name="county"]').val () == '')
      return alert ('您尚未選擇所在縣市，請再確認。') || $form.find ('select[name="county"]').focus () == false;

    if ($form.find ('select[name="district"]').val () == '')
      return alert ('您尚未選擇所在鄉鎮市區，請再確認。') || $form.find ('select[name="district"]').focus () == false;

    if ($form.find ('input[name="zipcode"]').val () == '')
      return alert ('您尚未填寫郵遞區號，請再確認。') || $form.find ('input[name="zipcode"]').focus () == false;

    if ($form.find ('input[name="address"]').val () == '')
      return alert ('您尚未填寫地址，請再確認。') || $form.find ('input[name="address"]').focus () == false;

    if ($form.find ('input[name="email"]').val () == '')
      return alert ('您尚未填寫 E-mail ，請再確認。') || $form.find ('input[name="email"]').focus () == false;

    else if (! $form.find ('input[name="email"]').val ().match (/^[\w+-.]+@(\w+\.)+[a-zA-Z]{2,}$/))
      return alert ('您的 E-mail 資料格式有誤，請再確認。') || $form.find ('input[name="email"]').focus () == false;


    if (_mode == 'upload') {

      if ($form.find ('input[name="nickname"]').val () == '')
        return alert ('您尚未填寫暱稱，請再確認。') || $form.find ('input[name="nickname"]').focus () == false;

      if ($form.find ('input[type="file"]').eq (0).val () == '' && $form.find ('input[type="file"]').eq (1).val () == '')
        return alert ('您尚未選擇要上傳的照片，請再確認。') || false;

      _nick = $form.find ('input[name="nickname"]').val ();
    }

    $form.data ('uploading', true);
    $button.css ('opacity', 0.5);

    if (_mode == 'upload')
      $('.upload-view').append ('<span class="loading">loading...</span>');

    $.ajax ({url: $button.data ('action'), type: "POST", data: (new FormData ($form[0])), cache: false, contentType: false, processData: false}).done (function (res) {

      $form.data ('uploading', false);
      
      // $form[0].reset ();

      $button.css ('opacity', 1).magnificPopup ({
        items: {
          src:  $button.attr ('href'),
          type: 'inline'
        }
      }).magnificPopup ('open');

      // $('.upload-view').css ('background-image', "url('images/upload_view_default.gif')").find ('.loading').remove ();

      if (_mode == 'upload') {

        var filename = res.split (':')[1];

        $('.photo-gallery').prepend (
          '<div class="photo-item">' +
          '<div class="photo background-loading" style="background-image:url(uploads/' + filename + ')"></div>' +
          '<h3>' + _nick + '</h3><p>TQF微笑標章，我的食安守門員！</p></div>'
          ).find ('.photo-item').last ().remove ();
      }

    }).fail (function (res) {

      if (res.responseText == 'Validation failed')
        alert ('資料錯誤：請檢查您的資料是否均有正確填寫。');

      else if (res.responseText == 'Duplicate email')
        alert ('Email 重複：此 Email 已完成報名，請再確認。');

      else if (res.responseText == 'File upload failed')
        alert ('上傳錯誤：您的照片並未成功上傳，請檢查您是否有選擇相照片，或更換一張容量較小的照片。');

      else
        alert ('資料錯誤，請稍後再次嘗試報名。');

      $form.data ('uploading', false);
      $button.css ('opacity', 1);

      $('.upload-view').find ('.loading').remove ();

    });
  };


  var sync = ['name', 'phone', 'county', 'district', 'zipcode', 'address', 'email']
    , $sync = $()
    ;

  for (i in sync)
    $sync = $sync.add ($('[name="' + sync[i] + '"]'));

  $sync.change (function () {

    var $this = $(this);

    if ($this.data ('ping'))
      return $this.data ('ping', false);

    $sync.filter ('[name="' + $this.attr ('name') + '"]').not ($this)
      .val ($this.val ())
      .data ('ping', true)
      .trigger ('change');
  });

});