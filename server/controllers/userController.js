class UserController {
    async getAllUsers (req, res, next) {
        console.log("getAllUsers")
    }

    async getUserById (req, res, next) {
        console.log("getAllUsers")
    }

    async updateUser(req, res, next) {
        console.log("updateUser")
    }

    async deleteUser (req, res, next) {
        console.log("deleteUser")
    }
}

module.exports = new UserController()