import { useSearchParams } from "react-router-dom";
import { Typography , Flex} from "antd"

export function ErrorPage(){
    const [params] = useSearchParams();
    return (
        <div>
        <Flex justify="center ">
            <Typography.Title>{params.get('errorcode') || ''}</Typography.Title>
        </Flex>
        <Flex justify="center">
            <Typography.Paragraph>{params.get('errorDescription') || ''}</Typography.Paragraph>
        </Flex>
        </div>
    )
}