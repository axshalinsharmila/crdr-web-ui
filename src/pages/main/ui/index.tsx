import { CSSProperties, useContext } from "react";
import { Layout, Flex, Typography } from "antd";
import FormInput from "../../../widgets/homeForm/ui/homePageForm";

const titleStyles: CSSProperties={
    fontSize:'32px',
    fontWeight:700,
    lineHeight:'43px',
    color:'#fff'
};
const descriptionStyles:CSSProperties={
    fontSize:'20px',
    fontWeight:400,
    lineHeight:'27px',
    maxWidth:'664px',
    color:'#fff',
    textAlign:'center'

}

const headerStyles:CSSProperties={
    height:'250px',
    background:'#668680'
}

export function MainPage(){
    return(
        <>
        <Layout.Content>
            <Flex style={headerStyles} justify="center" align="center" vertical>
                <Typography.Title style={titleStyles}>CRDR Document Search</Typography.Title>
                <Typography.Text style={descriptionStyles}>
                    Enchace Tour Efficiency: Seamlessly Edit Documents in the Clinical Reference Data Repositary with REDS Document ID
                </Typography.Text>
            </Flex>
            <FormInput/>
        </Layout.Content>
        </>
    )
}