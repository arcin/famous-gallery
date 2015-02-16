/*** SlideView ***/

define(function(require, exports, module) {

    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface = require('famous/surfaces/ImageSurface')
    var Transitionable = require('famous/transitions/Transitionable')
    var SpringTransition = require('famous/transitions/SpringTransition')

    // Register spring transition
    Transitionable.registerMethod('spring', SpringTransition)

    var SlideData = require('data/SlideData')

    function SlideView() {

        View.apply(this, arguments);
        this.rootModifier = new StateModifier({
          /*
           * options is set based on any options passed
           * during instantiation and DEFAULT_OPTIONS
           * declared on this Type.
           */
          align: [0.5, 0],
          origin: [0.5, 0],
          size: this.options.size
        })

        // Save reference to this node.
        this.mainNode = this.add(this.rootModifier)

        // preserve the correct context when executing
        _createBackground.call(this)
        _createFilm.call(this)
        _createPhoto.call(this)
    }

    SlideView.prototype = Object.create(View.prototype);
    SlideView.prototype.constructor = SlideView;

    SlideView.prototype.fadeIn = function(){
      this.photoModifier.setOpacity(1, { duration: 1500, curve: 'easeIn' })
      this.shake()
    }

    SlideView.prototype.shake = function(){
      this.rootModifier.halt()

      // rotate slide back and forth
      this.rootModifier.setTransform(
        Transform.rotateX(this.options.angle),
        { duration: 200, curve: 'easeOut' }
      )

      // use spring transition to transform slide back to original state.
      // use a low damping ratio
      this.rootModifier.setTransform(
        Transform.identity,
        { method: 'spring', period: 600, dampingRation: 0.15 }
      )
    }

    SlideView.DEFAULT_OPTIONS = {
      size: [400, 450],
      filmBorder: 15,
      photoBorder: 3,
      photoUrl: SlideData.defaultImage,
      angle: -0.5
    };

    // helper function used to create background surface
    function _createBackground(){
        var backgroundSurface = new Surface({
          properties: {
            // The size of this surface will be inherited
            // from a parent modifier
            backgroundColor: '#FFFFF5',
            boxShadow: '0 10px 20px -5px rgba(0, 0, 0, 0.5)',
            cursor: 'pointer'
          }
        })
        this.mainNode.add(backgroundSurface)

        backgroundSurface.on('click', function(){
          // used by views to trigger events
          this._eventOutput.emit('click')
        }.bind(this))
    }

    function _createFilm(){
      // Create a slightly smaller surface on top of our polaroid background
      // This will be the black square
      this.options.filmSize = this.options.size[0] - 2 * this.options.filmBorder
      var film = new Surface({
        size: [this.options.filmSize, this.options.filmSize],
        properties: {
          backgroundColor: '#222',
          zIndex: 1,
          // the backgroundSurface is handling click events
          // so we'll turn them off on the other
          // surfaces
          pointerEvents: 'none'
        }
      })

      var filmModifier = new StateModifier({
        // These origin and align settings will center the film renderable
        // in the view. It only works because we speicified a size.
        origin: [0.5, 0],
        align: [0.5, 0],
        // usually a good idea to set z-depth and z-index for crossbrowser
        // support
        transform: Transform.translate(0, this.options.filmBorder, 0.05)
      })

      this.mainNode.add(filmModifier).add(film)
    }

    function _createPhoto(){
      var photoSize = this.options.filmSize - 2 * this.options.photoBorder
      var finalBorder = this.options.filmBorder + this.options.photoBorder

      var photo = new ImageSurface({
        size: [photoSize, photoSize],
        content: this.options.photoUrl,
        properties: {
          zIndex: 2,
          pointerEvents: 'none'
        }
      })

      this.photoModifier = new StateModifier({
        origin: [0.5, 0],
        align: [0.5, 0],
        transform: Transform.translate(0, finalBorder, 0.1),
        opacity: 0.01
      })

      this.mainNode.add(this.photoModifier).add(photo)
    }

    module.exports = SlideView;
});
