import React from 'react'
import Drawer from './Layout/Drawer'
import ReqCard from '../../components/reqCard/reqCard'


export default function StudentFavoriteList() {
    return (
        <Drawer>

            <div style={{
                marginTop: '50px',
                overflowX:'auto'
            }}>
            <ReqCard title="request 1" name="mohammed " />
            <ReqCard title="request 2" name="Ali "/>
            <ReqCard title="request 3" name="Mosa "/>
                
            </div>

        </Drawer>
    )
}