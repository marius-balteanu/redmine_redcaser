var Redcaser = Redcaser || {}

Redcaser.Location = (function () {

  // Instance stores a reference to the Location
  var instance;

  function init() {

    // Singleton
    function parseHashes() {
      var hashesObj = []
      var hashesString = getHashString()

      if (!hashesString) return hashesObj;

      hashesString.split("&").forEach(function (hashPair) {
        var hash = hashPair.substring(1).split("=")
        if (hash[1]) {
          hashesObj[hash[0]] = hash[1]
        }
      })

      return hashesObj
    }

    function getHashString() {
      return location.hash;
    }

    function updateHashes() {
      var hashes = createHashString()
      history.replaceState(undefined, undefined, "#" + hashes)
    }

    function createHashString() {
      var hashes = instance.hashes
      var hashString = [];

      for (var hash in hashes) {
         if (hashes.hasOwnProperty(hash)) {
            if (hash && hashes[hash]) {
              hashString.push(hash + "=" + hashes[hash])
            }
        }
      }

      return hashString.join("&")
    }

    return {
      // Public methods and variables
      addHash: function (key, value) {
        instance.hashes[key] = value
        updateHashes();
      },

      getHash: function (key) {
        if (instance.hashes[key]) {
          return instance.hashes[key]
        }
        return false
      },

      hashes: parseHashes()
    };

  };

  return {

    // Get the Singleton instance if one exists
    // or create one if it doesn't
    getInstance: function () {

      if ( !instance ) {
        instance = init();
      }

      return instance;
    }

  };

})();
