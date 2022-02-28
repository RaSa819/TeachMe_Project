import React from 'react'
import Drawer from './Layout/Drawer'
function AdminActivity() {
    return (
        <div
        style={{
            margin:'50px'
        }}
        >AdminActivity</div>
    )
}
export default () => {
    return (
        <Drawer>
            {AdminActivity()}
        </Drawer>
    )
}