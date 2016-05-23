myApp.controller('MatchCtrl', function($scope, $firebaseArray, FIREBASE_URL){

  var ref = new Firebase(FIREBASE_URL + 'matches');
  var matches = $firebaseArray(ref);

  $scope.matches = matches;

  $scope.addMatch = function() {
    matches.$add({
      team1: $scope.team1,
      team2: $scope.team2,
      venue: $scope.venue,
      league: $scope.league,
      date: $scope.date
      // date: Firebase.ServerValue.TIMESTAMP
    }).then(function(){
      $scope.team1 = '';
      $scope.team2 = '';
      $scope.venue = '';
      $scope.league = '';
      $scope.date = '';      
    });
  }

  // $scope.today = function() {
  //   $scope.dt = new Date();
  // };
  // $scope.today();

  // $scope.clear = function() {
  //   $scope.dt = null;
  // };

  $scope.inlineOptions = {
    customClass: getDayClass,
    minDate: new Date(),
    showWeeks: true
  };

  $scope.dateOptions = {
    dateDisabled: disabled,
    formatYear: 'yy',
    maxDate: new Date(2020, 5, 22),
    minDate: new Date(),
    startingDay: 1
  };

  // Disable weekend selection
  function disabled(data) {
    var date = data.date,
      mode = data.mode;
    return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
  }

  $scope.toggleMin = function() {
    $scope.inlineOptions.minDate = $scope.inlineOptions.minDate ? null : new Date();
    $scope.dateOptions.minDate = $scope.inlineOptions.minDate;
  };

  $scope.toggleMin();

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  // $scope.setDate = function(year, month, day) {
  //   $scope.dt = new Date(year, month, day);
  // };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var afterTomorrow = new Date();
  afterTomorrow.setDate(tomorrow.getDate() + 1);
  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    },
    {
      date: afterTomorrow,
      status: 'partially'
    }
  ];

  function getDayClass(data) {
    var date = data.date,
      mode = data.mode;
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0,0,0,0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  }
});

myApp.controller('SecondCtrl', function($firebaseArray, FIREBASE_URL){
 var vm = this;
  var ref = new Firebase(FIREBASE_URL + 'matches');
  var matches = $firebaseArray(ref);

  vm.matches = matches;
  console.log(vm.matches);
});