import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Tab, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';
import { Role } from '../common/constants';

const UsersListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const usersList = useSelector((state) => state.usersList);
  const { error, loading, users } = usersList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    error: errorDelete,
    success: successDelete,
    loading: loadingDelete,
  } = userDelete;

  const deleteHandler = (userId) => {
    if (window.confirm('Are you sure')) {
      dispatch(deleteUser(userId));
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.roleId === Role.ADMIN_ROLE) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userDelete]);

  return (
    <>
      <h1>Users: </h1>
      <div>
        {errorDelete ? (
          <Message variant="danger">{errorDelete}</Message>
        ) : loadingDelete ? (
          <Loader />
        ) : successDelete ? (
          <Message variant="success">User Deleted</Message>
        ) : (
          <></>
        )}
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
                    <td>
                      {user.roleId === Role.ADMIN_ROLE ? 'Admin' : 'Customer'}
                    </td>
                    <td>
                      <LinkContainer to={`/admin/user/${user.id}`}>
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
