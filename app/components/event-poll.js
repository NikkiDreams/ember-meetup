import Ember from 'ember';

export default Ember.Component.extend({

          controller($rootScope, $timeout, Participant, ConfirmModal, Communicator){

              defaults = [];
              participant = {votes: []};
              $root$on('add:comment', function(e, event, comment){
                  // Don't repopulate field if user has already voted
                  if (!didVote) {
                      participant.name = comment.author.name;
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
                          Participant.remove({ id : event._id , pid : participant._id }, (event) =>{
                              event = event;
                              Communicator.trigger('delete:participant', event);
                          });
                      }
                  });
              };
              this.update = (participant) =>{
                  Participant.update({
                      id : event._id,
                      pid : participant._id
                  }, participant);
              };
              this.edit = (participant) =>{
                  defaults[event.participants.indexOf(participant)] = copy(participant);
              };
              this.cancel = (index) =>{
                  event.participants[index] = defaults[index];
              };
              this.save = () =>{
                  if (formnew.$valid){
                    /*
                      let participant = new Participant(participant);
                      participant.$save({id:event._id}, (event) =>{
                          event = event;
                          didVote = true;
                          Communicator.trigger('add:participant', event, participant);
                          participant = {votes: []};
                      });
                      formnew.$setPristine();
                      */
                  }
              };
          },
          link(scope, el, attrs, discussionCtrl){
              let datesCount = [];

              event.$promise.then((event) =>{
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
                  examples = examples;
              });

              isTopDate = (index) =>{
                  let count = datesCount[index];
                  for (let i = 0; i < datesCount.length; i++){
                      if (datesCount[i] > count){
                      return false;
                    }
                  }
                  return true;
              };

              selectedDate = function(index){
                  datesCount[index] = 0;
                  for (let i = 0; i < event.participants.length; i++){
                      if (event.participants[i].votes[index]) datesCount[index]++;
                  }
                  return datesCount[index];
              };
          }

});
