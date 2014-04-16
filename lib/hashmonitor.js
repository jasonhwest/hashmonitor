/**
 * [description]
 * @return {[type]}
 */
(function() {
  var Distribution = require('./stats').Distribution;;
  var HASHTAG_REGEX = /\#([a-zA-Z][\w\d_\.]+)(?:(?:[\s'"]+|$)|\=(\-?\d+(?:\.\d+)?))/g;;
  var __hasProp = {}.hasOwnProperty;

  exports.HashMonitor = (function() {
    function HashMonitor() {
      this.pendingData = {};
    }

    HashMonitor.prototype.parse = function(line) {
      return process.nextTick((function(_this) {
        return function() {
          return line.replace(HASHTAG_REGEX, function(match, metric, value) {
            var _base;
            var _base1;
            if (value != null) {
              (_base = _this.pendingData)[metric] || (_base[metric] = []);
              return _this.pendingData[metric].push({
                'value': parseFloat(value)
              });
            } else {
              (_base1 = _this.pendingData)[metric] || (_base1[metric] = []);
              return _this.pendingData[metric].push({});
            }
          });
        };
      })(this));
    };

    HashMonitor.prototype.reset = function() {
      return this.pendingData = {};
    };

    HashMonitor.prototype.calculate = function() {
      var m;
      var metric;
      var metricEntries;
      var metricStats;
      var stats = {};
      var valueDist;

      for (metric in this.pendingData) {

        if (!__hasProp.call(this.pendingData, metric)) continue;

        metricEntries = this.pendingData[metric];

        valueDist = new Distribution((function() {
          var _i;
          var _len;
          var _results = [];

          for (_i = 0, _len = metricEntries.length; _i < _len; _i+=1) {
            m = metricEntries[_i];

            if ((m != null ? m.value : void 0) != null) {
              _results.push(m.value);
            }

          }

          return _results;

        })());

        metricStats = stats[metric] = {};
        metricStats.count = metricEntries.length;

        if (valueDist.count()) {
          metricStats.mean = valueDist.mean();
          metricStats.stddev = valueDist.stddev();
          metricStats.x01 = valueDist.percentile(1);
          metricStats.x10 = valueDist.percentile(10);
          metricStats.median = valueDist.percentile(50);
          metricStats.x90 = valueDist.percentile(90);
          metricStats.x99 = valueDist.percentile(99);
          metricStats.min = valueDist.min();
          metricStats.max = valueDist.max();
        }

      }
      return stats;
    };

    return HashMonitor;

  })();

}).call(this);
