import React from "react";
import { Tabs } from "antd";

import SignUp from "./comp/SignUp";
import SignIn from "./comp/SignIn";

const { TabPane } = Tabs;

const Auth = () => {
  return (
    <div className="Auth">
      <Tabs defaultActiveKey="signin">
        <TabPane tab="Sign in" key="signin">
          <SignIn />
        </TabPane>
        <TabPane tab="Sign up" key="signup">
          <SignUp />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Auth;
