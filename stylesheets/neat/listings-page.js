//when the user goes to default route (homepage)

app.router.add('', function () {
  var listTemplate = _.template($('#etsyList').html(), { variable: 'm' });

  app.etsy.listings()
    .done(function (data) {
      // Let's put the data in the console so we can
      // explore it...
      console.log(data);
      $('.main-content').html(listTemplate({ items: data.results }));
    })
    .fail(function (req, status, err) {
      console.log(err);
      $('.main-content').text(err.error);
    });

});
