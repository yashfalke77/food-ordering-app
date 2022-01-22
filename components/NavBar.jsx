import React from 'react'
import styles from '../styles/NavBar.module.css'
import AddIcCallOutlinedIcon from '@mui/icons-material/AddIcCallOutlined';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import Link from 'next/link';
import { useSelector } from 'react-redux';

function NavBar() {
    const quantity = useSelector(state => state.entities.carts.orderQuantity)

    

    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.callButton}>
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        < AddIcCallOutlinedIcon className={styles.phone} />
                    </IconButton>
                </div>
                <div className={styles.texts}>
                    <div className={styles.text}>Order Now</div>
                    <div className={styles.text}>012 345 678</div>
                </div>
            </div>
            <div className={styles.item}>
                <ul className={styles.list}>
                    <li className={styles.listItems}><Link href="/"><a >Homepage</a></Link></li>
                    <li className={styles.listItems}><Link href="/#products"><a >Products</a></Link></li>
                    <li className={styles.listItems}><Link href="/admin/login"><a >Login</a></Link></li>
                    <h1 className={styles.listItemsLogo}>Dineout</h1>
                    <li className={styles.listItems}><Link href="/admin"><a >Admin</a></Link></li>
                    <li className={styles.listItems}><Link href="/about"><a >Blog</a></Link></li>
                    <li className={styles.listItems}><Link href="/contact"><a >Contact</a></Link></li>

                </ul>
            </div>
            <div className={styles.item}>
                <Link href="/cart">
                    <a>
                        <IconButton aria-label="cart">
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartCheckoutIcon className={styles.cart} />
                            </Badge>
                        </IconButton>
                    </a>
                </Link>
            </div>
        </div >
    )
}

export default NavBar
