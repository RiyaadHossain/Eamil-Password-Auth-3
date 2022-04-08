import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import app from "./firebase.init"

const auth = getAuth(app);

function App() {
  const [error, setError] = useState('')
  const [signed, setSigned] = useState(false)
  // const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userMessage, setUserMessage] = useState('')
  const validateEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
      setUserMessage("✔️ Varification Mail Sent");
    })
  }
  const resetEmail = () => {
    setError("")
    setUserMessage("")
    sendPasswordResetEmail(auth, email)
      .then(() => {
      setUserMessage("✔️ Reset Mail Sent")
    })
  }
  const signedIn = event => {
    event.target.checked ? setSigned(true) : setSigned(false)
  } 
  const onBlurEmail = event => {
    setEmail(event.target.value)
  }
  const onBlurPassword = event => {
    setPassword(event.target.value)
  }
  const onFormSubmit = event => {
    event.preventDefault();
    setUserMessage('')
    setError('')
    if (!email || !password ) {
      setError('❌ Please Input valid Email and Password')
      return
    } else (
      setError('')
    )



    if (signed) {
      signInWithEmailAndPassword(auth, email, password)
        .then(credential => {
          const user = credential.user
          setUserMessage('✔️ Logged In')
          console.log(user);
        })
        .catch(error => {
          const errorMessage = error.message
          console.log(errorMessage);
          setError(errorMessage)
      })
    } else {
      if (!/(?=.*[!@#$%^&*])/.test(password)) {
        setError('❌ Password Should Contain at least one Special Character')
        return
      } else {
        setError('')
      }
      createUserWithEmailAndPassword(auth, email, password)
      .then(credential => {
        validateEmail()
        const user = credential.user
        console.log(user);
      })
      .catch(error => {
        const errorMessage = error.message
        console.log(errorMessage);
        setError(errorMessage)
    })}
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
          <p className="text-danger">{error}</p>
          <p className="text-success">{userMessage}</p>
          <Button variant="primary" type="submit">
            {signed ? "Log In" : "Sign Up"}
          </Button>
          {!signed ? "" : <Button onClick={resetEmail} className="ms-3" variant="warning" type="submit">Reset Password</Button>}
        </Form>
      </div>
    </div>
  );
}

export default App;
