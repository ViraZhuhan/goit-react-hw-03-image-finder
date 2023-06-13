import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

const skeletonAnimation = keyframes`
  0% {
    background-position: -200%;
  }
  100% {
    background-position: 200%;
  }
`;

export const SkeletonList = styled.ul`
  display: grid;
  max-width: calc(100vw - 48px);
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  grid-gap: 16px;
  margin-top: 0;
  margin-bottom: 0;
  padding: 0;
  list-style: none;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    grid-template-columns: repeat(2, minmax(320px, 1fr));
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, minmax(320px, 1fr));
  }
`;
export const SkeletonCard = styled.li`
  width: 100%;
  height: 260px;
  background: #fff;
  border-radius: 5px;
  padding: 25px 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);

  .image {
    position: relative;
    width: 100%;
    object-fit: cover;
    overflow: hidden;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    background: linear-gradient(90deg, #eee 0px, #f5f5f5 40px, #eee 80px);
    background-size: 200% 100%;
    animation: ${skeletonAnimation} 1.5s ease-in-out infinite;
  }

  .content {
    padding: 20px 30px;
  }
`;
