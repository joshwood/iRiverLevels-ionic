angular.module('iRiver.services', [])

	.service('RiverService', function($rootScope, $http, UrlService){

		  this.stateRivers = function(id){
				return $http.get(UrlService.stateRivers(id),
							{transformResponse:function(data) {
				                var x2js = new X2JS();
				                var json = x2js.xml_str2json( data );
				                return json;
				                }
				            }
				);
		  };

		  this.riverGage = function(gageId){
				return $http.get(UrlService.riverGage(gageId),
							{transformResponse:function(data) {
				                var x2js = new X2JS();
				                var json = x2js.xml_str2json( data );
				                return json;
				                }
				            }
				);
		  };

	})

	.service('UrlService', function($rootScope){

		var waterWeatherHost = 'http://water.weather.gov';
		var waterWeatherPath = '/ahps2/hydrograph_to_xml.php?output=xml&gage=';

		var dchaneyHost = 'http://www.darrenchaney.com/'
		var dchaneyLocalPath = '/dchaney/'

		this.riverGage = function(gageId){
			return $rootScope.isWebView ? (waterWeatherHost + waterWeatherPath + gageId) :
											(waterWeatherPath + gageId);
		};

		this.stateRivers = function(stateId){
			return $rootScope.isWebView ? (dchaneyHost + stateId + 'data.xml') :
											(dchaneyLocalPath + stateId + 'data.xml');
		};

	
	})
	
	.service('StatesService', function(){
		
		var statesList = [
			{ title: 'Alabama', id: 'al' },
			{ title: 'Alaska', id: 'ak' },
			{ title: 'Arizona', id: 'az' },
			{ title: 'Arkansas', id: 'ar' },
			{ title: 'California', id: 'ca' },
			{ title: 'Colorado', id: 'co' },
			{ title: 'Connecticut', id: 'ct' },
			{ title: 'Delaware', id: 'de' },
			{ title: 'Florida', id: 'fl' },
			{ title: 'Georgia', id: 'ga' },
			{ title: 'Hawaii', id: 'hi' },
			{ title: 'Idaho', id: 'id' },
			{ title: 'Illinois', id: 'il' },
			{ title: 'Indiana', id: 'in' },
			{ title: 'Iowa', id: 'ia' },
			{ title: 'Kansas', id: 'ks' },
			{ title: 'Kentucky', id: 'ky' },
			{ title: 'Louisiana', id: 'la' },
			{ title: 'Maine', id: 'me' },
			{ title: 'Maryland', id: 'md' },
			{ title: 'Massachusetts', id: 'ma' },
			{ title: 'Michigan', id: 'mi' },
			{ title: 'Minnesota', id: 'mn' },
			{ title: 'Mississippi', id: 'ms' },
			{ title: 'Missouri', id: 'mo' },
			{ title: 'Montana', id: 'mt' },
			{ title: 'Nebraska', id: 'ne' },
			{ title: 'Nevada', id: 'nv' },
			{ title: 'New Hampshire', id: 'nh' },
			{ title: 'New Jersey', id: 'nj' },
			{ title: 'New Mexico', id: 'nm' },
			{ title: 'New York', id: 'ny' },
			{ title: 'North Carolina', id: 'nc' },
			{ title: 'North Dakota', id: 'nd' },
			{ title: 'Ohio', id: 'oh' },
			{ title: 'Oklahoma', id: 'ok' },
			{ title: 'Oregon', id: 'or' },
			{ title: 'Pennsylvania', id: 'pa' },
			{ title: 'Rhode Island', id: 'ri' },
			{ title: 'South Carolina', id: 'sc' },
			{ title: 'South Dakota', id: 'sd' },
			{ title: 'Tennessee', id: 'tn' },
			{ title: 'Texas', id: 'tx' },
			{ title: 'Utah', id: 'ut' },
			{ title: 'Vermont', id: 'vt' },
			{ title: 'Virginia', id: 'va' },
			{ title: 'Washington', id: 'wa' },
			{ title: 'West Virginia', id: 'wv' },
			{ title: 'Wisconsin', id: 'wi' },
			{ title: 'Wyoming', id: 'wy' }
		];

		this.states = function(){
			return statesList;
		};

		this.nameFromId = function(id){
			return statesList.filter(function(obj){
				return obj.id === id;
			})[0].title;
		};

	})

    .factory('httpInterceptor', function ($q, $rootScope, $log) {

        var numLoadings = 0;
        return {
            request: function (config) {
                numLoadings++;
                // Show loader
                $rootScope.loader_show = true;
                return config || $q.when(config)

            },
            response: function (response) {
                if ((--numLoadings) === 0) {
                    // Hide loader
                    $rootScope.loader_show = false;
                }
                return response || $q.when(response);

            },
            responseError: function (response) {
                if (!(--numLoadings)) {
                    // Hide loader
                    $rootScope.loader_show = false;
                }
                return $q.reject(response);
            }
        };
    })

    .config(function ($httpProvider) {
        $httpProvider.interceptors.push('httpInterceptor');
    })

    .service('BusyService', ['$ionicLoading', function($ionicLoading){

        this.show = function(){
            $ionicLoading.show({
                content: '<h1><i class="icon ion-ios7-reloading"></i></h1>',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 93,
                showDelay: 100
            })
        };

        this.hide = function(){
            $ionicLoading.hide();
        }

    }])

	;