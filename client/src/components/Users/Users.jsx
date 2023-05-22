import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Users.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, selectAllUsers } from "../../redux/features/usersSlice";
import validation from "../CreateUser/validation";

const Users = () => {
  //const [ initialServerData, setInitialServerData ] = useState([])

  const dispatch = useDispatch();

  const users = useSelector(selectAllUsers);

  const [serverResponse, setServerResponse] = useState(true);
  const [userSelectToEdit, setUserSelectToEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [serverResponse]); // eslint-disable-next-line react-hooks/exhaustive-deps
  //
  const [editUser, setEditUser] = useState({
    fullName: "",
    email: "",
    phone: "",
    isMonitor: "",
    //isAdmin: '',
    statusMembershipIdStatus: "",
  });

  const [errors, setErrors] = useState({
    fullName: "",
    password: "",
    email: "",
    phone: "",
    disabled: false,
    edit: "",
  });

  //Emergent window state
  const [windowVisible, setWindowVisible] = useState(false);

  const openWindowVisible = (event) => {
    const id = event.target.name;
    setWindowVisible(true);

    setUserSelectToEdit(id);
  };

  const closeWindowVisible = () => {
    setWindowVisible(false);
  };

  //Mapping server response by Select All Users
  
  const mappedUsers =
    users &&  
    users.user?.map((user) => {
      return {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        isMonitor: user.isMonitor,
        isAdmin: user.isAdmin,
        statusMembershipIdStatus: user.statusMemberShipIdStatus,
      };
    })  

  console.log('usuarios desde FetchInit:',users);
  console.log('usuariosMapeados:',mappedUsers);

  //Delete user
  const removeUserHandler = async (event) => {
    const id = event.target.name;

    let text =
      "Esta accion no se podra revertir!\nPulse OK para Aceptar o Cancelar.";
    if (window.confirm(text) === true) {
      await fetch("https://musclelabii.onrender.com/users/delete/" + id, {
        method: "DELETE",
      })
        .then((response) => setServerResponse(response))
        .catch((error) => setServerResponse(error));

      alert("Borrado con exito!");
    } else {
      alert("Cancelado por el usuario");
    }
  };

  const handleChange = (event) => {
    const { id, value } = event.target;

    setEditUser({ ...editUser, [id]: value });

    setErrors(validation({ ...editUser, [id]: value }));
  };

  const editUserHandler = (event) => {
    let text = "Confirmar cambios!! \nPulse OK o Cancelar.";

    if (window.confirm(text) === true) {
      fetch(
        `https://musclelabii.onrender.com/users/update/${userSelectToEdit}`,
        {
          method: "PUT",
          body: JSON.stringify(editUser),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      )
        .then((response) => setServerResponse(response))
        .catch((error) => setServerResponse(error));
    } else {
      alert("Cancelado por el usuario");
    }
    if (serverResponse.response) alert("Accion completada con exito!");
    if (serverResponse.error) alert("Algo salio mal, intente nuevamente");
  };

  const userFiltered = mappedUsers?.filter(
    (user) => user.id === userSelectToEdit
  );
  console.log("userselect", userSelectToEdit);
  console.log("respuesta fetch editar", serverResponse.error);

  return (
    <div className={styles.container}>

        <h2 class={styles.title}>Formulario de Usuarios</h2>


      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>.</th>
            <th className={styles.th}>Nombre:</th>
            <th className={styles.th}>Email:</th>
            <th className={styles.th}>Teléfono:</th>
            <th className={styles.th}>Rol:</th>
            <th className={styles.th}>status Membresia:</th>
            <th className={styles.th}>
              Acciones: <span className={styles.crud1}>CR</span>
              <span className={styles.crud2}>U</span>
              <span className={styles.crud3}>D</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {!mappedUsers?.length ? (
            <div className={styles.empty}>
              <p>Upss! No hay usuarios para mostrar!</p>
              <p className={styles.loading}>Loading...</p>
            </div>
          ) : (
            mappedUsers.map((user, index) => (
              <tr key={user.id}>
                <td className={styles.td}>{index + 1}</td>
                <td className={styles.td}>{user.fullName}</td>
                <td className={styles.td}>{user.email}</td>
                <td className={styles.td}>{user.phone}</td>
                <td className={styles.td}>
                  {user.isMonitor ? "Entrenador" : "Deportista"}
                </td>
                <td className={styles.td}>
                  {user.statusMemberShipIdStatus ? "Activo" : "Inactivo"}
                </td>
                <td className={styles.btnCrud}>
                  <button
                    className={styles.btnEditarUsuario}
                    name={user.id}
                    onClick={openWindowVisible}
                  >
                    Editar
                  </button>
                  <button
                    class={styles.btnEliminarUsuario}
                    name={user.id}
                    onClick={removeUserHandler}
                  >
                    Borrar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div>
        <Link to={"crear"}>
          <button className={styles.btnCrearUsuario}>Crear nuevo</button>
        </Link>
      </div>

      {/* Emergent window for user edition */}

      {windowVisible && (
        <div>
          <div className={styles.BigBigContainer}></div>
        <div className={styles.ventanaEmergente}>
          {userFiltered.map((user, index) => (
            <div className={styles.contenido} key={index}>
              {/*Filtrar Nombre de usuario con filter*/}
              <h2 className={styles.title1}>
                 {user.fullName}
              </h2>

              <form onSubmit={(e) => editUserHandler(e)}>
                <label htmlFor="fullName">Nombre: </label>
                <p className={styles.error}>{errors.edit && errors.fullName}</p>
                <input
                  type="text"
                  id="fullName"
                  autoComplete="off"
                  placeholder="*Nombre completo"
                  value={editUser.fullName}
                  onChange={(e) => handleChange(e)}
                  className={styles.input}
                />
                <label className={styles.label} htmlFor="password">
                  Password:{" "}
                </label>
                <p className={styles.error}>{errors.edit && errors.password}</p>

                <input
                  type="password"
                  id="password"
                  autoComplete="off"
                  placeholder="Password"
                  value={editUser.password}
                  onChange={(e) => handleChange(e)}
                  className={styles.input}
                />
                <label htmlFor="email">Email:</label>
                <p className={styles.error}>{errors.edit && errors.email}</p>
                <input
                  type="email"
                  id="email"
                  autoComplete="off"
                  name="email"
                  placeholder="*Correo electronico"
                  value={editUser.email}
                  onChange={(e) => handleChange(e)}
                  className={styles.input}
                />

                <label htmlFor="phone">Telefono:</label>
                <p className={styles.error}>{errors.edit && errors.phone}</p>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="*Telefono: XXXXXXXXXX "
                  value={editUser.phone}
                  onChange={(e) => handleChange(e)}
                  className={styles.input}
                />

                {/* <label htmlFor="status">Status:</label>
              <input
                type="text"
                id="status"
                name="status"
                placeholder="*Status digite 'yes' para activacion"
                value={editUser.statusMembershipIdStatus}
                onChange={(e)=>handleChange(e)}
                className={styles.input}
              /> */}
                {errors.edit ? (
                  <p className={styles.errorForm}>
                    ⚠️ Revisar el formato de los inputs antes de enviar! ⚠️
                  </p>
                ) : (
                  <p className={styles.validForm}>
                    Actualizar datos de usuario! ✔️
                  </p>
                )}
                <button
                  className={styles.save}
                  type="submit"
                  onClick={editUserHandler}
                >
                  Guardar
                </button>
              </form>
              <button className={styles.close} onClick={closeWindowVisible}>
                Cerrar
              </button>
            </div>
          ))}
        </div>  
        </div>
      )}
    </div>
  );
};

export default Users;