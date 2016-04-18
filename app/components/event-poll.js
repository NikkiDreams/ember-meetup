import Ember from 'ember';

export default Ember.Component.extend({

          controller($scope, $rootScope, $timeout, Participant, ConfirmModal, Communicator){

              $scope.defaults = [];
              $scope.participant = {votes: []};
              $rootScope.$on('add:comment', function(e, event, comment){
                  // Don't repopulate field if user has already voted
                  if (!$scope.didVote) {
                      $scope.participant.name = comment.author.name;
                  }
              });
              this.delete = (participant) =>{
                  let modal = new ConfirmModal({
                      title : 'Delete ' + participant.name + '?',
                      message : 'Are you sure you want to remove '+participant.name+' from the poll?',
                      confirmText : 'Yes - delete',
                      cancelText : 'No - nevermind',
                      isDestructive : true,
                      confirm(){
                          Participant.remove({ id : $scope.event._id , pid : participant._id }, (event) =>{
                              $scope.event = event;
                              Communicator.trigger('delete:participant', event);
                          });
                      }
                  });
              };
              this.update = (participant) =>{
                  Participant.update({
                      id : $scope.event._id,
                      pid : participant._id
                  }, participant);
              };
              this.edit = (participant) =>{
                  $scope.defaults[$scope.event.participants.indexOf(participant)] = angular.copy(participant);
              };
              this.cancel = (index) =>{
                  $scope.event.participants[index] = $scope.defaults[index];
              };
              this.save = () =>{
                  if ($scope.formnew.$valid){
                      let participant = new Participant($scope.participant);
                      participant.$save({id:$scope.event._id}, (event) =>{
                          $scope.event = event;
                          $scope.didVote = true;
                          Communicator.trigger('add:participant', event, $scope.participant);
                          $scope.participant = {votes: []};
                      });
                      $scope.formnew.$setPristine();
                  }
              };
          },
          link(scope, el, attrs, discussionCtrl){
              let datesCount = [];

              scope.event.$promise.then((event) =>{
                  let examplesNames = ['John Example', 'Jane Specimen','Mark Instance', 'Mary Case'];
                  let examples = [];
                  for (let i = 0; i < examplesNames.length; i++){
                      let example = { name : examplesNames[i] };
                      example.votes = [];
                      for (let j = 0; j <  event.dates.length; j++){
                          let answer = Math.random()<0.5;
                          example.votes[j] = answer;
                      }
                      examples.push(example);
                  }
                  scope.examples = examples;
              });

              scope.isTopDate = (index) =>{
                  let count = datesCount[index];
                  for (let i = 0; i < datesCount.length; i++){
                      if (datesCount[i] > count) return false;
                  }
                  return true;
              };

              scope.selectedDate = function(index){
                  datesCount[index] = 0;
                  for (let i = 0; i < scope.event.participants.length; i++){
                      if (scope.event.participants[i].votes[index]) datesCount[index]++;
                  }
                  return datesCount[index];
              };
          }

});
