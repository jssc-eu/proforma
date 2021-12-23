
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function User ({ user }) {
  return (
    <Card>
      <CardContent sx={{
        display: 'flex',
        alignItems: 'center',
        paddingBottom: '2.6rem',
      }}>
        <Avatar alt={user.name} src={user.picture} />
        <Typography sx={{ fontSize: 14, paddingLeft: 1 }} color="text.secondary" gutterBottom>
          Hi {user.nickname}
        </Typography>
      </CardContent>
      <CardActions>
        <Button href="/api/auth/logout" size="small">
          Logout
        </Button>
      </CardActions>
    </Card>
  );
}
