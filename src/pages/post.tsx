import { GetStaticProps } from "next";
import Head from "next/head";
import { stripe } from "../services/stripe";

export default function Post() {
  return (
    <>
      <Head >
        <title>Post | vop.news</title>
      </Head>

    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1IerWTCuOWI61DOsubMYaA1x', {
    expand: ['product']
  })

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price.unit_amount / 100),
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}
