import React, { useState, useEffect } from 'react';
import SearchInput from './SearchInput';
import Modal from './Modal';

const Table = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [columnWidths, setColumnWidths] = useState({
    name: 240, // "ФИО"
    age: 240, // "Возраст"
    gender: 240, // "Пол"
    phone: 240, // "Номер телефона"
    address: 240, // "Адрес"
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://dummyjson.com/users');
      const data = await response.json();
      setUsers(data.users);
      setFilteredUsers(data.users);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const sortTable = (key) => {
    let direction = 'ascending';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    const sortedUsers = [...filteredUsers].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });
    setFilteredUsers(sortedUsers);
    setSortConfig({ key, direction });
  };

  const handleSearch = async (searchTerm) => {
    if (searchTerm === '') {
      setFilteredUsers(users); // Если поисковый запрос пуст, выводим весь список пользователей
      setIsSearching(false); // Сбрасываем флаг поиска
      console.log(isSearching);
      return;
    }

    setIsSearching(true); // Устанавливаем флаг поиска

    try {
      const response = await fetch(`https://dummyjson.com/users/filter?key=lastName&value=${searchTerm}`);
      const data = await response.json();
      setFilteredUsers(data.users);
    } catch (error) {
      console.error('Error searching data:', error);
    } finally {
      setIsSearching(false); // Сбрасываем флаг поиска после завершения запроса
    }
  };

  const handleRowClick = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (sortConfig) {
      const { key, direction } = sortConfig;
      const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
        if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
        return 0;
      });
      console.log(sortedUsers);
      setFilteredUsers(sortedUsers);
    }
  }, [sortConfig]);

  const handleColumnResize = (event, columnName) => {
    const newWidth = parseInt(event.target.value);
    if (!isNaN(newWidth) && newWidth >= 50) {
      setColumnWidths((prevWidths) => ({
        ...prevWidths,
        [columnName]: newWidth,
      }));
    }
  };

  return (
    <div>
      <SearchInput onSearch={handleSearch} onColumnResize={handleColumnResize} />
      <table className='table'>
        <thead>
          <colgroup>
            <col style={{ width: columnWidths.name }} />
            <col style={{ width: columnWidths.age }} />
            <col style={{ width: columnWidths.gender }} />
            <col style={{ width: columnWidths.phone }} />
            <col style={{ width: columnWidths.address }} />
          </colgroup>
          <tr className='title'>
            <th style={{ width: columnWidths.name }} >
              ФИО
            </th>
            <th style={{ width: columnWidths.age }} >
              Возраст
            </th>
            <th style={{ width: columnWidths.gender }} >
              Пол
            </th>
            <th style={{ width: columnWidths.phone }} >
              Номер телефона
            </th>
            <th style={{ width: columnWidths.address }} >
              Адрес
            </th>
          </tr>
          <tr className='resize'>
            <th style={{ width: columnWidths.name }} >
              <div>
                <label>Изменить ширину:</label>
                <input
                  type="number"
                  value={columnWidths.name}
                  onChange={(event) => handleColumnResize(event, 'name')}
                />
              </div>
            </th>
            <th style={{ width: columnWidths.age }} >
              <div>
                <label>Изменить ширину:</label>
                <input
                  type="number"
                  value={columnWidths.age}
                  onChange={(event) => handleColumnResize(event, 'age')}
                />
              </div>

            </th>
            <th style={{ width: columnWidths.gender }} >
              <div>
                <label>Изменить ширину:</label>
                <input
                  type="number"
                  value={columnWidths.gender}
                  onChange={(event) => handleColumnResize(event, 'gender')}
                />
              </div>
            </th>
            <th style={{ width: columnWidths.phone }} >
              <div>
                <label>Изменить ширину:</label>
                <input
                  type="number"
                  value={columnWidths.phone}
                  onChange={(event) => handleColumnResize(event, 'phone')}
                />
              </div>
            </th>
            <th style={{ width: columnWidths.address }} >
              <div>
                <label>Изменить ширину:</label>
                <input
                  type="number"
                  value={columnWidths.address}
                  onChange={(event) => handleColumnResize(event, 'address')}
                />
              </div>
            </th>
          </tr>
          <tr className='sort'>
            <th style={{ width: columnWidths.name }} >
              <div>
                <button onClick={() => sortTable('name')}>Сортировать</button>
              </div>
            </th>
            <th style={{ width: columnWidths.age }} >
              <div>
                <button onClick={() => sortTable('age')}>Сортировать</button>
              </div>
            </th>
            <th style={{ width: columnWidths.gender }} >
              <div>
                <button onClick={() => sortTable('gender')}>Сортировать</button>
              </div>
            </th>
            <th style={{ width: columnWidths.phone }} >
              <div>
                <button onClick={() => sortTable('phone')}>Сортировать</button>
              </div>
            </th>
            <th style={{ width: columnWidths.address }} >
            <div>
                <button onClick={() => sortTable('address')}>Сортировать</button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers && filteredUsers.map((user) => (
            <tr key={user.id} onClick={() => handleRowClick(user)}>
              <td>{user.firstName} {user.lastName} {user.maidenName}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
              <td>{user.phone}</td>
              <td>{user.address.address}</td>
            </tr>
          ))}
          
        </tbody>
      </table>
      {isModalOpen && (
            <Modal user={selectedUser} onClose={handleModalClose} />
          )}
    </div>
  );
};

export default Table;