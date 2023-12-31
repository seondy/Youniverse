// 프로필에서 보여지는 리뷰 박스 (+ 텍스트)

import { useState, useEffect } from "react";
import styled from "styled-components";
import {
  MY_PAGE_REVIEW,
  SEARCH_USER_REVIEWLIST,
} from "../../commons/constants/String";
import Text from "../atoms/Text";
import { getMember } from "../../apis/FrontendApi";
import ProfileReviewItemList from "./ProfileReviewItemList";
import Wrapper from "../atoms/Wrapper";
import { FlexCenter } from "../../commons/style/SharedStyle";

interface ProfileReviewProps {
  memberId: number | undefined;
  className?: string;
}

const OtherProfileReview: React.FC<ProfileReviewProps> = ({ memberId }) => {
  const [reviewList, setReviewList] = useState<[]>([]);
  const [nickname, setNickname] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMember(Number(memberId));
        console.log("리뷰 보여줄 유저", response.data);

        if (response && response.data) {
          setReviewList(response.data.reviewResDtos || []);
          setNickname(response.data.nickname);
        }
      } catch (error) {
        console.error("데이터 가져오기 실패", error);
      }
    };

    fetchData();
  }, [memberId]);

  return (
    <StyledReviewContainer>
      <Text size="Medium" color="White" fontFamily="PyeongChang-Bold">
        {nickname}
        {MY_PAGE_REVIEW}
      </Text>
      <StyledStandardWhiteGhostWrapper
        size="Standard"
        color="WhiteGhost"
        padding="Narrow"
        className="mt-2"
      >
        {reviewList.length === 0 ? (
          <Text size="Small" color="Black" fontFamily="PyeongChang-Light">
            {SEARCH_USER_REVIEWLIST}
          </Text>
        ) : (
          <ProfileReviewItemList reviews={reviewList} />
        )}
      </StyledStandardWhiteGhostWrapper>
    </StyledReviewContainer>
  );
};

export default OtherProfileReview;

const StyledReviewContainer = styled.div`
  width: 49%;
`;

const StyledStandardWhiteGhostWrapper = styled(Wrapper)`
  ${FlexCenter}
  height: 300px;
`;
