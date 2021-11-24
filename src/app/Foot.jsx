import {
  IconUserCircle,
  IconTopbuzzLogo,
  IconBold,
  IconShield,
  IconGallery,
} from "@douyinfe/semi-icons";
import { Layout, Nav } from "@douyinfe/semi-ui";

const Foot = () => {
  console.log(window.location);
  const {origin, pathname} = window.location

  return (
    <Layout.Footer style={{ height: 60 }}>
      <Nav mode="horizontal" defaultSelectedKeys={"hero"}>
        <Nav.Item link={origin+pathname+'#/bnxapp'} itemKey="hero" icon={<IconUserCircle />} />
        <Nav.Item link={origin+pathname+'#/bnxapp/equipment'} itemKey="equipment" icon={<IconTopbuzzLogo />} />
        <Nav.Item link={origin+pathname+'#/bnxapp/adventure'} itemKey="adventure" icon={<IconShield />} />
        <Nav.Item link={origin+pathname+'#/bnxapp/gold'} itemKey="gold" icon={<IconBold />} />
        <Nav.Item link={origin+pathname+'#/bnxapp/card'} itemKey="card" icon={<IconGallery />} />
      </Nav>
    </Layout.Footer>
  );
};

export default Foot;
