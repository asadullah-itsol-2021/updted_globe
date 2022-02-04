var ASSETS_PATH = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/",
  DEFAULT = "default",
  IMAGE_SD = "sd",
  IMAGE_HD = "hd",
  COLOR_WHITE = 0xffffff,
  COLOR_BLACK = 0x000000,
  COLOR_BLACKA = 0x333333;
  COLOR_GREEN = 0x91c8d9;
  
// var coords = { x: 0, y: 0 }; // Start at (0, 0)

var hold = -1;
var earthhold = -1;
var sunhold = -1

// import tween from '@tweenjs/tween.js'
/**
 * Utils
 */
var Utils = {
  windowRatio: function () {
    return window.innerWidth / window.innerHeight;
  },
};

var value = false;
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

var Renderer = (function () {
  var _Renderer = function () {
    var self = this;

    var paramsDefault = function () {
      return {
        webGLRenderer: {
          antialias: false,
          alpha: true,
          clearColor: COLOR_BLACK,
          canvasId: "canvas-earth",
        },
      };
    };
    raycaster.setFromCamera(this.mouse, this.scene);
    var params = paramsDefault();

    this.init = function () {
      this.keepCurrentAntialias();

      // @see also THREE.CanvasRenderer()
      this.webGLRenderer = new THREE.WebGLRenderer({
        antialias: params.webGLRenderer.antialias,
        alpha: params.webGLRenderer.alpha,
      });

      this.webGLRenderer.setClearColor(params.webGLRenderer.clearColor);
      this.webGLRenderer.setPixelRatio(window.devicePixelRatio);
      this.webGLRenderer.domElement.id = params.webGLRenderer.canvasId;

      this.renderView();
    };

    this.refresh = function (antialias) {
      this.setParamAntialias(antialias);

      if (this.isAntialiasNotChanging()) {
        return;
      }

      this.keepCurrentAntialias();

      var canvasElement = document.getElementById(
        params.webGLRenderer.canvasId
      );
      document.body.removeChild(canvasElement);
      this.init();

      Scene.activeOrbitControls();
      SceneShadow.activeWebGLRendererShadowMap();
    };

    this.setParamAntialias = function (antialias) {
      params.webGLRenderer.antialias =
        antialias || paramsDefault().webGLRenderer.antialias;
    };

    this.keepCurrentAntialias = function () {
      params.webGLRenderer.previousAntialias = params.webGLRenderer.antialias;
    };

    this.isAntialiasNotChanging = function () {
      return (
        params.webGLRenderer.antialias ===
        params.webGLRenderer.previousAntialias
      );
    };

    this.renderView = function () {
      this.view = document.body;
      this.view.appendChild(this.webGLRenderer.domElement);
      this.updateSize();
    };

    this.updateSize = function () {
      this.webGLRenderer.setSize(window.innerWidth, window.innerHeight);
    };

    this.gui = {
      reset: function () {
        self.refresh();
      },

      add: function (gui) {
        var folderRenderer = gui.addFolder("RENDERER");

        folderRenderer
          .add(params.webGLRenderer, "antialias")
          .listen()
          .onChange(function (antialias) {
            self.refresh(antialias);
          });
      },
    };

    this.init();
  };

  return new _Renderer();
})();

/**
 * Camera
 */
