import { useGetCurrentUserQuery } from "../usersApiSlice";
import UpdateUserInfo from "./UpdateUserInfo";
import UpdatePassword from "./UpdatePassword";
import UserBookings from "./UserBookings";
import LoadingPage from "../../../shared/LoadingPage";

type Props = {};

const AccountOverview = (props: Props) => {
  // Retrieve the current users information
  const {
    data: currentUserData,
    isLoading: currentUserIsLoading,
    isSuccess: currentUserIsSuccess,
    isError: currentUserIsError,
    error: currentUserError,
  } = useGetCurrentUserQuery("");

  let content;

  if (currentUserIsLoading) content = <LoadingPage />;

  if (currentUserIsError) {
    console.log(currentUserError);
    content = <p className="errmsg">Oops! Failed to load user information..</p>;
  }

  if (currentUserIsSuccess) {
    const user = currentUserData.data.data;
    content = (
      <>
        <UpdateUserInfo user={user} />
        <UpdatePassword />
        <UserBookings user={user} />
      </>
    );
  }

  return <div className="mt-24">{content}</div>;
};

export default AccountOverview;
