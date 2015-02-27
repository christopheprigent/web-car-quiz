<?php
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
?>
<html>
<head>
 <script src='./js/lib/angular.js' ></script>
 <script src='./js/controller.js' ></script>
</head>

<body ng-app="MyApp">
here
  <div ng-controller="PostsCtrl">
    <ul ng-repeat="post in posts">
      <li>{{post._id}} - brand :
<img width='100' height='50' ng-src='./ressources/img/brand/{{post.brand_low}}.png' />
<img width='150' height='75' ng-src='./ressources/img/car/{{(post._id)}}.png' /> 

{{post.brand}} | {{post.name}} | {{post.model}} | {{post.year}} | {{post.detail}}
</li>
    </ul>
	
  </div>
</body>


</html>