$(function() {
    $.ajax({
        type: "POST",
        url: "/delete/placed",

        success: function() {
            console.log("Hello Again");

            //show content
            alert("deletion successful");
            location.reload(true);
        }
    });
});