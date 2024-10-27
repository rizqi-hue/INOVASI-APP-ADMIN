import Box from "@mui/material/Box";
import inflection from "inflection";
import { useState } from "react";
import {
  MenuItemLink,
  MenuProps,
  useGetList,
  usePermissions,
  useResourceDefinitions,
  useSidebarState,
  useTranslate
} from "react-admin";

import { AccountCircleOutlined, AdjustOutlined, ArticleOutlined, AssessmentOutlined, BookOnlineOutlined, BuildCircleOutlined, DashboardOutlined, ImageOutlined, InfoOutlined, MessageOutlined, NewspaperOutlined, SettingsOutlined, WorkHistoryOutlined } from "@mui/icons-material";
import SubMenu from "./SubMenu";

const translatedResourceName = (
  resource: { name: any; options: { label: any } },
  translate: (arg0: string, arg1: { smart_count: number; _: any }) => any
) =>
  translate(`resources.${resource.name}.name`, {
    smart_count: 2,
    _:
      resource.options && resource.options.label
        ? translate(resource.options.label, {
          smart_count: 2,
          _: resource.options.label,
        })
        : inflection.humanize(inflection.pluralize(resource.name)),
  });

type MenuName =
  | "menuHome"
  | "menuGallery"
  | "menuInovation"
  | "menuUser"
  | "menuInformation"
  | "menuProfile"
  | "menuSetting"
  | "menuForumKomunikasi"
  | "menuKelitbangan";

// const UseGetMenu = (filterValues: any) => {

//   const { data: referensi } = useGetList("admin/menu", {
//     pagination: { perPage: 500, page: 1 },
//     sort: { field: "id", order: "ASC" },
//     filter: { ...filterValues },
//   });

//   return {
//     menu: referensi,
//   };
// };


