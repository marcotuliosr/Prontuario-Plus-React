import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-toastify/dist/ReactToastify.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import api from "../../../services/api";
import Container from "react-bootstrap/esm/Container";
export default function Carteirinha() {
    const [carteirinhas, setCarteirinhas] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [smShow, setSmShow] = useState(false);
    const [addShow, setAddShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [viewShow, setViewShow] = useState(false);

    const [id, setId] = useState(0);
    const [numeroIdentidade, setNumeroIdentidade] = useState("");
    const [pacienteNome, setPacienteNome] = useState("");
    const [pacienteID, setPacienteID] = useState("");


    useEffect(() => {
        getCarteirinha();
        getPacientes();
    }, []);

    async function getPacientes() {
        await api.get('pacientes', {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {
            if (response.status === 200) {
                setPacientes(response.data);

            } else
                console.log(error)
        }).catch(error => {
            toast.error('ERROR!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
    }

    function selecionarCateirinha(carteirinha) {
        setId(carteirinha.id);
        setNumeroIdentidade(carteirinha.numeroIdentidade);
        setPacienteNome(carteirinha.paciente.nome);
        setPacienteID(carteirinha.paciente.id);
    }

    async function editarCarteirinha() {
        await api.put(`CarteiraIdentidade`, {
            "id": id,
            "numeroIdentidade": numeroIdentidade,
            "paciente": {
                "id": pacienteID,
            }
        }, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {
            if (response.status === 200) {
                getCarteirinha();
                setEditShow(false);
                toast.success('EDITADO COM SUCESSO', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            else
                toast.error('ERROR!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
        }).catch(error => {
            toast.error('ERROR!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });

    }

    async function adicionarCateirinha() {
        console.log(pacienteID)
        console.log(numeroIdentidade)
        await api.post(`CarteiraIdentidade`, {

            "numeroIdentidade": numeroIdentidade,
            "paciente": {
                "id": pacienteID,
            }
        }, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {
            if (response.status === 200) {
                getCarteirinha();
                setAddShow(false);
                toast.success('CADASTRADO COM SUCESSO', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            else
                toast.error('ERROR!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
        }).catch(error => {
            toast.error('ERROR!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
    }

    async function excluirCarteirinha(id) {
        await api.delete(`CarteiraIdentidade/${id}`, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {
            if (response.status === 200) {
                getCarteirinha();
                setNumeroIdentidade("");
                setPacienteNome("");
                setPacienteID("");
                toast.success('REMOVIDO COM SUCESSO!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            else
                toast.error('ERROR!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
        }).catch(error => {
            toast.error('ERROR!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
    }

    async function getCarteirinha() {
        await api.get('CarteiraIdentidade', {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {
            if (response.status === 200) {
                setCarteirinhas(response.data);

            } else
                console.log(error)
        }).catch(error => {
            toast.error('ERROR!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        });
    }
    return (
        <Container>
            <ToastContainer />
            {/* MODAL PARA VISUALIZAR */}
            <Modal show={viewShow} onHide={() => setViewShow(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>VISUALIZAR</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Numero</Form.Label>
                            <Form.Control type="text" placeholder="Numero" value={numeroIdentidade} disabled />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Nome do paciente</Form.Label>
                            <Form.Control type="text" placeholder="Paciente Nome" value={pacienteNome} disabled />
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setViewShow(false)}>
                        Fechar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* MODAL PARA EDITAR */}
            <Modal show={editShow} onHide={() => setEditShow(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>EDITAR</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Numero</Form.Label>
                            <Form.Control type="text" placeholder="Numero" value={numeroIdentidade} onChange={(e) => { setNumeroIdentidade(e.target.value) }} />
                        </Form.Group>

                        <Form.Select aria-label="Default select example" onChange={(e) => { setPacienteID(e.target.value) }} disabled>
                                <option value={pacienteID}>{pacienteNome}</option>
                        </Form.Select>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setEditShow(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => editarCarteirinha()}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* MODAL PARA INSERIR */}
            <Modal show={addShow} onHide={() => setAddShow(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>ADICIONAR</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Numero</Form.Label>
                            <Form.Control type="text" placeholder="Numero" value={numeroIdentidade} onChange={(e) => { setNumeroIdentidade(e.target.value) }} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Paciente Nome</Form.Label>

                            <Form.Select aria-label="Default select example" onChange={(e) => { setPacienteID(e.target.value) }}>
                                <option>Selecione um paciente</option>
                                {
                                    pacientes.map((paciente) => {
                                        return (<option value={paciente.id}>{paciente.nome}</option>)
                                    })
                                }
                            </Form.Select>
                        </Form.Group>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setAddShow(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => adicionarCateirinha()}>
                        Salvar
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* MODAL DE EXCLUSÃO */}
            <Modal
                size="sm"
                show={smShow}
                onHide={() => setSmShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm">
                        Deseja excluir o paciente?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p><b>Numero:</b> {numeroIdentidade}</p>
                    <p><b>Nome do paciente:</b> {pacienteNome}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => { excluirCarteirinha(id); setSmShow(false) }}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row>
                <Col className="text-center mt-4 mb-4" sm={9}><h2>CATEIRINHA</h2></Col>
                <Col sm={2}>
                    <Button
                        onClick={() => {
                            setNumeroIdentidade("");
                            setPacienteNome("");
                            setPacienteID("");

                            setAddShow(true);
                        }}
                        variant="primary"
                        className="me-2 adicionar-button"
                    >ADICIONAR</Button>
                </Col>
            </Row>


            <Table striped bordered hover responsive="lg">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Numero Carteirinha</th>
                        <th>Nome Paciente</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {carteirinhas.length === 0 ?
                        <tr>
                            <th colSpan={4} style={{ textAlign: "center" }}>"Não há items para apresentar!"</th>
                        </tr> :
                        carteirinhas.map((carteirinha, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{carteirinha.numeroIdentidade}</td>
                                    <td>{carteirinha.paciente.nome}</td>
                                    <td className="actions">
                                        <Button onClick={() => {
                                            setViewShow(true);
                                            selecionarCateirinha(carteirinha)
                                        }} variant="secondary" className="me-2">Visualizar</Button>

                                        <Button onClick={() => {
                                            setEditShow(true);
                                            selecionarCateirinha(carteirinha)
                                        }} variant="primary" className="me-2">Editar</Button>

                                        <Button onClick={() => {
                                            setSmShow(true);
                                            selecionarCateirinha(carteirinha)
                                        }} variant="danger" className="me-2">Excluir</Button>

                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </Table>
        </Container >
    )
}