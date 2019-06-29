function alertError(text) {
  $.notify(text,
    {
      background: "#e74c3c",
      color: "#fff",
      close: true,
      align:"right", verticalAlign:"top"
    }
  );
}

function alertSuccess(text) {
  $.notify(text, {
      background: "#2ecc71",
      color: "#fff",
      close: true,
      align:"right", verticalAlign:"top"
    }
  );
}

$(".requestForm").on("submit", function(){
  var form = $(this);
  var btn = form.find("button[type='submit']");
  var btnText = btn.html();
  var action = form.attr("action");
  var reloadpage = form.attr("data-reload-page"); 
  var reset = form.attr("on-submit-reset");
  var btnWidth = btn.outerWidth(); 
  btn.attr("disabled", "disabled").css("width", btnWidth).html('<i class="fas fa-sync-alt fa-spin"></i>');
  $.post(ADMIN_URL + action, form.serialize(), function(result){
    if(result.class != "success") {
      alertError(result.msg);
      btn.html(btnText).removeAttr("disabled");
    } else {
      alertSuccess(result.msg);
      if(reloadpage) {
        setTimeout(function(){
          window.location.href = ADMIN_URL + reloadpage;
        }, 1750);
        btn.html(btnText);
      } else {
        btn.html(btnText).removeAttr("disabled");
      }
      if(reset) {
        form[0].reset();
      }
    }
  }, "json");
});

function logOut() {
  $.post(ADMIN_URL + "/app/controller/user.controller.php", {logout:"logout"}, function(result){
    if(result.class != "success") {
      alertError(result.msg);
    } else {
      alertSuccess(result.msg);
      setTimeout(function(){
        window.location.href = URL;
      }, 1750);
    }
  }, "json");
}

$("#packetForm").on("submit", function () {
  var form = $(this);
  var btn = form.find("button[type='submit']");
  var btnText = btn.html();
  btn.attr("disabled", "disabled").html('<i class="fas fa-sync-alt fa-spin"></i>');
  $(".trumbowyg-textarea").html($(".trumbowyg-editor").html());
  $.ajax({
    url: ADMIN_URL + "/app/controller/packet.controller.php",
    type: "POST",
    data: new FormData(this),
    contentType: false,
    cache: false,
    processData:false,
    success: function(result) {
      var result = JSON.parse(result);
      if(result.class != "success") {
        alertError(result.msg);
        btn.html(btnText).removeAttr("disabled");
      } else {
        btn.html(btnText);
        form.find("input, textarea").val("");
        alertSuccess(result.msg);
        setTimeout(function(){
          window.location.href = ADMIN_URL+"/index.php?view=packets";
        }, 1200);
      }
    }
  });
});

function del(data_table, data_column, data_var, line, p) {
    swal({
    title: 'Emin misiniz?',
    text: "Bir satır silmek üzeresiniz!",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3498db',
    confirmButtonText: 'Evet',
    cancelButtonText: 'Hayır'
  }).then((result) => {
    if (result.value) {
      $.post(ADMIN_URL + "/app/ajax/delete.ajax.php", {table: data_table, column: data_column, var: data_var, p: p}, function (result) {
        if(result.class != "success") {
          alertError(result.msg);
        } else {
          alertSuccess(result.msg);
          line.closest("tr").remove();
        }
      }, "json");
    }
  })
}

$(".showFeatures").click(function(e){
  e.preventDefault();
  $.post(ADMIN_URL + "/app/ajax/getfeatures.ajax.php", {packet_id:  $(this).attr("data-id")}, function (result) {
    if(result.class == "success") {
      $("#infoModal .modal-body").html(result.msg);
      $("#infoModal").modal("show");
    } else {
      alertError(result.msg);
    }
  }, "json");
})

$(".showText").on("click",  function(e) {
  e.preventDefault();
  var text = $(this).attr("data-text");
  $("#infoModal .modal-body").html(text);
  $("#infoModal").modal("show");
});

$(".dataTable").on("click", ".showText", function(e) {
  e.preventDefault();
  var text = $(this).attr("data-text");
  $("#infoModal .modal-body").html(text);
  $("#infoModal").modal("show");
});

$(".packets-select a").each(function(){
  if ($(this).attr("href") == window.location.href){
     $(this).addClass("active");
  }
 });
