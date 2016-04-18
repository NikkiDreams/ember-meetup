import Ember from 'ember';

export default Ember.Controller.extend({

  EditEventCtrl($scope, $http, $state, $timeout, Event, ConfirmModal, Notification, Title){
      let id = $state.params.id;
      $scope.event = Event.get({id:id}, (data) =>{
          Title.set("Edit: " + $scope.event.title);
          $scope.master = angular.copy($scope.event);
      }, (e) =>{
          $state.go('notfound');
      });
      $scope.$watch('event.isDeleted', (value) =>{
          if (value){
              $state.go('deletedevent');
          }
      });
      $scope.undoChanges = () =>{
          $scope.event = angular.copy($scope.master);
      };
      $scope.didChange = () =>{
          return JSON.stringify($scope.master) !== JSON.stringify($scope.event);
      };
      $scope.didChangeDates = () =>{
          return JSON.stringify($scope.master.dates) !== JSON.stringify($scope.event.dates);
      };
      $scope.submit = () =>{
          if ($scope.form.$valid){
              if ($scope.didChangeDates() ){
                  let modal = new ConfirmModal({
                      title : 'Hold up!',
                      message : 'Changing the dates will reset all entries by the participants. Are you sure you want to do that?',
                      confirmText : 'Yes, I\'m sure',
                      isDestructive : true,
                      confirm(){
                          $scope.event.participants = [];
                          update();
                      }
                  });

              } else {
                  update();
              }
          } else {
              let notification = new Notification({
                  title : 'Not so fast',
                  message : 'Make sure you fill in all the required fields and try again.',
                  type : 'error'
              });
          }
      };
      let update = () =>{
          Event.update({
              id : id
          }, $scope.event,
          () =>{
              let notification = new Notification({
                  title : 'Changes Saved',
                  message : 'Your changes have been saved successfully.',
                  type : 'success'
              });
              $scope.master = angular.copy($scope.event);
          });
      };
  }

});
