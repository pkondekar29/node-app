const express = require('express');
const controllers = require('../controllers');
const { ServerError } = require('../helper/errorHandler');

const router = express.Router();
const {
  homeController,
  employeeController,
} = controllers;

/**
 * controller handler to delegate task to appropriate controller.
 * Assgins task to apprpriate controller depending on the URL of router.
 * 
 * @param {*} promise 
 * @param {*} params 
 */
const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    const result = await promise(...boundParams);
    return res.json(result || { message: 'OK' });
  } catch (error) {
    return res.status(500) && next(error);
  }
};
const controller = controllerHandler;

// base URL
router.get('/', (req, res) => { return res.send('Api working!'); });

/**
 * Home page routes
 */
router.get('/home', controller(homeController.hello));
router.get('/home/:name', controller(homeController.welcomeMsg, req => [req.params.name]));

/**
 * Employee routes
 */
router.get('/employee/:employeeId', controller(employeeController.findEmployee, req => [req.params.employeeId]));
router.get('/employees', controller(employeeController.findEmployees))
router.post('/employee', controller(employeeController.createEmployee, req => [req.body]));
router.delete('/employee/:employeeId', controller(employeeController.removeEmployee, req => [req.params.employeeId]));
router.put('/employee/:employeeId', controller(employeeController.updateEmployee, req => ([req.params.employeeId, req.body])));

/**
 * Error-handler.
 */
router.use((err, req, res, _next) => {
  if (Object.prototype.isPrototypeOf.call(ServerError.prototype, err)) {  // throw the error which occured
    return res.status(err.status || 500).json({ error: err.message });
  }

  // throw Server error in case of unknown error
  return res.status(500).json({ error: 'Some unexpected error occured!' });
});

module.exports = router;