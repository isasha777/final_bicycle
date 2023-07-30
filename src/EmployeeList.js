import React, { useState } from 'react';
import axios from 'axios';
import './employeelist.css'

const EmployeeList = () => {
  const [employees, setEmployees] = useState([
    {
      id: 1,
      firstName: 'Иван',
      lastName: 'Иванов',
      email: 'ivan@example.com',
    },
    {
      id: 2,
      firstName: 'Петр',
      lastName: 'Петров',
      email: 'petr@example.com',
    },
    // Добавьте других сотрудников по аналогии
  ]);

  const [showDetails, setShowDetails] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleShowDetails = (employee) => {
    setSelectedEmployee(employee);
    setShowDetails(true);
  };

  const handleAddEmployee = () => {
    // Генерируем уникальный id для нового сотрудника
    const newId = Math.max(...employees.map((employee) => employee.id)) + 1;

    // Создаем нового сотрудника
    const newEmployee = {
      id: newId,
      firstName: '',
      lastName: '',
      email: '',
      password: 'value'
    };

    // Добавляем нового сотрудника в список
    setEmployees([...employees, newEmployee]);

    // Открываем окно с детальной информацией для нового сотрудника
    handleShowDetails(newEmployee);
  };

  const handleDeleteEmployee = (id) => {
    // Удаляем сотрудника из списка
    const updatedEmployees = employees.filter((employee) => employee.id !== id);
    setEmployees(updatedEmployees);

    // Закрываем окно с детальной информацией, если удаляется выбранный сотрудник
    if (selectedEmployee && selectedEmployee.id === id) {
      setShowDetails(false);
      setSelectedEmployee(null);
    }
  };

  const handleInputChange = (event, key) => {
    // Обновляем значения полей для выбранного сотрудника
    const updatedEmployee = { ...selectedEmployee, [key]: event.target.value };
    setSelectedEmployee(updatedEmployee);

    // Обновляем список сотрудников с обновленными значениями
    const updatedEmployees = employees.map((employee) =>
      employee.id === updatedEmployee.id ? updatedEmployee : employee
    );
    setEmployees(updatedEmployees);
  };

  const handleAddEmployeeToServer = () => {
    const authToken = '3bba3e3a-320e-497c-845f-823e2e49ce3b'; 

  // Заголовок с токеном аутентификации
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
    // Отправляем POST запрос на сервер для добавления нового сотрудника
    const newEmployeeData = {
      email: selectedEmployee.email,
      password: selectedEmployee.password,
    };
  
    // Отправляем POST запрос на сервер для добавления нового сотрудника
    axios.post('https://sf-final-project-be.herokuapp.com/api/officers', newEmployeeData, config)
      .then(response => {
        console.log('Сотрудник успешно добавлен на сервер:', response.data);
      })
      .catch(error => {
        console.error('Ошибка при добавлении сотрудника:', error);
      });
  };

  const handleDeleteEmployee1 = (id) => {
    // Получите токен аутентификации из места, где он хранится в вашем приложении
    const authToken = '3bba3e3a-320e-497c-845f-823e2e49ce3b'; // Замените на фактический токен
  
    // Заголовок с токеном аутентификации
    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
  
    // Отправляем DELETE запрос на сервер для удаления сотрудника по его id
    axios.delete(`https://sf-final-project-be.herokuapp.com/api/officers/:id`, config)
      .then(response => {
        console.log('Сотрудник успешно удален:', response.data);
  
        // Обновляем список сотрудников после удаления
        const updatedEmployees = employees.filter(employee => employee.id !== id);
        setEmployees(updatedEmployees);
  
        // Закрываем окно с детальной информацией, если удаляется выбранный сотрудник
        if (selectedEmployee && selectedEmployee.id === id) {
          setShowDetails(false);
          setSelectedEmployee(null);
        }
      })
      .catch(error => {
        console.error('Ошибка при удалении сотрудника:', error);
      });
  };

  return (
    <div>
      <h1>Список сотрудников</h1>
      <ul className='employee-list'>
        {employees.map((employee) => (
          <li key={employee.id} onClick={() => handleShowDetails(employee)}>
            {employee.firstName} {employee.lastName}
            <button onClick={() => handleDeleteEmployee(employee.id)}>Удалить</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddEmployee}>Добавить сотрудника</button>

      {/* Всплывающее окно с детальной информацией о сотруднике */}
      {showDetails && selectedEmployee && (
        <div className='employee-details'>
          <h2>Детальная информация</h2>
          <p>Имя: <input value={selectedEmployee.firstName} onChange={(e) => handleInputChange(e, 'firstName')} /></p>
          <p>Фамилия: <input value={selectedEmployee.lastName} onChange={(e) => handleInputChange(e, 'lastName')} /></p>
          <p>Email: <input value={selectedEmployee.email} onChange={(e) => handleInputChange(e, 'email')} /></p>
          <p>Пароль: <input value={selectedEmployee.password} onChange={(e) => handleInputChange(e, 'password')} /></p>
          <p>ID: {selectedEmployee.id}</p>
          <button onClick={() => setShowDetails(false)}>Закрыть</button>
          <button onClick={handleAddEmployeeToServer}>Добавить на сервер</button>
          <button onClick={handleDeleteEmployee1}>удалить сотрудника</button>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
