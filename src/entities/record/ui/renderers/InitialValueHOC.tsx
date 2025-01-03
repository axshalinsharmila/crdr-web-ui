import { ArrowDownOutlined } from "@ant-design/icons";
import { Flex, Input } from "antd";

type InitialValuesProps = {
    value:string,
    revertValue: ()=>void,
}

export const InitialValue = (props:InitialValuesProps)=>{
    const {value, revertValue} = props
    if(!value) return null;
    return(
        <Flex vertical={true}>
            <Flex>
                <Input 
                value={value}/>

            </Flex>
            <div>
<ArrowDownOutlined onClick={revertValue}/>
            </div>
        </Flex>
    )
}