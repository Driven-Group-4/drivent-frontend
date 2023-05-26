import dayjs from 'dayjs';
import styled from 'styled-components';

export default function Local({ name, startsAt, endsAt, activities }) {
  return (
    <LocalContainer>
      <h1>{name}</h1>
      <Location>
        {
          activities.map((ac) => (
            <Activity key={ac.id}>
              <h1>{ac.name}</h1>
              <p>{ac.startsAt.slice(11, 16)} - {ac.endsAt.slice(11, 16)}</p>
            </Activity>
          ))
        }
      </Location>
    </LocalContainer>
  );
}

const LocalContainer = styled.div`
    display: flex;
    flex-direction: column;
    && h1 {
        font-family: Roboto;
        font-size: 17px;
        font-weight: 400;
        line-height: 20px;
        text-align: center;
        color: #7B7B7B;
        margin-bottom: 7px;
    }
`;

const Location = styled.div`
    height: 390px;
    display: flex;
    flex-direction: column;
    align-items: center;
    // justify-content: center;
    // background-color: ${props => props.isSelected ? '#FFD37D' : '#E0E0E0'};
    // border-radius: 4px;
    gap: 10px;
    padding: 12px;
    border: 1px solid #D7D7D7;
    // width: 130px;
    // height: 40px;
    // box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    // cursor: pointer;
`;

const Activity = styled.div`
    width: 265px;
    height: ${props => props.time === 2 ? '160px' : '80px'};
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    background-color: #F1F1F1;
    padding-top: 12px;
    padding-left: 10px;
    border-radius: 5px;
    && h1 {
        font-size: 12px;
        font-weight: 700;
        line-height: 14px;
        text-align: left;
        color: #343434;
    }
    && p {
        font-size: 12px;
        font-weight: 400;
        line-height: 14px;
        text-align: left;
    }
`;
