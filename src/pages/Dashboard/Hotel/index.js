import { Typography } from '@material-ui/core';
import styled from 'styled-components';
import StepContainer from '../../../components/StepContainer/StepContainer';
import StepTitle from '../../../components/StepContainer/StepTitle';
import useHotels from '../../../hooks/api/useHotel.js';
import HotelCard from '../../../components/StepContainer/HotelCard';
import OptionsContainer from '../../../components/StepContainer/OptionsContainer';
import { useState } from 'react';

export default function Hotel() {
  const [ selectedHotel, setSelectedHotel ] = useState(null);
  const { hotels } = useHotels();

  return (
    <>
      <StyledTypography variant="h4">Escolha de hotel e quarto</StyledTypography>
      <StepContainer>
        <StepTitle>Primeiro, escolha seu hotel</StepTitle>
        <OptionsContainer>
          { hotels?.map((h) => <HotelCard key={h.id} hotelInfo={h} selectedCard={selectedHotel} setSelectedCard={setSelectedHotel} />) }
        </OptionsContainer>
      </StepContainer>
    </>
  );
}

const StyledTypography = styled(Typography)`
  margin-bottom: 20px!important;
`;
