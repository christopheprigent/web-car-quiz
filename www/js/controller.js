var app = angular.module("MyApp", []);
app.controller("PostsCtrl", function($scope, $http) {
  $http.get('./callback/carGet.php').
    success(function(data, status, headers, config) {
      $scope.posts = data;
	  console.log(data);
    }).
    error(function(data, status, headers, config) {
      console.log(data);
    });
});