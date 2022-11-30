import React, { useEffect, useState } from "react";
import Title from "../Components/Title";
import bitcoinOwnerSvg from "../Assets/Bitcoin P2P-rafiki.svg";
import { Button, DatePicker, Form, Input, Select } from "antd";
import { createClient, fetchCurrencys } from "../API/actions";
import { useNavigate } from "react-router-dom";

const OwnerForm = () => {
  const [form] = Form.useForm();
  const [currList, setCurrList] = useState([]);
  const [currSelected, setCurrSelected] = useState();

  const Navigate = useNavigate();

  useEffect(() => {
    async function fetchAll() {
      const { data } = await fetchCurrencys();
      setCurrList(data);
      return data;
    }

    fetchAll();
  }, []);

  const handleFinish = async (formValues) => {
    const item = { ...formValues, bitcoin: { idBitcoin: currSelected } };

    await createClient(item);

    Navigate("/admin/client/list");
  };
  return (
    <>
      <div className="row">
        <Title text={"Add client"} />
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="d-flex align-items-center h-100">
            <div className="w-100">
              <Form form={form} layout="vertical" onFinish={handleFinish}>
                <Form.Item label="Client's name" name="nomOwner">
                  <Input placeholder="Foulen Ben Foulen" />
                </Form.Item>
                <Form.Item label="Purchase date" name="purchaseDate">
                  <DatePicker className="w-100" format={"YYYY-MM-DD"} />
                </Form.Item>

                <Form.Item label="Currency">
                  <Select
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
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Ajouter
                  </Button>
                  <Button
                    type="primary"
                    danger
                    htmlType="reset"
                    className="mx-2"
                  >
                    Annuler
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-8 col-sm-12">
          <img src={bitcoinOwnerSvg} />
        </div>
      </div>
    </>
  );
};

export default OwnerForm;
