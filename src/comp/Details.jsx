import React, { useState } from 'react'
import './Details.css'

function Details() {
    const [Dt,setDt]=useState("")
    const [response,setResponse]=useState()
    const [err,setErr]=useState(false)
    const [loading,setLoading]=useState(false)
    
    function formatDate(dateG){
        const [year,month,day]=dateG.split('-')
        const monthName=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
        let formatDate=`${day}-${monthName[parseInt(month-1)]}-${year}`
        return formatDate
    }


    async function handleClick() {
        setLoading(true)
        const FDate=formatDate(Dt)
        const data = {date:FDate}
        try {
            const res = await fetch("http://localhost:4000/find",{
                method:"POST",
                headers:{ "Content-Type": "application/json" },
                body:JSON.stringify(data)
            })
            const ans = await res.json()
            console.log(ans)
            setResponse(ans)
            console.log("Success") 
            setLoading(false)
            setErr(false)           

        } catch (error) {
            console.log("Error ",error)
            setErr(true)
        }
    }
  return (
    <div className='container'>
        <div className="input">
            <label htmlFor="date">Enter Date from which you want the records: </label>
            <input id='datePicker' type="date" name="date"  value={Dt} onChange={(e)=>{setDt(e.target.value)}} />
            <br />
           
            <button id='sbtn'onClick={handleClick}>Submit</button>
        </div>
        <div className="load">
          {loading && response ? (
            <div>Loading..</div>
          ):(
            <div></div>
          )}
        </div>
        <div className="output">
            {response  && !loading? (
                <div className="show">
                     Since {formatDate(Dt)} -
                    <div id='item'>Total Spent:{response.Total}Rs</div>
                    <div id='item'> Spent at Nescafe:{response.Nescafe}Rs</div>
                    <div id='item'>Spent at Night Canteen:{response.NC}Rs</div>
                    <div id='item'> Spent at Amul:{response.Amul}Rs</div>
                    <div id='item'>Spent at Gupta:{response.Gupta}Rs</div>
                   
                    
                </div>
            ):( 
                <div>
                    
                </div>
                
            )}
        </div>
        <div className="error">
            {err ? (
                <div>Unable To fetch</div>
            ):(
                <div></div>
            )}
        </div>
     
    </div>
  )
}

export default Details
