import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import Medico from "../components/main/Medico/Medico"
export default function MedicoRoute() {
    return (
        <section>
            <Header active="medico"/>
            <Medico />
            <Footer/>
        </section>
    )
}