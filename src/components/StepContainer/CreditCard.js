import { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';

export default function PaymentForm() {
  const [number, setNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');

  return (
    <CardContainer>
      <Cards
        cvc={cvc}
        expiry={expiry}
        focused={focus}
        name={name}
        number={number}
      />
      <form>
        <div>
          <input
            type="tel"
            name="number"
            val={number}
            placeholder="Card Number"
            onChange={e => setNumber(e.target.value)}
            onFocus={e => setFocus(e.target.name)}
          />
          E.g.:49..., 51..., 36..., 37...
        </div>
        <input
          type="tel"
          name="name"
          value={name}
          placeholder="Name"
          onChange={e => setName(e.target.value)}
          onFocus={e => setFocus(e.target.name)}
        />
        <div>
          <input
            type="tel"
            name="expiry"
            value={expiry}
            placeholder="Valid Thru"
            onChange={e => setExpiry(e.target.value)}
            onFocus={e => setFocus(e.target.name)}
          />
          <input
            type="tel"
            name="cvc"
            value={cvc}
            placeholder="CVC"
            onChange={e => setCvc(e.target.value)}
            onFocus={e => setFocus(e.target.name)}
          />
        </div>
      </form>

    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;

  width: 70%;

  >form {
    display: flex;
    flex-direction: column;
    align-items: left;
    justify-content: space-around;
    width: 50%;
    margin-left: 30px;
    color: gray;

    >:nth-child(1){
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      width: 100%;
      height: 60px;
      
      >input {
        border:solid 1px gray;
        border-radius: 5px;
        padding: 10px;
        width: 100%;
        height: 40px;
        font-size: 18px;
        :focus{
          outline: none;
          border: solid 1px black;
        }
      }
    }

    >input {
      border:solid 1px gray;
      border-radius: 5px;
      padding: 10px;
      width: 100%;
      height: 40px;
      font-size: 18px;
      :focus{
          outline: none;
          border: solid 1px black;
      }
    }

    >:nth-child(3){
      display: flex;
      justify-content: space-between;
      height: 40px;

      >:nth-child(1){
        border:solid 1px gray;
        border-radius: 5px;
        padding: 10px;
        width: 60%;
        font-size: 18px;
        :focus{
          outline: none;
          border: solid 1px black;
        }
      }
      >:nth-child(2){
        border:solid 1px gray;
        border-radius: 5px;
        padding: 10px;
        width: 30%;
        font-size: 18px;
        :focus{
          outline: none;
          border: solid 1px black;
        }
      }
    }
  }
`;
