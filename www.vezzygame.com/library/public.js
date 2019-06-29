//Author: YeXDev
$(document).ready(function(){
    $('.buy').click(function(){
        var btn = $(this);
        var btnText = btn.html();
        var productid = btn.attr("type");
        var productlink = btn.attr("link");
        var btnWidth = btn.OuterWidth;
        btn.attr("disabled", "disabled").css("width", btnWidth).html('<i class="fas fa-sync-alt fa-spin"></i>');
        $.post(URL + "/library/ajax/stockcontrol.ajax.php", {stock: productid}, function(result){
            if(result == "OK") {
                window.location.href = productlink;
            } else {
                btn.removeAttr("disabled").html(btnText);
                btn.children(".waves-ripple").remove();
                alert("Bu ürünün stok adeti bitmiştir. Lütfen gün içinde tekrar deneyiniz.");
            }
        });
    });
});