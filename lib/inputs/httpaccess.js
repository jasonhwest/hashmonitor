/**
 * Looks for matches against the provided key and returns the decoded values
 * @return {string} decoded hashmonitor value
 */
(function() {
  var DEFAULT_QUERYSTRING_KEY = 'hashmonitor';

  exports.HttpAccessLogParser = (function() {
    function HttpAccessLogParser(key) {
      key || (key = DEFAULT_QUERYSTRING_KEY);
      this.lineRegex = new RegExp("" + key + "\\=([^\\s\\&\\?\\#\\'\\\"$]+)");
    }

    HttpAccessLogParser.prototype.parse = function(line) {
      var error;
      var matches = line.match(this.lineRegex);

      if (matches) {
        try {
          return decodeURIComponent(matches[1]);
        } catch (_error) {
          error = _error;
          console.warn(error);
          return line;
        }
      } else {
        return line;
      }
    };

    return HttpAccessLogParser;

  })();

}).call(this);
