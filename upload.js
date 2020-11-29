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

$('#search').click(function() {
  var data = {'message': $('#transcript')[0].value}
  console.log(data)
  $.ajax({
    type: 'POST',
    url: 'https://1hceq7jgh7.execute-api.us-east-1.amazonaws.com/v0/search',
    crossDomain: true,
    headers: {'Content-Type': 'application/json'},
    data: JSON.stringify(data),
    dataType: "json"
  })
  .done(function(response){
    $('img').addClass('hidden')
    image_arr = response.imagePaths;
    if (image_arr.length > 0) {
      $('#image1').attr('src', image_arr[0]);
      $('#image1').removeClass('hidden')
    };
    if (image_arr.length > 1) {
      $('#image2').attr('src', image_arr[1]);
      $('#image2').removeClass('hidden')
    };
    if (image_arr.length > 2) {
      $('#image3').attr('src', image_arr[2]);
      $('#image3').removeClass('hidden')
    }
  })
})
