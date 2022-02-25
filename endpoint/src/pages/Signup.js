import React, { useState, useRef } from "react";
import axios from 'axios'
import validator from 'validator';
import { useNavigate } from "react-router-dom";

import { io } from "socket.io-client";
// to align items in center 
const styleCenter = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center"
}

const styleLabel = {
  paddingTop: '20px',
  color: 'black'

}
const styleInput = {
  border: '0',
  borderBottom: 'solid gray 2px',
  outline: 0,
  borderRadius: '0',

}
const styleRowInput = {
  marginTop: '-5px'
}
const styleRow = {
  marginTop: '-15px'
}

const styleInline = {
  marginTop: '-15px'
}
const Signup = () => {


  const client = io('http://localhost:4000', {
    reconnection: false,
    autoConnect: false
  })

  React.useEffect(() => {
    // here to connect the socket server 
    client.connect();
  }, [])

  client.on('res', (data) => {
    console.log(data)
  })
  client.on('connect', () => {
    console.log('Successfully connected!');
  });

  //
  const [lan, setLan] = useState(0)// the zero means that language is English
  const [privacy, setPrivacy] = useState(false)
  const [tutor, setTutor] = useState(false)
  var dept_id = null;

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



  // 1 == make , 0 == female 
  const [gender, setGender] = useState(1)

  //  data for sign up 
  const [isValid, setValid] = useState(true);
  const firstName = useRef();
  const middleName = useRef();
  const lastName = useRef();
  const userName = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const email = useRef();
  const phoneNumber = useRef();
  const country = useRef();
  const city = useRef();
  const street = useRef();
  const ZIP = useRef();
  const dept = useRef();
  const cardID = useRef();
  const cardType = useRef();
  const certifications = useRef();
  const experience = useRef();
  const about = useRef();
  // 

  const [cardInfo, setCardInfo] = useState({})
  // 

  const [isReadyToSubmit, setReadyToSubmit] = useState(false);


  // send data to api by using axios 
  const signUp = async (e) => {
    e.preventDefault();
    var errorCount = 0;

    // to validate the input fields 

    [userName, email, password, confirmPassword,
      firstName, middleName, lastName, country, city, street, ZIP,
      phoneNumber
    ].forEach((item) => {
      if (item.current.value.length <= 0) {
        item.current.focus();
        errorCount++;
      }
    })

    if (errorCount > 0)
      return




    var tutorData = null;
    if (tutor === true) {
      var errorTutorCode = 0;

      // to validate input field of tutor
      [dept, cardID, cardType, about, experience, certifications].map((item) => {
        if (item.current.value.length <= 0) {
          item.current.focus();
          errorTutorCode++;
        }
      })

      if (errorTutorCode > 0)
        return
      deptData.forEach((item) => {
        if (item.name === dept.current.value) {
          dept_id = item._id;

          return;
        }
      })

      // assign data of tutor to send it 
      tutorData = {
        dept_id: dept_id,
        cardID: cardID.current.value,
        cardType: cardType.current.value,
        certifications: certifications.current.value,
        about: about.current.value,
        experience: experience.current.value
      }
    }

    // to validate password with confirm password
    if (password.current.value != confirmPassword.current.value) {
      confirmPassword.current.focus();
      console.log("confirmPassword is not equel original password")
      return;
    }


    // the data of student and tutor
    const data = {
      userName: userName.current.value,
      firstName: firstName.current.value,
      middleName: middleName.current.value,
      lastName: lastName.current.value,
      email: email.current.value,
      password: password.current.value,
      address: {
        country: country.current.value,
        city: city.current.value,
        street: street.current.value,
        ZIP: ZIP.current.value,
      },
      phoneNumber: phoneNumber.current.value,
      gender: gender
    }

    // push the data to the server 
    await axios.post('http://localhost:4000/user/register', {
      data: data,
      tutorData: tutorData
    }).
      then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
  }


  let navigate = useNavigate();

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

          <div className="row" style={styleRow}>
            <div className="col-md-3 col-lg-2">
              <label style={styleLabel}>username</label>
            </div>
            <div className="col-md-9 col-lg-10" >
              <input type="text" style={styleInput} className="form-control mt-3 shadow-none"
                placeholder=""
                ref={userName}

              />
              {!isValid && <span>HHH</span>}
            </div>
          </div>

          <div className="row" style={styleRow}>
            <div className="col-md-3 col-lg-2">
              <label style={styleLabel}>email</label>
            </div>
            <div className="col-md-9 col-lg-10">
              <input type="text" style={styleInput} className="form-control mt-3 shadow-none"
                placeholder=""
                ref={email}
              />
            </div>
          </div>

          <div className="row" style={styleRow}>
            <div className="col-md-3 col-lg-2">
              <label style={styleLabel}>password</label>
            </div>
            <div className="col-md-9 col-lg-10">
              <input type="password" style={styleInput} className="form-control mt-3 shadow-none"
                placeholder=""
                ref={password}
              />
            </div>
          </div>

          <div className="row" style={styleRow}>
            <div className="col-md-3 col-lg-2">
              <label style={styleLabel}>confirm Password</label>
            </div>
            <div className="col-md-9 col-lg-10">
              <input type="password" style={styleInput} className="form-control mt-3 shadow-none"
                placeholder=""
                ref={confirmPassword}
              />
            </div>
          </div>

          <div className="row" style={styleRow}>
            <div className="col-md-3 col-lg-2">
              <label style={styleLabel}>first name</label>
            </div>
            <div className="col-md-9 col-lg-10">
              <input type="text" style={styleInput} className="form-control mt-3 shadow-none"
                placeholder=""
                ref={firstName}
              />
            </div>
          </div>

          <div className="row" style={styleRow}>
            <div className="col-md-3 col-lg-2">
              <label style={styleLabel}>middle name</label>
            </div>
            <div className="col-md-9 col-lg-10">
              <input type="text" style={styleInput} className="form-control mt-3 shadow-none"
                placeholder=""
                ref={middleName}
              />
            </div>
          </div>


          <div className="row" style={styleRow}>
            <div className="col-md-3 col-lg-2">
              <label style={styleLabel}>last name</label>
            </div>
            <div className="col-md-9 col-lg-10">
              <input type="text" style={styleInput} className="form-control mt-3 shadow-none"
                placeholder=""
                ref={lastName}
              />
            </div>
          </div>

          {/* Gender  */}

          <div className="row" style={styleRow}>
            <div className="col-md-3 col-lg-2">
              <label style={styleLabel}>Gender</label>
            </div>
            <div style={styleCenter} className="mt-2">

              <div className="form-check form-check-inline">
                <input className="form-check-input" required type="radio" name="gender" id="male"
                  onChange={() => {
                    setGender(1)
                  }}
                />
                <label className="form-check-label" for="male"> male </label>
              </div>

              <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" required name="gender" id="female"
                  onChange={() => {
                    setGender(0)
                  }}
                />
                <label className="form-check-label" for="female">female </label>
              </div>
            </div>
          </div>




          {/* Address fields  */}
          <div className="row">
            <div className="col">
              <label>country</label>
              <input type="text" className="form-control mt-2 shadow-none"
                placeholder=""
                style={styleInput}
                ref={country}
              />
            </div>
            <div className="col">
              <label>current city</label>
              <input type="text" className="form-control mt-2 shadow-none"
                placeholder=""
                style={styleInput}
                ref={city}
              />
            </div>
            <div className="col">
              <label>street</label>
              <input type="text" className="form-control mt-2 shadow-none"
                placeholder=""
                style={styleInput}
                ref={street}
              />
            </div>
            <div className="col">
              <label>ZIP</label>
              <input type="number" className="form-control mt-2 shadow-none"
                placeholder=""
                style={styleInput}
                ref={ZIP}
              />
            </div>
          </div>
          {/* end scope of address fields */}


          <div className="row" style={styleRow}>
            <div className="col-md-3 col-lg-2">
              <label style={styleLabel}>phone number</label>
            </div>
            <div className="col-md-9 col-lg-10">
              <input type="number" style={styleInput} className="form-control mt-3 shadow-none"
                placeholder=""
                ref={phoneNumber}
              />
            </div>
          </div>



          {/* begin of tutor data */}
          <div style={{
            display: tutor === true ? 'block' : 'none'
          }}>
            <div className="row" style={styleRow}>
              <div className="col-md-3 col-lg-2">
                <label style={styleLabel}>Department</label>
              </div>
              <div className="col-md-9 col-lg-10">
                <input type="text" style={styleInput} list="dept" className="form-control mt-3 shadow-none"
                  placeholder=""
                  ref={dept}
                />
                <datalist id="dept">
                  {
                    deptData.map((item, index) => (
                      <option key={index} value={item.name} />
                    ))
                  }
                </datalist>
              </div>
            </div>

            <div className="row" style={styleRow}>
              <div className="col-md-3 col-lg-2">
                <label style={styleLabel}>About You</label>
              </div>
              <div className="col-md-9 col-lg-10" >
                <textarea style={styleInput} className="form-control mt-3 shadow-none"
                  placeholder=""
                  ref={about}
                />
              </div>
            </div>

            <div className="row" style={styleRow}>
              <div className="col-md-3 col-lg-2">
                <label style={styleLabel}>Your certifications</label>
              </div>
              <div className="col-md-9 col-lg-10" >
                <input type="text" list="certifications" style={styleInput} className="form-control mt-3 shadow-none"
                  placeholder=""
                  ref={certifications}
                />
                <datalist id="certifications">
                  <option value="bachelor" />
                  <option value="Master" />
                  <option value="Doctor" />
                  <option value="Freelancer and own experience" />
                  <option value="Another" />
                </datalist>
              </div>
            </div>

            <div className="row" style={styleRow}>
              <div className="col-md-3 col-lg-2">
                <label style={styleLabel}>Your experiences</label>
              </div>
              <div className="col-md-9 col-lg-10" >
                <textarea style={styleInput} className="form-control mt-3 shadow-none"
                  placeholder=""
                  ref={experience}
                />
              </div>
            </div>

            <div className="row" style={styleRow}>
              <div className="col-md-3 col-lg-2">
                <label style={styleLabel}>type of card</label>
              </div>
              <div className="col-md-9 col-lg-10">
                <input type="text" list="cardType" style={styleInput} className="form-control mt-3 shadow-none"
                  placeholder=""
                  ref={cardType}
                />
                <datalist id="cardType">
                  <option value="visa card" />
                  <option value="master card" />
                </datalist>
              </div>
            </div>

            <div className="row" style={styleRow}>
              <div className="col-md-3 col-lg-2">
                <label style={styleLabel}>ID of card</label>
              </div>
              <div className="col-md-9 col-lg-10">
                <input type="password" style={styleInput} className="form-control mt-3 shadow-none"
                  placeholder=""
                  ref={cardID}
                />
              </div>
            </div>
          </div>

          {/* end of tutor data */}

          <div style={styleCenter} className="mt-2">
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" required name="typeUser" id="tutor" value="tutor"
                onChange={() => {
                  setTutor(true)
                }}
              />
              <label className="form-check-label" for="tutor">I am a tutor </label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" required type="radio" name="typeUser" id="student" value="student"
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
            <input type="submit"
              disabled={!privacy}
              value="Create Acount"
              style={{
                backgroundColor: color[0],
                color: color[2],
                borderRadius: '4px',
                marginTop: '30px'
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