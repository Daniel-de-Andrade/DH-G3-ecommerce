import React, { useState, useEffect } from "react";
import api from "../../../../services/api";
import ModalAtualizar from "../../../../components/modals/AtualizarUsuario";
import ModalDeletar from "../../../../components/modals/DeletarUsuario";
import { getToken } from "../../../../helpers/session";
import "./style.css";
import "../../../../index.css";

const List = () => {
  const [isModalAtualizarVisible, setIsModalAtualizarVisible] = useState(false);
  const [isModalDeletarVisible, setIsModalDeletarVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [usuarios, setUsuarios] = useState([]);

  const openModalAtualizar = (
    id,
    primeiro_nome,
    sobrenome,
    email,
    senha,
    cpf,
    aniversario,
    id_regra
  ) => {
    setIsModalAtualizarVisible(true);
    setSelectedUser({
      id,
      primeiro_nome,
      sobrenome,
      email,
      senha,
      cpf,
      aniversario,
      id_regra,
    });
  };
  const openModalDeletar = (id, primeiro_nome) => {
    setIsModalDeletarVisible(true);
    setSelectedUser({ id, primeiro_nome });
  };

  const getDataUsers = async () => {
    try {
      const response = await api.get("/usuarios");
      console.log(response);
      setUsuarios(response.data.usuarios);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    // fetch("/produtos")
    //   .then((res) => res.json())
    //   .then((res) => setData(res));

    // axios
    //   .get("/produtos")
    //   .then((res) => setData(res.data))
    //   .catch((error) => console.log(error));
    getDataUsers();
  }, []);

  const handleDeleteSuccess = () => {
    setIsModalDeletarVisible(false);
    getDataUsers();
  };
  const handleUpdateSuccess = () => {
    setIsModalAtualizarVisible(false);
    getDataUsers();
  };
  return (
    <section className="container-users-list">
      {isModalAtualizarVisible ? (
        <ModalAtualizar
          usuarios={selectedUser}
          handleSuccess={handleUpdateSuccess}
        />
      ) : null}
      {isModalDeletarVisible ? (
        <ModalDeletar
          usuarios={selectedUser}
          handleSuccess={handleDeleteSuccess}
        />
      ) : null}
      <div className="header-section-list">
        <i className="list-icon fas fa-list-alt fa-2x" />
        <h1 className="title">Lista de Usuários</h1>
      </div>
      <div className="container__users-table">
        <table className="table-striped users__table">
          <thead>
            <tr className="colunas">
              <th className="user__id" scope="col">
                ID
              </th>
              <th className="user__name" scope="col">
                Nome
              </th>
              <th className="user__lastname" scope="col">
                Sobrenome
              </th>
              <th className="user__email" scope="col">
                Email
              </th>
              <th className="user__pass" scope="col">
                Senha
              </th>
              <th className="user__cpf" scope="col">
                CPF
              </th>
              <th className="user__aniversario" scope="col">
                Aniversário
              </th>
              {/* <th className="user__id_endereco" scope="col">Id_Endereço</th> */}
              <th className="user__id_regra" scope="col">
                Id_Regra
              </th>
              <th className="user__btn_view" scope="col">
                Ver
              </th>
              <th className="user__btn_update" scope="col">
                Editar
              </th>
              <th className="user__btn_delete" scope="col">
                Excluir
              </th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario, idx) => (
              <tr className="colunas" key={idx} id={`user${usuario.id}`}>
                <td className="user__id" data-title="ID" scope="row">
                  {usuario.id}
                </td>
                <td className="user__name" data-title="Nome" scope="row">
                  {usuario.primeiro_nome}
                </td>
                <td
                  className="user__lastname"
                  data-title="Sobrenome"
                  scope="row"
                >
                  {usuario.sobrenome}
                </td>
                <td className="user__email" data-title="Email" scope="row">
                  {usuario.email}
                </td>
                <td className="user__pass" data-title="Senha" scope="row">
                  {usuario.senha}
                </td>
                <td className="user__cpf" data-title="cpf" scope="row">
                  {usuario.cpf}
                </td>
                <td
                  className="user__aniversario"
                  data-title="aniversario"
                  scope="row"
                >
                  {usuario.aniversario}
                </td>
                {/* <td className="user__id_endereco" data-title="id_endereco" scope="row">
                  {usuario.id_endereco}
                </td> */}
                <td
                  className="user__id_regra"
                  data-title="id_regra"
                  scope="row"
                >
                  {usuario.id_regra}
                </td>
                <td className="user__btn_view">
                  <div className="btn-wrapper">
                    <button className="btn-view">
                      <i class="fas fa-eye"></i>
                    </button>
                  </div>
                </td>
                <td className="user__btn_update">
                  <div className="btn-wrapper">
                    <button
                      onClick={() =>
                        openModalAtualizar(
                          `${usuario.id}`,
                          `${usuario.primeiro_nome}`,
                          `${usuario.sobrenome}`,
                          `${usuario.email}`,
                          `${usuario.senha}`,
                          `${usuario.cpf}`,
                          // `${usuario.id_endereco}`,
                          `${usuario.id_regra}`
                        )
                      }
                      type="btn"
                      className="btn-update"
                    >
                      <i class="fas fa-sync"></i>
                    </button>
                  </div>
                </td>
                <td className="user__btn_delete">
                  <div className="btn-wrapper">
                    <button
                      onClick={() =>
                        openModalDeletar(
                          `${usuario.id}`,
                          `${usuario.primeiro_nome}`
                        )
                      }
                      type="btn"
                      className="btn-delete"
                    >
                      <i class="far fa-trash-alt"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};
export default List;
