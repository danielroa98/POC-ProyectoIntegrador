import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    homeContainer: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      padding: '0 30px 1px 0',

      '& p': {
        marginTop: 0,
        marginBottom: '5px'
        },
    
      '& h1': {
            marginBottom: 0,
        }
    },

    'MuiDivider-root': {
        margin: 20,
    },

    recentContainer: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '1140px',
        padding: '0 30px 1px 30px',
        margin: 'auto',
    },

    recentCard: {
        margin: 10,
    }
  });