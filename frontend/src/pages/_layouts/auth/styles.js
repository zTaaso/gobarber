import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: linear-gradient(-90deg, #7159c1, #ab59c1);

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 315px;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    padding: 0 50px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      width: 215px;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 5px;
      position: relative;
      right: 0;
      transition: 0.5s;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }

      &:focus,
      &:hover {
        width: ${215 + 50}px;
        right: ${50 / 2}px;
        transition: width right 0.5s;
      }
    }

    span {
      color: #fb6f91;
      font-size: 13px;
      margin: 0 0 10px;

      svg {
        position: relative;
        top: 5px;
        left: 5px;
      }
    }

    button {
      margin: 5px 0 0;
      width: 215px;
      height: 44px;
      background: #3b9eff;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: 0.4s;
      position: relative;
      right: 0;

      &:hover {
        background: ${darken(0.05, '#3b9eff')};
        width: ${215 + 50}px;
        right: ${50 / 2}px;
        transition: width right background 0.5s;
      }
    }

    a {
      color: #ddd;
      margin-top: 10px;
      opacity: 0.7;
    }

    a:hover {
      opacity: 1;
    }
  }
`;
