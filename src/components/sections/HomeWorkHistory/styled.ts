import styled from "styled-components";

export const WorkHistoryWrapper = styled.div`
  z-index: 1;
  filter: url("#goo");
  @media screen and (max-width: 900px) {
    filter: none;
    display: flex;
    flex-direction: column;
    & .fullstoryWrapper {
      order: 2;
    }
    & .works-list {
      order: 1;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
  @media screen and (max-width: 450px) {
    & .works-list {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      & > div:last-child {
        grid-column: span 2;
      }
    }
  }
`;

export const StyledFullStory = styled.div`
  filter: url("#goo");
  padding: 20px 30px;
  border-radius: var(--border-radius) 0px 0px var(--border-radius);
  border-radius: var(--border-radius);
  background: var(--workstory-card-background);
  transition: all 0.2s ease-in-out;
  & h4 {
    font-weight: 800;
    margin-bottom: 10px;
    font-size: 20px;
  }
  & .fullStoryContent {
    font-size: 16px;
    padding: 10px 0px;
    & .fullStoryText {
      padding: 10px 0px;
      p {
        margin-bottom: 20px;
      }
      & ul {
        padding: 10px;
        & > li {
          list-style-position: inside !important;
          list-style: disc;
          padding: 8px 0px;
          &::marker {
            margin-right: 3px !important;
          }
        }
      }
    }
    & .technicalSkils {
      font-size: 16px;
      padding: 10px 0px;
      & .tagItem {
        font-size: 14px;
      }
    }
  }
  @media screen and (max-width: 900px) {
    filter: none;
    order: 2;
    padding: 20px;
    & h4 {
      font-size: 16px;
    }
    & .fullStoryContent {
      padding: 0px;
      font-size: 14px;
      line-height: 18px;
      & .fullStoryText {
        padding: 0px;
        & ul {
          padding: 5px 0px;
          li {
            padding: 4px 0px;
          }
        }
      }
    }
  }
`;

export const StyledJobItem = styled.div`
  border-radius: var(--border-radius);
  padding: 20px 30px;
  transition: all 0.2s ease-in-out;
  border: 1px solid var(--grey-transparent);
  height: 115px;
  filter: none;
  &.workActive {
    margin-left: -45px;
    background: var(--workstory-card-background);
    transition: all 0.2s ease-in-out;
    border-color: var(--workstory-card-background);
  }
  & > span {
    margin-left: auto;
  }
  & .shortName {
    h5 {
      font-family: var(--font-bebas);
      font-size: 28px;
      line-height: 20px;
    }
    span {
      font-size: 16px;
    }
  }
  @media screen and (max-width: 900px) {
    filter: none;
    flex-direction: column;
    align-items: baseline;
    padding: 15px;
    border-radius: 15px;
    height: auto;
    & > span {
      margin-left: 0px;
      font-size: 14px;
    }
    &.workActive {
      margin-left: 0px;
    }
    & .shortName {
      h5 {
        font-family: var(--font-bebas);
        font-size: 22px;
        line-height: 20px;
      }
      span {
        font-size: 14px;
      }
    }
  }
`;
