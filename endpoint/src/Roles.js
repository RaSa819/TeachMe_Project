// Closure 
//a closure gives you access to an outer function's scope from an inner function


var role =((roleType)=>{
    var roleType=null;

    function setRole(type)
    {
        roleType=type;
    }

    function getRole(){
        return role;
    }
})

export default role;