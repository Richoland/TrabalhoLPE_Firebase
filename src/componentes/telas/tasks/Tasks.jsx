import { useState, useEffect } from "react";
import TasksContext from "./TasksContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { auth } from "../../../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  deleteTaskFirebase,
  addTaskFirebase,
  updateTaskFirebase,
  getTasksUIDFirebase,
} from "../../servicos/TasksService";
import { Navigate } from "react-router-dom";

function Tasks() {
  const [user, loading, error] = useAuthState(auth);

  const [alerta, setAlerta] = useState({ status: "", message: "" });
  const [listaObjetos, setListaObjetos] = useState([]);
  const [editar, setEditar] = useState(false);
  const [objeto, setObjeto] = useState({
    id: "",
    titulo: "",
    texto: "",
    uid: user?.uid,
    usuario: user?.displayName,
    prazo: "",
  });
  const [carregando, setCarregando] = useState(true);
  const [abreDialogo, setAbreDialogo] = useState(false);

  const novoObjeto = () => {
    setEditar(false);
    setAlerta({ status: "", message: "" });
    setObjeto({
      id: "",
      titulo: "",
      texto: "",
      uid: user?.uid,
      usuario: user?.displayName,
      prazo: "",
    });
    setAbreDialogo(true);
  };

  const editarObjeto = async (objeto) => {
    setObjeto(objeto);
    setAbreDialogo(true);
    setEditar(true);
    setAlerta({ status: "", message: "" });
  };

  const acaoCadastrar = async (e) => {
    e.preventDefault();
    if (editar) {
      try {
        await updateTaskFirebase(objeto);
        setAlerta({
          status: "success",
          message: "Task atualizada com sucesso",
        });
      } catch (err) {
        setAlerta({
          status: "error",
          message: "Erro ao atualizar a Task:" + err,
        });
      }
    } else {
      // nova
      try {
        setObjeto(await addTaskFirebase(objeto));
        setEditar(true);
        setAlerta({ status: "success", message: "Task criada com sucesso" });
      } catch (err) {
        setAlerta({ status: "error", message: "Erro ao criar a Task:" + err });
      }
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setObjeto({ ...objeto, [name]: value });
  };

  const remover = async (objeto) => {
    if (window.confirm("Remover esta Task?")) {
      try {
        deleteTaskFirebase(objeto);
        setAlerta({ status: "success", message: "Task removida com sucesso!" });
      } catch (err) {
        setAlerta({ status: "error", message: "Erro ao remover: " + err });
      }
    }
  };

  useEffect(() => {
    setCarregando(true);
    if (user?.uid != null) {
      const uid = user?.uid;
      getTasksUIDFirebase(uid, setListaObjetos);
    }
    setCarregando(false);
  }, [user]);

  if (user) {
    return (
      <TasksContext.Provider
        value={{
          alerta,
          setAlerta,
          listaObjetos,
          setListaObjetos,
          remover,
          objeto,
          setObjeto,
          editarObjeto,
          novoObjeto,
          acaoCadastrar,
          handleChange,
          abreDialogo,
          setAbreDialogo,
        }}
      >
        <Carregando carregando={carregando}>
          <Tabela />
        </Carregando>
        <Form />
      </TasksContext.Provider>
    );
  } else {
    return <Navigate to="/" />;
  }
}

export default Tasks;
