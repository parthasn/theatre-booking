import React, {useEffect, useState} from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import styles from './Theatre.module.css';
import { createServer } from "miragejs";
import uuid from 'react-uuid';

let seatArr = []
let row = 'A';
let price = 100;
for(let i = 0; i < 5; i++){
    
    for(let j = 0; j < 15; j++){
        let obj ={}
        obj["id"] = uuid()
        obj["seat_row"] = row
        obj["seat_number"] = j+1
        obj["price"] = price
        obj["isBooked"] = false
        obj["background"] = "white"
        
        
        seatArr.push(obj)
    }
    price = price + 50;
    row = String.fromCharCode(row.charCodeAt() + 1)
}

createServer({
    routes() {
      this.get("/api/seats", () => seatArr)
    },
  })


function Theatre() {

    const [ seats, setSeats ] = useState(JSON.parse(localStorage.getItem('seatData')) || []);
    const [ booked, setBooked ] = useState(false);
    // const [ bookedSeats, setBookedSeats ] = useState([]);

useEffect(() => {
    fetch("/api/seats")
        .then((res) => res.json())
        .then((json) => {
            // console.log(json)
            if(seats.length === 0){
                setSeats(json)
            }
            
        })

        let seatData = JSON.parse(localStorage.getItem('seatData'))
        setSeats(seatData)
        

}, [])

const handleClick = (id) => {
    setBooked(!booked)
    let bookedArr  = []
    for(let i = 0; i < seats.length; i++){
       if(seats[i].id === id){
           console.log("inside if 1")
            seats[i].isBooked = booked
            seats[i].background = booked ? 'green' : 'white'
            
        }
        if(seats[i].isBooked){
            console.log("inside if 2")
            bookedArr.push(seats[i])
            localStorage.setItem('bookedArr', JSON.stringify(bookedArr))
        }

        if(!seats[i].isBooked && bookedArr.includes(seats[i])){
            console.log("inside else if 1", seats[i])
            let index = bookedArr.indexOf(seats[i])
            // console.log(index)
            bookedArr.splice(index, 0)
            localStorage.setItem('bookedArr', JSON.stringify(bookedArr))
            if(bookedArr.length === 1){
                bookedArr.shift()
                localStorage.setItem('bookedArr', JSON.stringify(bookedArr))
            }
        }
   }
   localStorage.setItem('seatData', JSON.stringify(seats))

   let seatData = JSON.parse(localStorage.getItem('seatData'))
    setSeats(seatData)
    
}
    return (
            <Box
                sx={{
                    background: '#c4ddf5',
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    '& > :not(style)': {
                    m: 5,
                    width: '95vw',
                    height: '90vh',
                    },
                }}
            >
                <Paper  style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} elevation={5}>
                    <p>All eyes this way please!! </p>
                    <div className={styles.screen}></div>
                    <div className={styles.seatDiv}>
                    {
                        seats && seats.map((seat, id) => {
                            return(
                                <div  key={id}>
                                    {
                                        seat.seat_row === 'A' ? (
                                        <div style ={{background: seat.background}} id = {seat.id} onClick = {()=>handleClick(seat.id)} className={styles.seats}>{seat.seat_number}</div>
                                        )
                                        :
                                        null
                                    }
                            </div>
                            )
                            
                        })
                    }
                    </div>
                    <div className={styles.seatDiv}>
                    {
                        seats && seats.map((seat, id) => {
                            return(
                                <div  key={id}>
                                    {
                                        
                                        seat.seat_row === 'B' ? (
                                            <div style ={{background: seat.background}} id = {seat.id} onClick = {()=>handleClick(seat.id)} className={styles.seats}>{seat.seat_number}</div>
                                        )
                                        : null
                                    }
                            </div>
                            )
                            
                        })
                    }
                    </div>
                    <div className={styles.seatDiv}>
                    {
                        seats && seats.map((seat, id) => {
                            return(
                                <div  key={id}>
                                    {
                                        
                                        seat.seat_row === 'C' ? (
                                            <div style ={{background: seat.background}} id = {seat.id} onClick = {()=>handleClick(seat.id)} className={styles.seats}>{seat.seat_number}</div>
                                        )
                                        :
                                        null
                                    }
                            </div>
                            )
                            
                        })
                    }
                    </div>
                    <div className={styles.seatDiv}>
                    {
                        seats && seats.map((seat, id) => {
                            return(
                                <div  key={id}>
                                    {
                                        
                                        seat.seat_row === 'D' ? (
                                            <div style ={{background: seat.background}} id = {seat.id} onClick = {()=>handleClick(seat.id)} className={styles.seats}>{seat.seat_number}</div>
                                        )
                                        :
                                        null
                                    }
                            </div>
                            )
                            
                        })
                    }
                    </div>
                    <div className={styles.seatDiv}>
                    {
                        seats && seats.map((seat, id) => {
                            return(
                                <div  key={id}>
                                    {
                                        
                                        seat.seat_row === 'E' ?(
                                            <div style ={{background: seat.background}} id = {seat.id} onClick = {()=>handleClick(seat.id)} className={styles.seats}>{seat.seat_number}</div>
                                        ): null
                                    }
                            </div>
                            )
                            
                        })
                    }
                    </div>

                    
                </Paper>
            </Box>
    )
}

export default Theatre
