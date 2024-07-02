/* eslint-disable react/react-in-jsx-scope */
import { Select, SelectProps } from 'antd';
import { useMemo } from 'react';
import { IPositionResources } from '../interfaces/employee';
interface IPositionSelectorProps extends SelectProps {
  positions: IPositionResources[];
}

const PositionSelector = (props: IPositionSelectorProps) => {
  const { positions } = props;

  const optionsPosition = useMemo(() => {
    return positions.map((item) => {
      return {
        value: item.positionResourceId,
        label: item.name,
        toolLanguageResources: item.toolLanguageResources,
      };
    });
  }, [positions]);

  return <Select {...props} options={optionsPosition} allowClear />;
};

export default PositionSelector;
