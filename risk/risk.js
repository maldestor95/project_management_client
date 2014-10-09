angular.module('risk',[])
	.controller('riskController',['$scope','$http',function($scope,$http){
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


        this.alert=function(msg){
            console.log(msg);
            alert(msg);
        };

        this.new_risk=function($scope){
        	//construction de l'objet new_risk
            var new_risk={
        		description:$scope.desc,
				type:$scope.type,
        		risk_opp : $scope.risk_opp,
        		date_created: Date.now(),
				origine:$scope.orig,
				history:[{
					gravity: $scope.gravity||1,
					probability:$scope.probability||1,
        		    date:Date.now(),
				}],
				impact:$scope.impact,
        		impact_desc: $scope.impact_desc,
        		Status_open: true,
        		preventive_action: $scope.preventive_action,
        		Leader:$scope.leader
    		}       		
              
            $http({method: 'POST', url: '/risks/risk',data:new_risk, headers : "application/x-www-form-urlencoded"}).
            success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                $rootScope.$scope.risks.push(new_risk);
                alert(data);
                console.log(data);
            }).
            error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert(status);
                console.log(status);
            });
        };
        this.put=function($scope){
            console.log(JSON.stringify($scope));
        };
        this.delete=function($scope){
            console.log("DELETE "+JSON.stringify($scope));
            $http({method: 'DELETE', url: '/risks/risk/'+$scope, headers : "application/x-www-form-urlencoded"}).
            success(function(status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                //$scope.risks = $filter('filter')($scope.risks, {_id: $scope._id})

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
    });

var risksList=[
{
	description:'Retard fabrication cartes',
	type:'management',
    risk_opp : 'risk',
    date_created: [],
	origine:'Externe',
	history:[{
		gravity: 2,
		probability:3,
        date:[],
	}],
	impact:'cost',
    impact_desc: '',
    Status_open: true,
    preventive_action: 'blabla',
    Leader:'Ludo'
},
{
	description:'Disponibilité compilateur',
	type:'technique',
    risk_opp : 'opportunity',
    date_created: [],
	origine:'Interne',
	history:[{
		gravity: 3,
		probability:3,
        date:[],
	}],
	impact:'delay',
    impact_desc: '',
    Status_open: true,
    preventive_action: 'blabla',
    Leader:'Paul'
},
{
    description:'R3_Desc',
    type:'technique',
    risk_opp : 'opportunity',
    date_created: [],
    origine:'Interne',
    history:[{
        gravity: 1,
        probability:1,
        date:[],
    }],
    impact:'delay',
    impact_desc: '',
    Status_open: true,
    preventive_action: 'blabla',
    Leader:'Paul'
}
]

