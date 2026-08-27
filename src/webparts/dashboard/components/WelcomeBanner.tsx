import * as React from "react";

interface IWelcomeBannerProps {
  userName: string;
}

const WelcomeBanner: React.FC<IWelcomeBannerProps> = ({
  userName
}) => {

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  }

  const today = new Date().toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "long",
      year: "numeric"
    }
  );

  return (
    <div
      style={{
  background:
    "linear-gradient(135deg,#0070AD,#6F2DBD)",
  color: "white",
  borderRadius: "16px",
  padding: "20px",
  marginBottom: "15px",
  boxShadow:
    "0 8px 24px rgba(0,0,0,.15)"
}}
    >
    <h1
  style={{
    margin: 0,
    fontWeight: 700
  }}
>
  👋 {greeting}, {userName}
</h1>

      <p
        style={{
          marginTop: "6px",
          opacity: 0.9
        }}
      >
        {today}
      </p>

      <div
  style={{
    marginTop: "10px",
    fontSize: "14px",
    fontStyle: "italic"
  }}
>
  &quot;Learning is a treasure that will follow
  its owner everywhere.&quot;
</div>
    </div>
  );
};

export default WelcomeBanner;