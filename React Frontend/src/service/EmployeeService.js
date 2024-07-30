import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "http://localhost:8080/api/v1/";

const EmployeeService = {
  getEmployees() {
    return axios.get(`${EMPLOYEE_API_BASE_URL}/employees`);
  },
  createEmployee(employee) {
    return axios.post(`${EMPLOYEE_API_BASE_URL}/employees`, employee);
  },
  getEmployeeById(employeeId) {
    return axios.get(`${EMPLOYEE_API_BASE_URL}/employees/${employeeId}`);
  },
  updateEmployee(employee, employeeId) {
    return axios.put(`${EMPLOYEE_API_BASE_URL}/employees/${employeeId}`, employee);
  },
  deleteEmployee(employeeId) {
    return axios.delete(`${EMPLOYEE_API_BASE_URL}/employees/${employeeId}`);
  }
};

export default EmployeeService;