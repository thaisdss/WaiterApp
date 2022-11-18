import closeIcon from "../../assets/images/close-icon.svg";
import { Order } from "../../types/Order";
import { formatCurrency } from "../../utils/formatCurrency";
import { Actions, ModalBody, OrderDetails, OverLay } from "./style";

interface OrderModalProps {
    visible: boolean;
    order: Order | null;
    onClose: () => void;
}

export function OrderModal({visible, order, onClose}: OrderModalProps){

    if(!visible || !order){
        return null;
    }

    const total = order.products.reduce((total, {product, quantity}) => {
        return total + (product.price * quantity);
    }, 0);

    return(
        <OverLay>
            <ModalBody>
                <header>
                    <strong>Mesa {order.table}</strong>
                    <button type="button" onClick={onClose}>
                        <img src={closeIcon} alt="Ícone de fechar"/>
                    </button>
                </header>
                <div className="status-container">
                    <small>Status do pedido</small>
                    <div>
                        <span>
                            {order.status === "WAITING" && "🕑"}
                            {order.status === "IN_PRODUCTION" && "👩‍🍳"}
                            {order.status === "DONE" && "✅"}
                        </span>
                        <strong>
                            {order.status === "WAITING" && "Fila de espera"}
                            {order.status === "IN_PRODUCTION" && "Em preparação"}
                            {order.status === "DONE" && "Pronto"}
                        </strong>
                    </div>
                </div>

                <OrderDetails>
                    <strong>Itens</strong>

                    <div className="order-items">
                        {order.products.map(({_id, product, quantity}) => (
                            <div className="item" key={_id}>
                                <img
                                    src={`http://localhost:3001/uploads/${product.imagePath}`}
                                    alt={product.name}
                                    width="56"
                                    height="28.51"
                                />
                                <span className="quantity">{quantity}x</span>
                                <div className="product-details">
                                    <strong>{product.name}</strong>
                                    <span>{formatCurrency(product.price)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="total">
                        <span>Total</span>
                        <strong>{formatCurrency(total)}</strong>
                    </div>
                </OrderDetails>

                <Actions>
                    <button type="button" className="primary">
                        <span>👩‍🍳</span>
                        <span>Iniciar Produção</span>
                    </button>
                    <button type="button" className="secondary">
                        Cancelar Pedido
                    </button>
                </Actions>
            </ModalBody>
        </OverLay>
    );
}
