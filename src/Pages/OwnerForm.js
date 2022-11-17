import React from "react";
import Title from "../Components/Title";
import bitcoinOwnerSvg from "../Assets/Bitcoin P2P-rafiki.svg";
import { Button, DatePicker, Form, Input, Select } from "antd";

const OwnerForm = () => {
  return (
    <>
      <div className="row">
        <Title text={"Add client"} />
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="d-flex align-items-center h-100">
            <div className="w-100">
              <Form layout="vertical">
                <Form.Item label="Client's name">
                  <Input placeholder="Foulen Ben Foulen" />
                </Form.Item>
                <Form.Item label="Purchase date">
                  <DatePicker className="w-100" />
                </Form.Item>

                <Form.Item label="Currency">
                  <Select>
                    <Select.Option></Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Amount">
                  <Input />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    Ajouter
                  </Button>
                  <Button type="danger" className="mx-2">
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
