import context from "./context";

const DatingContextProvider = (props) => {
  const value = {};

  return <context.Provider value={value}>{props.children}</context.Provider>;
};

export default DatingContextProvider;
