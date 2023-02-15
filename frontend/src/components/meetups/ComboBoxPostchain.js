/* eslint-disable no-use-before-define */
import React, {useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import colleges from './collegedata';

export default function ComboBoxPostChain(props) {
  const [autoselectval, setAutoselectval] = React.useState(props?.collegePostChain);
  useEffect(() => {
    localStorage.setItem("comboboxpostchain", JSON.stringify(autoselectval));
    // setAutoselectval(props?.collegePostChain?.title);
    //console.log(props?.collegePostChain?.title+ "autoselectval in postchain");
  }, [autoselectval]);

  useEffect(async() => {
    // console.log(props?.collegePostChain?.title + "colee")
    //setAutoselectval(props?.collegePostChain);
    // console.log(JSON.stringify(autoselectval.title) + " autoselectval changes in comboboxfirst");
     setAutoselectval(await JSON.parse(localStorage.getItem("firstcollege")));
   }, []);

  const handleselectChange = (event) => {
    setAutoselectval(event.target.value);
  };

  localStorage.setItem("autoselectval", JSON.stringify(autoselectval));


  return (
  


    <Autocomplete
      id="combo-box-demo"
      options={colleges }
      value={autoselectval}
      //defaultValue={'yourDefaultStringValue'}
      getOptionLabel={(option) => option?.title}
      // value={autoselectval}
      // getOptionLabel={(option) => option.title}
      style={{ width: 300 }} 
      onChange={(event, value) => setAutoselectval(value)}
      renderInput={(params) => <TextField size="small" value={"here"} {...params} label="choose a college" variant="outlined" />}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top