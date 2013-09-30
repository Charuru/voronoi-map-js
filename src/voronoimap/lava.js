'use strict';

var _ = require('lodash');
var cc = require('../as3/conversion-core');

module.exports = function () {
    return {

        // The lava array marks the edges that hava lava.
        lava: [], // Array<Boolean> edge index -> Boolean

        // Lava fissures are at high elevations where moisture is low
        createLava: function (map, randomDouble) {
            _(map.edges).each(function (edge) {
                if (!cc.booleanFromInt(edge.river) &&
                    !edge.d0.water && !edge.d1.water &&
                    edge.d0.elevation > 0.8 && edge.d1.elevation > 0.8 &&
                    edge.d0.moisture < 0.3 && edge.d1.moisture < 0.3 &&
                    randomDouble() < exports.FRACTION_LAVA_FISSURES) {

                    this.lava[edge.index] = true;
                }
            });
        }

    };
};

module.exports.FRACTION_LAVA_FISSURES = 0.2;  // 0 to 1, probability of fissure