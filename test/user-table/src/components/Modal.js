import React from 'react';

const Modal = ({ user, onClose }) => {
  return (
    <div className="modal">
      <div className="modal-header">
        <h3 className="modal-title">Подробная информация</h3>
      </div>
      <div className="modal-content">
        {user && (
          <div>
            <p className="modal-label">ФИО: {user.firstName} {user.lastName} {user.maidenName}</p>
            <p className="modal-label">Возраст: {user.age}</p>
            <p className="modal-label">Адрес: {user.address.city}, {user.address.street}</p>
            <p className="modal-label">Рост: {user.height}</p>
            <p className="modal-label">Вес: {user.weight}</p>
            <p className="modal-label">Номер телефона: {user.phone}</p>
            <p className="modal-label">Email: {user.email}</p>
          </div>
        )}
      </div>
      <div className="modal-footer">
        <button className="modal-close-btn" onClick={onClose}>Закрыть</button>
      </div>
    </div>
  );
};

export default Modal;