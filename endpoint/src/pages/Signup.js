import React, { useState } from "react";
import axios from 'axios'
import validator from 'validator';
//import { options } from "../../../src/routers/fetchDataRouter";

// to align items in center 
const styleCenter = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center"
}

const Signup = () => {

  //
  const [lan, setLan] = useState(0)// the zero means that language is English
  const [privacy, setPrivacy] = useState(false)
  const [tutor, setTutor] = useState(false)


  // data 

  const [deptData, setDeptData] = useState([])

  React.useEffect(async () => {

    if (tutor === true) {
      await axios.get('http://localhost:4000/fetchDept').

        //represnt data to state 
        then((res) => {
          setDeptData(res.data)
          console.log(res.data)
        }).

        catch((err) => {
          console.log('there is error is' + err)
        })
    }
  }, [tutor])

  //  data for sign up 
  const [firstName, setFirstName] = useState('')
  const [middleName, setmiddleName] = useState('')
  const [lastName, setlastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setphoneNumber] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [street, setStreet] = useState('')
  const [zip, setZip] = useState('')
  const [dept, setDept] = useState('')

  const [cardInfo, setCardInfo] = useState({})
  // 


  // send data to api by using axios 
  const signUp = async (e) => {
    e.preventDefault();

    const data = {
      username,
      firstName,
      middleName,
      lastName,
      email,
      password,
      address: {
        country,
        city,
        street,
        ZIP: zip,
      },
      phoneNumber
    }

    await axios.post('http://localhost:4000/user/register', {
      data: data
    }).
      then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
  }


  // validation message ==> show if there is error in input or not
  // validation 

  const checkUserName = () => {
    var check = validator.isEmail(username.toString())
    console.log(check);
  }

  const checkEmail = () => {

  }

  const checkPassword = () => {

  }


  return (
    <div className="row">
      <div className="col-md-2" />
      <div className="col-md-8">
        <form onSubmit={(event) => signUp(event)}>
          <h3 className="text-center mt-2"
            style={{
              color: color[1]
            }}
          >Sign Up</h3>


          <input type="text" className="form-control mt-3"
            placeholder="username"
            onKeyPress={(event) => {
              if (event.charCode === 13)
                checkUserName()
            }}

            onChange={(event) => setUsername(event.target.value)}
            value={username}
          />

          <input type="email" className="form-control mt-2"
            placeholder="email address"

            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />

          <input type="password" className="form-control mt-2"
            placeholder="password"

            onChange={(event) => setPassword(event.target.value)}
            value={password}
          />
          <input type="password" className="form-control mt-2"
            placeholder="confirm password"
            onChange={(event) => setConfirmPassword(event.target.value)}
            value={confirmPassword}
          />
          <input type="text" className="form-control mt-2"
            placeholder="first name"

            onChange={(event) => setFirstName(event.target.value)}
            value={firstName}
          />
          <input type="text" className="form-control mt-2"
            placeholder="middle name"

            onChange={(event) => setmiddleName(event.target.value)}
            value={middleName}
          />
          <input type="text" className="form-control mt-2"
            placeholder="last name"

            onChange={(event) => setlastName(event.target.value)}
            value={lastName}
          />

          {/* Address fields  */}
          <div className="row">
            <div className="col">
              <input type="text" className="form-control mt-2"
                placeholder="country"

                onChange={(event) => setCountry(event.target.value)}
                value={country}
              />
            </div>
            <div className="col">
              <input type="text" className="form-control mt-2"
                placeholder="current city"

                onChange={(event) => setCity(event.target.value)}
                value={city}
              />
            </div>
            <div className="col">
              <input type="text" className="form-control mt-2"
                placeholder="street"

                onChange={(event) => setStreet(event.target.value)}
                value={street}
              />
            </div>
            <div className="col">
              <input type="number" className="form-control mt-2"
                placeholder="ZIP"

                onChange={(event) => setZip(event.target.value)}
                value={zip}
              />
            </div>
          </div>
          {/* end scope of address fields */}


          <input type="text" className="form-control mt-2"
            placeholder="phone number"

            onChange={(event) => setphoneNumber(event.target.value)}
            value={phoneNumber}
          />


          {/* begin of tutor data */}
          <div style={{
            display: tutor === true ? "block" : "none"
          }}>
            <div>
              <input type="text" className="form-control mt-2"
                placeholder="choose your department" list="dept"
              />
              <datalist id="dept">
                {
                  deptData.map((item, index) => (
                    <option key={index} value={item.name} />
                  ))
                }
              </datalist>
            </div>
            <div>
              <input type="text" className="form-control mt-2"
                placeholder="choose type of card for payment operation" list="cardType"
              />
              <datalist id="cardType">
                <option value="Master Cart" />
                <option value="Visa Card" />
              </datalist>
            </div>
            <div>
              <input type="password" className="form-control mt-2"
                placeholder="Enter the id of your card" list="cardType"
              />
            </div>

          </div>
          {/* end of tutor data */}
          <div style={styleCenter} className="mt-2">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="typeUser" id="tutor" value="tutor"
                onChange={() => {
                  setTutor(true)
                }}
              />
              <label className="form-check-label" for="tutor">I am a tutor </label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="typeUser" id="student" value="student"
                onChange={() => {
                  setTutor(false)
                }}
              />
              <label className="form-check-label" for="student">I am a student </label>
            </div>

          </div>

          <div style={styleCenter} className="mt-2">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" value="" id="privacy"

                onChange={() => {
                  setPrivacy(!privacy)
                }}
              />
              <label class="form-check-label" for="privacy">
                I read and agree to <a href="#" style={{
                  color: color[1],
                  textDecoration: 'none'
                }}>Terms & conditions</a>
              </label>
            </div>
          </div>

          <div style={styleCenter}>
            <input type="submit" className="btn mt-2"
              disabled={!privacy}
              value="Create Acount"
              style={{
                backgroundColor: color[0],
                color: color[2]
              }}
            />
          </div>
        </form>
      </div>
      <div className="col-md-2" />
    </div>
  )
}

export default Signup;

const color = [
  "#000052",
  "#D90429",
  "#F4F4F8",
]
