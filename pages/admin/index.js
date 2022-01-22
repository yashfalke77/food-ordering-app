import React from 'react';
import styles from '../../styles/admin.module.css'
import Image from 'next/image';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deleteProduct, loadProducts } from '../../redux/products';
import { changeStatus, loadorders } from '../../redux/orders';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';

export const getServerSideProps = async (ctx) => {
    const myCookie = ctx.req?.cookies || "";

    if (myCookie.token !== process.env.TOKEN) {
        return {
            redirect: {
                destination: "/admin/login",
                permanent: false,
            },
        };
    }
    const productRes = await axios.get("http://localhost:3000/api/products");
    const orderRes = await axios.get("http://localhost:3000/api/orders");

    return {
        props: {
            orders: orderRes.data.response,
            products: productRes.data.response,
        },
    };
}

function Admin({ orders, products }) {

    const dispatch = useDispatch()
    dispatch(loadProducts(products))
    dispatch(loadorders(orders))
    const router = useRouter()
    const pizzaList = useSelector(state => state.entities.products.list)
    let orderList = useSelector(state => state.entities.orders.list)
    const status = ["preparing", "on the way", "delivered"];

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(
                `http://localhost:3000/api/products/${id}`
            );
            dispatch(deleteProduct(id))
        } catch (err) {
            console.log(err);
        }
    };

    const handleStatus = async (id) => {
        const item = orderList.find((order) => order._id === id);
        const currentStatus = item.status;
        console.log(item)

        try {
            const res = await axios.put(`http://localhost:3000/api/orders/${id}`, {
                status: currentStatus + 1,
            });
            dispatch(changeStatus({ id }))
            router.push('/admin')
        } catch (err) {
            console.log(err);
        }
    };

    orderList = useSelector(state => state.entities.orders.list)

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <h1 className={styles.title}>Products</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Image</th>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </tbody>
                    {pizzaList.map((product) => (
                        <tbody key={product._id}>
                            <tr className={styles.trTitle}>
                                <td>
                                    <Image
                                        src={product.img}
                                        width={50}
                                        height={50}
                                        objectFit="cover"
                                        alt=""
                                    />
                                </td>
                                <td>{product._id.slice(0, 5)}...</td>
                                <td>{product.title}</td>
                                <td>${product.prices[0]}</td>
                                <td>
                                    {/* <button className={styles.button}>Edit</button>
                                     */}
                                    <Button variant="contained" color="primary">Edit</Button>
                                    <Button variant="contained" onClick={() => handleDelete(product._id)} color="bg_color" style={{ marginLeft: "1rem" }}>Delete</Button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            <div className={styles.item}>
                <h1 className={styles.title}>Orders</h1>
                <table className={styles.table}>
                    <tbody>
                        <tr className={styles.trTitle}>
                            <th>Id</th>
                            <th>Customer</th>
                            <th>Total</th>
                            <th>Payment</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </tbody>
                    {orderList.map((order) => (
                        <tbody key={order._id}>
                            <tr className={styles.trTitle}>
                                <td>{order._id.slice(0, 5)}...</td>
                                <td>{order.customer}</td>
                                <td>${order.total}</td>
                                <td>
                                    {order.method === 0 ? <span>cash</span> : <span>paid</span>}
                                </td>
                                <td>{status[order.status]}</td>
                                <td>
                                    <Button variant="contained" color="bg_color" onClick={() => handleStatus(order._id)}>Next Stage</Button>
                                </td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default Admin;
