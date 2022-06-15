// import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../../components/Layout';
// import data from '../../utils/data';
import NextLink from 'next/link';
import useStyles from '../../utils/styles';
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  Button,
} from '@mui/material';
import Image from 'next/image';
// import { ArrowBackIosSharp } from '@mui/icons-material';
import Product from '../../models/Product';
import db from '../../utils/db';
// import { Cookies } from 'js-cookie';
import { setCookies, getCookies } from 'cookies-next';

export default function ProductScreen(props) {
  const { product, token } = props;
  setCookies('token', product.description);
  console.log(token);
  const classes = useStyles();
  // const router = useRouter();
  // const { slug } = router.query;
  // const product = data.products.find((elt) => elt.slug === slug);
  if (!product) {
    return <div>Product not found</div>;
  }

  const addToCartHandler = async () => {
    // const { data } = await axios.get(`/api/products/${product._id}`);
    dispatchEvent({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity: 1 },
    });
  };

  return (
    <Layout title={product.name} description={product.description}>
      <div className={classes.section}>
        <NextLink href="/" passHref>
          <Link>
            <Typography>Back to products</Typography>
          </Link>
        </NextLink>
      </div>

      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            Layout="responsive"
          ></Image>
        </Grid>

        <Grid item xs={12} md={3}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                {product.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {product.category}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {product.brand}</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                Rating: {product.rating} stars ({product.numReviews} reviews)
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Description: {product.description}</Typography>
            </ListItem>
          </List>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>${product.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
                      {product.countInStock > 0 ? 'In Stock' : 'Unavailable'}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>

              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={addToCartHandler}
                >
                  ADD TO CART
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const { params, req } = context;
  // console.log(context);
  const { slug } = params;
  // console.log(params, slug);

  await db.connect();
  const product = await Product.findOne({ slug }).lean(); //get prod
  // console.log(product);
  // console.log(product._id);
  // console.log(typeof product._id);
  // setCookies(`${product.slug}`, JSON.stringify(product));
  await db.disconnect();
  if (!product) console.log('Product not found');
  return {
    props: {
      product: db.convertDocToObj(product),
      token: req.cookies.token || '',
    },
  };
}