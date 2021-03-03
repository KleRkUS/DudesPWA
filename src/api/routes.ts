const router = require('express').Router();

const usersURL = 'users/',
      productsURL = 'products/',
      settingsURL = 'settings/';

const SessionController = require('./Sessions/SessionController');

router.route('/session')
    .get(SessionController.authentificate)
    .post(SessionController.login);

module.exports = router;