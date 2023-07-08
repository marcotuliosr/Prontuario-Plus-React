import Header from "../components/header/Header"
import Footer from "../components/footer/Footer"
import Carteirinha from "../components/main/Carteirinha/Carteirinha"
export default function CarteirinhaRoute() {
    return (
        <section>
            <Header active="carteirinha"/>
            <Carteirinha />
            <Footer/>
        </section>
    )
}