import React, { useState } from 'react'
import Drawer from './Layout/Drawer'
import Avatar from '@mui/material/Avatar';

export default () => {

    return (

        <Drawer>
            <div style={{
                marginRight: 0,
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
                width: '100%'
            }}>
                <div style={{
                    width: '100%'
                }}>
                    <div style={{
                        width: '100%',
                        backgroundColor: 'black',
                        display: 'flex',
                        height: '90%',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Avatar style={{
                            width: 100,
                            height: 100
                        }}>

                        </Avatar>


                    </div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                        backgroundColor: 'black',
                    }}>
                        <button style={{
                            backgroundColor: 'red',
                            borderRadius: '50%',
                            width: '40px',
                            height: '40px'
                        }}>

                        </button>
                    </div>

                </div>
            </div>
        </Drawer >
    )
}