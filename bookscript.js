const temp=document.getElementById("login-form");

if(temp){
    temp.addEventListener("submit", async (event)=> {

        event.preventDefault();
    
        const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;

          try{

            const response = await fetch("http://localhost:3000/auth/login", {
        
                method: "POST",
        
                headers: {
                  "Content-Type": "application/json"
        
                },
        
                body: JSON.stringify({ email, password })
        
            })
  
            const reponseMessage = await response.json();
  
            if(response.status === 200){
              const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoic3VjaGl0aGEiLCJlbWFpbCI6ImFkbWluQGdhbWlsLmNvbSIsInBhc3N3b3JkIjoidGVzdEAxMjM0Iiwicm9sZSI6ImFkbWluIn0.pUSnWjgiqYEqrOA5Fabvr48Hv3PnDvlW4eesPr9Bo98"

  localStorage.setItem("tokenid",token);
               window.location.href = "books.html" 
            }else{
              alert(reponseMessage.message)
            }
  
  
          }catch(err){
            alert(err.message)
          }
      
            })
      
      
}
      
       


