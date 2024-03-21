import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useSpring, animated } from "react-spring";

const PaymentSuccess = () => {
  const styles = {
    container: {
      textAlign: "center",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "5px",
      minHeight: "400px",
      maxWidth: "800px",
      margin: "0 auto",
      marginTop: "50px",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      justifyContent: "center",
    },
    heading: {
      color: "#333",
      fontSize: "24px",
      marginBottom: "20px",
    },
    reference: {
      fontSize: "18px",
      color: "#666",
    },
    button: {
      padding: "10px 20px",
      fontSize: "16px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      textDecoration: "none",
      marginTop: "20px",
      display: "inline-block",
    },
  };

  const containerAnimation = useSpring({
    from: { opacity: 0, transform: "scale(0.8)" },
    to: { opacity: 1, transform: "scale(1)" },
    config: { tension: 200, friction: 10 },
  });

  const { user } = useSelector((state) => state.userData);

  return (
    <animated.div style={{ ...styles.container, ...containerAnimation }}>
      <h1 style={styles.heading}>Payment Successful</h1>
      <Link to={`/trips/${user?._id}`} style={styles.button}>
        See Your Trip
      </Link>
    </animated.div>
  );
};

export default PaymentSuccess;
