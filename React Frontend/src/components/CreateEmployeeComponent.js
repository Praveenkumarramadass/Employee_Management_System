import React, { useState, useEffect } from 'react';
import EmployeeService from '../service/EmployeeService';
import { useParams, useNavigate } from 'react-router-dom'; // Import the useParams hook

const CreateEmployeeComponent = () => {
  const { id } = useParams(); // Use useParams to get the id from the URL

  const navigate = useNavigate(); // Use the useNavigate hook to get the navigate function

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');

  useEffect(() => {
    if (id !== '_add') {
      EmployeeService.getEmployeeById(id).then((res) => {
        let employee = res.data;
        setFirstName(employee.firstName);
        setLastName(employee.lastName);
        setEmailId(employee.emailId);
      });
    }
  }, [id]);


  
  const saveOrUpdateEmployee = (e) => {
    e.preventDefault();
    let employee = { firstName, lastName, emailId };
    // console.log('employee => ' + JSON.stringify(employee));

    if (id === '_add') {
      EmployeeService.createEmployee(employee).then((res) => {
        navigate('/employees'); // Use the navigate function
      });
    } else {
      EmployeeService.updateEmployee(employee, id).then((res) => {
        navigate('/employees'); // Use the navigate function
      });
    }
  };

  const changeFirstNameHandler = (event) => {
    setFirstName(event.target.value);
  };

  const changeLastNameHandler = (event) => {
    setLastName(event.target.value);
  };

  const changeEmailHandler = (event) => {
    setEmailId(event.target.value);
  };

  const cancel = () => {
    navigate('/employees');
  };

  const getTitle = () => {
    return id === '_add' ? (
      <h3 className="text-center">Add Employee</h3>
    ) : (
      <h3 className="text-center">Update Employee</h3>
    );
  };

  return (
    <div>
      <br />
      <div className="container">
        <div className="row">
          <div className="card col-md-6 offset-md-3 offset-md-3">
            {getTitle()}
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label> First Name: </label>
                  <input
                    placeholder="First Name"
                    name="firstName"
                    className="form-control"
                    value={firstName}
                    onChange={changeFirstNameHandler}
                  />
                </div>
                <div className="form-group">
                  <label> Last Name: </label>
                  <input
                    placeholder="Last Name"
                    name="lastName"
                    className="form-control"
                    value={lastName}
                    onChange={changeLastNameHandler}
                  />
                </div>
                <div className="form-group">
                  <label> Email Id: </label>
                  <input
                    placeholder="Email Address"
                    name="emailId"
                    className="form-control"
                    value={emailId}
                    onChange={changeEmailHandler}
                  />
                </div>

                <button className="btn btn-success" onClick={saveOrUpdateEmployee}>
                  Save
                </button>
                <button
                  className="btn btn-danger"
                  onClick={cancel}
                  style={{ marginLeft: '10px' }}
                >
                  Cancel
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployeeComponent;
