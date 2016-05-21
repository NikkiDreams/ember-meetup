import Ember from 'ember';

export default Ember.Component.extend({


          controllerAs : 'discussionCtrl',
          controller($rootScope, $timeout, Comment, ConfirmModal, Communicator){
              comment = { author : {}, comment : '' };
              $root$on('add:participant', (e, event, participant) =>{
                  comment.author.name = participant.name;
              });
              this.deleteComment = (comment) =>{
                /*
                  let modal = new ConfirmModal({
                      title : 'Are you sure?',
                      message : 'Are you sure you want to remove this comment?',
                      confirmText : 'Yes - delete',
                      cancelText : 'No - nevermind',
                      isDestructive : true,
                      confirm (){
                          Comment.remove({ id : event._id , cid : comment._id }, (event) =>{
                              event = event;
                          });
                      }
                  });
                  */
              };
              this.postComment = () =>{
                  if (commentForm.$valid){
                    /*
                      let comment = new Comment(comment);
                      comment.$save({id:event._id}, (event) =>{
                          event = event;
                          Communicator.trigger('add:comment', event, comment);
                          comment.content = '';
                          $timeout(scrollToBottom);
                      });
                      commentForm.$setPristine();
                      */
                  }
              };
              scrollToBottom = () =>{
                  let thread = element('.comment-thread');
                  thread.scrollTop(thread.prop('scrollHeight'));
              };
          },
          link(scope, el, attrs){
              //$timeout(scrollToBottom);
          }


});
