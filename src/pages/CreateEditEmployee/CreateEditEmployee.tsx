/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import dayjs from 'dayjs';
import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Typography,
  message,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import Positions from './Positions';
import {
  createEmployee,
  editEmployee,
  getEmployee,
  removeEmployee,
} from '../../services/employee';
import { useNavigate, useParams } from 'react-router-dom';
import { IToolLanguages } from '../../interfaces/employee';

interface ICreateEditEmployeeProps {
  isEdit?: boolean;
}

const CreateEditEmployee: React.FC<ICreateEditEmployeeProps> = (props) => {
  const { isEdit } = props;
  const { id } = useParams();
  const [form] = useForm();
  const navigate = useNavigate();

  const handleDelete = () => {
    removeEmployee(Number(id));
    message.success(`Delete profile created successfully!`);
    navigate('/');
  };

  const onFinish = (values: unknown) => {
    if (isEdit) {
      editEmployee(Number(id), values);
    } else {
      createEmployee(values);
    }

    message.success(
      `${isEdit ? 'Edit' : 'Create'} profile created successfully!`
    );
  };

  useEffect(() => {
    if (isEdit) {
      const employee = getEmployee(Number(id));
      if (employee) {
        form.setFieldsValue({
          ...employee,
          positions: employee?.positions?.map((position: any) => {
            return {
              ...position,
              toolLanguages: position.toolLanguages?.map(
                (toolLanguage: IToolLanguages) => {
                  return {
                    ...toolLanguage,
                    toFrom: [
                      dayjs(toolLanguage.toFrom[0]),
                      dayjs(toolLanguage.toFrom[1]),
                    ],
                  };
                }
              ),
            };
          }),
        });
      } else {
        navigate('/');
      }
    }
  }, [isEdit]);

  return (
    <>
      <Typography.Title>Create employee profile</Typography.Title>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={[20, 20]}>
          <Col xs={20}>
            <Form.Item
              name="name"
              label={<Typography.Text strong>Name</Typography.Text>}
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
              className="mb-0"
            >
              <Input allowClear />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.List
              name="positions"
              initialValue={[
                { positionResourceId: undefined, toolLanguages: [{}] },
              ]}
            >
              {(positionsItem, { add, remove }) => {
                return (
                  <Row gutter={[20, 20]}>
                    <Positions
                      positionsItem={positionsItem}
                      removePosition={remove}
                      form={form}
                    />

                    <Col xs={24}>
                      <Button onClick={() => add()}>Add position</Button>
                    </Col>
                  </Row>
                );
              }}
            </Form.List>
          </Col>

          <Col xs={24} style={{ display: 'flex', justifyContent: 'center' }}>
            <Space size={30}>
              {isEdit && (
                <Button danger onClick={() => handleDelete()}>
                  Delete
                </Button>
              )}

              <Button onClick={() => navigate('/')}>
                {isEdit ? 'Cancel' : 'Back to home'}
              </Button>

              <Button type="primary" htmlType="submit">
                {isEdit ? 'Save' : 'Create'}
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CreateEditEmployee;
