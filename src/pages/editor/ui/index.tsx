import { Button, Col, Divider, Flex, Layout, Row, Typography, notification } from "antd";
import { useNavigate, useOutletContext } from "react-router-dom";
// import { PATHS } from "../../../app/router";
// import { Flow, MERK, useFlow } from "../../../entities/flow/model";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { PATHS } from "../../../app/router";
import { useFlow } from "../../../entities/flow/model";
import EditorForm from "../../../entities/record/ui";

type NotificationInstance = ReturnType<typeof notification.useNotification>[0]


// const CRDR = 'CRDR Web UI';
// const DIAL = 'DIAL';
// const REDS = 'REDS'

export const Editor = ()=>{
    const navigate = useNavigate();
    // const {notification} =useOutletContext<{notification : NotificationInstance}>()
    const docIDnum = localStorage.getItem('docID')
    const docId = docIDnum || 'New';
    // const [Flow] = useFlow() as []
   const clearAll = ()=>{

   }
   
    const handleClick = ()=>{
        clearAll();
navigate(PATHS.MAIN, {replace:false})
    }




    return (
        <div>
            <Layout.Content>
                <Row>
                    <Flex flex={1} justify="center">
                        <Col span={16} style={{marginTop : "64px"}}>
                        <Flex justify="space-between">
                            <Button type="text" onClick={handleClick}>
                                <ArrowLeftOutlined/> Back to Home
                            </Button>
                            <div style={{textDecoration:"underline", textAlign:"right", padding:"8px"}}>
Document ID : {docId || 'Not Found'}
                            </div>
                        </Flex>
                        <div style={{background:"#FBFBFB", border:"1px solid #C6C6C6", padding:"24px 48px"}}>
                            <Typography.Title style={{textAlign:"center"}} level={3}>
                                Document Fields
                            </Typography.Title>
                            <Divider/>
                            <Row>
                                <Flex flex={5} justify="center">
                                    <Col span={24}>
                                        <EditorForm/>
                                    </Col>
                                </Flex>
                            </Row>
                        </div>
                        </Col>
                    </Flex>
                </Row>
            </Layout.Content>
        </div>

    )
}