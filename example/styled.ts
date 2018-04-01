import styled from 'styled-components';

export const AppWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

export const CircleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #e1e3e6;
  border-radius: 3px;
  height: 170px;
  width: 200px;
  overflow: hidden;
`;

export const CustomImg = styled.img`
  width: 100%;
`;

export const ExampleWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;