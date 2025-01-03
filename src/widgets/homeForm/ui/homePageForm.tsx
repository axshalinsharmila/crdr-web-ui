import {
  Form,
  Radio,
  Input,
  Typography,
  Button,
  Row,
  Col,
  Flex,
  notification,
} from "antd";
import { useNavigate, useOutletContext } from "react-router-dom";
import { PATHS } from "../../../app/router";
import { CopyOutlined, SearchOutlined } from "@ant-design/icons";
// import styles from "./homePageForm.module.css";
import { useLazyStudyProduct } from "../../../entities/record/model";
import  "./homePage.css"
import { Flow, MERCK, NON_MERCK, useFlow } from "../../../entities/flow/model";
import { useEffect, useState } from "react";


const { Text } = Typography;

const radioButtons = [
  { label: "Merk Studies", value: MERCK, title: "Merck" },
  { label: "Non-Merck Studies", value: NON_MERCK, title: "Non-Merck" },
];

const FormInput: React.FC = () => {

  const [searchId, setSearchID] = useState<string>()
  
const navigate = useNavigate();
    const [form] = Form.useForm<{
    documentId: string;
    studyOrProductService: Flow["name"];
  }>();
  const [flow, setFlow] =useFlow()
  const text = flow!.name === MERCK ?  'REDS Document ID or Study Number':'REDS Document Study Number'
  // const text = "REDS Document ID or Study Number";
  // const [getProduct, product] =useLazyStudyProduct()

  const [filteredRadioButtons, setFilteredRadioButtons] = useState(radioButtons);


const navigateToEditor = (isMerck: boolean, documentDetails?: object)=>{
  if (isMerck && documentDetails) {
    localStorage.setItem("FormDataRegister", JSON.stringify(documentDetails));
  } else {
    localStorage.removeItem("FormDataRegister"); // Clear data for Non-Merck
  }
  navigate(PATHS.EDITOR, { replace: false });
 
}

useEffect(() => {
  const updatedRadioButtons = radioButtons.filter(
    (button) => button.value === flow?.name || button.value
  );
  setFilteredRadioButtons(updatedRadioButtons);
console.log("studyOrProductService",updatedRadioButtons)
  // Dynamically update the form's initial values if necessary
  // form.setFieldsValue({ studyOrProductService: updatedRadioButtons[0]?.value });
  // setFlow({name:updatedRadioButtons[0]?.value  })
}, [flow, form]);


  const onFinish = (values:{documentId:string, studyOrProductService: Flow['name']}) =>{
    const {documentId, studyOrProductService} = values;
    const documentDetails = JSON.parse(localStorage.getItem("FormDataRegister") || "{}");
    setFlow({name: studyOrProductService})
   

    if (studyOrProductService === NON_MERCK) {
      const documentDetails = JSON.parse(localStorage.getItem("FormDataRegister") || "{}");// Fetch document details
      if (documentDetails) {
        navigateToEditor(flow!.name === MERCK ? true : false, documentDetails);
      } else {
        notification.error({
          message: "Document Not Found",
          description: "No details found for the given Merck Study ID.",
        });
      }
     
    } else if (studyOrProductService === MERCK && documentId === documentDetails.study_number) {

      navigateToEditor(flow!.name === MERCK ? true : false, documentDetails);
     
    }else if(studyOrProductService === MERCK && documentId !== documentDetails.study_number){
      notification.error({
        message: "Document Not Found",
        description: "No details found for the given Merck Study ID.",
      });
    }

  }

const onFormChange = () => {
  
  const { studyOrProductService } = form.getFieldsValue();
  //   if (studyOrProductService ) {
      console.log('FLOW++>456', flow, studyOrProductService)
  //     setFlow({ name: studyOrProductService });
  //     // setFilteredRadioButtons(studyOrProductService);
  //   }
  if (flow?.name === MERCK) {
    const documentDetailsRaw = localStorage.getItem("FormDataRegister");
    // setFlow({ name: studyOrProductService });
    if (documentDetailsRaw) {
      try {
        const documentDetails = JSON.parse(documentDetailsRaw);
        if (documentDetails.study_number) {
          localStorage.setItem('docID', documentDetails.study_number);
        } else {
          console.warn("study_number not found in document details");
        }
      } catch (error) {
        console.error("Error parsing FormDataRegister:", error);
      }
    } else {
      console.warn("No FormDataRegister found in localStorage");
    }
  } else if (flow?.name === NON_MERCK) {
    const { documentId, studyOrProductService } = form.getFieldsValue() || {};
    if (documentId) {
      localStorage.setItem('docID', documentId);
      console.log("FORMVAL", documentId);
    } else {
      console.warn("documentId is missing from form values");
    }

    if (studyOrProductService) {
      setFlow({ name: studyOrProductService });
    } else {
      console.warn("studyOrProductService is missing from form values");
    }
  }
};


  useEffect(()=>{

  },[searchId])



  return (
    <Row justify={"center"}>
      <Col xs={{ span: 25, offset: 1 }} md={{ span: 25, offset: 1 }}>
        <div>
          <Form
            form={form}
            initialValues={{ studyOrProductService: filteredRadioButtons[0].value }}
            className="formWrapper"
            onChange={onFormChange}
            onFinish={onFinish}
          >
            <div className="confirmationLabel">
              <Text>
                <span style={{ marginRight: "1rem" }}>
                  <CopyOutlined />
                </span>
                1.Select Your study or product service
              </Text>
            </div>
            <Form.Item name="studyOrProductService">
              <Radio.Group
                style={{ display: "flex", justifyContent: "center" }}
                options={filteredRadioButtons}
                className="radioGroupHorizontal"
              />
            </Form.Item>
            <Form.Item name="documentId" className="documentIdLabel" >
              <div>
                <Text>
                  <span style={{marginRight:'1rem'}}>
                    <SearchOutlined />
                  </span>
                  2. Search for a document from the clinical Reference Data
                  Repositary Using.
                  <span style={{ textDecoration: "underline" }}>{text}</span>
                </Text>
                <Row  gutter={2} justify="start" align="middle">
                  <Flex className="inputWrapper">
                    <Input className="searchInput" value={searchId} prefix={<SearchOutlined/>} placeholder={"Search For " + text} />
                    <Button
                      type="primary"
                      htmlType="submit"
                      shape="round"
                      style={{ backgroundColor: "rgba(102,182,176)" }}
                    >
                      Submit
                    </Button>
                  </Flex>
                </Row>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};
export default FormInput;
