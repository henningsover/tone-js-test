import styled from 'styled-components';

export const Background = styled.main`
  background-color: #02022b;
`

export const Container = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
`;

export const TrackerPageWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;
  margin: auto;
  background-color: #5f8999;


  @media(min-width: 690px) {
    padding-bottom: 20px;
    max-width: min-content;
  }

  @media (min-width: 930px) {
    display: flex;
    flex-direction: row;
    max-width: unset;
    padding: unset;
  }
`

export const RightCol = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 20px;
  background-color: #5f8999;
  max-height: 590px;
`
