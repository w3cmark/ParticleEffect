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

## 调用栗子一

DEMO地址：[http://www.w3cmark.com/demo/particle-effect.html](http://www.w3cmark.com/demo/particle-effect.html)

### HTML

```html
<canvas class="snow-canvas" id="Jcanvas"></canvas>
```

### JS

```javascript

$('#Jcanvas')[0].width = 1900;
$('#Jcanvas')[0].height = 1000;
ParticleEffect.create('#Jcanvas');

```

## 调用栗子二（粒子用图片）

> 目前组件只支持一张图片的形式，只需要在canvas标签里面插入img标签即可。如果图片存在，会优先使用图片

DEMO地址：[http://www.w3cmark.com/demo/particle-effect2.html](http://www.w3cmark.com/demo/particle-effect2.html)

### HTML

```html
<canvas class="snow-canvas" id="Jcanvas">
    <img src="img/snow.png" class="hide">
</canvas>
```

### JS

```javascript

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

```