var Camera = (function () {
  var _Camera = function () {
    var self = this;

    var paramsDefault = function () {
      return {
        perspectiveCamera: {
          positionX: 0,
          positionY: 0,
          positionZ: 150,
          // lerp:10,
          fov: 63,
          near: 1,
          far: 8000,
        },
      };
    };

    var params = paramsDefault();

    this.init = function () {
      this.perspectiveCamera = new THREE.PerspectiveCamera(
        params.perspectiveCamera.fov,
        Utils.windowRatio(),
        params.perspectiveCamera.near,
        params.perspectiveCamera.far
      );

      this.perspectiveCamera.position.set(
        params.perspectiveCamera.positionX,
        params.perspectiveCamera.positionY,
        params.perspectiveCamera.positionZ
      );
    };

    this.updateAspect = function () {
      this.perspectiveCamera.aspect = Utils.windowRatio();
      this.perspectiveCamera.updateProjectionMatrix();
    };

    this.updateLookAt = function (target) {
      this.perspectiveCamera.lookAt(100);
    };

    this.gui = {
      params: {
        colors: {},
      },

      reset: function () {
        var _default = paramsDefault();

        self.perspectiveCamera.fov = _default.perspectiveCamera.fov;
        self.perspectiveCamera.near = _default.perspectiveCamera.near;
        self.perspectiveCamera.far = _default.perspectiveCamera.far;

        self.updateAspect();
      },

      add: function (gui) {
        var folderCamera = gui.addFolder("CAMERA");

        folderCamera
          .add(self.perspectiveCamera, "fov", 0, 150)
          .listen()
          .onChange(function () {
            self.updateAspect();
          });

        folderCamera
          .add(self.perspectiveCamera, "near", 0, 5)
          .listen()
          .onChange(function () {
            self.updateAspect();
          });

        folderCamera
          .add(self.perspectiveCamera, "far", 0, 10000)
          .listen()
          .onChange(function () {
            self.updateAspect();
          });
       
        var ASSETS_PATH =
            "https://s3-us-west-2.amazonaws.com/s.cdpn.io/122460/",
          DEFAULT = "default",
          IMAGE_SD = "sd",
          IMAGE_HD = "hd",
          COLOR_WHITE = 0xffffff,
          COLOR_BLACK = 0x000000,
          COLOR_BLACKA = 0xdddddd;

        /**
         * Utils
         */
        var Utils = {
          windowRatio: function () {
            return window.innerWidth / window.innerHeight;
          },
        };

        /**
         * Renderer
         */
        var Renderer = (function () {
          var _Renderer = function () {
            var self = this;

            var paramsDefault = function () {
              return {
                webGLRenderer: {
                  antialias: false,
                  alpha: true,
                  clearColor: COLOR_BLACK,
                  canvasId: "canvas-earth",
                },
              };
            };

            var params = paramsDefault();

            this.init = function () {
              this.keepCurrentAntialias();

              // @see also THREE.CanvasRenderer()
              this.webGLRenderer = new THREE.WebGLRenderer({
                antialias: params.webGLRenderer.antialias,
                alpha: params.webGLRenderer.alpha,
              });

              this.webGLRenderer.setClearColor(params.webGLRenderer.clearColor);
              this.webGLRenderer.setPixelRatio(window.devicePixelRatio);
              this.webGLRenderer.domElement.id = params.webGLRenderer.canvasId;

              this.renderView();
            };

            this.refresh = function (antialias) {
              this.setParamAntialias(antialias);

              if (this.isAntialiasNotChanging()) {
                return;
              }

              this.keepCurrentAntialias();

              var canvasElement = document.getElementById(
                params.webGLRenderer.canvasId
              );
              document.body.removeChild(canvasElement);
              this.init();

              Scene.activeOrbitControls();
              SceneShadow.activeWebGLRendererShadowMap();
            };

            this.setParamAntialias = function (antialias) {
              params.webGLRenderer.antialias =
                antialias || paramsDefault().webGLRenderer.antialias;
            };

            this.keepCurrentAntialias = function () {
              params.webGLRenderer.previousAntialias =
                params.webGLRenderer.antialias;
            };

            this.isAntialiasNotChanging = function () {
              return (
                params.webGLRenderer.antialias ===
                params.webGLRenderer.previousAntialias
              );
            };

            this.renderView = function () {
              this.view = document.body;
              this.view.appendChild(this.webGLRenderer.domElement);
              this.updateSize();
            };

            this.updateSize = function () {
              this.webGLRenderer.setSize(window.innerWidth, window.innerHeight);
            };

            this.gui = {
              reset: function () {
                self.refresh();
              },

              add: function (gui) {
                var folderRenderer = gui.addFolder("RENDERER");

                folderRenderer
                  .add(params.webGLRenderer, "antialias")
                  .listen()
                  .onChange(function (antialias) {
                    self.refresh(antialias);
                  });
              },
            };

            this.init();
          };

          return new _Renderer();
        })();

        /**
         * Camera
         */
        var Camera = (function () {
          var _Camera = function () {
            var self = this;

            var paramsDefault = function () {
              return {
                perspectiveCamera: {
                  positionX: 0,
                  positionY: 0,
                  positionZ: 150,
                  fov: value ? 63 : 13,
                  near: 1,
                  far: 8000,
                },
              };
            };

            // function onMouseMove(event) {
            //   console.log(
            //     "🚀 ~ file: script.js ~ line 429 ~ onMouseMove ~ event",
            //     event,
            //     value
            //   );
            //   value = true;
            //   console.log(
            //     "🚀 ~ file: script.js ~ line 429 ~ onMouseMove ~ event",
            //     event,
            //     value
            //   );

            //   // calculate mouse position in normalized device coordinates
            //   // (-1 to +1) for both components

            //   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            //   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
            // }

            // window.addEventListener("click", onMouseMove, false);
            var params = paramsDefault();

            this.init = function () {
              this.perspectiveCamera = new THREE.PerspectiveCamera(
                params.perspectiveCamera.fov,
                Utils.windowRatio(),
                params.perspectiveCamera.near,
                params.perspectiveCamera.far
              );

              this.perspectiveCamera.position.set(
                params.perspectiveCamera.positionX,
                params.perspectiveCamera.positionY,
                params.perspectiveCamera.positionZ
              );
            };

            this.updateAspect = function () {
              this.perspectiveCamera.aspect = Utils.windowRatio();
              this.perspectiveCamera.updateProjectionMatrix();
            };

            this.updateLookAt = function (target) {
              this.perspectiveCamera.lookAt(-100);
            };

            this.gui = {
              params: {
                colors: {},
              },

              reset: function () {
                var _default = paramsDefault();

                self.perspectiveCamera.fov = _default.perspectiveCamera.fov;
                self.perspectiveCamera.near = _default.perspectiveCamera.near;
                self.perspectiveCamera.far = _default.perspectiveCamera.far;

                self.updateAspect();
              },

              add: function (gui) {
                var folderCamera = gui.addFolder("CAMERA");

                folderCamera
                  .add(self.perspectiveCamera, "fov", 0, 150)
                  .listen()
                  .onChange(function () {
                    self.updateAspect();
                  });

                folderCamera
                  .add(self.perspectiveCamera, "near", 0, 5)
                  .listen()
                  .onChange(function () {
                    self.updateAspect();
                  });

                folderCamera
                  .add(self.perspectiveCamera, "far", 0, 10000)
                  .listen()
                  .onChange(function () {
                    self.updateAspect();
                  });

                folderCamera.add(this, "reset").name("RESET CAMERA");

                return folderCamera;
              },
            };

            this.init();
          };

          return new _Camera();
        })();

        /**
         * Skymap
         */
        var Skymap = (function () {
          var _Skymap = function () {
            var self = this;

            var paramsDefault = function () {
              return {
                imgDef: IMAGE_HD,
                imgDefPrevious: undefined,
                cubeTextureLoader: {
                  positionTag: "{pos}",
                  positions: ["posx", "negx", "posy", "negy", "posz", "negz"],
                  filename: {
                    sd: "skymap_{pos}_512x512.jpg",
                    hd: "skymap_{pos}_1024x1024.jpg",
                  },
                },
              };
            };

            var params = paramsDefault();

            this.init = function () {};

            this.setParamImgDef = function (imgDef) {
              params.imgDef = imgDef || paramsDefault().imgDef;
            };

            this.setSceneBgCubeTexture = function (_scene, imgDef) {
              this.setParamImgDef(imgDef);
              if (this.doesRefreshTextureNecessary()) {
                _scene.background = this.getCubeTextureLoader();
                this.disableRefreshTexture();
              }
            };

            this.getCubeTextureLoader = function () {
              return new THREE.CubeTextureLoader()
                .setPath(ASSETS_PATH)
                .load(this.getFilenames());
            };

            this.getFilenames = function () {
              var filenames = [];

              for (
                var i = 0;
                i < params.cubeTextureLoader.positions.length;
                i++
              ) {
                filenames.push(
                  this.getFilename(params.cubeTextureLoader.positions[i])
                );
              }

              return filenames;
            };

            this.getFilename = function (position) {
              return params.cubeTextureLoader.filename[params.imgDef].replace(
                params.cubeTextureLoader.positionTag,
                position
              );
            };

            this.doesRefreshTextureNecessary = function () {
              return params.imgDef !== params.imgDefPrevious;
            };

            this.disableRefreshTexture = function () {
              params.imgDefPrevious = params.imgDef;
            };

            this.gui = {
              params: {},

              reset: function () {
                var _default = paramsDefault();
                self.setSceneBgCubeTexture(Scene.scene, _default.imgDef);
              },

              add: function (gui) {
                var folderSkymap = gui.addFolder("");

                folderSkymap
                  .add(params, "imgDef", [IMAGE_SD, IMAGE_HD])
                  .listen()
                  .onChange(function (imgDef) {
                    self.setSceneBgCubeTexture(Scene.scene, imgDef);
                  });

                folderSkymap.add(this, "reset").name("RESET SKYMAP");

                return folderSkymap;
              },
            };

            this.init();
          };

          return new _Skymap();
        })();

        /**
         * Cloud
         */
        var Cloud = (function () {
          var _Cloud = function () {
            var self = this;

            var paramsDefault = function () {
              return {
                imgDef: IMAGE_HD,
                imgDefPrevious: undefined,
                visible: false,
                material: {
                  wireframe: false,
                  transparent: true,
                  color: COLOR_BLACK,
                  bumpScale: 0.13,
                  opacity: 0.1,
                  alphaMap: {
                    sd:  "https://i.imgur.com/MeKgLts.jpg",
                    hd: "https://i.imgur.com/MeKgLts.jpg",
                  },
                  bumpMap: {
                    sd: ASSETS_PATH + "earth_clouds_2048x1024.jpg",
                    hd: ASSETS_PATH + "earth_clouds_2048x1024.jpg",
                  },
                },
                geometry: {
                  radius: 50.3,
                  widthSegments: 64,
                  heightSegments: 32,
                },
                animate: {
                  enabled: true,
                  rotationsYPerSecond: -0.0012,
                },
              };
            };

            var params = paramsDefault();

            this.init = function () {
              this.material = new THREE.MeshPhongMaterial({
                wireframe: params.material.wireframe,
                color: params.material.color,
                opacity: params.material.opacity,
                transparent: params.material.transparent,
                bumpScale: params.material.bumpScale,
              });

              this.setMaterialTextures();

              this.geometry = new THREE.SphereGeometry(
                params.geometry.radius,
                params.geometry.widthSegments,
                params.geometry.heightSegments
              );

              this.cloudMesh = new THREE.Mesh(this.geometry, this.material);
              this.cloudMesh.visible = params.visible;
            };

            this.animate = function (delta) {
              if (params.animate.enabled) {
                this.cloudMesh.rotation.y +=
                  delta * 2 * Math.PI * params.animate.rotationsYPerSecond;
              }
            };

            this.setParamImgDef = function (imgDef) {
              params.imgDef = imgDef || paramsDefault().imgDef;
            };

            this.setMaterialTextures = function (imgDef) {
              this.setParamImgDef(imgDef);

              if (this.doesRefreshTextureNecessary()) {
                this.material.alphaMap = new THREE.TextureLoader().load(
                  params.material.alphaMap[params.imgDef]
                );
                this.material.bumpMap = new THREE.TextureLoader().load(
                  params.material.bumpMap[params.imgDef]
                );
                this.disableRefreshTexture();
              }
            };

            this.doesRefreshTextureNecessary = function () {
              return params.imgDef !== params.imgDefPrevious;
            };

            this.disableRefreshTexture = function () {
              params.imgDefPrevious = params.imgDef;
            };

            this.gui = {
              params: {
                colors: {},
              },

              reset: function () {
                var _default = paramsDefault();

                self.cloudMesh.visible = _default.visible;

                self.material.wireframe = _default.material.wireframe;
                self.material.transparent = _default.material.transparent;
                self.material.opacity = _default.material.opacity;
                self.material.bumpScale = _default.material.bumpScale;
                self.material.color.setHex(_default.material.color);

                params.animate.enabled = _default.animate.enabled;
                params.animate.rotationsYPerSecond =
                  _default.animate.rotationsYPerSecond;

                self.setMaterialTextures(_default.imgDef);

                this.resetColorsHexString();
              },

              resetColorsHexString: function () {
                this.params.colors.color =
                  "#" + self.material.color.getHexString();
              },

              add: function (gui) {
                this.resetColorsHexString();

                var folderCloud = gui.addFolder("CLOUD");

                folderCloud.add(self.cloudMesh, "visible").listen();

                var folderMaterial = folderCloud.addFolder("Material");

                folderMaterial
                  .add(params, "imgDef", [IMAGE_SD, IMAGE_HD])
                  .listen()
                  .onChange(function (imgDef) {
                    self.setMaterialTextures(imgDef);
                  });

                folderMaterial.add(self.material, "wireframe").listen();

                folderMaterial.add(self.material, "transparent").listen();

                folderMaterial.add(self.material, "opacity", 0, 1).listen();

                folderMaterial
                  .add(self.material, "bumpScale", -1.5, 1.5)
                  .listen();

                folderMaterial
                  .addColor(this.params.colors, "color")
                  .listen()
                  .onChange(function (color) {
                    self.material.color.setHex(color.replace("#", "0x"));
                  });

                var folderAnimate = folderCloud.addFolder("Animate");

                folderAnimate.add(params.animate, "enabled").listen();

                folderAnimate
                  .add(params.animate, "rotationsYPerSecond", -2, 2)
                  .listen();

                folderCloud.add(this, "reset").name("RESET CLOUD");

                return folderCloud;
              },
            };

            this.init();
          };

          return new _Cloud();
        })();

        /**
         * Earth
         */
        var Earth = (function (Cloud) {
          var _Earth = function () {
            var self = this;

            var paramsDefault = function () {
              return {
                imgDef: IMAGE_HD,
                imgDefPrevious: undefined,
                visible: true,
                material: {
                  wireframe: false,
                  map: {
                    sd:'https://i.imgur.com/dfLCd19.jpg',
                    hd:'https://i.imgur.com/dfLCd19.jpg'
                    // sd: ASSETS_PATH + "earth_map_2048x1024.jpg",
                    // hd: ASSETS_PATH + "earth_map_2048x1024.jpg",
                  },
                  bumpMap: {
                    sd: ASSETS_PATH + "earth_bump_2048x1024.jpg",
                    hd: ASSETS_PATH + "earth_bump_2048x1024.jpg",
                  },
                  bumpScale: 0.35,
                  specularMap: {
                    sd:'https://i.imgur.com/MeKgLts.jpg',
                    hd:'https://i.imgur.com/MeKgLts.jpg'
                    // sd: ASSETS_PATH + "earth_specular_1024x512.jpg",
                    // hd: ASSETS_PATH + "earth_specular_2048x1024.jpg",
                  },
                  specular: 0x2d4ea0,
                  shininess: 6,
                },
                geometry: {
                  radius: 50,
                  widthSegments: 64,
                  heightSegments: 32,
                },
                animate: {
                  enabled: true,
                  rotationsYPerSecond: 0.01,
                },
              };
            };

            var params = paramsDefault();

            this.init = function () {
              this.geometry = new THREE.SphereGeometry(
                params.geometry.radius,
                params.geometry.widthSegments,
                params.geometry.heightSegments
              );

              this.material = new THREE.MeshPhongMaterial({
                wireframe: params.material.wireframe,
                bumpScale: params.material.bumpScale,
                specular: params.material.specular,
                shininess: params.material.shininess,
              });

              this.setMaterialTextures();

              this.earthMesh = new THREE.Mesh(this.geometry, this.material);
              this.earthMesh.visible = params.visible;

              this.earthMesh.add(Cloud.cloudMesh);
            };

            this.animate = function (delta) {
              if (params.animate.enabled) {
                this.earthMesh.rotation.y +=
                  delta * 2 * Math.PI * params.animate.rotationsYPerSecond;
              }
            };

            this.setParamImgDef = function (imgDef) {
              params.imgDef = imgDef || paramsDefault().imgDef;
            };

            this.setMaterialTextures = function (imgDef) {
              this.setParamImgDef(imgDef);

              if (this.doesRefreshTextureNecessary()) {
                this.material.map = new THREE.TextureLoader().load(
                  params.material.map[params.imgDef]
                );
                this.material.bumpMap = new THREE.TextureLoader().load(
                  params.material.bumpMap[params.imgDef]
                );
                this.material.specularMap = new THREE.TextureLoader().load(
                  params.material.specularMap[params.imgDef]
                );
                this.disableRefreshTexture();
              }
            };

            this.doesRefreshTextureNecessary = function () {
              return params.imgDef !== params.imgDefPrevious;
            };

            this.disableRefreshTexture = function () {
              params.imgDefPrevious = params.imgDef;
            };

            this.gui = {
              params: {
                colors: {},
              },

              reset: function () {
                var _default = paramsDefault();

                self.earthMesh.visible = _default.visible;

                self.material.wireframe = _default.material.wireframe;
                self.material.bumpScale = _default.material.bumpScale;
                self.material.shininess = _default.material.shininess;
                self.material.specular.setHex(_default.material.specular);

                params.animate.enabled = _default.animate.enabled;
                params.animate.rotationsYPerSecond =
                  _default.animate.rotationsYPerSecond;

                self.setMaterialTextures(_default.imgDef);

                this.resetColorsHexString();
              },

              resetColorsHexString: function () {
                this.params.colors.specular =
                  "#" + self.material.specular.getHexString();
              },

              add: function (gui) {
                this.resetColorsHexString();

                var folderEarth = gui.addFolder("EARTH");

                folderEarth.add(self.earthMesh, "visible").listen();

                var folderMaterial = folderEarth.addFolder("Material");

                folderMaterial
                  .add(params, "imgDef", [IMAGE_SD, IMAGE_HD])
                  .listen()
                  .onChange(function (imgDef) {
                    self.setMaterialTextures(imgDef);
                  });

                folderMaterial.add(self.material, "wireframe").listen();

                folderMaterial
                  .add(self.material, "bumpScale", -1.5, 1.5)
                  .listen();

                folderMaterial.add(self.material, "shininess", 0, 10).listen();

                folderMaterial
                  .addColor(this.params.colors, "specular")
                  .listen()
                  .onChange(function (color) {
                    self.material.specular.setHex(color.replace("#", "0x"));
                  });

                var folderAnimate = folderEarth.addFolder("Animate");

                folderAnimate.add(params.animate, "enabled").listen();

                folderAnimate
                  .add(params.animate, "rotationsYPerSecond", -2, 2)
                  .listen();

                folderEarth.add(this, "reset").name("RESET EARTH");

                return folderEarth;
              },
            };

            this.init();
          };

          return new _Earth();
        })(Cloud);

        /**
         * Moon
         */
        var Moon = (function (Earth) {
          var _Moon = function () {
            var self = this;

            var paramsDefault = function () {
              return {
                imgDef: IMAGE_HD,
                imgDefPrevious: undefined,
                moonMesh: {
                  visible: false,
                  position: {
                    x: 67,
                    y: -57,
                    z: 200,
                  },
                },
                material: {
                  wireframe: false,
                  map: {
                    sd: ASSETS_PATH + "moon_map_512x256.jpg",
                    hd: ASSETS_PATH + "moon_map_1024x512.jpg",
                  },
                  bumpMap: {
                    sd: ASSETS_PATH + "moon_bump_512x256.jpg",
                    hd: ASSETS_PATH + "moon_bump_1024x512.jpg",
                  },
                  bumpScale: 0.1,
                  shininess: 0,
                },
                geometry: {
                  radius: 10,
                  widthSegments: 32,
                  heightSegments: 16,
                },
                animate: {
                  enabled: false,
                  pivotRotationsPerSecond: 0.05,
                },
              };
            };

            var params = paramsDefault();

            this.init = function () {
              this.geometry = new THREE.SphereGeometry(
                params.geometry.radius,
                params.geometry.widthSegments,
                params.geometry.heightSegments
              );

              this.material = new THREE.MeshPhongMaterial({
                wireframe: params.material.wireframe,
                bumpScale: params.material.bumpScale,
                shininess: params.material.shininess,
              });

              this.setMaterialTextures();

              this.moonMesh = new THREE.Mesh(this.geometry, this.material);

              this.moonMesh.position.set(
                params.moonMesh.position.x,
                params.moonMesh.position.y,
                params.moonMesh.position.z
              );

              this.moonMesh.visible = params.moonMesh.visible;
              this.pivot = this.createPivot();
            };

            this.createPivot = function () {
              var pivot = new THREE.Object3D();
              pivot.position = Earth.earthMesh.position;
              pivot.add(this.moonMesh);

              return pivot;
            };

            this.animate = function (delta) {
              if (params.animate.enabled) {
                this.pivot.rotation.y +=
                  delta * 2 * Math.PI * params.animate.pivotRotationsPerSecond;
              }
            };

            this.setParamImgDef = function (imgDef) {
              params.imgDef = imgDef || paramsDefault().imgDef;
            };

            this.setMaterialTextures = function (imgDef) {
              this.setParamImgDef(imgDef);

              if (this.doesRefreshTextureNecessary()) {
                this.material.map = new THREE.TextureLoader().load(
                  params.material.map[params.imgDef]
                );
                this.material.bumpMap = new THREE.TextureLoader().load(
                  params.material.bumpMap[params.imgDef]
                );
                this.disableRefreshTexture();
              }
            };

            this.doesRefreshTextureNecessary = function () {
              return params.imgDef !== params.imgDefPrevious;
            };

            this.disableRefreshTexture = function () {
              params.imgDefPrevious = params.imgDef;
            };

            this.gui = {
              params: {
                colors: {},
              },

              reset: function () {
                var _default = paramsDefault();

                self.moonMesh.visible = _default.moonMesh.visible;

                self.material.wireframe = _default.material.wireframe;
                self.material.bumpScale = _default.material.bumpScale;
                self.material.shininess = _default.material.shininess;

                self.moonMesh.position.x = _default.moonMesh.position.x;
                self.moonMesh.position.y = _default.moonMesh.position.y;
                self.moonMesh.position.z = _default.moonMesh.position.z;

                params.animate.enabled = _default.animate.enabled;
                params.animate.pivotRotationsPerSecond =
                  _default.animate.pivotRotationsPerSecond;

                self.setMaterialTextures(_default.imgDef);
              },

              add: function (gui) {
                var folderMoon = gui.addFolder("MOON");

                folderMoon.add(self.moonMesh, "visible").listen();

                var folderPosition = folderMoon.addFolder("Position");

                folderPosition
                  .add(self.moonMesh.position, "x", -100, 100)
                  .listen();

                folderPosition
                  .add(self.moonMesh.position, "y", -100, 100)
                  .listen();

                folderPosition
                  .add(self.moonMesh.position, "z", -100, 100)
                  .listen();

                var folderMaterial = folderMoon.addFolder("Material");

                folderMaterial
                  .add(params, "imgDef", [IMAGE_SD, IMAGE_HD])
                  .listen()
                  .onChange(function (imgDef) {
                    self.setMaterialTextures(imgDef);
                  });

                folderMaterial.add(self.material, "wireframe").listen();

                folderMaterial
                  .add(self.material, "bumpScale", -1.5, 1.5)
                  .listen();

                folderMaterial.add(self.material, "shininess", 0, 10).listen();

                var folderAnimate = folderMoon.addFolder("Animate");

                folderAnimate.add(params.animate, "enabled").listen();

                folderAnimate
                  .add(params.animate, "pivotRotationsPerSecond", -2, 2)
                  .listen();

                folderMoon.add(this, "reset").name("RESET MOON");

                return folderMoon;
              },
            };

            this.init();
          };

          return new _Moon();
        })(Earth);

        /**
         * Sun
         */
        var Sun = (function () {
          var _Sun = function () {
            var self = this;

            var paramsDefault = function () {
              return {
                imgDef: IMAGE_HD,
                imgDefPrevious: undefined,
                sunLight: {
                  visible: true,
                  color: COLOR_WHITE,
                  intensity: 0,
                  position: {
                    x: -300,
                    y: 100,
                    z: -1000,
                  },
                },
                sunLensFlare: {
                  textures: {
                    sun: {
                      sd: ASSETS_PATH + "lens_flare_sun_512x512.jpg",
                      hd: ASSETS_PATH + "lens_flare_sun_1024x1024.jpg",
                    },
                    circle: {
                      sd: ASSETS_PATH + "lens_flare_circle_32x32.jpg",
                      hd: ASSETS_PATH + "lens_flare_circle_64x64.jpg",
                    },
                    hexagon: {
                      sd: ASSETS_PATH + "lens_flare_hexagon_128x128.jpg",
                      hd: ASSETS_PATH + "lens_flare_hexagon_256x256.jpg",
                    },
                  },
                  flareCircleSizeMax: 70,
                  lensFlares: [
                    {
                      size: 1400,
                      opacity: 1,
                      distance: 0,
                    },
                    {
                      size: 20,
                      opacity: 0.4,
                      distance: 0.63,
                    },
                    {
                      size: 40,
                      opacity: 0.3,
                      distance: 0.64,
                    },
                    {
                      size: 70,
                      opacity: 0.8,
                      distance: 0.7,
                    },
                    {
                      size: 110,
                      opacity: 0.7,
                      distance: 0.8,
                    },
                    {
                      size: 60,
                      opacity: 0.4,
                      distance: 0.85,
                    },
                    {
                      size: 30,
                      opacity: 0.4,
                      distance: 0.86,
                    },
                    {
                      size: 120,
                      opacity: 0.3,
                      distance: 0.9,
                    },
                    {
                      size: 260,
                      opacity: 0.4,
                      distance: 1,
                    },
                  ],
                },
              };
            };

            var params = paramsDefault();

            this.init = function () {
              this.textureLoader = new THREE.TextureLoader();
              this.sunLight = new THREE.DirectionalLight(
                params.sunLight.color,
                params.sunLight.intensity
              );

              this.sunLight.position.set(
                params.sunLight.position.x,
                params.sunLight.position.y,
                params.sunLight.position.z
              );

              this.sunLight.visible = params.sunLight.visible;

              this.createLensFlare();
              this.disableRefreshTexture();
            };

            this.setParamImgDef = function (imgDef) {
              params.imgDef = imgDef || paramsDefault().imgDef;
            };

            this.createLensFlare = function () {
              this.sunLensFlare = this.getSunLensFlare();
              this.sunLight.add(this.sunLensFlare);
            };

            this.getSunLensFlare = function () {
              this.loadLensFlareTextures();

              var sunLensFlare = new THREE.LensFlare(
                this.getTextureByIndex(0),
                params.sunLensFlare.lensFlares[0].size,
                params.sunLensFlare.lensFlares[0].distance,
                THREE.AdditiveBlending
              );

              return this.addLensFlareSunCirclesAndHexagons(sunLensFlare);
            };

            this.addLensFlareSunCirclesAndHexagons = function (sunLensFlare) {
              for (var i = 1; i < params.sunLensFlare.lensFlares.length; i++) {
                sunLensFlare.add(
                  this.getTextureByIndex(i),
                  params.sunLensFlare.lensFlares[i].size,
                  params.sunLensFlare.lensFlares[i].distance,
                  THREE.AdditiveBlending
                );
              }

              return sunLensFlare;
            };

            this.getTextureByIndex = function (index) {
              if (0 === index) {
                return this.textureFlareSun;
              }
              return params.sunLensFlare.lensFlares[index].size <
                params.sunLensFlare.flareCircleSizeMax
                ? this.textureFlareCircle
                : this.textureFlareHexagon;
            };

            this.loadLensFlareTextures = function () {
              this.textureFlareSun = this.textureLoader.load(
                params.sunLensFlare.textures.sun[params.imgDef]
              );
              this.textureFlareCircle = this.textureLoader.load(
                params.sunLensFlare.textures.circle[params.imgDef]
              );
              this.textureFlareHexagon = this.textureLoader.load(
                params.sunLensFlare.textures.hexagon[params.imgDef]
              );
            };

            this.refreshTextures = function (imgDef) {
              this.setParamImgDef(imgDef);

              if (this.doesRefreshTextureNecessary()) {
                this.loadLensFlareTextures();

                for (
                  var i = 0;
                  i < params.sunLensFlare.lensFlares.length;
                  i++
                ) {
                  this.sunLensFlare.lensFlares[i].texture =
                    this.getTextureByIndex(i);
                }

                this.disableRefreshTexture();
              }
            };

            this.doesRefreshTextureNecessary = function () {
              return params.imgDef !== params.imgDefPrevious;
            };

            this.disableRefreshTexture = function () {
              params.imgDefPrevious = params.imgDef;
            };

            this.gui = {
              params: {
                colors: {},
              },

              reset: function () {
                var _default = paramsDefault();

                self.sunLight.visible = _default.sunLight.visible;
                self.sunLight.intensity = _default.sunLight.intensity;
                self.sunLight.color.setHex(_default.sunLight.color);

                self.sunLight.position.x = _default.sunLight.position.x;
                self.sunLight.position.y = _default.sunLight.position.y;
                self.sunLight.position.z = _default.sunLight.position.z;

                for (
                  var i = 0;
                  i < params.sunLensFlare.lensFlares.length;
                  i++
                ) {
                  self.sunLensFlare.lensFlares[i].size =
                    _default.sunLensFlare.lensFlares[i].size;
                  self.sunLensFlare.lensFlares[i].opacity =
                    _default.sunLensFlare.lensFlares[i].opacity;
                  self.sunLensFlare.lensFlares[i].distance =
                    _default.sunLensFlare.lensFlares[i].distance;
                }

                this.resetColorsHexString();

                self.refreshTextures();
              },

              resetColorsHexString: function () {
                this.params.colors.color =
                  "#" + self.sunLight.color.getHexString();
              },

              add: function (gui) {
                this.resetColorsHexString();

                var folderSun = gui.addFolder("SUN");

                folderSun.add(self.sunLight, "visible").listen();

                var folderLight = folderSun.addFolder("Light");

                folderLight.add(self.sunLight, "intensity", 0, 10).listen();

                folderLight
                  .addColor(this.params.colors, "color")
                  .listen()
                  .onChange(function (color) {
                    self.sunLight.color.setHex(color.replace("#", "0x"));
                  });

                var folderPosition = folderSun.addFolder("Position");

                folderPosition
                  .add(self.sunLight.position, "x", -2000, 2000)
                  .listen();

                folderPosition
                  .add(self.sunLight.position, "y", -2000, 2000)
                  .listen();

                folderPosition
                  .add(self.sunLight.position, "z", -2000, 2000)
                  .listen();

                var folderLensFlares = folderSun.addFolder("LensFlares");

                folderLensFlares
                  .add(params, "imgDef", [IMAGE_SD, IMAGE_HD])
                  .listen()
                  .onChange(function (imgDef) {
                    self.refreshTextures(imgDef);
                  });

                for (var i = 0; i < self.sunLensFlare.lensFlares.length; i++) {
                  folderLensFlares
                    .add(self.sunLensFlare.lensFlares[i], "size", 0, 2000)
                    .name(i + ". size")
                    .listen();

                  folderLensFlares
                    .add(self.sunLensFlare.lensFlares[i], "opacity", 0, 1)
                    .name(i + ". opacity")
                    .listen();

                  folderLensFlares
                    .add(self.sunLensFlare.lensFlares[i], "distance", -1, 1)
                    .name(i + ". distance")
                    .listen();
                }

                folderSun.add(this, "reset").name("RESET SUN");

                return folderSun;
              },
            };

            this.init();
          };

          return new _Sun();
        })();

        var Sun2 = (function () {
          var _Sun2 = function () {
            var self = this;

            var paramsDefault = function () {
              return {
                imgDef: IMAGE_HD,
                imgDefPrevious: undefined,
                sunLight: {
                  visible: true,
                  color: COLOR_WHITE,
                  intensity: 0,
                  position: {
                    x: -680,
                    y: 240,
                    z: -1000,
                  },
                },
                sunLensFlare: {
                  textures: {
                    sun: {
                      sd: ASSETS_PATH + "lens_flare_sun_512x512.jpg",
                      hd: ASSETS_PATH + "lens_flare_sun_1024x1024.jpg",
                    },
                    circle: {
                      sd: ASSETS_PATH + "lens_flare_circle_32x32.jpg",
                      hd: ASSETS_PATH + "lens_flare_circle_64x64.jpg",
                    },
                    hexagon: {
                      sd: ASSETS_PATH + "lens_flare_hexagon_128x128.jpg",
                      hd: ASSETS_PATH + "lens_flare_hexagon_256x256.jpg",
                    },
                  },
                  flareCircleSizeMax: 70,
                  lensFlares: [
                    {
                      size: 100,
                      opacity: 1,
                      distance: 0,
                    },
                    {
                      size: 20,
                      opacity: 0.4,
                      distance: 0.63,
                    },
                    {
                      size: 40,
                      opacity: 0.3,
                      distance: 0.64,
                    },
                    {
                      size: 70,
                      opacity: 0.8,
                      distance: 0.7,
                    },
                    {
                      size: 110,
                      opacity: 0.7,
                      distance: 0.8,
                    },
                    {
                      size: 60,
                      opacity: 0.4,
                      distance: 0.85,
                    },
                    {
                      size: 30,
                      opacity: 0.4,
                      distance: 0.86,
                    },
                    {
                      size: 120,
                      opacity: 0.3,
                      distance: 0.9,
                    },
                    {
                      size: 260,
                      opacity: 0.4,
                      distance: 1,
                    },
                  ],
                },
              };
            };

            var params = paramsDefault();

            this.init = function () {
              this.textureLoader = new THREE.TextureLoader();
              this.sunLight = new THREE.DirectionalLight(
                params.sunLight.color,
                params.sunLight.intensity
              );

              this.sunLight.position.set(
                params.sunLight.position.x,
                params.sunLight.position.y,
                params.sunLight.position.z
              );

              this.sunLight.visible = params.sunLight.visible;

              this.createLensFlare();
              this.disableRefreshTexture();
            };

            this.setParamImgDef = function (imgDef) {
              params.imgDef = imgDef || paramsDefault().imgDef;
            };

            this.createLensFlare = function () {
              this.sunLensFlare = this.getSunLensFlare();
              this.sunLight.add(this.sunLensFlare);
            };

            this.getSunLensFlare = function () {
              this.loadLensFlareTextures();

              var sunLensFlare = new THREE.LensFlare(
                this.getTextureByIndex(0),
                params.sunLensFlare.lensFlares[0].size,
                params.sunLensFlare.lensFlares[0].distance,
                THREE.AdditiveBlending
              );

              return this.addLensFlareSunCirclesAndHexagons(sunLensFlare);
            };

            this.addLensFlareSunCirclesAndHexagons = function (sunLensFlare) {
              for (var i = 1; i < params.sunLensFlare.lensFlares.length; i++) {
                sunLensFlare.add(
                  this.getTextureByIndex(i),
                  params.sunLensFlare.lensFlares[i].size,
                  params.sunLensFlare.lensFlares[i].distance,
                  THREE.AdditiveBlending
                );
              }

              return sunLensFlare;
            };

            this.getTextureByIndex = function (index) {
              if (0 === index) {
                return this.textureFlareSun;
              }
              return params.sunLensFlare.lensFlares[index].size <
                params.sunLensFlare.flareCircleSizeMax
                ? this.textureFlareCircle
                : this.textureFlareHexagon;
            };

            this.loadLensFlareTextures = function () {
              this.textureFlareSun = this.textureLoader.load(
                params.sunLensFlare.textures.sun[params.imgDef]
              );
              this.textureFlareCircle = this.textureLoader.load(
                params.sunLensFlare.textures.circle[params.imgDef]
              );
              this.textureFlareHexagon = this.textureLoader.load(
                params.sunLensFlare.textures.hexagon[params.imgDef]
              );
            };

            this.refreshTextures = function (imgDef) {
              this.setParamImgDef(imgDef);

              if (this.doesRefreshTextureNecessary()) {
                this.loadLensFlareTextures();

                for (
                  var i = 0;
                  i < params.sunLensFlare.lensFlares.length;
                  i++
                ) {
                  this.sunLensFlare.lensFlares[i].texture =
                    this.getTextureByIndex(i);
                }

                this.disableRefreshTexture();
              }
            };

            this.doesRefreshTextureNecessary = function () {
              return params.imgDef !== params.imgDefPrevious;
            };

            this.disableRefreshTexture = function () {
              params.imgDefPrevious = params.imgDef;
            };

            this.gui = {
              params: {
                colors: {},
              },

              reset: function () {
                var _default = paramsDefault();

                self.sunLight.visible = _default.sunLight.visible;
                self.sunLight.intensity = _default.sunLight.intensity;
                self.sunLight.color.setHex(_default.sunLight.color);

                self.sunLight.position.x = _default.sunLight.position.x;
                self.sunLight.position.y = _default.sunLight.position.y;
                self.sunLight.position.z = _default.sunLight.position.z;

                for (
                  var i = 0;
                  i < params.sunLensFlare.lensFlares.length;
                  i++
                ) {
                  self.sunLensFlare.lensFlares[i].size =
                    _default.sunLensFlare.lensFlares[i].size;
                  self.sunLensFlare.lensFlares[i].opacity =
                    _default.sunLensFlare.lensFlares[i].opacity;
                  self.sunLensFlare.lensFlares[i].distance =
                    _default.sunLensFlare.lensFlares[i].distance;
                }

                this.resetColorsHexString();

                self.refreshTextures();
              },

              resetColorsHexString: function () {
                this.params.colors.color =
                  "#" + self.sunLight.color.getHexString();
              },

              add: function (gui) {
                this.resetColorsHexString();

                var folderSun = gui.addFolder("SUN");

                folderSun.add(self.sunLight, "visible").listen();

                var folderLight = folderSun.addFolder("Light");

                folderLight.add(self.sunLight, "intensity", 0, 10).listen();

                folderLight
                  .addColor(this.params.colors, "color")
                  .listen()
                  .onChange(function (color) {
                    self.sunLight.color.setHex(color.replace("#", "0x"));
                  });

                var folderPosition = folderSun.addFolder("Position");

                folderPosition
                  .add(self.sunLight.position, "x", -2000, 2000)
                  .listen();

                folderPosition
                  .add(self.sunLight.position, "y", -2000, 2000)
                  .listen();

                folderPosition
                  .add(self.sunLight.position, "z", -2000, 2000)
                  .listen();

                var folderLensFlares = folderSun.addFolder("LensFlares");

                folderLensFlares
                  .add(params, "imgDef", [IMAGE_SD, IMAGE_HD])
                  .listen()
                  .onChange(function (imgDef) {
                    self.refreshTextures(imgDef);
                  });

                for (var i = 0; i < self.sunLensFlare.lensFlares.length; i++) {
                  folderLensFlares
                    .add(self.sunLensFlare.lensFlares[i], "size", 0, 2000)
                    .name(i + ". size")
                    .listen();

                  folderLensFlares
                    .add(self.sunLensFlare.lensFlares[i], "opacity", 0, 1)
                    .name(i + ". opacity")
                    .listen();

                  folderLensFlares
                    .add(self.sunLensFlare.lensFlares[i], "distance", -1, 1)
                    .name(i + ". distance")
                    .listen();
                }

                folderSun.add(this, "reset").name("RESET SUN");

                return folderSun;
              },
            };

            this.init();
          };

          return new _Sun2();
        })();
        /**
         * Scene
         */
        var Scene = (function () {
          var _Scene = function () {
            var self = this;

            var paramsDefault = function () {
              return {
                orbitControls: {
                  autoRotate: true,
                  autoRotateSpeed: 0.07,
                },
              };
            };

            var params = paramsDefault();

            this.init = function () {
              this.scene = new THREE.Scene();
              this.scene.add(Earth.earthMesh);
              this.scene.add(Moon.pivot);
              // this.scene.add(Sun.sunLight);
              this.scene.add(Sun2.sunLight);

              Skymap.setSceneBgCubeTexture(this.scene);

              this.activeOrbitControls();
            };

            this.activeOrbitControls = function () {
              this.orbitControls = new THREE.OrbitControls(
                Camera.perspectiveCamera,
                Renderer.webGLRenderer.domElement
              );

              this.applyParamsOrbitControlsAutoRotate();
              this.applyParamsOrbitControlsAutoRotateSpeed();

              this.orbitControls.enableDamping = true;
            };

            this.applyParamsOrbitControlsAutoRotate = function () {
              this.orbitControls.autoRotate = params.orbitControls.autoRotate;
            };

            this.applyParamsOrbitControlsAutoRotateSpeed = function () {
              this.orbitControls.autoRotateSpeed =
                params.orbitControls.autoRotateSpeed;
            };

            this.refreshOrbitControls = function () {
              this.activeOrbitControls();
              this.gui.reset();
            };

            this.gui = {
              params: {
                colors: {},
              },

              reset: function () {
                var _default = paramsDefault();

                params.orbitControls.autoRotate =
                  _default.orbitControls.autoRotate;
                params.orbitControls.autoRotateSpeed =
                  _default.orbitControls.autoRotateSpeed;

                self.applyParamsOrbitControlsAutoRotate();
                self.applyParamsOrbitControlsAutoRotateSpeed();
              },

              add: function (gui) {
                var folderOrbitControls = gui.addFolder("ORBIT CONTROLS");

                folderOrbitControls
                  .add(params.orbitControls, "autoRotate")
                  .listen()
                  .onChange(function (value) {
                    self.applyParamsOrbitControlsAutoRotate();
                  });

                folderOrbitControls
                  .add(params.orbitControls, "autoRotateSpeed", -1, 1)
                  .listen()
                  .onChange(function (value) {
                    self.applyParamsOrbitControlsAutoRotateSpeed();
                  });

                folderOrbitControls.add(this, "reset").name("RESET CONTR.");

                return folderOrbitControls;
              },
            };

            this.init();
          };

          return new _Scene();
        })();

        /**
         * SceneShadow
         */
        var SceneShadow = (function (Scene) {
          var _SceneShadow = function () {
            var self = this;

            var paramsDefault = function () {
              return {
                cameraHelper: {
                  visible: false,
                },
                shadow: {
                  castShadow: false,
                  camera: {
                    near: 950,
                    far: 1250,
                    right: 150,
                    left: -150,
                    top: 150,
                    bottom: -150,
                  },
                  mapSize: {
                    width: 512,
                    height: 512,
                  },
                  bias: 0,
                },
              };
            };

            var params = paramsDefault();

            this.init = function () {
              this.setShadowConfiguration();
            };

            this.setShadowConfiguration = function () {
              this.cameraHelper = new THREE.CameraHelper(
                Sun.sunLight.shadow.camera
              );
              Scene.scene.add(this.cameraHelper);
              this.cameraHelper.visible = params.cameraHelper.visible;

              Sun.sunLight.castShadow = params.shadow.castShadow;
              Sun.sunLight.shadow.camera.near = params.shadow.camera.near;
              Sun.sunLight.shadow.camera.far = params.shadow.camera.far;
              Sun.sunLight.shadow.mapSize.width = params.shadow.mapSize.width;
              Sun.sunLight.shadow.mapSize.height = params.shadow.mapSize.height;
              Sun.sunLight.shadow.bias = params.shadow.bias;

              Sun.sunLight.shadow.camera.right = params.shadow.camera.right;
              Sun.sunLight.shadow.camera.left = params.shadow.camera.left;
              Sun.sunLight.shadow.camera.top = params.shadow.camera.top;
              Sun.sunLight.shadow.camera.bottom = params.shadow.camera.bottom;

              Earth.earthMesh.castShadow = true;
              Earth.earthMesh.receiveShadow = true;

              Cloud.cloudMesh.receiveShadow = true;

              Moon.moonMesh.castShadow = true;
              Moon.moonMesh.receiveShadow = true;

              this.activeWebGLRendererShadowMap();

              this.updateShadow();
            };

            this.activeWebGLRendererShadowMap = function () {
              Renderer.webGLRenderer.shadowMap.enabled = true;
              Renderer.webGLRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
              Renderer.webGLRenderer.shadowMapSoft = true;
            };

            this.updateShadow = function () {
              Sun.sunLight.shadow.camera.updateProjectionMatrix();
              this.cameraHelper.update();
            };

            this.gui = {
              params: {
                colors: {},
              },

              reset: function () {
                var _default = paramsDefault();

                //self.cameraHelper.visible = _default.cameraHelper.visible;

                Sun.sunLight.castShadow = _default.shadow.castShadow;
                Sun.sunLight.shadow.camera.near = _default.shadow.camera.near;
                Sun.sunLight.shadow.camera.far = _default.shadow.camera.far;
                Sun.sunLight.shadow.mapSize.width =
                  _default.shadow.mapSize.width;
                Sun.sunLight.shadow.mapSize.height =
                  _default.shadow.mapSize.height;
                Sun.sunLight.shadow.bias = _default.shadow.bias;

                Sun.sunLight.shadow.camera.right = _default.shadow.camera.right;
                Sun.sunLight.shadow.camera.left = _default.shadow.camera.left;
                Sun.sunLight.shadow.camera.top = _default.shadow.camera.top;
                Sun.sunLight.shadow.camera.bottom =
                  _default.shadow.camera.bottom;

                self.updateShadow();
              },

              add: function (gui) {
                var folderShadow = gui.addFolder("SHADOW");

                folderShadow
                  .add(self.cameraHelper, "visible")
                  .name("cameraHelper")
                  .listen();

                folderShadow.add(Sun.sunLight, "castShadow").listen();

                folderShadow
                  .add(Sun.sunLight.shadow.camera, "near")
                  .step(10)
                  .listen()
                  .onChange(function () {
                    self.updateShadow();
                  });

                folderShadow
                  .add(Sun.sunLight.shadow.camera, "far")
                  .step(10)
                  .listen()
                  .onChange(function () {
                    self.updateShadow();
                  });

                folderShadow
                  .add(Sun.sunLight.shadow.mapSize, "width", 0, 2048)
                  .listen();

                folderShadow
                  .add(Sun.sunLight.shadow.mapSize, "height", 0, 2048)
                  .listen();

                folderShadow
                  .add(Sun.sunLight.shadow, "bias", 0, 0.4)
                  .step(0.001)
                  .listen()
                  .onChange(function () {
                    self.updateShadow();
                  });

                folderShadow
                  .add(Sun.sunLight.shadow.camera, "right")
                  .step(10)
                  .listen()
                  .onChange(function () {
                    self.updateShadow();
                  });

                folderShadow
                  .add(Sun.sunLight.shadow.camera, "left")
                  .step(10)
                  .listen()
                  .onChange(function () {
                    self.updateShadow();
                  });

                folderShadow
                  .add(Sun.sunLight.shadow.camera, "top")
                  .step(10)
                  .listen()
                  .onChange(function () {
                    self.updateShadow();
                  });

                folderShadow
                  .add(Sun.sunLight.shadow.camera, "bottom")
                  .step(10)
                  .listen()
                  .onChange(function () {
                    self.updateShadow();
                  });

                folderShadow.add(this, "reset").name("RESET SHADOW");

                return folderShadow;
              },
            };

            this.init();
          };

          return new _SceneShadow();
        })(Scene);

        /**
         * View
         */
        var View = (function () {
          var self = this,
            clock,
            delta;

          var params = {
            imgDef: DEFAULT,
            helpClassname: "help",
          };

          var _View = function () {
            this.init = function () {
              clock = new THREE.Clock();

              this.updateAll();
              this.addGui();
              this.help();

              animate();

              window.addEventListener("resize", this.updateAll, false);
            };

            this.addGui = function () {
              var gui = new dat.GUI();

              Scene.gui.add(gui);
              Camera.gui.add(gui);
              Skymap.gui.add(gui);
              Sun.gui.add(gui);
              folderEarth = Earth.gui.add(gui);
              Cloud.gui.add(folderEarth);
              Moon.gui.add(gui);
              SceneShadow.gui.add(gui);
              Renderer.gui.add(gui);

              gui
                .add(params, "imgDef", [DEFAULT, IMAGE_HD, IMAGE_HD])
                // .name("IMG DEF ALL")
                .listen()
                .onChange(function (imgDef) {
                  imgDef = DEFAULT === imgDef ? undefined : imgDef;

                  Sun.refreshTextures(imgDef);
                  Skymap.setSceneBgCubeTexture(Scene.scene, imgDef);
                  Earth.setMaterialTextures(imgDef);
                  Cloud.setMaterialTextures(imgDef);
                  Moon.setMaterialTextures(imgDef);
                });

              // gui.add(this, "resetAll").name("RESET ALL");
              // gui.add(this, "help").name("(?) HELP");
            };

            this.resetAll = function () {
              params.imgDef = DEFAULT;

              Renderer.gui.reset();
              Scene.gui.reset();
              Camera.gui.reset();
              Skymap.gui.reset();
              Sun.gui.reset();
              Earth.gui.reset();
              Cloud.gui.reset();
              Moon.gui.reset();
              SceneShadow.gui.reset();
            };

            this.updateAll = function () {
              Camera.updateAspect();
              Renderer.updateSize();
            };

            this.help = function () {
              var helpElementStyle = document.getElementsByClassName(
                params.helpClassname
              )[0].style;
              helpElementStyle.display = this.helpHideToggle(
                helpElementStyle.display
              );
            };

            this.helpHideToggle = function (value) {
              return "none" === value ? "block" : "none";
            };

            var animate = function () {
              requestAnimationFrame(animate);

              delta = clock.getDelta();

              Earth.animate(delta);
              Cloud.animate(delta);
              Moon.animate(delta);

              Scene.orbitControls.update();
              Renderer.webGLRenderer.render(
                Scene.scene,
                Camera.perspectiveCamera
              );
            };

            this.init();
          };

          return new _View();
        })();

        folderCamera.add(this, "reset").name("RESET CAMERA");

        return folderCamera;
      },
    };

    this.init();
  };

  return new _Camera();
})();

