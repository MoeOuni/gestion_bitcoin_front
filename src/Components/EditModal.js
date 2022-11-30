import React, { useState, useEffect } from "react";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Typography,
} from "antd";

import { fetchCurrencys, updateClient } from "../API/actions";
import moment from "moment/moment";

const { Link } = Typography;

const EditModal = (props) => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm();

  form.setFieldsValue({
    nomOwner: props.data.nomOwner,
    coinsOwned: props.data.coinsOwned,
  });

  const [currList, setCurrList] = useState([]);
  const [currSelected, setCurrSelected] = useState(
    props.data.bitcoin.idBitcoin
  );
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    handleFinish();
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    async function fetchAll() {
      const { data } = await fetchCurrencys();
      setCurrList(data);
      return data;
    }

    fetchAll();
  }, []);

  const handleFinish = async () => {
    try {
      const formValues = form.getFieldsValue();
      const item = {
        ...formValues,
        bitcoin: { idBitcoin: currSelected },
        idOwner: props.data.idOwner,
      };
      const { data } = await updateClient(item);

      let newArray = props.dataList.map((elem) => {
        if (elem.idOwner === data.idOwner) {
          return data;
        } else {
          return elem;
        }
      });

      console.log(newArray);
      props.setDataList(newArray);
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <>
      <Link type="primary" onClick={showModal}>
        Edit
      </Link>
      <Modal
        title="Title"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Client's name" name="nomOwner">
            <Input
              placeholder="Foulen Ben Foulen"
              value={props.data.nomOwner}
            />
          </Form.Item>
          <Form.Item label="Purchase date" name="purchaseDate">
            <DatePicker
              className="w-100"
              format={"YYYY-MM-DD"}
              defaultValue={props.data.purchaseDate}
            />
          </Form.Item>

          <Form.Item label="Currency">
            <Select
              defaultValue={currSelected}
              onChange={(e) => {
                setCurrSelected(e);
              }}
            >
              {currList.map((elem) => {
                return (
                  <Select.Option value={elem.idBitcoin}>
                    <span className="w-100 d-flex justify-content-between">
                      <span>{elem.bitcoinName}</span>
                      <span>{elem.bitcoinPrice} TND</span>
                    </span>
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Amount" name="coinsOwned">
            <Input value={props.data.coinsOwned} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default EditModal;
