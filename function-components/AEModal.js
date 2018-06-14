import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Form, Modal, Input, InputNumber, Row, Col, DatePicker, Tag } from 'antd';
import moment from 'moment';

const FormItem = Form.Item;
const dateTimeFormat = "YYYY-MM-DD HH:mm:ss";
const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 10
  }
};

//Add and Edit Modal
const AEModal = ({ modalVisible, currentItem, title, onOk, onCancel, sections, intlPrefix ='', modalWidth='416px',
    form: { getFieldDecorator, validateFields, resetFields, getFieldsValue }
  }) => {

  function handleOk() {
    validateFields(errors => {
      if(errors) {
        return;
      }
      const data = { ...getFieldsValue() };
      console.log('data: ', data);
      onOk(data);
      resetFields();
    });
  }

  function handleCancel() {
    resetFields();
    onCancel();
  }

  const modalProps = {
    title,
    visible: modalVisible,
    onOk: handleOk,
    onCancel,
  };

  const createSections = () => {
    if(modalVisible) {
      return (sections.map((section, sectionIndex) => {
        const createSectionTitle = () =>
          section.title && <FormItem label={<Tag color="blue">{section.title}</Tag>} {...formItemLayout}  colon={false}></FormItem>;
        const createByAdditions = () => section.additions && section.additions.map((addition, additionIndex) => {
          return (
            <FormItem key={`${sectionIndex}-${additionIndex}`}
              label={<FormattedMessage id={`${intlPrefix}${addition.name}`} />} {...formItemLayout} >
              {getFieldDecorator(addition.name, {
                initialValue: addition.initValFunc?addition.initValFunc(currentItem):currentItem[addition.name],
                rules: addition.rules
              })(
                addition.component
              )
             }
            </FormItem>
          )
        });
        const createByTextFields = () => section.textFields && section.textFields.map((textField, textFieldIndex) => {
          return (
            <FormItem key={`${sectionIndex}-${textFieldIndex}`}
             label={<FormattedMessage id={`${intlPrefix}${textField}`} />} {...formItemLayout} >
             {currentItem[textField]}
            </FormItem>
          )
        });
        const createByFields = () => section.fields && section.fields.map((field, fieldIndex) => {
          return (
            <FormItem key={`${sectionIndex}-${fieldIndex}`}
              label={<FormattedMessage id={`${intlPrefix}${field}`} />} {...formItemLayout} >
              {
                getFieldDecorator(field, {
                initialValue: currentItem[field]
              })(
                <Input />
              )
             }
            </FormItem>
          )
        });
        return (
          <Col span={section.span} xs={section.xs} sm={section.sm} md={section.md} lg={section.lg} key={`${sectionIndex}`}>
            {createSectionTitle()}
            {createByAdditions()}
            {createByTextFields()}
            {createByFields()}
          </Col>
        )
      }))
    }
  };

  return (
    <Modal {...modalProps} width={modalWidth}>
      <Form layout="horizontal">
        <Row>
          {createSections()}
        </Row>
      </Form>
    </Modal>
  )
};

export default Form.create()(AEModal);