/**
 * Skymap
 */
var Skymap = (function () {
  var _Skymap = function () {
    var self = this;

    var paramsDefault = function () {
      return {
        imgDef: IMAGE_HD,
        imgDefPrevious: undefined,
        cubeTextureLoader: {
          positionTag: "{pos}",
          positions: ["posx", "negx", "posy", "negy", "posz", "negz"],
          filename: {
            sd: "skymap_{pos}_512x512.jpg",
            hd: "skymap_{pos}_1024x1024.jpg",
          },
        },
      };
    };

    var params = paramsDefault();

    this.init = function () {};

    this.setParamImgDef = function (imgDef) {
      params.imgDef = imgDef || paramsDefault().imgDef;
    };

    this.setSceneBgCubeTexture = function (_scene, imgDef) {
      this.setParamImgDef(imgDef);
      if (this.doesRefreshTextureNecessary()) {
        _scene.background = this.getCubeTextureLoader();
        this.disableRefreshTexture();
      }
    };

    this.getCubeTextureLoader = function () {
      return new THREE.CubeTextureLoader()
        .setPath(ASSETS_PATH)
        .load(this.getFilenames());
    };

    this.getFilenames = function () {
      var filenames = [];

      for (var i = 0; i < params.cubeTextureLoader.positions.length; i++) {
        filenames.push(this.getFilename(params.cubeTextureLoader.positions[i]));
      }

      return filenames;
    };

    this.getFilename = function (position) {
      return params.cubeTextureLoader.filename[params.imgDef].replace(
        params.cubeTextureLoader.positionTag,
        position
      );
    };

    this.doesRefreshTextureNecessary = function () {
      return params.imgDef !== params.imgDefPrevious;
    };

    this.disableRefreshTexture = function () {
      params.imgDefPrevious = params.imgDef;
    };

    this.gui = {
      params: {},

      reset: function () {
        var _default = paramsDefault();
        self.setSceneBgCubeTexture(Scene.scene, _default.imgDef);
      },

      add: function (gui) {
        var folderSkymap = gui.addFolder("SKYMAP");

        folderSkymap
          .add(params, "imgDef", [IMAGE_SD, IMAGE_HD])
          .listen()
          .onChange(function (imgDef) {
            self.setSceneBgCubeTexture(Scene.scene, imgDef);
          });

        folderSkymap.add(this, "reset").name("RESET SKYMAP");

        return folderSkymap;
      },
    };

    this.init();
  };

  return new _Skymap();
})();

