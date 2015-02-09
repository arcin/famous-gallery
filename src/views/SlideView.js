/*** SlideView ***/

define(function(require, exports, module) {

    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function SlideView() {

        View.apply(this, arguments);
        this.rootModifier = new StateModifier({
          /*
           * options is set based on any options passed
           * during instantiation and DEFAULT_OPTIONS
           * declared on this Type.
           */
          size: this.options.size
        })

        // Save reference to this node.
        this.mainNode = this.add(this.rootModifier)

        // preserve the correct context when executing _createBackground
        _createBackground.call(this)

    }

    SlideView.prototype = Object.create(View.prototype);
    SlideView.prototype.constructor = SlideView;

    SlideView.DEFAULT_OPTIONS = {
      size: [400, 450]
    };

    // helper function used to create background surface
    function _createBackground(){
        var backgroundSurface = new Surface({
          properties: {
            // The size of this surface will be inherited
            // from a parent modifier
            backgroundColor: '#FFFFF5',
            boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)'
          }
        })
        this.mainNode.add(backgroundSurface)
    }

    module.exports = SlideView;
});
