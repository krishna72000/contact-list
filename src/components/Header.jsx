import React from 'react'
const Header = () => {
    console.log("header");
    return (
        <div style={{ marginBottom: "100px" }}>
            <div className="ui fixed menu">
                <div className="ui container center">
                    <h2>Contact Manager</h2>
                </div>
            </div>
        </div>
    );
}
export { Header };