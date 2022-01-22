import React from 'react'
import styles from '../styles/PizzaList.module.css'
import PizzaCard from './PizzaCard'

function PizzaList({ pizzaList }) {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>The Best Pizza in town</h1>
            <p className={styles.desc}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
                in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
                sit amet, consectetur adipiscing elit.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt eaque commodi fugit iste, quam amet necessitatibus ratione sit blanditiis quas dolorum minima nostrum deleniti laboriosam quod ut nisi voluptatibus ullam.
            </p>
            <div className={styles.wrapper}>
                {pizzaList.map(pizza => (
                    <PizzaCard key={pizza._id} pizza={pizza} />
                ))}
            </div>
        </div>
    )
}

export default PizzaList
