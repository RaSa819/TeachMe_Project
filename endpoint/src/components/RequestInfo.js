import React from 'react'
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";


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
const styleRow = {
    marginTop: '-15px'
}

const stylebtnRandomRequest = {
    width: '223px',
    height: '35px',
    backgroundColor: '#000052',
    borderRadius: '25px',
    marginTop: '10px',
    color: 'white',
    marginBottom: '30px'
}

const styleRandomRequestIcon = {
    color: 'white',
    marginRight: '20px',
    width: '24px',
    height: '24px'
}
export default function () {
    return (
        <div className="row" style={{
            backfaceVisibility:'#f2f2f2'
        }}>
            <div className="col-md-2" />
            <div className="col-md-8">
                <form>
                    <h4 className="text-center mt-2"
                        style={{
                            color: color[1]
                        }}

                    >Request Info</h4>


                    <div className="row" style={styleRow}>
                        <div className="col-md-3 col-lg-2">
                            <label style={styleLabel}>Title of subject</label>
                        </div>
                        <div className="col-md-9 col-lg-10" >
                            <input type="text" style={styleInput} className="form-control mt-3 shadow-none"
                                placeholder=""
                            />
                        </div>
                    </div>


                    <div className="row" style={styleRow}>
                        <div className="col-md-3 col-lg-2">
                            <label style={styleLabel}>Description</label>
                        </div>
                        <div className="col-md-9 col-lg-10" >
                            <textarea style={styleInput} className="form-control mt-3 shadow-none"
                                placeholder=""
                            />
                        </div>
                    </div>
                    <div className="row" style={styleRow}>
                        <div className="col-md-3 col-lg-2">
                            <label style={styleLabel}>Time</label>
                        </div>
                        <div className="col-md-9 col-lg-10" >
                            <input type="number" style={styleInput}
                                min={1} max={4}
                                className="form-control mt-3 shadow-none"
                                placeholder=""
                            />
                        </div>

                        <div className="row" style={styleRow}>
                            <div className="col-md-3 col-lg-2">
                                <label style={styleLabel}>Title of subject</label>
                            </div>
                            <div className="col-md-9 col-lg-10" >
                                <input type="file" multiple={true} style={styleInput} className="form-control mt-3 shadow-none"
                                    placeholder=""
                                />
                            </div>
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <div>

                            <button style={stylebtnRandomRequest}>
                                <GiPerspectiveDiceSixFacesRandom
                                    style={styleRandomRequestIcon}
                                />
                                Make it</button>
                        </div>
                    </div>
                </form>

            </div>
            <div className="col-md-2" />
        </div>
    )
}

const color = [
    "#000052",
    "#D90429",
    "#F4F4F8",
]
