'use strict';
/* Controllers */

function listGistCtrl($scope, $http) {
    $http.get('http://localhost:3000/gists')
            .success(function(data) {
        $scope.gists = data;
    });
}

function singleGistCtrl($scope, $routeParams, $http) {
    $http.get('http://localhost:3000/gists/' + $routeParams.gistId)
            .success(function(data) {
        $scope.single = data;
    });
}

function CodeMirrorCtrl($scope) {
    $scope.codeMirrorModel = "var a = [], b, c; a.push('42')";
}

function commentsGistCtrl($scope, $routeParams, $http) {
    $http.get('http://localhost:3000/gists/comments/' + $routeParams.gistId)
            .success(function(data) {
        $scope.comments = data;
    });
}

function createGistCtrl($scope, $routeParams, $http) {
    $scope.save = function() {
        console.log([
            $scope.gistTitle,
            $scope.gistFileName,
            $scope.gistContent
        ]);
        var files = {};
        files[$scope.gistFileName] = {
            content: $scope.gistContent
        };
        var data = {
            description: $scope.gistTitle,
            public: false,
            files: files
        };
        $http.defaults.headers.put['Access-Control-Allow-Origin'] = '*';
        $http.defaults.headers.put['Access-Control-Allow-Methods'] = 'POST, GET, PUT, DELETE, OPTIONS';
        $http.defaults.headers.put['Access-Control-Allow-Headers'] = 'X-Requested-With, Content-Type';
        $http.post('http://localhost:3000/gists/create', data)
                .success(function(response) {
            window.location.href = "#/gist/" + response.id
        });
    }
}

