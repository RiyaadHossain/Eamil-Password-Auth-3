import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from "./firebase.init"

const auth = getAuth(app);

function App() {
  const [signed, setSigned] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const signedIn = event => {
    event.target.checked ? setSigned(true) : setSigned(false)
  } 
  const onBlurEmail = event => {
    setEmail(event.target.value)
    console.log(event.target.value);
  }
  const onBlurPassword = event => {
    setPassword(event.target.value)
    console.log(event.target.value);
  }
  const onFormSubmit = event => {
    event.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then(credential => {
        const user = credential.user
        console.log(user);
      })
      .catch(error => {
        const errorMessage = error.message
        console.log(errorMessage);
    })
  }
  return (
    <div className="container">
      <h1 className="mt-5 mb-4 text-center text-primary">Please Submit the Form</h1>
      <div className="border shadow py-4 px-3 rounded">
        <h2 className="text-center mb-3 text-info">{ signed ? 'Log In' : ' Sign Up'}</h2>
        <Form onSubmit={onFormSubmit}>
         {!signed ?  <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name</Form.Label>
            <Form.Control onBlur={onBlurEmail} type="text" placeholder="Enter Name" />
          </Form.Group> : '' }

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={onBlurEmail} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={onBlurPassword} type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onClick={signedIn} type="checkbox" label="Already Signed Up" />
          </Form.Group>
          <Button variant="primary" type="submit">
            {signed ? "Log In" : "Sign Up"}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
