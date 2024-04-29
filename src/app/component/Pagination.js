import { Pagination, Stack } from "@mui/material"
import { useState } from "react"
export default function pagnation(params){
    
    const handleChange = (event, value) => {
        params.setPage(value);
      };
    return (
        <Stack alignItems='center'><Pagination page={params.page} onChange={handleChange}  sx={{
           ' & .MuiPaginationItem-root':{
            color:'#fff'
            },
            '& .Mui-selected': {
                backgroundColor: 'blue !important'
            }
        }} count={params.count} /></Stack>
    )
}