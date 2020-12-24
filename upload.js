$('#theButton').click(function() {
  var file = $('#theFile').get()[0].files[0];
  //console.log(file.name);
  data = {'name': file.name}
  $.ajax({
      type: 'PUT',
      url: "https://d9ib6pq9c7.execute-api.us-east-1.amazonaws.com/test/upload",
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

var image_arr = [];
var page = 0;

$('#search').click(function() {
  var data = {'message': $('#transcript')[0].value}
  console.log(data)
  $.ajax({
    type: 'POST',
    url: 'https://d9ib6pq9c7.execute-api.us-east-1.amazonaws.com/test/search',
    crossDomain: true,
    headers: {'Content-Type': 'application/json'},
    data: JSON.stringify(data),
    dataType: "json"
  })
  .done(function(response){
    $('img').addClass('hidden')
    image_arr = response.imagePaths;
    console.log(image_arr)
    page = 0;
    $('#prev').removeClass('hidden')
    $('#next').removeClass('hidden')
    display(page)
  })
})

function display(page) {
  $('img').addClass('hidden');
  $('#prev').prop('disabled', true);
  $('#next').prop('disabled', true);
  if (page>0) {
    $('#prev').prop('disabled', false);
  }
  const num = page * 3;
  if (image_arr.length > num) {
    $('#image1').attr('src', image_arr[num]);
    $('#image1').removeClass('hidden')
  };
  if (image_arr.length > num + 1) {
    $('#image2').attr('src', image_arr[num+1]);
    $('#image2').removeClass('hidden')
  };
  if (image_arr.length > num + 2) {
    $('#image3').attr('src', image_arr[num+2]);
    $('#image3').removeClass('hidden')
  }
  if (image_arr.length > num + 3) {
    $('#next').prop('disabled', false);
  }
}

$('#prev').click(function(){
  if (page>0) {
    page = page - 1
    display(page)
  }
})

$('#next').click(function(){
  page = page + 1
  display(page)
})
