import { Outlet, NavLink } from "react-router-dom";
import styles from "./styles/Menu.module.scss";

type menuStructureType = {
  id: number;
  target: string;
  text: string;
};

const Menu = () => {
  const menuStrucutre: menuStructureType[] = [
    {
      id: 0,
      target: "/",
      text: "Home",
    },
    {
      id: 1,
      target: "profile/SEkyqNajL0Yvp9AATRZI",
      text: "Profile 1",
    },
    {
      id: 2,
      target: "profile/8pVS1cDjBszgEUE0aug8",
      text: "Profile 2",
    },
  ];

  return (
    <>
      <nav className={styles.menu}>
        <ul className={styles.list}>
          {menuStrucutre.map((item) => (
            <li key={item.id} className={styles.item}>
              <NavLink
                to={item.target}
                className={({ isActive }) =>
                  isActive
                    ? `${styles.active} ${styles.link}`
                    : `${styles.link}`
                }
              >
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Menu;
