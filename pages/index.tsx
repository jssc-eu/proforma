
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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import { ProformaContext } from 'lib/ui/context';

function HomePage({ user }) {
    const [event, setEvent] = useState({
      slug: '',
      title: ''
    });
    const [company, setCompany] = useState({
      companyName: '',
      taxNumber: '',
      city: '',
      address: '',
      zip: '',
      state: '',
      countryCode: 'HU',
      country: 'Hungary',
      dueDays: 8
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

    const [expanded, setExpanded] = useState('tito');

    const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : '');
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
                <Accordion expanded={expanded === 'tito'} onChange={ handleChange('tito') }>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="tito-content"
                    id="tito-header"
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                      Tito
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Account and Event settings from Tito</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Tito />
                  </AccordionDetails>
                </Accordion>
                <Accordion expanded={expanded === 'company'} onChange={ handleChange('company') }>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="company-content"
                    id="company-header"
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0 }}>
                      Buyer
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>Invoice details for the Buyer</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Company data={company} />
                  </AccordionDetails>
                </Accordion>
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
