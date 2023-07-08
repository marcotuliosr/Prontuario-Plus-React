import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import Consulta from "../components/main/Consulta/Consulta";

export default function ConsultaRoute() {
    return (
        <section>
            <Header active="consulta"/>
            <Consulta />
            <Footer/>
        </section>
    )
}