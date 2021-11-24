import { Layout } from "@douyinfe/semi-ui";
import Foot from "./Foot";
import Head from "./Head";
import PriceBanner from "./PriceBanner";
const { Content } = Layout;
const BnxApp = ({ title,children }) => {
  document.body.setAttribute("theme-mode", "dark");
  return (
    <Layout style={{display: 'flex', flexDirection: 'column', height: '100vh'}}>
      <Head title={title}/>
      <PriceBanner />
      <Content style={{ flex: 1, height: '100%' }}>{children}</Content>
      <Foot />
    </Layout>
  );
};

export default BnxApp;
