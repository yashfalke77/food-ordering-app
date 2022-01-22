import React from 'react'
import Link from 'next/link'
import styles from '../styles/footer.module.css'

function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.content}>
                <div className={styles.top}>
                    <div className={styles.logoDetails}>
                        <span className={styles.logo_name}><span style={{ color: "#ac0101" }}>Dine</span>out</span>
                    </div>
                </div>
                <div className={styles.linkBoxes}>
                    <ul className={styles.box}>
                        <li className={styles.link_name}><a >Company</a></li>
                        <li><Link href="/"><a >Home</a></Link></li>
                        <li><Link href="/new"><a >My Cart</a></Link></li>
                        <li><Link href="/about"><a >About</a></Link></li>
                        <li><Link href="/"><a >Product</a></Link></li>
                    </ul>
                    <ul className={styles.box}>
                        <li className={styles.link_name}><a >Services</a></li>
                        <li><Link href="/"><a >Product</a></Link></li>
                        <li><Link href="/new"><a >My Cart</a></Link></li>
                        <li><Link href="/new"><a >About</a></Link></li>
                        <li><Link href="/new"><a >Contact</a></Link></li>
                    </ul>
                    <ul className={styles.box}>
                        <li className={styles.link_name}><a >Account</a></li>
                        <li><Link href="/login"><a >Sign-in</a></Link></li>
                        <li><Link href="/register"><a >Join Free</a></Link></li>
                    </ul>
                    <ul className={styles.box}>
                        <li className={styles.link_name}><a >Top Categories</a></li>
                        <li><Link href="/c/61554bfe801949ad7b9be4ff"><a >Neapolitan Pizza.</a></Link></li>
                        <li><Link href="/c/61554c2753bcf306407cb1bd"><a >Chicago Pizza.</a></Link></li>
                        <li><Link href="/c/61554c43d2a6b15f764aff36"><a >New York-Style Pizza.</a></Link></li>
                        <li><Link href="/c/61554c63dfd6a37d71449b5c"><a >Sicilian Pizza.</a></Link></li>
                    </ul>
                    <ul className={`${styles.box} ${styles.inputBox}`}>
                        <li className={styles.link_name}>About Dineout</li>
                        <li style={{ color: "#F7FFFF" }}>
                        Find best pizza restaurants in India offering discounts on food & drinks, check out menu, reviews and also book a table through dineout for free.
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer
