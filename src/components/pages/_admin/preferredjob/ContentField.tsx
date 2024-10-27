import { FunctionField } from 'react-admin';

interface Order {
    id: string;
    content: string;
}

const render = (record?: Order) => record && <div dangerouslySetInnerHTML={{__html: record.content}} />;

const ContentField = () => <FunctionField<Order> render={render} />;

ContentField.defaultProps = {
    label: 'Content',
    textAlign: 'left',
};

export default ContentField;