import React, { useState, useRef } from "react";
import axios from 'axios'
import validator from 'validator';

// to align items in center 
const styleCenter = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center"
}

const styleLabel = {
  paddingTop: '20px',
  color:'black'

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

  const firstName = useRef();
  const middleName = useRef();
  const lastName = useRef();
  const username = useRef();
  const password = useRef();
  const confirmPassword = useRef();
  const email = useRef();
  const phoneNumber = useRef();
  const country = useRef();
  const city = useRef();
  const street = useRef();
  const ZIP = useRef();
  const dept = useRef();
  // const [firstName, setFirstName] = useState('')
  // const [middleName, setmiddleName] = useState('')
  // const [lastName, setlastName] = useState('')
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const [confirmPassword, setConfirmPassword] = useState('')
  // const [email, setEmail] = useState('')
  // const [phoneNumber, setphoneNumber] = useState('')
  // const [country, setCountry] = useState('')
  // const [city, setCity] = useState('')
  // const [street, setStreet] = useState('')
  // const [zip, setZip] = useState('')
  // 

  const [cardInfo, setCardInfo] = useState({})
  // 

  const [isReadyToSubmit, setReadyToSubmit] = useState(false);


  // send data to api by using axios 
  const signUp = async (e) => {
    e.preventDefault();

    // if (!checkPassword()) {
    //   alert("the password is not compatible ");
    //   return;
    // }
    const data = {
      username:username.current.value,
      firstName:firstName.current.value,
      middleName:middleName.current.value,
      lastName:lastName.current.value,
      email:email.current.value,
      password:password.current.value,
      address: {
        country:country.current.value,
        city:city.current.value,
        street:street.current.value,
        ZIP: ZIP.current.value,
      },
      phoneNumber:phoneNumber.current.value
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
    if (password === confirmPassword)
      return true;
  }



  return (
    <div className="row">
      <div className="col-md-2" />
      <div className="col-md-8">
        <form onSubmit={(event)=>signUp(event)}>
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
                ref={username}
              />
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
                <label style={styleLabel}>type of card</label>
              </div>
              <div className="col-md-9 col-lg-10">
                <input type="text" list="cardType" style={styleInput} className="form-control mt-3 shadow-none"
                  placeholder=""
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
                />
              </div>
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
