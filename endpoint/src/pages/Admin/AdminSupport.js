import React from 'react'
import Drawer from './Layout/Drawer'
function AdminSupport() {
    return (
        <div
        style={{
            margin:'50px'
        }}
        >AdminSupport this is page for get the suggestion of the users </div>
    )
}
export default () => {
    return (
        <Drawer>
            {AdminSupport()}
        </Drawer>
    )
}