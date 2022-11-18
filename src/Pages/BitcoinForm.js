import { Button, Form, Input } from "antd";
import React from "react";
import Title from "../Components/Title";
import bitcoinSvg from "../Assets/Bitcoin-rafiki.svg";
import { createCurrencys } from "../API/actions";
import { useNavigate } from "react-router-dom";
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const BitcoinForm = () => {
  const [form] = Form.useForm();
  const Navigate = useNavigate();

  const handleForm = async (formValues) => {
    const { data } = await createCurrencys(formValues);
    Navigate("/admin/currency/list");
  };
  return (
    <>
      <div className="row">
        <Title text={"Add Currency"} />
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="d-flex align-items-center h-100">
            <div className="w-100">
              <Form form={form} onFinish={handleForm} layout="vertical">
                <Form.Item
                  label="Currency Name"
                  name="bitcoinName"
                  rules={[
                    {
                      required: true,
                      message: "Please provide a currency name",
                    },
                  ]}
                >
                  <Input placeholder="Bitcoin, Dogecoin, Ethereum, Litecoin..." />
                </Form.Item>
                <Form.Item
                  label="Currency Price"
                  name="bitcoinPrice"
                  rules={[
                    {
                      required: true,
                      message: "Please provide the currency's price",
                    },
                  ]}
                >
                  <Input placeholder="6100" suffix="TND" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Ajouter
                  </Button>
                  <Button type="danger" htmlType="reset" className="mx-2">
                    Annuler
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-8 col-sm-12">
          <img src={bitcoinSvg} alt="bitcoin" />
        </div>
      </div>
    </>
  );
};

export default BitcoinForm;
