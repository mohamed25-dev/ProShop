import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails, updateProduct } from '../actions/productActions';
import {
  PRODUCT_UPDATE_RESET,
  PRODUCT_DETAILS_RESET,
} from '../constants/productConstants';

const ProductCreateScreen = ({ match, history }) => {
  const productId = match.params.id;
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [quantityInStock, setQuantityInStock] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (!product.name || product.id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setQuantityInStock(product.quantityInStock);
        setCategoryId(product.categoryId);
        setDescription(product.description);
        setImage(product.image);
      }

      if (successUpdate) {
        dispatch({ type: PRODUCT_UPDATE_RESET });
        dispatch({ type: PRODUCT_DETAILS_RESET });

        history.push('/admin/products');
      }
    }
  }, [dispatch, history, product, userInfo, successUpdate, productId]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct(productId, {
        name,
        price,
        quantityInStock,
        categoryId: Number(categoryId),
        image,
        description,
      })
    );
  };

  return (
    <>
      <Link to="/admin/users" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              value={name}
              placeholder="Enter Product Name"
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              placeholder="Enter Product Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="quantityInStock">
            <Form.Label>Quantity In Stock</Form.Label>
            <Form.Control
              placeholder="Enter Quantity In Stock"
              value={quantityInStock}
              onChange={(e) => setQuantityInStock(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="categoryId">
            <Form.Label>Category</Form.Label>
            <Form.Control
              placeholder="Choose Product Category "
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              placeholder="Product Image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              placeholder="Product Description "
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ProductCreateScreen;
