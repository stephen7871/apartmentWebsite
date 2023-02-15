/* eslint-disable no-use-before-define */
import React, {useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import tagData from './tagData';
import { Button } from '@material-ui/core';
export default function TagBox(props) {
  const [autoselectval, setAutoselectval] = React.useState('');
  const [tagList, setTagList] = React.useState([]);
  useEffect(() => {
    console.log(JSON.stringify(autoselectval.tag) + " autoselectval");
  }, [autoselectval]);

  

  const handleselectChange = (event) => {
    setAutoselectval(event.target.value);
  };

  localStorage.setItem("TagBox", JSON.stringify(autoselectval));


  return (
  

<div>
    <Autocomplete
      id="combo-box-demo"
      options={tagData}
      value={autoselectval}
      getOptionLabel={(option) => option.tag}
      style={{ width: 300, position:'relative', zIndex:'0' }}

      onChange={(event, value) =>{

        setTagList([...tagList, value])
        setAutoselectval(value)
      }}
      renderInput={(params) => <TextField size="small" {...params} label="choose a tag" variant="outlined" />}
    />
    <div>
    {tagList?.map((tag) => {
        return (
        <div>{tag?.tag}</div>);
    
    })}
    </div>

    </div>
  );
}