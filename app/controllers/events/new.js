import Ember from 'ember';

export default Ember.Controller.extend({

  NewEventCtrl($scope, $http, $state, Event, ConfirmModal, Notification, Communicator){

      $scope.title = "Schedule a New Event";
      $scope.description = "Fill in the form below to create your event and share it with your friends and colleagues.";
      $scope.event = { creator : {
          allowNotifications : true
      }};


      $scope.submit = () =>{
          if ($scope.form.$valid){
              let newEvent = new Event($scope.event);
              newEvent.$save()
              .then(function(event){
                  $scope.event = event;
                  $scope.eventUrl = $state.href('event', {
                      id: $scope.event._id
                  }, {
                      absolute : true
                  });
                  Communicator.trigger('add:event', event);
                  $state.go('newevent.success');
              }, () =>{
                  let modal = new ConfirmModal({
                      title : 'Uh oh!',
                      message : 'There was an error creating your event. Please try again later.',
                      cancelText : 'OK'
                  });
              });
          } else {
              let notification = new Notification({
                  title : 'Hold on!',
                  message : 'Make sure you fill in all the required fields and that your data is correct.'
              });
          }
      };

  }

});
