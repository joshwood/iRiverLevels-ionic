angular.module('iRiver.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('StateListCtrl', function($scope, StatesService) {
	$scope.states = StatesService.states();
})

/* 
 * x2js angular code ripped from here
 * http://rabidgadfly.com/2013/02/angular-and-xml-no-problem/
 * stateId in stateParams comes from routes in app.js
 */
.controller('StateCtrl', function($scope, $stateParams, $log, RiverService, StatesService) {

	$scope.stateId = $stateParams.stateId;
	$scope.stateName = StatesService.nameFromId($stateParams.stateId);

	RiverService.stateRivers($stateParams.stateId)
		.success(function(data, status){
	    	data.rivers.river.sort(function(a,b){
	    		return a._name.localeCompare(b._name);
	    	});
	    	$scope.rivers = data.rivers.river;
		})
		.error(function(data, status){
			$log.error('got error '+status);
		});


})

/*
 * controller for the river gage data - the chart basically
 * stateId/gageId in stateParams comes from routes in app.js
 * ripped starting point from here http://jsfiddle.net/pablojim/7cAq3/
 */
.controller('RiverCtrl', function($scope, $stateParams, $log, RiverService, StatesService) {

	$scope.stateId = $stateParams.stateId;
	$scope.stateName = StatesService.nameFromId($stateParams.stateId);

	RiverService.riverGage($stateParams.gageId)
		.success(function(data, status){
	    	// chart is hidden utill this is in scope (generic 'chart title' was being shown)
	    	$scope.riverDatum = new RiverDatum(data.site);
		    $scope.chartConfig = {
	            chart: {
	                zoomType: 'x'
	            },
	            title: {
	                text: data.site._name
	            },
	            subtitle: {
	                text: document.ontouchstart === undefined ?
	                    'Click and drag in the plot area to zoom in' :
	                    'Pinch the chart to zoom in'
	            },
	            xAxis: {
	                type: 'datetime',
	                minRange: 1
	            },
	            yAxis: {
	                title: {
	                    text: 'Stage (ft)'
	                }
	            },
	            legend: {
	                enabled: false
	            },
	            plotOptions: {
	                area: {
	                    fillColor: {
	                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
	                        stops: [
	                            [0, Highcharts.getOptions().colors[0]],
	                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
	                        ]
	                    },
	                    marker: {
	                        radius: 2
	                    },
	                    lineWidth: 1,
	                    states: {
	                        hover: {
	                            lineWidth: 1
	                        }
	                    },
	                    threshold: null
	                }
	            },
	            series: [{
	                type: 'area',
	                name: 'Site Time',
	                pointInterval: $scope.riverDatum.interval,
	                pointStart: $scope.riverDatum.startDate,
	                data: $scope.riverDatum.data,

	            }]
		    };

		})
		.error(function(data, status){
			$log.error('got error '+status);
		});



});
