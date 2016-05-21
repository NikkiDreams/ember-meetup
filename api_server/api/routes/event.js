var express = require('express'),
    router = express.Router(),
    controller = require('../controllers/EventController'),
    API = require('json-api'),
    APIError = API.types.Error,
    debug = require('debug')('ember-meetup');
/* GET home page. */

var after = function(req, res) {
    if (req.event){
        var event = req.event.toObject();
        delete event['__private'];
        res.json(event);
    } else {
        res.status(204).end();
    }
}

router.post('/', controller.create, after);
  .post(apiReqHandler);
router.get('/:id(event)', controller.show, after)
  .get(apiReqHandler);
router.put('/:id(event)', controller.update, after)
  .put(apiReqHandler);
router.delete('/:id(event)', controller.delete, after)
  .delete(apiReqHandler);
router.delete('/:id/code/:code(event)', controller.delete, after);
  .delete(apiReqHandler)
router.get('/:id/code/:code(event)', controller.verifyEmail, after)
  .get(apiReqHandler);

router.post('/:id/comment(event)', controller.createComment, after)
  .post(apiReqHandler);
router.delete('/:id/comment/:cid(event)', controller.deleteComment, after)
  .delete(apiReqHandler);

router.post('/:id/participant(event)', controller.createParticipant, after)
  .post(apiReqHandler);
router.delete('/:id/participant/:pid(event)', controller.deleteParticipant, after)
  .delete(apiReqHandler);
router.put('/:id/participant/:pid(event)', controller.updateParticipant, after)
  .put(apiReqHandler);




module.exports = router;
