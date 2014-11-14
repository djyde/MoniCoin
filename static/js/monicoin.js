angular.module('MoniCoin',[])
	.controller('TradeController',['$scope',function($scope){
		//最新成交价
		$scope.price = 777;

		if(!localStorage.bitcoin){
			localStorage.bitcoin = 0;
		}

		if(!localStorage.property){
			localStorage.property = 0;
		}

		//最新数据
		function init(){
			$scope.trades = storedb('trade').find();
			$scope.property = localStorage.property;
			$scope.bitcoin = localStorage.bitcoin;
		}

		function now(){
			var d = new Date();
			return d.getFullYear().toString()+ "-" +d.getMonth() +"-" +d.getDate() + " "+d.getHours() +" : " + d.getMinutes()+" : " + d.getSeconds()
		}

		init();

		//买入操作
		$scope.buy = function(price,count){
			storedb('trade').insert({
				"type": "buy",
				"count": count,
				"money": - price * count,
				"date": now()
			})
			localStorage.property = parseInt(localStorage.property) - parseInt(price * count);
			localStorage.bitcoin = parseInt(localStorage.bitcoin) + parseInt(count);
			init();

		}

		//卖出操作
		$scope.sole = function(price,count){
			storedb('trade').insert({
				"type": "sole",
				"count": count,
				"money": price * count,
				"date": now()
			})
			localStorage.property = parseInt(localStorage.property) + parseInt(price * count);
			localStorage.bitcoin = parseInt(localStorage.bitcoin) - parseInt(count);
			init();
		}


	}])