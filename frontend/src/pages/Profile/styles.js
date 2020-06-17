import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 600px;
  margin: 10px auto;
  padding: 0 50px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    input {
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      width: 100%;
      height: 44px;
      padding: 0 15px;
      color: #fff;
      margin: 0 0 10px;
      position: relative;
      right: 0;
      transition: 0.5s;

      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
      }

      &:focus,
      &:hover {
        width: calc(100% + 50px);
        right: ${50 / 2}px;
        transition: width right 0.5s;
      }
    }

    hr {
      border: 0;
      height: 1px;
      background: rgba(255, 255, 255, 0.2);
      margin: 5px 0 15px;
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
      width: 100%;
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
        background: ${darken(0.07, '#3b9eff')};
        width: calc(100% + 50px);
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

  > button {
    margin: 5px 0 0;
    width: 100%;
    height: 44px;
    background: #f64c75;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 4px;
    font-size: 16px;
    transition: 0.4s;
    position: relative;
    right: 0;

    &:hover {
      background: ${darken(0.08, '#F64c75')};
      width: calc(100% + 50px);
      right: ${50 / 2}px;
      transition: width right background 0.5s;
    }
  }
`;
