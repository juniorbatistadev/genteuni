import React from "react";
import FlexColumn from "../../../components/common/FlexColumn";
import Title from "../../../components/common/Title";
import useInfiniteScrolling from "../../../hooks/useInfinteScrolling";
import { getSchoolMembersWithPagination } from "../../../data/querySchools";
import InfiniteScroll from "react-infinite-scroller";
import Spinner from "../../../components/common/Spinner";
import UserListItem from "../../ProfilePage/components/UserListItem";
import { ReactComponent as EmptyIlustration } from "../../../assets/images/empty.svg";

const MemebersSection = ({ school }) => {
  const { items, startFrom, count, nextPage, isLoading } = useInfiniteScrolling(
    {
      query: getSchoolMembersWithPagination,
      perPage: 10,
      queryData: school,
    }
  );

  return (
    <FlexColumn>
      <Title text={`Miembros (${count})`} margin="10px" />

      <InfiniteScroll
        loadMore={nextPage}
        loader={<Spinner />}
        hasMore={startFrom < count}
      >
        {items.map((item) => (
          <UserListItem key={item.id} user={item} />
        ))}
      </InfiniteScroll>
      {count < 1 && !isLoading && (
        <FlexColumn alignItems="center" margin="auto">
          <Title text="Nadie es parte de esta escuela aun" fontSize="16px" />
          <EmptyIlustration width="200px" height="200px" />
        </FlexColumn>
      )}
    </FlexColumn>
  );
};

export default MemebersSection;
