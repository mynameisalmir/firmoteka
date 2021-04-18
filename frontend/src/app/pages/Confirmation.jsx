import React, { useState } from 'react'
import UserPool from "app/UserPool";

const Confirmation = () => {
    const [username, setUsername] = useState('')
    const [code, setCode] = useState('')
    
    const onSubmit = (e) => {
        e.preventDefault();
    console.log(UserPool.getCurrentUser());
        // UserPool.getCurrentUser.confirmRegistration(
        //   username,
        //   code,
        //   null,
        //   (err, data) => {
        //     if (err) console.log(err);
        //     console.log(data);
        //   }
        // );
      };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <p>email</p>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} />
                <p>text</p>
                <button className="bg-blue-400 hover:bg-blue-500 rounded-md py-2 px-5" type="submit">go</button>
            </form>
        </div>
    )
}

export default Confirmation
