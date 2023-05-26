import dayjs from 'dayjs';
import styled from 'styled-components';
import { IconContext } from 'react-icons';
import { GiExitDoor } from 'react-icons/gi';
import { VscError } from 'react-icons/vsc';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import useToken from '../../hooks/useToken';
import { toast } from 'react-toastify';
import { delUserActivity, getUserActivities, schedulingActivity } from '../../services/activitiesApi';
import { useEffect, useState } from 'react';

export default function Local({ name, startsAt, endsAt, activities }) {
  const token = useToken();
  const [userList, setUserList] = useState(null);

  async function attList() {
    const list = await getUserActivities(token);
    let aux = [];

    list.forEach(l => {
      aux.push(l.activityId);
    });

    setUserList(aux);
  }

  // eslint-disable-next-line space-before-function-paren
  useEffect(async () => {
    await attList();
  }, []);

  async function handleScheduling(activity) {
    if (userList.includes(activity.id)) {
      // eslint-disable-next-line no-restricted-globals
      if (confirm('Deseja remover sua inscrição?')) {
        try {
          await delUserActivity(token, activity.id);
          await attList();
          return toast('Inscrição removida');
        } catch (error) {
          return toast('Não foi possível realizar essa ação');
        }
      }
    };

    try {
      const list = await getUserActivities(token);

      let check = false;
      list.forEach(l => {
        if (l.startsAt.slice(11, 16) === activity.startsAt.slice(11, 16)) check = true;
      });

      if (check) return toast('Você já tem algo reservado para esse horário');
    } catch (error) {

    }

    if (activity.availableSeats <= 0) return toast('Não temos mais vagas disponíveis para essa atividade :(');
    try {
      await schedulingActivity(token, activity.id, activity.startsAt);
      await attList();
      toast('Inscrição realizada com sucesso');
    } catch (error) {
      toast('Não foi possível realizar a inscrição');
    }
  }
  return (
    <LocalContainer>
      <h1>{name}</h1>
      <Location>
        {userList ?
          activities.map((ac) => (
            <Activity color={userList.includes(ac.id) ? '#D0FFDB' : '#F1F1F1'} key={ac.id} time={Number(ac.endsAt.slice(11, 13)) - Number(ac.startsAt.slice(11, 13))}>
              <div>
                <h1>{ac.name}</h1>
                <p>{ac.startsAt.slice(11, 16)} - {ac.endsAt.slice(11, 16)}</p>
              </div>
              <div onClick={() => handleScheduling(ac)}>
                {userList.includes(ac.id) ?
                  <IconContext.Provider value={{ color: 'green', className: 'global-class-name', size: '2em' }}>
                    <div>
                      <AiOutlineCheckCircle />
                    </div>
                  </IconContext.Provider> :
                  ac.availableSeats > 0 ?
                    <IconContext.Provider value={{ color: 'green', className: 'global-class-name', size: '2em' }}>
                      <div>
                        <GiExitDoor />
                      </div>
                    </IconContext.Provider> :
                    <IconContext.Provider value={{ color: 'red', className: 'global-class-name', size: '2em' }}>
                      <div>
                        <VscError />
                      </div>
                    </IconContext.Provider>
                }
                {userList.includes(ac.id) ? 'Inscrito' :
                  <Seats color={ac.availableSeats > 0 ? 'green' : 'red'}>
                    {ac.availableSeats > 0 ? ac.availableSeats + ' vagas' : 'Esgotado'}
                  </Seats>
                }
              </div>
            </Activity>
          )) :
          'Loading...'
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
    display: flex;
    justify-content: space-between;

    width: 265px;
    height: ${props => props.time === 2 ? '160px' : '80px'};
    font-size: 12px;
    font-weight: 700;
    line-height: 14px;
    background-color: ${props => props.color};
    padding-left: 10px;
    border-radius: 5px;

    >:nth-child(2) {
      cursor: pointer;
      height: 80%;

      margin: auto 0;

      border-left: 3px solid lightgray;

      display: flex;
      flex-direction: column;
      width: 65px;

      align-items: center;
      justify-content: center;

      color: green;
    }

    && h1 {
        margin-top: 12px;
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

const Seats = styled.div`
  font-size: 10px;
  color: ${props => props.color};
  `;
