{
$(function() {
    //   SharePin用
    $("#close ,.overlay").on('click', function(){
        $(".contact").toggleClass("hidden");
        $(".specialthanks").toggleClass("hidden");
    })

    $(".btn").on('click', function(){
        $(".contact ,.overlay").removeClass("hidden");
    })

    // ハンバーガーメニュー用
    $('.menu-trigger').on('click', function() {
        $(this).toggleClass('active');
        $('#global-nav').toggleClass('active');
        //$(this).next().toggleClass('active');
    });
});

    // ロード画面
    window.onload = function() {
        const spinner = document.getElementById('loading');
        spinner.classList.add('loaded');
    }

}

