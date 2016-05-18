import Ember from 'ember';

const {
  Component,
  computed,
  inject,
  set
} = Ember;

export default Component.extend({
  modalService: inject.service('modal-dialog'),

  tagName: 'div',
  classNames: 'rl-modal-overlay',
  translucentOverlay: true, // override default of false
  targetAttachment: "none",
  containerClassNames: 'rl-modal',
  destinationElementId: 'rl-modal-overlay',
  isShowingModal: false,
  isConfirmed: false,

  actions:{
    toggleModal() {
      this.toggleProperty('isShowingModal');
      console.log(this.get('isShowingModal'));
    },

    closeModal() {
      this.get('modalService').close();
      this.set('isShowingModal', false);
      console.log(this.get('isShowingModal'));
    },

    confirmModal(){
      this.toggleProperty('isConfirmed');
      console.log(this.get('isConfirmed'));
    }
  }
});
