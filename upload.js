$('#theButton').click(function() {
  var file = $('#theFile').get()[0].files[0];
  //console.log(file.name);
  data = {'name': file.name}
  $.ajax({
      type: 'PUT',
      url: "https://1hceq7jgh7.execute-api.us-east-1.amazonaws.com/v0/upload",
      crossDomain: true,
      processData: false,
      headers: {'Content-Type': 'application/json'},
      data: JSON.stringify(data),
      //dataType: "json"
    })
    .done(function(response) {
      console.log(response);
      $.ajax({
          url: response,
          type: 'PUT',
          data: file,
          processData: false,
          contentType: false,
          headers: {
            'Content-Type': "image/jpeg" //'multipart/form-data'
          }
        })
        .done(function(r) {
          console.log(r)
        })
    });
});
