import styles from "../styles/Cart.module.css";
import Button from '@mui/material/Button';
import Image from "next/image";
import { useSelector } from "react-redux";
import { useState } from "react";
import Modal from "../components/Modal";

const Cart = () => {

    const cart = useSelector(state => state.entities.carts)

    const [open, setOpen] = useState(false)
    const [cash, setCash] = useState(false)

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styles.trTitle}>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Extras</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.products.map(product => (
                            <tr className={styles.tr} key={product._id}>
                                <td>
                                    <div className={styles.imgContainer}>
                                        <Image
                                            src={product.img}
                                            layout="fill"
                                            objectFit="cover"
                                            alt=""
                                        />
                                    </div>
                                </td>
                                <td>
                                    <span className={styles.name}>{product.title}</span>
                                </td>
                                <td>
                                    <span className={styles.extras}>
                                        {product.extraOptions.map(extra => (
                                            <span key={extra._id}>{extra.text}, </span>
                                        ))}
                                    </span>
                                </td>
                                <td>
                                    <span className={styles.price}>&#8377; {product.price}</span>
                                </td>
                                <td>
                                    <span className={styles.quantity}>{product.quantity}</span>
                                </td>
                                <td>
                                    <span className={styles.total}>&#8377; {product.price * product.quantity} </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.right}>
                <div className={styles.wrapper}>
                    <h2 className={styles.title}>CART TOTAL</h2>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Subtotal:</b>&#8377; {cart.total}
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Discount:</b>&#8377; 0.00
                    </div>
                    <div className={styles.totalText}>
                        <b className={styles.totalTextTitle}>Total:</b>&#8377; {cart.total}
                    </div>
                    {open ?
                        <div className={styles.add}>
                            <Button size="large" variant="contained" color="bg_color" onClick={() => (setCash(true))}>Cash On delivery </Button>
                        </div>
                        :
                        <div className={styles.add}>
                            <Button size="large" variant="contained" color="bg_color" onClick={() => (setOpen(true))}>CheckOut Now </Button>
                        </div>}
                </div>
            </div>
            {cash && <Modal setCash={setCash} />}
        </div>
    );
};

export default Cart;