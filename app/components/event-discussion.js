import Ember from 'ember';

export default Ember.Component.extend({


          controllerAs : 'discussionCtrl',
          controller($scope, $rootScope, $timeout, Comment, ConfirmModal, Communicator){
              $scope.comment = { author : {}, comment : '' };
              $rootScope.$on('add:participant', (e, event, participant) =>{
                  $scope.comment.author.name = participant.name;
              });
              this.deleteComment = (comment) =>{
                  let modal = new ConfirmModal({
                      title : 'Are you sure?',
                      message : 'Are you sure you want to remove this comment?',
                      confirmText : 'Yes - delete',
                      cancelText : 'No - nevermind',
                      isDestructive : true,
                      confirm (){
                          Comment.remove({ id : $scope.event._id , cid : comment._id }, (event) =>{
                              $scope.event = event;
                          });
                      }
                  });
              };
              this.postComment = () =>{
                  if ($scope.commentForm.$valid){
                      let comment = new Comment($scope.comment);
                      comment.$save({id:$scope.event._id}, (event) =>{
                          $scope.event = event;
                          Communicator.trigger('add:comment', event, $scope.comment);
                          $scope.comment.content = '';
                          $timeout($scope.scrollToBottom);
                      });
                      $scope.commentForm.$setPristine();
                  }
              };
              $scope.scrollToBottom = () =>{
                  let thread = angular.element('.comment-thread');
                  thread.scrollTop(thread.prop('scrollHeight'));
              };
          },
          link(scope, el, attrs){
              $timeout(scope.scrollToBottom);
          }


});
