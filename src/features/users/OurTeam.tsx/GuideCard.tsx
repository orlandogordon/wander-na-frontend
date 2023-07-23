type GuideCardProps = {
  userObj: any;
};

const GuideCard = ({ userObj }: GuideCardProps) => {
  let url: string = userObj.photo;

  return (
    <div className="mx-auto flex flex-col">
      <img
        src={`https://wander-api-bl56.onrender.com/img/users/${url}`}
        className=" mx-auto h-28 w-28 rounded-full object-cover shadow"
        alt="profile-pic"
        crossOrigin="anonymous"
      />
      <div className="mx-auto mt-2">
        <p className=" font-bold md:text-lg lg:text-lg ">{userObj.name}</p>
        {/* <p className="text-sm text-gray-800">{role}</p> */}
      </div>
    </div>
  );
};

export default GuideCard;
