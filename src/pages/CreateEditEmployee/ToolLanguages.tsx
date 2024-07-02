/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react';
import {
  Button,
  Col,
  DatePicker,
  Form,
  FormInstance,
  FormListFieldData,
  Row,
  Select,
} from 'antd';
import { IPositionResources } from '../../interfaces/employee';
import TextArea from 'antd/es/input/TextArea';
import UploadImage from './UploadImage';

interface IToolLanguageProps {
  toolLanguagesItem: FormListFieldData[];
  removeToolLanguage: (id: number) => void;
  form: FormInstance<unknown>;
  positions: IPositionResources[];
  positionResourceId: number;
  name: [number, string];
}

const ToolLanguages = (props: IToolLanguageProps) => {
  const {
    toolLanguagesItem,
    removeToolLanguage,
    positions,
    positionResourceId,
    form,
    name,
  } = props;

  const mapPositions = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mapPositions: any = {};
    for (const position of positions) {
      mapPositions[position.positionResourceId] =
        position.toolLanguageResources.map((item) => {
          return {
            value: item.toolLanguageResourceId,
            label: item.name,
          };
        });
    }
    return mapPositions;
  }, [positions]);

  return toolLanguagesItem.map((toolLanguageItem) => {
    return (
      <Col
        xs={20}
        key={`toolLanguage${toolLanguageItem.name}`}
        className="ml-20"
      >
        <Row gutter={[20, 0]}>
          <Col xs={20}>
            <Row gutter={[20, 0]}>
              <Col xs={12}>
                <Form.Item
                  name={[toolLanguageItem.name, 'toolLanguageResourceId']}
                  label="Tool/Language"
                  rules={[
                    {
                      required: true,
                      message: 'Required',
                    },
                  ]}
                >
                  <Select
                    options={mapPositions[positionResourceId] || []}
                    allowClear
                    className="w-100"
                  />
                </Form.Item>
              </Col>

              <Col xs={12}>
                <Form.Item
                  label="Year"
                  name={[toolLanguageItem.name, 'toFrom']}
                  rules={[
                    {
                      required: true,
                      message: 'Required',
                    },
                  ]}
                >
                  <DatePicker.RangePicker
                    allowClear
                    className="w-100"
                    picker="year"
                    placeholder={['From', 'To']}
                  />
                </Form.Item>
              </Col>

              <Col xs={24}>
                <Form.Item
                  label="Description"
                  name={[toolLanguageItem.name, 'description']}
                >
                  <TextArea allowClear placeholder="Descriptions" />
                </Form.Item>
              </Col>

              <Form.Item
                name={[toolLanguageItem.name, 'images']}
                noStyle
              ></Form.Item>

              <Col xs={24}>
                <UploadImage
                  onChangeImage={(images) => {
                    const data: any = form.getFieldsValue();
                    const [positionIndex] = name;

                    data.positions[positionIndex].toolLanguages[
                      toolLanguageItem.key
                    ].images = images;

                    form.setFieldsValue({
                      ...data,
                    });
                  }}
                  defaultImages={() => {
                    const data: any = form.getFieldsValue();
                    const [positionIndex] = name;

                    return (
                      data.positions[positionIndex].toolLanguages[
                        toolLanguageItem.key
                      ]?.images || []
                    );
                  }}
                />
              </Col>
            </Row>
          </Col>

          {toolLanguagesItem?.length > 1 && (
            <Col xs={4}>
              <Button
                onClick={() => {
                  removeToolLanguage(toolLanguageItem.name);
                }}
                className="mt-30"
              >
                Delete
              </Button>
            </Col>
          )}
        </Row>
      </Col>
    );
  });
};

export default ToolLanguages;
