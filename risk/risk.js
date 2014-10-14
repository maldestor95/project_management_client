angular.module('risk',[])
	.controller('riskController',['$scope','$http',function($scope,$http){
        //initialisation du controlleur
        $http({method: 'GET', url: '/risks/risk'}).
                success(function(data, status, headers, config) {
                        // this callback will be called asynchronously
                        // when the response is available
                        $scope.riskCtrl.risks=data;
                }).
                error(function(data, status, headers, config) {
                        // called asynchronously if an error occurs
                        // or server returns response with an error status.
                        alert(status);
                        return {};
                });
        $scope.predicate='gravity';
        $scope.reverse=true;
        $scope.show_new_risk=false;
        $scope.history_detail=false;

        this.alert=function(msg){
            console.log(msg);
            alert(msg);
        };

        //Ajout d'un risque
        this.POST=function(){
        	//construction de l'objet new_risk
            var new_risk={
        		description:$scope.nrisk.desc,
				type:$scope.nrisk.type,
        		risk_opp : $scope.nrisk.risk_opp,
        		date_created: Date.now(),
				origine:$scope.nrisk.orig,
                gravity:$scope.nrisk.gravity,
                probability:$scope.nrisk.probability,
				history:[{
					gravity: $scope.nrisk.gravity||1,
					probability:$scope.nrisk.probability||1,
        		    date:Date.now(),
				}],
				impact:$scope.nrisk.impact,
        		impact_desc: $scope.nrisk.impact_desc,
        		Status_open: true,
        		preventive_action: $scope.nrisk.preventive_action,
        		Leader:$scope.nrisk.leader
    		}       		
              
            $http({method: 'POST', url: '/risks/risk',data:new_risk, headers : "application/x-www-form-urlencoded"}).
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                $scope.riskCtrl.risks.push(data);
                //on cache le formulaire
                $scope.show_new_risk=false;
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert(status);
                console.log(status);
            });
        };

        //Mise à jour d'un risque
        this.PUT=function($scope){
            console.log("PUT :"+JSON.stringify($scope));
            var updated_risk=$scope;
            $http({method: 'PUT', url: '/risks/risk/'+$scope._id,data:updated_risk, headers : "application/x-www-form-urlencoded"}).
            success(function(data,status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log('PUT SUCCESS '+JSON.stringify(status));
                /*var item_to_delete=$scope.riskCtrl.risks.map(function(e) { return e._id; }).indexOf($idx);
                $scope.riskCtrl.risks.splice(item_to_delete,1);*/
       /*         var item_to_delete=$scope.riskCtrl.risks.map(function(e) { return e._id; }).indexOf($scope._id);
                $scope.riskCtrl.risks.splice(item_to_delete,1);*/

                /*$rootscope.$scope.riskCtrl.risks.push(data);*/
                

            }).
            error(function(status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert(status);
                console.log(status);
            });
        };
        this.delete=function($idx){
            console.log("DELETE "+JSON.stringify($idx));
            $http({method: 'DELETE', url: '/risks/risk/'+$idx, headers : "application/x-www-form-urlencoded"}).
            success(function(status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                console.log($idx);
                var item_to_delete=$scope.riskCtrl.risks.map(function(e) { return e._id; }).indexOf($idx);
                $scope.riskCtrl.risks.splice(item_to_delete,1);

            }).
            error(function(status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert(status);
                console.log(status);
            });
        };        
    }])

    .directive('newRisk',function(){
    	return {
    		restrict: 'E',
    		templateUrl: 'risk/new-risk.html'
    	}
    })

    .directive('listRisks',function(){
        return {
            restrict: 'E',
            templateUrl: 'risk/list-risks.html'
        }
    })
    .directive('editRisk',function(){
        return {
            restrict: 'E',
            templateUrl: 'risk/new-risk.html'
        }  
    })
    .directive('ldSortarrow',function(){
            return {
                restrict: 'E',
                scope:{key:'@key'},
                controller: function($scope)
                    {var key="$scope.key";},
                template: '*{{key}}*<span class="glyphicon glyphicon-chevron-down"></span>'
            }  
        });

    



