import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { listRoles } from '../actions/roleAction';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [roleId, setRoleId] = useState('');

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const rolesList = useSelector((state) => state.roleList);
  const { loadingRole, errorRole, roles } = rolesList;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    if (!roles || roles.length === 0) {
      dispatch(listRoles());
    }
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/users');
    } else {
      if (!user.name || user.id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setMobileNumber(user.mobileNumber);
        setRoleId(user.roleId);
      }
    }
  }, [dispatch, history, userId, successUpdate, user, roles]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        id: userId,
        name,
        email,
        mobileNumber,
        roleId: Number(roleId),
      })
    );
  };

  return (
    <>
      <Link to="/admin/users" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="mobile">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="mobile"
                placeholder="Enter Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="roleid">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={roleId}
                onChange={(e) => setRoleId(e.target.value)}
              >
                {roles.map((role) => (
                  <option key={role.name} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
