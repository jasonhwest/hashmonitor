/**
 * Performs the statistics summarization of the provided data
 * @return {Distribution}
 */
(function() {
  exports.Distribution = (function() {
    function Distribution(values) {
      this.values = values;
      this.sortedValues = this.values.slice(0);
      this.sortedValues.sort();
    }

    Distribution.prototype.count = function() {
      return this.values.length;
    };

    Distribution.prototype.sum = function() {
      var value, _i, _len, _ref;
      if (this.sumValue == null) {
        this.sumValue = 0;
        _ref = this.values;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          value = _ref[_i];
          this.sumValue += value;
        }
      }
      return this.sumValue;
    };

    Distribution.prototype.mean = function() {
      return this.meanValue || (this.meanValue = this.sum() / this.count());
    };

    Distribution.prototype.variance = function() {
      var mean, sumOfsquaredDiffsFromMean, value, _i, _len, _ref;
      if (this.varianceValue == null) {
        mean = this.mean();
        sumOfsquaredDiffsFromMean = 0;
        _ref = this.values;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          value = _ref[_i];
          sumOfsquaredDiffsFromMean += Math.pow(value - mean, 2);
        }
        this.varianceValue = sumOfsquaredDiffsFromMean / this.count();
      }
      return this.varianceValue;
    };

    Distribution.prototype.stddev = function() {
      return this.stddevValue || (this.stddevValue = Math.sqrt(this.variance()));
    };

    Distribution.prototype.percentile = function(percentile) {
      var indexOfPercentile;
      indexOfPercentile = Math.floor((percentile / 100) * this.sortedValues.length);
      return this.sortedValues[indexOfPercentile];
    };

    Distribution.prototype.min = function() {
      return this.sortedValues[0];
    };

    Distribution.prototype.max = function() {
      return this.sortedValues.slice(-1)[0];
    };

    return Distribution;

  })();

}).call(this);
