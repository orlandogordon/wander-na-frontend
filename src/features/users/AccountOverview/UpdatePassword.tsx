import { useRef, useEffect, useState } from "react";
import { PencilSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useUpdatePasswordMutation } from "../usersApiSlice";
import { PulseLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import Loading from "../../../shared/Loading";
type Props = {};

const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const UpdatePassword = (props: Props) => {
  const [updatePassword, { isLoading, isSuccess, isError, error }] =
    useUpdatePasswordMutation();

  const navigate = useNavigate();
  const [passwordCurrent, setpasswordCurrent] = useState("");
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [validPasswordConfirm, setValidPasswordConfirm] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(<></>);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setValidPasswordConfirm(validPassword && passwordConfirm === password);
  }, [passwordConfirm, password, validPassword]);

  useEffect(() => {
    if (isSuccess) {
      setpasswordCurrent("");
      setPassword("");
      setPasswordConfirm("");
      setErrMsg("");
      setSuccessMsg(
        <div className="text-md mb-2 p-1 font-semibold text-green-700">
          Password updated succesfully!
        </div>
      );
    }
  }, [isSuccess]);

  const onPasswordCurrentChanged = (e: any) =>
    setpasswordCurrent(e.target.value);
  const onPasswordChanged = (e: any) => setPassword(e.target.value);
  const onPasswordConfirmChanged = (e: any) =>
    setPasswordConfirm(e.target.value);

  const canSave =
    [validPassword, validPasswordConfirm].every(Boolean) && !isLoading;

  let form = useRef();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (canSave) {
      await updatePassword({ passwordCurrent, password, passwordConfirm });
    }
  };

  const validNameClass =
    !validPassword && isError ? "form__input--incomplete" : "";
  const validEmailClass =
    !validPassword && isError ? "form__input--incomplete" : "";
  const validPasswordClass = !validPassword && isError ? "border-red-700" : "";
  const validPasswordConfirmClass =
    !validPassword && isError ? "border-red-700" : "";

  const onSubmitFormClicked = async (e: any) => {
    e.preventDefault();
    if (
      PWD_REGEX.test(passwordCurrent) &&
      PWD_REGEX.test(password) &&
      password === passwordConfirm
    ) {
      try {
        await updatePassword({ passwordCurrent, password, passwordConfirm });
      } catch {
        console.log(error);
      }
    } else {
      setErrMsg(
        "Invalid inputs. Please confirm that the information entered is correct."
      );
    }
  };

  return (
    <form id="updatePassword" onSubmit={handleSubmit}>
      <div className="bg-white ">
        <div className="container mx-auto rounded bg-white px-4 ">
          <div className="xl:w-full border-b border-gray-300 py-5 ">
            <div className="xl:w-full xl:mx-0 mx-auto flex w-11/12 items-center">
              <p className="text-lg font-bold text-gray-800 ">
                Update Password
              </p>
            </div>
          </div>
          {isLoading ? (
            <Loading />
          ) : (
            <div>
              <div className="mx-auto pt-4">
                <div className="container mx-auto">
                  <div className="xl:w-1/4 mb-6 flex flex-col md:w-1/2 lg:w-1/2">
                    <label
                      htmlFor="password"
                      className="pb-2 text-sm font-bold text-gray-800 "
                    >
                      Current Password
                    </label>
                    <input
                      type="password"
                      id="current-password"
                      name="passwordCurrent"
                      required
                      className="rounded border border-gray-300 bg-transparent py-3 pl-3 text-sm text-gray-800 placeholder-gray-600 shadow-sm focus:border-slate-700 focus:outline-none  "
                      onChange={onPasswordCurrentChanged}
                    />
                  </div>
                  <div className="xl:w-1/4 mb-6 flex flex-col md:w-1/2 lg:w-1/2">
                    <label
                      htmlFor="newpassword"
                      className="pb-2 text-sm font-bold text-gray-800 "
                    >
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      name="newPassword"
                      required
                      className={`rounded border border-gray-300 bg-transparent py-3 pl-3 text-sm text-gray-800 placeholder-gray-600 shadow-sm focus:border-slate-700 focus:outline-none ${validPasswordClass}  `}
                      onChange={onPasswordChanged}
                    />
                  </div>
                  <div className="xl:w-1/4 mb-6 flex flex-col md:w-1/2 lg:w-1/2">
                    <label
                      htmlFor="confirmnewpassword"
                      className="pb-2 text-sm font-bold text-gray-800 "
                    >
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirm-new-password"
                      name="confirmNewPassword"
                      required
                      className={`rounded border border-gray-300 bg-transparent py-3 pl-3 text-sm text-gray-800 placeholder-gray-600 shadow-sm focus:border-slate-700 focus:outline-none ${validPasswordConfirmClass}  `}
                      onChange={onPasswordConfirmChanged}
                    />
                  </div>
                </div>
                {successMsg}
                <div className="sm:text-md mb-2 p-1 text-red-500 md:text-xl">
                  {errMsg}
                </div>
              </div>
              <div className="xl:w-full container mx-auto w-11/12">
                <div className="flex w-full justify-end bg-white py-4  sm:px-0">
                  <button
                    className="rounded bg-slate-600 px-8 py-2 text-sm text-white transition duration-150 ease-in-out hover:bg-slate-800 focus:outline-none"
                    type="submit"
                    onClick={onSubmitFormClicked}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default UpdatePassword;
