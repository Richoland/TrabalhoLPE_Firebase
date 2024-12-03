import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import TasksContext from "./TasksContext"; // Alterado para TasksContext
import CampoEntrada from "../../comuns/CampoEntrada";
import CampoEntradaTexto from "../../comuns/CampoEntradaTexto";
import Dialogo from "../../comuns/Dialogo";

function Form() {
  const {
    objeto,
    handleChange,
    acaoCadastrar,
    alerta,
    abreDialogo,
    setAbreDialogo,
  } = useContext(TasksContext); // Alterado para TasksContext

  return (
    <>
      <Dialogo
        id="modalEdicao"
        titulo="Task"
        open={abreDialogo}
        setOpen={setAbreDialogo}
        acaoCadastrar={acaoCadastrar}
        idform="formulario"
        maxWidth="sm"
      >
        <Alerta alerta={alerta} />
        <CampoEntrada
          id="txtID"
          label="ID"
          tipo="text"
          name="id"
          value={objeto.id}
          onchange={handleChange}
          requerido={false}
          readonly={true}
        />
        <CampoEntrada
          id="txtTitulo"
          label="Título"
          tipo="text"
          name="titulo"
          value={objeto.titulo}
          onchange={handleChange}
          requerido={true}
          readonly={false}
          maxlength={50}
          msgvalido="Título OK"
          msginvalido="Informe o título"
        />
        <CampoEntradaTexto
          id="txtTexto"
          label="Texto"
          rows={5}
          tipo="text"
          name="texto"
          value={objeto.texto}
          onchange={handleChange}
          requerido={true}
          readonly={false}
          maxlength={200}
          msgvalido="Texto OK"
          msginvalido="Informe o texto"
        />
        <CampoEntrada
          id="txtPrazo"
          label="Prazo"
          tipo="date"
          name="prazo"
          value={objeto.prazo}
          onchange={handleChange}
          requerido={true}
          readonly={false}
          msgvalido="Prazo OK"
          msginvalido="Informe o prazo"
        />
        <CampoEntrada
          id="txtUsuario"
          label="Usuário"
          tipo="text"
          name="usuario"
          value={objeto.usuario}
          onchange={handleChange}
          requerido={true}
          readonly={false}
          maxlength={50}
          msgvalido="Usuário OK"
          msginvalido="Informe o usuário"
        />
      </Dialogo>
    </>
  );
}

export default Form;
