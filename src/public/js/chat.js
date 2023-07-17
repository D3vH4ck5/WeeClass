const userId = window.location.pathname.substr(1);
console.log(userId);
var place = io(`http://fxgnmo.cafe24app.com/weeclass/chat`);
// receiving a message
place.on(`${userId}msg`, function (data) {
  var msgLine = $('<div class="msgLine">');
  var msgBox = $('<div class="msgBox">');
  msgBox.append(data);
  msgBox.css("display", "inline-block");
  msgLine.append(msgBox);
  $("#chatContent").append(msgLine);
  // auto scorll down when a user send something
  chatContent.scrollTop = chatContent.scrollHeight;
});

// sending a message
$("#myChat").on("keyup", function () {
  if (window.event.keyCode == 13 && $(this).val() != "") {
    var msgLine = $('<div class="msgLine">');
    var msgBox = $('<div class="msgBox">');
    msgBox.append($(this).val());
    msgBox.css("display", "inline-block");
    msgLine.css("text-align", "right");
    msgLine.append(msgBox);
    $("#chatContent").append(msgLine);
    place.emit(`${userId}msg`, $(this).val());
    $(this).val("");
    chatContent.scrollTop = chatContent.scrollHeight;
  }
});
