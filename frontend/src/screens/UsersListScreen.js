import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Tab, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers } from '../actions/userActions';
import { Roles } from '../common/constants';

const UsersListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const usersList = useSelector((state) => state.usersList);
  const { error, loading, users } = usersList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteHandler = (userId) => {
    console.log('Delete User');
  };

  useEffect(() => {
    if (userInfo && userInfo.roleId === Roles.ADMIN_ROLE) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history]);

  return (
    <>
      <h1>Users: </h1>
      <div>
        {error ? (
          <Message variant="danger">{error}</Message>
        ) : loading ? (
          <Loader />
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile Number</th>
                <th>Role</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>{user.mobileNumber}</td>
                    <td>{user.roleId}</td>
                    <td>
                      <LinkContainer to={`/user/${user.id}`}>
                        <Button variant="info" className="btn-sm mx-3">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(user.id)}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
};

export default UsersListScreen;
