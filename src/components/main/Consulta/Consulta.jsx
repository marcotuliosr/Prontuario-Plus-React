import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'react-toastify/dist/ReactToastify.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import DatePicker from 'react-datepicker';

import api from "../../../services/api";
import Container from "react-bootstrap/esm/Container";
export default function Consulta() {
    const [consultas, setConsultas] = useState([]);
    const [smShow, setSmShow] = useState(false);
    const [addShow, setAddShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [viewShow, setViewShow] = useState(false);
    const [pacientes, setPacientes] = useState([]);
    const [medicos, setMedicos] = useState([]);

    const [id, setId] = useState(0);
    const [dataHoraConsulta, setDataHoraConsulta] = useState(new Date());
    const [areaMedica, setAreaMedica] = useState("");
    const [paciente, setPaciente] = useState("");
    const [medico, setMedico] = useState("");


    useEffect(() => {
        getConsultas();
        getPacientes();
        getMedicos();
    }, []);

    function selecionarConsulta(consulta) {
        setId(consulta.id);
        setDataHoraConsulta(consulta.dataHoraConsulta);
        setMedico(consulta.medico);
        setPaciente(consulta.paciente);
        setAreaMedica(consulta.areaMedica)
    }

    async function editarConsulta(){
        console.log(new Date(dataHoraConsulta))
        await api.put(`consultas`, {
            "id":id,
            "dataHoraConsulta": new Date(dataHoraConsulta),
            "areaMedica": areaMedica,
            "paciente": {"id":paciente.id},
            "medico": {"id":medico.id}
        },{
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {
            if (response.status === 200){
                getConsultas();
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

    async function adicionarConsulta() {
        await api.post(`consultas`, {
            "dataHoraConsulta": new Date(dataHoraConsulta),
            "areaMedica": areaMedica,
            "paciente": {"id":paciente},
            "medico": {"id":medico}
        },{
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {
            if (response.status === 200){
                getConsultas();
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

    async function excluirConsulta(id) {
        await api.delete(`consultas/${id}`, {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {
            console.log(response)
            if (response.status === 200){
                getConsultas();
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

    async function getConsultas() {
        await api.get('consultas', {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {
            if (response.status === 200){
                setConsultas(response.data);
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

    async function getPacientes() {
        await api.get('pacientes', {
            headers: {
                "Content-Type": "application/json;charset=utf-8",
                "Access-Control-Allow-Origin": "*"
            }
        }).then(response => {
            if (response.status === 200){
                setPacientes(response.data);
                
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
                            <Form.Label>Data / Hora Consulta</Form.Label>
                            <Form.Control type="text" placeholder="Data / Hora Consulta" value={dataHoraConsulta} disabled/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Paciente</Form.Label>
                            <Form.Control type="text" placeholder="Paciente" value={paciente.nome} disabled/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Medico</Form.Label>
                            <Form.Control type="text" placeholder="Medico" value={medico.nome} disabled/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Area Medica</Form.Label>
                            <Form.Control type="text" placeholder="Area Medica" value={areaMedica} disabled/>
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
                            <Form.Label>Data/Hora Consulta</Form.Label>
                            <Form.Control type="date" placeholder="Data/Hora Consulta" value={dataHoraConsulta} onChange={(e) => {setDataHoraConsulta(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Area Medica</Form.Label>
                            <Form.Control type="text" placeholder="Area Medica" value={areaMedica} onChange={(e) => {setAreaMedica(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Medico</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => { setMedico(e.target.value) }} disabled>
                                <option value={medico.id}>{medico.nome}</option>
                            </Form.Select>
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Paciente</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => { setPaciente(e.target.value) }} disabled>
                                <option value={paciente.id}>{paciente.nome}</option>
                            </Form.Select>
                        </Form.Group>
                        
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setEditShow(false)}>
                        Cancelar
                    </Button>
                    <Button variant="primary" onClick={() => editarConsulta()}>
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
                            <Form.Label>Data/Hora Consulta</Form.Label>
                            <Form.Control type="date" placeholder="Data/Hora Consulta" value={dataHoraConsulta} onChange={(e) => {setDataHoraConsulta(e.target.value)}}/>
                            
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Area Medica</Form.Label>
                            <Form.Control type="text" placeholder="Area Medica" value={areaMedica} onChange={(e) => {setAreaMedica(e.target.value)}}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Medico</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => { setMedico(e.target.value) }}>
                                <option>Selecione um medico</option>
                                {
                                    medicos.map((medico) => {
                                        return (<option value={medico.id}>{medico.nome}</option>)
                                    })
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Paciente</Form.Label>
                            <Form.Select aria-label="Default select example" onChange={(e) => { setPaciente(e.target.value) }}>
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
                    <Button variant="primary" onClick={() => adicionarConsulta()}>
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
                        Deseja excluir a consulta?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="danger" onClick={() => { excluirConsulta(id); setSmShow(false) }}>
                        Excluir
                    </Button>
                </Modal.Footer>
            </Modal>

            <Row>
                <Col className="text-center mt-4 mb-4" sm={9}><h2>CONSULTAS</h2></Col>
                <Col sm={3}>
                    <Button
                            onClick={() => {
                                setDataHoraConsulta("");
                                setAreaMedica("");
                                setMedico("");
                                setPaciente("");

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
                        <th>Data / Hora</th>
                        <th>Area Medica</th>
                        <th>Medico</th>
                        <th>Paciente</th>
                        <th>Ação</th>
                    </tr>
                </thead>
                <tbody>
                    {consultas.length === 0 ?
                        <tr>
                            <th colSpan={6} style={{ textAlign: "center" }}>"Não há items para apresentar!"</th>
                        </tr> :
                        consultas.map((consulta, index) => {
                            return (
                                
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{consulta.dataHoraConsulta}</td>
                                    <td>{consulta.areaMedica}</td>
                                    <td>{consulta.medico.nome}</td>
                                    <td>{consulta.paciente.nome}</td>
                                    <td className="actions">
                                        <Button onClick={() => {
                                            setViewShow(true);
                                            selecionarConsulta(consulta)
                                        }} variant="secondary" className="me-2">Visualizar</Button>

                                        <Button onClick={() => {
                                            setEditShow(true);
                                            selecionarConsulta(consulta)
                                        }} variant="primary" className="me-2">Editar</Button>

                                        <Button onClick={() => {
                                            setSmShow(true);
                                            selecionarConsulta(consulta)
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