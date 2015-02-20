app.EtsyApi = function (spec) {
  if (!spec.apiKey) {
    throw new Error('An API key is required!');
  }


  var baseUrl = 'https://openapi.etsy.com/' + (spec.apiVersion || 'v2');
  /*
    declaring the fetch url function
    fetchUrl('http://my-webkit.com/stuff.json').done(function(data) {
    }).fail(error) {
    alert('the url sucks and it gvae us an error: ' + error);
    }

    If a promise resolves, it will call .done() on the returned object.
    If a promise is rejected, it will call .fail() on the returned object.
    Creates a promise and returns it, resolves .done (if $getJSON succeeds),
  */


  function fetchUrl(url) {
    var promise = $.Deferred();

      var req = $.getJSON(url).done(function (data) {
      if (!data.ok) {
        /*
        Keep our rejection in line with the standard jQuery
        rejection, passing req as first argument, status as second
        and error object as the third
        */

        promise.reject(req, 'Unknown error', data);
      } else {
        promise.resolve(data);
      }
    });

    return promise;
  }

  var self = {

    /*
      Declare a 'listings' function on the EtsyApi object. This will GET the listings data
      from the etsy API and return a promise that will resolve if the listings data is successfully fetched,
      and reject on failure.
    */

    listings: function () {
      var url = baseUrl + '/listings/active.js?includes=MainImage&api_key=' + spec.apiKey + '&callback=?';
      return fetchUrl(url);
    },

    /*
      Declare a 'userDetail' function on the EtsyApi object. This will GET the listings data
      from the etsy API and return a promise that will resolve if the listings data is successfully fetched,
      and reject on failure.
    */

    userDetail: function (userId) {
      // users/:user_id/profile
      var url = baseUrl + '/users/' + userId + '/profile.js?includes=MainImage&api_key=' + spec.apiKey + '&callback=?';
      return fetchUrl(url);
    }
  };

  return self;
};
