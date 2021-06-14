import React from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  lastname: yup.string().required("Please enter lastname").max(50),
  firstname: yup.string().required("Please enter firstname").max(31),
  fathername: yup.string().required("Please enter fathername").max(31),
  birthdate: yup
    .string()
    .required("Please enter birthdate")
    .matches(/\d{2}.\d{2}.\d{4}/),
  phone: yup
    .string()
    .required("Please enter phone number")
    .matches(/\+7\(\d{3}\) \d{3} \d{2} \d{2}/),
  email: yup.string().email(),
});

const content = {
  inputs: [
    {
      label: "Lastname",
      name: "lastname",
      type: "text",
    },
    {
      label: "Firstname",
      name: "firstname",
      type: "text",
    },
    {
      label: "Fathername",
      name: "fathername",
      type: "text",
    },
    {
      label: "Birthdate",
      name: "birthdate",
      type: "text",
    },
    {
      label: "Phone",
      name: "phone",
      type: "text",
    },
    {
      label: "Email",
      name: "email",
      type: "text",
    },
  ],
};

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    const { lastname, firstname, fathername, birthdate, phone, email } = data;
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        name: lastname + " " + firstname + " " + fathername,
        birthdate,
        email,
        phone,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };
  console.log(errors);

  return (
    <div className="App">
      <h1>Форма для отправки данных</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {content.inputs.map((input, key) => {
          return (
            <div key={key}>
              <p>
                <label className="label">{input.label}</label>
              </p>
              <p>
                <input
                  className="input"
                  type={input.type}
                  {...register(input.name)}
                />
              </p>
              <p className="messages">{errors[input.name]?.message}</p>
            </div>
          );
        })}
        <button className="btn" type="submit">
          submit
        </button>
      </form>
    </div>
  );
}

export default App;
