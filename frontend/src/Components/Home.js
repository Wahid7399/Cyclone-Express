import axios from 'axios';
import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useState, useEffect } from 'react'
import Card from './Card';

export default function Home() {
  let [state, setstate] = useState([]);


  let [pgcount, setpgcount] = useState(1);

  let [count, setcount] = useState(1);

  // let url=`https://fakse-store-api.herokuapp.com/api/v1/products?limit=20&offset=${(count*20)}`;
  let url = `http://localhost:8000/product/get/${count}`;
  useEffect(() => {
    axios.get(url).then((res) => {
      setstate(res.data.records)
      setpgcount(res.data.totalPages);
    })
  }, [url]);

  if (state == undefined || state == []) {
    return <h1>LOADING.....</h1>
  }


  const handleChange = (e, num) => {
    // setstate(data.splice((num-1)*8,8))
    setcount(num);
  };

  return (
    <>

      <div style={{ display: 'flex', flexWrap: "wrap" }}>
        {state.map((obj, i) => {
          return <Card key={i} value={obj} />
        }
        )
        }
      </div>




       {/* pagination code */}
       {state.length!=0&&
      <Stack sx={{ margin: "5px auto", alignItems: "center" }} bgcolor="grey" spacing={2}>
        <Pagination onChange={handleChange} size='large'
          count={pgcount}
          renderItem={(item) => (
            <PaginationItem
              components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
              {...item}
            />
          )}
        />
      </Stack>}



    </>
  )
}
