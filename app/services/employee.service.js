const { ServerError } = require('../helper/errorHandler');
const Employee = require('../model/Employee');
const mongoose = require('mongoose');

class EmployeeService{
    constructor(){

    }
}

/**
 * 
 * returns entire employee data
 */
EmployeeService.prototype.getAll = () => {
    return Employee.find((err) => {
        if(err){
            throw err;
        }
    });
}

/**
 * returns employee with particular id
 * in case Id is not present, a server error is thrown
 * @param {String} id 
 */
EmployeeService.prototype.getById = (id) => {
    if(!id){
        throw new ServerError("Employee Id note present in request", 400);
    }
    return Employee.findById(id, (err) => {
        console.log("Employee doesn't exist");
        if(err) {
            throw err;
        }
    });
}

/**
 * 
 * Persists the employee data in database
 * @param {Employee} data 
 */
EmployeeService.prototype.add = (data) => {
    var employee = getEmployeeObject(data);
    return employee.save();
}

/**
 * deletes a Employee with particular ID
 * @param {String} id 
 */
EmployeeService.prototype.delete = (id) => {
    if(!id){
        throw new ServerError("Could not find Id of Employee!", 400);
    }
    return Employee.findByIdAndDelete(id, (err) => {
        if(err) throw err;
    })
}

/**
 * updates an employee with data
 * @param {Employee} data 
 */
EmployeeService.prototype.update = (id, data) => {
    Employee.findByIdAndUpdate(id, data, (err) => {
        if(err) throw err;
    })
}

/**
 * returns an object of model Employee from the data
 * @param {Object} data 
 * @returns {Employee}
 */
function getEmployeeObject(data){
    const employee = new Employee({
      _id : new mongoose.Types.ObjectId,
      name : data.name,
      office : data.office,
      position : data.position,
      salary : data.salary
    });
    return employee;
}

module.exports = {
    EmployeeService
};