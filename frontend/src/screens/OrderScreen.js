import React, { useState, useEffect } from 'react';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getOrderDetails } from '../actions/orderAction';

const OrderScreen = ({ match }) => {
  const dispatch = useDispatch();
  const orderId = match.params.id;
  const cart = useSelector((state) => state.cart);

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  let totalPrice = 0;
  let itemsPrice = 0;

  if (!loading) {
    itemsPrice = order.items.reduce(
      (acc, item) => Number(item.unitPrice) * item.quantity + acc,
      0
    );

    totalPrice =
      itemsPrice + Number(order.shippingPrice) + Number(order.taxPrice);
  }

  useEffect(() => {
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <h1>Order {orderId}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Customer Name: </strong> {order.customer.name}
              </p>
              <p>
                <strong>Customer Email: </strong>
                <a href={`mailto:${order.customer.email}`}>
                  {order.customer.email}
                </a>
              </p>
              <p>
                <strong>Address: </strong>
                {order.shippingAddress === null ? (
                  <p>Shipping Address was not provided</p>
                ) : (
                  <p>
                    {order.shippingAddress.address},{order.shippingAddress.city}
                    ,{order.shippingAddress.postalCode},
                    {order.shippingAddress.country}
                  </p>
                )}
                {order.statusId > 3 ? (
                  <Message variant="success">Delivered</Message>
                ) : order.statusId > 2 ? (
                  <Message variant="warning">Shipped Not Delivered</Message>
                ) : (
                  <Message variant="danger">Not Shipped</Message>
                )}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>
              {order.statusId > 1 ? (
                <>
                  <Message variant="success">
                    Paid at {order.payment.createdAt}
                  </Message>
                  <p>
                    <strong>Payment Method: </strong>
                    {order.payment.paymentMethod.name}
                  </p>
                </>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Order Items</h2>
              {order.items.length === 0 ? (
                <Message variant="warning">Your Order is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item Key={index}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = {item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items Price</Col>
                  <Col>${itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax Price</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${totalPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
