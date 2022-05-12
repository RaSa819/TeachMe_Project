import React from "react";

export default function SessionInfo({info}) {
    return (
            <div style={{ textAlign: 'left', border: '1px solid lightgray',
             borderRadius: 10, margin: 5, width: '100%', display: 'inline-block' }}>
                <div style={{ padding: 20 }}>
                  {info}
                </div>
            </div>

         
    );
}