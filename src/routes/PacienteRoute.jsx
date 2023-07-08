import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import Paciente from "../components/main/Paciente/Paciente"
export default function PacienteRoute() {
    return (
        <section>
            <Header active="paciente"/>
            <Paciente />
            <Footer/>
        </section>
    )
}