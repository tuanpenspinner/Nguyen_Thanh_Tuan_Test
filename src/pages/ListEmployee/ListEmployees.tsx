/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Card, Carousel, Input, List, Space, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getEmployees, removeEmployee } from '../../services/employee';

const useDebouncedValue = (inputValue: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
};

const ListEmployees: React.FC = () => {
  const [value, setValue] = useState('');
  const debouncedSearch = useDebouncedValue(value, 500);
  const employeesData: any[] | (() => any[]) = getEmployees();
  const [employees, setEmployees] = useState(employeesData);
  const navigate = useNavigate();

  const handleDelete = (id: number) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
    removeEmployee(id);
    message.success(`Delete profile created successfully!`);
  };

  useEffect(() => {
    setEmployees(
      employeesData.filter((item) =>
        item.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    );
  }, [debouncedSearch]);

  return (
    <Space direction="vertical" className="w-100">
      <Space style={{ justifyContent: 'space-between' }} className="w-100">
        <Space>
          Search Name
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            allowClear
          />
        </Space>
        <Button type="primary" onClick={() => navigate('/create')}>
          Add employee
        </Button>
      </Space>

      <List
        grid={{ gutter: 16, xs: 1, sm: 2, xl: 4 }}
        dataSource={employees}
        renderItem={(employee) => (
          <List.Item>
            <Card
              hoverable
              actions={[
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => navigate(`/edit/${employee.id}`)}
                />,
                <Button
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDelete(employee.id)}
                />,
              ]}
            >
              <Carousel autoplay={true} autoplaySpeed={1000}>
                {employee?.images?.map((img: string, index: number) => (
                  <div key={index}>
                    <img
                      src={
                        img ||
                        'https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg'
                      }
                      alt="Portfolio"
                      width={200}
                      height={200}
                    />
                  </div>
                ))}
              </Carousel>

              <div className="mt-20">
                <Card.Meta
                  title={employee.name}
                  description={employee.position}
                />
              </div>
            </Card>
          </List.Item>
        )}
      />
    </Space>
  );
};

export default ListEmployees;
