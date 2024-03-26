import React, { useState } from "react"
import Cards from 'react-credit-cards-2'
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const CreditCard = (props) => {
    const [Number,setNumber] = useState('')
    const [name,setname] = useState('')
    const [Expairy,setExpairy] = useState('')
    const [CVC,setCVC] = useState('')
    const [Focus,setFocus] = useState('')
    console.log('cvc',CVC)
  return (
 
 
    <div>
      <Cards
      number={Number}
      name={name}
      expiry={Expairy}
      cvc={CVC}
      focused={Focus}

      />
      
      <h5> CraditCard Coponent</h5>
      <div className="d-flex">
      <input value={Number} placeholder='Card Number' type="tel" name='number'  onChange={e=>setNumber(e.target.value )} onFocus={e=>setFocus(e.target.name )}/>
      <input value={name} placeholder='User Name '  type="name" name='name' onChange={e=>setname(e.target.value)} onFocus={e=>setFocus(e.target.name )}/>
      <input value={Expairy }placeholder=' MM/YY Expairy'  type='tel' name='expairy' onChange={e=>setExpairy(e.target.value) } onFocus={e=>setFocus(e.target.name )}/>
      <input value={CVC}  placeholder=' CVC Code' name='cvc' type='tel' onChange={e=>setCVC(e.target.value)} onFocus={e=>setFocus(e.target.name )}/>
      </div>
    </div>
  )
};

export default CreditCard;

