import React, { useState } from 'react';
import { Upload } from 'antd';
import type { UploadFile, UploadProps } from 'antd';

interface IUploadImageProps {
  onChangeImage: (values: string[]) => void;
  defaultImages: () => string[];
}

const UploadImage: React.FC<IUploadImageProps> = (props) => {
  const { onChangeImage, defaultImages } = props;

  const imagesFileDefault: UploadFile[] = defaultImages()?.map((url, index) => {
    return {
      uid: index + '',
      url: url,
      thumbUrl: url,
      name: url,
    };
  });

  const [fileList, setFileList] = useState<UploadFile[]>(imagesFileDefault);

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    const newImage = newFileList.map((item) => {
      const id = Math.random();
      return {
        ...item,
        url: `https://picsum.photos/400/200?random&t=${id}`,
        thumbUrl: `https://picsum.photos/400/200?random&t=${id}`,
      };
    });

    setFileList(newImage);
    onChangeImage(newImage.map((item) => item.url));
  };

  const onPreview = async (file: UploadFile) => {
    window.open(file.url);
  };

  return (
    <Upload
      listType="picture-card"
      fileList={fileList}
      onChange={onChange}
      onPreview={onPreview}
    >
      {fileList?.length < 5 && '+ Upload'}
    </Upload>
  );
};

export default UploadImage;
