import React, { useState } from "react";
import "antd/dist/antd.css";
import "../App.scss";
import { Steps, Modal, notification } from "antd";
import { Button } from "react-bootstrap";
import { Modalcontent1, Modalcontent2, Modalcontent3 } from "./ModalContents";
import Parse from "../services/parseService";

const { Step } = Steps;

const ComponentModal = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [catogery, setCatogery] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  // console.log(fullName);
  // console.log(email);
  // console.log(topic);
  const steps = [
    {
      title: "Catogery",
      content: <Modalcontent1 catogery={catogery} setCatogery={setCatogery} />,
    },
    {
      title: "Detials",
      content: (
        <Modalcontent2
          email={email}
          setEmail={setEmail}
          fullName={fullName}
          setFullName={setFullName}
        />
      ),
    },
    {
      title: "Project Name",
      content: <Modalcontent3 topic={topic} setTopic={setTopic} />,
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      setIsModalVisible(false);
    }, 2000);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const afterDone = () => {
    const user = new Parse.User();
    user.set("username", email);
    user.set("fullname", fullName);
    user.set("topic", topic);
    user.set("catogery", catogery);
    user
      .signUp()
      .then(() => {
        setIsModalVisible(false);
        notification["success"]({
          message: "Email Sent Sucessfully",
          description:
            "The Project Viewable Link Has been Sent to Your Inbox, Kindly Ckeck.",
          duration: 10,
        });
      })
      .catch((error) => {
        notification["error"]({
          message: "Error",
          description: error.message,
          duration: 5,
        });
      });
  };
  // const openNotificationWithIcon = (type) => {
  //   setTimeout(() => {
  //     setIsModalVisible(false);
  //   }, 1000);
  //   notification[type]({
  //     message: "Email Sent Sucessfully",
  //     description:
  //       "The Project Viewable Link Has been Sent to Your Inbox, Kindly Ckeck.",
  //     duration: 10,
  //   });
  // };
  return (
    <>
      <Button
        style={{ marginLeft: "50px", width: "300px" }}
        className="myButton"
        onClick={showModal}
      >
        Proceed
      </Button>
      <Modal
        title="Aiensured"
        maskClosable={false}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Steps current={current}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <hr />
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button className="myButton" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              className="myButton"
              onClick={() => {
                afterDone();
                // openNotificationWithIcon("success");
              }}
              // onSubmit={afterDone}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              className="myButton"
              style={{
                margin: "0 10px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div>
      </Modal>
    </>
  );
};

export default ComponentModal;
