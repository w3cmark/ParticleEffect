/***
# canvas粒子效果组件

+ 本组件可以实现飘雪、下雨、花瓣、星火等粒子效果

+ demo地址后面加上参数`?fps=1` 可以在页面左上角显示当前的fps状态;

+ 组件有加入canvas支持判断，**pc移动**都可以用

## 参数列表

名字     | 说明                                           | 备注
-----------    |------------------------------------------------|------
**参数** |
第一个参数     | canvas容器DOM                                     | 必填
startPoint    | 粒子起点坐标，默认是画布的中心                      | 选填
direction     | 粒子x，y方向，用正负1来代表方向(默认为(0,0)随机方向  | 选填
speed         | 粒子速度（默认为2）                                | 选填
size          | 粒子大小(默认为2)                                  | 选填
count         | 粒子数量级，默认为5（0-10）                         | 选填
startColor    | 粒子渐变色的起始值，粒子不是图片时生效（默认值rgba(255,255,255,1)）  | 选填
endColor       | 粒子渐变色的结束值,粒子不是图片时生效（默认值rgba(255,255,255,0.3)）         | 选填

************调用粒子************

<canvas class="snow-canvas" id="Jcanvas">
    <img src="img/snow.png" class="hide">
</canvas>


$('#Jcanvas')[0].width = 1900;
$('#Jcanvas')[0].height = 1000;
ParticleEffect.create('#Jcanvas',{
    startPoint: '1900,-100', //【选填】起点坐标，默认是画布的中心
    image: 'img/snow.png', //【选填】粒子图片，切图时请切正方形（默认为空）
    direction: '-1, 1' ,//【选填】x，y方向，用正负1来代表方向(默认为(0,0)随机方向)
    speed: '10' , //【选填】粒子速度（默认为2）
    size: '25', //【选填】粒子大小(默认为2)
    count: '5' //【选填】粒子数量级，默认为5（0-10）
});

***/

var ParticleEffect = function() {
  var _class = function(options) {
    var _width,
		_height,
		_ctx,
		_particles = {},
		_particleNum,
		_particleIndex = 0,
		_startColor,
		_endColor,
		_size,
        _speed,
		_directionX = 0,
		_directionY = 0,
        _startPointX,
        _startPointY,
		_image,
		_imageEle;

    this.options = $.extend({
      count: 5,
      speed: 2,
      size: 2,
      startColor: 'rgba(255,255,255,1)',
      endColor: 'rgba(255,255,255,0.3)'
    }, options);
    this.canvas = this.options.canvas.get(0);
    _ctx = this.canvas.getContext("2d");
    _particleNum = (10 - this.options.count)/10;
    _size = this.options.size;
    _speed = this.options.speed;
    _width = this.canvas.width,
    _height = this.canvas.height;
    _startPointX = _width/2;
    _startPointY = _height/2;
    _startColor = this.options.startColor;
    _endColor = this.options.endColor;
    _imageEle = this.options.canvas.find('img');
    if(this.options.direction){
        var directions = this.options.direction.split(',');
        if(directions[1]){
            _directionX = directions[0];
            _directionY = directions[1];
        }
    }
    if(this.options.startPoint){
        var startPoints = this.options.startPoint.split(',');
        if(startPoints[1]){
            _startPointX = startPoints[0]*1;
            _startPointY = startPoints[1]*1;
        }
    }

	if (!Date.now)
		Date.now = function() {
		return new Date().getTime();
	};
    var vendors = ['webkit', 'moz'];
	for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
		var vp = vendors[i];
		window.requestAnimationFrame = window[vp + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = (window[vp + 'CancelAnimationFrame'] || window[vp + 'CancelRequestAnimationFrame']);
	}
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
      || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
      var lastTime = 0;
      window.requestAnimationFrame = function(callback) {
        var now = Date.now();
        var nextTime = Math.max(lastTime + 16, now);
        return setTimeout(function() {
            callback(lastTime = nextTime);
          },
          nextTime - now);
      };
      window.cancelAnimationFrame = clearTimeout;
    }

    function animate() {
      var _this = this;
      window.requestAnimationFrame(animate);
      _ctx.globalCompositeOperation = "source-over";
      _ctx.clearRect(0, 0, _width, _height);
      _ctx.globalCompositeOperation = "lighter";
      if (Math.random() > _particleNum) {
        new Particle();
      }
      for (var i in _particles) {
        _particles[i].draw();
      }
    }

    function Particle() {
        this.x = _startPointX;
        this.y = _startPointY;

        this.vx = direction(_directionX) * _speed * Math.random();
        this.vy = direction(_directionY) * _speed * Math.random();
        this.growth = (Math.abs(this.vx) + Math.abs(this.vy)) * 0.01;

        _particleIndex++;
        _particles[_particleIndex] = this;
        this.id = _particleIndex;
        this.size = Math.random() * _size;

    }

    function direction(n){
      var d,
          n = n*1;
      if((n && n > 0) || (!n && Math.random() - 0.5 > 0)){
        d = 1;
      }else{
        d = -1;
      }
      return d;
    }
    Particle.prototype.draw = function() {
      this.x += this.vx;
      this.y += this.vy;

      this.size += this.growth;
      if (this.x > _width || this.y > _height) {
        _particleIndex--;
        delete _particles[this.id];
      }

      if(_imageEle.attr('src')){
        _ctx.drawImage(_imageEle.get(0), this.x, this.y, this.size, this.size);
        return;
      }

      var grd = _ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);
      grd.addColorStop(0, _startColor);
      grd.addColorStop(1, _endColor);
      _ctx.fillStyle = grd;
      _ctx.beginPath();
      _ctx.arc(this.x, this.y, this.size, 0 * Math.PI, 2 * Math.PI);
      _ctx.fill();
    };
    window.requestAnimationFrame(animate);
  };

  return {
    create: function(ele,options) {
      if(!document.createElement('canvas').getContext){
        return;
      }
      $(ele).each(function(i, e) {
        var scope = $.extend({}, options);
        $.each(e.attributes, function(index, key) {
          scope[$.camelCase(key.name)] = Number(Number(key.value)) ? Number(key.value) : key.value
        });
        scope.canvas = $(e);
        return new _class(scope);
      });

    }
  }
}();
