import React, { Component } from 'react'
import 'semantic-ui-css/semantic.min.css'
import { Container } from 'semantic-ui-react'

import Header from './Header'
//component where we can add anything to the head of component
import Head from 'next/head'

const Layout = (props) => {
  return (
    <Container>
      <Header />
      <div>{props.children}</div>
    </Container>
  )
}
export default Layout
