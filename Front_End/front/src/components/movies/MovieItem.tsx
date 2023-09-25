import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import styled from "styled-components";
import Text from "../atoms/Text";
import {
  FlexCenter,
  FlexColBetween,
  FlexRowBetween,
} from "../../commons/style/SharedStyle";
import HashTag from "../atoms/HashTag";
import Btn from "../atoms/Btn";

const MovieItem = ({ ...props }) => {
  const navigate = useNavigate();

  const [likeStatus, setLikeStatus] = useState(false);
  const [recommendStatus, setRecommendStatus] = useState(false);

  // 재목 누르면 영화 상세페이지로 이동
  const handleTitleClick = (movieId: number) => {
    navigate(`/movie/${movieId}`);
  };

  const handleLikePush = () => {
    if (likeStatus === false) {
      console.log("좋아요 버튼을 눌렀어요");
      setLikeStatus(true);
      // 여기에 좋아요 버튼 눌렀을 때, axios 요청
    } else if (likeStatus === true) {
      console.log("좋아요 취소 버튼을 눌렀어요");
      setLikeStatus(false);
      // 여기에 좋아요 취소 버튼 눌렀을 때, axios 요청
    }
  };

  const handleRecommendPush = () => {
    if (recommendStatus === false) {
      console.log("추천받지 않을래요 버튼을 눌렀어요");
      setRecommendStatus(true);
      // 여기에 추천받지 않을래요 버튼 눌렀을 때, axios 요청
    } else if (recommendStatus === true) {
      console.log("다시 추천해주세요 버튼을 눌렀어요");
      setRecommendStatus(false);
      // 여기에 다시 추천해주세요 버튼 눌렀을 때, axios 요청
    }
  };
  return (
    <StyledCardWrapper>
      <StyledMoviePoster src={props.src} />
      {/* hover이거나 focus가 되어있을 때 적용시킬 부분 */}
      <StyledCardHover>
        <StyledDetailOut>
          {/* focus가 되어있을 때는 Large / 아닐 때는 Medium */}
          <StyledTitle
            size="Large"
            color="White"
            fontFamily="PyeongChang-Bold"
            onClick={() => handleTitleClick(props.movieId)}
          >
            제목
          </StyledTitle>
          <Text size="Small" color="White" fontFamily="YESGothic-Regular">
            평점4.0
          </Text>
          <Text size="Small" color="White" fontFamily="YESGothic-Regular">
            러닝타임
          </Text>
          <StyledDetailInCol>
            <StyledDetailInRow>
              {/* for문 적용하기 (데이터 어떻게 오는지 확인 후) */}
              <HashTag size="Standard" color="WhiteGhost">
                # 키워드
              </HashTag>
              <HashTag size="Standard" color="WhiteGhost">
                # 키워드
              </HashTag>
              <HashTag size="Standard" color="WhiteGhost">
                # 키워드
              </HashTag>
            </StyledDetailInRow>
          </StyledDetailInCol>
          <StyledDetailInCol>
            {likeStatus === false ? (
              <Btn size="Circle" color="White" onClick={handleLikePush}>
                💖
              </Btn>
            ) : (
              <Btn size="Circle" color="White" onClick={handleLikePush}>
                ✅
              </Btn>
            )}
            {recommendStatus === false ? (
              <Btn size="X-Small" color="Black" onClick={handleRecommendPush}>
                추천받지 않을래요
              </Btn>
            ) : (
              <Btn size="X-Small" color="White" onClick={handleRecommendPush}>
                다시 추천해주세요
              </Btn>
            )}
          </StyledDetailInCol>
        </StyledDetailOut>
      </StyledCardHover>
    </StyledCardWrapper>
  );
};

export default MovieItem;

/** 영화 포스터 Img 스타일 */
export const StyledMoviePoster = styled.img`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
`;

/** hover 혹은 focus일 때 영화 정보 */
const StyledCardHover = styled.div`
  ${FlexCenter}
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  padding: 0.75rem;
  box-sizing: border-box;

  position: absolute;
  top: 0;
  left: 0;

  opacity: 0; // 초기 상태에서 숨김
  transition: opacity 0.2s; // 부드러운 효과를 위한 트랜지션
`;

/** 영화 카드 Wrap */
const StyledCardWrapper = styled.div`
  --card-width: 20rem;
  width: var(--card-width);
  height: calc(var(--card-width) * 1.3);
  background-color: #ccc;
  border-radius: 0.75rem;
  overflow: hidden;

  position: relative;

  &:hover ${StyledCardHover} {
    opacity: 1;
  }
`;

/** 영화 정보 1차 Wrap */
const StyledDetailOut = styled.div`
  ${FlexColBetween}
  width: 100%;
  height: 80%;
  text-align: center;
`;

/** 영화 정보 2차 Wrap */
const StyledDetailInCol = styled.div`
  ${FlexColBetween}
  width: 60%;
  text-align: center;
`;

/** 해시태그 가로 정렬 ~~~수정필요 */
const StyledDetailInRow = styled.div`
  ${FlexRowBetween}
  width: 60%;
  text-align: center;
  flex-wrap: wrap;
`;

/** 영화제목 커서 포인터.. */
const StyledTitle = styled(Text)`
  cursor: pointer;
`;