/**
 * Cloud
 */
var Cloud = (function () {
  var _Cloud = function () {
    var self = this;

    var paramsDefault = function () {
      return {
        imgDef: IMAGE_HD,
        imgDefPrevious: undefined,
        visible: false,
        material: {
          wireframe: false,
          transparent: true,
          color: COLOR_WHITE,
          bumpScale: 0.13,
          opacity: 0.9,
          alphaMap: {
            
            sd: ASSETS_PATH + "earth_clouds_2048x1024.jpg",
            hd: ASSETS_PATH + "earth_clouds_2048x1024.jpg",
          },
          bumpMap: {
            sd: ASSETS_PATH + "earth_clouds_2048x1024.jpg",
            hd: ASSETS_PATH + "earth_clouds_2048x1024.jpg",
          },
        },
        geometry: {
          radius: 50.3,
          widthSegments: 64,
          heightSegments: 32,
        },
        animate: {
          enabled: true,
          rotationsYPerSecond: -0.0012,
        },
      };
    };

    var params = paramsDefault();

    this.init = function () {
      this.material = new THREE.MeshPhongMaterial({
        wireframe: params.material.wireframe,
        color: params.material.color,
        opacity: params.material.opacity,
        transparent: params.material.transparent,
        bumpScale: params.material.bumpScale,
      });

      this.setMaterialTextures();

      this.geometry = new THREE.SphereGeometry(
        params.geometry.radius,
        params.geometry.widthSegments,
        params.geometry.heightSegments
      );

      this.cloudMesh = new THREE.Mesh(this.geometry, this.material);
      this.cloudMesh.visible = params.visible;
    };

    this.animate = function (delta) {
      if (params.animate.enabled) {
        this.cloudMesh.rotation.y +=
          delta * 2 * Math.PI * params.animate.rotationsYPerSecond;
      }
    };

    this.setParamImgDef = function (imgDef) {
      params.imgDef = imgDef || paramsDefault().imgDef;
    };

    this.setMaterialTextures = function (imgDef) {
      this.setParamImgDef(imgDef);

      if (this.doesRefreshTextureNecessary()) {
        this.material.alphaMap = new THREE.TextureLoader().load(
          params.material.alphaMap[params.imgDef]
        );
        this.material.bumpMap = new THREE.TextureLoader().load(
          params.material.bumpMap[params.imgDef]
        );
        this.disableRefreshTexture();
      }
    };

    this.doesRefreshTextureNecessary = function () {
      return params.imgDef !== params.imgDefPrevious;
    };

    this.disableRefreshTexture = function () {
      params.imgDefPrevious = params.imgDef;
    };

    this.gui = {
      params: {
        colors: {},
      },

      reset: function () {
        var _default = paramsDefault();

        self.cloudMesh.visible = _default.visible;

        self.material.wireframe = _default.material.wireframe;
        self.material.transparent = _default.material.transparent;
        self.material.opacity = _default.material.opacity;
        self.material.bumpScale = _default.material.bumpScale;
        self.material.color.setHex(_default.material.color);

        params.animate.enabled = _default.animate.enabled;
        params.animate.rotationsYPerSecond =
          _default.animate.rotationsYPerSecond;

        self.setMaterialTextures(_default.imgDef);

        this.resetColorsHexString();
      },

      resetColorsHexString: function () {
        this.params.colors.color = "#" + self.material.color.getHexString();
      },

      add: function (gui) {
        this.resetColorsHexString();

        var folderCloud = gui.addFolder("CLOUD");

        folderCloud.add(self.cloudMesh, "visible").listen();

        var folderMaterial = folderCloud.addFolder("Material");

        folderMaterial
          .add(params, "imgDef", [IMAGE_SD, IMAGE_HD])
          .listen()
          .onChange(function (imgDef) {
            self.setMaterialTextures(imgDef);
          });

        folderMaterial.add(self.material, "wireframe").listen();

        folderMaterial.add(self.material, "transparent").listen();

        folderMaterial.add(self.material, "opacity", 0, 1).listen();

        folderMaterial.add(self.material, "bumpScale", -1.5, 1.5).listen();

        folderMaterial
          .addColor(this.params.colors, "color")
          .listen()
          .onChange(function (color) {
            self.material.color.setHex(color.replace("#", "0x"));
          });

        var folderAnimate = folderCloud.addFolder("Animate");

        folderAnimate.add(params.animate, "enabled").listen();

        folderAnimate
          .add(params.animate, "rotationsYPerSecond", -2, 2)
          .listen();

        folderCloud.add(this, "reset").name("RESET CLOUD");

        return folderCloud;
      },
    };

    this.init();
  };

  return new _Cloud();
})();

