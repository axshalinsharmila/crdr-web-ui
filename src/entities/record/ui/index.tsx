import { JsonForms } from "@jsonforms/react";
import { createAjv } from "@jsonforms/core";
import { Button, Row, Form, Input, Select, notification, Col } from "antd";
import { useState, useEffect } from "react";
import { Flow, MERCK, NON_MERCK, useFlow } from "../../flow/model";
import AddProduct from "./renderers/AddProduct";

// const handleDefaultsAjv = createAjv({
//     useDefaults:true,
//     allErrors:true
// })
const { Option } = Select;
type Status = "Active" | "InActive";

interface FormData {
  protocol_title?: string;
  study_number?: string;
  stdy_type?: string;
  study_phase?: string;
  status?: Status;
  other_study_id?: string;
}

// interface StatusValue {
//     status?: Status;
//   }
// interface PriceInputProps {
//     id?: string;
//     value?: StatusValue;
//     onChange?: (value: StatusValue) => void;
//   }

const boxStyle: React.CSSProperties = {
  width: "100%",
  borderRadius: 6,
  border: "1px solid #40a9ff",
};

// const Editor = (({onSubmit} : {onSubmit: (d:study)=>void}))=>{
const EditorForm: React.FC = () => {
  const [form] = Form.useForm();
  const [flow, setFlow] = useFlow();
  const docIDnum: string | null = localStorage.getItem("docID");
  const [status, setStatus] = useState<Status>("Active");
  const [isStudyNumberDisabled, setIsStudyNumberDisabled] = useState(false);

  // const [flow]= useFlow()

  const onStatusChange = (newStatus: Status) => {
    setStatus(newStatus);
    form.setFieldsValue({ status: newStatus });
  };

  const onFinish = (value: FormData) => {
    const formValue = form.getFieldsValue();
    console.log(value, "values==>", form.getFieldsValue(), formValue);
    localStorage.setItem("FormDataRegister", JSON.stringify(value));
    notification.success({
      message: "New Document Created",
      description: "No details found for the given Merck Study ID.",
    });
  };

  useEffect(() => {
    const studyNumber = localStorage.getItem("docID") || "";
    const formData: FormData = JSON.parse(
      localStorage.getItem("FormDataRegister") || "{}"
    );

    if (studyNumber) {
      form.setFieldsValue({
        study_number: studyNumber,
        ...formData,
        // protocol_title: formData.protocol_title || "",
        // stdy_type: formData.stdy_type || "",
        // study_phase: formData.study_phase || "",
        // status: formData.status || "Active",
        // other_study_id: formData.other_study_id || "",
      });
      if (flow!.name === MERCK && studyNumber === formData.study_number) {
        setIsStudyNumberDisabled(true);
      }
      //   setIsStudyNumberDisabled(true); // Disable the field if study number exists
    }
  }, [form, docIDnum]);

  return (
    <Form
      layout="horizontal"
      form={form}
      onFinish={onFinish}
      initialValues={{
        status: "Active",
      }}
    >
      {/* <JsonForms/> */}
      <h1>Editor Form</h1>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            label="Protocol Title"
            required
            name="protocol_title"
            rules={[{ required: true, message: "Protocol Title is required" }]}
          >
            <Input
              placeholder="Protocol Title"
              style={{ width: "100%" }}
              disabled={isStudyNumberDisabled}
            />
          </Form.Item>
          <Form.Item label="Study Type" name="stdy_type" required>
            <Input
              placeholder="Study Type"
              style={{ width: "100%" }}
              disabled={isStudyNumberDisabled}
            />
          </Form.Item>
          <Form.Item
            label="Status"
            required
            name="status"
            rules={[{ required: true, message: "Status is required" }]}
          >
            <Select
              value={status}
              style={{ margin: "0 0px" }}
              onChange={onStatusChange}
            >
              <Option value="active">Active</Option>
              <Option value="inActive">InActive</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          {" "}
          <Form.Item label="Study Number" name="study_number">
            <Input
              style={boxStyle}
              placeholder="Study Number"
              disabled={isStudyNumberDisabled}
            />
          </Form.Item>
          <Form.Item
            label="Study Phase"
            name="study_phase"
            rules={[{ required: true, message: "Study Type is required" }]}
          >
            <Input
              placeholder="Study Phase"
              style={{ width: "100%" }}
              disabled={isStudyNumberDisabled}
            />
          </Form.Item>
          <Form.Item label="Other Study ID" name="other_study_id">
            <Input
              placeholder="Other Study ID"
              style={{ width: "100%" }}
              disabled={isStudyNumberDisabled}
            />
          </Form.Item>
        </Col>
      </Row>

      <>
        <AddProduct />
      </>
      <Form.Item>
        <Button htmlType="submit" block type="primary">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default EditorForm;
