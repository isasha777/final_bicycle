import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './reporttheftpage.css';

const ReportTheft = () => {
  const [licenseNumber, setLicenseNumber] = useState('');
  const [ownerFullName, setOwnerFullName] = useState('');
  const [clientId, setClientid] = useState('');
  const [type, setType] = useState('');
  const [bikeColor, setBikeColor] = useState('');
  const [theftDate, setTheftDate] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Восстановить данные формы из локального хранилища при монтировании компонента
    const storedFormValues = JSON.parse(localStorage.getItem('formValues'));

    if (storedFormValues) {
      setLicenseNumber(storedFormValues.licenseNumber);
      setOwnerFullName(storedFormValues.ownerFullName);
      setClientid(storedFormValues.clientId);
      setType(storedFormValues.type);
      setBikeColor(storedFormValues.bikeColor);
      setTheftDate(storedFormValues.theftDate);
      setAdditionalInfo(storedFormValues.additionalInfo);
      setSubmitted(storedFormValues.submitted);
    }
  }, []);

  useEffect(() => {
    // Сохранить данные формы в локальное хранилище при изменении состояний полей
    const formValues = {
      licenseNumber,
      ownerFullName,
      clientId,
      type,
      bikeColor,
      theftDate,
      additionalInfo,
      submitted,
    };

    localStorage.setItem('formValues', JSON.stringify(formValues));
  }, [licenseNumber, ownerFullName, clientId, type, bikeColor, theftDate, additionalInfo, submitted]);

  const handleSubmit = (event) => {
    event.preventDefault();
    
    axios.post('https://sf-final-project-be.herokuapp.com/api/public/report', {
      licenseNumber,
      ownerFullName,
      clientId:'3bba3e3a-320e-497c-845f-823e2e49ce3b',
      type
    })
    .then(response => {
      // Установить состояние submitted в true
      setSubmitted(true);
    })
    .catch(error => {
      console.error('Ошибка при отправке данных:', error);
    });
  };

  const handleReset = () => {
    // Сбросить значения полей и состояние submitted
    setLicenseNumber('');
    setOwnerFullName('');
    setClientid('');
    setType('');
    setBikeColor('');
    setTheftDate('');
    setAdditionalInfo('');
    setSubmitted(false);
  };

  return (
    <div className='report-theft-container'>
      <h1 className='report-theft-heading'>Сообщить о краже</h1>
      {submitted ? (
        <div className='report-theft-success-message'>
          <p>Благодарим за сообщение!</p>
          <button onClick={handleReset}>Заполнить форму повторно</button>
        </div>
      ) : (
        <form className='report-theft-form' onSubmit={handleSubmit}>
          <div>
            <label className='theft-label1'>Номер лицензии:</label>
            <input
              type="text"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='theft-label2'>ФИО клиента:</label>
            <input
              type="text"
              value={ownerFullName}
              onChange={(e) => setOwnerFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='theft-label1'>ID клиента:</label>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientid(e.target.value)}
              required
            />
          </div>
          <div>
            <label className='theft-label3'>Тип велосипеда:</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Выберите тип велосипеда</option>
              <option value="Горный">Горный</option>
              <option value="Шоссейный">Шоссейный</option>
              <option value="Гибридный">Гибридный</option>
              <option value="BMX">BMX</option>
            </select>
          </div>
          <div>
            <label className='theft-label4'>Цвет велосипеда:</label>
            <input
              type="text"
              value={bikeColor}
              onChange={(e) => setBikeColor(e.target.value)}
            />
          </div>
          <div>
            <label className='theft-label5'>Дата кражи:</label>
            <input
              type="date"
              value={theftDate}
              onChange={(e) => setTheftDate(e.target.value)}
            />
          </div>
          <div>
            <label className='theft-label6'>Дополнительная информация:</label>
            <textarea
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
            />
          </div>
          <button type="submit">Отправить</button>
        </form>
      )}
    </div>
  );
};

export default ReportTheft;



