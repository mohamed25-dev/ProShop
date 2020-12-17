import React, { useState, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listUsers, deleteUser } from '../actions/userActions';
import { Roles } from '../common/constants';

const ProductListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const {
    error: errorDelete,
    success: successDelete,
    loading: loadingDelete,
  } = userDelete;

  const createProductHandler = (product) => {};

  const deleteHandler = (userId) => {
    if (window.confirm('Are you sure')) {
      // Delete Product
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.roleId === Roles.ADMIN_ROLE) {
      dispatch(listUsers());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products: </h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={() => createProductHandler({})}>
            <i className="fas fa-plus"></i> Create Product
          </Button>
        </Col>
      </Row>
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
                <th>Price</th>
                <th>Quantity</th>
                <th>Category</th>
                <th>Image</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.quantityInStock}</td>
                    <td>{product.categoryId}</td>
                    <td>{product.image}</td>

                    <td>
                      <LinkContainer to={`/admin/product/${product.id}`}>
                        <Button variant="info" className="btn-sm mx-3">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm"
                        onClick={() => deleteHandler(product.id)}
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

export default ProductListScreen;
