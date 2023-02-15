/* eslint-disable no-use-before-define */
import React, {useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import colleges from './collegedata';

export default function ComboBox(props) {
  const [autoselectval, setAutoselectval] = React.useState('');
  useEffect(() => {
    console.log(JSON.stringify(autoselectval.title) + " autoselectval");
  }, [autoselectval]);

  

  const handleselectChange = (event) => {
    setAutoselectval(event.target.value);
  };

  localStorage.setItem("autoselectval", JSON.stringify(autoselectval));


  return (
  


    <Autocomplete
      id="combo-box-demo"
      options={colleges}
      value={autoselectval}
      getOptionLabel={(option) => option.title}
      style={{ width: 300, position:'relative', zIndex:'0' }}

      onChange={(event, value) => setAutoselectval(value)}
      renderInput={(params) => <TextField size="small" {...params} label="choose a college" variant="outlined" />}
    />
    
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top