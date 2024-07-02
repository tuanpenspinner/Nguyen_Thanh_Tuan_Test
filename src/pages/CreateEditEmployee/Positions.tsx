/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Col,
  Form,
  FormInstance,
  FormListFieldData,
  Row,
  Typography,
} from 'antd';
import PositionSelector from '../../modules/PositionSelector';
import ToolLanguages from './ToolLanguages';
import React, { useEffect, useState } from 'react';
import { IPositionResources } from '../../interfaces/employee';
import { getPositionResources } from '../../services/employee';

interface IPositionsProps {
  positionsItem: FormListFieldData[];
  removePosition: (id: number) => void;
  form: FormInstance<unknown>;
}

const Positions: React.FC<IPositionsProps> = (props) => {
  const { positionsItem, removePosition, form } = props;
  const [positions, setPositions] = useState<IPositionResources[]>([]);

  useEffect(() => {
    const getListPositionResources = () => {
      const data = getPositionResources();
      setPositions(data);
    };

    getListPositionResources();
  }, []);

  return positionsItem.map((positionItem) => {
    return (
      <Col xs={24} key={`position${positionItem.name}`}>
        <Row className="w-100">
          <Col xs={20}>
            <Form.Item
              name={[positionItem.name, 'positionResourceId']}
              label={<Typography.Text strong>Position</Typography.Text>}
              rules={[
                {
                  required: true,
                  message: 'Required',
                },
              ]}
              className="mb-0 w-100"
            >
              <PositionSelector
                allowClear
                positions={positions}
                onChange={() => {
                  const toolLanguages = form.getFieldValue([
                    'positions',
                    positionItem.name,
                    'toolLanguages',
                  ]);

                  form.setFieldValue(
                    ['positions', positionItem.name, 'toolLanguages'],
                    toolLanguages?.map((item: any) => {
                      return {
                        ...item,
                        toolLanguageResourceId: undefined,
                      };
                    })
                  );
                }}
              />
            </Form.Item>
          </Col>

          <Col xs={4}>
            {positionsItem?.length > 1 && (
              <Button
                onClick={() => removePosition(positionItem.name)}
                className="ml-20 mt-30"
              >
                Delete Position
              </Button>
            )}
          </Col>
        </Row>

        <Form.Item
          name={[positionItem.name, 'toolLanguageResources']}
          noStyle
          className="mb-0"
        ></Form.Item>

        <Form.Item
          noStyle
          dependencies={[
            ['positions', positionItem.name, 'positionResourceId'],
          ]}
        >
          {({ getFieldValue }) => {
            const positionResourceId = getFieldValue([
              'positions',
              positionItem.name,
              'positionResourceId',
            ]);

            if (!positionResourceId) {
              return null;
            }

            return (
              <>
                <Form.List
                  name={[positionItem.name, 'toolLanguages']}
                  initialValue={[
                    { positionResourceId: undefined, toolLanguages: [{}] },
                  ]}
                >
                  {(toolLanguagesItem, { add, remove }) => {
                    return (
                      <Row gutter={[20, 20]} className="mt-20">
                        <ToolLanguages
                          form={form}
                          positions={positions}
                          removeToolLanguage={remove}
                          positionResourceId={positionResourceId}
                          toolLanguagesItem={toolLanguagesItem}
                          name={[positionItem.name, 'toolLanguages']}
                        />
                        <Col xs={24}>
                          <Button onClick={() => add()}>
                            Add Tool/ Language
                          </Button>
                        </Col>
                      </Row>
                    );
                  }}
                </Form.List>
                <div className="divider"></div>
              </>
            );
          }}
        </Form.Item>
      </Col>
    );
  });
};

export default Positions;
