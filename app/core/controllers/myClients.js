module.exports = function($scope,$http) {
  $scope.name = "Que Gostoso!";
  $scope.logo = "logo-que-gostoso.png";
  $scope.msg = "";

  $scope.clients = [];

  $scope.page = 1;

  $scope.displayItems = $scope.clients.slice(0, 3);

  $scope.pageChanged = function() {
    var startPos = ($scope.page - 1) * 3;
    //$scope.displayItems = $scope.clients.slice(startPos, startPos + 3);
    console.log($scope.page);
  };

  var listClients = function (){
    //node.js $http.get('http://localhost:8080/clients/').then(function(response){
    $http.get('http://localhost:8080').then(function(response){
      console.log(response.data);
      // console.log(response.status);
      $scope.clients = response.data;
      console.log($scope.clients);
    }).catch(function(error) {
      alert('Ocorreu um erro. ' + error);
    });
  };

  var addClients = function (client){
    $http.post('http://localhost:8080',client).then(function(response){
      console.log('New client is: ' + response.data);
      listClients();
    }).catch(function(error) {
      alert('Ocorreu um erro. ' + error);
    });
  };

  var deleteClients = function (client){
    client.delete = true;
    console.log(client).
    $http.get('http://localhost:8080',client).then(function(response){
      console.log(response.data);
    }).catch(function(error) {
      alert('Ocorreu um erro. ' + error);
    });
  };

  listClients();

  $scope.add = function(client){
    //$scope.clients.push(angular.copy(client));
    addClients(angular.copy(client));
    $scope.formClient.$setPristine(); // Leave the form blank
    delete $scope.client;
    $scope.msg = "Novo cliente foi salvo";

  };

  $scope.edit = function(client){
    $scope.client = client;
    $scope.editing = true;
    $scope.msg = "";
  };

  $scope.save = function(){
    //client = angular.copy($scope.client);
    addClients(angular.copy($scope.client));
    $scope.formClient.$setPristine();
    delete $scope.client;
    $scope.editing = false;
    $scope.msg = "Cliente alterado com sucesso!";
  };

  //delete
  /*$scope.destroy = function(id){
  $scope.clients.splice(id,1)
}*/

$scope.destroy = function(client){
  $scope.clients.splice($scope.clients.indexOf(client),1);
  deleteClients(client);
  $scope.msg = "Cliente deletado com sucesso!";
}

$scope.orderBy = function(col){
  $scope.order = col;
  $scope.reverse = !$scope.reverse;
};


};
