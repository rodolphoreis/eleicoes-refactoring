import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

function App() {
  const [voto, setVoto] = useState("");
  const [ps, setPs] = useState(0);
  const [psd, setPsd] = useState(0);
  const [ch, setCh] = useState(0);
  const [il, setIl] = useState(0);
  const [be, setBe] = useState(0);
  const [pcp, setPcp] = useState(0);
  const [l, setL] = useState(0);
  const [nulo, setNulo] = useState(0);
  const [nif, setNif] = useState("");
  const [idade, setIdade] = useState(null);
  const [podeVotar, setPodeVotar] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [votou, setVotou] = useState(false);
  useEffect(() => {
    async function fetchEleitor() {
      try {
        const response = await axios.get(`http://localhost:3001/eleitores`);
        const eleitores = response.data;

        const eleitor = eleitores.find(
          (eleitor: any) => eleitor.NIF === parseInt(nif)
        );
        if (eleitor) {
          setIdade(eleitor.idade);
          setPodeVotar(eleitor.idade >= 18);
        } else {
          console.log("Eleitor não encontrado.");
        }
      } catch (error) {
        console.error("Erro ao recuperar os eleitores:", error);
        setPodeVotar(false);
      }
    }

    if (nif) {
      fetchEleitor();
    }
  }, [nif]);

  const handleVotar = () => {
    if (!podeVotar) {
      alert("Você não pode votar pois é menor de 18 anos.");
      return;
    }
    setVotou(true);

    switch (voto.toLowerCase()) {
      case "ps":
        setPs(ps + 1);
        break;
      case "psd":
        setPsd(psd + 1);
        break;
      case "ch":
        setCh(ch + 1);
        break;
      case "il":
        setIl(il + 1);
        break;
      case "be":
        setBe(be + 1);
        break;
      case "pcp":
        setPcp(pcp + 1);
        break;
      case "l":
        setL(l + 1);
        break;
      case "nulo":
        setNulo(nulo + 1);
        break;
      default:
        alert("Opção inválida. Por favor, tente outro partido ou vote nulo.");
    }
    setVoto("");
  };

  const renderizarVotacao = () => {
    if (!nif) {
      return null;
    } else if (idade === null) {
      return <p className="erro">NIF inexistente.</p>;
    } else if (idade < 18) {
      return (
        <p className="erro">
          Você tem menos de 18 anos e ainda não pode votar.
        </p>
      );
    } else if (podeVotar) {
      return (
        <div className="podeVotar">
          <label htmlFor="voto" className="label_select">
            Escolha o partido em que deseja votar:
          </label>
          <select
            id="voto"
            value={voto}
            required
            onChange={(e) => setVoto(e.target.value)}
          >
            <option value="">Escolher Partido</option>
            <option value="ps">Partido Socialista</option>
            <option value="psd">Partido Social Democrata</option>
            <option value="ch">Chega</option>
            <option value="il">Iniciativa Liberal</option>
            <option value="be">Bloco de Esquerda</option>
            <option value="pcp">Partido Comunista Português</option>
            <option value="nulo">Nulo</option>
          </select>

          <button className="btn" onClick={handleVotar}>
            Votar
          </button>
        </div>
      );
    } else {
      return (
        <p className="erro">Você não foi encontrado na lista de eleitores.</p>
      );
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="App">
      <img src="/foto-eleicoes.png" alt="foto eleições" />
      <h1>Eleições 2024</h1>
      <h4>Eleições para a Assembleia da República</h4>

      <div className="label_and_input">
        <label htmlFor="nif">Digite seu NIF:</label>
        <input
          type="number"
          id="nif"
          value={nif}
          onChange={(e) => setNif(e.target.value)}
        />
      </div>
      {renderizarVotacao()}
      {votou && (
        <Button
          onClick={handleOpenModal}
          style={{
            backgroundColor: "#0f730c",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            width: "150px",
            marginTop: "30px",
            fontWeight: "bold",
            marginLeft: "5px",
          }}
        >
          Resultados
        </Button>
      )}
      <Modal
        open={openModal && votou}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "white",
            p: 2,
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "8px",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          }}
        >
          <Typography
            id="modal-title"
            variant="h6"
            component="h2"
            sx={{
              marginBottom: 2,
              color: "#333",
              margin: "20px",
              textAlign: "center",
            }}
          >
            Resultados
          </Typography>
          <Typography
            id="modal-description"
            sx={{ mt: 2, color: "#666", margin: "20px" }}
          >
            Número de votos para o PS: {ps}
            <br />
            Número de votos para o PSD: {psd}
            <br />
            Número de votos para o CH: {ch}
            <br />
            Número de votos para o IL: {il}
            <br />
            Número de votos para o BE: {be}
            <br />
            Número de votos para o PCP: {pcp}
            <br />
            Número de votos para o L: {l}
            <br />
            Número de votos nulos: {nulo}
            <br />
          </Typography>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            sx={{
              backgroundColor: "#0f730c",
              color: "#fff",
              marginTop: 2,
              margin: "20px",
              marginLeft: "149px",
              "&:hover": {
                backgroundColor: "#0f730c",
              },
            }}
          >
            Fechar
          </Button>
        </Box>
      </Modal>
    </div>
  );
}

export default App;
