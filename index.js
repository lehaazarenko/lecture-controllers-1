(function() {
	const app = angular.module('app', []);

	angular.module('app', []);

	(function() {
		angular.module('app').factory('ExchangeFactory', ExchangeFactory);
	
		function ExchangeFactory() {
			return {
				total: 0,
				value1: 0,
				value2: 0,
				updateValue: function(valueNumber, value) {
					this[valueNumber] = value;
					this.updateTotal();
				},
				updateTotal: function() {
					this.total = this.value1 + this.value2;
				}
			}
		}
	})();

	(function() {
		angular.module('app').controller('ParentCtrl', ParentCtrl);

	    ParentCtrl.$inject = ['$scope'];

	    function ParentCtrl($scope, ExchangeFactory) {
	    	const ctrl = this;
	    	$scope.value = 'value';
	    	console.log('parent');
	    	// $scope.$on('setValue', (event, args) => {
	    	// 	console.log('on in parent');
	    	// 	$scope.$broadcast('sendValueToChild', {
	    	// 		value: args.value
	    	// 	})
	    	// });
	    }


	    angular.module('app').controller('ChildCtrl1', ChildCtrl1);

	    ChildCtrl1.$inject = ['$scope', '$rootScope', 'ExchangeFactory'];

	    function ChildCtrl1($scope, $rootScope, ExchangeFactory) {
	    	const ctrl = this;
	    	$scope.value1 = 93;
	    	console.log($scope.value1);
	    	console.log(ExchangeFactory);

	    	(function() {
	    		ExchangeFactory.updateValue('value1', $scope.value1)
	    	})();
	    	// function setNewValue(value) {
	    	// 	console.log('emit in 1');
	    	// 	$scope.$emit('setValue', {
	    	// 		value: value
	    	// 	});
	    	// }
	    	// setNewValue($scope.value1);
	    	// $scope.$on('sendValueToChild', (event, args) => {
	    	// 	console.log('on in 1');
	    	// 	$scope.total = $scope.value2 + args.value;
	    	// });
	    }


	    angular.module('app').controller('ChildCtrl2', ChildCtrl2);

	    ChildCtrl2.$inject = ['$scope', 'ExchangeFactory'];

	    function ChildCtrl2($scope, ExchangeFactory) {
	    	const ctrl = this;
	    	$scope.value2 = 20;
	    	// $scope.total = ExchangeFactory.total;
	    	console.log($scope.value2);
	    	console.log($scope.total);
	    	// $scope.$on('sendValueToChild', (event, args) => {
	    	// 	console.log('on in 2');
	    	// 	$scope.total = $scope.value2 + args.value;
	    	// });

	    	(function() {
	    		ExchangeFactory.updateValue('value2', $scope.value2);
	    		console.log(ExchangeFactory);
	    		updateTotal();
	    	})();

	    	function updateTotal() {
	    		$scope.total = ExchangeFactory.total;
	    	}
	    }	

	})();
})();