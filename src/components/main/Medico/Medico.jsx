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
export default function Medico() {
    const [medicos, setMedicos] = useState([]);
    const [smShow, setSmShow] = useState(false);
    const [addShow, setAddShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [viewShow, setViewShow] = useState(false);

    const [id, setId] = useState(0);
    const [nome, setNome] = useState("");
    const [endereco, setEndereco] = useState("");
    const [dataNascimento, setDataNascimento] = useState("");
    const [especialidade, setEspecialidade] = useState("");


    useEffect(() => {
        getMedicos();
    }, [medicos]);

    function selecionarMedico(medico) {
        setId(medico.id);
        setNome(medico.nome);
        setEndereco(medico.endereco);
        setDataNascimento(medico.dataNascimento);
        setEspecialidade(medico.especialidade);
    }

    async function editarMedico(){
        await api.put(`medicos`, {
            "id":id,
            "nome": nome,
            "endereco": endereco,
            "dataNascimento": dataNascimento,
            "especialidade": especialidade,
        },{
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {
            if (response.status === 200){
                getMedicos();
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

    async function adicionarMedico() {
        await api.post(`medicos`, {
            "nome": nome,
            "endereco": endereco,
            "dataNascimento": dataNascimento,
            "especialidade": especialidade,
        },{
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {
            if (response.status === 200){
                getMedicos();
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

    async function excluirMedico(id) {
        await api.delete(`medicos/${id}`, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {
            if (response.status === 200){
                getMedicos();
                setNome("");
                setEndereco("");
                setDataNascimento("");
                setEspecialidade("");
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

    async function getMedicos() {
        await api.get('medicos', {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {
            if (response.status === 200){
                setMedicos(response.data);
                
            }else
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
                            <Form.Label>Nome completo</Form.Label>
                            <Form.Control type="text" placeholder="Nome completo" value={nome} disabled/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control type="text" placeholder="Endereço" value={endereco} disabled/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Data de nascimento</Form.Label>
                            <Form.Control type="text" placeholder="Data de nascimento" value={dataNascimento} disabled/>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Especialidade</Form.Label>
                            <Form.Control type="text" placeholder="Especialidade" value={especialidade} disabled/>
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
                            <Form.Label>Nome completo</Form.Label>
                            <Form.Control type="text" placeholder="Nome completo" value={nome} onChange={(e) => {setNome(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control type="text" placeholder="Endereço" value={endereco} onChange={(e) => {setEndereco(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Data de nascimento</Form.Label>
                            <Form.Control type="text" placeholder="Data de nascimento" value={dataNascimento} onChange={(e) => {setDataNascimento(e.target.value)}}/>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Especialidade</Form.Label>
                            <Form.Control type="text" placeholder="Especialidade" value={especialidade} onChange={(e) => {setEspecialidade(e.target.value)}}/>
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setEditShow(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => editarMedico()}>
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
                            <Form.Label>Nome completo</Form.Label>
                            <Form.Control type="text" placeholder="Nome completo" value={nome} onChange={(e) => {setNome(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Endereço</Form.Label>
                            <Form.Control type="text" placeholder="Endereço" value={endereco} onChange={(e) => {setEndereco(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Data de nascimento</Form.Label>
                            <Form.Control type="text" placeholder="Data de nascimento" value={dataNascimento} onChange={(e) => {setDataNascimento(e.target.value)}}/>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Especialidade</Form.Label>
                            <Form.Control type="text" placeholder="Especialidade" value={especialidade} onChange={(e) => {setEspecialidade(e.target.value)}}/>
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setAddShow(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => adicionarMedico()}>
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
                    <p><b>Nome:</b> {nome}</p>
                    <p><b>Data Nascimento:</b> {dataNascimento}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => { excluirMedico(id); setSmShow(false) }}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row>
                <Col className="text-center mt-4 mb-4" sm={9}><h2>MEDICO</h2></Col>
                <Col sm={4}>
                    <Button
                            onClick={() => {
                                setNome("");
                                setEndereco("");
                                setDataNascimento("");
                                setEspecialidade("");

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
                        <th>Nome</th>
                        <th>Data Nascimento</th>
                        <th>Especialidade</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {medicos.length === 0 ?
                        <tr>
                            <th colSpan={4} style={{ textAlign: "center" }}>"Não há items para apresentar!"</th>
                        </tr> :
                        medicos.map((medico, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{medico.nome}</td>
                                    <td>{medico.dataNascimento}</td>
                                    <td>{medico.especialidade}</td>
                                    <td className="actions">
                                        <Button onClick={() => {
                                            setViewShow(true);
                                            selecionarMedico(medico)
                                        }} variant="secondary" className="me-2">Visualizar</Button>

                                        <Button onClick={() => {
                                            setEditShow(true);
                                            selecionarMedico(medico)
                                        }} variant="primary" className="me-2">Editar</Button>

                                        <Button onClick={() => {
                                            setSmShow(true);
                                            selecionarMedico(medico)
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