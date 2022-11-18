import { Container } from "./style";
import {Content} from "./style";
import logo from "../../assets/images/logo.svg";

export function Header(){
    return(
        <Container>
            <Content>
                <div className="page-details">
                    <h1>Pedidos</h1>
                    <h2>Acompanhe os pedidos dos clientes</h2>
                </div>
                <img src={logo} alt="Logo do WAITERAPP" />
            </Content>
        </Container>
    );
}
