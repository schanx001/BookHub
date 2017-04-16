/**
 * Created by schanx on 3/27/17.
 */
(function(){
    angular
        .module("BookHubMaker")
        .factory("UserService",UserService);
    function UserService($http) {
        var api = {/*
            "createUser":createUser,*/
            "updateUser": updateUser,
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "deleteUser":deleteUser,
            "login" : login,
            "logout" : logout,
            "register":register,
            "getAllUsers":getAllUsers,
	     "getUserRatingService":getUserRatingService,
             "setUserRating":setUserRating,
            "findAllUserNames":findAllUserNames,
            "findCurrentUser":findCurrentUser
        };
        return api;

        function findCurrentUser() {
            return $http.get("/api/user");
        }

        function findAllUserNames(userIds) {
            return $http.post("/api/users",userIds);
        }

        function getAllUsers(){
            //console.log($http.get("/api/getusers"));
            return $http.get("/api/getusers");
        }

        function setUserRating(userId,bookId,newRating) {
            return $http.put("/api/user/"+userId+"?bookId="+bookId+"&rating="+newRating);
        }

        function getUserRatingService(userId,bookId) {
            return $http.get("/api/user?userId="+userId+"&bookId="+bookId);
        }

        function register(user) {
            return $http.post("/api/register",user);
        }
        
        function logout() {
            return $http.post("/api/logout");
        }
        
        function login(user) {
            return  $http.post("/api/login",user);
        }
        
        function deleteUser(userId) {
            return $http.delete('/api/user/'+userId);
        }

        /*function createUser(user) {
            alert("in client"+user);
            return $http.post("/api/user", user);
        }*/

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }

        function findUserById(uid) {
            return $http.get("/api/user/"+uid);
        }
    }
})();
