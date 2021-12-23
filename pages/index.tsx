import { useState } from 'react';

import auth0 from 'lib/auth0';
import Grid from '@mui/material/Grid';

import Login from 'components/login';
import User from 'components/user';
import Tito from 'components/tito';
import Company from 'components/company';
import Tickets from 'components/tickets';
import LineItems from 'components/lineitems';
import Sum from 'components/sum';
import Progress from 'components/progress';

import { ProformaContext } from 'lib/ui/context';

function HomePage({ user }) {
    const [event, setEvent] = useState({
      slug: '',
      title: ''
    });
    const [company, setCompany] = useState({
      companyName: 'asd',
      taxNumber: 'asd',
      city: 'asd',
      address: 'asd',
      zip: 'asd',
      countryCode: 'HU',
      country: 'Hungary',
    });
    const [tickets, setTickets] = useState([]);
    const [lineItems, setLineItems] = useState([]);
    const [discount, setDiscount] = useState(0);

    const [working, setWorking] = useState(false);
    const [loading, setLoading] = useState(false);
    const [invoiceId, setInvoiceId] = useState('');

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
    };

    const removeLineItem = (id) => {
      setLineItems(lineItems.filter(item => item.id !== id));
    };

    const onSend = async () => {
      setWorking(true)
      setLoading(true)

      const response = await fetch('/api/proforma', {
        method: 'POST',
        body: JSON.stringify({
          event,
          partner: context.company,
          lineItems: context.lineItems.map((item) => {
            item.price = item.itemPrice - (item.itemPrice * item.discount / 100);
            return item;
          }),
        }),
      });

      const invoiceId = await response.text()

      setInvoiceId(invoiceId)
      setLoading(false)
    };


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
                <Company data={company} />
            </Grid>
            <Grid item xs={12} md={8}>
              <Tickets />
              <LineItems
                lineItems={ lineItems }
                removeLine={ removeLineItem }
              />
              <Sum
                lineItems={ lineItems }
                company={company}
                send={ onSend }
              />
            </Grid>
          </Grid>
          <Progress
            open={working}
            loading={loading}
            invoiceId={invoiceId}
            eventId={event.slug}
            onClose={ () => {
              setWorking(false)

            } }
          />
          </ProformaContext.Provider>
        )}
      </>
    );
}

export default HomePage;

export async function getServerSideProps({ req, res }) {
  const session = await auth0.getSession(req, res);

  if (!session || !session.user) {
    return { props: { user: null } };
  }

  return { props: { user: session.user } };
}
