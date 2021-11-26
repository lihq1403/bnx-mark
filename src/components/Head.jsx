import {
  IconMoon,
  IconGallery,
  IconSimilarity,
  IconUserCircle,
  IconBold,
  IconShield,
  IconSun,
  IconUnderline,
  IconLikeThumb,
  IconInbox,
  IconTopbuzzLogo,
  IconHelm
} from "@douyinfe/semi-icons";
import {
  Layout,
  Nav,
  Button,
  Popover,
  Typography,
  Dropdown,
} from "@douyinfe/semi-ui";
import { useState } from "react";
import { Link } from "react-router-dom";
import { isMobile } from "../utils/util";
const { Header } = Layout;
const Head = ({ menu, light, dark, title, Language, toogleLanguage }) => {
  const body = document.body;

  const [isTheme, setTheme] = useState(body.hasAttribute("theme-mode"));

  const switchDarkTheme = () => {
    if (body.hasAttribute("theme-mode")) {
      body.removeAttribute("theme-mode");
      setTheme(false);
    } else {
      body.setAttribute("theme-mode", "dark");
      setTheme(true);
    }
  };
  return (
    <Header
      style={{
        backgroundColor: "var(--semi-color-bg-1)",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 99,
      }}
    >
      <div>
        <Nav mode="horizontal" defaultSelectedKeys={["Home"]}>
          <Nav.Header>
            <IconSimilarity
              style={{
                fontSize: isMobile() ? 24 : 36,
                color: "var(--semi-color-text-0)",
              }}
            />
            {isMobile() ? (
              ""
            ) : (
              <Typography.Title heading={4}>{title}</Typography.Title>
            )}
          </Nav.Header>
          {isMobile() ? (
            <>
              <Dropdown
                trigger="click"
                position="bottomLeft"
                render={
                  <Dropdown.Menu>
                    <Link to="/new">
                      <Dropdown.Item icon={<IconGallery />}>
                        {menu.chouka}
                      </Dropdown.Item>
                    </Link>
                    <Link to="/hero">
                      <Dropdown.Item icon={<IconUserCircle />}>
                        {menu.hero}
                      </Dropdown.Item>
                    </Link>
                    <Link to="/zhuang">
                      <Dropdown.Item icon={<IconTopbuzzLogo />}>
                        {"我的装备"}
                      </Dropdown.Item>
                    </Link>
                    <Link to="/gold">
                      <Dropdown.Item icon={<IconBold />}>
                        {menu.wankuang}
                      </Dropdown.Item>
                    </Link>
                    <Link to="/mx">
                      <Dropdown.Item icon={<IconShield />}>
                        {menu.maoxian}
                      </Dropdown.Item>
                    </Link>
                    <Link to="/low">
                      <Dropdown.Item icon={<IconUnderline />}>
                        {menu.dibanjia}
                      </Dropdown.Item>
                    </Link>
                    <Link to="/xiang">
                      <Dropdown.Item icon={<IconInbox />}>
                        {"开宝箱"}
                      </Dropdown.Item>
                    </Link>
                  </Dropdown.Menu>
                }
              >
                <Nav.Item
                  itemKey="card"
                  text={"BNX"}
                  style={{
                    color: "var(--semi-color-text-0)",
                  }}
                />
              </Dropdown>
              <Dropdown
                trigger="click"
                position="bottomLeft"
                render={
                  <Dropdown.Menu>
                    <Link to="/shou">
                      <Dropdown.Item icon={<IconLikeThumb />}>
                        {menu.Armzlegends}
                      </Dropdown.Item>
                    </Link>
                  </Dropdown.Menu>
                }
              >
                <Nav.Item
                  itemKey="card"
                  text={"手腕"}
                  style={{
                    color: "var(--semi-color-text-0)",
                  }}
                />
              </Dropdown>
              <Dropdown
                trigger="click"
                position="bottomLeft"
                render={
                  <Dropdown.Menu>
                    <Link to="/bnbh">
                      <Dropdown.Item icon={<IconHelm />}>
                        {'BNBH'}
                      </Dropdown.Item>
                    </Link>
                  </Dropdown.Menu>
                }
              >
                <Nav.Item
                  itemKey="card"
                  text={"BNBH"}
                  style={{
                    color: "var(--semi-color-text-0)",
                  }}
                />
              </Dropdown>
            </>
          ) : (
            <>
              <Popover
                arrowPointAtCenter
                showArrow
                trigger="hover"
                content={menu.chouka}
              >
                <Link to="/new">
                  <Nav.Item
                    itemKey="card"
                    text={isMobile() ? "" : menu.chouka}
                    icon={
                      <IconGallery
                        size="large"
                        style={{
                          color: "var(--semi-color-text-0)",
                        }}
                      />
                    }
                    style={{
                      color: "var(--semi-color-text-0)",
                    }}
                  />
                </Link>
              </Popover>
              <Popover
                arrowPointAtCenter
                showArrow
                trigger="hover"
                content={menu.hero}
              >
                <Link to="/hero">
                  <Nav.Item
                    itemKey="hero"
                    text={isMobile() ? "" : menu.hero}
                    icon={
                      <IconUserCircle
                        size="large"
                        style={{
                          color: "var(--semi-color-text-0)",
                        }}
                      />
                    }
                    style={{
                      color: "var(--semi-color-text-0)",
                    }}
                  />
                </Link>
              </Popover>
              <Popover
                arrowPointAtCenter
                showArrow
                trigger="hover"
                content={'我的装备'}
              >
                <Link to="/zhuang">
                  <Nav.Item
                    itemKey="hero"
                    text={isMobile() ? "" : "我的装备"}
                    icon={
                      <IconTopbuzzLogo
                        size="large"
                        style={{
                          color: "var(--semi-color-text-0)",
                        }}
                      />
                    }
                    style={{
                      color: "var(--semi-color-text-0)",
                    }}
                  />
                </Link>
              </Popover>
              <Popover
                arrowPointAtCenter
                showArrow
                trigger="hover"
                content={menu.wankuang}
              >
                <Link to="/gold">
                  <Nav.Item
                    itemKey="gold"
                    text={isMobile() ? "" : menu.wankuang}
                    icon={
                      <IconBold
                        size="large"
                        style={{
                          color: "var(--semi-color-text-0)",
                        }}
                      />
                    }
                    style={{
                      color: "var(--semi-color-text-0)",
                    }}
                  />
                </Link>
              </Popover>
              <Popover
                arrowPointAtCenter
                showArrow
                trigger="hover"
                content={menu.maoxian}
              >
                <Link to="/mx">
                  <Nav.Item
                    itemKey="mx"
                    text={isMobile() ? "" : menu.maoxian}
                    icon={
                      <IconShield
                        size="large"
                        style={{
                          color: "var(--semi-color-text-0)",
                        }}
                      />
                    }
                    style={{
                      color: "var(--semi-color-text-0)",
                    }}
                  />
                </Link>
              </Popover>
              <Popover
                arrowPointAtCenter
                showArrow
                trigger="hover"
                content={menu.dibanjia}
              >
                <Link to="/low">
                  <Nav.Item
                    itemKey="mx"
                    text={isMobile() ? "" : menu.dibanjia}
                    icon={
                      <IconUnderline
                        size="large"
                        style={{
                          color: "var(--semi-color-text-0)",
                        }}
                      />
                    }
                    style={{
                      color: "var(--semi-color-text-0)",
                    }}
                  />
                </Link>
              </Popover>
              <Popover
                arrowPointAtCenter
                showArrow
                trigger="hover"
                content={isMobile() ? "" : "开宝箱"}
              >
                <Link to="/xiang">
                  <Nav.Item
                    itemKey="xiang"
                    text={isMobile() ? "" : "开宝箱"}
                    icon={
                      <IconInbox
                        size="large"
                        style={{
                          color: "var(--semi-color-text-0)",
                        }}
                      />
                    }
                    style={{
                      color: "var(--semi-color-text-0)",
                    }}
                  />
                </Link>
              </Popover>
              <Popover
                arrowPointAtCenter
                showArrow
                trigger="hover"
                content={isMobile() ? "" : menu.Armzlegends}
              >
                <Link to="/shou">
                  <Nav.Item
                    itemKey="shou"
                    text={isMobile() ? "" : menu.Armzlegends}
                    icon={
                      <IconLikeThumb
                        size="large"
                        style={{
                          color: "var(--semi-color-text-0)",
                        }}
                      />
                    }
                    style={{
                      color: "var(--semi-color-text-0)",
                    }}
                  />
                </Link>
              </Popover>
              <Popover
                arrowPointAtCenter
                showArrow
                trigger="hover"
                content={'BNBH'}
              >
                <Link to="/bnbh">
                  <Nav.Item
                    itemKey="bnbh"
                    text={'BNBH'}
                    icon={
                      <IconHelm
                        size="large"
                        style={{
                          color: "var(--semi-color-text-0)",
                        }}
                      />
                    }
                    style={{
                      color: "var(--semi-color-text-0)",
                    }}
                  />
                </Link>
              </Popover>
            </>
          )}

          <Nav.Footer>
            <Popover
              arrowPointAtCenter
              showArrow
              content={isTheme ? light : dark}
              trigger="hover"
              style={{
                backgroundColor: isTheme ? "#FFF" : "#666",
                borderColor: isTheme ? "#FFF" : "#666",
                color: isTheme ? "#666" : "#FFF",
              }}
            >
              <Button
                theme="borderless"
                onClick={switchDarkTheme}
                icon={
                  isTheme ? <IconSun size="large" /> : <IconMoon size="large" />
                }
                style={{
                  color: "var(--semi-color-text-0)",
                  marginRight: "12px",
                }}
              />
            </Popover>
            {/* <Popover
             arrowPointAtCenter
             showArrow
             content={Language}
             trigger="hover"
             style={{
               backgroundColor: isTheme ? "#FFF" : "#666",
               borderColor: isTheme ? "#FFF" : "#666",
               color: isTheme ? "#666" : "#FFF",
             }}
           >
             <Button
               theme="borderless"
               onClick={toogleLanguage(Language === '中文' ? 'zh_CN' : 'en_US')}
               icon={<IconLanguage size="large" />}
               style={{
                 color: "var(--semi-color-text-0)",
                 marginRight: "12px",
               }}
             />
           </Popover> */}
          </Nav.Footer>
        </Nav>
      </div>
    </Header>
  );
};

export default Head;
