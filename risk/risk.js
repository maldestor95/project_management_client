angular.module('risk',[])
	.controller('riskController',['$scope','$http',function($scope,$http){
		this.risks =risksList;
        $scope.predicate='gravity';
        $scope.reverse=true;
        this.alert=function(msg){
            console.log(msg);
            alert(msg);
        };
        this.new_risk=function(){
        	var new_risk={
        		description:$scope.risk.desc,
				type:$scope.risk.type,
        		risk_opp : $scope.risk.risk_opp,
        		date_created: Date.now(),
				origine:$scope.risk.orig,
				history:[{
					gravity: $scope.risk.gravity||1,
					probability:$scope.risk.probability||1,
        		    date:Date.now(),
				}],
				impact:$scope.risk.impact,
        		impact_desc: $scope.risk.impact_desc,
        		Status_open: true,
        		preventive_action: $scope.risk.preventive_action,
        		Leader:$scope.risk.leader
    		}
       		this.risks.push(new_risk);
              $http({method: 'GET', url: '/someUrl',params:new_risk}).
              success(function(data, status, headers, config) {
                // this callback will be called asynchronously
                // when the response is available
                alert(data);
              }).
              error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                alert(status);
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

