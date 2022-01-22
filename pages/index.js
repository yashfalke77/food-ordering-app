import axios from 'axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import AddButton from '../components/AddButton'
import AddPizza from '../components/AddPizza'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import { loadProducts } from '../redux/products'
import styles from '../styles/Home.module.css'

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  let admin = false;
  if (myCookie.token === process.env.TOKEN) {
    admin = true
  }
  const res = await axios.get("http://localhost:3000/api/products");
  return {
    props: {
      pizzaList: res.data.response,
      admin,
    },
  };
}

export default function Home({ pizzaList, admin }) {

  const [close, setClose] = useState(true)

  return (
    <div className={styles.container}>
      <Head>
        <title>Dineout - The best Pizza restaurant </title>
        <meta name="description" content="Find best pizza restaurants in India offering discounts on food & drinks, check out menu, reviews and also book a table through dineout for free." />
      </Head>
      <Featured />
      {admin && <AddButton setClose={setClose} />}
      {!close && <AddPizza setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
    </div>
  )
}