/**
 * Earth
 */
var Earth = (function (Cloud) {
  var _Earth = function () {
    var self = this;

    var paramsDefault = function () {
      return {
        imgDef: IMAGE_SD,
        imgDefPrevious: undefined,
        visible: true,
        material: {
          wireframe: false,
          map: {
            // sd: ASSETS_PATH + "earth_map_2048x1024.jpg",
            // hd: ASSETS_PATH + "earth_map_2048x1024.jpg",
            sd:"https://i.imgur.com/MeKgLts.jpg",
            hd:"https://i.imgur.com/MeKgLts.jpg"
          },
          bumpMap: {
            sd:"https://i.imgur.com/MeKgLts.jpg",
            hd:"https://i.imgur.com/MeKgLts.jpg"
            // sd: ASSETS_PATH + "earth_bump_2048x1024.jpg",
            // hd: ASSETS_PATH + "earth_bump_2048x1024.jpg",
          },
          bumpScale: 0,
          specularMap: {
            sd:"https://i.imgur.com/MeKgLts.jpg",
            hd:"https://i.imgur.com/MeKgLts.jpg"
            // sd: ASSETS_PATH + "earth_specular_2048x1024.jpg",
            // hd: ASSETS_PATH + "earth_specular_2048x1024.jpg",
          },
          specular: 0x2d4ea0,
          shininess: 0,
        },
        geometry: {
          radius: 30,
          widthSegments: 64,
          heightSegments: 100,
        },
        animate: {
          enabled: true,
          rotationsYPerSecond: 0.05,
        },
      };
    };

    var params = paramsDefault();

    this.init = function () {
      this.geometry = new THREE.SphereGeometry(
        params.geometry.radius,
        params.geometry.widthSegments,
        params.geometry.heightSegments
      );

      this.material = new THREE.MeshPhongMaterial({
        wireframe: params.material.wireframe,
        bumpScale: params.material.bumpScale,
        specular: params.material.specular,
        shininess: params.material.shininess,
      });

      this.setMaterialTextures();

      this.earthMesh = new THREE.Mesh(this.geometry, this.material);
      this.earthMesh.visible = params.visible;

      // this.earthMesh.add(Cloud.cloudMesh);
    };

    this.animate = function (delta) {
      if (params.animate.enabled) {
        this.earthMesh.rotation.y +=
          delta * 2 * Math.PI * params.animate.rotationsYPerSecond;
      }
    };

    this.setParamImgDef = function (imgDef) {
      params.imgDef = imgDef || paramsDefault().imgDef;
    };

    this.setMaterialTextures = function (imgDef) {
      this.setParamImgDef(imgDef);

      if (this.doesRefreshTextureNecessary()) {
        this.material.map = new THREE.TextureLoader().load(
          params.material.map[params.imgDef]
        );
        this.material.bumpMap = new THREE.TextureLoader().load(
          params.material.bumpMap[params.imgDef]
        );
        this.material.specularMap = new THREE.TextureLoader().load(
          params.material.specularMap[params.imgDef]
        );
        this.disableRefreshTexture();
      }
    };

    this.doesRefreshTextureNecessary = function () {
      return params.imgDef !== params.imgDefPrevious;
    };

    this.disableRefreshTexture = function () {
      params.imgDefPrevious = params.imgDef;
    };

    this.gui = {
      params: {
        colors: {},
      },

      reset: function () {
        var _default = paramsDefault();

        self.earthMesh.visible = _default.visible;

        self.material.wireframe = _default.material.wireframe;
        self.material.bumpScale = _default.material.bumpScale;
        self.material.shininess = _default.material.shininess;
        self.material.specular.setHex(_default.material.specular);

        params.animate.enabled = _default.animate.enabled;
        params.animate.rotationsYPerSecond =
          _default.animate.rotationsYPerSecond;

        self.setMaterialTextures(_default.imgDef);

        this.resetColorsHexString();
      },

      resetColorsHexString: function () {
        this.params.colors.specular =
          "#" + self.material.specular.getHexString();
      },

      add: function (gui) {
        this.resetColorsHexString();

        var folderEarth = gui.addFolder("EARTH");

        folderEarth.add(self.earthMesh, "visible").listen();

        var folderMaterial = folderEarth.addFolder("Material");

        folderMaterial
          .add(params, "imgDef", [IMAGE_SD, IMAGE_HD])
          .listen()
          .onChange(function (imgDef) {
            self.setMaterialTextures(imgDef);
          });

        folderMaterial.add(self.material, "wireframe").listen();

        folderMaterial.add(self.material, "bumpScale", -1.5, 1.5).listen();

        folderMaterial.add(self.material, "shininess", 0, 10).listen();

        folderMaterial
          .addColor(this.params.colors, "specular")
          .listen()
          .onChange(function (color) {
            self.material.specular.setHex(color.replace("#", "0x"));
          });

        var folderAnimate = folderEarth.addFolder("Animate");

        folderAnimate.add(params.animate, "enabled").listen();

        folderAnimate
          .add(params.animate, "rotationsYPerSecond", -2, 2)
          .listen();

        folderEarth.add(this, "reset").name("RESET EARTH");

        return folderEarth;
      },
    };

    this.init();
  };

  return new _Earth();
})(Cloud);

/**
 * Moon
 */
var Moon = (function (Earth) {
  var _Moon = function () {
    var self = this;

    var paramsDefault = function () {
      return {
        imgDef: IMAGE_SD,
        imgDefPrevious: undefined,
        moonMesh: {
          visible: false,
          position: {
            x: 56,
            y: -43,
            z: 139,
          },
        },
        material: {
          wireframe: false,
          map: {
            sd: ASSETS_PATH + "moon_map_512x256.jpg",
            hd: ASSETS_PATH + "moon_map_1024x512.jpg",
          },
          bumpMap: {
            sd: ASSETS_PATH + "moon_bump_512x256.jpg",
            hd: ASSETS_PATH + "moon_bump_1024x512.jpg",
          },
          bumpScale: 0.1,
          shininess: 6,
        },
        geometry: {
          radius: 25,
          widthSegments: 32,
          heightSegments: 21,
        },
        animate: {
          enabled: false,
          pivotRotationsPerSecond: 0.05,
        },
      };
    };

    var params = paramsDefault();

    this.init = function () {
      this.geometry = new THREE.SphereGeometry(
        params.geometry.radius,
        params.geometry.widthSegments,
        params.geometry.heightSegments
      );

      this.material = new THREE.MeshPhongMaterial({
        wireframe: params.material.wireframe,
        bumpScale: params.material.bumpScale,
        shininess: params.material.shininess,
      });

      this.setMaterialTextures();

      this.moonMesh = new THREE.Mesh(this.geometry, this.material);

      this.moonMesh.position.set(
        params.moonMesh.position.x,
        params.moonMesh.position.y,
        params.moonMesh.position.z
      );

      this.moonMesh.visible = params.moonMesh.visible;
      this.pivot = this.createPivot();
    };

    this.createPivot = function () {
      var pivot = new THREE.Object3D();
      pivot.position = Earth.earthMesh.position;
      pivot.add(this.moonMesh);

      return pivot;
    };

    this.animate = function (delta) {
      if (params.animate.enabled) {
        this.pivot.rotation.y +=
          delta * 2 * Math.PI * params.animate.pivotRotationsPerSecond;
      }
    };

    this.setParamImgDef = function (imgDef) {
      params.imgDef = imgDef || paramsDefault().imgDef;
    };

    this.setMaterialTextures = function (imgDef) {
      this.setParamImgDef(imgDef);

      if (this.doesRefreshTextureNecessary()) {
        this.material.map = new THREE.TextureLoader().load(
          params.material.map[params.imgDef]
        );
        this.material.bumpMap = new THREE.TextureLoader().load(
          params.material.bumpMap[params.imgDef]
        );
        this.disableRefreshTexture();
      }
    };

    this.doesRefreshTextureNecessary = function () {
      return params.imgDef !== params.imgDefPrevious;
    };

    this.disableRefreshTexture = function () {
      params.imgDefPrevious = params.imgDef;
    };

    this.gui = {
      params: {
        colors: {},
      },

      reset: function () {
        var _default = paramsDefault();

        self.moonMesh.visible = _default.moonMesh.visible;

        self.material.wireframe = _default.material.wireframe;
        self.material.bumpScale = _default.material.bumpScale;
        self.material.shininess = _default.material.shininess;

        self.moonMesh.position.x = _default.moonMesh.position.x;
        self.moonMesh.position.y = _default.moonMesh.position.y;
        self.moonMesh.position.z = _default.moonMesh.position.z;

        params.animate.enabled = _default.animate.enabled;
        params.animate.pivotRotationsPerSecond =
          _default.animate.pivotRotationsPerSecond;

        self.setMaterialTextures(_default.imgDef);
      },

      add: function (gui) {
        var folderMoon = gui.addFolder("MOON");

        folderMoon.add(self.moonMesh, "visible").listen();

        var folderPosition = folderMoon.addFolder("Position");

        folderPosition.add(self.moonMesh.position, "x", -100, 100).listen();

        folderPosition.add(self.moonMesh.position, "y", -100, 100).listen();

        folderPosition.add(self.moonMesh.position, "z", -200, 200).listen();

        var folderMaterial = folderMoon.addFolder("Material");

        folderMaterial
          .add(params, "imgDef", [IMAGE_SD, IMAGE_HD])
          .listen()
          .onChange(function (imgDef) {
            self.setMaterialTextures(imgDef);
          });

        folderMaterial.add(self.material, "wireframe").listen();

        folderMaterial.add(self.material, "bumpScale", -1.5, 1.5).listen();

        folderMaterial.add(self.material, "shininess", 0, 10).listen();

        var folderAnimate = folderMoon.addFolder("Animate");

        folderAnimate.add(params.animate, "enabled").listen();

        folderAnimate
          .add(params.animate, "pivotRotationsPerSecond", -2, 2)
          .listen();

        folderMoon.add(this, "reset").name("RESET MOON");

        return folderMoon;
      },
    };

    this.init();
  };

  return new _Moon();
})(Earth);

