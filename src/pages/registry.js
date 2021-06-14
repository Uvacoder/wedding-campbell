import React from "react";
import { SnipcartContext } from 'gatsby-plugin-snipcart-advanced/context'
import { graphql } from 'gatsby'
import Button, { RedButton, WhiteButton } from '../components/button'
import { H2, H3, H5, P } from "../components/typography";
import { Row, Col, Container } from 'reactstrap'
import styled from 'styled-components'
import { centsToDollars } from '../utils'
import { GatsbyImage } from 'gatsby-plugin-image'

const BuyButton = styled(Button)`
display: block;
`

const ProductCard = styled(Col)`
margin-bottom: ${props => props.theme.spacing[6]};
margin-top: ${props => props.theme.spacing[7]};
padding-left: ${props => props.theme.spacing[5]};
padding-right: ${props => props.theme.spacing[5]};
`

const ProductRow = styled(Row)`
align-items: flex-end;
`

const ProductDescription = styled(P)`
display: inline-block;
min-height: 3em;
`

const ProductHeader = styled.header`
margin-top: ${props => props.theme.spacing[4]};
`

const Registry = ({ data }) => {
  const products = data.allAirtable.edges;
  const { state } = React.useContext(SnipcartContext)
  const { userStatus, cartQuantity } = state;


  const [location, setLocation] = React.useState()


  React.useEffect(() => {
    setLocation(window.location.href)
  }, [])

  return (
    <>
      <H2 centered>Gift Registry</H2>
      <Container>
      <Row>
        <Col xs={6} className="text-center">
          {userStatus === "SignedOut" ? (
            <Button className="snipcart-customer-signin mx-auto">Sign in</Button>
          ) : (
            <RedButton className="snipcart-customer-signout">Sign out</RedButton>
          )}
        </Col>
        <Col xs={6} className="text-center">
          <WhiteButton className="snipcart-checkout">{`Cart (${cartQuantity})`}</WhiteButton>
        </Col>
      </Row>
      <ProductRow>
        {products.map((product) => (
          <ProductCard xs={12} md={6} lg={4} key={product.node.id}>
            <GatsbyImage image={product.node.data.image.localFiles[0].childImageSharp.gatsbyImageData} alt={product.node.data.name} />
            <ProductHeader>
              <H3>{product.node.data.name}</H3>
              <H5>{`$${centsToDollars(product.node.data.price, "str")}`}</H5>

              <ProductDescription>{product.node.data.description}</ProductDescription>
            </ProductHeader>
                  <BuyButton
                    className="snipcart-add-item"
                    data-item-id={product.node.id}
                    data-item-url={location}
                    data-item-image={product.node.data.image.localFiles[0].publicURL}
                    data-item-price={product.node.data.price}
                    data-item-description={product.node.data.description}
                    data-item-name={product.node.data.name}
                  >
                    Add to cart
                  </BuyButton>
          </ProductCard>
        ))}
      </ProductRow>
      </Container>
    </>
  );
}

export const query = graphql`
  {
    allAirtable(filter: {table: {eq: "registry"}}) {
      edges {
        node {
          id
          data {
            image {
              localFiles {
                publicURL
                childImageSharp {
                  gatsbyImageData(
                    layout: CONSTRAINED, 
                    aspectRatio: 0.875, 
                    backgroundColor: "transparent", 
                    quality: 100,
                    transformOptions: {
                      fit: CONTAIN,
                      trim: 30
                    }
                  )
                }
              }
            }
            price
            name
            purchased
            category
            product_url
            description
          }
        }
      }
    }
  }
`


export default Registry