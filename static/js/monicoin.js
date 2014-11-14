angular.module('MoniCoin',[])
	.controller('TradeController',['$scope',function($scope){
		
		//最新成交价
		var ws = new WebSocket('wss://real.okcoin.cn:10440/websocket/okcoinapi');
		ws.onopen = function(event){
			ws.send("{'event':'addChannel','channel':'ok_btccny_ticker'}");
			ws.onmessage = function(event){
				var data = JSON.parse(event.data)[0].data.sell;
				$scope.$apply(function(){
					$scope.price = data;
				})
			}
		}



		//最新数据
		function init(){
			if(!localStorage.property) localStorage.property=0;
			if(!localStorage.bitcoin) localStorage.bitcoin=0;
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
				"price": price,
				"money": - price * count,
				"date": now()
			})
			localStorage.property = parseFloat(localStorage.property) - parseFloat(price * count);
			localStorage.bitcoin = parseFloat(localStorage.bitcoin) + parseFloat(count);

			init();

		}

		//卖出操作
		$scope.sole = function(price,count){
			storedb('trade').insert({
				"type": "sole",
				"count": count,
				"price": price,
				"money": price * count,
				"date": now()
			})
			localStorage.property = parseFloat(localStorage.property) + parseFloat(price * count);
			localStorage.bitcoin = parseFloat(localStorage.bitcoin) - parseFloat(count);
			init();
		}

		//重置数据
		$scope.reset = function(){
			localStorage.clear();
			init();
		}


	}])