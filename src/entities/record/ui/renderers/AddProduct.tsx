import { Form, Space, Input, Button, Col, Row } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const AddProduct = () => {
  return (
    <>
      <Form.List name="product">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              
                <Row key={key} gutter={16} style={{border:"1px solid gray" , padding:"25px", marginBottom:"20px"}}>
                    <Col span={12}>
                        <Form.Item
                  {...restField}
                  label="Product Name"
                  name="product_name"
                >
                  <Input placeholder="Product Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label="Product Family Name"
                  name="product_family_name"
                >
                  <Input placeholder="Product Family Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  label="Product Abbreviation"
                  name="product_abbreviation"
                >
                  <Input placeholder="Product Abbreviation Name" />
                </Form.Item>
                </Col>
                    <Col span={11}>
                        <Form.Item label="Study Product Role" name="product_name">
                  <Input placeholder="Study Product Role" />
                </Form.Item>
                <Form.Item label="Blinded Name" name="product_name">
                  <Input placeholder="Blinded Name" />
                </Form.Item>
                <Form.Item label="Product Name" name="product_name">
                  <Input placeholder="Product Name" />
                </Form.Item>
                </Col>
                <Col span={1}>
                    <Button onClick={() => remove(name)} style={{border:"1px solid red"}}>
                    <MinusCircleOutlined style={{color:"red"}} />
                    </Button>
                
                </Col>
                
                
                

                
                
                </Row>
              
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add field
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </>
  );
};
export default AddProduct;
