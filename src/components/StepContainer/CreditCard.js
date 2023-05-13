// import React, { useEffect } from 'react';
// import Cards from 'react-credit-cards';
// import 'react-credit-cards/es/styles-compiled.css';
// import styled from 'styled-components';
import StepContainer from './StepContainer';
import Button from '../Form/Button';
// import { getTicket } from '../../services/ticketAPI';

// export default class PaymentForm extends React.Component {
//   state = {
//     cvc: '',
//     expiry: '',
//     focus: '',
//     name: '',
//     number: '',
//     issuer: '',
//   };

//   handleCallback = ({ issuer }, isValid) => {
//     this.setState({ issuer: issuer });
//   }

//   handleInputFocus = (e) => {
//     this.setState({ focus: e.target.name });
//   }

//   handleInputChange = (e) => {
//     const { name, value } = e.target;

//     this.setState({ [name]: value });
//   }

//   // eslint-disable-next-line space-before-function-paren
//   handleSubmit = async (e) => {
//     alert('pagando');
//     const ticket = await getTicket();
//   }

//   render() {
//     return (
//       <>
//         <CardContainer id="PaymentForm">
//           <Cards
//             cvc={this.state.cvc}
//             expiry={this.state.expiry}
//             focused={this.state.focus}
//             name={this.state.name}
//             number={this.state.number}
//             callback={this.handleCallback}
//           />
//           <form>
//             <div>
//               <input
//                 type="tel"
//                 name="number"
//                 placeholder="Card Number"
//                 onChange={this.handleInputChange}
//                 onFocus={this.handleInputFocus}
//               />
//               E.g.:49..., 51..., 36..., 37...
//             </div>
//             <input
//               type="tel"
//               name="name"
//               placeholder="Name"
//               onChange={this.handleInputChange}
//               onFocus={this.handleInputFocus}
//             />
//             <div>
//               <input
//                 type="tel"
//                 name="expiry"
//                 placeholder="Valid Thru"
//                 onChange={this.handleInputChange}
//                 onFocus={this.handleInputFocus}
//               />
//               <input
//                 type="tel"
//                 name="cvc"
//                 placeholder="CVC"
//                 onChange={this.handleInputChange}
//                 onFocus={this.handleInputFocus}
//               />
//             </div>
//           </form>
//         </CardContainer>
//         <StepContainer>
//           <Button onClick={this.handleSubmit} type="submit">
//             FINALIZAR PAGAMENTO
//           </Button>
//         </StepContainer>
//       </>
//     );
//   }
// };
import { useState } from 'react';
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import styled from 'styled-components';
import usePayment from '../../hooks/api/usePayment';
import { toast } from 'react-toastify';
import useToken from '../../hooks/useToken';
import { getTicket } from '../../services/ticketAPI';

export default function PaymentForm({ nam, ticketId, setResume }) {
  const token = useToken();
  const { paymentProcess } = usePayment();

  const [number, setNumber] = useState('');
  const [name, setName] = useState(nam);
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [focus, setFocus] = useState('');
  const [issuer, setIssuer] = useState('');

  function handleCallback({ issuer, isValid }) {
    setIssuer(issuer);
  }

  // eslint-disable-next-line space-before-function-paren
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (number === '' || name === '' || expiry === '' || cvc === '') return toast('Preencha todos os dados corretamente');

    const body =
    {
      ticketId,
      cardData: {
        issuer,
        number,
        name,
        expirationDate: expiry,
        cvv: cvc
      }
    };
    try {
      await paymentProcess(token, body);
      const ticket = await getTicket(token);
      setResume(ticket);
    } catch (error) {
      toast(error.message);
    };
  };

  return (
    <>
      <CardContainer>
        <Cards
          cvc={cvc}
          expiry={expiry}
          focused={focus}
          name={name}
          number={number}
          callback={handleCallback}
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
      <StepContainer>
        <Button onClick={(e) => handleSubmit(e)} type="submit">
          FINALIZAR PAGAMENTO
        </Button>
      </StepContainer>
    </>
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
