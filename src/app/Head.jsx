import { Layout, Typography, Space, Select } from "@douyinfe/semi-ui";

const { Title } = Typography;
const { Option } = Select;

const Head = ({title = ''}) => {
  return (
    <Layout.Header
      style={{
        display: "flex",
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "center",
        width: "100vw",
        boxSizing: "border-box",
        height: 50,
        padding: 10
      }}
    >
      <Space style={{ display: "flex", flexDirection: "column", alignItems: 'flex-start' }} spacing={3}>
        <Title heading={5}>
          {title}
        </Title>
      </Space>
      <Select defaultValue={1}>
          <Option value={1}>钱包1</Option>
          <Option value={2}>钱包2</Option>
          <Option value={3}>钱包3</Option>
      </Select>
    </Layout.Header>
  );
};

export default Head;
