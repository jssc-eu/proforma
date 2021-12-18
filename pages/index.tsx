import { useEffect, useState, useContext } from 'react'
import { useFetchUser } from 'lib/user'
import auth0 from 'lib/auth0'
import Grid from '@mui/material/Grid'

import Login from 'components/login'
import User from 'components/user'
import Tito from 'components/tito'
import Company from 'components/company'
import Tickets from 'components/tickets'
import LineItems from 'components/lineitems'
import Sum from 'components/sum'

import { ProformaContext } from 'lib/ui/context'

function HomePage({user}) {
    const [ event, setEvent ] = useState({})
    const [ company, setCompany ] = useState({})
    const [ tickets, setTickets ] = useState([])
    const [ lineItems, setLineItems ] = useState([])
    const [ discount, setDiscount ] = useState(0)

    const context = {
      event,
      setEvent,
      company,
      setCompany,
      tickets,
      setTickets,
      lineItems,
      setLineItems,
      discount,
      setDiscount,
    }

    const removeLineItem = (id) => {
      setLineItems(lineItems.filter(item => item.id !== id))
    }

    const onSend = () => {}


    return (
        <>
        {!user && (
          <Login />
        )}
        {user && (
          <ProformaContext.Provider value={ context }>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <User user={user} />
                <Tito />
                <Company />
            </Grid>
            <Grid item xs={12} md={8}>
              <Tickets />
              <LineItems
                removeLine={ removeLineItem }
              />
              <Sum
                send={ onSend }
              />
            </Grid>
          </Grid>
          </ProformaContext.Provider>
        )}
      </>
    )
}

export default HomePage

export async function getServerSideProps({ req, res }) {
  // Here you can check authentication status directly before rendering the page,
  // however the page would be a serverless function, which is more expensive and
  // slower than a static page with client side authentication
  const session = await auth0.getSession(req, res)

  if (!session || !session.user) {

    return { props: { user: null } }
  }

  return { props: { user: session.user } }
}
