import styles from "../../styles/Product.module.css";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { productAddedToCart } from "../../redux/carts";
import { useRouter } from "next/router";

export const getServerSideProps = async ({ params }) => {
    const response = await axios.get(`http://localhost:3000/api/products/${params.id}`);

    return {
        props: {
            pizza: response.data.response
        }
    }
}

const Product = ({ pizza }) => {

    const dispatch = useDispatch()

    const [size, setSize] = useState(0);
    const [price, setPrice] = useState(pizza.prices[0])
    const [extras, setExtras] = useState([])
    const [quantity, setQuantity] = useState(1)

    const changePrice = (number) => {
        setPrice(price + number)
    }

    const handleSize = (sizeIndex) => {
        const difference = pizza.prices[sizeIndex] - pizza.prices[size]
        setSize(sizeIndex)
        changePrice(difference)
    }

    const handleChange = (e, opt) => {
        const checked = e.target.checked
        if (checked) {
            changePrice(opt.price)
            setExtras(prev => [...prev, opt])
        } else {
            changePrice(-opt.price)
            setExtras(extras.filter(extra => extra._id !== opt._id))
        }
    }
    const handleClick = () => {
        dispatch(productAddedToCart({ ...pizza, extras, price, quantity }))
    }

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={pizza.img} objectFit="contain" layout="fill" alt="" />
                </div>
            </div>
            <div className={styles.right}>
                <h1 className={styles.title}>{pizza.title}</h1>
                <span className={styles.price}>&#8377; {price}</span>
                <p className={styles.desc}>{pizza.desc}</p>
                <h3 className={styles.choose}>Choose the size</h3>
                <div className={styles.sizes}>
                    <div className={styles.size} onClick={() => handleSize(0)}>
                        <Image src="/images/size.png" layout="fill" alt="" />
                        <span className={styles.number}>Small</span>
                    </div>
                    <div className={styles.size} onClick={() => handleSize(1)}>
                        <Image src="/images/size.png" layout="fill" alt="" />
                        <span className={styles.number}>Medium</span>
                    </div>
                    <div className={styles.size} onClick={() => handleSize(2)}>
                        <Image src="/images/size.png" layout="fill" alt="" />
                        <span className={styles.number}>Large</span>
                    </div>
                </div>
                <h3 className={styles.choose}>Choose additional ingredients</h3>
                <div className={styles.ingredients}>
                    {pizza.extraOptions.map(opt => (
                        <div className={styles.option} key={opt._id}>
                            <FormControlLabel control={<Checkbox color="bg_color" id={opt.text} name={opt.text} onChange={(e) => (handleChange(e, opt))} />} label={opt.text} />
                        </div>
                    ))}
                </div>
                <div className={styles.add}>
                    <TextField onChange={(e) => setQuantity(e.target.value)} type="number" value={quantity} id="outlined-basic" color="bg_color" size="small" label="Outlined" variant="outlined" />
                    <Button variant="contained" onClick={handleClick} color="bg_color" style={{ textTransform: "none", marginLeft: "1rem" }}>Add to Cart</Button>
                </div>
            </div>
        </div>
    );
};

export default Product;