/**
 * Sun
 */
var Sun = (function () {
  var _Sun = function () {
    var self = this;

    var paramsDefault = function () {
      return {
        imgDef: IMAGE_HD,
        imgDefPrevious: undefined,
        sunLight: {
          visible: true,
          color: COLOR_GREEN,
          intensity: 10,
          position: {
            x: -380,
            y: 300,
            z: -1000,
          },
        },
        sunLensFlare: {
          textures: {
            sun: {
              sd: "https://i.ibb.co/kSnskLS/shutterstock-1468418717.png",
              hd: "https://i.ibb.co/kSnskLS/shutterstock-1468418717.png",
            },
            circle: {
              sd: ASSETS_PATH + "lens_flare_circle_32x32.jpg",
              hd: ASSETS_PATH + "lens_flare_circle_64x64.jpg",
            },
            hexagon: {
              sd: ASSETS_PATH + "lens_flare_hexagon_128x128.jpg",
              hd: ASSETS_PATH + "lens_flare_hexagon_256x256.jpg",
            },
          },
          flareCircleSize: 1000,
          lensFlares: [
            {
              size: 100,
              opacity: 4,
              distance: 0,
            },
            {
              size: 0,
              opacity: 0.4,
              distance: 0.63,
            },
            {
              size: 0,
              opacity: 0.3,
              distance: 0.64,
            },
            {
              size: 0,
              opacity: 0.8,
              distance: 0.7,
            },
            {
              size: 0,
              opacity: 0.7,
              distance: 0.8,
            },
            {
              size: 0,
              opacity: 0.4,
              distance: 0.85,
            },
            {
              size: 0,
              opacity: 0.4,
              distance: 0.86,
            },
            {
              size: 0,
              opacity: 0.3,
              distance: 0.9,
            },
            {
              size: 0,
              opacity: 0.4,
              distance: 1,
            },
          ],
        },
      };
    };

    var params = paramsDefault();

    this.init = function () {
      this.textureLoader = new THREE.TextureLoader();
      this.sunLight = new THREE.DirectionalLight(
        params.sunLight.color,
        params.sunLight.intensity
      );

      this.sunLight.position.set(
        params.sunLight.position.x,
        params.sunLight.position.y,
        params.sunLight.position.z
      );

      this.sunLight.visible = params.sunLight.visible;

      this.createLensFlare();
      this.disableRefreshTexture();
    };

    this.setParamImgDef = function (imgDef) {
      params.imgDef = imgDef || paramsDefault().imgDef;
    };

    this.createLensFlare = function () {
      this.sunLensFlare = this.getSunLensFlare();
      this.sunLight.add(this.sunLensFlare);
    };

    this.getSunLensFlare = function () {
      this.loadLensFlareTextures();

      var sunLensFlare = new THREE.LensFlare(
        this.getTextureByIndex(0),
        params.sunLensFlare.lensFlares[0].size,
        params.sunLensFlare.lensFlares[0].distance,
        THREE.AdditiveBlending
      );

      return this.addLensFlareSunCirclesAndHexagons(sunLensFlare);
    };

    this.addLensFlareSunCirclesAndHexagons = function (sunLensFlare) {
      for (var i = 1; i < params.sunLensFlare.lensFlares.length; i++) {
        sunLensFlare.add(
          this.getTextureByIndex(i),
          params.sunLensFlare.lensFlares[i].size,
          params.sunLensFlare.lensFlares[i].distance,
          THREE.AdditiveBlending
        );
      }

      return sunLensFlare;
    };

    this.getTextureByIndex = function (index) {
      if (0 === index) {
        return this.textureFlareSun;
      }
      return params.sunLensFlare.lensFlares[index].size <
        params.sunLensFlare.flareCircleSizeMax
        ? this.textureFlareCircle
        : this.textureFlareHexagon;
    };

    this.loadLensFlareTextures = function () {
      this.textureFlareSun = this.textureLoader.load(
        params.sunLensFlare.textures.sun[params.imgDef]
      );
      this.textureFlareCircle = this.textureLoader.load(
        params.sunLensFlare.textures.circle[params.imgDef]
      );
      this.textureFlareHexagon = this.textureLoader.load(
        params.sunLensFlare.textures.hexagon[params.imgDef]
      );
    };

    this.refreshTextures = function (imgDef) {
      this.setParamImgDef(imgDef);

      if (this.doesRefreshTextureNecessary()) {
        this.loadLensFlareTextures();

        for (var i = 0; i < params.sunLensFlare.lensFlares.length; i++) {
          this.sunLensFlare.lensFlares[i].texture = this.getTextureByIndex(i);
        }

        this.disableRefreshTexture();
      }
    };

    this.doesRefreshTextureNecessary = function () {
      return params.imgDef !== params.imgDefPrevious;
    };

    this.disableRefreshTexture = function () {
      params.imgDefPrevious = params.imgDef;
    };

    this.gui = {
      params: {
        colors: {},
      },

      reset: function () {
        var _default = paramsDefault();

        self.sunLight.visible = _default.sunLight.visible;
        self.sunLight.intensity = _default.sunLight.intensity;
        self.sunLight.color.setHex(_default.sunLight.color);

        self.sunLight.position.x = _default.sunLight.position.x;
        self.sunLight.position.y = _default.sunLight.position.y;
        self.sunLight.position.z = _default.sunLight.position.z;

        for (var i = 0; i < params.sunLensFlare.lensFlares.length; i++) {
          self.sunLensFlare.lensFlares[i].size =
            _default.sunLensFlare.lensFlares[i].size;
          self.sunLensFlare.lensFlares[i].opacity =
            _default.sunLensFlare.lensFlares[i].opacity;
          self.sunLensFlare.lensFlares[i].distance =
            _default.sunLensFlare.lensFlares[i].distance;
        }

        this.resetColorsHexString();

        self.refreshTextures();
      },

      resetColorsHexString: function () {
        this.params.colors.color = "#" + self.sunLight.color.getHexString();
      },

      add: function (gui) {
        this.resetColorsHexString();

        var folderSun = gui.addFolder("SUN");

        folderSun.add(self.sunLight, "visible").listen();

        var folderLight = folderSun.addFolder("Light");

        folderLight.add(self.sunLight, "intensity", 0, 10).listen();

        folderLight
          .addColor(this.params.colors, "color")
          .listen()
          .onChange(function (color) {
            self.sunLight.color.setHex(color.replace("#", "0x"));
          });

        var folderPosition = folderSun.addFolder("Position");

        folderPosition.add(self.sunLight.position, "x", -2000, 2000).listen();

        folderPosition.add(self.sunLight.position, "y", -2000, 2000).listen();

        folderPosition.add(self.sunLight.position, "z", -2000, 2000).listen();

        var folderLensFlares = folderSun.addFolder("LensFlares");

        folderLensFlares
          .add(params, "imgDef", [IMAGE_SD, IMAGE_HD])
          .listen()
          .onChange(function (imgDef) {
            self.refreshTextures(imgDef);
          });

        for (var i = 0; i < self.sunLensFlare.lensFlares.length; i++) {
          folderLensFlares
            .add(self.sunLensFlare.lensFlares[i], "size", 0, 2000)
            .name(i + ". size")
            .listen();

          folderLensFlares
            .add(self.sunLensFlare.lensFlares[i], "opacity", 0, 1)
            .name(i + ". opacity")
            .listen();

          folderLensFlares
            .add(self.sunLensFlare.lensFlares[i], "distance", -1, 1)
            .name(i + ". distance")
            .listen();
        }

        folderSun.add(this, "reset").name("RESET SUN");

        return folderSun;
      },
    };

    this.init();
  };

  return new _Sun();
})();

var Sun_ = (function () {
  var _Sun_ = function () {
    var self = this;

    var paramsDefault = function () {
      return {
        imgDef: IMAGE_HD,
        imgDefPrevious: undefined,
        sunLight: {
          visible: true,
          color: COLOR_BLACKA,
          intensity: 0,
          position: {
            x: -500,
            y: 360,
            z: 900,
          },
        },
        sunLensFlare: {
          textures: {
            sun: {
              sd: ASSETS_PATH + "lens_flare_sun_512x512.jpg",
              hd: ASSETS_PATH + "lens_flare_sun_1024x1024.jpg",
            },
            circle: {
              sd: ASSETS_PATH + "lens_flare_circle_32x32.jpg",
              hd: ASSETS_PATH + "lens_flare_circle_64x64.jpg",
            },
            hexagon: {
              sd: ASSETS_PATH + "lens_flare_hexagon_128x128.jpg",
              hd: ASSETS_PATH + "lens_flare_hexagon_256x256.jpg",
            },
          },
          flareCircleSizeMax: 50,
          lensFlares: [
            {
              size: 0,
              opacity: 1,
              distance: 0,
            },
            {
              size: 0,
              opacity: 0.4,
              distance: 0.63,
            },
            {
              size: 0,
              opacity: 0.3,
              distance: 0.64,
            },
            {
              size: 0,
              opacity: 0.8,
              distance: 0.7,
            },
            {
              size: 0,
              opacity: 0.7,
              distance: 0.8,
            },
            {
              size: 0,
              opacity: 0.4,
              distance: 0.85,
            },
            {
              size: 0,
              opacity: 0.4,
              distance: 0.86,
            },
            {
              size: 0,
              opacity: 0.3,
              distance: 0.9,
            },
            {
              size: 0,
              opacity: 0.4,
              distance: 1,
            },
          ],
        },
      };
    };

    var params = paramsDefault();

    this.init = function () {
      this.textureLoader = new THREE.TextureLoader();
      this.sunLight = new THREE.DirectionalLight(
        params.sunLight.color,
        params.sunLight.intensity
      );

      this.sunLight.position.set(
        params.sunLight.position.x,
        params.sunLight.position.y,
        params.sunLight.position.z
      );

      this.sunLight.visible = params.sunLight.visible;

      this.createLensFlare();
      this.disableRefreshTexture();
    };

    this.setParamImgDef = function (imgDef) {
      params.imgDef = imgDef || paramsDefault().imgDef;
    };

    this.createLensFlare = function () {
      this.sunLensFlare = this.getSunLensFlare();
      this.sunLight.add(this.sunLensFlare);
    };

    this.getSunLensFlare = function () {
      this.loadLensFlareTextures();

      var sunLensFlare = new THREE.LensFlare(
        this.getTextureByIndex(0),
        params.sunLensFlare.lensFlares[0].size,
        params.sunLensFlare.lensFlares[0].distance,
        THREE.AdditiveBlending
      );

      return this.addLensFlareSunCirclesAndHexagons(sunLensFlare);
    };

    this.addLensFlareSunCirclesAndHexagons = function (sunLensFlare) {
      for (var i = 1; i < params.sunLensFlare.lensFlares.length; i++) {
        sunLensFlare.add(
          this.getTextureByIndex(i),
          params.sunLensFlare.lensFlares[i].size,
          params.sunLensFlare.lensFlares[i].distance,
          THREE.AdditiveBlending
        );
      }

      return sunLensFlare;
    };

    this.getTextureByIndex = function (index) {
      if (0 === index) {
        return this.textureFlareSun;
      }
      return params.sunLensFlare.lensFlares[index].size <
        params.sunLensFlare.flareCircleSizeMax
        ? this.textureFlareCircle
        : this.textureFlareHexagon;
    };

    this.loadLensFlareTextures = function () {
      this.textureFlareSun = this.textureLoader.load(
        params.sunLensFlare.textures.sun[params.imgDef]
      );
      this.textureFlareCircle = this.textureLoader.load(
        params.sunLensFlare.textures.circle[params.imgDef]
      );
      this.textureFlareHexagon = this.textureLoader.load(
        params.sunLensFlare.textures.hexagon[params.imgDef]
      );
    };

    this.refreshTextures = function (imgDef) {
      this.setParamImgDef(imgDef);

      if (this.doesRefreshTextureNecessary()) {
        this.loadLensFlareTextures();

        for (var i = 0; i < params.sunLensFlare.lensFlares.length; i++) {
          this.sunLensFlare.lensFlares[i].texture = this.getTextureByIndex(i);
        }

        this.disableRefreshTexture();
      }
    };

    this.doesRefreshTextureNecessary = function () {
      return params.imgDef !== params.imgDefPrevious;
    };

    this.disableRefreshTexture = function () {
      params.imgDefPrevious = params.imgDef;
    };

    this.gui = {
      params: {
        colors: {},
      },

      reset: function () {
        var _default = paramsDefault();

        self.sunLight.visible = _default.sunLight.visible;
        self.sunLight.intensity = _default.sunLight.intensity;
        self.sunLight.color.setHex(_default.sunLight.color);

        self.sunLight.position.x = _default.sunLight.position.x;
        self.sunLight.position.y = _default.sunLight.position.y;
        self.sunLight.position.z = _default.sunLight.position.z;

        for (var i = 0; i < params.sunLensFlare.lensFlares.length; i++) {
          self.sunLensFlare.lensFlares[i].size =
            _default.sunLensFlare.lensFlares[i].size;
          self.sunLensFlare.lensFlares[i].opacity =
            _default.sunLensFlare.lensFlares[i].opacity;
          self.sunLensFlare.lensFlares[i].distance =
            _default.sunLensFlare.lensFlares[i].distance;
        }

        this.resetColorsHexString();

        self.refreshTextures();
      },

      resetColorsHexString: function () {
        this.params.colors.color = "#" + self.sunLight.color.getHexString();
      },

      add: function (gui) {
        this.resetColorsHexString();

        var folderSun = gui.addFolder("SUN");

        folderSun.add(self.sunLight, "visible").listen();

        var folderLight = folderSun.addFolder("Light");

        folderLight.add(self.sunLight, "intensity", 0, 10).listen();

        folderLight
          .addColor(this.params.colors, "color")
          .listen()
          .onChange(function (color) {
            self.sunLight.color.setHex(color.replace("#", "0x"));
          });

        var folderPosition = folderSun.addFolder("Position");

        folderPosition.add(self.sunLight.position, "x", -2000, 2000).listen();

        folderPosition.add(self.sunLight.position, "y", -2000, 2000).listen();

        folderPosition.add(self.sunLight.position, "z", -2000, 2000).listen();

        var folderLensFlares = folderSun.addFolder("LensFlares");

        folderLensFlares
          .add(params, "imgDef", [IMAGE_SD, IMAGE_HD])
          .listen()
          .onChange(function (imgDef) {
            self.refreshTextures(imgDef);
          });

        for (var i = 0; i < self.sunLensFlare.lensFlares.length; i++) {
          folderLensFlares
            .add(self.sunLensFlare.lensFlares[i], "size", 0, 2000)
            .name(i + ". size")
            .listen();

          folderLensFlares
            .add(self.sunLensFlare.lensFlares[i], "opacity", 0, 1)
            .name(i + ". opacity")
            .listen();

          folderLensFlares
            .add(self.sunLensFlare.lensFlares[i], "distance", -1, 1)
            .name(i + ". distance")
            .listen();
        }

        folderSun.add(this, "reset").name("RESET SUN");

        return folderSun;
      },
    };

    this.init();
  };

  return new _Sun_();
})();

