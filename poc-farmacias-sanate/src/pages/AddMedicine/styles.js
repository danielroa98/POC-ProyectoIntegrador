import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
    
    paperContainer: {
        padding: '0 30px 1px 0',
        display: 'flex',
        justifyContent: 'center',
        margin: 20,
      },
    
    formContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10px',
        flexDirection: 'column',
        alignItems: 'center',
    },

    inputs: {
        margin: '10px 0 10px 0'
    },

    paperForm: {
        background: 'linear-gradient(140deg, #edf3ff 30%, #b9c7dd 90%)',
        width: '500px'

    }
});