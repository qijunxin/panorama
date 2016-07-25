# panorama
学习webgl开发的一个插件，只需提供全景图的六张图片，即可制作一个全景图

用法：
*    首先，引入js库，three.js必须在panorama.js之前引入
     		<script src="js/three.js"></script>
		<script src="js/panorama.js"></script>
*    然后设置六张用来制作全景的图片，按需要也可以指定container的ID
```
       var textures = [

			'textures/cube/skybox/px.jpg', // right
			'textures/cube/skybox/nx.jpg', // left
			'textures/cube/skybox/py.jpg', // top
			'textures/cube/skybox/ny.jpg', // bottom
			'textures/cube/skybox/pz.jpg', // back
			'textures/cube/skybox/nz.jpg'  // front

		];

		var panorama = new Panorama({textures:textures，containerID:'container'});
```