var Sun2_ = (function () {
  var _Sun2_ = function () {
    var self = this;

    var paramsDefault = function () {
      return {
        imgDef: IMAGE_HD,
        imgDefPrevious: undefined,
        sunLight: {
          visible: true,
          color: COLOR_WHITE,
          intensity:2,
          position: {
            x: 380,
            y: -300,
            z: 1000,
          },
        },
        sunLensFlare: {
          textures: {
            sun: {
              sd: "https://i.ibb.co/Jv0kPWR/moon.png",
              hd: "https://i.ibb.co/Jv0kPWR/moon.png",
            },
            circle: {
              sd: ASSETS_PATH + "lens_flare_circle_32x32.jpg",
              hd: ASSETS_PATH + "lens_flare_circle_64x64.jpg",
            },
            hexagon: {
              sd: ASSETS_PATH + "lens_flare_hexagon_128x128.jpg",
              hd: ASSETS_PATH + "lens_flare_hexagon_256x256.jpg",
            },
          },
          flareCircleSizeMax: 10,
          lensFlares: [
            {
              size: 100,
              opacity: 0.51,
              distance: -0.001            },
            {
              size: 0,
              opacity: 0.4,
              distance: 0.63,
            },
            {
              size: 0,
              opacity: 0.3,
              distance: 0.64,
            },
            {
              size: 0,
              opacity: 0.8,
              distance: 0.7,
            },
            {
              size: 0,
              opacity: 0.7,
              distance: 0.8,
            },
            {
              size: 0,
              opacity: 0.4,
              distance: 0.85,
            },
            {
              size: 0,
              opacity: 0.4,
              distance: 0.86,
            },
            {
              size: 0,
              opacity: 0.3,
              distance: 0.9,
            },
            {
              size: 0,
              opacity: 0.4,
              distance: 1,
            },
          ],
        },
      };
    };

    var params = paramsDefault();

    this.init = function () {
      this.textureLoader = new THREE.TextureLoader();
      this.sunLight = new THREE.DirectionalLight(
        params.sunLight.color,
        params.sunLight.intensity
      );

      this.sunLight.position.set(
        params.sunLight.position.x,
        params.sunLight.position.y,
        params.sunLight.position.z
      );

      this.sunLight.visible = params.sunLight.visible;

      this.createLensFlare();
      this.disableRefreshTexture();
    };

    this.setParamImgDef = function (imgDef) {
      params.imgDef = imgDef || paramsDefault().imgDef;
    };

    this.createLensFlare = function () {
      this.sunLensFlare = this.getSunLensFlare();
      this.sunLight.add(this.sunLensFlare);
    };

    this.getSunLensFlare = function () {
      this.loadLensFlareTextures();

      var sunLensFlare = new THREE.LensFlare(
        this.getTextureByIndex(0),
        params.sunLensFlare.lensFlares[0].size,
        params.sunLensFlare.lensFlares[0].distance,
        THREE.AdditiveBlending
      );

      return this.addLensFlareSunCirclesAndHexagons(sunLensFlare);
    };

    this.addLensFlareSunCirclesAndHexagons = function (sunLensFlare) {
      for (var i = 1; i < params.sunLensFlare.lensFlares.length; i++) {
        sunLensFlare.add(
          this.getTextureByIndex(i),
          params.sunLensFlare.lensFlares[i].size,
          params.sunLensFlare.lensFlares[i].distance,
          THREE.AdditiveBlending
        );
      }

      return sunLensFlare;
    };

    this.getTextureByIndex = function (index) {
      if (0 === index) {
        return this.textureFlareSun;
      }
      return params.sunLensFlare.lensFlares[index].size <
        params.sunLensFlare.flareCircleSizeMax
        ? this.textureFlareCircle
        : this.textureFlareHexagon;
    };

    this.loadLensFlareTextures = function () {
      this.textureFlareSun = this.textureLoader.load(
        params.sunLensFlare.textures.sun[params.imgDef]
      );
      this.textureFlareCircle = this.textureLoader.load(
        params.sunLensFlare.textures.circle[params.imgDef]
      );
      this.textureFlareHexagon = this.textureLoader.load(
        params.sunLensFlare.textures.hexagon[params.imgDef]
      );
    };

    this.refreshTextures = function (imgDef) {
      this.setParamImgDef(imgDef);

      if (this.doesRefreshTextureNecessary()) {
        this.loadLensFlareTextures();

        for (var i = 0; i < params.sunLensFlare.lensFlares.length; i++) {
          this.sunLensFlare.lensFlares[i].texture = this.getTextureByIndex(i);
        }

        this.disableRefreshTexture();
      }
    };

    this.doesRefreshTextureNecessary = function () {
      return params.imgDef !== params.imgDefPrevious;
    };

    this.disableRefreshTexture = function () {
      params.imgDefPrevious = params.imgDef;
    };

    this.gui = {
      params: {
        colors: {},
      },

      reset: function () {
        var _default = paramsDefault();

        self.sunLight.visible = _default.sunLight.visible;
        self.sunLight.intensity = _default.sunLight.intensity;
        self.sunLight.color.setHex(_default.sunLight.color);

        self.sunLight.position.x = _default.sunLight.position.x;
        self.sunLight.position.y = _default.sunLight.position.y;
        self.sunLight.position.z = _default.sunLight.position.z;

        for (var i = 0; i < params.sunLensFlare.lensFlares.length; i++) {
          self.sunLensFlare.lensFlares[i].size =
            _default.sunLensFlare.lensFlares[i].size;
          self.sunLensFlare.lensFlares[i].opacity =
            _default.sunLensFlare.lensFlares[i].opacity;
          self.sunLensFlare.lensFlares[i].distance =
            _default.sunLensFlare.lensFlares[i].distance;
        }

        this.resetColorsHexString();

        self.refreshTextures();
      },

      resetColorsHexString: function () {
        this.params.colors.color = "#" + self.sunLight.color.getHexString();
      },

      add: function (gui) {
        this.resetColorsHexString();

        var folderSun = gui.addFolder("SUN");

        folderSun.add(self.sunLight, "visible").listen();

        var folderLight = folderSun.addFolder("Light");

        folderLight.add(self.sunLight, "intensity", 0, 10).listen();

        folderLight
          .addColor(this.params.colors, "color")
          .listen()
          .onChange(function (color) {
            self.sunLight.color.setHex(color.replace("#", "0x"));
          });

        var folderPosition = folderSun.addFolder("Position");

        folderPosition.add(self.sunLight.position, "x", -2000, 2000).listen();

        folderPosition.add(self.sunLight.position, "y", -2000, 2000).listen();

        folderPosition.add(self.sunLight.position, "z", -2000, 2000).listen();

        var folderLensFlares = folderSun.addFolder("LensFlares");

        folderLensFlares
          .add(params, "imgDef", [IMAGE_SD, IMAGE_HD])
          .listen()
          .onChange(function (imgDef) {
            self.refreshTextures(imgDef);
          });

        for (var i = 0; i < self.sunLensFlare.lensFlares.length; i++) {
          folderLensFlares
            .add(self.sunLensFlare.lensFlares[i], "size", 0, 2000)
            .name(i + ". size")
            .listen();

          folderLensFlares
            .add(self.sunLensFlare.lensFlares[i], "opacity", 0, 1)
            .name(i + ". opacity")
            .listen();

          folderLensFlares
            .add(self.sunLensFlare.lensFlares[i], "distance", -1, 1)
            .name(i + ". distance")
            .listen();
        }

        folderSun.add(this, "reset").name("RESET SUN");

        return folderSun;
      },
    };

    this.init();
  };

  return new _Sun2_();
})();
/**
 * Scene
 */
