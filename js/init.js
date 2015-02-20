//init starts automatically, hence the name

(function () {
/*
  Set up a single instance of our Etsy API.
  Call app.EtsyApi in etsy-api.js
  The app.EtsyApi function returns an object which has two methods on it: `listings()` and `userDetail()`.
  Usage: `app.etsy.listings().done(function(data) {...})'*/

  app.etsy = app.EtsyApi({ apiKey:'r4t0of5kyu8yv2u9fvl6exlr' });

  // Makes our router function properly
  function processHash() {
    var hash = location.hash || '#';

    /*
    Add on the correct user with the hash.slice()
    hash === '#users/132'
    hash.slice(1) === 'users/132'*/

    if (!app.router.run(hash.slice(1))) {
      app.notFound();
    }
  }

  window.addEventListener('hashchange', processHash);
  processHash();
})();
