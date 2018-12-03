	const app = angular.module('app', []);

    angular.module('app', []);

	(function(app) {
		angular.module('app', []).controller('ParentCtrl', ParentCtrl);

	    ParentCtrl.$inject = ['$scope'];

	    function ParentCtrl() {
	    	console.log('parent');
	    }


	    angular.module('app', []).controller('ChildCtrl1', ChildCtrl1);

	    ChildCtrl1.$inject = ['$scope'];

	    function ChildCtrl1() {
	    	console.log('child1');
	    }


	    angular.module('app', []).controller('ChildCtrl2', ChildCtrl2);

	    ChildCtrl2.$inject = ['$scope'];

	    function ChildCtrl2() {
	    	console.log('child2');
	    }	

	})(app);
    