$(document).ready(function(){
    $(document).on('click', 'a[href^="#"]', function (event) {
        event.preventDefault();
      $('html, body').animate({
            scrollTop: $($.attr(this, 'href')).offset().top - 75
        }, 'slow');
    });
});

var type = new Typed('#typingtext', {
    strings: ['Ucuz ve Güvenilir', 'Minecraft premium hesaplar', '100% Güvenli', '3500+ Mutlu müşteri', 'İndirim var!'],
    typeSpeed: 20,
    loop: true
});

$(".promo-code").on("click", function(e){
    var el = $(this);
    e.preventDefault();
    el.prev("input").css("display", "block");
    el.css("display", "none");
});
