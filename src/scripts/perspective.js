(() => {
  'use strict';

  // element
  const $window = $(window);
  const $rootElement = $('.perspective');
  const $content = $('.perspective__main');
  const $contentInner = $('.perspective__inner');
  const $nav = $('.nav');
  const $navItems = $('.nav__item');

  const activeClass = 'is-active';
  const duration = 300;

  let scrollPositon;

  $content.click(() => {
    $rootElement.hasClass(activeClass) ? closeNavigation() : openNavigation();
  });

  function closeNavigation() {
    $rootElement.removeClass(activeClass); // *1
    $nav.removeClass(activeClass); // *1

    // アニメーション中ははみ出した要素を隠す *2
    $content.css({ overflow: 'hidden' });

    setTimeout(() => {

      // アニメーションが終了したら、スクロールできるようにするために
      // overflow: initialにする *1
      $content.css({ overflow: 'initial' });

      // スクロール位置を初期化する *3
      $contentInner.css({ transform: 'initial' });

      // ナビゲーションを開いたスクロール位置に戻す *4
      $window.scrollTop(scrollPositon);

      $navItems.css({ transform: 'translateX(0)' });

    }, duration);
  }

  function openNavigation() {
    // スクロール位置を記録 *4
    scrollPositon = $window.scrollTop();

    $rootElement.addClass(activeClass) // *1
    $nav.addClass(activeClass) // *1

    $content.css({ overflow: 'hidden' }); // *2

    // スクロールしていた場所でアニメーションさせる *3
    $contentInner.css({ transform: `translateY(-${scrollPositon}px)` });

    // ナビゲーションに右から現れるアニメーションをさせるために、
    // 位置を右に移す
    $navItems
      .css({ transform: 'translateX(-100%)' })
  }

  $('.nav__link').click(function (e) {
    e.preventDefault();

    closeNavigation();

    setTimeout(() => {
      const id = $(this).attr('href');
      const scrollPositon = $(id).offset().top;

      $('html, body').animate({ scrollTop: scrollPositon }, 300);

    }, duration);

  });


})();
