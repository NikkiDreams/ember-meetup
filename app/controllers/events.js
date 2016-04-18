import Ember from 'ember';

export default Ember.Controller.extend({
  EventCtrl($scope, $http, $state, Title, Event, ConfirmModal, Communicator){

      let id = $state.params.id;
      // Get Event
      $scope.event = Event.get({id:id}, (data) =>{
          // Set the page title to the event title
          if (data.isDeleted) {
              $state.go('deletedevent');
              return;
          }

          Communicator.trigger('view:event', data);

          Title.set($scope.event.title);
          // Generate event url - i.e. http://rallly.co/jF9F_Fd
          $scope.eventUrl = $state.href('event', {
              id: $scope.event._id
          }, {
              absolute : true
          });
      }, (e) =>{
          $state.go('notfound');
      });

      $scope.openEvent = () =>{
          $scope.event.isClosed = false;
          Event.update({
              id : id
          }, $scope.event,
          () =>{
              let modal = new ConfirmModal({
                  title : 'Event Open',
                  message : 'People can vote and comment on this event.',
                  cancelText : 'OK'
              });
          });
      };

      $scope.closeEvent = () =>{
          $scope.event.isClosed = true;
          Event.update({
              id : id
          }, $scope.event,
          () =>{
              let modal = new ConfirmModal({
                  title : 'Event Closed',
                  message : 'People can no longer vote or comment on this event.',
                  cancelText : 'OK'
              });
          });
      };

      $scope.editEvent = () =>{
          $state.go('editevent', { id : $scope.event._id });
      };

  }
  /*

  .factory('Event', function($resource){
      return $resource('/api/event/:id', { id : '@_id' }, {
          'update' : { method : 'PUT' },
          'verify' : { method : 'GET', url : '/api/event/:id/code/:code' },
          'destroy': { method : 'DELETE', url: '/api/event/:id/code/:code' }
      });
  })
  .factory('Participant', function($resource){
      return $resource('/api/event/:id/participant/:pid', { id: '@_id'}, {
          'update' : { method : 'PUT' }
      });
  })
  .factory('Comment', function($resource){
      return $resource('/api/event/:id/comment/:cid', { id : '@_id' }, {
          'update' : { method : 'PUT' }
      })
  })
  .factory('Title', function(){
      return {
          set : function(title){
              document.title = title;
          }
      }
  }

  */

});
