import React, { useState } from 'react'

const UpdateUsername = ({setname}) => {
    
    const [newUsername, setnewUsername ] = useState("")
    const [Message, setMessage ] = useState("")

    const HandleNameChange = (event) =>{
        setnewUsername(event.target.value);
    }

    const HandleSubmit = async(event) =>{
        event.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/UserChange/', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'X-CSRFToken': getCookie('csrftoken')  // Asegúrate de incluir el token CSRF
            },
            body: JSON.stringify({ username: newUsername }),
            credentials: 'include'  // Incluir cookies en la solicitud
          });
      

        if (response.ok){
            setname(newUsername)
            setMessage("Username changed succesfully to: " + newUsername)
        
        }else{
            const data = await response.json();
            setMessage(`Error: ${data.detail}`);
        }

    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
            }
          }
        }
        return cookieValue;
      }


    return (
        <div>
            <form onSubmit={HandleSubmit}>
                <label>
                  <h5 className='ProfCardItem'>
                    New Username:

                  </h5>
                    <input
                        type='text'
                        value={newUsername}
                        onChange={HandleNameChange}
                        maxLength={150}
                        required

                    
                    />
                </label>
                <button type='submit'>Update Username</button>

            </form>
            {Message &&<p>{Message}</p>}


        </div>
    )
}

export default UpdateUsername