var Scene = (function () {
  var _Scene = function () {
    var self = this;

    var paramsDefault = function () {
      return {
        orbitControls: {
          autoRotate: false,
          autoRotateSpeed: 0.04,
        },
      };
    };

    var params = paramsDefault();

    this.init = function () {
      this.scene = new THREE.Scene();
      this.scene.add(Earth.earthMesh);
      this.scene.add(Moon.pivot);
      this.scene.add(Sun.sunLight);
      this.scene.add(Sun_.sunLight);
      this.scene.add(Sun2_.sunLight);
      let originalPosition = new THREE.Vector3();
      // the position you want the objec tot be on hover
      let hoverPosition = new THREE.Vector3(); // set it to what ever you like

      // lets say this is the glb being loaded

      // window.addEventListener("contextmenu", onContextMenu, false);
      // window.addEventListener("mousedown", onMouseDown, false);
      // window.addEventListener("mouseup", onMouseUp, false);

      // function onContextMenu(event) { // Prevent right click
      //   console.log("🚀 ~ file: script.js ~ line 3757 ~ onContextMenu ~ event", event)
      //   event.preventDefault();
      // }

      // function onMouseDown(event) {
      //   console.log("🚀 ~ file: script.js ~ line 3760 ~ onMouseDown ~ event", event)
      //   hold = event.which;
      // }
      // window.Sun2_.addEventListener("click", onMouseSMove, false)

      // function onMouseSMove(event) {
      //   console.log('mouse up');
      //   hold = event.which;
      // }

      // function onMouseUp(event) {
      //   console.log('mouse up');
      //   hold = 100;
      // }
      window.addEventListener("click", onMouseMove, false);
      function onMouseMove(event) {
        console.log(
          "🚀 ~ file: script.js ~ line 3779 ~ onMouseMove ~ event",
          event
        );

        hold = event.which;
        // this.Earth.earthMesh.visible=false
        earthhold = event.which;

        // this.Sun2_.sunLensFlare.lensFlares[0].z
        // if( this.Sun2_.sunLensFlare.lensFlares[0].z === 0.5){
        //   hold=false
        // }  else {

        // }

        // this.Sun2_.sunLensFlare.lensFlares[0].hold = 1
        // const coords = {
        //   x: 580,
        //   y: 480,
        // };
        // TWEEN.(coords)

        //   .to({
        //     x: cube.position.x,
        //     y: cube.position.y,
        //   })
        //   .onUpdate(() =>
        //     this.Camera.position.set(
        //       coords.x,
        //       coords.y,
        //       this.Camera.perspectiveCamera.position.z
        //     )
        //   )
        //   .start();
        // console.log("🚀 ~ file: script.js ~ line 429 ~ onMouseMove ~ event")
        // this.Scene.orbitControls.reset();
        //                 his.controls.enablePan  = true;
        //                 this.Scene.orbitControls.panSpeed = 2;
        // this.Scene.orbitControls.staticMoving = true;
        // this.Scene.orbitControls.update();
        // this.inial();\
        //  this.Scene.orbitControls.staticMoving = true;

        // if(this.Camera.perspectiveCamera.position.z<=50 ){
        //   hold =+ event.which
        //   this.updateAll()
        // }
        // this.caera.perspectiveCamera.lerp= 0.1

        // this.Earth.earthMesh.visible=false
        // Sun2_.sunLensFlare.lensFlares[0].distance=0.5
        // calculate mouse position in normalized device coordinates
        // (-1 to +1) for both components this.Earth

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      }
      window.addEventListener("click", onSunClick, false);
      window.addEventListener("click", onMouseMove, false);
      function onSunClick(event) {
      console.log("🚀 ~ file: script.js ~ line 3835 ~ onSunClick ~ event",  event )
      if(event.clientX >= 200 && event.clientX <= 260 && event.clientY >=170 && event.clientY <= 240 ){
        sunhold = event.which
        // this.Camera.lookAt(-100 ,0,0)
      }       
       
        sunhold = event.which


        // hold = event.which;
        // // this.Earth.earthMesh.visible=false
        // earthhold = event.which;

       
      }
      Skymap.setSceneBgCubeTexture(this.scene);

      this.activeOrbitControls();
    };

    this.activeOrbitControls = function () {
      this.orbitControls = new THREE.OrbitControls(
        Camera.perspectiveCamera,
        Renderer.webGLRenderer.domElement
      );

      this.applyParamsOrbitControlsAutoRotate();
      this.applyParamsOrbitControlsAutoRotateSpeed();

      this.orbitControls.enableDamping = true;
    };

    this.applyParamsOrbitControlsAutoRotate = function () {
      this.orbitControls.autoRotate = params.orbitControls.autoRotate;
    };

    this.applyParamsOrbitControlsAutoRotateSpeed = function () {
      this.orbitControls.autoRotateSpeed = params.orbitControls.autoRotateSpeed;
    };

    this.refreshOrbitControls = function () {
      this.activeOrbitControls();
      this.gui.reset();
    };

    this.gui = {
      params: {
        colors: {},
      },

      reset: function () {
        var _default = paramsDefault();

        params.orbitControls.autoRotate = _default.orbitControls.autoRotate;
        params.orbitControls.autoRotateSpeed =
          _default.orbitControls.autoRotateSpeed;

        self.applyParamsOrbitControlsAutoRotate();
        self.applyParamsOrbitControlsAutoRotateSpeed();
      },

      add: function (gui) {
        var folderOrbitControls = gui.addFolder("ORBIT CONTROLS");

        folderOrbitControls
          .add(params.orbitControls, "autoRotate")
          .listen()
          .onChange(function (value) {
            self.applyParamsOrbitControlsAutoRotate();
          });

        folderOrbitControls
          .add(params.orbitControls, "autoRotateSpeed", -1, 1)
          .listen()
          .onChange(function (value) {
            self.applyParamsOrbitControlsAutoRotateSpeed();
          });

        folderOrbitControls.add(this, "reset").name("RESET CONTR.");

        return folderOrbitControls;
      },
    };

    this.init();
  };

  return new _Scene();
})();

/**
 * SceneShadow
 */
var SceneShadow = (function (Scene) {
  var _SceneShadow = function () {
    var self = this;

    var paramsDefault = function () {
      return {
        cameraHelper: {
          visible: false,
        },
        shadow: {
          castShadow: false,
          camera: {
            near: 900,
            far: 1250,
            right: 150,
            left: -150,
            top: 150,
            bottom: -150,
          },
          mapSize: {
            width: 512,
            height: 512,
          },
          bias: 0,
        },
      };
    };

    var params = paramsDefault();

    this.init = function () {
      this.setShadowConfiguration();
    };

    this.setShadowConfiguration = function () {
      this.cameraHelper = new THREE.CameraHelper(Sun.sunLight.shadow.camera);
      Scene.scene.add(this.cameraHelper);
      this.cameraHelper.visible = params.cameraHelper.visible;

      Sun.sunLight.castShadow = params.shadow.castShadow;
      Sun.sunLight.shadow.camera.near = params.shadow.camera.near;
      Sun.sunLight.shadow.camera.far = params.shadow.camera.far;
      Sun.sunLight.shadow.mapSize.width = params.shadow.mapSize.width;
      Sun.sunLight.shadow.mapSize.height = params.shadow.mapSize.height;
      Sun.sunLight.shadow.bias = params.shadow.bias;

      Sun.sunLight.shadow.camera.right = params.shadow.camera.right;
      Sun.sunLight.shadow.camera.left = params.shadow.camera.left;
      Sun.sunLight.shadow.camera.top = params.shadow.camera.top;
      Sun.sunLight.shadow.camera.bottom = params.shadow.camera.bottom;

      Earth.earthMesh.castShadow = true;
      Earth.earthMesh.receiveShadow = true;

      Cloud.cloudMesh.receiveShadow = true;

      Moon.moonMesh.castShadow = true;
      Moon.moonMesh.receiveShadow = true;

      this.activeWebGLRendererShadowMap();

      this.updateShadow();
    };

    this.activeWebGLRendererShadowMap = function () {
      Renderer.webGLRenderer.shadowMap.enabled = true;
      Renderer.webGLRenderer.shadowMap.type = THREE.PCFSoftShadowMap;
      Renderer.webGLRenderer.shadowMapSoft = true;
    };

    this.updateShadow = function () {
      Sun.sunLight.shadow.camera.updateProjectionMatrix();
      this.cameraHelper.update();
    };

    this.gui = {
      params: {
        colors: {},
      },

      reset: function () {
        var _default = paramsDefault();

        //self.cameraHelper.visible = _default.cameraHelper.visible;

        Sun.sunLight.castShadow = _default.shadow.castShadow;
        Sun.sunLight.shadow.camera.near = _default.shadow.camera.near;
        Sun.sunLight.shadow.camera.far = _default.shadow.camera.far;
        Sun.sunLight.shadow.mapSize.width = _default.shadow.mapSize.width;
        Sun.sunLight.shadow.mapSize.height = _default.shadow.mapSize.height;
        Sun.sunLight.shadow.bias = _default.shadow.bias;

        Sun.sunLight.shadow.camera.right = _default.shadow.camera.right;
        Sun.sunLight.shadow.camera.left = _default.shadow.camera.left;
        Sun.sunLight.shadow.camera.top = _default.shadow.camera.top;
        Sun.sunLight.shadow.camera.bottom = _default.shadow.camera.bottom;

        self.updateShadow();
      },

      add: function (gui) {
        var folderShadow = gui.addFolder("SHADOW");

        folderShadow
          .add(self.cameraHelper, "visible")
          .name("cameraHelper")
          .listen();

        folderShadow.add(Sun.sunLight, "castShadow").listen();

        folderShadow
          .add(Sun.sunLight.shadow.camera, "near")
          .step(10)
          .listen()
          .onChange(function () {
            self.updateShadow();
          });

        folderShadow
          .add(Sun.sunLight.shadow.camera, "far")
          .step(10)
          .listen()
          .onChange(function () {
            self.updateShadow();
          });

        folderShadow
          .add(Sun.sunLight.shadow.mapSize, "width", 0, 2048)
          .listen();

        folderShadow
          .add(Sun.sunLight.shadow.mapSize, "height", 0, 2048)
          .listen();

        folderShadow
          .add(Sun.sunLight.shadow, "bias", 0, 0.4)
          .step(0.001)
          .listen()
          .onChange(function () {
            self.updateShadow();
          });

        folderShadow
          .add(Sun.sunLight.shadow.camera, "right")
          .step(10)
          .listen()
          .onChange(function () {
            self.updateShadow();
          });

        folderShadow
          .add(Sun.sunLight.shadow.camera, "left")
          .step(10)
          .listen()
          .onChange(function () {
            self.updateShadow();
          });

        folderShadow
          .add(Sun.sunLight.shadow.camera, "top")
          .step(10)
          .listen()
          .onChange(function () {
            self.updateShadow();
          });

        folderShadow
          .add(Sun.sunLight.shadow.camera, "bottom")
          .step(10)
          .listen()
          .onChange(function () {
            self.updateShadow();
          });

        folderShadow.add(this, "reset").name("RESET SHADOW");

        return folderShadow;
      },
    };

    this.init();
  };

  return new _SceneShadow();
})(Scene);

/**
 * View
 */
var View = (function () {
  var self = this,
    clock,
    delta;

  var params = {
    imgDef: DEFAULT,
    helpClassname: "help",
  };

  var _View = function () {
    this.init = function () {
      clock = new THREE.Clock();

      this.updateAll();
      this.addGui();
      this.help();

      animate();

      window.addEventListener("resize", this.updateAll, false);
    };

    this.addGui = function () {
      var gui = new dat.GUI();

      Scene.gui.add(gui);
      Camera.gui.add(gui);
      Skymap.gui.add(gui);
      Sun.gui.add(gui);
      folderEarth = Earth.gui.add(gui);
      Cloud.gui.add(folderEarth);
      Moon.gui.add(gui);
      SceneShadow.gui.add(gui);
      Renderer.gui.add(gui);

      // gui.add(params, "imgDef", [DEFAULT, IMAGE_SD, IMAGE_HD]).name("IMG DEF ALL").listen()
      //     .onChange(function (imgDef) {
      //         imgDef = DEFAULT === imgDef ? undefined : imgDef;

      //         Sun.refreshTextures(imgDef);
      //         Skymap.setSceneBgCubeTexture(Scene.scene, imgDef);
      //         Earth.setMaterialTextures(imgDef);
      //         Cloud.setMaterialTextures(imgDef);
      //         Moon.setMaterialTextures(imgDef);
      //     });

      // gui.add(this, "resetAll").name("RESET ALL");
      // gui.add(this, "help").name("(?) HELP");
    };

    this.resetAll = function () {
      params.imgDef = DEFAULT;

      Renderer.gui.reset();
      Scene.gui.reset();
      Camera.gui.reset();
      Skymap.gui.reset();
      Sun.gui.reset();
      Earth.gui.reset();
      Cloud.gui.reset();
      Moon.gui.reset();
      SceneShadow.gui.reset();
    };

    this.updateAll = function () {
      console.log('first', 1);
      Camera.updateAspect();
      Renderer.updateSize();
    };

    this.help = function () {
      var helpElementStyle = document.getElementsByClassName(
        params.helpClassname
      )[0].style;
      helpElementStyle.display = this.helpHideToggle(helpElementStyle.display);
    };

    this.helpHideToggle = function (value) {
      return "none" === value ? "block" : "none";
    };

    var animate = function () {
      requestAnimationFrame(animate);
      delta = clock.getDelta();
      switch(sunhold) {
          case 1:
            // this.Sun.sunLensFlare.lensFlares[0].size +=5
            // this.Sun.sunLensFlare.lensFlares[0].distance += 0.005
            // this.Earth.earthMesh.position.y += 0.5
            
            // this.Camera.perspectiveCamera.position.z -= 0.1
          //  console.log('first',                 );
          // this.Camera.perspectiveCamera.up.x -= 1  ,  this.Camera.perspectiveCamera.up.y -= 1  , this.Camera.perspectiveCamera.up.z -=1
            // this.Earth.earthMesh.rotation._y +=0.2
            // this.Sun.sunLensFlare.lensFlares[0].distance +=0.002
            // console.log(`object`, this.Sun.sunLensFlare.lensFlares[0].distance)
            if(this.Sun.sunLensFlare.lensFlares[0].distance > 0.49){
       
              // if(this.Sun.sunLensFlare.lensFlares[0].size +=5)
            // this.Sun.sunLensFlare.lensFlares[0].size +=5

            if(this.Sun.sunLensFlare.lensFlares[0].size >= 300){
              sunhold=-1
              // console.log(`this.Sun.sunLensFlare.lensFlares[0].size`, this.Sun.sunLensFlare.lensFlares[0].size)
            }

            }
            // if(this.Sun.sunLensFlare.lensFlares[0].distance  )
            // console.log(`object`,this.Earth.earthMesh, this.Camera.perspectiveCamera.position.z)
            
            // this.Sun.perspectiveCamera.position.z += 0.001;
           break
          
        }
      switch (hold) {
        case 1:
          // this.Sun2_.sunLensFlare.lensFlares[0].distance += 0.005
          // this.Camera.perspectiveCamera.rotation._z += 0.5
          
          this.Camera.updateAspect();
          // this.Scene
          // this.Sun2_.sunLensFlare.lensFlares[0].size += 1;
          // this.Camera.perspectiveCamera.position.z -=2
          // this.Camera.perspectiveCamera.position.z -= 3;

          // this.Camera.perspectiveCamera.updateAll()

          // this.Camera.perspectiveCamera.far =+ 2

          if (this.Sun2_.sunLensFlare.lensFlares[0].distance > 0.49) {
            this.Earth.earthMesh.visible = false;

            hold = -1;

            // this.Sun2_.sunLensFlare.lensFlares[0].size +=1

            //
          }
          break;
        case 3:
          break;
      }
      // switch(earthhold) {
      //     case 1:
      //       this.Camera.perspectiveCamera.position.z += 0.1;
      //       // if(this.Sun2_.sunLensFlare.lensFlares[0].distance > 0.49){
      //       //   hold =-1
      //       // }
      //      break
      //     case 3:
      //       this.Camera.perspectiveCamera.position.z += 0.001;
      //       break;
      //   }
      // Earth.animate(delta);
      // Cloud.animate(delta);
      // Moon.animate(delta);

      Scene.orbitControls.update();
      Renderer.webGLRenderer.render(Scene.scene, Camera.perspectiveCamera);
    };

    this.init();
  };

  return new _View();
})();
