import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Input, InputNumber, Select, Button, Alert } from 'antd';
import * as productActionsCreator from '../../actions/products';
import styles from './add-product.scss';

const { Item: FormItem } = Form;
const { TextArea } = Input;
const { Option } = Select;

class AddProduct extends React.Component {
  static propTypes = {
    errorMessage: PropTypes.string,
    status: PropTypes.string,
    addProduct: PropTypes.func.isRequired,
    resetAddStatus: PropTypes.func.isRequired,
  };

  static defaultProps = {
    errorMessage: '',
    status: '',
  };

  state = {
    name: '',
    category: '',
    imageLink: '',
    description: '',
    price: 0,
    unit: 'wei',
  };

  componentWillReceiveProps(newProps) {
    const { status } = newProps;

    if (status === 'SUCCESS') {
      this.resetForm();
    }
  }

  resetForm = () => {
    this.setState({
      name: '',
      category: '',
      imageLink: '',
      description: '',
      price: 0,
      unit: 'wei',
    });
  };

  handleChange = field => event => {
    const value = typeof event === 'object' ? event.target.value : event;

    this.setState({
      [field]: value,
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { resetAddStatus, addProduct } = this.props;

    resetAddStatus();
    addProduct(this.state);
  };

  render() {
    const { errorMessage, status } = this.props;
    const {
      name, category, imageLink, description, price, unit,
    } = this.state;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <Form className={styles.addProduct} onSubmit={this.handleSubmit}>
        <FormItem label="Name" {...formItemLayout}>
          <Input
            placeholder="Product name"
            value={name}
            onChange={this.handleChange('name')}
          />
        </FormItem>
        <FormItem label="Description" {...formItemLayout}>
          <TextArea
            placeholder="Description"
            value={description}
            onChange={this.handleChange('description')}
          />
        </FormItem>
        <FormItem label="Category" {...formItemLayout}>
          <Input
            placeholder="Category"
            value={category}
            onChange={this.handleChange('category')}
          />
        </FormItem>
        <FormItem label="Image Link" {...formItemLayout}>
          <Input
            placeholder="Image URL"
            value={imageLink}
            onChange={this.handleChange('imageLink')}
          />
        </FormItem>
        <FormItem label="Price" {...formItemLayout}>
          <InputNumber
            placeholder="Price"
            value={price}
            onChange={this.handleChange('price')}
          />
          <Select
            value={unit}
            style={{ width: '105px', marginLeft: '10px' }}
            onChange={this.handleChange('unit')}
          >
            <Option value="wei">Wei</Option>
            <Option value="shannon">Shannon</Option>
            <Option value="szabo">Szabo</Option>
            <Option value="finney">Finney</Option>
            <Option value="ether">Ether</Option>
          </Select>
        </FormItem>
        <FormItem wrapperCol={{ span: 12, offset: 6 }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={status === 'ADDING'}
          >
            Add
          </Button>
        </FormItem>
        {status === 'SUCCESS' && (
          <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Alert
              message="Product added successfully"
              type="success"
              closable
            />
          </FormItem>
        )}
        {status === 'FAIL' && (
          <FormItem wrapperCol={{ span: 12, offset: 6 }}>
            <Alert message={errorMessage} type="error" closable />
          </FormItem>
        )}
      </Form>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.products.addErrorMessage,
  status: state.products.addStatus,
});

export default connect(mapStateToProps, productActionsCreator)(AddProduct);
