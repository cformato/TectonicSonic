'use strict';

angular.module('app.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'ViewCtrl'
  });
}])

.controller('ViewCtrl', ['$scope', 'Users', 'Cards', 'wsComm', 'httpRequest', 'gameStateEmu',
  function($scope, Users, Cards, wsComm, httpRequest, gameStateEmu) {
  ///////////////////////////////////////////////
  // Sim game logic
  var mySelf = Users.addUser();
  var deckCards = Cards.shuffleBySwap();

  // $scope.deckCards
  if (deckCards.length) {
    $scope.cardBack = Cards.imageCardBack();
  };

  var gameState = JSON.parse(gameStateEmu.gameStateJSON[0]);


  // var player = {};
  var players = [];
  var cardBacks = [$scope.cardBack, $scope.cardBack];
  // console.log('cardBacks: ',cardBacks);
  for (var i = 0; i < 5; i++) {
    // players.push(Users.addUser());
    if(gameState.user[i].active) {
      var player = {"name":[gameState.user[i].name], "money":gameState.user[i].money};
      if(gameState.round > 0 && gameState.round < 5) {
        player.hand = cardBacks;
      }

      if(gameState.round === 5) {
        player.hand = Cards.renderCards(gameState.user[i].hand);
      }

      // players.push({"name":[gameState.user[i].name], "money":gameState.user[i].money, "hand":gameState.user[i].hand});
      players.push(player);
      console.log(player);
    }
  };

  if(gameState.round === 0) {
    document.getElementById("publicDeck").style.visibility = "hidden";  
    document.getElementById("playerDeck").style.visibility = "hidden"; 
    document.getElementById("playerList").style.visibility = "hidden";
    // document.getElementsByClassName("playersView").style.visibility = "hidden";
    // document.getElementsByClassName("table").style.visibility = "visible";
    // document.getElementById("deck").style.visibility = "visible";
  }

  // mySelf.cards.push(deckCards.pop());
  // mySelf.cards.push(deckCards.pop());

  // console.log(gameStateEmu);
  // console.log(gameStateEmu.gameState);
  // console.log(gameStateEmu.gameStateJSON[0]);
  console.log(JSON.parse(gameStateEmu.gameStateJSON[0]));
  // console.log(JSON.parse(gameStateEmu.gameStateJSON[0]).user[0].hand[0]);
  // console.log(JSON.parse(gameStateEmu.gameStateJSON[0]).user[0].hand[1]);

  // console.log(gameState);
  // console.log(gameState.user[0].hand[0]);
  // console.log(gameState.user[0].hand[1]);
  // mySelf.cards.push(gameState.user[0].hand[0]);
  // mySelf.cards.push(gameState.user[0].hand[1]);
  mySelf.cards = gameState.user[5].hand


  // mySelf.cards.push(JSON.parse(gameStateEmu.gameStateJSON[0]).user[0].hand[0]);
  // mySelf.cards.push(JSON.parse(gameStateEmu.gameStateJSON[0]).user[0].hand[1]);

  // display community cards
  // var flopCards = ['9h', '9s', '9d', '9c']
  var endSlice = 0;
  if(gameState.round === 2) {
    endSlice = 3;
  }
  else if(gameState.round === 3) {
    endSlice = 4;
  }
  else if(gameState.round === 4 || gameState.round === 5) {
    endSlice = 5;
  }

  // var communityCards = gameState.cards.slice(0,endSlice);

  // for(var i = 0; i < communityCards.length; i++) {
  //   var elem = document.createElement("img");
  //   var cardString = '../image/cards/';
  //   cardString += Cards.imageFromValueSuit(communityCards[i][0],communityCards[i][1]);
  //   elem.src = cardString; //communityCards[i]
  //   elem.className="card";
  //   document.getElementById("communityCards").appendChild(elem);

  //   // img class='card' ng-src=cardString;

  //   // var elem = document.createElement("img");

  //   // document.getElementById("communityCards").appendChild(img class='card' ng-src=cardString);

  //   //imageFromValueSuit
  // }

  var publicCards = gameState.cards.slice(0,endSlice);
  // var publicCards = [];
  // publicCards.push(deckCards.pop());
  // publicCards.push(deckCards.pop());
  // publicCards.push(deckCards.pop());
  // // Two more rounds
  // publicCards.push(deckCards.pop());
  // publicCards.push(deckCards.pop());

  // OtherPlayers cards
  // for (var i = 0; i < 5; i++) {
  //   players[i].cards.push(deckCards.pop());
  //   players[i].cards.push(deckCards.pop());
  //   players[i].cardsImg.push(Cards.imageCardBack());
  // };

  $scope.players = players;
  $scope.publicCardsImg = Cards.renderCards(publicCards);

  // console.log("player status: ",  player);
  mySelf.cards = Cards.renderCards(mySelf.cards);
  $scope.mySelf = mySelf; 
  ///////////////////////////////////////////////
  // Global vars
  // wsComm.wsSend(JSON.stringify("Check"));
  // var gameState;

  /////////////////////////////////////////////// 
  var init = function() {
    $scope.mySelf.myName = "";
    $scope.gameState;
    // init ws communication
    wsComm.wsInit();

    $scope.inputUsername = function() {
      var myName = $scope.mySelf.myName;
      // console.log("myUsername:", myName);
      // httpRequest.identity(myName).then(function(dataResponse, status, headers, config) {
      //    $scope.mySelf.uid = dataResponse.data;  
      // });
    };

    $scope.sitBtn = function() {
      var myUid = $scope.mySelf.uid;
      // httpRequest.sit(myUid, seatId).then(function(dataResponse, status, headers, config) {
        
      // };
    };

    $scope.standBtn = function() {
      var myUid = $scope.mySelf.uid;
      // httpRequest.stand(myUid).then(function(dataResponse, status, headers, config) {
        
      // };
    };

    $scope.checkBtn = function() {
      var myUid = $scope.mySelf.uid;
      // httpRequest.check(myUid).then(function(dataResponse, status, headers, config) {
        
      // };
    };

    $scope.foldBtn = function() {
      var myUid = $scope.mySelf.uid;
      // httpRequest.fold(myUid).then(function(dataResponse, status, headers, config) {
        
      // };
    };

    // input how much
    $scope.betBtn = function() {
      var myUid = $scope.mySelf.uid;
      // httpRequest.bet(myUid).then(function(dataResponse, status, headers, config) {
        
      // };
    };

    $scope.callBtn = function() {
      var myUid = $scope.mySelf.uid;
      // httpRequest.call(myUid).then(function(dataResponse, status, headers, config) {
        
      // };
    };

  }

  init();
  // check updated gameState received from WebSocket
  // Required logic for updating front end view here
  var gameStateProc = function (gameState) {
    // required for dynamically change scope
    $scope.$apply(function() {
      // $scope.gameState = gameState;  
      $scope.gameState = JSON.parse(gameStateEmu.gameStateJSON[0]);         // Test only
      console.log($scope.gameState);
    });
  };
  // update game state through webSocket
  wsComm.wsUpdate(gameStateProc);

}])