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

        // preserve the correct context when executing
        _createBackground.call(this)
        _createFilm.call(this)

    }

    SlideView.prototype = Object.create(View.prototype);
    SlideView.prototype.constructor = SlideView;

    SlideView.DEFAULT_OPTIONS = {
      size: [400, 450],
      filmBorder: 15
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

    function _createFilm(){
      // Create a slightly smaller surface on top of our polaroid background
      // This will be the black square
      this.options.filmSize = this.options.size[0] - 2 * this.options.filmBorder
      var film = new Surface({
        size: [this.options.filmSize, this.options.filmSize],
        properties: {
          backgroundColor: '#222',
          zIndex: 1
        }
      })

      var filmModifier = new StateModifier({
        // These origin and align settings will center the film renderable
        // in the view. It only works because we speicified a size.
        origin: [0.5, 0],
        align: [0.5, 0],
        // usually a good idea to set z-depth and z-index for crossbrowser
        // support
        transform: Transform.translate(0, this.options.filmBorder, 1)
      })

      this.mainNode.add(filmModifier).add(film)
    }

    module.exports = SlideView;
});
