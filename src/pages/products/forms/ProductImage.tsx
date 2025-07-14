import { Form, message, Space, Typography, Upload, type UploadProps } from "antd"
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

function ProductImage({ initialImage }: { initialImage: string | null }) {

    const [ messageApi, contextHolder ] = message.useMessage()
  const [imageUrl, setImageUrl] = useState<string | null>(initialImage);

  const uploaderConfig: UploadProps = {
    multiple: false,
    showUploadList: false,
    beforeUpload: (file) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if(!isJpgOrPng){
        messageApi.error('You can only upload JPG/PNG file')
      }
      setImageUrl(URL.createObjectURL(file));
      return false;
    }
  }
  return (
    <Form.Item
              label="Image"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Product image is required",
                },
              ]}
            >
              <Upload listType="picture-card" {...uploaderConfig} 
              >
                { contextHolder }
                {
                  imageUrl ? (<img src={imageUrl} alt="product-image" style={{ width: "100%"}}/>) : (
                    <Space direction="vertical">
                      <PlusOutlined />
                      <Typography.Text strong style={{ marginTop: 4 }}>
                        Upload
                      </Typography.Text>
                    </Space>
                  )
                }
              </Upload>
            </Form.Item>
  )
}

export default ProductImage