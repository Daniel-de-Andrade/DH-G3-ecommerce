import React from "react";
import List from "../../../components/dashboards/usuarios/List";
import MenuLateral from "../../../components/Navbar/MenuLateralDashboard";
import Admin from "../../templates/Admin";
import "./style.css"

const ListarUsuario = () => {

  return (
    <div className="container-list">
      <MenuLateral />
        <List />
    </div>
  );
};

const template = () => (
  <Admin>
    <ListarUsuario />
  </Admin>
);
export default template;
