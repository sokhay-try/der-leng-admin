import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Image, Pagination, Popconfirm, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { useProvince } from "../../custom-hooks/useProvince";
import { IFetchProvince } from "../../interfaces";
import { delay } from "../../utils/dev";
import ModalProvince from "./modal";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase";

const Index = () => {
  const DEFAULT_PAGE = 1;
  const DEFAULT_PAGE_SIZE = 2;
  const {
    getAllProvinces,
    createProvince,
    updateProvince,
    deleteProvince,
    getAllImages,
  } = useProvince();
  const [data, setData] = useState({
    results: [],
    total: 0,
    count: 0,
  } as IFetchProvince);
  const [paginate, setPaginate] = useState({
    page: DEFAULT_PAGE,
    page_size: DEFAULT_PAGE_SIZE,
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [provinceEditData, setProvinceEditData] = useState();
  const [imgsUrl, setImgsUrl] = useState([]);

  const columns = [
    {
      title: "#",
      key: "index",
      render: (val, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text, record) => <a>{record.title}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      render: (text, record) => <a>{record.description}</a>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            style={{ color: "#4E89FF" }}
            className="cursor-pointer"
            onClick={() => onEdit(record)}
          />
          <Popconfirm
            title={`Are you sure to delete this ${record.title} ?`}
            onConfirm={(e) => confirm(record)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined
              style={{ color: "#4E89FF" }}
              className="cursor-pointer"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const refetchData = async (query = "", options = {}) => {
    const data = await getAllProvinces(query, options);
    setData(data);
  };

  useEffect(() => {
    refetchData(`?page=${paginate.page}&page_size=${paginate.page_size}`);
  }, []);

  const onPageChange = async (page, pageSize) => {
    setPaginate({
      ...paginate,
      page,
    });
    await refetchData(`?page=${page}&page_size=${pageSize}`);
  };

  const onCreate = () => {
    setIsModalVisible(true);
    setImgsUrl([]);
    setProvinceEditData(undefined);
  };

  const onEdit = async (data) => {
    const imgs = await getAllImages(data.id);
    setImgsUrl(imgs);
    setIsModalVisible(true);
    setProvinceEditData(data);
  };

  const confirm = async (data) => {
    await deleteProvince(data.id);
    await delay(3000);
    await refetchData(`?page=${DEFAULT_PAGE}&page_size=${DEFAULT_PAGE_SIZE}`);
  };

  const handleFirebaseUpload = async (images, imagesUrl) => {
    if (images.length == 0) {
      return imagesUrl;
    }
    const image = images.shift();
    if (image.id) {
      return handleFirebaseUpload(images, imagesUrl);
    }
    const { originFileObj } = image;
    const storageRef = ref(storage, `images/${originFileObj.name}`);
    const uploadTask = uploadBytesResumable(storageRef, originFileObj);
    uploadTask.on(
      "state_changed",
      () => {},
      (error) => {
        console.log(error);
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          imagesUrl.push(downloadURL);
        });
      }
    );
    await Promise.all([uploadTask]);
    await delay(5000);
    return handleFirebaseUpload(images, imagesUrl);
  };

  const handleOk = async (data) => {
    let imagesUrl = await handleFirebaseUpload(data.images, []);
    data.images = imagesUrl;
    if (data.id) {
      const updated = updateProvince(data);
      if (updated) {
        setIsModalVisible(false);
        await delay(2000);
        await refetchData(
          `?page=${paginate.page}&page_size=${paginate.page_size}`
        );
      }
    } else {
      const created = createProvince(data);
      if (created) {
        setIsModalVisible(false);
        await delay(2000);
        await refetchData(
          `?page=${DEFAULT_PAGE}&page_size=${DEFAULT_PAGE_SIZE}`
        );
      }
    }
  };

  return (
    <>
      {isModalVisible && (
        <ModalProvince
          isVisible={isModalVisible}
          handleOk={handleOk}
          handleCancel={() => setIsModalVisible(false)}
          data={provinceEditData}
          imagesUrl={imgsUrl}
        />
      )}

      <div className="flex justify-end pb-2">
        <Button type="primary" onClick={onCreate}>
          + Create
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={data.results}
        pagination={false}
        rowKey="id"
      />
      <div className="pt-5 flex justify-end">
        <Pagination
          defaultCurrent={1}
          current={paginate.page}
          total={data.total}
          pageSize={paginate.page_size}
          onChange={onPageChange}
        />
      </div>
    </>
  );
};

export default Index;
