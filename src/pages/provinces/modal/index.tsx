import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Upload } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { IProvince } from "../../../interfaces";

interface IProps {
  data?: IProvince;
  imagesUrl: Array<string>;
  isVisible: boolean;
  handleOk: Function;
  handleCancel: Function;
}
const ModalProvince = (props: IProps) => {
  const { data, isVisible, handleOk, handleCancel, imagesUrl } = props;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [provinceData, setProvinceData] = useState({
    title: data?.title || "",
    description: data?.description || "",
  } as IProvince);

  const [fileList, setFileList] = useState(imagesUrl || ([] as any));

  useEffect(() => {
    setIsModalVisible(isVisible);
  }, [isVisible]);

  useEffect(() => {
    setProvinceData({
      title: data?.title || "",
      description: data?.description || "",
    });
  }, [data]);

  const onOk = () => {
    const payload: any = { ...provinceData };
    if (data) {
      payload.id = data.id;
    }
    if (fileList.length > 0) {
      payload.images = fileList;
    }
    console.log(">>>payload:::", payload);
    console.log(">>>data:::", data);
    handleOk(payload);
  };

  const onCancel = () => {
    handleCancel();
  };

  const onTitleChange = (e) => {
    setProvinceData({
      ...provinceData,
      title: e.target.value,
    });
  };

  const onDescriptionChange = (e) => {
    setProvinceData({
      ...provinceData,
      description: e.target.value,
    });
  };

  const onImageChange = (file) => {
    const { fileList } = file;
    setFileList(fileList);
  };

  return (
    <Modal
      title={data ? "Edit" : "Create"}
      visible={isModalVisible}
      onOk={onOk}
      onCancel={onCancel}
    >
      <Form layout="vertical" initialValues={data}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Title is required!" }]}
        >
          <Input onChange={onTitleChange} />
        </Form.Item>
        <Form.Item
          name="description"
          label="Description"
          rules={[{ required: true, message: "Description is required!" }]}
        >
          <TextArea rows={4} onChange={onDescriptionChange} />
        </Form.Item>
        <Form.Item
          name="images"
          label="Images"
          rules={[{ required: true, message: "Image is required!" }]}
        >
          <Upload
            listType="picture-card"
            fileList={fileList}
            accept={"image/png, image/jpeg"}
            onChange={onImageChange}
            name="file"
          >
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalProvince;
