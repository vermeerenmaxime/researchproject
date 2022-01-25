import router from "next/router";
import { Main } from "./Main";
import { MenuLink } from "./menu/Link";
import { Menu } from "./menu/Menu";

export const Layout = ({ children }: any) => {
  return (
    <>
      <Main>
        <Menu>
          <h1 className="text-xl px-8 py-8 font-semibold ">Ethereal</h1>
          <div className="grid ">
            <MenuLink onClick={()=>router.push("/")}>Home</MenuLink>
            <MenuLink onClick={()=>router.push("/editor")}>Editor</MenuLink>
            <MenuLink onClick={()=>router.push("/video")}>Videos</MenuLink>
            <MenuLink onClick={()=>router.push("/about")}>About</MenuLink>
          </div>
        </Menu>
        {children}
      </Main>
    </>
  );
};
