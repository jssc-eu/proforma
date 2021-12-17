import { useEffect, useState, useContext } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import { ProformaContext } from 'lib/ui/context'

const AccountSelector = ({ accounts, value, onChange, disabled}) => {
  return (
    <FormControl fullWidth disabled={disabled} sx={{
      marginTop: 2
    }}>
        <InputLabel id="tito-account-label">Account</InputLabel>
        <Select
          labelId="tito-account-label"
          id="tito-account"
          value={ value }
          label="Account"
          onChange={ onChange }
        >
          { accounts.map(account => (<MenuItem
            key={account}
            value={account}>
              {account}
            </MenuItem>
          )) }
        </Select>
      </FormControl>
  )
}

const EventSelector = ({events, value, onChange, disabled}) => {
  return (
    <FormControl  disabled={disabled} fullWidth sx={{
      marginTop: 2
    }}>
        <InputLabel id="tito-event-label">Event</InputLabel>
        <Select
          labelId="tito-event-label"
          id="tito-event"
          value={ value }
          defaultValue={ value }
          label="Event"
          onChange={ onChange }
        >
          { events.map(event => (
            <MenuItem
              key={event.slug}
              value={event}>
                {event.title}
            </MenuItem>
          )) }
        </Select>
      </FormControl>
  )
}

export default function Tito () {
  const [ accounts, setAccounts ] = useState([])
  const [ account, setAccount ] = useState('') // get default from localstorage
  const [ events, setEvents ] = useState([])
  const [ event, setEvent ] = useState({})// get default from localstorage

  const context = useContext(ProformaContext);

  useEffect(() => {
    fetch('/api/tito/accounts')
      .then(req => req.json())
      .then(accounts => {
        console.log(accounts)
        setAccounts(accounts)
        setAccount(accounts[0] || '') // if empty
      })
  }, [])

  useEffect(() => {
    fetch(`/api/tito/account/${account}/events`)
      .then(req => req.json())
      .then(events => {
        console.log(events)
        setEvents(events)
        setEvent(events[0] || {}) // if empty
      })
  }, [account])

  useEffect(() => {
    fetch(`/api/tito/account/${account}/event/${event.slug}/tickets`)
      .then(req => req.json())
      .then(tickets => {
        console.log(tickets)

        context.setTickets(tickets)



      })
  }, [event])

  return (
    <>
      <AccountSelector
        accounts={accounts}
        value={account}
        disabled={ accounts.length == 0 }
        onChange={ (event) => setAccount(event.target.value) }
      />
      <EventSelector
        events={events}
        value={event}
        disabled={ events.length == 0 }
        onChange={ (event) => setEvent(event.target.value) }
      />
    </>
  )
}
