import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Login ({ }) {
  return (
    <Container maxWidth="sm">
      <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          JSSC
        </Typography>
        <Typography variant="h5" component="div">
          Pro-forma invoice creator
        </Typography>

      </CardContent>
      <CardActions>
        <Button size="small" href="/api/auth/login">
          Login
        </Button>
      </CardActions>
    </Card>
    </Container>
  );
}
