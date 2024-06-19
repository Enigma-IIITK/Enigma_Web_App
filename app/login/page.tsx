import Login from '../components/login';
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import '../login.css';

export default function LoginPage() {
    return <section>
        <Navbar />
        <Login />
        <Footer />
    </section>
    ;}