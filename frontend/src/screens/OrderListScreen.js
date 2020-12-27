import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listOrders } from '../actions/orderAction';
import { Roles } from '../common/constants';

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { error, loading, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.roleId === Roles.ADMIN_ROLE) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Orders: </h1>
        </Col>
      </Row>
      <div>
        {error ? (
          <Message variant="danger">{error}</Message>
        ) : loading ? (
          <Loader />
        ) : (
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User ID</th>
                <th>Status Id</th>
                <th>Created At</th>
                <th>Shipping Price</th>
                <th>Tax Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                return (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.userId}</td>
                    <td>${order.statusId}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.shippingPrice}</td>
                    <td>{order.taxPrice}</td>

                    <td>
                      <LinkContainer to={`/admin/order/${order.id}/edit`}>
                        <Button variant="info" className="btn-sm mx-3">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
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

export default OrderListScreen;
