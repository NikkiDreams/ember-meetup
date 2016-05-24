'use strict';
/*
    Email Notifications Helper Class
*/
import app from '../../config/express';
import communicator from '../../lib/communicator';
import config from '../../config/env';

let debug = require('debug')('ember-meetup');
let sendgrid = require('sendgrid')(config.sendGridAPIKey);

let getEmail = function(options) {
  let email =  new sendgrid.Email({
    from : 'noreply@Ember-Meetup.co',
    fromname : 'Ember-Meetup'
  });
  email.addTo(options.to);
  email.setSubject(options.subject);
  email.setHtml(options.message);
  email.addSubstitution('[title]', options.title);
  email.addSubstitution('[buttontext]', options.buttonText);
  email.addSubstitution('[buttonurl]', options.buttonURL);
  email.addFilter('templates', 'enable', 1);
  email.addFilter('templates', 'template_id', '579b31d6-3a04-4f5b-b0de-b57abd5d27d7');
  return email;
};

let responseHandler = function(err, json) {
  if (err) {
    debug('A mandrill error occurred: ' + err.name + ' - ' + err.message);
  }
}

communicator.on('event:create', function(event){
    sendInvites(event);
    if (!event.creator.allowNotifications || event.isClosed || event.isExample) return;
    sendEmailConfirmation(event);
});

communicator.on('event:update:creator.email', function(event, oldEvent){
    if (!event.creator.allowNotifications || event.isClosed || event.isExample) return;
    verifyEmail(event);
});

communicator.on('participant:add', function(event, participant){
    if (!event.creator.allowNotifications || !event.creator.isVerified || event.isExample) return;
    sendNewParticipantNotification(event, participant);
});

communicator.on('comment:add', function(event, comment){
    if (!event.creator.allowNotifications || !event.creator.isVerified || event.isExample) return;
    sendNewCommentNotification(event, comment);
});

// Send confirmation to the creator of the event with a link to verify the creators email address
let sendEmailConfirmation = function(event){
    let email = getEmail({
      to: event.creator.email,
      subject:  'Ember-Meetup: ' + event.title + ' - Verify Email Address',
      title:    'Your event ' + event.title + ' has been created successfully.',
      buttonText: 'Verify Email Address',
      buttonURL:  config.absoluteUrl('verify/'+event._id+'/code/'+event.__private.verificationCode),
      message:  'Hi [name],<br /><br />' +
                'An email has been sent to each participant with a link to the event.<br /><br />' +
                'Important: To continue receiving email notifications about this event, please click the button below to verify your email address.'
    });
    email.addSubstitution('[name]', event.creator.name);
    sendgrid.send(email, responseHandler);
}

// Send an invite to all participants of the evnet
let sendInvites = function(event){
    event.emails.forEach(function(item) {
      let email = getEmail({
        to:         item.email,
        subject:    'Ember-Meetup: ' + event.title,
        title:      event.creator.name + ' has invited you to participate in their event: ' + event.title,
        buttonText: 'View Event',
        buttonURL:  config.absoluteUrl(event._id),
        message:    'Ember-Meetup is a free collaborative scheduling service that lets you and your friends vote on a date to host an event. ' +
                    'Click on the button below to visit the event page and vote on the dates that best suit you.'
      });
      email.replyto = event.creator.email;
      sendgrid.send(email, responseHandler);
    });
}

// This message is sent when the user want to verify an email address after the event has been created
let verifyEmail = function(event){
    let email = getEmail({
      to: event.creator.email,
      subject: 'Ember-Meetup: ' + event.title + ' - Verify Email Address',
      title: 'Please verify your email address to receive updates from this event.',
      buttonText: 'Verify Email Address',
      buttonURL: config.absoluteUrl('verify/'+event._id+'/code/'+event.__private.verificationCode),
      message:  'Hi [name],<br /><br />' +
                'If you would like to receive email updates from this event, please click on the button below to verify your email address.'
    });
    email.addSubstitution('[name]', event.creator.name);
    sendgrid.send(email, responseHandler);
}

let sendNewParticipantNotification = function(event, participant){
    let email = getEmail({
      to: event.creator.email,
      subject: 'Ember-Meetup: ' + event.title + ' - New Partcipant',
      title: participant.name + ' has voted!',
      buttonText: 'View Event',
      buttonURL: config.absoluteUrl(event._id),
      message:  'Hi [name],<br /><br />' +
                'Click the button below to see the updates made to your event page!'
    });
    email.addSubstitution('[name]', event.creator.name);
    sendgrid.send(email, responseHandler);
}

let sendNewCommentNotification = function(event, comment){
    let email = getEmail({
      to: event.creator.email,
      subject: 'Ember-Meetup: ' + event.title + ' - New Comment',
      title: comment.author.name + ' has commented on your event!',
      buttonText: 'View Event',
      buttonURL: config.absoluteUrl(event._id),
      message:  'Hi [name],<br /><br />' +
                'Click the button below to see the updates made to your event page!'
    });
    email.addSubstitution('[name]', event.creator.name);
    sendgrid.send(email, responseHandler);
}

//export default NotificationHelper;
