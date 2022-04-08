import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function App() {
   const [signed, setSigned] = useState()
  const signedIn = event => {
    event.target.checked ? setSigned(true) : setSigned(false)
  } 
  return (
    <div className="container">
      <h1 className="mt-5 mb-4 text-center text-primary">Please Submit the Form</h1>
      <div className="border shadow py-4 px-3 rounded">
        <h2 className="text-center mb-3 text-info">{ signed ? 'Log In' : ' Sign Up'}</h2>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
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
