const { EmployeeService } = require('../services/employee.service');
const { ServerError } = require('../helper/errorHandler');

// Employee Service of the constroller
var employeeService = new EmployeeService();

/**
 * 
 * returns all employees
 */
function findEmployees(){
  try{
    var employees = employeeService.getAll();
    return employees;
  } catch(e){
    throw new ServerError("Could not get employees");
  }
}

/**
 * finds an employee with ID
 * @param {String} id 
 */
function findEmployee(id){
  if(!id) {
    throw new ServerError("Illegal Arguments");
  }
  try{
    var employee = employeeService.getById(id);
    return employee;
  } catch(e) {
    throw new ServerError("Erorr in Employee service");
  }
}

/**
 * creates and Employee with the data
 * @param {Object} data 
 */
function createEmployee(data){
  if(!data){
    throw new ServerError("Illegal Arguments");
  }
  try{
    return employeeService.add(data);
  } catch(e){
    throw new ServerError("Error in creating employee");
  }
}

/**
 * 
 * data is the request parameters
 * @param  {*} data
 */
function updateEmployee(...data){
  if(data.length != 2){
    throw new ServerError("Illegal Arguments");
  }
  try{
    return employeeService.update(data[0], data[1]);
  } catch(e){
    throw new ServerError("Could not update employee data");
  }
}

/**
 * deletes the employe
 * @param {String} data 
 */
function removeEmployee(id){
  try{
    return employeeService.delete(id);
  } catch(e){
    throw new ServerError("Could not delete the employee");
  }
}

module.exports = {
  findEmployees,
  findEmployee,
  createEmployee,
  updateEmployee,
  removeEmployee
};