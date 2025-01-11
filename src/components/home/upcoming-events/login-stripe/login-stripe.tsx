import React from "react";
import styles from "./login-stripe.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useAtom } from "jotai";
import { loginNeeded, userDetails } from "@/jotai/atoms";
import { subscribeToTM } from "../../home.http";
import { toast } from "react-toastify";
import { login } from "@/utils/userAuth";

const LoginStripe = () => {
  const [_, setOpenLogin] = useAtom(loginNeeded);
  const [user, setUser] = useAtom(userDetails);

  async function subscribe() {
    const res = await subscribeToTM();
    if (res && (res.statusCode === 200 || res.statusCode === 201)) {
      if (res.data.isSubscribed) toast.success("Subscribed successfully!");
      else toast.success("Un-subscribed successfully!");
      setUser(res.data);
      login(res.data);
    } else {
      toast.error(res.message || "Something went wrong! Please try again.");
    }
  }

  return (
    <div className={`col-md-12 ${styles.loginStripe}`}>
      <div>
        <h4>Join the community today</h4>
        <p>
          Egestas fringilla aliquam leo, habitasse arcu varius lorem elit. Neque
          pellentesque donec et tellus ac varius tortor, bibendum. Nulla felis
          ac turpis at amet.{" "}
        </p>
      </div>
      {!user?._id ? (
        <button
          className="btnTheme"
          onClick={() => {
            setOpenLogin(true);
          }}
        >
          Login/SignUp
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      ) : (
        <button
          className="btnTheme"
          onClick={() => {
            subscribe();
          }}
        >
          {user.isSubscribed ? "Un-subscribe" : "Subscribe"}
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      )}
    </div>
  );
};

export default LoginStripe;
