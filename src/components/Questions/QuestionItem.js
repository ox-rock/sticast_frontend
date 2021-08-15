import React from 'react';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { PieChart } from 'react-minimal-pie-chart';


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    textAlign: 'left',
    
  },
  media: {
    height: 140,
    marginTop: 25,
    marginBottom: 15,
  },
});

const defaultLabelStyle = {
  fontSize: '1rem',
  fontFamily: 'Segoe UI',
};



const QuestionItem = (props) => {
  const classes = useStyles();

  return (
    <div className="question_item">
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="#"
          title="Contemplative Reptile"
        ><PieChart
        data={[
          { title: 'Yes', value: props.yesShareQuantity, color: '#4f81bc' },
          { title: 'No', value: props.noShareQuantity, color: '#c0504e' },
        ]}
        animate={true}
        label={({ dataEntry }) => dataEntry.title}
        labelStyle={{
          ...defaultLabelStyle,
        }}
        
      /></CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          {props.text}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
            across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    
    </Card>
    </div>
  );
}


export default QuestionItem;