const Menu = ({ dense = false }: MenuProps) => {
  // const { menu } = UseGetMenu({});
  const { permissions } = usePermissions();
  const resourcesDefinitions = useResourceDefinitions();
  const resources = Object.keys(resourcesDefinitions).map(
    (name) => resourcesDefinitions[name]
  );
  const [state, setState] = useState({
    menuHome: true,
    menuGallery: false,
    menuInovation: false,
    menuUser: false,
    menuInformation: false,
    menuProfile: false,
    menuKelitbangan: false,
    menuSetting: false,
    menuForumKomunikasi: false,
  });

  const translate = useTranslate();
  const [open] = useSidebarState();

  const handleToggle = (menu: MenuName) => {
    setState((state) => ({ ...state, [menu]: !state[menu] }));
  };

  console.log(permissions)

  return (
    <Box
      sx={{
        width: open ? 240 : 50,
        // marginTop: 1,
        // marginBottom: 1,
        transition: (theme) =>
          theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
      }}>
      {/* <DashboardMenuItem /> */}



      {permissions ? (
        permissions.includes("Admin") ? (
          <>
            <SubMenu
              handleToggle={() => handleToggle("menuHome")}
              isOpen={state["menuHome"]}
              name="pos.menu.home"
              icon={<DashboardOutlined />}
              dense={dense}
            >
              <MenuItemLink
                to="admin/dashboard"
                state={{ _scrollToTop: true }}
                primaryText={"Dashboard"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
              <MenuItemLink
                to="admin/user_profile"
                state={{ _scrollToTop: true }}
                primaryText={"Profile"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
            </SubMenu>

            <SubMenu
              handleToggle={() => handleToggle("menuGallery")}
              isOpen={state.menuGallery}
              name="Gallery"
              icon={<ImageOutlined />}
              dense={dense}
            >
              <MenuItemLink
                to="admin/slider"
                state={{ _scrollToTop: true }}
                primaryText={"Slider"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
              <MenuItemLink
                to="admin/gallery/image"
                state={{ _scrollToTop: true }}
                primaryText={"Gambar"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
              <MenuItemLink
                to="admin/gallery/video"
                state={{ _scrollToTop: true }}
                primaryText={"Video"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
            </SubMenu>

            <MenuItemLink
              to="admin/perpustakaan"
              state={{ _scrollToTop: true }}
              primaryText={"Perpustakaan"}
              leftIcon={<BookOnlineOutlined />}
              dense={dense}
            />

            {/* <SubMenu
              handleToggle={() => handleToggle("menuProfile")}
              isOpen={state.menuProfile}
              name="Profile"
              icon={<ArticleOutlined />}
              dense={dense}
            >
              <MenuItemLink
                to="admin/profile/definisi"
                state={{ _scrollToTop: true }}
                primaryText={"Definisi"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
              <MenuItemLink
                to="admin/profile/selayang_pandang"
                state={{ _scrollToTop: true }}
                primaryText={"Selayang Pandang"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
              <MenuItemLink
                to="admin/profile/struktur_organisasi"
                state={{ _scrollToTop: true }}
                primaryText={"Struktur Organisasi"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
            </SubMenu> */}

            <SubMenu
              handleToggle={() => handleToggle("menuInovation")}
              isOpen={state.menuInovation}
              name="Inovation"
              icon={<InfoOutlined />}
              dense={dense}
            >

              <MenuItemLink
                to="admin/inovation/pemerintah"
                state={{ _scrollToTop: true }}
                primaryText={"Inovasi"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />

            </SubMenu>

            <SubMenu
              handleToggle={() => handleToggle("menuInformation")}
              isOpen={state.menuInformation}
              name="Informasi"
              icon={<NewspaperOutlined />}
              dense={dense}
            >
              <MenuItemLink
                to="admin/information/regulasi"
                state={{ _scrollToTop: true }}
                primaryText={"Regulasi"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
              <MenuItemLink
                to="admin/information/sop"
                state={{ _scrollToTop: true }}
                primaryText={"SOP"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
              <MenuItemLink
                to="admin/information/rinduk"
                state={{ _scrollToTop: true }}
                primaryText={"Rinduk"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
              <MenuItemLink
                to="admin/event/agenda"
                state={{ _scrollToTop: true }}
                primaryText={"Agenda"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
              <MenuItemLink
                to="admin/event/news"
                state={{ _scrollToTop: true }}
                primaryText={"Berita"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
            </SubMenu>

            <SubMenu
              handleToggle={() => handleToggle("menuKelitbangan")}
              isOpen={state.menuKelitbangan}
              name="Riset"
              icon={<AssessmentOutlined />}
              dense={dense}
            >
              <MenuItemLink
                to="admin/researchscope"
                state={{ _scrollToTop: true }}
                primaryText={"Ruang Lingkup"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
              <MenuItemLink
                to="admin/researchresult"
                state={{ _scrollToTop: true }}
                primaryText={"Hasil Penelitian"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
              <MenuItemLink
                to="admin/indeces"
                state={{ _scrollToTop: true }}
                primaryText={"Data Index"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
              {/* <MenuItemLink
                to="admin/indecesdetail"
                state={{ _scrollToTop: true }}
                primaryText={"Data Index Detail"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              /> */}
            </SubMenu>

            <SubMenu
              handleToggle={() => handleToggle("menuForumKomunikasi")}
              isOpen={state.menuForumKomunikasi}
              name="Forum Komunikasi"
              icon={<WorkHistoryOutlined />}
              dense={dense}
            >
              <MenuItemLink
                to="admin/usulanpenelitian"
                state={{ _scrollToTop: true }}
                primaryText={"Usulan Penelitian"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
              <MenuItemLink
                to="admin/usulaninovasi"
                state={{ _scrollToTop: true }}
                primaryText={"Usulan Inovasi"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
            </SubMenu>

            <SubMenu
              handleToggle={() => handleToggle("menuUser")}
              isOpen={state.menuUser}
              name="pos.menu.user"
              icon={<AccountCircleOutlined />}
              dense={dense}
            >
              <MenuItemLink
                to="admin/users"
                state={{ _scrollToTop: true }}
                primaryText={"User"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
              {/* <MenuItemLink
                to="admin/privilege"
                state={{ _scrollToTop: true }}
                primaryText={"User Akses"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              /> */}
            </SubMenu>

            <MenuItemLink
              to="admin/message"
              state={{ _scrollToTop: true }}
              primaryText={"Pesan"}
              leftIcon={<MessageOutlined />}
              dense={dense}
            />

            <SubMenu
              handleToggle={() => handleToggle("menuSetting")}
              isOpen={state.menuSetting}
              name="pos.menu.setting"
              icon={<SettingsOutlined />}
              dense={dense}
            >
              <MenuItemLink
                to="admin/menu"
                state={{ _scrollToTop: true }}
                primaryText={"Menu"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
              <MenuItemLink
                to="admin/referensi"
                state={{ _scrollToTop: true }}
                primaryText={"Referensi"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
              <MenuItemLink
                to="admin/footer"
                state={{ _scrollToTop: true }}
                primaryText={"Footer"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
              <MenuItemLink
                to="admin/logo"
                state={{ _scrollToTop: true }}
                primaryText={"Logo"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
            </SubMenu>

          </>
        ) : null
      ) : null}

      {/* {permissions ? (
        permissions.includes("Dinas") ? (
          <>
            <SubMenu
              handleToggle={() => handleToggle("menuHome")}
              isOpen={state["menuHome"]}
              name="pos.menu.home"
              icon={<DashboardOutlined />}
              dense={dense}
            >
              <MenuItemLink
                to="admin/dashboard"
                state={{ _scrollToTop: true }}
                primaryText={"Dashboard"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
              <MenuItemLink
                to="admin/user_profile"
                state={{ _scrollToTop: true }}
                primaryText={"Profile"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
            </SubMenu>


            <SubMenu
              handleToggle={() => handleToggle("menuInovation")}
              isOpen={state.menuInovation}
              name="Inovation"
              icon={<InfoOutlined />}
              dense={dense}
            >

              <MenuItemLink
                to="admin/inovation/pemerintah"
                state={{ _scrollToTop: true }}
                primaryText={"Inovasi"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />

            </SubMenu>

            {/* <SubMenu
              handleToggle={() => handleToggle("menuKelitbangan")}
              isOpen={state.menuKelitbangan}
              name="Kelitbangan"
              icon={<AssessmentOutlined />}
              dense={dense}
            >
              <MenuItemLink
                to="admin/researchresult"
                state={{ _scrollToTop: true }}
                primaryText={"Hasil Penelitian"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
            </SubMenu>

          </>
        ) : null
      ) : null}


      {permissions ? (
        permissions.includes("Kabid") ? (
          <>

            <SubMenu
              handleToggle={() => handleToggle("menuHome")}
              isOpen={state["menuHome"]}
              name="pos.menu.home"
              icon={<DashboardOutlined />}
              dense={dense}
            >
              <MenuItemLink
                to="admin/dashboard"
                state={{ _scrollToTop: true }}
                primaryText={"Dashboard"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
              <MenuItemLink
                to="admin/user_profile"
                state={{ _scrollToTop: true }}
                primaryText={"Profile"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
            </SubMenu>


            <MenuItemLink
              to="admin/perpustakaan"
              state={{ _scrollToTop: true }}
              primaryText={"Perpustakaan"}
              leftIcon={<BookOnlineOutlined />}
              dense={dense}
            />


            <SubMenu
              handleToggle={() => handleToggle("menuKelitbangan")}
              isOpen={state.menuKelitbangan}
              name="Kelitbangan"
              icon={<AssessmentOutlined />}
              dense={dense}
            >
              <MenuItemLink
                to="admin/researchresult"
                state={{ _scrollToTop: true }}
                primaryText={"Hasil Penelitian"}
                leftIcon={<AdjustOutlined />}
                dense={dense}
              />
            </SubMenu>

          </>
        ) : null
      ) : null} */}
    </Box>
  );
};

export default Menu;
